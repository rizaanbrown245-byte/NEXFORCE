export type MuscleGroup =
  | 'Chest'
  | 'Back'
  | 'Shoulders'
  | 'Biceps'
  | 'Triceps'
  | 'Forearms'
  | 'Abdominals'
  | 'Quadriceps'
  | 'Hamstrings'
  | 'Glutes'
  | 'Calves'
  | 'Full Body'
  | 'Cardio'
  | 'Mobility';

export type EquipmentType =
  | 'Barbell'
  | 'Dumbbell'
  | 'Resistance Band'
  | 'Cable'
  | 'Machine'
  | 'Bodyweight'
  | 'Household Item';

export type ExerciseDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Exercise {
  id: string;
  name: string;
  shortSummary: string;
  targetMuscles: string;
  primaryMuscles: MuscleGroup[];
  secondaryMuscles: MuscleGroup[];
  equipment: EquipmentType[];
  difficulty: ExerciseDifficulty;
  category: 'Gym' | 'Home' | 'Both';
  startingPosition: string;
  executionSteps: string[];
  postureCues: string[];
  breathingPattern: string;
  recommendedSetsReps: {
    hypertrophy: string;
    strength: string;
    endurance: string;
  };
  commonMistakes: string[];
  safetyPrecautions: string[];
  easierVariation: string;
  harderVariation: string;
  alternatives: string[];
  guidanceByLevel: {
    beginner: string;
    intermediate: string;
    advanced: string;
  };
  biomechanicalFocus: string;
  has3DModel?: boolean;
  modelType?: 'squat' | 'bench' | 'deadlift' | 'ohp' | 'pullup' | 'pushup' | 'bicep_curl' | 'lunge';
  vectorVisualType: string;
  techniqueVideo?: TechniqueVideo;
}

export interface VideoPhase {
  name: string;
  timestamp: number; // in seconds
  cue: string;
  biomechanicAngle: string;
}

export interface TechniqueVideo {
  youtubeId?: string;
  youtubeUrl?: string;
  youtubeTitle?: string;
  youtubeChannel?: string;
  videoUrl?: string;
  fallbackVideoUrl?: string;
  thumbnailUrl: string;
  durationSeconds: number;
  cameraAngles: string[];
  phases: VideoPhase[];
  keyCues: string[];
  commonFaults: string[];
  doAndDont: {
    doText: string;
    dontText: string;
  }[];
}

export interface WorkoutSet {
  setNumber: number;
  targetReps: number;
  actualReps?: number;
  weight?: number; // in current unit (kg or lbs)
  rpe?: number; // 1-10
  completed: boolean;
  notes?: string;
}

export interface RoutineExercise {
  exerciseId: string;
  targetSets: number;
  targetReps: string;
  restSeconds: number;
  notes?: string;
}

export interface WorkoutRoutine {
  id: string;
  title: string;
  description: string;
  difficulty: ExerciseDifficulty;
  durationMinutes: number;
  category: 'Home' | 'Gym' | 'Hybrid';
  targetMuscleGroups: MuscleGroup[];
  equipmentNeeded: EquipmentType[];
  isCustom?: boolean;
  exercises: RoutineExercise[];
  scheduleDay?: string; // e.g. "Monday", "Push Day 1"
}

export interface WorkoutLogItem {
  exerciseId: string;
  exerciseName: string;
  sets: {
    setNumber: number;
    reps: number;
    weight: number;
    completed: boolean;
    rpe?: number;
  }[];
  notes?: string;
}

export interface WorkoutLog {
  id: string;
  routineId?: string;
  routineTitle: string;
  date: string; // ISO string
  durationMinutes: number;
  exercises: WorkoutLogItem[];
  perceivedDifficulty: number; // 1-10
  notes?: string;
  totalVolumeKg: number;
  totalSetsCompleted: number;
}

export interface ResearchArticle {
  id: string;
  title: string;
  category:
    | 'Hypertrophy'
    | 'Strength'
    | 'Biomechanics'
    | 'Recovery'
    | 'Nutrition'
    | 'Mythbusters'
    | 'Programming';
  plainSummary: string;
  detailedExplanation: string;
  practicalApplications: string[];
  limitations: string[];
  evidenceStrength: 'Strong Consensus' | 'Moderate Evidence' | 'Preliminary Findings' | 'Debunked Myth';
  citations: {
    authors: string;
    year: number;
    journal: string;
    doiOrUrl: string;
    title: string;
  }[];
  reviewDate: string;
  readTimeMinutes: number;
}

