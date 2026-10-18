import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MuscleGroup } from '../../types';
import { VisualExerciseFigure } from '../common/VisualExerciseFigure';
import { ExerciseDetailScreen } from './ExerciseDetailScreen';
import { MuscleGroupsBrowser } from './MuscleGroupsBrowser';
import {
  Search,
  Filter,
  Dumbbell,
  Video,
  Box,
  ChevronRight,
  Layers,
  Sparkles
} from 'lucide-react';

const MUSCLE_GROUPS_LIST: (MuscleGroup | 'All')[] = [
  'All',
  'Chest',
  'Back',
  'Shoulders',
  'Biceps',
  'Triceps',
  'Quadriceps',
  'Hamstrings',
  'Glutes',
  'Abdominals',
  'Full Body'
];

// High fidelity 3D render thumbnails mapped to exercise IDs
const IMAGE_3D_MAP: Record<string, string> = {
  'barbell-back-squat': 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=700&q=80',
  'barbell-bench-press': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=700&q=80',
  'conventional-deadlift': 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=700&q=80',
  'overhead-press': 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=700&q=80',
  'pull-up': 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=700&q=80',
  'barbell-bicep-curl': 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=700&q=80',
  'dumbbell-lunges': 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=700&q=80',
  'standard-pushup': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=700&q=80',
};

export const ExerciseList: React.FC = () => {
  const {
    exercises,
    selectedExercise,
    setSelectedExercise,
    setSelectedStudioExerciseId,
    setActiveTab
  } = useApp();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup | 'All'>('All');
  const [viewMode, setViewMode] = useState<'list' | 'muscle-groups'>('list');

  // Filter exercises by search and muscle group
  const filteredExercises = exercises.filter((ex) => {
    const matchesSearch =
      ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.targetMuscles.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.equipment.some((eq) => eq.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesMuscle =
      selectedMuscle === 'All' ||
      ex.primaryMuscles.includes(selectedMuscle) ||
      ex.secondaryMuscles.includes(selectedMuscle);

    return matchesSearch && matchesMuscle;
  });

  // If an exercise is selected, render the dedicated Detail Screen
  if (selectedExercise) {
    return (
      <ExerciseDetailScreen
        exercise={selectedExercise}
        onBack={() => setSelectedExercise(null)}
        onOpen3DStudio={() => {
          setSelectedStudioExerciseId(selectedExercise.id);
          setActiveTab('3d-studio');
          setSelectedExercise(null);
        }}
      />
    );
  }

  // If in Muscle Groups Browser view
  if (viewMode === 'muscle-groups') {
    return (
      <MuscleGroupsBrowser
        onSelectMuscleGroup={(group) => {
          setSelectedMuscle(group);
          setViewMode('list');
        }}
        onBack={() => setViewMode('list')}
      />
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#080d1a] text-gray-100 pb-24">
      {/* Exercise Library Header */}
      <div className="p-4 sm:p-5 bg-[#0f172a] border-b border-[#213253]">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
              <h1 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-wide">
                EXERCISE DATABASE
              </h1>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              40+ Anatomical exercises with 3D visuals & step-by-step guidance
            </p>
          </div>

          {/* Toggle between All Exercises and Muscle Groups Browser */}
          <div className="flex items-center bg-[#162038] p-0.5 rounded-xl border border-[#213253] text-xs">
            <button
              onClick={() => setViewMode('list')}
              className="px-3 py-1.5 rounded-lg font-semibold bg-blue-600 text-white font-bold shadow-md shadow-blue-500/25"
            >
              All Exercises
            </button>
            <button
              onClick={() => setViewMode('muscle-groups')}
              className="px-3 py-1.5 rounded-lg font-semibold text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Muscle Groups</span>
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
            placeholder="Search exercise, muscle (chest, quads), or equipment..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#162038] border border-[#213253] rounded-xl text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors shadow-inner"
          />
        </div>

        {/* Muscle Filter Scrollable Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {MUSCLE_GROUPS_LIST.map((muscle) => (
            <button
              key={muscle}
              onClick={() => setSelectedMuscle(muscle)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedMuscle === muscle
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/25'
                  : 'bg-[#162038] text-gray-400 hover:text-white border border-[#213253]'
              }`}
            >
              {muscle}
            </button>
          ))}
        </div>
      </div>

      {/* Exercise Cards Grid */}
      <div className="flex-1 p-4 sm:p-5 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {filteredExercises.map((exercise) => {
            const image3d = IMAGE_3D_MAP[exercise.id];

            return (
              <div
                key={exercise.id}
                onClick={() => setSelectedExercise(exercise)}
                className="group bg-[#0f172a] rounded-2xl border border-[#213253] hover:border-blue-500/50 overflow-hidden flex flex-col justify-between transition-all duration-200 hover:shadow-xl hover:shadow-blue-950/40 cursor-pointer"
              >
                {/* Visual Thumbnail */}
                <div className="relative overflow-hidden bg-[#091122] border-b border-[#1c2948] h-48">
                  {image3d ? (
                    <img
                      src={image3d}
                      alt={exercise.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
                    />
                  ) : (
                    <VisualExerciseFigure
                      type={exercise.vectorVisualType}
                      className="h-full w-full group-hover:scale-102 transition-transform duration-300"
                    />
                  )}

                  {/* Badges: Real Video + 3D */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                    <div className="bg-black/85 backdrop-blur-md px-2 py-0.5 rounded-lg border border-blue-500/50 text-[10px] font-mono text-sky-300 flex items-center gap-1 shadow-md">
                      <Video className="w-3 h-3 text-sky-400" />
                      <span>Video</span>
                    </div>

                    {exercise.has3DModel && (
                      <div className="bg-black/85 backdrop-blur-md px-2 py-0.5 rounded-lg border border-[#213253] text-[10px] font-mono text-gray-300 flex items-center gap-1 shadow-md">
                        <Box className="w-3 h-3 text-sky-400" />
                        <span>3D</span>
                      </div>
                    )}
                  </div>

                  {/* Muscle Tag */}
                  <div className="absolute bottom-2.5 left-2.5 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-sky-400 border border-blue-500/40">
                    {exercise.primaryMuscles[0]}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-base text-white group-hover:text-sky-400 transition-colors">
                      {exercise.name}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#162038] text-sky-400 border border-[#213253] shrink-0">
                      {exercise.category}
                    </span>
                  </div>

                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {exercise.shortSummary}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-[#1c2948] text-xs">
                    <span className="text-gray-400 font-mono text-[11px]">
                      {exercise.equipment[0]} • {exercise.difficulty}
                    </span>
                    <span className="text-sky-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>View Technique</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
