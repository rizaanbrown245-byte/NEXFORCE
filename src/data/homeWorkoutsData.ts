import { WorkoutRoutine } from '../types';

export const HOME_ROUTINES: WorkoutRoutine[] = [
  {
    id: 'home-beginner-fullbody',
    title: 'Beginner Zero-Equipment Full-Body Ignition',
    description: 'Designed for beginners with no gym membership or equipment. Builds total-body muscular baseline using safe bodyweight leverages.',
    difficulty: 'Beginner',
    durationMinutes: 30,
    category: 'Home',
    targetMuscleGroups: ['Chest', 'Quadriceps', 'Back', 'Abdominals', 'Glutes'],
    equipmentNeeded: ['Bodyweight'],
    scheduleDay: 'Monday & Thursday (2-3x / week)',
    exercises: [
      {
        exerciseId: 'standard-pushup',
        targetSets: 3,
        targetReps: '8–12 reps (or knee push-ups)',
        restSeconds: 90,
        notes: 'Keep core tight, lower chest with 2-second negative'
      },
      {
        exerciseId: 'barbell-back-squat', // will use bodyweight squat variation
        targetSets: 3,
        targetReps: '15–20 reps',
        restSeconds: 90,
        notes: 'Full bodyweight squat, thighs parallel, knees tracking toes'
      },
      {
        exerciseId: 'inverted-table-row',
        targetSets: 3,
        targetReps: '8–12 reps',
        restSeconds: 90,
        notes: 'Use a verified sturdy dining table or bedsheet in doorframe'
      },
      {
        exerciseId: 'hanging-leg-raise', // will use reverse crunch / floor tuck
        targetSets: 3,
        targetReps: '12–15 reps',
        restSeconds: 60,
        notes: 'Floor lying knee tucks curling pelvis toward sternum'
      },
      {
        exerciseId: 'single-leg-calf-raise',
        targetSets: 3,
        targetReps: '15 reps per leg',
        restSeconds: 60,
        notes: 'On stair edge with 2-second stretch pause at bottom'
      }
    ]
  },
  {
    id: 'home-busy-15min-hiit',
    title: '15-Minute Rapid Metabolic Fire (Busy Days)',
    description: 'Ultra-time-efficient session alternating bodyweight compound push, pull/legs, and core with minimal rest.',
    difficulty: 'Intermediate',
    durationMinutes: 15,
    category: 'Home',
    targetMuscleGroups: ['Full Body', 'Cardio', 'Chest', 'Quadriceps', 'Abdominals'],
    equipmentNeeded: ['Bodyweight'],
    scheduleDay: 'Express Days',
    exercises: [
      {
        exerciseId: 'standard-pushup',
        targetSets: 3,
        targetReps: '15 reps',
        restSeconds: 45,
        notes: 'Explosive push with 1-second pause at bottom'
      },
      {
        exerciseId: 'bulgarian-split-squat',
        targetSets: 3,
        targetReps: '10 reps per leg',
        restSeconds: 45,
        notes: 'Back foot on sofa or sturdy low chair'
      },
      {
        exerciseId: 'hiit-jump-rope',
        targetSets: 3,
        targetReps: '45 seconds work',
        restSeconds: 45,
        notes: 'Rope or ghost skips staying light on toes'
      },
      {
        exerciseId: 'ab-wheel-rollout',
        targetSets: 3,
        targetReps: '10–12 towel slides',
        restSeconds: 45,
        notes: 'Towel or socks on smooth hardwood floor'
      }
    ]
  },
  {
    id: 'home-intermediate-upperbody',
    title: 'Intermediate Calisthenic Upper-Body Sculpt',
    description: 'Demanding bodyweight upper-body routine for chest, back, shoulders, and arms using doorframe, floor, and chair.',
    difficulty: 'Intermediate',
    durationMinutes: 40,
    category: 'Home',
    targetMuscleGroups: ['Chest', 'Back', 'Shoulders', 'Triceps', 'Biceps'],
    equipmentNeeded: ['Bodyweight', 'Household Item'],
    scheduleDay: 'Tuesday & Friday',
    exercises: [
      {
        exerciseId: 'chest-dips',
        targetSets: 4,
        targetReps: '8–12 reps',
        restSeconds: 90,
        notes: 'Between two matching solid counter corners or sturdy chairs'
      },
      {
        exerciseId: 'inverted-table-row',
        targetSets: 4,
        targetReps: '10–12 reps',
        restSeconds: 90,
        notes: 'Feet elevated on a stool for added resistance'
      },
      {
        exerciseId: 'pike-pushup',
        targetSets: 3,
        targetReps: '8–12 reps',
        restSeconds: 90,
        notes: 'Inverted V shape, crown of head to floor'
      },
      {
        exerciseId: 'household-water-jug-hammer-curl',
        targetSets: 3,
        targetReps: '12–15 reps',
        restSeconds: 60,
        notes: 'Two 5L water bottles, slow 3-second negative'
      },
      {
        exerciseId: 'standard-pushup',
        targetSets: 3,
        targetReps: 'Diamond push-up to failure',
        restSeconds: 60,
        notes: 'Hands touching in diamond to fry triceps'
      }
    ]
  },
  {
    id: 'home-lower-body-hypertrophy',
    title: 'Advanced No-Gym Lower Body Hypertrophy',
    description: 'Intense unilateral and eccentric leg training creating high mechanical tension on quads, glutes, and hamstrings without barbell.',
    difficulty: 'Advanced',
    durationMinutes: 45,
    category: 'Home',
    targetMuscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings', 'Calves'],
    equipmentNeeded: ['Bodyweight', 'Household Item'],
    scheduleDay: 'Wednesday & Saturday',
    exercises: [
      {
        exerciseId: 'bulgarian-split-squat',
        targetSets: 4,
        targetReps: '12–15 reps per leg',
        restSeconds: 90,
        notes: 'Wear a backpack packed with books (8–12kg)'
      },
      {
        exerciseId: 'nordic-hamstring-curl',
        targetSets: 4,
        targetReps: '6–8 slow negatives',
        restSeconds: 120,
        notes: 'Ankles anchored under heavy sofa; 4-second descent'
      },
      {
        exerciseId: 'barbell-hip-thrust',
        targetSets: 4,
        targetReps: '15–20 reps per leg',
        restSeconds: 75,
        notes: 'Single-leg hip thrust with upper back against couch'
      },
      {
        exerciseId: 'single-leg-calf-raise',
        targetSets: 4,
        targetReps: '15–20 reps per leg',
        restSeconds: 60,
        notes: 'Stair edge with backpack; 2s pause at bottom'
      }
    ]
  },
  {
    id: 'home-mobility-recovery',
    title: 'Total-Body Joint Mobility & Recovery Protocol',
    description: 'Active recovery routine relieving posture tension, freeing tight hip flexors, decompressing spine, and improving thoracic rotation.',
    difficulty: 'Beginner',
    durationMinutes: 20,
    category: 'Home',
    targetMuscleGroups: ['Mobility', 'Back', 'Hamstrings', 'Glutes'],
    equipmentNeeded: ['Bodyweight'],
    scheduleDay: 'Sunday / Rest Days',
    exercises: [
      {
        exerciseId: 'worlds-greatest-stretch',
        targetSets: 3,
        targetReps: '6 reps per side',
        restSeconds: 45,
        notes: 'Breathe deep in each of the 3 positions'
      },
      {
        exerciseId: 'dead-hangs-farmer-walk',
        targetSets: 3,
        targetReps: '45-second hang',
        restSeconds: 60,
        notes: 'Dead hang on doorframe pull-up bar for spinal decompression'
      }
    ]
  }
];

