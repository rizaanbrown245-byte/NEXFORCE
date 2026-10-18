import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NavigationTab } from '../../types';
import { GymLogo } from '../common/GymLogo';
import {
  Home,
  Dumbbell,
  Calendar,
  User,
  Box,
  Layers,
  BookOpen,
  Activity,
  Bot,
  Smartphone,
  Menu,
  X,
  Play,
  Sun,
  Moon,
  Utensils,
  Heart
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, activeWorkout, theme, toggleTheme } = useApp();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const drawerNavItems: { tab: NavigationTab; label: string; icon: React.ReactNode }[] = [
    { tab: 'home', label: 'Home Dashboard', icon: <Home className="w-5 h-5" /> },
    { tab: 'exercises', label: 'Exercise Library', icon: <Dumbbell className="w-5 h-5" /> },
    { tab: '3d-studio', label: 'Workout Animation Studio', icon: <Play className="w-5 h-5" /> },
    { tab: 'prenatal', label: 'Prenatal Safe Exercises', icon: <Heart className="w-5 h-5 text-rose-500 fill-rose-500/20" /> },
    { tab: 'nutrition', label: 'Nutrition & Meal Plans', icon: <Utensils className="w-5 h-5 text-emerald-400" /> },
    { tab: 'home-workouts', label: 'Home Workouts (No-Gym)', icon: <Layers className="w-5 h-5" /> },
    { tab: 'planner', label: 'Custom Workout Plan', icon: <Calendar className="w-5 h-5" /> },
    { tab: 'tracker', label: 'Progress & Tracking', icon: <Activity className="w-5 h-5" /> },
    { tab: 'research', label: 'Fitness Science Hub', icon: <BookOpen className="w-5 h-5" /> },
    { tab: 'ai-assistant', label: 'AI Research Assistant', icon: <Bot className="w-5 h-5" /> },
    { tab: 'profile', label: 'Profile & Settings', icon: <User className="w-5 h-5" /> },
    { tab: 'apk-hub', label: 'Android APK Hub', icon: <Smartphone className="w-5 h-5" /> },
  ];

  const handleSelectTab = (tab: NavigationTab) => {
    setActiveTab(tab);
    setIsDrawerOpen(false);
  };

  const isLight = theme === 'light';

  return (
    <>
      {/* Top Header Bar */}
      <header
        className={`sticky top-0 z-30 backdrop-blur-md px-4 py-2.5 flex items-center justify-between transition-colors border-b ${
          isLight
            ? 'bg-white/95 border-slate-200 text-slate-800 shadow-sm'
            : 'bg-[#080d1a]/95 border-[#213253] text-gray-100'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className={`p-1.5 rounded-xl border transition-colors ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                : 'bg-[#0f172a] hover:bg-[#162038] text-gray-300 border-[#213253]'
            }`}
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div
            onClick={() => handleSelectTab('home')}
            className="cursor-pointer"
          >
            <GymLogo size="sm" showText={true} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Prenatal Safe Studio Button */}
          <button
            onClick={() => handleSelectTab('prenatal')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
              activeTab === 'prenatal'
                ? 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-500/25 ring-2 ring-rose-400/40'
                : isLight
                ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200 shadow-sm'
                : 'bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 border-rose-500/40'
            }`}
            title="Prenatal Safe Exercise Studio"
            aria-label="Open Prenatal Safe Exercises"
          >
            <Heart className={`w-3.5 h-3.5 ${activeTab === 'prenatal' ? 'fill-white' : 'fill-rose-500 text-rose-500'}`} />
            <span className="hidden sm:inline font-mono text-[11px] font-bold">Prenatal</span>
          </button>

          {/* Quick Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
              isLight
                ? 'bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-300/80 shadow-sm'
                : 'bg-[#162038] hover:bg-[#1f2d4d] text-sky-300 border-blue-500/30'
            }`}
            title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode (White Background)'}
            aria-label="Toggle dark mode"
          >
            {isLight ? (
              <>
                <Moon className="w-4 h-4 text-slate-700 fill-slate-700" />
                <span className="hidden sm:inline text-slate-800 text-[11px] font-mono">Dark Mode</span>
              </>
            ) : (
              <>
                <Sun className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="hidden sm:inline text-amber-300 text-[11px] font-mono">Light Mode</span>
              </>
            )}
          </button>

          {/* Live workout pill in header if active */}
          {activeWorkout && (
            <button
              onClick={() => handleSelectTab('tracker')}
              className="flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 text-sky-400 border border-blue-500/40 rounded-full text-xs font-mono font-bold animate-pulse"
            >
              <Play className="w-3 h-3 fill-current" />
              <span className="hidden sm:inline">Active Workout</span>
            </button>
          )}
        </div>
      </header>

      {/* Slide-out Navigation Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />

          <div
            className={`relative w-72 max-w-[85vw] border-r h-full flex flex-col z-10 shadow-2xl transition-colors ${
              isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#0f172a] border-[#213253] text-gray-100'
            }`}
          >
            <div className={`p-4 border-b flex items-center justify-between ${isLight ? 'border-slate-200' : 'border-[#213253]'}`}>
              <GymLogo size="sm" showText={true} />
              <button
                onClick={() => setIsDrawerOpen(false)}
                className={`p-1 rounded-lg ${isLight ? 'text-slate-400 hover:text-slate-700' : 'text-gray-400 hover:text-white'}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              {drawerNavItems.map((item) => (
                <button
                  key={item.tab}
                  onClick={() => handleSelectTab(item.tab)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    activeTab === item.tab
                      ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/25'
                      : isLight
                      ? 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                      : 'text-gray-300 hover:bg-[#162038] hover:text-white'
                  }`}
                >
                  <span className={activeTab === item.tab ? 'text-white' : 'text-sky-500'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <div className={`p-3 border-t text-center ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#080d1a] border-[#213253]'}`}>
              <p className={`text-[10px] font-mono ${isLight ? 'text-blue-600 font-semibold' : 'text-sky-400'}`}>
                Train Smarter • Build Stronger • Live Healthier
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <nav
        className={`fixed bottom-0 left-0 right-0 z-30 backdrop-blur-lg border-t px-2 sm:px-4 py-2 flex items-center justify-around shadow-2xl max-w-lg mx-auto sm:max-w-none transition-colors ${
          isLight ? 'bg-white/95 border-slate-200 text-slate-800' : 'bg-[#0b1120]/95 border-[#213253] text-gray-100'
        }`}
      >
        {[
          { tab: 'home' as NavigationTab, label: 'Home', icon: <Home className="w-5 h-5" /> },
          { tab: 'exercises' as NavigationTab, label: 'Exercises', icon: <Dumbbell className="w-5 h-5" /> },
          { tab: 'prenatal' as NavigationTab, label: 'Prenatal', icon: <Heart className="w-5 h-5" />, isPrenatal: true },
          { tab: 'nutrition' as NavigationTab, label: 'Nutrition', icon: <Utensils className="w-5 h-5" /> },
          { tab: 'planner' as NavigationTab, label: 'Workouts', icon: <Calendar className="w-5 h-5" /> },
          { tab: 'tracker' as NavigationTab, label: 'Tracker', icon: <Activity className="w-5 h-5" /> },
          { tab: 'profile' as NavigationTab, label: 'Profile', icon: <User className="w-5 h-5" /> },
        ].map((item) => {
          const isActive = activeTab === item.tab;
          return (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              className={`flex flex-col items-center justify-center py-1 px-1.5 sm:px-2.5 rounded-xl transition-all relative ${
                isActive
                  ? item.isPrenatal
                    ? 'text-rose-500 font-bold scale-105'
                    : 'text-blue-600 font-bold scale-105'
                  : isLight
                  ? 'text-slate-500 hover:text-slate-800'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.tab === 'tracker' && activeWorkout && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                )}
              </div>
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
              {isActive && (
                <span className={`w-1.5 h-1.5 rounded-full mt-0.5 shadow-sm ${
                  item.isPrenatal ? 'bg-rose-500 shadow-rose-500/50' : 'bg-blue-600 shadow-blue-500/50'
                }`} />
              )}
            </button>
          );
        })}
      </nav>
    </>
  );
};
