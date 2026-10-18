import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { MuscleGroup, WarmUpRoutine, WarmUpMovement } from '../../types';
import { generateDynamicWarmUp } from '../../data/warmUpData';
import { MUSCLE_GROUPS_LIST } from '../../data/exercisesData';
import confetti from 'canvas-confetti';
import {
  Flame,
  X,
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Timer,
  CheckCircle2,
  ShieldCheck,
  Wind,
  Sparkles,
  ChevronRight,
  Activity,
  Award
} from 'lucide-react';

interface WarmUpModalProps {
  initialMuscleGroups?: MuscleGroup[];
  isOpen: boolean;
  onClose: () => void;
  onStartWorkoutAfterWarmup?: () => void;
}

const SELECTABLE_MUSCLE_OPTIONS: MuscleGroup[] = [
  'Full Body',
  'Chest',
  'Back',
  'Shoulders',
  'Quadriceps',
  'Hamstrings',
  'Glutes',
  'Biceps',
  'Triceps',
  'Abdominals'
];

export const WarmUpModal: React.FC<WarmUpModalProps> = ({
  initialMuscleGroups = ['Chest', 'Shoulders'],
  isOpen,
  onClose,
  onStartWorkoutAfterWarmup
}) => {
  const { playChime, activeWorkout, startWorkout, routines } = useApp();

  const [selectedMuscles, setSelectedMuscles] = useState<MuscleGroup[]>(initialMuscleGroups);
  const [currentRoutine, setCurrentRoutine] = useState<WarmUpRoutine>(() =>
    generateDynamicWarmUp(initialMuscleGroups)
  );

  // Live Timer Player State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentMovementIndex, setCurrentMovementIndex] = useState<number>(0);
  const [movementSecondsLeft, setMovementSecondsLeft] = useState<number>(60);
  const [totalSecondsElapsed, setTotalSecondsElapsed] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Sync when initial muscles change
  useEffect(() => {
    if (initialMuscleGroups && initialMuscleGroups.length > 0) {
      setSelectedMuscles(initialMuscleGroups);
      const generated = generateDynamicWarmUp(initialMuscleGroups);
      setCurrentRoutine(generated);
      setCurrentMovementIndex(0);
      setMovementSecondsLeft(generated.movements[0]?.durationSeconds || 60);
      setTotalSecondsElapsed(0);
      setIsPlaying(false);
      setIsCompleted(false);
    }
  }, [isOpen]);

  const toggleMuscle = (muscle: MuscleGroup) => {
    let updated: MuscleGroup[];
    if (muscle === 'Full Body') {
      updated = ['Full Body'];
    } else {
      const filtered = selectedMuscles.filter(m => m !== 'Full Body');
      if (filtered.includes(muscle)) {
        updated = filtered.filter(m => m !== muscle);
        if (updated.length === 0) updated = ['Full Body'];
      } else {
        updated = [...filtered, muscle];
      }
    }
    setSelectedMuscles(updated);
    const newRoutine = generateDynamicWarmUp(updated);
    setCurrentRoutine(newRoutine);
    setCurrentMovementIndex(0);
    setMovementSecondsLeft(newRoutine.movements[0]?.durationSeconds || 60);
    setTotalSecondsElapsed(0);
    setIsPlaying(false);
    setIsCompleted(false);
  };

  // Timer interval
  useEffect(() => {
    if (!isOpen || !isPlaying || isCompleted) return;

    const interval = setInterval(() => {
      setMovementSecondsLeft((prevMoveSec) => {
        if (prevMoveSec <= 1) {
          // Advance to next movement or finish
          if (currentMovementIndex < currentRoutine.movements.length - 1) {
            playChime('beep');
            const nextIdx = currentMovementIndex + 1;
            setCurrentMovementIndex(nextIdx);
            return currentRoutine.movements[nextIdx].durationSeconds;
          } else {
            // Entire 5-minute warm-up finished!
            setIsPlaying(false);
            setIsCompleted(true);
            playChime('success');
            confetti({
              particleCount: 80,
              spread: 60,
              origin: { y: 0.6 }
            });
            return 0;
          }
        }
        return prevMoveSec - 1;
      });

      setTotalSecondsElapsed((prev) => Math.min(300, prev + 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying, currentMovementIndex, currentRoutine, isCompleted]);

  const handleNextMovement = () => {
    if (currentMovementIndex < currentRoutine.movements.length - 1) {
      const nextIdx = currentMovementIndex + 1;
      setCurrentMovementIndex(nextIdx);
      setMovementSecondsLeft(currentRoutine.movements[nextIdx].durationSeconds);
      playChime('beep');
    } else {
      setIsPlaying(false);
      setIsCompleted(true);
      playChime('success');
    }
  };

  const handlePrevMovement = () => {
    if (currentMovementIndex > 0) {
      const prevIdx = currentMovementIndex - 1;
      setCurrentMovementIndex(prevIdx);
      setMovementSecondsLeft(currentRoutine.movements[prevIdx].durationSeconds);
      playChime('beep');
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentMovementIndex(0);
    setMovementSecondsLeft(currentRoutine.movements[0]?.durationSeconds || 60);
    setTotalSecondsElapsed(0);
    setIsCompleted(false);
  };

  const formatMinSec = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  const currentMovement = currentRoutine.movements[currentMovementIndex] || currentRoutine.movements[0];
  const overallProgressPercent = Math.min(100, Math.round((totalSecondsElapsed / 300) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0f172a] border border-blue-600/50 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="sticky top-0 z-20 bg-[#0f172a]/95 backdrop-blur-md px-5 py-4 border-b border-[#213253] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-600/40 flex items-center justify-center text-sky-400">
              <Flame className="w-4 h-4 fill-sky-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-sky-400 uppercase font-bold tracking-wider">
                  RAMP PROTOCOL
                </span>
                <span className="text-gray-500">•</span>
                <span className="text-[10px] font-mono text-gray-400">5-Minute Dynamic Session</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold font-heading text-white">{currentRoutine.title}</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#162038] hover:bg-[#1f2d4d] text-gray-400 hover:text-white transition-colors border border-[#213253]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-5 flex-1">
          {/* Target Muscle Selector Pills */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-gray-400 font-bold uppercase">
                Target Muscle Groups for Today&apos;s Session:
              </span>
              <button
                onClick={() => {
                  const todayRoutine = routines[0];
                  if (todayRoutine && todayRoutine.targetMuscleGroups.length > 0) {
                    setSelectedMuscles(todayRoutine.targetMuscleGroups);
                    const newR = generateDynamicWarmUp(todayRoutine.targetMuscleGroups);
                    setCurrentRoutine(newR);
                    handleReset();
                  }
                }}
                className="text-[11px] text-sky-400 hover:text-sky-300 font-mono font-semibold flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>Auto-Match Next Workout</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {SELECTABLE_MUSCLE_OPTIONS.map((m) => {
                const isSelected = selectedMuscles.includes(m);
                return (
                  <button
                    key={m}
                    onClick={() => toggleMuscle(m)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/20'
                        : 'bg-[#162038] text-gray-400 hover:text-white border border-[#213253]'
                    }`}
                  >
                    {m}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Warm-Up Live Player Card */}
          <div className="bg-[#0e1411] border border-[#213253] rounded-2xl p-5 space-y-4 shadow-xl">
            {/* Overall 5-Minute Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-gray-400">Total Warm-up Progress:</span>
                <span className="text-sky-400 font-bold">
                  {formatMinSec(totalSecondsElapsed)} / 5:00 ({overallProgressPercent}%)
                </span>
              </div>
              <div className="w-full h-2 bg-[#162038] rounded-full overflow-hidden">
                <div
                  style={{ width: `${overallProgressPercent}%` }}
                  className="h-full bg-blue-600 transition-all duration-300 shadow-sm shadow-blue-600"
                />
              </div>
            </div>

            {/* Current Movement Display */}
            {isCompleted ? (
              <div className="text-center py-8 space-y-3">
                <Award className="w-12 h-12 text-sky-400 mx-auto animate-bounce" />
                <h3 className="text-lg font-bold font-heading text-white">
                  Dynamic Warm-Up Complete!
                </h3>
                <p className="text-xs text-gray-300 max-w-sm mx-auto leading-relaxed">
                  Your core temperature is elevated, joints are lubricated with synovial fluid, and motor units are potentiated for heavy working sets.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    if (onStartWorkoutAfterWarmup) {
                      onStartWorkoutAfterWarmup();
                    } else if (!activeWorkout) {
                      startWorkout(routines[0]);
                    }
                  }}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all inline-flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Begin Working Sets Now</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Movement Step Badge & RAMP Phase */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#162038] text-sky-400 border border-blue-600/40">
                      Step {currentMovementIndex + 1} of {currentRoutine.movements.length}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                        currentMovement.rampPhase === 'Raise'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : currentMovement.rampPhase === 'Activate'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                          : currentMovement.rampPhase === 'Mobilize'
                          ? 'bg-blue-600/20 text-sky-300 border border-blue-600/40'
                          : 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                      }`}
                    >
                      {currentMovement.rampPhase} Phase
                    </span>
                  </div>

                  {/* Movement Countdown Digital Clock */}
                  <div className="flex items-center gap-1.5 font-mono text-xl sm:text-2xl font-bold text-white bg-[#162038] px-3.5 py-1 rounded-xl border border-[#213253]">
                    <Timer className="w-4 h-4 text-sky-400" />
                    <span className="text-sky-400">{formatMinSec(movementSecondsLeft)}</span>
                  </div>
                </div>

                {/* Movement Title & Purpose */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-heading">
                    {currentMovement.name}
                  </h3>
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                    <span className="text-sky-400 font-semibold">Biomechanical Purpose: </span>
                    {currentMovement.purpose}
                  </p>
                </div>

                {/* Coaching Cues Card */}
                <div className="bg-[#111b33] p-3.5 rounded-xl border border-[#213253] space-y-2">
                  <span className="text-[11px] font-mono text-sky-400 uppercase font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Dynamic Execution Cues:</span>
                  </span>
                  <ul className="space-y-1.5 text-xs text-gray-300">
                    {currentMovement.coachingCues.map((cue, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-sky-400 mt-0.5">•</span>
                        <span>{cue}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-1.5 border-t border-[#1c2948] flex items-center gap-2 text-[11px] text-gray-400">
                    <Wind className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>Breathing: {currentMovement.breathing}</span>
                  </div>
                </div>

                {/* Interactive Player Controls */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrevMovement}
                      disabled={currentMovementIndex === 0}
                      className="p-2.5 rounded-xl bg-[#162038] hover:bg-[#1f2d4d] disabled:opacity-30 text-gray-300 border border-[#213253]"
                      title="Previous Movement"
                    >
                      <SkipBack className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-4 h-4" />
                          <span>Pause Warm-Up</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 fill-current" />
                          <span>Start 60s Interval</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleNextMovement}
                      className="p-2.5 rounded-xl bg-[#162038] hover:bg-[#1f2d4d] text-gray-300 border border-[#213253]"
                      title="Next Movement"
                    >
                      <SkipForward className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={handleReset}
                    className="p-2.5 rounded-xl bg-[#162038] hover:bg-[#1f2d4d] text-gray-400 hover:text-white border border-[#213253]"
                    title="Reset Warm-Up"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Complete 5-Movement Sequence List Overview */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold text-gray-400 uppercase">
              Full 5-Minute Movement Sequence ({currentRoutine.movements.length} Drills):
            </h4>
            <div className="space-y-1.5">
              {currentRoutine.movements.map((move, idx) => (
                <div
                  key={move.id}
                  onClick={() => {
                    setCurrentMovementIndex(idx);
                    setMovementSecondsLeft(move.durationSeconds);
                    setIsPlaying(false);
                  }}
                  className={`p-2.5 rounded-xl border flex items-center justify-between text-xs cursor-pointer transition-colors ${
                    currentMovementIndex === idx
                      ? 'bg-blue-950/30 border-blue-600/60 text-white font-semibold'
                      : 'bg-[#162038] border-[#213253] text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-md bg-[#0f172a] text-sky-400 font-mono text-[11px] flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <span>{move.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-gray-500">{move.rampPhase}</span>
                    <span className="text-[11px] font-mono text-sky-400">{move.durationSeconds}s</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#0f172a] border-t border-[#213253] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#162038] hover:bg-[#1f2d4d] text-gray-300 text-xs rounded-xl border border-[#213253]"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              if (onStartWorkoutAfterWarmup) {
                onStartWorkoutAfterWarmup();
              } else if (!activeWorkout) {
                startWorkout(routines[0]);
              }
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md"
          >
            <span>Proceed to Working Sets</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
