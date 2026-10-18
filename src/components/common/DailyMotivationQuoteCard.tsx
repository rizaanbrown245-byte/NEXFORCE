import React, { useState } from 'react';
import { MotivationQuote } from '../../types';
import { getDailyMotivationQuote, getRandomMotivationQuote } from '../../data/motivationQuotesData';
import { voiceCommandCoach } from '../../utils/voiceCommandCoach';
import {
  Quote,
  Sparkles,
  Volume2,
  Shuffle,
  Copy,
  Check,
  Heart,
  Flame
} from 'lucide-react';

interface DailyMotivationQuoteCardProps {
  className?: string;
}

export const DailyMotivationQuoteCard: React.FC<DailyMotivationQuoteCardProps> = ({
  className = ''
}) => {
  const [currentQuote, setCurrentQuote] = useState<MotivationQuote>(getDailyMotivationQuote());
  const [copied, setCopied] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isFavorited, setIsFavorited] = useState<boolean>(() => {
    try {
      const favs = JSON.parse(localStorage.getItem('fav_quotes') || '[]');
      return favs.includes(currentQuote.id);
    } catch {
      return false;
    }
  });

  const handleNextQuote = () => {
    const next = getRandomMotivationQuote(currentQuote.id);
    setCurrentQuote(next);
    setCopied(false);
    try {
      const favs = JSON.parse(localStorage.getItem('fav_quotes') || '[]');
      setIsFavorited(favs.includes(next.id));
    } catch {
      setIsFavorited(false);
    }
  };

  const handleSpeak = () => {
    if (isSpeaking) {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    const speechText = `"${currentQuote.quote}" - ${currentQuote.author}. ${currentQuote.insight}`;
    voiceCommandCoach.speak(speechText, true);

    // Reset speaking state after estimated duration
    const words = speechText.split(' ').length;
    const durationMs = Math.max(3000, (words / 2.5) * 1000);
    setTimeout(() => {
      setIsSpeaking(false);
    }, durationMs);
  };

  const handleCopy = () => {
    const textToCopy = `"${currentQuote.quote}" — ${currentQuote.author} (${currentQuote.authorRole})`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleFavorite = () => {
    try {
      const favs: string[] = JSON.parse(localStorage.getItem('fav_quotes') || '[]');
      let updated: string[];
      if (favs.includes(currentQuote.id)) {
        updated = favs.filter((id) => id !== currentQuote.id);
        setIsFavorited(false);
      } else {
        updated = [...favs, currentQuote.id];
        setIsFavorited(true);
      }
      localStorage.setItem('fav_quotes', JSON.stringify(updated));
    } catch {
      setIsFavorited(!isFavorited);
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border transition-all duration-300 shadow-lg ${
        'bg-gradient-to-br from-[#121d36] via-[#0d162a] to-[#080d1a] border-blue-500/40 text-gray-100 shadow-blue-950/30'
      } p-4 sm:p-5 ${className}`}
    >
      {/* Background Accent Watermark */}
      <Quote className="absolute -bottom-4 -right-4 w-28 h-28 text-blue-500/10 pointer-events-none rotate-12" />

      {/* Top Header Tag & Action Row */}
      <div className="flex items-center justify-between gap-2 mb-3 relative z-10">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wide uppercase bg-blue-500/20 text-sky-300 border border-blue-500/30">
            <Sparkles className="w-3 h-3 text-sky-400" />
            <span>Daily Motivation</span>
          </span>

          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-950/60 text-sky-400 border border-blue-600/30 font-semibold">
            {currentQuote.category}
          </span>
        </div>

        {/* Interactive Controls */}
        <div className="flex items-center gap-1">
          {/* Audio Voice Readout */}
          <button
            onClick={handleSpeak}
            className={`p-1.5 rounded-xl border transition-colors ${
              isSpeaking
                ? 'bg-blue-600 text-white border-blue-400 shadow-md animate-pulse'
                : 'bg-[#162038]/80 hover:bg-[#1f2d4d] text-sky-400 border-blue-500/30'
            }`}
            title={isSpeaking ? 'Stop audio' : 'Listen to quote with voice coach'}
            aria-label="Listen to quote"
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>

          {/* Shuffle / Next Quote */}
          <button
            onClick={handleNextQuote}
            className="p-1.5 rounded-xl bg-[#162038]/80 hover:bg-[#1f2d4d] text-gray-300 hover:text-white border border-[#213253] transition-colors"
            title="Next motivational quote"
            aria-label="Next quote"
          >
            <Shuffle className="w-3.5 h-3.5" />
          </button>

          {/* Favorite Toggle */}
          <button
            onClick={handleToggleFavorite}
            className={`p-1.5 rounded-xl border transition-colors ${
              isFavorited
                ? 'bg-red-500/20 text-red-400 border-red-500/40'
                : 'bg-[#162038]/80 hover:bg-[#1f2d4d] text-gray-400 hover:text-red-400 border-[#213253]'
            }`}
            title={isFavorited ? 'Remove from favorites' : 'Save to favorites'}
            aria-label="Favorite quote"
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-red-400 text-red-400' : ''}`} />
          </button>

          {/* Copy Quote */}
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-xl bg-[#162038]/80 hover:bg-[#1f2d4d] text-gray-300 hover:text-white border border-[#213253] transition-colors"
            title="Copy quote to clipboard"
            aria-label="Copy quote"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Quote Body */}
      <div className="relative z-10 space-y-2.5">
        <p className="text-sm sm:text-base font-semibold italic text-white leading-relaxed font-sans">
          &ldquo;{currentQuote.quote}&rdquo;
        </p>

        {/* Author Attribution */}
        <div className="flex flex-wrap items-baseline gap-2 pt-1 border-t border-blue-500/20">
          <span className="text-xs sm:text-sm font-bold text-sky-400 font-heading tracking-wide">
            {currentQuote.author}
          </span>
          <span className="text-[11px] text-gray-400 font-sans">
            — {currentQuote.authorRole}
          </span>
        </div>

        {/* Practical Athlete Insight */}
        <div className="flex items-start gap-2 bg-[#091122]/70 p-2.5 rounded-xl border border-blue-500/20 text-[11px] text-gray-300">
          <Flame className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
          <span>
            <strong className="text-white font-medium">Coach Key: </strong>
            {currentQuote.insight}
          </span>
        </div>
      </div>
    </div>
  );
};
