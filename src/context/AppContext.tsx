import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Exercise,
  WorkoutRoutine,
  WorkoutLog,
  UserProfile,
  BodyMeasurement,
  PersonalRecord,
  NavigationTab,
} from '../types';
import { EXERCISES_DATABASE } from '../data/exercisesData';
import { HOME_ROUTINES, GYM_SAMPLE_PLANS } from '../data/homeWorkoutsData';

interface ActiveWorkoutState {
  routineId?: string;
  routineTitle: string;
  startTime: number;
  exercises: {
    exerciseId: string;
    exerciseName: string;
    sets: {
      setNumber: number;
      targetReps: string;
      actualReps: number;
      weight: number;
      completed: boolean;
      rpe: number;
    }[];
  }[];
  activeExerciseIndex: number;
}

interface AppContextType {
  // Navigation
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  selectedExercise: Exercise | null;
  setSelectedExercise: (exercise: Exercise | null) => void;
  selectedStudioExerciseId: string;
  setSelectedStudioExerciseId: (id: string) => void;

  // Profile & Settings
  profile: UserProfile;
  updateProfile: (updated: Partial<UserProfile>) => void;
  resetOnboarding: () => void;

  // Exercise & Routines
  exercises: Exercise[];
  routines: WorkoutRoutine[];
  addCustomRoutine: (routine: WorkoutRoutine) => void;
  updateRoutine: (routine: WorkoutRoutine) => void;
  duplicateRoutine: (routineId: string) => void;
  deleteRoutine: (routineId: string) => void;

  // Active Live Workout
  activeWorkout: ActiveWorkoutState | null;
  startWorkout: (routine?: WorkoutRoutine, singleExercise?: Exercise) => void;
  cancelActiveWorkout: () => void;
  finishActiveWorkout: (perceivedDifficulty: number, notes: string) => WorkoutLog;
  updateActiveSet: (exerciseIndex: number, setIndex: number, updates: any) => void;
  addSetToActiveExercise: (exerciseIndex: number) => void;
  removeSetFromActiveExercise: (exerciseIndex: number, setIndex: number) => void;
  setActiveExerciseIndex: (index: number) => void;

  // History & Progress
  workoutLogs: WorkoutLog[];
  deleteWorkoutLog: (logId: string) => void;
  bodyMeasurements: BodyMeasurement[];
  addBodyMeasurement: (measurement: Omit<BodyMeasurement, 'id'>) => void;
  deleteBodyMeasurement: (id: string) => void;
  personalRecords: PersonalRecord[];

  // Bookmarks
  bookmarkedArticleIds: string[];
  toggleBookmarkArticle: (articleId: string) => void;

  // Audio & Rest Timer
  playChime: (type?: 'beep' | 'success' | 'rest-end') => void;

  // Mobile Device Frame Simulator Toggle
  isAndroidFrameMode: boolean;
  setIsAndroidFrameMode: (enabled: boolean) => void;

  // Theme Management (Light by default with white background, Dark mode option)
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;

  // Export / Import Data
  exportUserData: () => string;
  importUserData: (jsonData: string) => boolean;
  resetAllDataToDemo: () => void;
}

const DEFAULT_PROFILE: UserProfile = {
  name: 'Athlete',
  experienceLevel: 'Intermediate',
  primaryGoal: 'Hypertrophy',
  preferredLocation: 'Both',
  availableDaysPerWeek: 4,
  sessionDurationMinutes: 60,
  availableEquipment: ['Barbell', 'Dumbbell', 'Bodyweight', 'Household Item'],
  physicalLimitations: 'None',
  unitSystem: 'metric',
  soundEnabled: true,
  onboardingCompleted: true,
};

const INITIAL_MEASUREMENTS: BodyMeasurement[] = [
  {
    id: 'm-1',
    date: new Date(Date.now() - 14 * 86400000).toISOString(),
    weightKg: 78.5,
    bodyFatPercent: 15.2,
    chestCm: 104,
    waistCm: 82,
    armsCm: 37.5,
    thighsCm: 60,
    notes: 'Starting cycle evaluation.'
  },
  {
    id: 'm-2',
    date: new Date(Date.now() - 3 * 86400000).toISOString(),
    weightKg: 79.1,
    bodyFatPercent: 14.8,
    chestCm: 105.5,
    waistCm: 81.5,
    armsCm: 38.0,
    thighsCm: 60.8,
    notes: 'Strength progression solid, sleep average 7.8 hrs.'
  }
];

