import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { WorkoutRoutine, MuscleGroup, EquipmentType, ExerciseDifficulty, Exercise } from '../../types';
import { WarmUpModal } from '../common/WarmUpModal';
import { TechniqueVideoModal } from '../common/TechniqueVideoModal';
import { getTechniqueVideoForExercise } from '../../data/techniqueVideosData';
import {
  Calendar,
  Clock,
  Play,
  Flame,
  Plus,
  ChevronRight,
  Sparkles,
  Edit3,
  Trash2,
  Dumbbell,
  CheckCircle2,
  Info,
  Video,
  Box,
  Layers,
  ArrowUpDown,
  Copy,
  Sliders,
  Check,
  X,
  Search,
  BookOpen
} from 'lucide-react';

const DAYS_OF_WEEK = [
  { id: 'mon', short: 'Mon', full: 'Monday', defaultFocus: 'Push (Chest, Delts & Triceps)' },
  { id: 'tue', short: 'Tue', full: 'Tuesday', defaultFocus: 'Pull (Back, Lats & Biceps)' },
  { id: 'wed', short: 'Wed', full: 'Wednesday', defaultFocus: 'Legs & Calves Focus' },
  { id: 'thu', short: 'Thu', full: 'Thursday', defaultFocus: 'Active Recovery & Mobility' },
  { id: 'fri', short: 'Fri', full: 'Friday', defaultFocus: 'Upper Body Hypertrophy' },
  { id: 'sat', short: 'Sat', full: 'Saturday', defaultFocus: 'Lower Body & Core' },
  { id: 'sun', short: 'Sun', full: 'Sunday', defaultFocus: 'Full Rest & Muscle Synthesis' },
];

