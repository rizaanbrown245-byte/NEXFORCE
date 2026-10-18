import React, { useState, useRef, useEffect } from 'react';
import { TechniqueVideo, Exercise } from '../../types';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Gauge,
  CheckCircle2,
  XCircle,
  Eye,
  Maximize2,
  Minimize2,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Layers,
  Info,
  Clock,
  Activity,
  ExternalLink,
  Video,
  Tv,
  Check
} from 'lucide-react';

interface TechniqueVideoPlayerProps {
  exercise: Exercise;
  videoData: TechniqueVideo;
  onOpen3D?: () => void;
  className?: string;
}

export const TechniqueVideoPlayer: React.FC<TechniqueVideoPlayerProps> = ({
  exercise,
  videoData,
  onOpen3D,
  className = ''
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Default to YouTube tutorial if available, else loop
  const hasYouTube = Boolean(videoData.youtubeId);
  const [activePlayerMode, setActivePlayerMode] = useState<'youtube' | 'loop'>(
    hasYouTube ? 'youtube' : 'loop'
  );

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(videoData.durationSeconds || 12);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [selectedAngle, setSelectedAngle] = useState<string>(videoData.cameraAngles[0] || 'Side View');
  const [videoError, setVideoError] = useState<boolean>(false);
  const [showDoDont, setShowDoDont] = useState<boolean>(true);

  // Identify current phase based on currentTime for loop mode
  const currentPhaseIndex = videoData.phases.reduce((acc, phase, idx) => {
    if (currentTime >= phase.timestamp) return idx;
    return acc;
  }, 0);
  const currentPhase = videoData.phases[currentPhaseIndex] || videoData.phases[0];

  // Set playback rate when speed changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (videoRef.current.duration) {
        setDuration(videoRef.current.duration);
      }
    }
  };

  const jumpToPhase = (timestamp: number) => {
    // If in YouTube mode, switch to loop mode to scrub timestamps, or keep loop mode
    if (activePlayerMode === 'youtube') {
      setActivePlayerMode('loop');
    }
    if (videoRef.current) {
      videoRef.current.currentTime = timestamp;
      setCurrentTime(timestamp);
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  // YouTube fallback ID if missing
  const youtubeId = videoData.youtubeId || 'ultWZbUMPL8';
  const youtubeTitle = videoData.youtubeTitle || `${exercise.name}: Complete Technique Guide`;
  const youtubeChannel = videoData.youtubeChannel || 'Certified Fitness Coach';
  const youtubeUrl = videoData.youtubeUrl || `https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.name + ' proper form workout tutorial')}`;

  return (
    <div className={`flex flex-col bg-[#0a1020] rounded-2xl border border-[#213253] overflow-hidden shadow-2xl ${className}`}>
      {/* Player Mode Header Selector */}
      <div className="p-3 bg-[#0f172a] border-b border-[#213253] flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          {/* YouTube Tutorial Mode Button */}
          <button
            onClick={() => setActivePlayerMode('youtube')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-sm ${
              activePlayerMode === 'youtube'
                ? 'bg-red-600 text-white shadow-red-600/30 font-bold'
                : 'bg-[#162038] text-gray-300 hover:text-white border border-[#213253]'
            }`}
          >
            <div className="w-4 h-4 rounded-sm bg-white text-red-600 flex items-center justify-center">
              <Play className="w-2.5 h-2.5 fill-red-600 ml-0.5" />
            </div>
            <span>YouTube Tutorial (Free)</span>
          </button>

          {/* Slow-mo Motion Loop Button */}
          <button
            onClick={() => setActivePlayerMode('loop')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activePlayerMode === 'loop'
                ? 'bg-blue-600 text-white shadow-blue-500/30 font-bold'
                : 'bg-[#162038] text-gray-300 hover:text-white border border-[#213253]'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Slow-Mo Motion Loop</span>
          </button>
        </div>

        {/* External YouTube Link & Animation Quick Link */}
        <div className="flex items-center gap-2">
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 bg-[#162038] hover:bg-red-950/40 text-gray-300 hover:text-red-400 border border-[#213253] hover:border-red-500/40 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm"
            title="Open free video on YouTube"
          >
            <span className="hidden sm:inline">Open on YouTube</span>
            <ExternalLink className="w-3.5 h-3.5 text-red-400" />
          </a>

          {onOpen3D && (
            <button
              onClick={onOpen3D}
              className="px-2.5 py-1.5 bg-[#162038] hover:bg-blue-950/60 text-sky-400 border border-blue-600/40 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm"
              title="Switch to Workout Animation Studio"
            >
              <Activity className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Animation Studio</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Video Viewport */}
      {activePlayerMode === 'youtube' ? (
        /* YOUTUBE EMBEDDED PLAYER */
        <div className="relative w-full aspect-video bg-black flex flex-col justify-center items-center overflow-hidden">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1&enablejsapi=1`}
            title={youtubeTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0"
          />

          {/* YouTube Video Info Bar under frame */}
          <div className="w-full bg-[#080d1a] border-t border-[#213253] px-3.5 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-red-600/20 text-red-400 border border-red-500/40 font-bold shrink-0">
                YouTube Free Video
              </span>
              <span className="text-white font-bold truncate text-xs sm:text-sm">
                {youtubeTitle}
              </span>
            </div>
            <div className="text-[11px] font-mono text-gray-400">
              Instructor: <span className="text-sky-300 font-semibold">{youtubeChannel}</span>
            </div>
          </div>
        </div>
      ) : (
        /* SLOW-MO MOTION LOOP PLAYER */
        <div className="relative w-full aspect-video sm:max-h-[380px] bg-black overflow-hidden flex items-center justify-center select-none group">
          {!videoError ? (
            <video
              ref={videoRef}
              src={videoData.videoUrl}
              poster={videoData.thumbnailUrl}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={() => {
                if (videoRef.current?.duration) setDuration(videoRef.current.duration);
              }}
              onError={() => {
                if (videoData.fallbackVideoUrl && videoRef.current) {
                  videoRef.current.src = videoData.fallbackVideoUrl;
                  videoRef.current.play().catch(() => setVideoError(true));
                } else {
                  setVideoError(true);
                }
              }}
              onClick={togglePlay}
              className="w-full h-full object-cover object-center cursor-pointer"
            />
          ) : (
            /* Fallback Card if MP4 blocked */
            <div
              onClick={() => setActivePlayerMode('youtube')}
              className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0c1611] to-[#12241b] p-6 text-center cursor-pointer relative"
            >
              <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-500 flex items-center justify-center text-red-400 mb-3 animate-pulse">
                <Play className="w-8 h-8 fill-red-400 translate-x-0.5" />
              </div>
              <div className="text-white font-bold text-sm sm:text-base font-heading">
                Click to Watch Free YouTube Video
              </div>
              <p className="text-xs text-gray-300 mt-1 max-w-md">
                {youtubeTitle} by {youtubeChannel}
              </p>
              <span className="mt-3 px-3.5 py-1.5 bg-red-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-red-600/30">
                Switch to YouTube Player
              </span>
            </div>
          )}

          {/* Phase HUD overlay in loop mode */}
          <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-blue-600/50 text-white shadow-xl flex items-center gap-2 pointer-events-none">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse shrink-0" />
            <div className="overflow-hidden">
              <div className="text-[10px] font-mono text-sky-400 uppercase tracking-widest font-bold">
                Phase {currentPhaseIndex + 1}: {currentPhase.name}
              </div>
              <div className="text-xs font-semibold truncate text-white">
                {currentPhase.biomechanicAngle}
              </div>
            </div>
          </div>

          {/* Center Big Play/Pause indicator on hover or pause */}
          {!isPlaying && (
            <div
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-blue-600/90 text-black flex items-center justify-center shadow-2xl transition-transform hover:scale-110">
                <Play className="w-8 h-8 fill-black translate-x-0.5" />
              </div>
            </div>
          )}

          {/* Bottom Floating Scrubber Bar within Loop Video */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col gap-2">
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pct = (e.clientX - rect.left) / rect.width;
                if (videoRef.current) {
                  videoRef.current.currentTime = pct * duration;
                }
              }}
              className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer overflow-hidden relative"
            >
              <div
                style={{ width: `${Math.min(100, (currentTime / (duration || 1)) * 100)}%` }}
                className="h-full bg-sky-400 rounded-full"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-white">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="text-sky-400 hover:text-white transition-colors"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>

                <button
                  onClick={restartVideo}
                  className="text-gray-400 hover:text-white transition-colors"
                  title="Replay from start"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-gray-400 hover:text-white transition-colors"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <span className="font-mono text-[11px] text-gray-300">
                  {Math.floor(currentTime)}s / {Math.floor(duration)}s
                </span>
              </div>

              {/* Playback speed toggle */}
              <div className="flex items-center gap-1.5 bg-black/60 px-2 py-0.5 rounded-lg border border-[#213253]">
                <Gauge className="w-3.5 h-3.5 text-sky-400" />
                {[0.5, 0.75, 1].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => setPlaybackSpeed(speed)}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
                      playbackSpeed === speed
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {speed === 0.5 ? 'Slow 0.5x' : `${speed}x`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Movement Phase Scrubber Tabs */}
      <div className="p-3.5 bg-[#0f172a] border-b border-[#213253]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-mono text-sky-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-sky-400" />
            <span>Technique Execution Phases</span>
          </span>
          <span className="text-[11px] text-gray-400 font-mono">
            Key movement milestones
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {videoData.phases.map((phase, idx) => {
            const isActive = currentPhaseIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => jumpToPhase(phase.timestamp)}
                className={`p-2.5 rounded-xl text-left transition-all border ${
                  isActive
                    ? 'bg-blue-600 text-white border-sky-400 shadow-md font-bold'
                    : 'bg-[#162038] hover:bg-[#1f2d4d] text-gray-300 border-[#213253]'
                }`}
              >
                <div className="text-[10px] font-mono opacity-80 uppercase">
                  Phase {idx + 1} • {phase.timestamp}s
                </div>
                <div className="text-xs truncate font-semibold mt-0.5">{phase.name}</div>
              </button>
            );
          })}
        </div>

        {/* Active Phase Coaching Cue */}
        <div className="mt-2.5 p-3 rounded-xl bg-[#162038] border border-blue-600/30 text-xs text-gray-200 flex items-start gap-2.5">
          <span className="w-5 h-5 rounded-full bg-blue-600/20 text-sky-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
            ✓
          </span>
          <div>
            <span className="font-bold text-white block mb-0.5">{currentPhase.name} Cue:</span>
            <span className="text-sky-300/90 leading-relaxed">{currentPhase.cue}</span>
          </div>
        </div>
      </div>

      {/* "DO THIS" vs "AVOID THIS" Side-by-Side Technique Visual Comparison */}
      <div className="p-4 bg-[#0f172a] space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold font-heading uppercase text-white flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>Biomechanics & Form Execution Standards</span>
          </h4>
          <button
            onClick={() => setShowDoDont(!showDoDont)}
            className="text-[11px] font-mono text-sky-400 hover:underline cursor-pointer"
          >
            {showDoDont ? 'Hide Checkpoints' : 'Show Checkpoints'}
          </button>
        </div>

        {showDoDont && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {/* DO THIS COLUMN */}
            <div className="bg-[#142242] p-3.5 rounded-xl border border-blue-600/40 space-y-2">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 fill-sky-400/20 text-sky-400" />
                <span className="uppercase tracking-wide font-mono">DO THIS (Proper Form)</span>
              </div>
              <ul className="space-y-1.5 text-xs text-gray-200">
                {videoData.doAndDont.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-sky-400 font-bold">•</span>
                    <span>{item.doText}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* AVOID THIS COLUMN */}
            <div className="bg-[#241617] p-3.5 rounded-xl border border-red-500/30 space-y-2">
              <div className="flex items-center gap-2 text-red-400 font-bold text-xs">
                <XCircle className="w-4 h-4 fill-red-400/20 text-red-400" />
                <span className="uppercase tracking-wide font-mono">AVOID THIS (Common Faults)</span>
              </div>
              <ul className="space-y-1.5 text-xs text-gray-300">
                {videoData.doAndDont.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">•</span>
                    <span>{item.dontText}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
