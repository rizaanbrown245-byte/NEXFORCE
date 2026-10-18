import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';
import { HeartRateMonitor } from '../common/HeartRateMonitor';
import { TechniqueVideoModal } from '../common/TechniqueVideoModal';
import { VoiceCoachHUD } from './VoiceCoachHUD';
import { VoiceCommandHandler } from '../../utils/voiceCommandCoach';
import {
  Play,
  Pause,
  RotateCcw,
  Plus,
  Trash2,
  CheckCircle,
  Timer,
  Info,
  Check,
  ChevronRight,
  ChevronLeft,
  X,
  Volume2,
  VolumeX,
  Activity,
  Award,
  Video,
  Mic
} from 'lucide-react';

export const LiveWorkoutTracker: React.FC = () => {
  const {
    activeWorkout,
    cancelActiveWorkout,
    finishActiveWorkout,
    updateActiveSet,
    addSetToActiveExercise,
    removeSetFromActiveExercise,
    setActiveExerciseIndex,
    exercises,
    setSelectedExercise,
    playChime,
    profile
  } = useApp();

  // Active workout timer
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isWorkoutPaused, setIsWorkoutPaused] = useState<boolean>(false);

  // Rest Timer
  const [restSecondsRemaining, setRestSecondsRemaining] = useState<number>(0);
  const [isRestTimerActive, setIsRestTimerActive] = useState<boolean>(false);

  // Finish modal
  const [isFinishModalOpen, setIsFinishModalOpen] = useState<boolean>(false);
  const [perceivedRPE, setPerceivedRPE] = useState<number>(8);
  const [workoutNotes, setWorkoutNotes] = useState<string>('');

  // Real-life technique video modal
  const [videoModalExercise, setVideoModalExercise] = useState<any>(null);

  // Workout stopwatch
  useEffect(() => {
    if (!activeWorkout || isWorkoutPaused) return;
    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - activeWorkout.startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [activeWorkout, isWorkoutPaused]);

  // Rest timer countdown
  useEffect(() => {
    if (!isRestTimerActive || restSecondsRemaining <= 0) return;
    const timer = setInterval(() => {
      setRestSecondsRemaining((prev) => {
        if (prev <= 1) {
          setIsRestTimerActive(false);
          playChime('rest-end');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isRestTimerActive, restSecondsRemaining]);

  const startRestTimer = (seconds: number = 90) => {
    setRestSecondsRemaining(seconds);
    setIsRestTimerActive(true);
    playChime('beep');
  };

  const handleToggleSetComplete = (setIdx: number, currentCompleted: boolean) => {
    if (!activeWorkout) return;
    const activeExIdx = activeWorkout.activeExerciseIndex;
    const newCompleted = !currentCompleted;

    updateActiveSet(activeExIdx, setIdx, { completed: newCompleted });

    if (newCompleted) {
      playChime('beep');
      // Trigger rest timer
      startRestTimer(90);
    }
  };

  const handleFinishWorkout = () => {
    try {
      finishActiveWorkout(perceivedRPE, workoutNotes);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setIsFinishModalOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Helper to get active exercise and target set
  const currentExercise = activeWorkout?.exercises[activeWorkout?.activeExerciseIndex ?? 0];
  const firstIncompleteSetIndex = currentExercise?.sets.findIndex((s) => !s.completed) ?? -1;
  const targetSetIndex = firstIncompleteSetIndex !== -1 ? firstIncompleteSetIndex : (currentExercise?.sets.length ? currentExercise.sets.length - 1 : 0);
  const targetSet = currentExercise?.sets[targetSetIndex];

  // -------------------------------------------------------------------------
  // HANDS-FREE VOICE COMMAND DISPATCHER FOR SETS & WORKOUT
  // -------------------------------------------------------------------------
  const handleVoiceCommand: VoiceCommandHandler = (action) => {
    if (!activeWorkout || !currentExercise) return;
    const activeExIdx = activeWorkout.activeExerciseIndex;

    switch (action.type) {
      case 'COMPLETE_CURRENT_SET': {
        // Complete the current set (first incomplete, or targetSetIndex)
        const setIdxToLog = targetSetIndex;
        const currentSet = currentExercise.sets[setIdxToLog];
        if (currentSet) {
          const actualReps = currentSet.actualReps || currentSet.targetReps;
          updateActiveSet(activeExIdx, setIdxToLog, {
            completed: true,
            actualReps
          });
          startRestTimer(90);
          playChime('beep');

          // Check if this was the last set of this exercise
          const isLastSet = setIdxToLog === currentExercise.sets.length - 1;
          const isLastExercise = activeExIdx === activeWorkout.exercises.length - 1;

          if (isLastSet && !isLastExercise) {
            return `Set ${setIdxToLog + 1} completed! All sets finished for ${currentExercise.exerciseName}. Moving to next exercise after rest.`;
          }

          return `Set ${setIdxToLog + 1} logged with ${actualReps} reps! 90 seconds rest starting now.`;
        }
        return 'Set logged.';
      }

      case 'UNDO_CURRENT_SET': {
        // Find last completed set to uncheck
        const lastCompletedIdx = [...currentExercise.sets]
          .map((s, idx) => ({ ...s, idx }))
          .reverse()
          .find((s) => s.completed)?.idx;

        if (lastCompletedIdx !== undefined) {
          updateActiveSet(activeExIdx, lastCompletedIdx, { completed: false });
          return `Set ${lastCompletedIdx + 1} marked incomplete.`;
        }
        return 'No completed set to undo.';
      }

      case 'SET_REPS': {
        const reps = action.payload as number;
        updateActiveSet(activeExIdx, targetSetIndex, { actualReps: reps });
        return `Reps for set ${targetSetIndex + 1} updated to ${reps}.`;
      }

      case 'SET_WEIGHT': {
        const weight = action.payload as number;
        updateActiveSet(activeExIdx, targetSetIndex, { weight });
        const unit = profile.unitSystem === 'metric' ? 'kilos' : 'pounds';
        return `Weight set to ${weight} ${unit}.`;
      }

      case 'ADJUST_WEIGHT': {
        const delta = action.payload as number;
        const currentW = targetSet?.weight || 0;
        const newWeight = Math.max(0, currentW + delta);
        updateActiveSet(activeExIdx, targetSetIndex, { weight: newWeight });
        const unit = profile.unitSystem === 'metric' ? 'kilos' : 'pounds';
        return `Weight adjusted to ${newWeight} ${unit}.`;
      }

      case 'SET_RPE': {
        const rpe = action.payload as number;
        updateActiveSet(activeExIdx, targetSetIndex, { rpe });
        return `RPE set to ${rpe}.`;
      }

      case 'NEXT_EXERCISE': {
        if (activeExIdx < activeWorkout.exercises.length - 1) {
          const nextIdx = activeExIdx + 1;
          setActiveExerciseIndex(nextIdx);
          const nextEx = activeWorkout.exercises[nextIdx];
          return `Switched to exercise ${nextIdx + 1}: ${nextEx.exerciseName}.`;
        }
        return 'Already on the final exercise of this routine.';
      }

      case 'PREV_EXERCISE': {
        if (activeExIdx > 0) {
          const prevIdx = activeExIdx - 1;
          setActiveExerciseIndex(prevIdx);
          const prevEx = activeWorkout.exercises[prevIdx];
          return `Returned to exercise ${prevIdx + 1}: ${prevEx.exerciseName}.`;
        }
        return 'Already on the first exercise.';
      }

      case 'ADD_SET': {
        addSetToActiveExercise(activeExIdx);
        return `Added set ${currentExercise.sets.length + 1} to ${currentExercise.exerciseName}.`;
      }

      case 'REMOVE_SET': {
        if (currentExercise.sets.length > 1) {
          removeSetFromActiveExercise(activeExIdx, currentExercise.sets.length - 1);
          return 'Removed the last set.';
        }
        return 'Cannot remove the only remaining set.';
      }

      case 'START_REST': {
        const sec = action.payload || 90;
        startRestTimer(sec);
        return `Rest timer set to ${sec} seconds. Breathe and recover.`;
      }

      case 'SKIP_REST': {
        setIsRestTimerActive(false);
        setRestSecondsRemaining(0);
        return 'Rest timer stopped. Ready for the next set!';
      }

      case 'ADD_REST_TIME': {
        const extra = action.payload || 30;
        setRestSecondsRemaining((prev) => prev + extra);
        setIsRestTimerActive(true);
        return `Added ${extra} seconds of rest.`;
      }

      case 'PAUSE_WORKOUT': {
        setIsWorkoutPaused(true);
        return 'Workout stopwatch paused.';
      }

      case 'RESUME_WORKOUT': {
        setIsWorkoutPaused(false);
        return 'Workout stopwatch running.';
      }

      case 'FINISH_WORKOUT': {
        setIsFinishModalOpen(true);
        return 'Opening workout summary. Great work today!';
      }

      case 'SPOKEN_STATUS': {
        const unit = profile.unitSystem === 'metric' ? 'kilos' : 'pounds';
        const completedCount = currentExercise.sets.filter((s) => s.completed).length;
        const totalSets = currentExercise.sets.length;
        const currentWeight = targetSet?.weight || 0;
        const currentReps = targetSet?.actualReps || targetSet?.targetReps || 10;

        return `Current exercise: ${currentExercise.exerciseName}. Set ${targetSetIndex + 1} of ${totalSets}. Target: ${currentReps} reps at ${currentWeight} ${unit}. Completed ${completedCount} of ${totalSets} sets.`;
      }

      case 'HELP': {
        return "Voice coach active. You can say: Complete set, 10 reps, Weight 80, Next exercise, Skip rest, or Status.";
      }
    }
  };

  if (!activeWorkout) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center h-full min-h-[400px] bg-[#080d1a]">
        <Activity className="w-16 h-16 text-blue-500/40 mb-3" />
        <h2 className="text-xl font-bold font-heading text-white">No Workout in Progress</h2>
        <p className="text-xs text-gray-400 mt-1 max-w-sm">
          Select an exercise from the database or pick a workout routine from the Home Workouts or Planner section to start logging.
        </p>
      </div>
    );
  }

  const exDetail = exercises.find((e) => e.id === currentExercise?.exerciseId);

  return (
    <div className="flex flex-col h-full bg-[#080d1a] text-gray-100 pb-24">
      {/* Top HUD: Stopwatch & Rest Bar */}
      <div className="p-4 bg-[#0f172a] border-b border-[#213253] flex flex-wrap items-center justify-between gap-3 sticky top-0 z-20 shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-sky-400 uppercase">
              LIVE TRAINING SESSION
            </span>
          </div>
          <h1 className="text-base sm:text-lg font-bold font-heading text-white">{activeWorkout.routineTitle}</h1>
        </div>

        {/* Stopwatch & Rest Timer Displays */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Heart Rate Monitor Live Sync Widget */}
          <HeartRateMonitor compact />

          {/* Pause / Resume Button */}
          <button
            onClick={() => setIsWorkoutPaused(!isWorkoutPaused)}
            className="p-2 rounded-xl bg-[#162038] hover:bg-[#1f2d4d] border border-[#213253] text-gray-300 hover:text-white"
            title={isWorkoutPaused ? 'Resume Stopwatch' : 'Pause Stopwatch'}
          >
            {isWorkoutPaused ? <Play className="w-4 h-4 text-sky-400" /> : <Pause className="w-4 h-4" />}
          </button>

          {/* Elapsed Time */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#162038] rounded-xl border border-[#213253]">
            <Timer className="w-4 h-4 text-sky-400" />
            <span className="font-mono-numbers font-bold text-sm text-white">
              {formatTime(elapsedSeconds)}
            </span>
          </div>

          {/* Finish Button */}
          <button
            onClick={() => setIsFinishModalOpen(true)}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/25 transition-all"
          >
            Finish Workout
          </button>
        </div>
      </div>

      {/* Rest Timer Floating Banner if Active */}
      {isRestTimerActive && (
        <div className="bg-[#0e1d3a] border-b border-blue-500/40 px-4 py-2.5 flex items-center justify-between text-xs text-sky-200 shadow-lg animate-fade-in">
          <div className="flex items-center gap-2">
            <Timer className="w-4 h-4 text-sky-400 animate-spin" />
            <span className="font-mono font-bold uppercase tracking-wider text-sky-400">Rest Timer:</span>
            <span className="font-mono-numbers text-base font-bold text-white">
              {formatTime(restSecondsRemaining)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setRestSecondsRemaining((prev) => prev + 30)}
              className="px-2.5 py-1 bg-[#162038] hover:bg-[#1f2d4d] text-sky-300 text-[11px] font-mono rounded-lg border border-[#213253] transition-colors"
            >
              +30s
            </button>
            <button
              onClick={() => {
                setIsRestTimerActive(false);
                setRestSecondsRemaining(0);
              }}
              className="px-2.5 py-1 bg-blue-600/30 hover:bg-blue-600/50 text-sky-200 text-[11px] font-mono rounded-lg border border-blue-500/40 transition-colors"
            >
              Skip Rest
            </button>
            <button
              onClick={() => setIsRestTimerActive(false)}
              className="p-1 text-gray-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Exercise Viewport */}
      <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4">
        {/* Hands-Free Voice Commands HUD */}
        <VoiceCoachHUD
          onAction={handleVoiceCommand}
          currentExerciseName={currentExercise?.exerciseName || ''}
          currentSetIndex={targetSetIndex}
          totalSets={currentExercise?.sets.length || 0}
          targetReps={typeof targetSet?.targetReps === 'number' ? targetSet.targetReps : parseInt(targetSet?.targetReps || '10', 10) || 10}
          currentWeight={targetSet?.weight || 0}
          weightUnit={profile.unitSystem === 'metric' ? 'kg' : 'lbs'}
          isRestActive={isRestTimerActive}
          restSeconds={restSecondsRemaining}
        />

        {/* Exercise Header & Carousel Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {activeWorkout.exercises.map((ex, idx) => (
            <button
              key={idx}
              onClick={() => setActiveExerciseIndex(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                activeWorkout.activeExerciseIndex === idx
                  ? 'bg-blue-600 text-white font-bold border-blue-400 shadow-md shadow-blue-500/25'
                  : 'bg-[#0f172a] text-gray-400 border-[#213253] hover:text-white'
              }`}
            >
              <span>{idx + 1}. {ex.exerciseName.split(' ')[0]}</span>
              {ex.sets.every((s) => s.completed) && ex.sets.length > 0 && (
                <Check className="w-3 h-3 stroke-[3]" />
              )}
            </button>
          ))}
        </div>

        {/* Current Active Exercise Card */}
        {currentExercise && (
          <div className="bg-[#0f172a] rounded-2xl border border-[#213253] p-4 sm:p-5 space-y-4 shadow-xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono text-sky-400 uppercase font-bold tracking-wider">
                  Exercise {activeWorkout.activeExerciseIndex + 1} of {activeWorkout.exercises.length}
                </span>
                <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                  {currentExercise.exerciseName}
                </h2>
                {exDetail && (
                  <p className="text-xs text-gray-400 mt-0.5">
                    Target: <span className="text-gray-300 font-medium">{exDetail.targetMuscles}</span>
                  </p>
                )}
              </div>

              {exDetail && (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setVideoModalExercise(exDetail)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-white text-xs font-semibold rounded-lg border border-red-500/40 shadow-sm transition-colors"
                    title="Watch free YouTube video explaining this exercise"
                  >
                    <Play className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                    <span>Watch Real Video</span>
                  </button>

                  <button
                    onClick={() => setSelectedExercise(exDetail)}
                    className="flex items-center gap-1 px-2.5 py-1.5 bg-[#162038] hover:bg-[#1f2d4d] text-gray-300 text-xs rounded-lg border border-[#213253] transition-colors"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Details</span>
                  </button>
                </div>
              )}
            </div>

            {/* Sets Logging Table */}
            <div className="space-y-2">
              <div className="grid grid-cols-12 gap-2 text-[10px] font-mono text-gray-400 uppercase px-2">
                <div className="col-span-2 text-center">Set</div>
                <div className="col-span-3 text-center">Weight ({profile.unitSystem === 'metric' ? 'kg' : 'lbs'})</div>
                <div className="col-span-3 text-center">Reps</div>
                <div className="col-span-2 text-center">RPE (1-10)</div>
                <div className="col-span-2 text-center">Done</div>
              </div>

              {currentExercise.sets.map((set, setIdx) => {
                const isCurrentActive = setIdx === targetSetIndex && !set.completed;
                return (
                  <div
                    key={setIdx}
                    className={`grid grid-cols-12 gap-2 items-center p-2 rounded-xl border transition-all ${
                      set.completed
                        ? 'bg-blue-950/25 border-blue-500/40 text-blue-200'
                        : isCurrentActive
                        ? 'bg-[#14203b] border-blue-500/60 ring-1 ring-blue-500/30 text-white'
                        : 'bg-[#162038] border-[#213253] text-gray-200'
                    }`}
                  >
                    {/* Set Number with voice indicator on active */}
                    <div className="col-span-2 text-center font-mono font-bold text-xs flex items-center justify-center gap-1 text-sky-400">
                      <span>#{set.setNumber}</span>
                      {isCurrentActive && (
                        <span title="Current target set for voice commands">
                          <Mic className="w-3 h-3 text-sky-400 animate-pulse" />
                        </span>
                      )}
                    </div>

                    {/* Weight Input */}
                    <div className="col-span-3">
                      <input
                        type="number"
                        step="0.5"
                        value={set.weight || ''}
                        placeholder="0"
                        onChange={(e) =>
                          updateActiveSet(activeWorkout.activeExerciseIndex, setIdx, {
                            weight: parseFloat(e.target.value) || 0
                          })
                        }
                        className="w-full text-center py-1.5 bg-[#0f172a] border border-[#213253] rounded-lg text-xs font-mono font-bold text-white focus:outline-none focus:border-blue-500 shadow-inner"
                      />
                    </div>

                    {/* Reps Input */}
                    <div className="col-span-3">
                      <input
                        type="number"
                        value={set.actualReps || ''}
                        placeholder={set.targetReps.toString()}
                        onChange={(e) =>
                          updateActiveSet(activeWorkout.activeExerciseIndex, setIdx, {
                            actualReps: parseInt(e.target.value, 10) || 0
                          })
                        }
                        className="w-full text-center py-1.5 bg-[#0f172a] border border-[#213253] rounded-lg text-xs font-mono font-bold text-white focus:outline-none focus:border-blue-500 shadow-inner"
                      />
                    </div>

                    {/* RPE Input */}
                    <div className="col-span-2">
                      <input
                        type="number"
                        min="1"
                        max="10"
                        step="0.5"
                        value={set.rpe || 8}
                        onChange={(e) =>
                          updateActiveSet(activeWorkout.activeExerciseIndex, setIdx, {
                            rpe: parseFloat(e.target.value) || 8
                          })
                        }
                        className="w-full text-center py-1.5 bg-[#0f172a] border border-[#213253] rounded-lg text-xs font-mono text-gray-300 focus:outline-none focus:border-blue-500 shadow-inner"
                      />
                    </div>

                    {/* Completion Checkmark Toggle */}
                    <div className="col-span-2 flex justify-center">
                      <button
                        onClick={() => handleToggleSetComplete(setIdx, set.completed)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                          set.completed
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/40'
                            : 'bg-[#0f172a] border border-[#213253] text-gray-500 hover:text-white'
                        }`}
                        title={set.completed ? 'Click or say "Undo set"' : 'Click or say "Complete set"'}
                      >
                        <Check className={`w-4 h-4 ${set.completed ? 'stroke-[3]' : ''}`} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add / Remove Set Row */}
            <div className="flex items-center justify-between pt-2 border-t border-[#213253]">
              <button
                onClick={() => addSetToActiveExercise(activeWorkout.activeExerciseIndex)}
                className="flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Set (or say "Add set")</span>
              </button>

              {currentExercise.sets.length > 1 && (
                <button
                  onClick={() =>
                    removeSetFromActiveExercise(
                      activeWorkout.activeExerciseIndex,
                      currentExercise.sets.length - 1
                    )
                  }
                  className="text-xs text-gray-500 hover:text-red-400"
                >
                  Remove Last Set
                </button>
              )}
            </div>
          </div>
        )}

        {/* Carousel Prev / Next Exercise Nav Buttons */}
        <div className="flex items-center justify-between gap-3">
          <button
            disabled={activeWorkout.activeExerciseIndex === 0}
            onClick={() => setActiveExerciseIndex(activeWorkout.activeExerciseIndex - 1)}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#0f172a] hover:bg-[#162038] disabled:opacity-30 text-gray-300 text-xs rounded-xl border border-[#213253] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Exercise</span>
          </button>

          <button
            disabled={activeWorkout.activeExerciseIndex === activeWorkout.exercises.length - 1}
            onClick={() => setActiveExerciseIndex(activeWorkout.activeExerciseIndex + 1)}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#0f172a] hover:bg-[#162038] disabled:opacity-30 text-gray-300 text-xs rounded-xl border border-[#213253] transition-colors"
          >
            <span>Next Exercise</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Cancel Workout Button */}
        <div className="pt-2 flex justify-center">
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to discard this workout?')) {
                cancelActiveWorkout();
              }
            }}
            className="text-xs text-red-400/80 hover:text-red-300 py-1 px-3 rounded-lg hover:bg-red-950/20 transition-colors"
          >
            Discard Workout Session
          </button>
        </div>
      </div>

      {/* Workout Finish Review Modal */}
      {isFinishModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-[#213253] rounded-3xl p-6 max-w-md w-full space-y-5 shadow-2xl relative">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-sky-400">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-heading text-white">Workout Complete!</h3>
                <p className="text-xs text-gray-400">Review effort and save to training log</p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 bg-[#162038] p-3 rounded-2xl border border-[#213253] text-center">
              <div>
                <span className="text-[10px] font-mono text-gray-400 uppercase">Total Time</span>
                <p className="font-mono-numbers font-bold text-lg text-white">{formatTime(elapsedSeconds)}</p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-gray-400 uppercase">Sets Finished</span>
                <p className="font-mono-numbers font-bold text-lg text-sky-400">
                  {activeWorkout.exercises.reduce((acc, ex) => acc + ex.sets.filter((s) => s.completed).length, 0)}
                </p>
              </div>
            </div>

            {/* RPE Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-gray-300 font-medium">Session RPE (Effort)</span>
                <span className="font-mono font-bold text-sky-400">{perceivedRPE} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={perceivedRPE}
                onChange={(e) => setPerceivedRPE(parseFloat(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-500">
                <span>1 - Very Easy</span>
                <span>5 - Moderate</span>
                <span>10 - Max Effort</span>
              </div>
            </div>

            {/* Workout Notes */}
            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-medium">Session Notes</label>
              <textarea
                rows={3}
                value={workoutNotes}
                onChange={(e) => setWorkoutNotes(e.target.value)}
                placeholder="How did today's lifts feel? Weight PRs, form notes, fatigue..."
                className="w-full bg-[#162038] border border-[#213253] rounded-xl p-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setIsFinishModalOpen(false)}
                className="flex-1 py-2.5 bg-[#162038] hover:bg-[#1f2d4d] text-gray-300 text-xs font-semibold rounded-xl border border-[#213253]"
              >
                Back to Session
              </button>
              <button
                onClick={handleFinishWorkout}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-500/30"
              >
                Save Workout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Real-life Technique Video Modal */}
      {videoModalExercise && (
        <TechniqueVideoModal
          exercise={videoModalExercise}
          isOpen={!!videoModalExercise}
          onClose={() => setVideoModalExercise(null)}
        />
      )}
    </div>
  );
};