export const GYM_SAMPLE_PLANS: WorkoutRoutine[] = [
  {
    id: 'gym-push-day',
    title: 'Evidence-Based Push: Chest, Delts & Triceps',
    description: 'High mechanical tension upper body pushing protocol balancing horizontal and vertical pressing with lengthened-range flyes.',
    difficulty: 'Intermediate',
    durationMinutes: 60,
    category: 'Gym',
    targetMuscleGroups: ['Chest', 'Shoulders', 'Triceps'],
    equipmentNeeded: ['Barbell', 'Dumbbell', 'Cable'],
    scheduleDay: 'Push Day (Monday / Thursday)',
    exercises: [
      {
        exerciseId: 'barbell-bench-press',
        targetSets: 4,
        targetReps: '6–8 reps',
        restSeconds: 180,
        notes: 'Primary compound; tight arch and leg drive'
      },
      {
        exerciseId: 'incline-dumbbell-press',
        targetSets: 3,
        targetReps: '8–12 reps',
        restSeconds: 120,
        notes: '30-degree bench angle for upper chest fibers'
      },
      {
        exerciseId: 'overhead-press',
        targetSets: 3,
        targetReps: '8–10 reps',
        restSeconds: 120,
        notes: 'Military stance, full overhead lockout'
      },
      {
        exerciseId: 'dumbbell-lateral-raise',
        targetSets: 4,
        targetReps: '12–15 reps',
        restSeconds: 90,
        notes: 'Strict form in scapular plane'
      },
      {
        exerciseId: 'tricep-rope-pushdown',
        targetSets: 3,
        targetReps: '10–12 reps',
        restSeconds: 90,
        notes: 'Spread rope at bottom with 1-second squeeze'
      }
    ]
  },
  {
    id: 'gym-pull-day',
    title: 'Evidence-Based Pull: Back, Rear Delts & Biceps',
    description: 'Complete posterior pulling stimulus targeting lat width, upper back thickness, and bicep elbow flexors.',
    difficulty: 'Intermediate',
    durationMinutes: 60,
    category: 'Gym',
    targetMuscleGroups: ['Back', 'Biceps', 'Forearms'],
    equipmentNeeded: ['Barbell', 'Bodyweight', 'Dumbbell'],
    scheduleDay: 'Pull Day (Tuesday / Friday)',
    exercises: [
      {
        exerciseId: 'barbell-deadlift',
        targetSets: 3,
        targetReps: '5 reps',
        restSeconds: 180,
        notes: 'Reset each rep from floor; maintain neutral spine'
      },
      {
        exerciseId: 'pull-up-chin-up',
        targetSets: 3,
        targetReps: '6–10 reps',
        restSeconds: 150,
        notes: 'Chest to bar, full dead hang at bottom'
      },
      {
        exerciseId: 'barbell-pendlay-row',
        targetSets: 3,
        targetReps: '8–10 reps',
        restSeconds: 120,
        notes: 'Dead stop from floor, explosive pull'
      },
      {
        exerciseId: 'barbell-bicep-curl',
        targetSets: 3,
        targetReps: '8–12 reps',
        restSeconds: 90,
        notes: 'Zero back swing, 2-second negative'
      },
      {
        exerciseId: 'dead-hangs-farmer-walk',
        targetSets: 3,
        targetReps: '45-second hold',
        restSeconds: 60,
        notes: 'Heavy dumbbell farmer carry or dead hang'
      }
    ]
  },
  {
    id: 'gym-legs-day',
    title: 'Evidence-Based Legs: Quads, Hamstrings & Glutes',
    description: 'High-yield lower body training combining heavy knee extension with lengthened hamstring hip-hinge work.',
    difficulty: 'Advanced',
    durationMinutes: 65,
    category: 'Gym',
    targetMuscleGroups: ['Quadriceps', 'Hamstrings', 'Glutes', 'Calves'],
    equipmentNeeded: ['Barbell', 'Dumbbell'],
    scheduleDay: 'Leg Day (Wednesday / Saturday)',
    exercises: [
      {
        exerciseId: 'barbell-back-squat',
        targetSets: 4,
        targetReps: '6–8 reps',
        restSeconds: 180,
        notes: 'Break parallel; drive through midfoot'
      },
      {
        exerciseId: 'romanian-deadlift',
        targetSets: 3,
        targetReps: '8–10 reps',
        restSeconds: 150,
        notes: 'Deep hamstring stretch; bar touching shins'
      },
      {
        exerciseId: 'bulgarian-split-squat',
        targetSets: 3,
        targetReps: '10–12 reps per leg',
        restSeconds: 90,
        notes: 'Slight forward torso lean for glute recruitment'
      },
      {
        exerciseId: 'barbell-hip-thrust',
        targetSets: 3,
        targetReps: '10–12 reps',
        restSeconds: 120,
        notes: '2-second hold at peak glute lockout'
      },
      {
        exerciseId: 'single-leg-calf-raise',
        targetSets: 4,
        targetReps: '12–15 reps per leg',
        restSeconds: 60,
        notes: 'Straight knee, 2s stretch pause at bottom'
      }
    ]
  }
];
