import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GymLogo } from '../common/GymLogo';
import { HeartRateMonitor } from '../common/HeartRateMonitor';
import { GamificationBadges } from '../common/GamificationBadges';
import { WarmUpModal } from '../common/WarmUpModal';
import { DailyMotivationQuoteCard } from '../common/DailyMotivationQuoteCard';
import {
  Search,
  Dumbbell,
  Layers,
  Calendar,
  BookOpen,
  User,
  ChevronRight,
  Flame,
  Activity,
  Play,
  Video,
  Sparkles,
  Smartphone,
  Utensils,
  Sun,
  Moon,
  Heart
} from 'lucide-react';

export const HomeDashboard: React.FC = () => {
  const {
    setActiveTab,
    routines,
    activeWorkout,
    setSelectedStudioExerciseId,
    theme,
    toggleTheme
  } = useApp();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isWarmUpOpen, setIsWarmUpOpen] = useState<boolean>(false);

  const isLight = theme === 'light';
  const nextRoutine = routines[0];

  return (
    <div
      className={`flex flex-col h-full pb-24 overflow-y-auto transition-colors duration-200 ${
        isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#080d1a] text-gray-100'
      }`}
    >
      {/* Top Bar Header with Gym Logo & Theme Toggle */}
      <div
        className={`px-5 pt-4 pb-3 flex items-center justify-between border-b backdrop-blur-md sticky top-0 z-10 transition-colors ${
          isLight ? 'bg-white/90 border-slate-200' : 'bg-[#0b1222]/80 border-[#213253]'
        }`}
      >
        <GymLogo size="sm" />

        <div className="flex items-center gap-2">
          {/* Quick Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl border transition-colors ${
              isLight
                ? 'bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-300'
                : 'bg-[#111b33] hover:bg-[#182645] text-amber-400 border-[#213253]'
            }`}
            title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode (White Background)'}
            aria-label="Toggle theme"
          >
            {isLight ? <Moon className="w-4 h-4 fill-slate-700 text-slate-700" /> : <Sun className="w-4 h-4 fill-amber-400 text-amber-400" />}
          </button>

          {/* Heart Rate Compact Telemetry */}
          <HeartRateMonitor compact />

          <button
            onClick={() => setActiveTab('apk-hub')}
            className={`flex items-center gap-1 px-2.5 py-1.5 border rounded-xl text-[11px] font-mono transition-colors ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-blue-600 border-slate-300'
                : 'bg-[#111b33] hover:bg-[#182645] text-sky-400 border-[#213253]'
            }`}
            title="Android APK Build Hub"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">APK</span>
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-5 max-w-xl mx-auto w-full">
        {/* Active Session Alert if running */}
        {activeWorkout && (
          <div className="bg-gradient-to-r from-blue-950/80 to-[#122040] p-3.5 rounded-2xl border border-blue-500/60 shadow-lg flex items-center justify-between gap-3 animate-pulse text-white">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
              <div>
                <span className="text-[10px] font-mono text-sky-400 uppercase font-bold block">
                  Session In Progress
                </span>
                <span className="text-xs font-bold text-white truncate">{activeWorkout.routineTitle}</span>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('tracker')}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
            >
              Resume
            </button>
          </div>
        )}

        {/* Greeting Section */}
        <div className="space-y-0.5 pt-1">
          <h1 className={`text-2xl sm:text-3xl font-extrabold font-heading tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Good Morning!
          </h1>
          <p className={`text-sm ${isLight ? 'text-slate-500' : 'text-gray-400'} font-sans`}>
            Train with intention. Fuel with precision.
          </p>
        </div>

        {/* DAILY MOTIVATION QUOTES CARD */}
        <DailyMotivationQuoteCard />

        {/* Search Bar */}
        <div className="relative">
          <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isLight ? 'text-slate-400' : 'text-gray-400'}`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setActiveTab('exercises');
              }
            }}
            placeholder="Search exercises, muscle groups, nutrition..."
            className={`w-full pl-10 pr-4 py-3 rounded-2xl text-xs sm:text-sm focus:outline-none transition-colors border shadow-inner ${
              isLight
                ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-500'
                : 'bg-[#0f172a] border-[#213253] text-white placeholder-gray-500 focus:border-blue-500'
            }`}
          />
        </div>

        {/* Big Colorful Grid Tiles */}
        <div className="grid grid-cols-2 gap-3.5">
          {/* Tile 1: Exercises (Blue #2563eb) */}
          <div
            onClick={() => setActiveTab('exercises')}
            className="bg-[#2563eb] hover:bg-[#1d4ed8] p-4 rounded-2xl cursor-pointer transition-all duration-200 shadow-lg shadow-blue-900/30 flex flex-col justify-between h-32 text-white group hover:scale-[1.02]"
          >
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base font-heading tracking-wide">Exercises</h3>
              <p className="text-[11px] text-blue-100/90 font-sans">100+ Visual Guides</p>
            </div>
          </div>

          {/* Tile 2: Goal Nutrition & Meal Plans (Emerald #059669) */}
          <div
            onClick={() => setActiveTab('nutrition')}
            className="bg-[#059669] hover:bg-[#047857] p-4 rounded-2xl cursor-pointer transition-all duration-200 shadow-lg shadow-emerald-900/30 flex flex-col justify-between h-32 text-white group hover:scale-[1.02]"
          >
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Utensils className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base font-heading tracking-wide">Meal Plans</h3>
              <p className="text-[11px] text-emerald-100/90 font-sans">Daily Goal Nutrition</p>
            </div>
          </div>

          {/* Tile 3: Home Workouts (Cyan/Sky) */}
          <div
            onClick={() => setActiveTab('home-workouts')}
            className="bg-[#0284c7] hover:bg-[#0369a1] p-4 rounded-2xl cursor-pointer transition-all duration-200 shadow-lg shadow-sky-900/30 flex flex-col justify-between h-32 text-white group hover:scale-[1.02]"
          >
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base font-heading tracking-wide">Home Workouts</h3>
              <p className="text-[11px] text-sky-100/90 font-sans">No equipment needed</p>
            </div>
          </div>

          {/* Tile 4: Custom Workout Plan (Indigo) */}
          <div
            onClick={() => setActiveTab('planner')}
            className="bg-[#4f46e5] hover:bg-[#4338ca] p-4 rounded-2xl cursor-pointer transition-all duration-200 shadow-lg shadow-indigo-900/30 flex flex-col justify-between h-32 text-white group hover:scale-[1.02]"
          >
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base font-heading tracking-wide">Custom Workout</h3>
              <p className="text-[11px] text-indigo-100/90 font-sans">Plan your training</p>
            </div>
          </div>
        </div>

        {/* Nutrition Highlight Banner */}
        <div
          onClick={() => setActiveTab('nutrition')}
          className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between shadow-md group ${
            isLight
              ? 'bg-gradient-to-r from-emerald-50 via-teal-50 to-white border-emerald-200 hover:border-emerald-400'
              : 'bg-gradient-to-r from-emerald-950/40 via-[#0f172a] to-[#122040] border-emerald-500/40 hover:border-emerald-400/60'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isLight ? 'bg-emerald-100 border border-emerald-300' : 'bg-emerald-500/20 border border-emerald-500/40'
              }`}
            >
              <Utensils className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className={`font-bold text-sm font-heading ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Goal Nutrition & Meal Plans
                </h4>
                <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 rounded text-[9px] font-mono font-bold">
                  EVIDENCE-BASED
                </span>
              </div>
              <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>
                Custom meal plans for Hypertrophy, Fat Loss & Strength with macro tracking
              </p>
            </div>
          </div>
          <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isLight ? 'text-slate-400' : 'text-gray-500'}`} />
        </div>

        {/* Prenatal Safe Exercises Highlight Banner */}
        <div
          onClick={() => setActiveTab('prenatal')}
          className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between shadow-md group ${
            isLight
              ? 'bg-gradient-to-r from-rose-50 via-pink-50 to-white border-rose-200 hover:border-rose-400'
              : 'bg-gradient-to-r from-rose-950/40 via-[#0f172a] to-[#122040] border-rose-500/40 hover:border-rose-400/60'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isLight ? 'bg-rose-100 border border-rose-300 text-rose-600' : 'bg-rose-500/20 border border-rose-500/40 text-rose-400'
              }`}
            >
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className={`font-bold text-sm font-heading ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Prenatal Safe Exercise Studio
                </h4>
                <span className="px-1.5 py-0.5 bg-rose-500/20 text-rose-600 dark:text-rose-300 rounded text-[9px] font-mono font-bold">
                  ACOG CLINICAL
                </span>
                <span className="px-1.5 py-0.5 bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded text-[9px] font-mono font-bold">
                  DUMBBELL SAFE
                </span>
              </div>
              <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>
                Trimester-adapted safe movements, light dumbbells, pelvic floor training & verified video tutorials
              </p>
            </div>
          </div>
          <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isLight ? 'text-slate-400' : 'text-gray-500'}`} />
        </div>

        {/* Dynamic 5-Minute Warm-Up Generator Card */}
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between gap-3 shadow-lg ${
            isLight
              ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
              : 'bg-gradient-to-r from-[#122040] to-[#0f172a] border-blue-500/40'
          }`}
        >
          <div className="space-y-1">
            <div className={`flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase ${isLight ? 'text-blue-600' : 'text-sky-400'}`}>
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>5-Minute Dynamic Warm-Up</span>
            </div>
            <div className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              RAMP Protocol: Raise, Mobilize & Potentiate
            </div>
            <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>
              Matches your session muscles to prevent injury & maximize output.
            </p>
          </div>

          <button
            onClick={() => setIsWarmUpOpen(true)}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-500/25 transition-all shrink-0 flex items-center gap-1"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Start</span>
          </button>
        </div>

        {/* Animated Workout Visual Demonstration Spotlight */}
        <div
          onClick={() => {
            setSelectedStudioExerciseId('barbell-back-squat');
            setActiveTab('3d-studio');
          }}
          className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between shadow-md ${
            isLight
              ? 'bg-white hover:bg-slate-50 border-slate-200 hover:border-blue-500/50'
              : 'bg-[#0f172a] hover:bg-[#162038] border-[#213253] hover:border-blue-500/50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isLight ? 'bg-blue-50 border border-blue-200 text-blue-600' : 'bg-blue-500/10 border border-blue-500/30 text-sky-400'
              }`}
            >
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h4 className={`font-bold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Animated Workout Studio
              </h4>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>
                Biomechanical movement pictures with live muscle activation heatmap
              </p>
            </div>
          </div>
          <ChevronRight className={`w-5 h-5 ${isLight ? 'text-slate-400' : 'text-gray-500'}`} />
        </div>

        {/* Real-Life Athlete Technique Video Vault */}
        <div
          onClick={() => setActiveTab('planner')}
          className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between shadow-md ${
            isLight
              ? 'bg-white hover:bg-slate-50 border-slate-200 hover:border-purple-400/50'
              : 'bg-[#0f172a] hover:bg-[#162038] border-[#213253] hover:border-blue-500/50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isLight ? 'bg-red-50 border border-red-200 text-red-600' : 'bg-red-500/10 border border-red-500/30 text-red-400'
              }`}
            >
              <Play className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className={`font-bold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Real-Life Technique Videos
                </h4>
                <span className="px-1.5 py-0.5 bg-red-500/15 text-red-600 dark:text-red-300 rounded text-[9px] font-mono font-bold">
                  FREE YOUTUBE
                </span>
              </div>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>
                Top coach tutorials explaining proper exercise execution & form cues
              </p>
            </div>
          </div>
          <ChevronRight className={`w-5 h-5 ${isLight ? 'text-slate-400' : 'text-gray-500'}`} />
        </div>

        {/* Gamification Streak & Badges Compact Bar */}
        <GamificationBadges />
      </div>

      {/* Warm-Up Generator Modal */}
      <WarmUpModal
        isOpen={isWarmUpOpen}
        onClose={() => setIsWarmUpOpen(false)}
        initialMuscleGroups={nextRoutine?.targetMuscleGroups || ['Chest', 'Shoulders']}
      />
    </div>
  );
};
