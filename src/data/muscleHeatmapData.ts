export type MuscleId =
  | 'chest'
  | 'lats'
  | 'traps'
  | 'deltoids'
  | 'biceps'
  | 'triceps'
  | 'abs'
  | 'obliques'
  | 'erectors'
  | 'glutes'
  | 'quads'
  | 'hamstrings'
  | 'calves';

export interface MuscleActivationInfo {
  id: MuscleId;
  name: string;
  latinName: string;
  role: 'primary' | 'secondary' | 'stabilizer';
  emgPercent: number; // 0 to 100
  heatColor: string; // Hex color string
  threeHexColor: number; // Three.js hex number
  contractionType: 'Concentric / Eccentric' | 'Concentric Peak' | 'Isometric Stability';
  functionInExercise: string;
  cue: string;
  bodyRegion: 'anterior' | 'posterior' | 'both';
  cameraAngle: { theta: number; phi: number; radius: number };
}

export interface ExerciseMuscleHeatmap {
  exerciseId: string;
  exerciseName: string;
  primaryTarget: string;
  secondaryTarget: string;
  totalActiveVolume: string;
  kineticChain: string;
  muscles: Record<MuscleId, MuscleActivationInfo>;
}

export function getHeatColorForEMG(emgPercent: number): { hex: string; num: number; label: string } {
  if (emgPercent >= 88) {
    return { hex: '#ef4444', num: 0xef4444, label: 'Primary Agonist (Max Load)' };
  } else if (emgPercent >= 72) {
    return { hex: '#f97316', num: 0xf97316, label: 'Secondary Synergist (High)' };
  } else if (emgPercent >= 52) {
    return { hex: '#eab308', num: 0xeab308, label: 'Active Synergist (Moderate)' };
  } else if (emgPercent >= 35) {
    return { hex: '#10b981', num: 0x10b981, label: 'Joint Stabilizer (Support)' };
  } else {
    return { hex: '#06b6d4', num: 0x06b6d4, label: 'Antagonist / Core Balance' };
  }
}

