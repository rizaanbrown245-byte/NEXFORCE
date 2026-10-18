import React, { useState } from 'react';
import { Exercise } from '../../types';
import { useApp } from '../../context/AppContext';
import { TechniqueVideoPlayer } from '../common/TechniqueVideoPlayer';
import { getTechniqueVideoForExercise } from '../../data/techniqueVideosData';
import {
  ArrowLeft,
  Dumbbell,
  Play,
  Check,
  Info,
  ShieldAlert,
  ChevronRight,
  Sparkles,
  Bookmark,
  BookmarkCheck,
  Video,
  Box,
  Activity
} from 'lucide-react';

interface ExerciseDetailScreenProps {
  exercise: Exercise;
  onBack: () => void;
  onOpen3DStudio?: () => void;
}

export const ExerciseDetailScreen: React.FC<ExerciseDetailScreenProps> = ({
  exercise,
  onBack,
  onOpen3DStudio
}) => {
  const { startWorkout, setSelectedStudioExerciseId, setActiveTab: setGlobalActiveTab } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'video' | 'steps' | 'sets-reps' | 'research'>('overview');
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  const heroImageSrc =
    exercise.techniqueVideo?.thumbnailUrl ||
    'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=700&q=80';

  const onOpen3DAnimation = () => {
    setSelectedStudioExerciseId(exercise.id);
    setGlobalActiveTab('3d-studio');
  };

  const videoData = getTechniqueVideoForExercise(exercise.id, exercise.category);

  return (
    <div className="flex flex-col h-full bg-[#080d1a] text-gray-100 pb-24">
      {/* Top Header */}
      <div className="sticky top-0 z-20 bg-[#0f172a]/95 backdrop-blur-md px-4 py-3 border-b border-[#213253] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 rounded-xl bg-[#162038] text-gray-300 hover:text-white border border-[#213253]"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base sm:text-lg font-bold font-heading text-white">{exercise.name}</h1>
            <span className="text-[11px] font-mono text-sky-400">3D & Real Video Biomechanics</span>
          </div>
        </div>

        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className="p-2 rounded-xl bg-[#162038] hover:bg-[#1f2d4d] text-gray-400 hover:text-white border border-[#213253]"
        >
          {isBookmarked ? (
            <BookmarkCheck className="w-5 h-5 text-sky-400 fill-sky-400/20" />
          ) : (
            <Bookmark className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Segmented Sub Tabs: [Overview], [Real Video], [Steps], [Sets & Reps], [Research] */}
      <div className="px-4 py-2 bg-[#0f172a] border-b border-[#213253] flex items-center justify-between overflow-x-auto scrollbar-none gap-1.5">
        {[
          { id: 'overview' as const, label: 'Overview' },
          { id: 'video' as const, label: 'Real Video' },
          { id: 'steps' as const, label: 'How to do it' },
          { id: 'sets-reps' as const, label: 'Sets & Reps' },
          { id: 'research' as const, label: 'Research' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold whitespace-nowrap transition-all text-center flex items-center justify-center gap-1.5 ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/25'
                : 'bg-[#162038] text-gray-400 hover:text-white border border-[#213253]'
            }`}
          >
            {tab.id === 'video' && <Video className="w-3.5 h-3.5" />}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-5 max-w-2xl mx-auto w-full">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* 3D Anatomical Render Visual with Glowing Muscles */}
            <div className="relative rounded-2xl overflow-hidden bg-[#0a1020] border border-[#213253] shadow-2xl group">
              <img
                src={heroImageSrc}
                alt={exercise.name}
                referrerPolicy="no-referrer"
                className="w-full h-64 sm:h-72 object-cover object-center group-hover:scale-102 transition-transform duration-300"
              />

              {/* 3D Interactive Badge Overlay */}
              <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-blue-500/60 text-xs font-mono text-sky-300 flex items-center gap-1.5 shadow-lg">
                <Box className="w-3.5 h-3.5 text-sky-400" />
                <span>3D Visual Model</span>
              </div>
            </div>

            {/* Primary Muscle & Muscle Tags */}
            <div className="space-y-2">
              <div className="text-xs font-mono text-gray-400">
                Primary Muscle: <span className="text-white font-bold">{exercise.primaryMuscles[0]}</span>
              </div>

              {/* Colorful Pill Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-500/20 text-sky-300 text-xs font-bold rounded-lg border border-blue-500/40">
                  {exercise.primaryMuscles[0]}
                </span>
                {exercise.secondaryMuscles.map((sec, idx) => (
                  <span
                    key={sec}
                    className="px-3 py-1 bg-[#162038] text-gray-300 text-xs font-bold rounded-lg border border-[#213253]"
                  >
                    {sec}
                  </span>
                ))}
              </div>
            </div>

            {/* How to do it: Numbered Steps */}
            <div className="bg-[#0f172a] p-4 sm:p-5 rounded-2xl border border-[#213253] space-y-3">
              <h3 className="font-bold text-sm sm:text-base text-white">How to do it:</h3>
              <ol className="space-y-2.5 text-xs text-gray-300">
                {exercise.executionSteps.slice(0, 4).map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-sky-400 font-mono font-bold">{idx + 1}.</span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Action Buttons: Watch Real Video + View 3D Animation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <button
                onClick={() => setActiveTab('video')}
                className="w-full py-3.5 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-red-600/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <Play className="w-5 h-5 fill-white" />
                <span>Watch Real Video (Free YouTube)</span>
              </button>

              <button
                onClick={onOpen3DAnimation}
                className="w-full py-3.5 bg-[#162038] hover:bg-[#1f2d4d] text-sky-400 border border-blue-500/40 font-bold text-sm rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <Activity className="w-5 h-5 text-sky-400" />
                <span>Workout Animation</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB: REAL LIFE ATHLETE TECHNIQUE VIDEO */}
        {activeTab === 'video' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold font-heading text-white flex items-center gap-2">
                  <Play className="w-5 h-5 text-red-500 fill-red-500" />
                  <span>Real Video Tutorial (Free YouTube Explanation)</span>
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Watch top certified coaches explain the workout form, cues, and execution standards.
                </p>
              </div>
            </div>

            <TechniqueVideoPlayer
              exercise={exercise}
              videoData={videoData}
              onOpen3D={onOpen3DAnimation}
            />
          </div>
        )}

        {/* TAB 2: HOW TO DO IT (STEP BY STEP) */}
        {activeTab === 'steps' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold font-heading text-white">How to do it (Step by Step)</h2>

            <div className="space-y-3">
              {exercise.executionSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-[#0f172a] p-4 rounded-2xl border border-[#213253] flex items-start gap-3.5"
                >
                  <div className="w-7 h-7 rounded-xl bg-blue-500/20 text-sky-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-blue-500/40 mt-0.5">
                    {idx + 1}.
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-xs sm:text-sm text-white">
                      {idx === 0
                        ? 'Starting Stance & Setup'
                        : idx === 1
                        ? 'Eccentric Initiation'
                        : idx === 2
                        ? 'Depth & Turnaround Point'
                        : 'Concentric Drive & Lockout'}
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">• {step}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tip Box */}
            <div className="bg-[#122040] border border-blue-500/40 p-4 rounded-2xl text-xs text-sky-200 space-y-1">
              <span className="font-bold text-sky-400 block font-mono">Form Tip:</span>
              <p className="leading-relaxed">
                {exercise.postureCues[0] || 'Keep your back straight and avoid letting your knees collapse inward.'}
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: SETS & REPS */}
        {activeTab === 'sets-reps' && (
          <div className="space-y-4">
            <div className="bg-[#0f172a] p-4 rounded-2xl border border-[#213253] space-y-2">
              <h3 className="font-bold text-sm text-white">How It Helps</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                {exercise.shortSummary}
              </p>
            </div>

            {/* Recommended Sets & Reps Table */}
            <div className="bg-[#0f172a] p-4 rounded-2xl border border-[#213253] space-y-3">
              <h3 className="font-bold text-sm text-white">Recommended Sets & Reps</h3>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between p-2.5 bg-[#162038] rounded-xl border border-[#213253]">
                  <span className="text-gray-300 font-semibold">Beginners</span>
                  <span className="text-sky-400 font-bold">3 × 10–12</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-[#162038] rounded-xl border border-[#213253]">
                  <span className="text-gray-300 font-semibold">Intermediate</span>
                  <span className="text-sky-400 font-bold">4 × 8–10</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-[#162038] rounded-xl border border-[#213253]">
                  <span className="text-gray-300 font-semibold">Advanced</span>
                  <span className="text-sky-400 font-bold">4–6 × 6–8</span>
                </div>
              </div>
            </div>

            {/* Safety Tips */}
            <div className="bg-[#0f172a] p-4 rounded-2xl border border-[#213253] space-y-3">
              <h3 className="font-bold text-sm text-white">Safety Tips</h3>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Keep your back neutral and avoid spinal rounding</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Don&apos;t let your knees cave inward on ascent</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Control the descent over 2–3 seconds</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Warm up with 5-minute dynamic primer before working sets</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 4: RESEARCH */}
        {activeTab === 'research' && (
          <div className="space-y-4">
            <div className="bg-[#0f172a] p-4 rounded-2xl border border-[#213253] space-y-2">
              <span className="text-[11px] font-mono text-sky-400 font-bold uppercase">Quick Summary</span>
              <p className="text-xs text-gray-300 leading-relaxed">
                {exercise.shortSummary}
              </p>
            </div>

            <div className="bg-[#0f172a] p-4 rounded-2xl border border-[#213253] space-y-3">
              <h3 className="font-bold text-sm text-white">Benefits</h3>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Builds primary muscle strength and functional cross-sectional area</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Improves joint stability, balance, and connective tissue resilience</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>High mechanical energy expenditure and metabolic rate</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Versatile options available for both gym and home training</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#162038] p-4 rounded-2xl border border-[#213253] text-xs space-y-1">
              <span className="text-sky-400 font-bold font-mono">Biomechanical Focus:</span>
              <p className="text-gray-300">{exercise.biomechanicalFocus}</p>
            </div>
          </div>
        )}

        {/* Bottom CTA to start tracking */}
        <div className="pt-2">
          <button
            onClick={() => startWorkout(undefined, exercise)}
            className="w-full py-3 bg-[#162038] hover:bg-[#1f2d4d] text-sky-400 font-bold text-xs rounded-xl border border-blue-500/40 flex items-center justify-center gap-2 transition-colors"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Start Tracking This Exercise Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