const INITIAL_LOGS: WorkoutLog[] = [
  {
    id: 'log-1',
    routineTitle: 'Evidence-Based Push: Chest, Delts & Triceps',
    date: new Date(Date.now() - 5 * 86400000).toISOString(),
    durationMinutes: 52,
    perceivedDifficulty: 8,
    notes: 'Solid chest connection. Pushed bench to 85kg for 6 clean reps.',
    totalVolumeKg: 7820,
    totalSetsCompleted: 17,
    exercises: [
      {
        exerciseId: 'barbell-bench-press',
        exerciseName: 'Barbell Bench Press',
        sets: [
          { setNumber: 1, reps: 8, weight: 80, completed: true, rpe: 7.5 },
          { setNumber: 2, reps: 8, weight: 80, completed: true, rpe: 8 },
          { setNumber: 3, reps: 6, weight: 85, completed: true, rpe: 8.5 },
          { setNumber: 4, reps: 6, weight: 85, completed: true, rpe: 9 },
        ]
      },
      {
        exerciseId: 'incline-dumbbell-press',
        exerciseName: 'Incline Dumbbell Press',
        sets: [
          { setNumber: 1, reps: 10, weight: 28, completed: true, rpe: 8 },
          { setNumber: 2, reps: 10, weight: 28, completed: true, rpe: 8 },
          { setNumber: 3, reps: 9, weight: 28, completed: true, rpe: 9 },
        ]
      }
    ]
  },
  {
    id: 'log-2',
    routineTitle: 'Evidence-Based Pull: Back, Rear Delts & Biceps',
    date: new Date(Date.now() - 3 * 86400000).toISOString(),
    durationMinutes: 58,
    perceivedDifficulty: 8.5,
    notes: 'Deadlifts felt snappy with double overhand and hook grip.',
    totalVolumeKg: 9450,
    totalSetsCompleted: 16,
    exercises: [
      {
        exerciseId: 'barbell-deadlift',
        exerciseName: 'Conventional Barbell Deadlift',
        sets: [
          { setNumber: 1, reps: 5, weight: 140, completed: true, rpe: 7.5 },
          { setNumber: 2, reps: 5, weight: 145, completed: true, rpe: 8 },
          { setNumber: 3, reps: 5, weight: 150, completed: true, rpe: 9 },
        ]
      }
    ]
  },
  {
    id: 'log-3',
    routineTitle: 'Evidence-Based Legs: Quads, Hamstrings & Glutes',
    date: new Date(Date.now() - 1 * 86400000).toISOString(),
    durationMinutes: 62,
    perceivedDifficulty: 9,
    notes: 'Squats with full depth below parallel. Hamstring RDL stretch deep.',
    totalVolumeKg: 10200,
    totalSetsCompleted: 18,
    exercises: [
      {
        exerciseId: 'barbell-back-squat',
        exerciseName: 'Barbell Back Squat',
        sets: [
          { setNumber: 1, reps: 8, weight: 110, completed: true, rpe: 7.5 },
          { setNumber: 2, reps: 8, weight: 110, completed: true, rpe: 8 },
          { setNumber: 3, reps: 7, weight: 115, completed: true, rpe: 8.5 },
          { setNumber: 4, reps: 6, weight: 120, completed: true, rpe: 9 },
        ]
      }
    ]
  }
];

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [selectedStudioExerciseId, setSelectedStudioExerciseId] = useState<string>('barbell-back-squat');
  const [isAndroidFrameMode, setIsAndroidFrameMode] = useState<boolean>(false);

  // Persistent Theme: default to 'light' with white background as requested
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    try {
      const stored = localStorage.getItem('app_theme');
      if (stored === 'dark' || stored === 'light') return stored;
    } catch {}
    return 'light'; // Default white background
  });

  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    try {
      localStorage.setItem('app_theme', theme);
    } catch {}
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [theme]);

  // Persistent user profile
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const stored = localStorage.getItem('gra_user_profile');
      return stored ? JSON.parse(stored) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  // Persistent routines
  const [routines, setRoutines] = useState<WorkoutRoutine[]>(() => {
    try {
      const stored = localStorage.getItem('gra_workout_routines');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }
    return [...GYM_SAMPLE_PLANS, ...HOME_ROUTINES];
  });

  // Persistent workout logs
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>(() => {
    try {
      const stored = localStorage.getItem('gra_workout_logs');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_LOGS;
  });

  // Persistent body measurements
  const [bodyMeasurements, setBodyMeasurements] = useState<BodyMeasurement[]>(() => {
    try {
      const stored = localStorage.getItem('gra_measurements');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_MEASUREMENTS;
  });

  // Persistent bookmarked articles
  const [bookmarkedArticleIds, setBookmarkedArticleIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('gra_bookmarks');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return ['hypertrophy-mechanisms-tension', 'progressive-overload-principles'];
  });

  // Active workout state
  const [activeWorkout, setActiveWorkout] = useState<ActiveWorkoutState | null>(() => {
    try {
      const stored = localStorage.getItem('gra_active_workout');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return null;
  });

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('gra_user_profile', JSON.stringify(profile));
    } catch (e) {}
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('gra_workout_routines', JSON.stringify(routines));
    } catch (e) {}
  }, [routines]);

  useEffect(() => {
    try {
      localStorage.setItem('gra_workout_logs', JSON.stringify(workoutLogs));
    } catch (e) {}
  }, [workoutLogs]);

  useEffect(() => {
    try {
      localStorage.setItem('gra_measurements', JSON.stringify(bodyMeasurements));
    } catch (e) {}
  }, [bodyMeasurements]);

  useEffect(() => {
    try {
      localStorage.setItem('gra_bookmarks', JSON.stringify(bookmarkedArticleIds));
    } catch (e) {}
  }, [bookmarkedArticleIds]);

  useEffect(() => {
    try {
      if (activeWorkout) {
        localStorage.setItem('gra_active_workout', JSON.stringify(activeWorkout));
      } else {
        localStorage.removeItem('gra_active_workout');
      }
    } catch (e) {}
  }, [activeWorkout]);

  // Web Audio synthesizer chime for timers
  const playChime = (type: 'beep' | 'success' | 'rest-end' = 'beep') => {
    if (!profile.soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === 'beep') {
        osc.frequency.setValueAtTime(880, now); // A5
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'rest-end') {
        // Double pulse for rest timer finished
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.setValueAtTime(880, now + 0.1); // A5
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'success') {
        // Major chord arpeggio
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
        osc.frequency.setValueAtTime(1046.50, now + 0.3); // C6
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
      }
    } catch (err) {
      // AudioContext might be blocked before first user gesture
    }
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updated }));
  };

  const resetOnboarding = () => {
    setProfile(prev => ({ ...prev, onboardingCompleted: false }));
  };

  const addCustomRoutine = (routine: WorkoutRoutine) => {
    setRoutines(prev => [routine, ...prev]);
  };

  const updateRoutine = (routine: WorkoutRoutine) => {
    setRoutines(prev => prev.map(r => (r.id === routine.id ? routine : r)));
  };

  const duplicateRoutine = (routineId: string) => {
    const found = routines.find(r => r.id === routineId);
    if (!found) return;
    const duplicated: WorkoutRoutine = {
      ...found,
      id: `custom-copy-${Date.now()}`,
      title: `${found.title} (Copy)`,
      isCustom: true,
    };
    setRoutines(prev => [duplicated, ...prev]);
  };

  const deleteRoutine = (routineId: string) => {
    setRoutines(prev => prev.filter(r => r.id !== routineId));
  };

  // Start workout player
  const startWorkout = (routine?: WorkoutRoutine, singleExercise?: Exercise) => {
    let exercisesToTrack: ActiveWorkoutState['exercises'] = [];

    if (routine) {
      exercisesToTrack = routine.exercises.map(re => {
        const exDetail = EXERCISES_DATABASE.find(e => e.id === re.exerciseId);
        const name = exDetail ? exDetail.name : re.exerciseId;
        const targetReps = re.targetReps || '10';
        const sets = Array.from({ length: re.targetSets || 3 }, (_, i) => ({
          setNumber: i + 1,
          targetReps,
          actualReps: parseInt(targetReps) || 10,
          weight: 0,
          completed: false,
          rpe: 8,
        }));
        return {
          exerciseId: re.exerciseId,
          exerciseName: name,
          sets,
        };
      });
    } else if (singleExercise) {
      exercisesToTrack = [
        {
          exerciseId: singleExercise.id,
          exerciseName: singleExercise.name,
          sets: [
            { setNumber: 1, targetReps: '10', actualReps: 10, weight: 0, completed: false, rpe: 8 },
            { setNumber: 2, targetReps: '10', actualReps: 10, weight: 0, completed: false, rpe: 8 },
            { setNumber: 3, targetReps: '10', actualReps: 10, weight: 0, completed: false, rpe: 8 },
          ]
        }
      ];
    } else {
      // Default quick session with push-ups and squats
      exercisesToTrack = [
        {
          exerciseId: 'standard-pushup',
          exerciseName: 'Push-Up (Standard & Deficit)',
          sets: [
            { setNumber: 1, targetReps: '15', actualReps: 15, weight: 0, completed: false, rpe: 8 },
            { setNumber: 2, targetReps: '15', actualReps: 15, weight: 0, completed: false, rpe: 8 },
            { setNumber: 3, targetReps: '15', actualReps: 15, weight: 0, completed: false, rpe: 8 },
          ]
        }
      ];
    }

    const newActive: ActiveWorkoutState = {
      routineId: routine?.id,
      routineTitle: routine?.title || (singleExercise ? `${singleExercise.name} Session` : 'Freestyle Training'),
      startTime: Date.now(),
      exercises: exercisesToTrack,
      activeExerciseIndex: 0,
    };

    setActiveWorkout(newActive);
    setActiveTab('tracker');
    playChime('beep');
  };

  const cancelActiveWorkout = () => {
    setActiveWorkout(null);
  };

  const updateActiveSet = (exerciseIndex: number, setIndex: number, updates: any) => {
    if (!activeWorkout) return;
    const cloned = JSON.parse(JSON.stringify(activeWorkout)) as ActiveWorkoutState;
    if (cloned.exercises[exerciseIndex]?.sets[setIndex]) {
      cloned.exercises[exerciseIndex].sets[setIndex] = {
        ...cloned.exercises[exerciseIndex].sets[setIndex],
        ...updates
      };
      setActiveWorkout(cloned);
    }
  };

  const addSetToActiveExercise = (exerciseIndex: number) => {
    if (!activeWorkout) return;
    const cloned = JSON.parse(JSON.stringify(activeWorkout)) as ActiveWorkoutState;
    const targetEx = cloned.exercises[exerciseIndex];
    if (targetEx) {
      const prevSet = targetEx.sets[targetEx.sets.length - 1];
      const newSetNumber = targetEx.sets.length + 1;
      targetEx.sets.push({
        setNumber: newSetNumber,
        targetReps: prevSet ? prevSet.targetReps : '10',
        actualReps: prevSet ? prevSet.actualReps : 10,
        weight: prevSet ? prevSet.weight : 0,
        completed: false,
        rpe: 8,
      });
      setActiveWorkout(cloned);
    }
  };

  const removeSetFromActiveExercise = (exerciseIndex: number, setIndex: number) => {
    if (!activeWorkout) return;
    const cloned = JSON.parse(JSON.stringify(activeWorkout)) as ActiveWorkoutState;
    const targetEx = cloned.exercises[exerciseIndex];
    if (targetEx && targetEx.sets.length > 1) {
      targetEx.sets.splice(setIndex, 1);
      // renumber sets
      targetEx.sets.forEach((s, i) => (s.setNumber = i + 1));
      setActiveWorkout(cloned);
    }
  };

  const setActiveExerciseIndex = (index: number) => {
    if (!activeWorkout) return;
    setActiveWorkout({
      ...activeWorkout,
      activeExerciseIndex: index
    });
  };

  const finishActiveWorkout = (perceivedDifficulty: number, notes: string): WorkoutLog => {
    if (!activeWorkout) throw new Error('No active workout to finish');

    const durationMinutes = Math.max(1, Math.round((Date.now() - activeWorkout.startTime) / 60000));
    let totalVolume = 0;
    let completedSetsCount = 0;

    const logItems = activeWorkout.exercises.map(ex => {
      const completedSets = ex.sets.map(s => {
        if (s.completed) {
          completedSetsCount++;
          totalVolume += (s.weight || 0) * (s.actualReps || 0);
        }
        return {
          setNumber: s.setNumber,
          reps: s.actualReps || 0,
          weight: s.weight || 0,
          completed: s.completed,
          rpe: s.rpe || 8,
        };
      });
      return {
        exerciseId: ex.exerciseId,
        exerciseName: ex.exerciseName,
        sets: completedSets,
      };
    });

    const newLog: WorkoutLog = {
      id: `log-${Date.now()}`,
      routineId: activeWorkout.routineId,
      routineTitle: activeWorkout.routineTitle,
      date: new Date().toISOString(),
      durationMinutes,
      exercises: logItems,
      perceivedDifficulty,
      notes,
      totalVolumeKg: totalVolume,
      totalSetsCompleted: completedSetsCount,
    };

    setWorkoutLogs(prev => [newLog, ...prev]);
    setActiveWorkout(null);
    playChime('success');
    return newLog;
  };

  const deleteWorkoutLog = (logId: string) => {
    setWorkoutLogs(prev => prev.filter(l => l.id !== logId));
  };

  const addBodyMeasurement = (item: Omit<BodyMeasurement, 'id'>) => {
    const newItem: BodyMeasurement = {
      ...item,
      id: `m-${Date.now()}`
    };
    setBodyMeasurements(prev => [newItem, ...prev]);
  };

  const deleteBodyMeasurement = (id: string) => {
    setBodyMeasurements(prev => prev.filter(m => m.id !== id));
  };

  const toggleBookmarkArticle = (articleId: string) => {
    setBookmarkedArticleIds(prev =>
      prev.includes(articleId) ? prev.filter(id => id !== articleId) : [...prev, articleId]
    );
  };

  // Derive personal records dynamically from logs
  const personalRecords: PersonalRecord[] = React.useMemo(() => {
    const prMap: Record<string, { exerciseName: string; bestWeight: number; bestReps: number; max1RM: number; date: string }> = {};

    workoutLogs.forEach(log => {
      log.exercises.forEach(ex => {
        ex.sets.forEach(set => {
          if (set.completed && set.weight > 0 && set.reps > 0) {
            // Epley formula for estimated 1RM: Weight * (1 + Reps/30)
            const epley1RM = Math.round(set.weight * (1 + set.reps / 30));
            const existing = prMap[ex.exerciseId];
            if (!existing || epley1RM > existing.max1RM) {
              prMap[ex.exerciseId] = {
                exerciseName: ex.exerciseName,
                bestWeight: set.weight,
                bestReps: set.reps,
                max1RM: epley1RM,
                date: log.date
              };
            }
          }
        });
      });
    });

    return Object.entries(prMap).map(([exerciseId, data]) => ({
      exerciseId,
      exerciseName: data.exerciseName,
      oneRepMaxEstimate: data.max1RM,
      bestWeight: data.bestWeight,
      bestReps: data.bestReps,
      date: data.date
    }));
  }, [workoutLogs]);

  const exportUserData = (): string => {
    const payload = {
      profile,
      routines,
      workoutLogs,
      bodyMeasurements,
      bookmarkedArticleIds,
      exportedAt: new Date().toISOString(),
      app: 'Gyming Research Advance',
      version: '1.0.0'
    };
    return JSON.stringify(payload, null, 2);
  };

  const importUserData = (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.profile) setProfile(parsed.profile);
      if (parsed.routines) setRoutines(parsed.routines);
      if (parsed.workoutLogs) setWorkoutLogs(parsed.workoutLogs);
      if (parsed.bodyMeasurements) setBodyMeasurements(parsed.bodyMeasurements);
      if (parsed.bookmarkedArticleIds) setBookmarkedArticleIds(parsed.bookmarkedArticleIds);
      return true;
    } catch (e) {
      console.error('Import failed', e);
      return false;
    }
  };

  const resetAllDataToDemo = () => {
    setProfile(DEFAULT_PROFILE);
    setRoutines([...GYM_SAMPLE_PLANS, ...HOME_ROUTINES]);
    setWorkoutLogs(INITIAL_LOGS);
    setBodyMeasurements(INITIAL_MEASUREMENTS);
    setBookmarkedArticleIds(['hypertrophy-mechanisms-tension', 'progressive-overload-principles']);
    setActiveWorkout(null);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedExercise,
        setSelectedExercise,
        selectedStudioExerciseId,
        setSelectedStudioExerciseId,
        profile,
        updateProfile,
        resetOnboarding,
        exercises: EXERCISES_DATABASE,
        routines,
        addCustomRoutine,
        updateRoutine,
        duplicateRoutine,
        deleteRoutine,
        activeWorkout,
        startWorkout,
        cancelActiveWorkout,
        finishActiveWorkout,
        updateActiveSet,
        addSetToActiveExercise,
        removeSetFromActiveExercise,
        setActiveExerciseIndex,
        workoutLogs,
        deleteWorkoutLog,
        bodyMeasurements,
        addBodyMeasurement,
        deleteBodyMeasurement,
        personalRecords,
        bookmarkedArticleIds,
        toggleBookmarkArticle,
        playChime,
        isAndroidFrameMode,
        setIsAndroidFrameMode,
        theme,
        setTheme,
        toggleTheme,
        exportUserData,
        importUserData,
        resetAllDataToDemo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within an AppProvider');
  return ctx;
};
