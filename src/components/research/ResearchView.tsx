import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RESEARCH_ARTICLES, RESEARCH_CATEGORIES } from '../../data/researchData';
import { ResearchArticle } from '../../types';
import {
  BookOpen,
  Search,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Clock,
  Sparkles,
  ChevronRight,
  X,
  FileText,
  ShieldCheck
} from 'lucide-react';

export const ResearchView: React.FC = () => {
  const { bookmarkedArticleIds, toggleBookmarkArticle, setActiveTab } = useApp();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [readingArticle, setReadingArticle] = useState<ResearchArticle | null>(null);
  const [onlyBookmarks, setOnlyBookmarks] = useState<boolean>(false);

  const filteredArticles = RESEARCH_ARTICLES.filter((article) => {
    if (onlyBookmarks && !bookmarkedArticleIds.includes(article.id)) return false;

    if (selectedCategory !== 'All' && article.category !== selectedCategory) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matches =
        article.title.toLowerCase().includes(q) ||
        article.plainSummary.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q) ||
        article.citations.some(c => c.authors.toLowerCase().includes(q) || c.title.toLowerCase().includes(q));
      if (!matches) return false;
    }

    return true;
  });

  return (
    <div className="flex flex-col h-full bg-[#080d1a] text-gray-100 pb-24">
      {/* Header */}
      <div className="p-4 sm:p-5 bg-[#0f172a] border-b border-[#213253]">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 neon-glow" />
              <h1 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-wide">
                FITNESS SCIENCE RESEARCH HUB
              </h1>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Peer-reviewed exercise science, meta-analyses & biomechanical evidence breakdowns
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setOnlyBookmarks(!onlyBookmarks)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                onlyBookmarks
                  ? 'bg-blue-600/20 text-sky-300 border-blue-600/50'
                  : 'bg-[#162038] text-gray-400 border-[#213253] hover:text-white'
              }`}
            >
              {onlyBookmarks ? <BookmarkCheck className="w-3.5 h-3.5 text-sky-400" /> : <Bookmark className="w-3.5 h-3.5" />}
              <span>Saved ({bookmarkedArticleIds.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('ai-assistant')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#162038] hover:bg-[#1f2d4d] text-sky-400 text-xs font-semibold rounded-lg border border-blue-600/40"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI About Studies</span>
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative mb-3">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search papers, authors (Schoenfeld, Morton), or topics (hypertrophy, protein, sleep)..."
            className="w-full pl-10 pr-4 py-2 bg-[#162038] border border-[#213253] rounded-xl text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-600 transition-colors"
          />
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {RESEARCH_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/20'
                  : 'bg-[#162038] text-gray-400 hover:text-white border border-[#213253]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="flex-1 p-4 sm:p-5 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredArticles.map((article) => {
            const isBookmarked = bookmarkedArticleIds.includes(article.id);

            return (
              <div
                key={article.id}
                className="bg-[#0f172a] rounded-xl border border-[#213253] hover:border-blue-600/50 p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-xl hover:shadow-blue-950/20"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span
                      className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded uppercase ${
                        article.evidenceStrength === 'Strong Consensus'
                          ? 'bg-blue-600/20 text-sky-400 border border-blue-600/30'
                          : article.evidenceStrength === 'Debunked Myth'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {article.evidenceStrength}
                    </span>

                    <button
                      onClick={() => toggleBookmarkArticle(article.id)}
                      className="text-gray-400 hover:text-sky-400 transition-colors p-1"
                      title={isBookmarked ? 'Remove Bookmark' : 'Save Article'}
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="w-4 h-4 text-sky-400 fill-sky-400/20" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <h3
                    onClick={() => setReadingArticle(article)}
                    className="font-bold text-sm sm:text-base text-white hover:text-sky-400 cursor-pointer transition-colors leading-snug"
                  >
                    {article.title}
                  </h3>

                  {/* Plain Language Summary Box */}
                  <div className="mt-2.5 p-3 rounded-lg bg-[#162038] border border-[#213253] text-xs text-gray-300 leading-relaxed">
                    <span className="text-sky-400 font-semibold font-mono text-[10px] uppercase block mb-1">
                      Plain Summary:
                    </span>
                    {article.plainSummary}
                  </div>

                  {/* Authors / Citations snippet */}
                  <div className="mt-3 text-[11px] text-gray-400 font-mono flex items-center gap-2">
                    <span className="text-gray-500">Ref:</span>
                    <span className="truncate">{article.citations[0].authors} ({article.citations[0].year})</span>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-[#1c2948] flex items-center justify-between text-xs">
                  <span className="text-gray-400 flex items-center gap-1 font-mono text-[11px]">
                    <Clock className="w-3 h-3 text-sky-400" />
                    {article.readTimeMinutes} min read
                  </span>

                  <button
                    onClick={() => setReadingArticle(article)}
                    className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1"
                  >
                    <span>Read Deep Dive</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reading Article Full Drawer Modal */}
      {readingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#0f172a] border border-[#213253] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
            {/* Modal Top Bar */}
            <div className="sticky top-0 z-20 bg-[#0f172a]/95 backdrop-blur-md px-5 py-4 border-b border-[#213253] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded uppercase ${
                    readingArticle.evidenceStrength === 'Strong Consensus'
                      ? 'bg-blue-600/20 text-sky-400 border border-blue-600/30'
                      : readingArticle.evidenceStrength === 'Debunked Myth'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {readingArticle.evidenceStrength}
                </span>
                <span className="text-xs text-gray-400 font-mono">• Review: {readingArticle.reviewDate}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleBookmarkArticle(readingArticle.id)}
                  className="p-2 rounded-xl bg-[#162038] hover:bg-[#1f2d4d] text-gray-300 border border-[#213253]"
                >
                  {bookmarkedArticleIds.includes(readingArticle.id) ? (
                    <BookmarkCheck className="w-4 h-4 text-sky-400 fill-sky-400/20" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => setReadingArticle(null)}
                  className="p-2 rounded-xl bg-[#162038] hover:bg-[#1f2d4d] text-gray-300 border border-[#213253]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-bold font-heading text-white leading-snug">
                  {readingArticle.title}
                </h2>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-sky-400 font-mono">
                  <span>Category: {readingArticle.category}</span>
                  <span>•</span>
                  <span>{readingArticle.readTimeMinutes} min deep read</span>
                </div>
              </div>

              {/* Plain Language Summary */}
              <div className="p-4 rounded-xl bg-[#162038] border border-blue-600/30 space-y-1">
                <div className="text-xs font-mono font-bold uppercase text-sky-400 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Plain-Language Synthesis</span>
                </div>
                <p className="text-sm text-gray-200 leading-relaxed">{readingArticle.plainSummary}</p>
              </div>

              {/* Detailed Academic Analysis */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono font-bold uppercase text-gray-400">
                  Comprehensive Scientific Breakdown
                </h3>
                <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-line space-y-3 bg-[#0a1020] p-4 rounded-xl border border-[#213253]">
                  {readingArticle.detailedExplanation}
                </div>
              </div>

              {/* Practical Applications */}
              <div className="p-4 rounded-xl bg-[#162038] border border-[#213253] space-y-2">
                <h3 className="text-xs font-mono font-bold uppercase text-sky-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Practical Gym / Home Applications</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                  {readingArticle.practicalApplications.map((app, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-sky-400 font-bold shrink-0 mt-0.5">✓</span>
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Limitations */}
              <div className="p-4 rounded-xl bg-[#162038] border border-amber-500/20 space-y-2">
                <h3 className="text-xs font-mono font-bold uppercase text-amber-400 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  <span>Important Scientific Limitations & Boundary Conditions</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-gray-300">
                  {readingArticle.limitations.map((lim, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400 shrink-0">•</span>
                      <span>{lim}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Peer-Reviewed Citations */}
              <div className="p-4 rounded-xl bg-[#0e1311] border border-[#213253] space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase text-gray-400 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-sky-400" />
                  <span>Peer-Reviewed Literature & DOI Sources</span>
                </h3>

                <div className="space-y-2.5">
                  {readingArticle.citations.map((c, idx) => (
                    <div key={idx} className="text-xs text-gray-300 bg-[#111b33] p-3 rounded-lg border border-[#213253]">
                      <div className="font-semibold text-white">{c.title}</div>
                      <div className="text-gray-400 font-mono text-[11px] mt-0.5">
                        {c.authors} ({c.year}) — <span className="italic">{c.journal}</span>
                      </div>
                      <a
                        href={c.doiOrUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 font-mono text-[11px] mt-1.5"
                      >
                        <span>View Source / DOI</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="p-4 bg-[#0f172a] border-t border-[#213253] flex items-center justify-between">
              <button
                onClick={() => setReadingArticle(null)}
                className="px-4 py-2 bg-[#162038] hover:bg-[#1f2d4d] text-gray-300 text-xs rounded-xl border border-[#213253]"
              >
                Close Article
              </button>

              <button
                onClick={() => {
                  setReadingArticle(null);
                  setActiveTab('ai-assistant');
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask AI About This Topic</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