export const WorkoutPlannerView: React.FC = () => {
  const {
    routines,
    startWorkout,
    exercises,
    setSelectedExercise,
    setActiveTab,
    addCustomRoutine,
    updateRoutine,
    deleteRoutine,
    duplicateRoutine,
    setSelectedStudioExerciseId
  } = useApp();

  const [activePlannerTab, setActivePlannerTab] = useState<'schedule' | 'routines' | 'presets' | 'videos'>('schedule');
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const [isWarmUpModalOpen, setIsWarmUpModalOpen] = useState<boolean>(false);

  // Technique Video Modal state
  const [videoModalExercise, setVideoModalExercise] = useState<Exercise | null>(null);

  // Custom Builder Modal state
  const [isBuilderModalOpen, setIsBuilderModalOpen] = useState<boolean>(false);
  const [editingRoutineId, setEditingRoutineId] = useState<string | null>(null);
  const [builderTitle, setBuilderTitle] = useState<string>('My Custom Hypertrophy Routine');
  const [builderCategory, setBuilderCategory] = useState<'Gym' | 'Home' | 'Hybrid'>('Gym');
  const [builderDuration, setBuilderDuration] = useState<number>(45);
  const [builderDifficulty, setBuilderDifficulty] = useState<ExerciseDifficulty>('Intermediate');
  const [builderExercises, setBuilderExercises] = useState<{ exerciseId: string; targetSets: number; targetReps: string; restSeconds: number }[]>([
    { exerciseId: 'barbell-bench-press', targetSets: 4, targetReps: '8-10', restSeconds: 90 },
    { exerciseId: 'incline-dumbbell-press', targetSets: 3, targetReps: '10-12', restSeconds: 75 },
    { exerciseId: 'dumbbell-lateral-raise', targetSets: 4, targetReps: '12-15', restSeconds: 60 }
  ]);

  // Exercise Picker sub-modal state inside builder
  const [isExercisePickerOpen, setIsExercisePickerOpen] = useState<boolean>(false);
  const [pickerSearch, setPickerSearch] = useState<string>('');
  const [pickerMuscle, setPickerMuscle] = useState<string>('All');

  // Video Vault filter
  const [videoVaultFilter, setVideoVaultFilter] = useState<string>('All');

  // Day to routine schedule map (stored in state, defaults to indexed routines)
  const [scheduleMap, setScheduleMap] = useState<Record<string, string>>({
    mon: routines[0]?.id || '',
    tue: routines[1]?.id || '',
    wed: routines[2]?.id || '',
    thu: 'rest',
    fri: routines[3]?.id || routines[0]?.id || '',
    sat: routines[4]?.id || routines[1]?.id || '',
    sun: 'rest'
  });

  const selectedDay = DAYS_OF_WEEK[selectedDayIndex];
  const assignedRoutineId = scheduleMap[selectedDay.id];
  const isRestDay = assignedRoutineId === 'rest';
  const currentRoutine = routines.find(r => r.id === assignedRoutineId) || routines[selectedDayIndex % routines.length] || routines[0];

  const handleOpenVideoForExercise = (exerciseId: string) => {
    const ex = exercises.find(e => e.id === exerciseId);
    if (ex) {
      setVideoModalExercise(ex);
    }
  };

  const handleOpen3D = (exerciseId: string) => {
    setSelectedStudioExerciseId(exerciseId);
    setActiveTab('3d-studio');
  };

  const handleToggleRestDay = (dayId: string) => {
    setScheduleMap(prev => ({
      ...prev,
      [dayId]: prev[dayId] === 'rest' ? (routines[0]?.id || '') : 'rest'
    }));
  };

  const handleOpenNewBuilder = () => {
    setEditingRoutineId(null);
    setBuilderTitle('My Custom Workout Plan');
    setBuilderCategory('Gym');
    setBuilderDuration(45);
    setBuilderDifficulty('Intermediate');
    setBuilderExercises([
      { exerciseId: 'barbell-bench-press', targetSets: 3, targetReps: '8-10', restSeconds: 90 },
      { exerciseId: 'incline-dumbbell-press', targetSets: 3, targetReps: '10-12', restSeconds: 75 }
    ]);
    setIsBuilderModalOpen(true);
  };

  const handleEditRoutine = (r: WorkoutRoutine) => {
    setEditingRoutineId(r.id);
    setBuilderTitle(r.title);
    setBuilderCategory(r.category);
    setBuilderDuration(r.durationMinutes);
    setBuilderDifficulty(r.difficulty);
    setBuilderExercises(r.exercises.map(e => ({
      exerciseId: e.exerciseId,
      targetSets: e.targetSets,
      targetReps: e.targetReps,
      restSeconds: e.restSeconds
    })));
    setIsBuilderModalOpen(true);
  };

  const handleSaveRoutine = () => {
    if (!builderTitle.trim() || builderExercises.length === 0) return;

    // Infer target muscle groups from exercises
    const allMuscles = new Set<MuscleGroup>();
    builderExercises.forEach(be => {
      const ex = exercises.find(e => e.id === be.exerciseId);
      if (ex) {
        ex.primaryMuscles.forEach(m => allMuscles.add(m));
      }
    });

    const newRoutine: WorkoutRoutine = {
      id: editingRoutineId || `custom-${Date.now()}`,
      title: builderTitle.trim(),
      description: `Customized training session with ${builderExercises.length} targeted exercises.`,
      category: builderCategory,
      durationMinutes: builderDuration,
      difficulty: builderDifficulty,
      targetMuscleGroups: Array.from(allMuscles),
      equipmentNeeded: ['Barbell', 'Dumbbell'],
      isCustom: true,
      exercises: builderExercises
    };

    if (editingRoutineId) {
      updateRoutine(newRoutine);
    } else {
      addCustomRoutine(newRoutine);
      // Auto assign to current day
      setScheduleMap(prev => ({ ...prev, [selectedDay.id]: newRoutine.id }));
    }

    setIsBuilderModalOpen(false);
  };

  const handleAddExerciseToBuilder = (exId: string) => {
    if (!builderExercises.some(e => e.exerciseId === exId)) {
      setBuilderExercises(prev => [
        ...prev,
        { exerciseId: exId, targetSets: 3, targetReps: '8-12', restSeconds: 90 }
      ]);
    }
    setIsExercisePickerOpen(false);
  };

  const handleRemoveBuilderExercise = (index: number) => {
    setBuilderExercises(prev => prev.filter((_, i) => i !== index));
  };

  // Load standard split preset
  const handleLoadSplitPreset = (splitType: 'ppl' | 'upper-lower' | 'fullbody' | 'home-calisthenics') => {
    if (splitType === 'ppl') {
      const push = routines.find(r => r.title.toLowerCase().includes('push')) || routines[0];
      const pull = routines.find(r => r.title.toLowerCase().includes('pull')) || routines[1];
      const legs = routines.find(r => r.title.toLowerCase().includes('leg')) || routines[2];

      setScheduleMap({
        mon: push.id,
        tue: pull.id,
        wed: legs.id,
        thu: 'rest',
        fri: push.id,
        sat: pull.id,
        sun: 'rest'
      });
    } else if (splitType === 'upper-lower') {
      const push = routines[0] || routines[0];
      const legs = routines[1] || routines[0];

      setScheduleMap({
        mon: push.id,
        tue: legs.id,
        wed: 'rest',
        thu: push.id,
        fri: legs.id,
        sat: 'rest',
        sun: 'rest'
      });
    } else if (splitType === 'fullbody') {
      const full = routines.find(r => r.targetMuscleGroups.includes('Full Body')) || routines[0];
      setScheduleMap({
        mon: full.id,
        tue: 'rest',
        wed: full.id,
        thu: 'rest',
        fri: full.id,
        sat: 'rest',
        sun: 'rest'
      });
    }
    setActivePlannerTab('schedule');
  };

  const filteredPickerExercises = exercises.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(pickerSearch.toLowerCase()) ||
      ex.targetMuscles.toLowerCase().includes(pickerSearch.toLowerCase());
    const matchesMuscle = pickerMuscle === 'All' || ex.primaryMuscles.includes(pickerMuscle as MuscleGroup);
    return matchesSearch && matchesMuscle;
  });

  const videoVaultExercises = exercises.filter(ex => {
    if (videoVaultFilter === 'All') return true;
    return ex.primaryMuscles.includes(videoVaultFilter as MuscleGroup);
  });

  return (
    <div className="flex flex-col h-full bg-[#080d1a] text-gray-100 pb-24 overflow-y-auto">
      {/* Top Header */}
      <div className="p-4 sm:p-5 bg-[#0f172a] border-b border-[#213253]">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-600/40 flex items-center justify-center text-sky-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold font-heading text-white">
                  Work & Workout Planner
                </h1>
                <span className="px-2 py-0.5 rounded bg-blue-600/20 text-sky-400 font-mono text-[10px] font-bold">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-gray-400">
                Weekly scheduling, custom periodization & real technique videos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsWarmUpModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#162038] hover:bg-[#1f2d4d] text-sky-400 text-xs font-semibold rounded-xl border border-blue-600/40 shadow-sm transition-all"
            >
              <Flame className="w-3.5 h-3.5 fill-sky-400" />
              <span>5-Min Warm-Up</span>
            </button>

            <button
              onClick={handleOpenNewBuilder}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-md transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Plan</span>
            </button>
          </div>
        </div>

        {/* 4 Planner Sub-Tabs */}
        <div className="flex items-center bg-[#162038] p-1 rounded-2xl border border-[#213253]">
          {[
            { id: 'schedule' as const, label: 'Weekly Schedule', icon: <Calendar className="w-3.5 h-3.5" /> },
            { id: 'routines' as const, label: 'My Plans', icon: <Dumbbell className="w-3.5 h-3.5" /> },
            { id: 'presets' as const, label: 'Split Presets', icon: <Sparkles className="w-3.5 h-3.5" /> },
            { id: 'videos' as const, label: 'Technique Videos', icon: <Video className="w-3.5 h-3.5" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActivePlannerTab(tab.id)}
              className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                activePlannerTab === tab.id
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* VIEW 1: WEEKLY SCHEDULE WITH DAY SELECTOR */}
      {activePlannerTab === 'schedule' && (
        <div className="flex-1 p-4 sm:p-5 space-y-5 max-w-2xl mx-auto w-full">
          {/* Days of Week Circular Pills matching Mockup Screen 9 */}
          <div className="bg-[#0f172a] p-3 rounded-2xl border border-[#213253]">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-2 px-1">
              <span className="font-mono text-[11px] text-sky-400 uppercase font-bold">
                Select Training Day
              </span>
              <span>{scheduleMap[selectedDay.id] === 'rest' ? 'Rest & Recovery Day' : 'Active Workout'}</span>
            </div>

            <div className="flex items-center justify-between gap-1">
              {DAYS_OF_WEEK.map((d, idx) => {
                const isSelected = selectedDayIndex === idx;
                const isDayRest = scheduleMap[d.id] === 'rest';

                return (
                  <button
                    key={d.short}
                    onClick={() => setSelectedDayIndex(idx)}
                    className={`flex-1 py-2 sm:py-3 rounded-xl text-xs font-bold font-mono transition-all flex flex-col items-center justify-center gap-1 relative ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105 z-10'
                        : 'bg-[#162038] text-gray-300 hover:text-white border border-[#213253]'
                    }`}
                  >
                    <span>{d.short}</span>
                    <span className={`text-[9px] px-1 rounded uppercase ${
                      isSelected
                        ? 'bg-black/30 text-white'
                        : isDayRest
                        ? 'text-gray-500'
                        : 'text-sky-400 font-semibold'
                    }`}>
                      {isDayRest ? 'Rest' : 'Train'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Day Detail Card */}
          <div className="bg-[#0f172a] p-4 sm:p-5 rounded-2xl border border-[#213253] space-y-4 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-600/20 text-sky-400 font-mono text-xs font-bold">
                    {selectedDay.full}
                  </span>
                  {isRestDay ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono text-xs">
                      Rest & Repair
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-600/20 text-sky-300 font-mono text-xs">
                      {currentRoutine.category}
                    </span>
                  )}
                </div>

                <h2 className="text-lg sm:text-xl font-bold font-heading text-white mt-1.5">
                  {isRestDay ? 'Scheduled Active Rest & Mobility' : currentRoutine.title}
                </h2>

                {!isRestDay && (
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-sky-400" />
                      {currentRoutine.durationMinutes} mins
                    </span>
                    <span>•</span>
                    <span>{currentRoutine.exercises.length} Exercises</span>
                    <span>•</span>
                    <span className="text-sky-400 font-semibold">{currentRoutine.difficulty}</span>
                  </div>
                )}
              </div>

              {/* Day Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleRestDay(selectedDay.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    isRestDay
                      ? 'bg-blue-600/20 text-sky-400 border-blue-600/40 hover:bg-blue-600/30'
                      : 'bg-[#162038] text-gray-400 border-[#213253] hover:text-white'
                  }`}
                >
                  {isRestDay ? 'Make Workout Day' : 'Mark as Rest'}
                </button>

                {!isRestDay && (
                  <button
                    onClick={() => handleEditRoutine(currentRoutine)}
                    className="p-1.5 rounded-xl bg-[#162038] text-gray-300 hover:text-white border border-[#213253]"
                    title="Edit Routine"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Target Muscles */}
            {!isRestDay && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {currentRoutine.targetMuscleGroups.map((muscle) => (
                  <span
                    key={muscle}
                    className="px-2.5 py-1 bg-[#162038] text-sky-400 text-[11px] font-semibold rounded-lg border border-[#213253]"
                  >
                    {muscle}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* REST DAY DISPLAY */}
          {isRestDay ? (
            <div className="bg-[#0f172a] p-6 rounded-2xl border border-[#213253] text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-base">Rest & Muscle Synthesis</h3>
              <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
                Hypertrophy occurs during sleep and recovery periods. Prioritize 7–9 hours of sleep, maintain 1.6–2.2g/kg protein intake, and hydrate.
              </p>
              <div className="pt-2 flex justify-center gap-2">
                <button
                  onClick={() => setIsWarmUpModalOpen(true)}
                  className="px-4 py-2 bg-[#162038] hover:bg-[#1f2d4d] text-sky-400 text-xs font-semibold rounded-xl border border-blue-600/40"
                >
                  Light 5-Min Mobility Primer
                </button>
                <button
                  onClick={() => handleToggleRestDay(selectedDay.id)}
                  className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
                >
                  Assign a Workout Instead
                </button>
              </div>
            </div>
          ) : (
            /* EXERCISES WITH REAL LIFE TECHNIQUE VIDEOS */
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold font-mono text-gray-400 uppercase tracking-wider">
                    Routine Exercises ({currentRoutine.exercises.length})
                  </h3>
                  <span className="text-[10px] font-mono text-sky-400 bg-blue-600/10 px-2 py-0.5 rounded border border-blue-600/20">
                    Real Video Available
                  </span>
                </div>
                <span className="text-[11px] text-gray-400">
                  Tap video to check form
                </span>
              </div>

              {currentRoutine.exercises.map((item, idx) => {
                const exData = exercises.find((e) => e.id === item.exerciseId);
                const name = exData ? exData.name : item.exerciseId;
                const videoData = getTechniqueVideoForExercise(item.exerciseId);

                return (
                  <div
                    key={idx}
                    className="bg-[#0f172a] hover:bg-[#14203b] p-3.5 sm:p-4 rounded-2xl border border-[#213253] hover:border-blue-600/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3.5 w-full sm:w-auto">
                      {/* Exercise Index / Video Thumbnail */}
                      <div
                        onClick={() => exData && setVideoModalExercise(exData)}
                        className="relative w-14 h-14 rounded-xl bg-black border border-[#213253] overflow-hidden shrink-0 cursor-pointer group-hover:border-blue-600/50"
                        title="Click to watch real athlete technique video"
                      >
                        <img
                          src={videoData.thumbnailUrl}
                          alt={name}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
                            <Play className="w-3.5 h-3.5 fill-black translate-x-0.5" />
                          </div>
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4
                            onClick={() => exData && setSelectedExercise(exData)}
                            className="font-bold text-sm sm:text-base text-white hover:text-sky-400 cursor-pointer transition-colors"
                          >
                            {name}
                          </h4>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 mt-1 text-xs">
                          <span className="text-sky-400 font-mono font-bold bg-[#162038] px-2 py-0.5 rounded border border-[#213253]">
                            {item.targetSets} sets × {item.targetReps} reps
                          </span>
                          <span className="text-gray-400 font-mono text-[11px]">
                            Rest: {item.restSeconds}s
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Real Technique Video & 3D Buttons */}
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-[#1c2948]">
                      <button
                        onClick={() => exData && setVideoModalExercise(exData)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 bg-red-600/15 hover:bg-red-600/25 text-red-400 hover:text-white border border-red-500/40 rounded-xl text-xs font-semibold transition-all shadow-sm"
                        title="Watch free YouTube technique video explaining proper form"
                      >
                        <Play className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                        <span>Watch Real Video</span>
                      </button>

                      <button
                        onClick={() => handleOpen3D(item.exerciseId)}
                        className="flex items-center justify-center gap-1 px-2.5 py-1.5 bg-[#162038] hover:bg-[#1f2d4d] text-gray-300 hover:text-white border border-[#213253] rounded-xl text-xs font-medium transition-all"
                        title="Open in 3D Biomechanical Studio"
                      >
                        <Box className="w-3.5 h-3.5 text-sky-400" />
                        <span className="hidden sm:inline">3D</span>
                      </button>

                      <button
                        onClick={() => exData && setSelectedExercise(exData)}
                        className="p-1.5 rounded-xl bg-[#162038] text-gray-400 hover:text-white border border-[#213253]"
                        title="View Full Exercise Breakdown"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Start Workout Primary Action */}
              <div className="pt-2">
                <button
                  onClick={() => startWorkout(currentRoutine)}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-xl shadow-blue-600/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <Play className="w-5 h-5 fill-black" />
                  <span>Start {selectedDay.full} Session in Live Tracker</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: MY WORKOUT PLANS */}
      {activePlannerTab === 'routines' && (
        <div className="flex-1 p-4 sm:p-5 space-y-4 max-w-2xl mx-auto w-full">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold font-mono text-gray-400 uppercase tracking-wider">
              Available Routines ({routines.length})
            </h2>
            <button
              onClick={handleOpenNewBuilder}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-md"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Plan</span>
            </button>
          </div>

          <div className="space-y-3">
            {routines.map((routine) => (
              <div
                key={routine.id}
                className="bg-[#0f172a] p-4 sm:p-5 rounded-2xl border border-[#213253] space-y-3 shadow-lg"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-blue-600/20 text-sky-400 font-mono text-[10px] font-bold">
                        {routine.category}
                      </span>
                      {routine.isCustom && (
                        <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-[10px] font-bold">
                          CUSTOM
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-white mt-1">{routine.title}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{routine.description}</p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleEditRoutine(routine)}
                      className="p-1.5 bg-[#162038] hover:bg-[#1f2d4d] text-gray-300 hover:text-white rounded-lg border border-[#213253]"
                      title="Edit Plan"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => duplicateRoutine(routine.id)}
                      className="p-1.5 bg-[#162038] hover:bg-[#1f2d4d] text-gray-300 hover:text-white rounded-lg border border-[#213253]"
                      title="Duplicate Plan"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    {routine.isCustom && (
                      <button
                        onClick={() => deleteRoutine(routine.id)}
                        className="p-1.5 bg-[#162038] hover:bg-red-950/30 text-red-400 rounded-lg border border-[#213253]"
                        title="Delete Plan"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Routine meta stats */}
                <div className="flex items-center gap-3 text-xs text-gray-300 font-mono pt-1 border-t border-[#1c2948]">
                  <span>{routine.durationMinutes} mins</span>
                  <span>•</span>
                  <span>{routine.exercises.length} Exercises</span>
                  <span>•</span>
                  <span className="text-sky-400">{routine.difficulty}</span>
                </div>

                {/* Exercise Pills Preview */}
                <div className="flex flex-wrap gap-1.5">
                  {routine.exercises.map((item, i) => {
                    const ex = exercises.find(e => e.id === item.exerciseId);
                    return (
                      <span
                        key={i}
                        onClick={() => ex && setVideoModalExercise(ex)}
                        className="px-2 py-0.5 bg-[#162038] hover:bg-blue-950/40 text-gray-300 hover:text-sky-400 text-[11px] rounded-lg border border-[#213253] cursor-pointer flex items-center gap-1"
                      >
                        <Video className="w-2.5 h-2.5 text-sky-400" />
                        <span>{ex ? ex.name.split(' ')[0] : item.exerciseId}</span>
                      </span>
                    );
                  })}
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => {
                      setScheduleMap(prev => ({ ...prev, [selectedDay.id]: routine.id }));
                      setActivePlannerTab('schedule');
                    }}
                    className="flex-1 py-2 bg-[#162038] hover:bg-[#223028] text-sky-400 font-semibold text-xs rounded-xl border border-blue-600/40"
                  >
                    Assign to {selectedDay.full}
                  </button>
                  <button
                    onClick={() => startWorkout(routine)}
                    className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    Start Workout Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: SPLIT PRESETS */}
      {activePlannerTab === 'presets' && (
        <div className="flex-1 p-4 sm:p-5 space-y-4 max-w-2xl mx-auto w-full">
          <div className="space-y-1">
            <h2 className="text-base font-bold font-heading text-white">
              Evidence-Based Periodized Splits
            </h2>
            <p className="text-xs text-gray-400">
              Apply a scientifically structured weekly schedule with 1 click.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            {/* Split 1: Push / Pull / Legs */}
            <div className="bg-[#0f172a] p-5 rounded-2xl border border-[#213253] hover:border-blue-600/40 transition-all space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-0.5 bg-blue-600/20 text-sky-400 font-mono text-[10px] font-bold rounded">
                    6-DAY SPLIT • MAXIMUM HYPERTROPHY
                  </span>
                  <h3 className="text-base font-bold text-white mt-1.5">Push / Pull / Legs (PPL)</h3>
                  <p className="text-xs text-gray-300 mt-0.5">
                    Hits each muscle group twice weekly (12–18 sets/week) for optimal muscle protein synthesis.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px]">
                {['Push', 'Pull', 'Legs', 'Rest', 'Push', 'Pull', 'Rest'].map((label, idx) => (
                  <div key={idx} className="bg-[#162038] p-1.5 rounded-lg border border-[#213253]">
                    <div className="text-gray-500">{DAYS_OF_WEEK[idx].short}</div>
                    <div className="text-sky-400 font-bold mt-0.5">{label}</div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleLoadSplitPreset('ppl')}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                Apply PPL Weekly Split to Calendar
              </button>
            </div>

            {/* Split 2: Upper / Lower */}
            <div className="bg-[#0f172a] p-5 rounded-2xl border border-[#213253] hover:border-blue-600/40 transition-all space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-0.5 bg-blue-500/20 text-blue-300 font-mono text-[10px] font-bold rounded">
                    4-DAY SPLIT • STRENGTH & RECOVERY
                  </span>
                  <h3 className="text-base font-bold text-white mt-1.5">Upper / Lower Body Split</h3>
                  <p className="text-xs text-gray-300 mt-0.5">
                    Ideal balance for intermediate lifters. Allows 3 full rest days for joint and CNS recovery.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px]">
                {['Upper', 'Lower', 'Rest', 'Upper', 'Lower', 'Rest', 'Rest'].map((label, idx) => (
                  <div key={idx} className="bg-[#162038] p-1.5 rounded-lg border border-[#213253]">
                    <div className="text-gray-500">{DAYS_OF_WEEK[idx].short}</div>
                    <div className="text-blue-300 font-bold mt-0.5">{label}</div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleLoadSplitPreset('upper-lower')}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                Apply Upper/Lower Split to Calendar
              </button>
            </div>

            {/* Split 3: Full Body 3-Day */}
            <div className="bg-[#0f172a] p-5 rounded-2xl border border-[#213253] hover:border-blue-600/40 transition-all space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-0.5 bg-purple-500/20 text-purple-300 font-mono text-[10px] font-bold rounded">
                    3-DAY SPLIT • BEGINNER & BUSY ATHLETES
                  </span>
                  <h3 className="text-base font-bold text-white mt-1.5">3-Day Full Body Compound Routine</h3>
                  <p className="text-xs text-gray-300 mt-0.5">
                    High neuromuscular stimulation using compound lifts (squats, bench, deadlifts, pull-ups).
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px]">
                {['Full', 'Rest', 'Full', 'Rest', 'Full', 'Rest', 'Rest'].map((label, idx) => (
                  <div key={idx} className="bg-[#162038] p-1.5 rounded-lg border border-[#213253]">
                    <div className="text-gray-500">{DAYS_OF_WEEK[idx].short}</div>
                    <div className="text-purple-300 font-bold mt-0.5">{label}</div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleLoadSplitPreset('fullbody')}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                Apply 3-Day Full Body Split
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: REAL LIFE TECHNIQUE VIDEO VAULT */}
      {activePlannerTab === 'videos' && (
        <div className="flex-1 p-4 sm:p-5 space-y-4 max-w-2xl mx-auto w-full">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-sky-400" />
              <h2 className="text-base font-bold font-heading text-white">
                Real-Life Technique Video Vault
              </h2>
            </div>
            <p className="text-xs text-gray-400">
              Study real athlete movement mechanics, slow-motion frame rates, and joint angles before entering your training sessions.
            </p>
          </div>

          {/* Muscle filter pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
            {['All', 'Chest', 'Back', 'Shoulders', 'Biceps', 'Quadriceps', 'Abdominals'].map((muscle) => (
              <button
                key={muscle}
                onClick={() => setVideoVaultFilter(muscle)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  videoVaultFilter === muscle
                    ? 'bg-blue-600 text-white font-bold shadow-md'
                    : 'bg-[#162038] text-gray-400 hover:text-white border border-[#213253]'
                }`}
              >
                {muscle}
              </button>
            ))}
          </div>

          {/* Video Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {videoVaultExercises.map((ex) => {
              const videoData = getTechniqueVideoForExercise(ex.id, ex.category);
              return (
                <div
                  key={ex.id}
                  onClick={() => setVideoModalExercise(ex)}
                  className="bg-[#0f172a] hover:bg-[#162038] rounded-2xl border border-[#213253] hover:border-blue-600/50 overflow-hidden cursor-pointer transition-all group flex flex-col justify-between shadow-lg"
                >
                  <div className="relative aspect-video bg-black overflow-hidden">
                    <img
                      src={videoData.thumbnailUrl}
                      alt={ex.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-85"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-blue-600/90 text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-black translate-x-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono text-sky-400">
                      {videoData.durationSeconds}s • Slow-Mo
                    </span>
                  </div>

                  <div className="p-3.5 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-sky-400 uppercase font-bold">
                        {ex.primaryMuscles[0]}
                      </span>
                      <span className="text-[10px] font-mono text-gray-400">
                        {videoData.phases.length} Phases
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-white group-hover:text-sky-400 transition-colors">
                      {ex.name}
                    </h4>
                    <p className="text-[11px] text-gray-400 line-clamp-1">
                      {ex.shortSummary}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CUSTOM ROUTINE BUILDER MODAL */}
      {isBuilderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md">
          <div className="bg-[#0f172a] border border-blue-600/40 rounded-3xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-4 sm:p-5 bg-[#0a1020] border-b border-[#213253] flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold font-heading text-white">
                  {editingRoutineId ? 'Edit Workout Routine' : 'Create Custom Workout Routine'}
                </h3>
                <p className="text-xs text-gray-400">
                  Select exercises, set target volume, rep ranges & rest intervals.
                </p>
              </div>
              <button
                onClick={() => setIsBuilderModalOpen(false)}
                className="p-1.5 rounded-xl bg-[#162038] text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Builder Form Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {/* Routine Title */}
              <div className="space-y-1">
                <label className="text-xs font-mono text-gray-300">Routine Title:</label>
                <input
                  type="text"
                  value={builderTitle}
                  onChange={(e) => setBuilderTitle(e.target.value)}
                  placeholder="e.g. Heavy Push & Anterior Delts"
                  className="w-full p-2.5 bg-[#162038] border border-[#213253] rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-blue-600 font-semibold"
                />
              </div>

              {/* Category, Duration & Difficulty Row */}
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-gray-400">Category:</label>
                  <select
                    value={builderCategory}
                    onChange={(e) => setBuilderCategory(e.target.value as any)}
                    className="w-full p-2 bg-[#162038] border border-[#213253] rounded-xl text-xs text-white focus:outline-none focus:border-blue-600"
                  >
                    <option value="Gym">Gym</option>
                    <option value="Home">Home</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-gray-400">Duration (mins):</label>
                  <input
                    type="number"
                    value={builderDuration}
                    onChange={(e) => setBuilderDuration(parseInt(e.target.value) || 45)}
                    className="w-full p-2 bg-[#162038] border border-[#213253] rounded-xl text-xs text-white focus:outline-none focus:border-blue-600 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-gray-400">Difficulty:</label>
                  <select
                    value={builderDifficulty}
                    onChange={(e) => setBuilderDifficulty(e.target.value as any)}
                    className="w-full p-2 bg-[#162038] border border-[#213253] rounded-xl text-xs text-white focus:outline-none focus:border-blue-600"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              {/* Selected Exercises List */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-sky-400 font-bold uppercase">
                    Exercises in Plan ({builderExercises.length})
                  </label>
                  <button
                    onClick={() => setIsExercisePickerOpen(true)}
                    className="flex items-center gap-1 text-xs text-sky-400 hover:underline font-semibold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Exercise</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {builderExercises.map((be, idx) => {
                    const ex = exercises.find(e => e.id === be.exerciseId);
                    return (
                      <div
                        key={idx}
                        className="bg-[#162038] p-3 rounded-xl border border-[#213253] flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-white truncate">
                            {idx + 1}. {ex ? ex.name : be.exerciseId}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-gray-400 text-[11px]">Sets:</span>
                            <input
                              type="number"
                              min="1"
                              max="10"
                              value={be.targetSets}
                              onChange={(e) => {
                                const val = parseInt(e.target.value) || 3;
                                setBuilderExercises(prev => prev.map((item, i) => i === idx ? { ...item, targetSets: val } : item));
                              }}
                              className="w-12 p-1 bg-[#0f172a] border border-[#213253] rounded text-center text-sky-400 font-mono font-bold"
                            />

                            <span className="text-gray-400 text-[11px] ml-1">Reps:</span>
                            <input
                              type="text"
                              value={be.targetReps}
                              onChange={(e) => {
                                const val = e.target.value;
                                setBuilderExercises(prev => prev.map((item, i) => i === idx ? { ...item, targetReps: val } : item));
                              }}
                              className="w-16 p-1 bg-[#0f172a] border border-[#213253] rounded text-center text-white font-mono"
                            />

                            <span className="text-gray-400 text-[11px] ml-1">Rest:</span>
                            <input
                              type="number"
                              step="15"
                              value={be.restSeconds}
                              onChange={(e) => {
                                const val = parseInt(e.target.value) || 60;
                                setBuilderExercises(prev => prev.map((item, i) => i === idx ? { ...item, restSeconds: val } : item));
                              }}
                              className="w-14 p-1 bg-[#0f172a] border border-[#213253] rounded text-center text-gray-300 font-mono"
                            />
                            <span className="text-gray-500 text-[10px]">s</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleRemoveBuilderExercise(idx)}
                          className="p-1.5 text-red-400 hover:text-red-300 rounded-lg hover:bg-red-950/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Builder Footer */}
            <div className="p-4 bg-[#0a1020] border-t border-[#213253] flex items-center justify-end gap-2">
              <button
                onClick={() => setIsBuilderModalOpen(false)}
                className="px-4 py-2 bg-[#162038] text-gray-300 text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveRoutine}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md"
              >
                Save Workout Routine
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EXERCISE PICKER DRAWER MODAL */}
      {isExercisePickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md">
          <div className="bg-[#0f172a] border border-blue-600/40 rounded-3xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-[#213253] flex items-center justify-between">
              <h3 className="text-sm font-bold font-heading text-white">Select Exercise to Add</h3>
              <button
                onClick={() => setIsExercisePickerOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 border-b border-[#213253] space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={pickerSearch}
                  onChange={(e) => setPickerSearch(e.target.value)}
                  placeholder="Search exercise..."
                  className="w-full pl-9 pr-3 py-2 bg-[#162038] border border-[#213253] rounded-xl text-xs text-white focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex gap-1 overflow-x-auto scrollbar-none pb-1">
                {['All', 'Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Quadriceps', 'Abdominals'].map((m) => (
                  <button
                    key={m}
                    onClick={() => setPickerMuscle(m)}
                    className={`px-2.5 py-0.5 rounded-lg text-[11px] whitespace-nowrap ${
                      pickerMuscle === m ? 'bg-blue-600 text-white font-bold' : 'bg-[#162038] text-gray-400'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {filteredPickerExercises.map((ex) => (
                <div
                  key={ex.id}
                  onClick={() => handleAddExerciseToBuilder(ex.id)}
                  className="p-3 rounded-xl bg-[#162038] hover:bg-[#1f2d4d] border border-[#213253] hover:border-blue-600/40 cursor-pointer flex items-center justify-between transition-all"
                >
                  <div>
                    <div className="font-bold text-xs text-white">{ex.name}</div>
                    <div className="text-[11px] text-gray-400">{ex.targetMuscles}</div>
                  </div>
                  <span className="text-xs text-sky-400 font-bold">+ Add</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Real Athlete Technique Video Modal */}
      <TechniqueVideoModal
        exercise={videoModalExercise}
        isOpen={!!videoModalExercise}
        onClose={() => setVideoModalExercise(null)}
        onOpen3DAnimation={(id) => handleOpen3D(id)}
      />

      {/* Dynamic 5-Minute Warm-Up Modal */}
      <WarmUpModal
        isOpen={isWarmUpModalOpen}
        onClose={() => setIsWarmUpModalOpen(false)}
        initialMuscleGroups={currentRoutine?.targetMuscleGroups || ['Chest', 'Shoulders']}
        onStartWorkoutAfterWarmup={() => startWorkout(currentRoutine)}
      />
    </div>
  );
};