export interface BodyMeasurement {
  id: string;
  date: string;
  weightKg: number;
  bodyFatPercent?: number;
  chestCm?: number;
  waistCm?: number;
  armsCm?: number;
  thighsCm?: number;
  notes?: string;
}

export interface PersonalRecord {
  exerciseId: string;
  exerciseName: string;
  oneRepMaxEstimate: number;
  bestWeight: number;
  bestReps: number;
  date: string;
}

export interface UserProfile {
  name: string;
  experienceLevel: ExerciseDifficulty;
  primaryGoal: 'Hypertrophy' | 'Strength' | 'Fat Loss & Conditioning' | 'General Health & Mobility';
  preferredLocation: 'Gym' | 'Home' | 'Both';
  availableDaysPerWeek: number;
  sessionDurationMinutes: number;
  availableEquipment: EquipmentType[];
  physicalLimitations: string;
  unitSystem: 'metric' | 'imperial'; // metric: kg, imperial: lbs
  soundEnabled: boolean;
  onboardingCompleted: boolean;
}

export type NavigationTab =
  | 'home'
  | 'exercises'
  | '3d-studio'
  | 'prenatal'
  | 'home-workouts'
  | 'planner'
  | 'nutrition'
  | 'tracker'
  | 'research'
  | 'ai-assistant'
  | 'profile'
  | 'apk-hub';

export type PregnancyTrimester = 'Trimester 1' | 'Trimester 2' | 'Trimester 3' | 'Postpartum';

export interface PrenatalExercise {
  id: string;
  name: string;
  subtitle: string;
  category: 'Pelvic Floor & Core' | 'Lower Body & Stability' | 'Upper Body & Posture' | 'Mobility & Labor Prep';
  trimestersSafe: PregnancyTrimester[];
  targetMuscles: string;
  benefits: string;
  safetyCues: string[];
  contraindications: string[];
  equipmentNeeded: string[];
  recommendedReps: string;
  breathingTechnique: string;
  executionSteps: string[];
  modifications: {
    firstTrimester?: string;
    secondTrimester?: string;
    thirdTrimester?: string;
    pelvicGirdlePain?: string;
  };
  youtubeVideoId: string;
  youtubeChannel: string;
  youtubeTitle: string;
}

export interface PrenatalRoutine {
  id: string;
  title: string;
  trimester: PregnancyTrimester | 'All Trimesters';
  durationMinutes: number;
  description: string;
  intensity: 'Gentle & Restorative' | 'Moderate Strength' | 'Birth Preparation';
  exercises: {
    exerciseId: string;
    repsOrDuration: string;
    restSeconds: number;
    tip: string;
  }[];
}

export interface MotivationQuote {
  id: string;
  quote: string;
  author: string;
  authorRole: string;
  category: 'Discipline' | 'Strength' | 'Mindset' | 'Consistency' | 'Resilience' | 'Focus' | 'Greatness';
  insight: string;
}

export type NutritionGoal =
  | 'hypertrophy'
  | 'fat_loss'
  | 'strength'
  | 'endurance'
  | 'plant_based'
  | 'maintenance';

export interface MealItem {
  id: string;
  name: string;
  mealType: 'Breakfast' | 'Morning Snack' | 'Lunch' | 'Pre-Workout Fuel' | 'Post-Workout Dinner' | 'Evening Recovery';
  description: string;
  prepTimeMinutes: number;
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  fiberGrams: number;
  ingredients: {
    item: string;
    amount: string;
    category: 'Produce' | 'Protein' | 'Grains' | 'Dairy' | 'Healthy Fats' | 'Seasoning & Other';
  }[];
  instructions: string[];
  scienceNote: string;
  micronutrients?: string[];
}

export interface DailyMealPlan {
  id: string;
  goal: NutritionGoal;
  title: string;
  subtitle: string;
  targetCalories: number;
  targetProteinGrams: number;
  targetCarbsGrams: number;
  targetFatGrams: number;
  targetFiberGrams: number;
  summary: string;
  scientificRationale: string[];
  meals: MealItem[];
}

export interface WarmUpMovement {
  id: string;
  name: string;
  durationSeconds: number; // e.g. 50-60s
  targetMuscleGroups: MuscleGroup[];
  rampPhase: 'Raise' | 'Activate' | 'Mobilize' | 'Potentiate';
  purpose: string;
  coachingCues: string[];
  breathing: string;
  vectorVisualType?: string;
}

export interface WarmUpRoutine {
  id: string;
  title: string;
  targetMuscleGroups: MuscleGroup[];
  totalDurationSeconds: number; // exactly 300s (5 mins)
  movements: WarmUpMovement[];
}