export const EXERCISE_HEATMAP_DATABASE: Record<string, ExerciseMuscleHeatmap> = {
  'barbell-back-squat': {
    exerciseId: 'barbell-back-squat',
    exerciseName: 'Barbell Back Squat',
    primaryTarget: 'Quadriceps & Gluteus Maximus',
    secondaryTarget: 'Hamstrings, Calves & Erector Spinae',
    totalActiveVolume: 'High (Full Lower Chain + Core)',
    kineticChain: 'Closed Kinetic Chain (CKC)',
    muscles: {
      quads: {
        id: 'quads',
        name: 'Quadriceps Femoris',
        latinName: 'Rectus Femoris, Vastus Lateralis/Medialis',
        role: 'primary',
        emgPercent: 96,
        heatColor: '#ef4444',
        threeHexColor: 0xef4444,
        contractionType: 'Concentric / Eccentric',
        functionInExercise: 'Generates primary knee extension torque out of the bottom hole',
        cue: 'Drive feet straight through floor; knees tracking in plane with 2nd toe',
        bodyRegion: 'anterior',
        cameraAngle: { theta: 0.3, phi: 0.15, radius: 4.2 }
      },
      glutes: {
        id: 'glutes',
        name: 'Gluteus Maximus',
        latinName: 'Gluteus Maximus & Medius',
        role: 'primary',
        emgPercent: 88,
        heatColor: '#f97316',
        threeHexColor: 0xf97316,
        contractionType: 'Concentric / Eccentric',
        functionInExercise: 'Provides powerful hip extension out of deep flexion below parallel',
        cue: 'Squeeze glutes hard through sticking point; lock out hips at top',
        bodyRegion: 'posterior',
        cameraAngle: { theta: Math.PI * 0.85, phi: 0.2, radius: 4.4 }
      },
      erectors: {
        id: 'erectors',
        name: 'Erector Spinae',
        latinName: 'Spinalis, Longissimus, Iliocostalis',
        role: 'secondary',
        emgPercent: 78,
        heatColor: '#f97316',
        threeHexColor: 0xf97316,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Maintains neutral thoracic & lumbar spine against heavy forward shear',
        cue: 'Brace core with diaphragmatic 360-degree intra-abdominal pressure',
        bodyRegion: 'posterior',
        cameraAngle: { theta: Math.PI * 0.95, phi: 0.15, radius: 4.5 }
      },
      hamstrings: {
        id: 'hamstrings',
        name: 'Hamstring Complex',
        latinName: 'Biceps Femoris, Semitendinosus',
        role: 'secondary',
        emgPercent: 64,
        heatColor: '#eab308',
        threeHexColor: 0xeab308,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Co-contracts to stabilize the knee joint and assist hip extension',
        cue: 'Control eccentric descent over 2-3 seconds without bouncing',
        bodyRegion: 'posterior',
        cameraAngle: { theta: Math.PI * 0.75, phi: 0.15, radius: 4.2 }
      },
      abs: {
        id: 'abs',
        name: 'Rectus Abdominis',
        latinName: 'Rectus Abdominis',
        role: 'stabilizer',
        emgPercent: 62,
        heatColor: '#eab308',
        threeHexColor: 0xeab308,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Prevents anterior pelvic tilt and hyperextension under heavy bar load',
        cue: 'Pull ribs down and lock pelvic girdle before initiating descent',
        bodyRegion: 'anterior',
        cameraAngle: { theta: 0, phi: 0.1, radius: 4.0 }
      },
      calves: {
        id: 'calves',
        name: 'Calf Complex',
        latinName: 'Gastrocnemius & Soleus',
        role: 'stabilizer',
        emgPercent: 54,
        heatColor: '#10b981',
        threeHexColor: 0x10b981,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Maintains mid-foot balance and ankle dorsiflexion control',
        cue: 'Maintain tripod foot contact: heel, base of big toe, base of pinky',
        bodyRegion: 'posterior',
        cameraAngle: { theta: 0.4, phi: 0.05, radius: 3.8 }
      },
      obliques: {
        id: 'obliques',
        name: 'External Obliques',
        latinName: 'Musculus obliquus externus',
        role: 'stabilizer',
        emgPercent: 52,
        heatColor: '#10b981',
        threeHexColor: 0x10b981,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Prevents lateral torso sway and asymmetric bar tilt',
        cue: 'Keep chest proud and elbows pinned down into lats',
        bodyRegion: 'anterior',
        cameraAngle: { theta: 0.5, phi: 0.15, radius: 4.2 }
      },
      traps: {
        id: 'traps',
        name: 'Trapezius Complex',
        latinName: 'Trapezius Pars Descendens',
        role: 'stabilizer',
        emgPercent: 48,
        heatColor: '#10b981',
        threeHexColor: 0x10b981,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Forms rigid muscular shelf supporting the barbell across posterior delts',
        cue: 'Retract scapulae tightly to cushion bar placement',
        bodyRegion: 'posterior',
        cameraAngle: { theta: Math.PI, phi: 0.35, radius: 4.0 }
      },
      lats: {
        id: 'lats',
        name: 'Latissimus Dorsi',
        latinName: 'Latissimus Dorsi',
        role: 'stabilizer',
        emgPercent: 46,
        heatColor: '#10b981',
        threeHexColor: 0x10b981,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Pulls barbell down into traps creating whole-body kinetic rigidity',
        cue: 'Imagine bending the bar around your upper back',
        bodyRegion: 'posterior',
        cameraAngle: { theta: Math.PI * 0.8, phi: 0.25, radius: 4.2 }
      },
      deltoids: {
        id: 'deltoids',
        name: 'Deltoid Musculature',
        latinName: 'Deltoideus',
        role: 'stabilizer',
        emgPercent: 28,
        heatColor: '#06b6d4',
        threeHexColor: 0x06b6d4,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Isometrically grips bar in rear shelf position',
        cue: 'Keep hands tight on bar without wrist hyperextension',
        bodyRegion: 'both',
        cameraAngle: { theta: 0.8, phi: 0.25, radius: 4.0 }
      },
      chest: {
        id: 'chest',
        name: 'Pectoralis Major',
        latinName: 'Pectoralis Major',
        role: 'stabilizer',
        emgPercent: 18,
        heatColor: '#06b6d4',
        threeHexColor: 0x06b6d4,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Minimal activation; assists thoracic expansion during deep inhalation',
        cue: 'Take deep belly breath at top of repetition before descent',
        bodyRegion: 'anterior',
        cameraAngle: { theta: 0, phi: 0.2, radius: 4.0 }
      },
      biceps: {
        id: 'biceps',
        name: 'Biceps Brachii',
        latinName: 'Biceps Brachii',
        role: 'stabilizer',
        emgPercent: 20,
        heatColor: '#06b6d4',
        threeHexColor: 0x06b6d4,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Maintains elbow angle during bar grasp',
        cue: 'Firm grip without squeezing wrists inward',
        bodyRegion: 'anterior',
        cameraAngle: { theta: 0.6, phi: 0.2, radius: 3.8 }
      },
      triceps: {
        id: 'triceps',
        name: 'Triceps Brachii',
        latinName: 'Triceps Brachii',
        role: 'stabilizer',
        emgPercent: 15,
        heatColor: '#06b6d4',
        threeHexColor: 0x06b6d4,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Negligible activation during lower body squat pattern',
        cue: 'Relax arm tension and focus neural drive in legs',
        bodyRegion: 'posterior',
        cameraAngle: { theta: Math.PI * 0.7, phi: 0.2, radius: 3.8 }
      }
    }
  },

  'barbell-deadlift': {
    exerciseId: 'barbell-deadlift',
    exerciseName: 'Conventional Barbell Deadlift',
    primaryTarget: 'Glutes, Hamstrings & Erector Spinae',
    secondaryTarget: 'Lats, Trapezius & Core',
    totalActiveVolume: 'Maximal (Entire Posterior Chain)',
    kineticChain: 'Closed Kinetic Chain (CKC)',
    muscles: {
      glutes: {
        id: 'glutes',
        name: 'Gluteus Maximus',
        latinName: 'Gluteus Maximus',
        role: 'primary',
        emgPercent: 96,
        heatColor: '#ef4444',
        threeHexColor: 0xef4444,
        contractionType: 'Concentric / Eccentric',
        functionInExercise: 'Drives maximum terminal hip extension to complete the pull lockout',
        cue: 'Finish with powerful glute squeeze; do not hyperextend lower spine',
        bodyRegion: 'posterior',
        cameraAngle: { theta: Math.PI * 0.85, phi: 0.2, radius: 4.4 }
      },
      erectors: {
        id: 'erectors',
        name: 'Erector Spinae Columns',
        latinName: 'Spinalis, Longissimus, Iliocostalis',
        role: 'primary',
        emgPercent: 94,
        heatColor: '#ef4444',
        threeHexColor: 0xef4444,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Locks spine against catastrophic anterior flexion moments',
        cue: 'Pack lats down and preserve natural lumbar lordosis from floor',
        bodyRegion: 'posterior',
        cameraAngle: { theta: Math.PI, phi: 0.2, radius: 4.4 }
      },
      hamstrings: {
        id: 'hamstrings',
        name: 'Hamstring Complex',
        latinName: 'Biceps Femoris & Semitendinosus',
        role: 'primary',
        emgPercent: 91,
        heatColor: '#ef4444',
        threeHexColor: 0xef4444,
        contractionType: 'Concentric / Eccentric',
        functionInExercise: 'Primary hip hinge motor pulling pelvis back into erect posture',
        cue: 'Feel deep hamstring loading as hips hinge backward before lift',
        bodyRegion: 'posterior',
        cameraAngle: { theta: Math.PI * 0.8, phi: 0.15, radius: 4.2 }
      },
      lats: {
        id: 'lats',
        name: 'Latissimus Dorsi',
        latinName: 'Latissimus Dorsi',
        role: 'secondary',
        emgPercent: 86,
        heatColor: '#f97316',
        threeHexColor: 0xf97316,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Holds barbell tightly pinned to shins and prevents forward bar drift',
        cue: 'Imagine squeezing oranges in armpits throughout entire pull',
        bodyRegion: 'posterior',
        cameraAngle: { theta: Math.PI * 0.75, phi: 0.25, radius: 4.2 }
      },
      traps: {
        id: 'traps',
        name: 'Trapezius & Upper Back',
        latinName: 'Trapezius & Rhomboideus',
        role: 'secondary',
        emgPercent: 84,
        heatColor: '#f97316',
        threeHexColor: 0xf97316,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Prevents shoulder girdle depression under massive gravitational pull',
        cue: 'Keep chest proud; do not shrug shoulders at top lockout',
        bodyRegion: 'posterior',
        cameraAngle: { theta: Math.PI, phi: 0.35, radius: 4.0 }
      },
      abs: {
        id: 'abs',
        name: 'Abdominal Wall',
        latinName: 'Rectus Abdominis',
        role: 'secondary',
        emgPercent: 74,
        heatColor: '#f97316',
        threeHexColor: 0xf97316,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Counteracts spinal shear with 360-degree intra-abdominal pressure',
        cue: 'Deep diaphragmatic brace into lifting belt before break from floor',
        bodyRegion: 'anterior',
        cameraAngle: { theta: 0, phi: 0.15, radius: 4.2 }
      },
      quads: {
        id: 'quads',
        name: 'Quadriceps Femoris',
        latinName: 'Rectus Femoris, Vastus Lateralis',
        role: 'secondary',
        emgPercent: 68,
        heatColor: '#eab308',
        threeHexColor: 0xeab308,
        contractionType: 'Concentric Peak',
        functionInExercise: 'Initiates initial barbell displacement off the floor via leg press drive',
        cue: 'Push floor away rather than pulling barbell with upper back',
        bodyRegion: 'anterior',
        cameraAngle: { theta: 0.3, phi: 0.15, radius: 4.2 }
      },
      obliques: {
        id: 'obliques',
        name: 'External Obliques',
        latinName: 'Musculus obliquus externus',
        role: 'stabilizer',
        emgPercent: 62,
        heatColor: '#eab308',
        threeHexColor: 0xeab308,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Provides rotational stiffness and lateral lumbar protection',
        cue: 'Keep hips and shoulders rising at exact identical rate',
        bodyRegion: 'anterior',
        cameraAngle: { theta: 0.5, phi: 0.15, radius: 4.2 }
      },
      calves: {
        id: 'calves',
        name: 'Calf Complex',
        latinName: 'Gastrocnemius & Soleus',
        role: 'stabilizer',
        emgPercent: 48,
        heatColor: '#10b981',
        threeHexColor: 0x10b981,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Anchors ankles and maintains grounded floor stability',
        cue: 'Weight rooted through middle of foot and heels',
        bodyRegion: 'posterior',
        cameraAngle: { theta: 0.3, phi: 0.05, radius: 3.8 }
      },
      deltoids: {
        id: 'deltoids',
        name: 'Deltoid Musculature',
        latinName: 'Deltoideus',
        role: 'stabilizer',
        emgPercent: 35,
        heatColor: '#10b981',
        threeHexColor: 0x10b981,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Acts as tension cables transmitting pull forces to barbell',
        cue: 'Long arms; think of arms as rigid steel chains',
        bodyRegion: 'both',
        cameraAngle: { theta: 0.8, phi: 0.25, radius: 4.0 }
      },
      biceps: {
        id: 'biceps',
        name: 'Biceps Brachii',
        latinName: 'Biceps Brachii',
        role: 'stabilizer',
        emgPercent: 25,
        heatColor: '#06b6d4',
        threeHexColor: 0x06b6d4,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Tricep engagement keeps elbow locked to prevent bicep tendon tear',
        cue: 'CRITICAL: Never bend elbow or jerk bar; keep arms totally straight',
        bodyRegion: 'anterior',
        cameraAngle: { theta: 0.6, phi: 0.2, radius: 3.8 }
      },
      triceps: {
        id: 'triceps',
        name: 'Triceps Brachii',
        latinName: 'Triceps Brachii',
        role: 'stabilizer',
        emgPercent: 30,
        heatColor: '#06b6d4',
        threeHexColor: 0x06b6d4,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Isometrically locks elbow in full extension during the lift',
        cue: 'Flex triceps before initiating pull to guarantee straight arms',
        bodyRegion: 'posterior',
        cameraAngle: { theta: Math.PI * 0.7, phi: 0.2, radius: 3.8 }
      },
      chest: {
        id: 'chest',
        name: 'Pectoralis Major',
        latinName: 'Pectoralis Major',
        role: 'stabilizer',
        emgPercent: 15,
        heatColor: '#06b6d4',
        threeHexColor: 0x06b6d4,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Minimal engagement during posterior deadlift pull',
        cue: 'Keep chest high and broad throughout lift',
        bodyRegion: 'anterior',
        cameraAngle: { theta: 0, phi: 0.2, radius: 4.0 }
      }
    }
  },

  'barbell-bench-press': {
    exerciseId: 'barbell-bench-press',
    exerciseName: 'Barbell Bench Press',
    primaryTarget: 'Pectoralis Major & Triceps',
    secondaryTarget: 'Anterior Deltoids & Latissimus',
    totalActiveVolume: 'High (Upper Push Chain)',
    kineticChain: 'Open Kinetic Chain (OKC)',
    muscles: {
      chest: {
        id: 'chest',
        name: 'Pectoralis Major',
        latinName: 'Pectoralis Major (Sternal & Clavicular)',
        role: 'primary',
        emgPercent: 98,
        heatColor: '#ef4444',
        threeHexColor: 0xef4444,
        contractionType: 'Concentric / Eccentric',
        functionInExercise: 'Provides powerful horizontal adduction driving barbell off sternum',
        cue: 'Touch sternum with control; press upward and slightly back toward eyes',
        bodyRegion: 'anterior',
        cameraAngle: { theta: 0, phi: 0.35, radius: 4.0 }
      },
      triceps: {
        id: 'triceps',
        name: 'Triceps Brachii',
        latinName: 'Triceps Brachii (Lateral & Long Heads)',
        role: 'primary',
        emgPercent: 88,
        heatColor: '#ef4444',
        threeHexColor: 0xef4444,
        contractionType: 'Concentric Peak',
        functionInExercise: 'Drives complete elbow extension and terminal barbell lockout',
        cue: 'Lock elbows crisply at top without losing shoulder depression',
        bodyRegion: 'posterior',
        cameraAngle: { theta: Math.PI * 0.7, phi: 0.25, radius: 3.8 }
      },
      deltoids: {
        id: 'deltoids',
        name: 'Anterior Deltoid',
        latinName: 'Pars Clavicularis Deltoidei',
        role: 'primary',
        emgPercent: 84,
        heatColor: '#f97316',
        threeHexColor: 0xf97316,
        contractionType: 'Concentric / Eccentric',
        functionInExercise: 'Assists shoulder forward flexion in bottom third of press',
        cue: 'Tuck elbows 45 to 70 degrees to avoid shoulder impingement',
        bodyRegion: 'anterior',
        cameraAngle: { theta: 0.45, phi: 0.3, radius: 4.0 }
      },
      lats: {
        id: 'lats',
        name: 'Latissimus Dorsi',
        latinName: 'Latissimus Dorsi',
        role: 'secondary',
        emgPercent: 58,
        heatColor: '#eab308',
        threeHexColor: 0xeab308,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Creates stable muscular base on bench pad and controls bar descent',
        cue: 'Pull bar down to chest like a reverse lat row',
        bodyRegion: 'posterior',
        cameraAngle: { theta: Math.PI * 0.8, phi: 0.25, radius: 4.2 }
      },
      traps: {
        id: 'traps',
        name: 'Rhomboids & Traps',
        latinName: 'Rhomboideus & Trapezius',
        role: 'secondary',
        emgPercent: 54,
        heatColor: '#10b981',
        threeHexColor: 0x10b981,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Scapulae tightly retracted and pinned into bench throughout every rep',
        cue: 'Never lose scapular retraction at top lockout',
        bodyRegion: 'posterior',
        cameraAngle: { theta: Math.PI, phi: 0.35, radius: 4.0 }
      },
      abs: {
        id: 'abs',
        name: 'Core Abdominals',
        latinName: 'Rectus Abdominis',
        role: 'stabilizer',
        emgPercent: 44,
        heatColor: '#10b981',
        threeHexColor: 0x10b981,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Transmits leg drive force through pelvic arch to upper thoracic spine',
        cue: 'Maintain firm ribcage arch without lifting glutes off bench',
        bodyRegion: 'anterior',
        cameraAngle: { theta: 0, phi: 0.2, radius: 4.0 }
      },
      quads: {
        id: 'quads',
        name: 'Quadriceps (Leg Drive)',
        latinName: 'Quadriceps Femoris',
        role: 'stabilizer',
        emgPercent: 42,
        heatColor: '#10b981',
        threeHexColor: 0x10b981,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Constant backward floor pressure generating whole-body stability',
        cue: 'Push toes forward in shoes to wedge upper traps into bench pad',
        bodyRegion: 'anterior',
        cameraAngle: { theta: 0.3, phi: 0.15, radius: 4.2 }
      },
      glutes: {
        id: 'glutes',
        name: 'Gluteus Maximus',
        latinName: 'Gluteus Maximus',
        role: 'stabilizer',
        emgPercent: 38,
        heatColor: '#10b981',
        threeHexColor: 0x10b981,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Anchors hips to bench pad; must never lift during pressing phase',
        cue: 'Keep glutes in continuous contact with bench leather',
        bodyRegion: 'posterior',
        cameraAngle: { theta: Math.PI * 0.85, phi: 0.2, radius: 4.4 }
      },
      obliques: {
        id: 'obliques',
        name: 'External Obliques',
        latinName: 'Musculus obliquus externus',
        role: 'stabilizer',
        emgPercent: 34,
        heatColor: '#06b6d4',
        threeHexColor: 0x06b6d4,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Prevents lateral bar tilt and uneven pressing',
        cue: 'Squeeze bar symmetrically with white-knuckle grip',
        bodyRegion: 'anterior',
        cameraAngle: { theta: 0.5, phi: 0.2, radius: 4.0 }
      },
      erectors: {
        id: 'erectors',
        name: 'Erector Spinae',
        latinName: 'Erector Spinae',
        role: 'stabilizer',
        emgPercent: 46,
        heatColor: '#10b981',
        threeHexColor: 0x10b981,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Maintains thoracic arch to optimize pectoral fiber alignment',
        cue: 'Keep chest high and upper back arched tightly',
        bodyRegion: 'posterior',
        cameraAngle: { theta: Math.PI, phi: 0.2, radius: 4.4 }
      },
      biceps: {
        id: 'biceps',
        name: 'Biceps Brachii',
        latinName: 'Biceps Brachii',
        role: 'stabilizer',
        emgPercent: 18,
        heatColor: '#06b6d4',
        threeHexColor: 0x06b6d4,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Dynamic stabilizer resisting rapid eccentric deceleration',
        cue: 'Controlled 2-second eccentric drop to sternum',
        bodyRegion: 'anterior',
        cameraAngle: { theta: 0.6, phi: 0.2, radius: 3.8 }
      },
      hamstrings: {
        id: 'hamstrings',
        name: 'Hamstrings',
        latinName: 'Hamstring Complex',
        role: 'stabilizer',
        emgPercent: 16,
        heatColor: '#06b6d4',
        threeHexColor: 0x06b6d4,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Minimal engagement during supine pressing',
        cue: 'Keep feet flat on floor',
        bodyRegion: 'posterior',
        cameraAngle: { theta: Math.PI * 0.75, phi: 0.15, radius: 4.2 }
      },
      calves: {
        id: 'calves',
        name: 'Calves',
        latinName: 'Gastrocnemius',
        role: 'stabilizer',
        emgPercent: 15,
        heatColor: '#06b6d4',
        threeHexColor: 0x06b6d4,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Grounding floor anchor',
        cue: 'Solid heel contact with floor',
        bodyRegion: 'posterior',
        cameraAngle: { theta: 0.3, phi: 0.05, radius: 3.8 }
      }
    }
  },

  'overhead-press': {
    exerciseId: 'overhead-press',
    exerciseName: 'Overhead Barbell Press',
    primaryTarget: 'Anterior & Lateral Deltoids',
    secondaryTarget: 'Triceps, Upper Trapezius & Core',
    totalActiveVolume: 'High (Vertical Push Chain)',
    kineticChain: 'Closed Kinetic Chain (CKC - Standing)',
    muscles: {
      deltoids: {
        id: 'deltoids',
        name: 'Deltoid Musculature',
        latinName: 'Deltoideus (Anterior & Lateral)',
        role: 'primary',
        emgPercent: 97,
        heatColor: '#ef4444',
        threeHexColor: 0xef4444,
        contractionType: 'Concentric / Eccentric',
        functionInExercise: 'Primary engine of upward glenohumeral flexion and abduction',
        cue: 'Press bar in straight vertical trajectory skimming past chin and nose',
        bodyRegion: 'both',
        cameraAngle: { theta: 0.45, phi: 0.25, radius: 4.0 }
      },
      triceps: {
        id: 'triceps',
        name: 'Triceps Brachii',
        latinName: 'Triceps Brachii',
        role: 'primary',
        emgPercent: 89,
        heatColor: '#ef4444',
        threeHexColor: 0xef4444,
        contractionType: 'Concentric Peak',
        functionInExercise: 'Locks out elbows in full overhead stack over shoulders and midfoot',
        cue: 'Punch ceiling at peak lockout; shrug shoulders up to support bar',
        bodyRegion: 'posterior',
        cameraAngle: { theta: Math.PI * 0.7, phi: 0.3, radius: 3.8 }
      },
      traps: {
        id: 'traps',
        name: 'Upper Trapezius',
        latinName: 'Trapezius Pars Superior',
        role: 'secondary',
        emgPercent: 82,
        heatColor: '#f97316',
        threeHexColor: 0xf97316,
        contractionType: 'Concentric Peak',
        functionInExercise: 'Upwardly rotates scapula to safely accommodate overhead lockout',
        cue: 'Shrug up into bar at top to clear subacromial space',
        bodyRegion: 'posterior',
        cameraAngle: { theta: Math.PI, phi: 0.35, radius: 4.0 }
      },
      abs: {
        id: 'abs',
        name: 'Core Abdominals',
        latinName: 'Rectus Abdominis',
        role: 'secondary',
        emgPercent: 80,
        heatColor: '#f97316',
        threeHexColor: 0xf97316,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Crucial anti-extension brace preventing severe lumbar hyperextension',
        cue: 'Pull ribs down toward belt; never lean back excessively',
        bodyRegion: 'anterior',
        cameraAngle: { theta: 0, phi: 0.2, radius: 4.0 }
      },
      glutes: {
        id: 'glutes',
        name: 'Gluteus Maximus',
        latinName: 'Gluteus Maximus',
        role: 'secondary',
        emgPercent: 72,
        heatColor: '#eab308',
        threeHexColor: 0xeab308,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Locks pelvis into posterior tilt to build rock-solid pillar foundation',
        cue: 'Squeeze glutes with 100% force before pressing bar off clavicles',
        bodyRegion: 'posterior',
        cameraAngle: { theta: Math.PI * 0.85, phi: 0.2, radius: 4.4 }
      },
      chest: {
        id: 'chest',
        name: 'Upper Pectoralis',
        latinName: 'Pectoralis Major Pars Clavicularis',
        role: 'secondary',
        emgPercent: 60,
        heatColor: '#eab308',
        threeHexColor: 0xeab308,
        contractionType: 'Concentric / Eccentric',
        functionInExercise: 'Assists first 4 inches of upward bar travel off front rack position',
        cue: 'Chest proud, chin tucked back as bar ascends',
        bodyRegion: 'anterior',
        cameraAngle: { theta: 0, phi: 0.3, radius: 4.0 }
      },
      erectors: {
        id: 'erectors',
        name: 'Erector Spinae',
        latinName: 'Erector Spinae',
        role: 'stabilizer',
        emgPercent: 62,
        heatColor: '#eab308',
        threeHexColor: 0xeab308,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Spinal pillar stabilization under overhead compression load',
        cue: 'Maintain rigid torso from head to heels',
        bodyRegion: 'posterior',
        cameraAngle: { theta: Math.PI, phi: 0.2, radius: 4.4 }
      },
      obliques: {
        id: 'obliques',
        name: 'External Obliques',
        latinName: 'Musculus obliquus externus',
        role: 'stabilizer',
        emgPercent: 55,
        heatColor: '#10b981',
        threeHexColor: 0x10b981,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Lateral torso rigidity and rotational stabilization',
        cue: 'Brace sides like preparing for a body punch',
        bodyRegion: 'anterior',
        cameraAngle: { theta: 0.5, phi: 0.2, radius: 4.0 }
      },
      lats: {
        id: 'lats',
        name: 'Latissimus Dorsi',
        latinName: 'Latissimus Dorsi',
        role: 'stabilizer',
        emgPercent: 44,
        heatColor: '#10b981',
        threeHexColor: 0x10b981,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Provides front rack launch pad for elbows',
        cue: 'Elbows slightly forward of barbell in front rack',
        bodyRegion: 'posterior',
        cameraAngle: { theta: Math.PI * 0.8, phi: 0.25, radius: 4.2 }
      },
      quads: {
        id: 'quads',
        name: 'Quadriceps',
        latinName: 'Quadriceps Femoris',
        role: 'stabilizer',
        emgPercent: 40,
        heatColor: '#10b981',
        threeHexColor: 0x10b981,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Locks knees in strict extension (strict press, no knee dip)',
        cue: 'Knees locked like steel columns; zero push-press dip',
        bodyRegion: 'anterior',
        cameraAngle: { theta: 0.3, phi: 0.15, radius: 4.2 }
      },
      calves: {
        id: 'calves',
        name: 'Calf Complex',
        latinName: 'Gastrocnemius & Soleus',
        role: 'stabilizer',
        emgPercent: 32,
        heatColor: '#06b6d4',
        threeHexColor: 0x06b6d4,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Grounding balance support',
        cue: 'Weight centered over midfoot',
        bodyRegion: 'posterior',
        cameraAngle: { theta: 0.3, phi: 0.05, radius: 3.8 }
      },
      biceps: {
        id: 'biceps',
        name: 'Biceps Brachii',
        latinName: 'Biceps Brachii',
        role: 'stabilizer',
        emgPercent: 22,
        heatColor: '#06b6d4',
        threeHexColor: 0x06b6d4,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Antagonist to elbow extension',
        cue: 'Firm grip without elbow bend',
        bodyRegion: 'anterior',
        cameraAngle: { theta: 0.6, phi: 0.2, radius: 3.8 }
      },
      hamstrings: {
        id: 'hamstrings',
        name: 'Hamstrings',
        latinName: 'Hamstring Complex',
        role: 'stabilizer',
        emgPercent: 25,
        heatColor: '#06b6d4',
        threeHexColor: 0x06b6d4,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Pelvic stabilization with glutes',
        cue: 'Solid posterior engagement',
        bodyRegion: 'posterior',
        cameraAngle: { theta: Math.PI * 0.75, phi: 0.15, radius: 4.2 }
      }
    }
  },

  'pull-up': {
    exerciseId: 'pull-up',
    exerciseName: 'Strict Bodyweight Pull-Up',
    primaryTarget: 'Latissimus Dorsi & Biceps Brachii',
    secondaryTarget: 'Rhomboids, Middle Trapezius & Core',
    totalActiveVolume: 'High (Vertical Pull Chain)',
    kineticChain: 'Closed Kinetic Chain (CKC - Suspended)',
    muscles: {
      lats: {
        id: 'lats',
        name: 'Latissimus Dorsi',
        latinName: 'Latissimus Dorsi',
        role: 'primary',
        emgPercent: 98,
        heatColor: '#ef4444',
        threeHexColor: 0xef4444,
        contractionType: 'Concentric / Eccentric',
        functionInExercise: 'Powerful shoulder adduction pulling torso vertically toward overhead bar',
        cue: 'Pull elbows down toward back pockets; lead with proud chest',
        bodyRegion: 'posterior',
        cameraAngle: { theta: Math.PI * 0.8, phi: 0.25, radius: 4.2 }
      },
      biceps: {
        id: 'biceps',
        name: 'Biceps Brachii & Brachialis',
        latinName: 'Biceps Brachii & Brachialis',
        role: 'primary',
        emgPercent: 88,
        heatColor: '#ef4444',
        threeHexColor: 0xef4444,
        contractionType: 'Concentric Peak',
        functionInExercise: 'Primary elbow flexion pulling body to clear chin over bar',
        cue: 'Full extension at dead hang, full flexion with chin over bar',
        bodyRegion: 'anterior',
        cameraAngle: { theta: 0.6, phi: 0.2, radius: 3.8 }
      },
      traps: {
        id: 'traps',
        name: 'Middle & Lower Trapezius',
        latinName: 'Trapezius & Rhomboideus',
        role: 'secondary',
        emgPercent: 84,
        heatColor: '#f97316',
        threeHexColor: 0xf97316,
        contractionType: 'Concentric Peak',
        functionInExercise: 'Scapular depression and retraction initiating first 3 inches of pull',
        cue: 'Depress shoulder blades before bending elbows (active hang)',
        bodyRegion: 'posterior',
        cameraAngle: { theta: Math.PI, phi: 0.35, radius: 4.0 }
      },
      abs: {
        id: 'abs',
        name: 'Core Abdominals',
        latinName: 'Rectus Abdominis',
        role: 'secondary',
        emgPercent: 72,
        heatColor: '#eab308',
        threeHexColor: 0xeab308,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Maintains strict hollow-body posture and halts leg swinging/kipping',
        cue: 'Squeeze abs and legs together slightly in front of bar line',
        bodyRegion: 'anterior',
        cameraAngle: { theta: 0, phi: 0.2, radius: 4.0 }
      },
      deltoids: {
        id: 'deltoids',
        name: 'Posterior Deltoid',
        latinName: 'Pars Spinalis Deltoidei',
        role: 'secondary',
        emgPercent: 70,
        heatColor: '#eab308',
        threeHexColor: 0xeab308,
        contractionType: 'Concentric / Eccentric',
        functionInExercise: 'Assists shoulder horizontal abduction and extension at top',
        cue: 'Drive elbows back at top of rep',
        bodyRegion: 'both',
        cameraAngle: { theta: 0.8, phi: 0.25, radius: 4.0 }
      },
      chest: {
        id: 'chest',
        name: 'Pectoralis Major & Minor',
        latinName: 'Pectoralis Major / Minor',
        role: 'stabilizer',
        emgPercent: 42,
        heatColor: '#10b981',
        threeHexColor: 0x10b981,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Assists shoulder adduction and ribcage stability',
        cue: 'Touch chest to bar at peak contraction',
        bodyRegion: 'anterior',
        cameraAngle: { theta: 0, phi: 0.25, radius: 4.0 }
      },
      obliques: {
        id: 'obliques',
        name: 'External Obliques',
        latinName: 'Musculus obliquus externus',
        role: 'stabilizer',
        emgPercent: 48,
        heatColor: '#10b981',
        threeHexColor: 0x10b981,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Prevents body twist and asymmetry',
        cue: 'Pull symmetrically with both arms',
        bodyRegion: 'anterior',
        cameraAngle: { theta: 0.5, phi: 0.2, radius: 4.0 }
      },
      erectors: {
        id: 'erectors',
        name: 'Erector Spinae',
        latinName: 'Erector Spinae',
        role: 'stabilizer',
        emgPercent: 45,
        heatColor: '#10b981',
        threeHexColor: 0x10b981,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Supports upper back thoracic extension',
        cue: 'Slight thoracic arch without lumbar hyperextension',
        bodyRegion: 'posterior',
        cameraAngle: { theta: Math.PI, phi: 0.2, radius: 4.4 }
      },
      glutes: {
        id: 'glutes',
        name: 'Glutes',
        latinName: 'Gluteus Maximus',
        role: 'stabilizer',
        emgPercent: 35,
        heatColor: '#10b981',
        threeHexColor: 0x10b981,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Locks legs in hollow body line',
        cue: 'Squeeze glutes and point toes down',
        bodyRegion: 'posterior',
        cameraAngle: { theta: Math.PI * 0.85, phi: 0.2, radius: 4.4 }
      },
      triceps: {
        id: 'triceps',
        name: 'Triceps Long Head',
        latinName: 'Caput Longum Tricipitis',
        role: 'stabilizer',
        emgPercent: 30,
        heatColor: '#06b6d4',
        threeHexColor: 0x06b6d4,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Long head assists shoulder adduction',
        cue: 'Keep elbows tucked',
        bodyRegion: 'posterior',
        cameraAngle: { theta: Math.PI * 0.7, phi: 0.2, radius: 3.8 }
      },
      quads: {
        id: 'quads',
        name: 'Quads',
        latinName: 'Quadriceps',
        role: 'stabilizer',
        emgPercent: 25,
        heatColor: '#06b6d4',
        threeHexColor: 0x06b6d4,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Isometric knee lock in hollow body',
        cue: 'Legs straight together',
        bodyRegion: 'anterior',
        cameraAngle: { theta: 0.3, phi: 0.15, radius: 4.2 }
      },
      hamstrings: {
        id: 'hamstrings',
        name: 'Hamstrings',
        latinName: 'Hamstrings',
        role: 'stabilizer',
        emgPercent: 20,
        heatColor: '#06b6d4',
        threeHexColor: 0x06b6d4,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Stabilizes lower extremities',
        cue: 'No kicking or leg flailing',
        bodyRegion: 'posterior',
        cameraAngle: { theta: Math.PI * 0.75, phi: 0.15, radius: 4.2 }
      },
      calves: {
        id: 'calves',
        name: 'Calves',
        latinName: 'Gastrocnemius',
        role: 'stabilizer',
        emgPercent: 15,
        heatColor: '#06b6d4',
        threeHexColor: 0x06b6d4,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Plantarflexion toe point',
        cue: 'Point toes like a gymnast',
        bodyRegion: 'posterior',
        cameraAngle: { theta: 0.3, phi: 0.05, radius: 3.8 }
      }
    }
  },

  'barbell-bicep-curl': {
    exerciseId: 'barbell-bicep-curl',
    exerciseName: 'Standing Barbell Bicep Curl',
    primaryTarget: 'Biceps Brachii & Brachialis',
    secondaryTarget: 'Forearms & Core Stabilizers',
    totalActiveVolume: 'Moderate (Arm Isolation)',
    kineticChain: 'Open Kinetic Chain (OKC)',
    muscles: {
      biceps: {
        id: 'biceps',
        name: 'Biceps Brachii',
        latinName: 'Biceps Brachii (Short & Long Heads)',
        role: 'primary',
        emgPercent: 98,
        heatColor: '#ef4444',
        threeHexColor: 0xef4444,
        contractionType: 'Concentric / Eccentric',
        functionInExercise: 'Isolated elbow flexion and forearm supination under continuous tension',
        cue: 'Keep elbows fixed at sides; squeeze biceps for full 1-sec peak contraction',
        bodyRegion: 'anterior',
        cameraAngle: { theta: 0.45, phi: 0.2, radius: 3.8 }
      },
      deltoids: {
        id: 'deltoids',
        name: 'Anterior Deltoid',
        latinName: 'Pars Clavicularis Deltoidei',
        role: 'secondary',
        emgPercent: 48,
        heatColor: '#10b981',
        threeHexColor: 0x10b981,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Holds upper arm in stable vertical orientation without swinging forward',
        cue: 'Do not swing shoulders forward to hoist barbell upward',
        bodyRegion: 'both',
        cameraAngle: { theta: 0.8, phi: 0.25, radius: 4.0 }
      },
      abs: {
        id: 'abs',
        name: 'Core Abdominals',
        latinName: 'Rectus Abdominis',
        role: 'stabilizer',
        emgPercent: 55,
        heatColor: '#10b981',
        threeHexColor: 0x10b981,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Prevents torso sway and hip thrust cheating',
        cue: 'Stand tall with core braced and glutes locked',
        bodyRegion: 'anterior',
        cameraAngle: { theta: 0, phi: 0.2, radius: 4.0 }
      },
      erectors: {
        id: 'erectors',
        name: 'Erector Spinae',
        latinName: 'Erector Spinae',
        role: 'stabilizer',
        emgPercent: 52,
        heatColor: '#10b981',
        threeHexColor: 0x10b981,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Resists forward gravitational pull of barbell',
        cue: 'Zero backward spinal rocking during curl ascension',
        bodyRegion: 'posterior',
        cameraAngle: { theta: Math.PI, phi: 0.2, radius: 4.4 }
      },
      traps: {
        id: 'traps',
        name: 'Trapezius',
        latinName: 'Trapezius',
        role: 'stabilizer',
        emgPercent: 38,
        heatColor: '#10b981',
        threeHexColor: 0x10b981,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Scapular retraction holding shoulders down',
        cue: 'Shoulders rolled back and down',
        bodyRegion: 'posterior',
        cameraAngle: { theta: Math.PI, phi: 0.35, radius: 4.0 }
      },
      triceps: {
        id: 'triceps',
        name: 'Triceps Brachii',
        latinName: 'Triceps Brachii',
        role: 'stabilizer',
        emgPercent: 22,
        heatColor: '#06b6d4',
        threeHexColor: 0x06b6d4,
        contractionType: 'Concentric Peak',
        functionInExercise: 'Antagonist muscle; contracts at bottom to ensure full bicep stretch',
        cue: 'Flex triceps at bottom of every rep for full range of motion',
        bodyRegion: 'posterior',
        cameraAngle: { theta: Math.PI * 0.7, phi: 0.2, radius: 3.8 }
      },
      glutes: {
        id: 'glutes',
        name: 'Gluteus Maximus',
        latinName: 'Gluteus Maximus',
        role: 'stabilizer',
        emgPercent: 40,
        heatColor: '#10b981',
        threeHexColor: 0x10b981,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Prevents pelvic cheating and hip forward drive',
        cue: 'Lock glutes to anchor hips',
        bodyRegion: 'posterior',
        cameraAngle: { theta: Math.PI * 0.85, phi: 0.2, radius: 4.4 }
      },
      quads: {
        id: 'quads',
        name: 'Quadriceps',
        latinName: 'Quadriceps',
        role: 'stabilizer',
        emgPercent: 30,
        heatColor: '#06b6d4',
        threeHexColor: 0x06b6d4,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Standing knee stability',
        cue: 'Soft knee bend without bouncing',
        bodyRegion: 'anterior',
        cameraAngle: { theta: 0.3, phi: 0.15, radius: 4.2 }
      },
      lats: {
        id: 'lats',
        name: 'Latissimus Dorsi',
        latinName: 'Latissimus Dorsi',
        role: 'stabilizer',
        emgPercent: 25,
        heatColor: '#06b6d4',
        threeHexColor: 0x06b6d4,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Stabilizes upper arm against ribcage',
        cue: 'Keep elbows tucked',
        bodyRegion: 'posterior',
        cameraAngle: { theta: Math.PI * 0.8, phi: 0.25, radius: 4.2 }
      },
      chest: {
        id: 'chest',
        name: 'Chest',
        latinName: 'Pectoralis Major',
        role: 'stabilizer',
        emgPercent: 15,
        heatColor: '#06b6d4',
        threeHexColor: 0x06b6d4,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Negligible activation during curl',
        cue: 'Keep chest tall',
        bodyRegion: 'anterior',
        cameraAngle: { theta: 0, phi: 0.2, radius: 4.0 }
      },
      obliques: {
        id: 'obliques',
        name: 'Obliques',
        latinName: 'Obliquus Externus',
        role: 'stabilizer',
        emgPercent: 32,
        heatColor: '#06b6d4',
        threeHexColor: 0x06b6d4,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Lateral stability',
        cue: 'Symmetrical grip',
        bodyRegion: 'anterior',
        cameraAngle: { theta: 0.5, phi: 0.2, radius: 4.0 }
      },
      hamstrings: {
        id: 'hamstrings',
        name: 'Hamstrings',
        latinName: 'Hamstrings',
        role: 'stabilizer',
        emgPercent: 20,
        heatColor: '#06b6d4',
        threeHexColor: 0x06b6d4,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Standing balance',
        cue: 'Neutral stance',
        bodyRegion: 'posterior',
        cameraAngle: { theta: Math.PI * 0.75, phi: 0.15, radius: 4.2 }
      },
      calves: {
        id: 'calves',
        name: 'Calves',
        latinName: 'Gastrocnemius',
        role: 'stabilizer',
        emgPercent: 18,
        heatColor: '#06b6d4',
        threeHexColor: 0x06b6d4,
        contractionType: 'Isometric Stability',
        functionInExercise: 'Foot tripod contact',
        cue: 'Solid base',
        bodyRegion: 'posterior',
        cameraAngle: { theta: 0.3, phi: 0.05, radius: 3.8 }
      }
    }
  }
};

/**
 * Helper to fetch muscle heatmap data for any exercise, with fuzzy alias support.
 */
export function getExerciseMuscleHeatmap(exerciseId: string): ExerciseMuscleHeatmap {
  if (EXERCISE_HEATMAP_DATABASE[exerciseId]) {
    return EXERCISE_HEATMAP_DATABASE[exerciseId];
  }
  const idLower = exerciseId.toLowerCase();
  if (idLower.includes('squat')) return EXERCISE_HEATMAP_DATABASE['barbell-back-squat'];
  if (idLower.includes('deadlift')) return EXERCISE_HEATMAP_DATABASE['barbell-deadlift'];
  if (idLower.includes('bench') || idLower.includes('pushup') || idLower.includes('push-up'))
    return EXERCISE_HEATMAP_DATABASE['barbell-bench-press'];
  if (idLower.includes('press')) return EXERCISE_HEATMAP_DATABASE['overhead-press'];
  if (idLower.includes('pull') || idLower.includes('chin')) return EXERCISE_HEATMAP_DATABASE['pull-up'];
  if (idLower.includes('curl')) return EXERCISE_HEATMAP_DATABASE['barbell-bicep-curl'];
  return EXERCISE_HEATMAP_DATABASE['barbell-back-squat'];
}
