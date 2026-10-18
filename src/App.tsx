import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { HomeDashboard } from './components/home/HomeDashboard';
import { ExerciseList } from './components/exercises/ExerciseList';
import { ThreeDStudio } from './components/studio/ThreeDStudio';
import { HomeWorkoutsView } from './components/homeWorkouts/HomeWorkoutsView';
import { WorkoutPlannerView } from './components/planner/WorkoutPlannerView';
import { LiveWorkoutTracker } from './components/tracker/LiveWorkoutTracker';
import { ProgressView } from './components/tracker/ProgressView';
import { ResearchView } from './components/research/ResearchView';
import { AIAssistantView } from './components/assistant/AIAssistantView';
import { ProfileView } from './components/profile/ProfileView';
import { AndroidBuildHub } from './components/apk/AndroidBuildHub';
import { NutritionMealPlannerView } from './components/nutrition/NutritionMealPlannerView';
import { PrenatalSafeExerciseView } from './components/prenatal/PrenatalSafeExerciseView';
import { OnboardingModal } from './components/common/OnboardingModal';
import {
  Smartphone,
  Wifi,
  Battery
} from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeTab, activeWorkout, isAndroidFrameMode, setIsAndroidFrameMode, theme } = useApp();
  const [trackerSubTab, setTrackerSubTab] = useState<'live' | 'progress'>('live');

  // Render the current view according to activeTab
  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeDashboard />;
      case 'exercises':
        return <ExerciseList />;
      case 'nutrition':
        return <NutritionMealPlannerView />;
      case 'prenatal':
        return <PrenatalSafeExerciseView />;
      case '3d-studio':
        return <ThreeDStudio />;
      case 'home-workouts':
        return <HomeWorkoutsView />;
      case 'planner':
        return <WorkoutPlannerView />;
      case 'tracker':
        return (
          <div className="flex flex-col h-full">
            {/* Sub-bar toggle between live tracker and progress analytics if workout is running */}
            {activeWorkout && (
              <div className="bg-[#0f172a] px-4 py-2 border-b border-[#213253] flex items-center justify-center gap-2 text-xs">
                <button
                  onClick={() => setTrackerSubTab('live')}
                  className={`px-3 py-1 rounded-lg font-mono transition-colors ${
                    trackerSubTab === 'live'
                      ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Active Session
                </button>
                <button
                  onClick={() => setTrackerSubTab('progress')}
                  className={`px-3 py-1 rounded-lg font-mono transition-colors ${
                    trackerSubTab === 'progress'
                      ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Analytics & History
                </button>
              </div>
            )}
            {activeWorkout && trackerSubTab === 'live' ? (
              <LiveWorkoutTracker />
            ) : (
              <ProgressView />
            )}
          </div>
        );
      case 'research':
        return <ResearchView />;
      case 'ai-assistant':
        return <AIAssistantView />;
      case 'profile':
        return <ProfileView />;
      case 'apk-hub':
        return <AndroidBuildHub />;
      default:
        return <HomeDashboard />;
    }
  };

  const currentClock = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Android Phone Shell Simulator Frame
  if (isAndroidFrameMode) {
    return (
      <div className="min-h-screen bg-[#040711] flex flex-col items-center justify-center p-2 sm:p-6 select-none">
        {/* Frame Toggle Floating Switch */}
        <div className="mb-3 flex items-center gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1.5 font-mono text-sky-400">
            <Smartphone className="w-4 h-4" />
            <span>Android Flagship Preview (390 x 844)</span>
          </span>
          <button
            onClick={() => setIsAndroidFrameMode(false)}
            className="px-2.5 py-1 bg-[#162038] hover:bg-[#1f2d4d] text-white rounded-lg border border-[#213253]"
          >
            Exit Frame Mode
          </button>
        </div>

        {/* Android Device Bezel */}
        <div className="relative w-full max-w-[420px] h-[860px] max-h-[92vh] bg-[#080d1a] rounded-[48px] border-[10px] border-[#1e293b] shadow-2xl overflow-hidden flex flex-col ring-1 ring-blue-500/30">
          {/* Simulated Android Status Bar */}
          <div className="bg-[#080d1a] px-6 pt-2 pb-1 flex items-center justify-between text-xs text-gray-300 font-mono shrink-0 select-none border-b border-[#162038]">
            <span>{currentClock}</span>
            {/* Punch Hole Camera */}
            <div className="w-4 h-4 rounded-full bg-black border border-gray-800 -mt-1" />
            <div className="flex items-center gap-1.5 text-sky-400">
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4 fill-sky-400" />
            </div>
          </div>

          {/* App Body Inside Android Frame */}
          <div className="flex-1 flex flex-col overflow-hidden relative">
            <Navbar />
            <main className="flex-1 overflow-hidden relative">
              {renderActiveView()}
            </main>
          </div>

          {/* Simulated Android Gesture Navigation Pill Bar */}
          <div className="bg-[#080d1a] py-2 flex items-center justify-center shrink-0 border-t border-[#162038]">
            <div className="w-32 h-1 bg-gray-500 rounded-full" />
          </div>
        </div>

        <OnboardingModal />
      </div>
    );
  }

  // Full Screen Responsive Viewport
  const isLight = theme === 'light';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans selection:bg-blue-600 selection:text-white transition-colors duration-200 ${
        isLight ? 'bg-white text-slate-900 light' : 'bg-[#080d1a] text-gray-100 dark'
      }`}
    >
      <Navbar />
      <main className="flex-1 overflow-hidden relative flex flex-col">
        {renderActiveView()}
      </main>
      <OnboardingModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
