import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { WorkoutRoutine } from '../../types';
import { HOME_ROUTINES } from '../../data/homeWorkoutsData';
import {
  Home,
  Play,
  Calendar,
  Clock,
  Flame,
  ShieldAlert,
  ChevronRight,
  Info,
  CheckCircle2,
  Sparkles,
  Award,
  Zap
} from 'lucide-react';

export const HomeWorkoutsView: React.FC = () => {
  const { startWorkout, exercises, setSelectedExercise, setActiveTab } = useApp();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [expandedRoutineId, setExpandedRoutineId] = useState<string | null>(HOME_ROUTINES[0].id);

  const filteredRoutines = HOME_ROUTINES.filter((r) => {
    if (selectedDifficulty !== 'All' && r.difficulty !== selectedDifficulty) return false;
    return true;
  });

  return (
    <div className="flex flex-col h-full bg-[#080d1a] text-gray-100 pb-24">
      {/* Header Banner */}
      <div className="p-4 sm:p-5 bg-[#0f172a] border-b border-[#213253]">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 neon-glow" />
              <h1 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-wide">
                NO-GYM & HOME WORKOUT HUB
              </h1>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              100% equipment-free & household bodyweight protocols for all budget & experience levels
            </p>
          </div>

          <button
            onClick={() => setActiveTab('planner')}
            className="px-3 py-1.5 bg-[#162038] hover:bg-[#1f2d4d] text-sky-400 font-semibold text-xs rounded-lg border border-blue-600/40 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Custom Plan Builder</span>
          </button>
        </div>

        {/* Safety Warning Box */}
        <div className="bg-[#162038] border border-amber-500/30 p-3 rounded-xl flex items-start gap-2.5 text-xs text-amber-200/90 mt-2">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold text-amber-400">Home Safety Standard: </span>
            Never use unstable swivel chairs, fragile glass furniture, or heavy improvised objects that cannot be securely gripped. Test table sturdiness before any inverted rows.
          </div>
        </div>

        {/* Difficulty Filter Tabs */}
        <div className="flex items-center gap-2 mt-4">
          <span className="text-xs font-mono text-gray-400">Level:</span>
          {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedDifficulty(lvl)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedDifficulty === lvl
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/20'
                  : 'bg-[#162038] text-gray-400 hover:text-white border border-[#213253]'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-6">
        {/* Weekly Calendar & Rest Day Guidance Card */}
        <div className="bg-[#0f172a] border border-[#213253] rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sky-400" />
              <h3 className="text-sm font-bold font-heading uppercase tracking-wide text-white">
                Recommended Weekly Home Schedule & Rest Cycles
              </h3>
            </div>
            <span className="text-[11px] font-mono text-sky-400">3–4 Days / Week</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 text-xs font-mono">
            <div className="p-2.5 bg-[#162038] rounded-lg border border-blue-600/40 text-center">
              <div className="text-sky-400 font-bold">MON</div>
              <div className="text-[11px] text-gray-300 mt-1">Full-Body 1</div>
            </div>
            <div className="p-2.5 bg-[#0f1412] rounded-lg border border-[#213253] text-center opacity-70">
              <div className="text-gray-400">TUE</div>
              <div className="text-[11px] text-gray-500 mt-1">Active Rest</div>
            </div>
            <div className="p-2.5 bg-[#162038] rounded-lg border border-blue-600/40 text-center">
              <div className="text-sky-400 font-bold">WED</div>
              <div className="text-[11px] text-gray-300 mt-1">Upper Body</div>
            </div>
            <div className="p-2.5 bg-[#0f1412] rounded-lg border border-[#213253] text-center opacity-70">
              <div className="text-gray-400">THU</div>
              <div className="text-[11px] text-gray-500 mt-1">Rest & Walk</div>
            </div>
            <div className="p-2.5 bg-[#162038] rounded-lg border border-blue-600/40 text-center">
              <div className="text-sky-400 font-bold">FRI</div>
              <div className="text-[11px] text-gray-300 mt-1">Lower Hyper</div>
            </div>
            <div className="p-2.5 bg-[#162038] rounded-lg border border-blue-500/30 text-center">
              <div className="text-blue-400 font-bold">SAT</div>
              <div className="text-[11px] text-gray-300 mt-1">15m HIIT / Core</div>
            </div>
            <div className="p-2.5 bg-[#0f1412] rounded-lg border border-purple-500/30 text-center">
              <div className="text-purple-400 font-bold">SUN</div>
              <div className="text-[11px] text-purple-300 mt-1">Mobility Flow</div>
            </div>
          </div>
        </div>

        {/* Home Workout Routines Accordion / Cards */}
        <div className="space-y-4">
          <h2 className="text-base font-bold font-heading uppercase tracking-wide text-white flex items-center gap-2">
            <Flame className="w-4 h-4 text-sky-400" />
            <span>Structured No-Gym Routines ({filteredRoutines.length})</span>
          </h2>

          <div className="space-y-3">
            {filteredRoutines.map((routine) => {
              const isExpanded = expandedRoutineId === routine.id;

              return (
                <div
                  key={routine.id}
                  className="bg-[#0f172a] rounded-2xl border border-[#213253] overflow-hidden transition-all duration-200"
                >
                  {/* Routine Header Row */}
                  <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
                    <div
                      className="cursor-pointer flex-1 min-w-[240px]"
                      onClick={() => setExpandedRoutineId(isExpanded ? null : routine.id)}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                            routine.difficulty === 'Beginner'
                              ? 'bg-blue-600/20 text-sky-400 border border-blue-600/30'
                              : routine.difficulty === 'Intermediate'
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                              : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                          }`}
                        >
                          {routine.difficulty}
                        </span>
                        <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
                          <Clock className="w-3 h-3 text-sky-400" />
                          {routine.durationMinutes} mins
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-white mt-1 hover:text-sky-400 transition-colors">
                        {routine.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{routine.description}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startWorkout(routine)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/20 transition-all"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Start Workout</span>
                      </button>

                      <button
                        onClick={() => setExpandedRoutineId(isExpanded ? null : routine.id)}
                        className="p-2 rounded-xl bg-[#162038] hover:bg-[#1f2d4d] text-gray-300 border border-[#213253]"
                      >
                        <ChevronRight
                          className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Exercise Breakdown List */}
                  {isExpanded && (
                    <div className="px-4 pb-5 pt-1 border-t border-[#1c2948] space-y-3 bg-[#0e1311]">
                      <div className="text-xs font-mono uppercase text-gray-400 pt-2 flex items-center justify-between">
                        <span>Exercise Order & Protocol ({routine.exercises.length} Exercises)</span>
                        <span className="text-sky-400 font-semibold">{routine.scheduleDay}</span>
                      </div>

                      <div className="space-y-2">
                        {routine.exercises.map((re, idx) => {
                          const exData = exercises.find((e) => e.id === re.exerciseId);
                          return (
                            <div
                              key={idx}
                              className="bg-[#111b33] p-3 rounded-xl border border-[#213253] flex flex-wrap items-center justify-between gap-3 hover:border-blue-600/40 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-lg bg-[#162038] text-sky-400 font-mono text-xs flex items-center justify-center font-bold border border-[#213253]">
                                  {idx + 1}
                                </span>
                                <div>
                                  <div
                                    onClick={() => exData && setSelectedExercise(exData)}
                                    className="text-sm font-bold text-white hover:text-sky-400 cursor-pointer flex items-center gap-1.5"
                                  >
                                    <span>{exData ? exData.name : re.exerciseId}</span>
                                    <Info className="w-3 h-3 text-gray-400" />
                                  </div>
                                  <div className="text-xs text-gray-400 mt-0.5">
                                    <span className="text-sky-400 font-medium">{re.targetSets} sets</span>
                                    <span> • {re.targetReps}</span>
                                    <span> • Rest: {re.restSeconds}s</span>
                                  </div>
                                </div>
                              </div>

                              {re.notes && (
                                <div className="text-xs text-gray-400 italic bg-[#162038] px-2.5 py-1 rounded border border-[#213253] max-w-sm">
                                  {re.notes}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
