import { Exercise } from '../types';

export const EXERCISES_DATABASE: Exercise[] = [
  // --- CHEST ---
  {
    id: 'barbell-bench-press',
    name: 'Barbell Bench Press',
    shortSummary: 'The gold standard compound exercise for pectoral hypertrophy and upper body pushing strength.',
    targetMuscles: 'Pectoralis Major (Sternal & Clavicular), Anterior Deltoid, Triceps Brachii',
    primaryMuscles: ['Chest'],
    secondaryMuscles: ['Shoulders', 'Triceps'],
    equipment: ['Barbell'],
    difficulty: 'Intermediate',
    category: 'Gym',
    startingPosition: 'Lie supine on the flat bench with eyes directly below the racked barbell. Plant feet flat on the floor, retract and depress your scapulae into the bench, maintain a natural lumbar arch, and grip the bar slightly wider than shoulder-width with a full overhand thumb-around grip.',
    executionSteps: [
      'Unrack the barbell with extended elbows and bring it directly over your mid-chest joints with a locked wrist position.',
      'Take a deep diaphragmatic breath, brace your core, and lower the bar under control in an arced trajectory toward the lower sternum.',
      'Tuck elbows at roughly 45–70 degrees relative to your torso (avoid flaring out at 90 degrees to protect the subacromial space).',
      'Lightly touch or pause at the chest without bouncing off the rib cage.',
      'Drive aggressively upward and slightly back toward your eye-line while driving feet firmly into the floor (leg drive), exhaling past the sticking point.'
    ],
    postureCues: [
      'Scapulae tightly pinched together and depressed throughout the entire set.',
      'Glutes must remain firmly glued to the bench at all times.',
      'Wrists stacked vertically over the forearms; do not let the wrists hyperextend backward.',
      'Feet pushed forward against the floor to generate isometric leg drive without lifting hips.'
    ],
    breathingPattern: 'Inhale deeply and hold intra-abdominal pressure (Valsalva) on the eccentric descent; exhale forcefully on the concentric push past sticking point.',
    recommendedSetsReps: {
      hypertrophy: '3–4 sets of 8–12 reps @ RPE 7–9 (60–75% 1RM)',
      strength: '4–5 sets of 3–6 reps @ RPE 8–9.5 (80–90% 1RM)',
      endurance: '3 sets of 15–20 reps with controlled 3-second eccentric tempo'
    },
    commonMistakes: [
      'Bouncing the barbell violently off the sternum using sternal elasticity instead of muscular tension.',
      'Flaring elbows out at a 90-degree angle to the torso, which induces impingement on the rotator cuff.',
      'Lifting glutes off the bench to manufacture leverage.'
    ],
    safetyPrecautions: [
      'Always use a competent spotter or adjust safety pins inside a power cage.',
      'Never use a "suicide" thumbless grip with heavy barbell loads.',
      'Warm up the rotator cuff (external rotations) and pectorals with progressive pyramid sets.'
    ],
    easierVariation: 'Dumbbell Flat Press or Incline Machine Chest Press',
    harderVariation: 'Paused 2-second Deficit Spoto Press or Tempo 4-1-1 Bench Press',
    alternatives: ['Dumbbell Bench Press', 'Weighted Dips', 'Push-ups'],
    guidanceByLevel: {
      beginner: 'Master scapular retraction and bar path using an empty 20kg barbell before loading bumper plates.',
      intermediate: 'Implement planned progressive overload, track volume (12-16 weekly chest sets), and optimize leg drive.',
      advanced: 'Incorporate paused sets, pin presses, and autoregulated RPE training with micro-loading.'
    },
    biomechanicalFocus: 'Horizontal shoulder adduction and elbow extension. Peak mechanical tension on sternal head in mid-to-shortened range.',
    has3DModel: true,
    modelType: 'bench',
    vectorVisualType: 'bench-press'
  },
  {
    id: 'incline-dumbbell-press',
    name: 'Incline Dumbbell Press',
    shortSummary: 'Premier exercise isolating the clavicular (upper) head of the pectoralis major with superior rotational freedom.',
    targetMuscles: 'Pectoralis Major (Clavicular Head), Anterior Deltoid, Triceps Brachii',
    primaryMuscles: ['Chest'],
    secondaryMuscles: ['Shoulders', 'Triceps'],
    equipment: ['Dumbbell'],
    difficulty: 'Intermediate',
    category: 'Gym',
    startingPosition: 'Set an adjustable bench to an incline of 30 to 45 degrees. Sit with dumbbells resting on your thighs. Kick knees up one at a time to hoist dumbbells into starting position at shoulder level, retracting shoulder blades firmly into padding.',
    executionSteps: [
      'Position dumbbells at 45-degree angle in hands with palms angled slightly inward (semi-pronated).',
      'Inhale and lower the dumbbells smoothly until your upper arms reach or break parallel with your torso.',
      'Feel a profound stretch across the upper pectorals without letting the shoulders roll forward.',
      'Press upward in a slight triangle arc toward the ceiling, keeping dumbbells shoulder-width at the apex without clanging them together.'
    ],
    postureCues: [
      'Maintain stable tripod foot placement on the ground.',
      'Keep chest elevated and rib cage expanded throughout the set.',
      'Do not allow shoulders to roll forward off the bench at the bottom stretch.'
    ],
    breathingPattern: 'Inhale during descent into the deep pectoral stretch; exhale smoothly during the upward press.',
    recommendedSetsReps: {
      hypertrophy: '3–4 sets of 8–12 reps with 2-second eccentric control',
      strength: '3–4 sets of 6–8 reps',
      endurance: '3 sets of 12–15 reps'
    },
    commonMistakes: [
      'Setting bench angle too high (>50 degrees), which shifts predominant tension to the anterior deltoids.',
      'Smashing dumbbells together at top, removing tension from the chest muscles.',
      'Cutting depth short to lift heavier weight than pectorals can handle.'
    ],
    safetyPrecautions: [
      'Keep wrist joints strictly neutral above elbows; do not allow outward drifting.',
      'Drop weights safely to the floor if experiencing shoulder discomfort; do not twist torso.'
    ],
    easierVariation: 'Incline Machine Chest Press or Incline Push-Up with hands elevated',
    harderVariation: 'Low-incline Dumbbell Press with 3-second pause at bottom stretch',
    alternatives: ['Incline Barbell Press', 'Low-to-High Cable Flye'],
    guidanceByLevel: {
      beginner: 'Choose a 30-degree incline to target upper chest without overworking front deltoids.',
      intermediate: 'Focus on full active range of motion and a controlled 2-3 second descent.',
      advanced: 'Use dumbbells with slow 4-second negatives to maximize mechanical tension.'
    },
    biomechanicalFocus: 'Shoulder flexion with horizontal adduction, maximizing activation of the clavicular pectoral fibers.',
    has3DModel: true,
    modelType: 'bench',
    vectorVisualType: 'incline-db-press'
  },
  {
    id: 'standard-pushup',
    name: 'Push-Up (Standard & Deficit)',
    shortSummary: 'Foundational closed-chain calisthenic movement building pectoral, tricep, and serratus anterior strength anywhere.',
    targetMuscles: 'Pectoralis Major, Triceps Brachii, Anterior Deltoid, Core, Serratus Anterior',
    primaryMuscles: ['Chest'],
    secondaryMuscles: ['Triceps', 'Shoulders', 'Abdominals'],
    equipment: ['Bodyweight'],
    difficulty: 'Beginner',
    category: 'Both',
    startingPosition: 'Place hands slightly wider than shoulder-width apart on the floor with fingers spread. Extend legs back so body forms a rigid straight line from heels to crown of head. Squeeze glutes and draw navel to spine.',
    executionSteps: [
      'Lower torso by bending elbows at roughly a 45-degree arrow shape relative to torso.',
      'Descend until chest is 1–2 inches from the floor or books (if performing deficit).',
      'Pause briefly in the loaded stretch position while holding total-body isometric tension.',
      'Press the floor away aggressively, finishing with a slight protraction of the shoulder blades at the apex (push-up plus).'
    ],
    postureCues: [
      'Maintain unbroken plank alignment; do not let hips sag or hike into a pike.',
      'Tuck chin slightly to keep cervical spine neutral; do not crane neck down.',
      'Engage quads and glutes to turn movement into an active full-body stability drill.'
    ],
    breathingPattern: 'Inhale while lowering toward the ground; exhale forcefully as you push up.',
    recommendedSetsReps: {
      hypertrophy: '3–4 sets of 12–20 reps (or to 1–2 reps in reserve)',
      strength: '3–4 sets of 8–12 reps with elevated feet or weighted backpack',
      endurance: '3 sets of 20–30+ unbroken reps'
    },
    commonMistakes: [
      'Sagging lumbar spine from unengaged deep abdominal musculature.',
      'Elbows flaring 90 degrees outward like a "T", stressing the anterior shoulder joint capsule.',
      'Partial repetitions failing to reach full chest depth.'
    ],
    safetyPrecautions: [
      'If wrists ache, use push-up handles, dumbbells, or closed fists to keep wrists in neutral alignment.'
    ],
    easierVariation: 'Knee Push-Ups or Incline Push-Ups against a counter or sturdy wall',
    harderVariation: 'Decline Push-Ups (feet on chair) or Deficit Push-Ups with hands on books',
    alternatives: ['Floor Dumbbell Press', 'Resistance Band Chest Press'],
    guidanceByLevel: {
      beginner: 'Start hands on an elevated bed or desk, gradually lowering surface height as strength builds.',
      intermediate: 'Perform with a strict 3-second lowering tempo and pause at the chest.',
      advanced: 'Add a loaded backpack with water bottles or books, or perform one-arm push-up progressions.'
    },
    biomechanicalFocus: 'Closed-kinetic-chain horizontal adduction; allows natural scapular protraction unlike fixed bench pressing.',
    has3DModel: true,
    modelType: 'pushup',
    vectorVisualType: 'pushup'
  },
  {
    id: 'chest-dips',
    name: 'Parallel Bar Dips',
    shortSummary: 'High-intensity compound movement targeting lower pectorals, front deltoids, and triceps with great bodyweight leverage.',
    targetMuscles: 'Pectoralis Major (Lower/Costal Fibers), Triceps Brachii, Anterior Deltoids',
    primaryMuscles: ['Chest', 'Triceps'],
    secondaryMuscles: ['Shoulders'],
    equipment: ['Bodyweight'],
    difficulty: 'Intermediate',
    category: 'Both',
    startingPosition: 'Grip parallel dip bars or two sturdy matching kitchen counters. Push yourself up to lock out arms. Lean torso forward roughly 15–30 degrees, cross ankles, and retract shoulder blades.',
    executionSteps: [
      'Maintain the forward torso lean to place primary emphasis on the pectoral fibers rather than triceps.',
      'Slowly descend until elbows reach approximately 90 degrees flexion and upper arms are parallel to the floor.',
      'Feel a deep, controlled stretch across the chest muscles.',
      'Drive upward through the palms, straightening arms while keeping torso tilted forward until lockout.'
    ],
    postureCues: [
      'Keep shoulders down and depressed; do not let shoulders shrug up into the ears.',
      'Hold the forward diagonal lean consistently throughout the rep.',
      'Avoid swinging or using kicking momentum.'
    ],
    breathingPattern: 'Inhale on the descent; exhale on the upward drive.',
    recommendedSetsReps: {
      hypertrophy: '3–4 sets of 8–12 reps',
      strength: '4 sets of 5–8 reps (weighted belt if capable)',
      endurance: '3 sets to failure with bodyweight'
    },
    commonMistakes: [
      'Dipping too deep past your shoulder mobility range, stressing the acromioclavicular (AC) joint.',
      'Staying completely upright, which shifts stress away from chest to triceps.',
      'Jerking abruptly at the bottom turnaround.'
    ],
    safetyPrecautions: [
      'Do not perform if you have active shoulder impingement or sternum pain (costochondritis).',
      'Always enter and exit the movement with slow control.'
    ],
    easierVariation: 'Resistance Band Assisted Dips or Bench Dips with feet on floor',
    harderVariation: 'Weighted Dip Belt or Ring Dips with unstable gymnastics rings',
    alternatives: ['Decline Barbell Press', 'High-to-Low Cable Flye'],
    guidanceByLevel: {
      beginner: 'Use a loop resistance band looped under knees to reduce working bodyweight.',
      intermediate: 'Master 3 sets of 10 clean unassisted bodyweight reps with pause at bottom.',
      advanced: 'Add external loading via dip belt with progressive 2.5kg increments.'
    },
    biomechanicalFocus: 'Shoulder extension and adduction with elbow extension against gravity vector.',
    has3DModel: true,
    modelType: 'pushup',
    vectorVisualType: 'dips'
  },

  // --- BACK ---
  {
    id: 'barbell-deadlift',
    name: 'Conventional Barbell Deadlift',
    shortSummary: 'The premier posterior chain compound lift for total-body posterior development, spinal erectors, and trap hypertrophy.',
    targetMuscles: 'Erector Spinae, Gluteus Maximus, Hamstrings, Latissimus Dorsi, Trapezius, Forearms',
    primaryMuscles: ['Back', 'Hamstrings', 'Glutes'],
    secondaryMuscles: ['Forearms', 'Full Body'],
    equipment: ['Barbell'],
    difficulty: 'Advanced',
    category: 'Gym',
    startingPosition: 'Stand with feet hip-width apart, barbell cutting across mid-foot. Hinge at hips until shins lightly touch bar. Grip bar just outside legs with double overhand or hook grip. Pull chest high, pack lats down into back pockets, and engage core.',
    executionSteps: [
      'Pull slack out of the barbell until you hear a "click" against the plates and feel tension in your hamstrings.',
      'Take a deep 360-degree diaphragmatic breath, brace core as if bracing for a punch.',
      'Initiate pull by pushing the floor away with legs (leg press the earth) keeping bar dragging along shins.',
      'Once bar crosses knees, drive hips forward to complete lockout by squeezing glutes firmly.',
      'Lower bar by hinging hips back first until past knees, then bend knees to return plates to floor.'
    ],
    postureCues: [
      'Maintain neutral spine from tailbone to cervical neck; do not hyperextend at top.',
      'Keep bar in constant contact with legs to minimize spinal shear forces.',
      'Latissimus dorsi engaged isometrically to prevent bar drifting forward.'
    ],
    breathingPattern: 'Inhale and brace intra-abdominal pressure at floor; hold through pull; exhale at lockout or as bar returns to ground.',
    recommendedSetsReps: {
      hypertrophy: '3–4 sets of 6–10 reps @ RPE 7–8',
      strength: '3–5 sets of 3–5 reps @ RPE 8–9',
      endurance: 'Not recommended for high fatigue sets due to spinal stabilizing demands'
    },
    commonMistakes: [
      'Rounding lumbar spine under heavy loads due to weak brace or poor hip mobility.',
      'Hyperextending spine backward at top lockout instead of locking with glute contraction.',
      'Allowing bar to drift forward away from shins, drastically multiplying lumbar moment arm.'
    ],
    safetyPrecautions: [
      'Always reset your breath and brace on each repetition; avoid "touch-and-go" bouncing on deadlifts.',
      'Use flat hard-soled shoes or lift in socks to maintain direct heel-to-floor force transfer.'
    ],
    easierVariation: 'Trap Bar / Hex Bar Deadlift or Romanian Deadlift with lighter dumbbells',
    harderVariation: 'Deficit Deadlift (standing on 2-inch platform) or Paused Deadlift 2 inches off floor',
    alternatives: ['Trap Bar Deadlift', 'Romanian Deadlift', 'Barbell Good Mornings'],
    guidanceByLevel: {
      beginner: 'Start with Kettlebell Romanian Deadlifts to groove the hip hinge pattern before touching the barbell.',
      intermediate: 'Incorporate hook grip or lifting straps to ensure back/legs are taxed rather than grip.',
      advanced: 'Program submaximal volume blocks with RPE autoregulation and variation work.'
    },
    biomechanicalFocus: 'Pure hip hinge extension with isometric spinal column bracing against high shear moment.',
    has3DModel: true,
    modelType: 'deadlift',
    vectorVisualType: 'deadlift'
  },
  {
    id: 'pull-up-chin-up',
    name: 'Pull-Up & Chin-Up',
    shortSummary: 'The gold standard vertical pulling movement for lat width, upper back thickness, and biceps brachii.',
    targetMuscles: 'Latissimus Dorsi, Teres Major, Rhomboids, Biceps Brachii, Brachialis',
    primaryMuscles: ['Back', 'Biceps'],
    secondaryMuscles: ['Forearms', 'Shoulders'],
    equipment: ['Bodyweight'],
    difficulty: 'Intermediate',
    category: 'Both',
    startingPosition: 'Hang from an overhead pull-up bar with overhand grip (Pull-up) or underhand grip (Chin-up) slightly wider than shoulders. Start in a dead hang with arms fully extended and core engaged (hollow body position).',
    executionSteps: [
      'Initiate pull by retracting and depressing scapulae (active hang).',
      'Drive elbows down toward your hips and drive chest up toward the bar.',
      'Continue pulling smoothly until chin clearly crosses over top edge of bar.',
      'Pause for a fraction of a second at peak lat contraction.',
      'Lower yourself with full control over 2–3 seconds back to dead hang.'
    ],
    postureCues: [
      'Avoid kicking with legs or kipping torso; keep legs straight and toes pointed.',
      'Lead with the chest rather than craning neck up over the bar.',
      'Ensure complete elbow extension at bottom of every single rep.'
    ],
    breathingPattern: 'Inhale at bottom dead hang; exhale smoothly while pulling chest to bar.',
    recommendedSetsReps: {
      hypertrophy: '3–4 sets of 6–10 reps (or weighted if capable of 12+)',
      strength: '4–5 sets of 3–5 reps with dip belt weight plate',
      endurance: '3 sets of max repetitions with bodyweight'
    },
    commonMistakes: [
      'Kipping or swinging legs to generate momentum instead of muscular lat force.',
      'Doing half-reps (not lowering all the way down or stopping short of chin over bar).',
      'Letting shoulders cave forward at the top into internal rotation.'
    ],
    safetyPrecautions: [
      'If suffering from medial epicondylitis (golfer’s elbow), switch from straight bar to gymnastics rings or neutral grip handles.'
    ],
    easierVariation: 'Resistance Band Assisted Pull-Ups, Inverted Bodyweight Rows, or Negative Eccentric Pull-ups',
    harderVariation: 'Weighted Pull-Ups with dip belt or L-Sit Pull-Ups',
    alternatives: ['Lat Pulldown', 'Inverted Table Row', 'Resistance Band Pulldown'],
    guidanceByLevel: {
      beginner: 'Perform 3-5 sets of 5-second slow lowering eccentrics (jump to top, lower slowly) to build base strength.',
      intermediate: 'Target 3 sets of 8 strict reps with full lockout before adding external loading.',
      advanced: 'Add micro-load weight plates (2.5kg - 10kg) and train varied grips.'
    },
    biomechanicalFocus: 'Humeral adduction in the frontal plane (Pull-up) and shoulder extension in sagittal plane (Chin-up).',
    has3DModel: true,
    modelType: 'pullup',
    vectorVisualType: 'pullup'
  },
  {
    id: 'barbell-pendlay-row',
    name: 'Barbell Bent-Over Row (Pendlay)',
    shortSummary: 'Explosive strict horizontal pull developing upper back density, rear deltoids, and spinal endurance.',
    targetMuscles: 'Latissimus Dorsi, Rhomboids, Middle & Lower Trapezius, Posterior Deltoid, Biceps',
    primaryMuscles: ['Back'],
    secondaryMuscles: ['Biceps', 'Shoulders', 'Forearms'],
    equipment: ['Barbell'],
    difficulty: 'Intermediate',
    category: 'Gym',
    startingPosition: 'Stand with feet hip-width apart. Hinge at hips so torso is parallel to the floor (strictly horizontal). Bar starts resting on floor over midfoot. Grip bar overhand slightly wider than shoulder width.',
    executionSteps: [
      'Brace core firmly and set a completely flat spine.',
      'Pull the bar explosively from the floor toward the lower chest / upper abdomen.',
      'Drive elbows high and pinch shoulder blades together at the apex of movement.',
      'Lower bar in controlled manner back to floor to come to a dead stop before beginning next rep.'
    ],
    postureCues: [
      'Torso remains completely static at 90-degree bend; do not stand upright as you pull.',
      'Keep knees soft and weight balanced through mid-foot and heels.',
      'Avoid using hip jerk to propel the barbell.'
    ],
    breathingPattern: 'Take air and brace at floor; pull explosively; exhale as bar returns to ground.',
    recommendedSetsReps: {
      hypertrophy: '3–4 sets of 8–12 reps',
      strength: '4 sets of 5–6 reps',
      endurance: '3 sets of 12–15 reps with lighter weight'
    },
    commonMistakes: [
      'Standing too upright (turning the horizontal row into an awkward upright shrug).',
      'Rounding thoracic and lumbar spine under fatigue.',
      'Jerking torso violently to heave the barbell.'
    ],
    safetyPrecautions: [
      'Keep lower back strictly braced to prevent shear on the lumbar vertebrae.'
    ],
    easierVariation: 'Chest-Supported Dumbbell Row or One-Arm Dumbbell Row with knee on bench',
    harderVariation: 'Barbell Row with 2-second hold at contraction without resting on floor',
    alternatives: ['Seated Cable Row', 'Dumbbell Rows', 'T-Bar Row'],
    guidanceByLevel: {
      beginner: 'Use single-arm dumbbell row to protect lower back while learning scapular retraction.',
      intermediate: 'Implement dead-stop Pendlay rows from the floor to remove momentum.',
      advanced: 'Integrate dynamic variable loading or deficit rows.'
    },
    biomechanicalFocus: 'Scapular retraction, humeral extension and horizontal abduction under isometric spinal stabilization.',
    has3DModel: true,
    modelType: 'deadlift',
    vectorVisualType: 'barbell-row'
  },
  {
    id: 'inverted-table-row',
    name: 'Home Inverted Row (Table or Bed-Sheet)',
    shortSummary: 'Accessible home calisthenic row building upper back thickness using bodyweight and household items.',
    targetMuscles: 'Rhomboids, Latissimus Dorsi, Posterior Deltoids, Biceps Brachii',
    primaryMuscles: ['Back'],
    secondaryMuscles: ['Biceps', 'Forearms'],
    equipment: ['Household Item', 'Bodyweight'],
    difficulty: 'Beginner',
    category: 'Home',
    startingPosition: 'Lie under a heavy, sturdy dining table with head and chest under table edge. Grip edge of table with hands shoulder-width apart, heels on floor, body aligned in a reverse plank.',
    executionSteps: [
      'Engage glutes and core to keep body in a straight plank line.',
      'Pull chest up smoothly toward the table underside, driving elbows back.',
      'Squeeze shoulder blades tightly together at the top.',
      'Lower yourself under control until arms are fully extended without touching floor.'
    ],
    postureCues: [
      'Verify table stability before loading with body weight; ensure table will not flip.',
      'Keep hips high; do not let hips dip or pike.',
      'Pull with your back muscles, not just flexing elbows.'
    ],
    breathingPattern: 'Inhale while descending; exhale as you pull your chest up to the table.',
    recommendedSetsReps: {
      hypertrophy: '3–4 sets of 8–15 reps',
      strength: '3 sets of 6–10 reps with elevated feet',
      endurance: '3 sets of 15–20 reps'
    },
    commonMistakes: [
      'Allowing hips to sag down, shortening range of motion.',
      'Using an unstable table or slippery grip surface.'
    ],
    safetyPrecautions: [
      'Test table sturdiness thoroughly. Alternatively, use a bedsheet knotted inside a closed doorframe.'
    ],
    easierVariation: 'Bend knees at 90 degrees with feet flat on the floor to reduce leverage load',
    harderVariation: 'Elevate feet onto a chair or sofa to increase angle against gravity',
    alternatives: ['Resistance Band Seated Row', 'Doorframe Towel Row'],
    guidanceByLevel: {
      beginner: 'Bent knee position with feet flat; focus on pausing for 2 seconds at top contraction.',
      intermediate: 'Straight-leg heels only on floor with strict 3-second lowering tempo.',
      advanced: 'Elevated feet on chair with backpack loaded with water bottles on chest.'
    },
    biomechanicalFocus: 'Horizontal pulling vector targeting scapular retractors and latissimus dorsi.',
    has3DModel: false,
    vectorVisualType: 'inverted-row'
  },

  // --- SHOULDERS ---
  {
    id: 'overhead-press',
    name: 'Overhead Barbell Press (Military Press)',
    shortSummary: 'Foundational vertical pushing compound lift for deltoid hypertrophy and overhead core stability.',
    targetMuscles: 'Anterior & Lateral Deltoids, Triceps Brachii, Upper Trapezius, Core',
    primaryMuscles: ['Shoulders'],
    secondaryMuscles: ['Triceps', 'Abdominals'],
    equipment: ['Barbell'],
    difficulty: 'Intermediate',
    category: 'Gym',
    startingPosition: 'Stand with feet shoulder-width apart. Rest barbell across anterior deltoids and clavicles (front rack position). Grip bar just outside shoulders with vertical forearms, squeeze glutes, brace abs tightly.',
    executionSteps: [
      'Take a deep breath into abdomen and tighten entire body.',
      'Pull chin back slightly to allow clear vertical bar path.',
      'Press barbell straight up vertically, driving head forward back into natural alignment once bar clears forehead.',
      'Lock out elbows overhead with barbell stacked directly over shoulders, hips, and midfoot.',
      'Lower bar under control along same vertical path back to upper chest.'
    ],
    postureCues: [
      'Squeeze glutes maximally to prevent hyperextending the lumbar spine.',
      'Keep ribs locked down; do not arch backward into an improvised incline bench press.',
      'Forearms must remain vertical beneath the bar throughout the entire movement.'
    ],
    breathingPattern: 'Inhale and brace at clavicle level; exhale as bar passes crown of head; inhale at top lockout if pausing.',
    recommendedSetsReps: {
      hypertrophy: '3–4 sets of 8–12 reps',
      strength: '4–5 sets of 3–6 reps',
      endurance: '3 sets of 12–15 reps'
    },
    commonMistakes: [
      'Excessive backward lean through lumbar spine, converting vertical press into chest press.',
      'Pressing bar forward in an arc around head instead of pulling chin back for straight vertical line.',
      'Flaring wrists backward, causing wrist joint strain.'
    ],
    safetyPrecautions: [
      'If overhead shoulder mobility is restricted, use neutral-grip dumbbell press to avoid subacromial friction.',
      'Keep core rigid throughout the set to protect lower back.'
    ],
    easierVariation: 'Seated Dumbbell Shoulder Press or Half-Kneeling Landmine Press',
    harderVariation: 'Push Press with heavy loads or Paused 3-second Overhead Press',
    alternatives: ['Dumbbell Overhead Press', 'Pike Push-ups', 'Kettlebell Press'],
    guidanceByLevel: {
      beginner: 'Start with light dumbbells to develop overhead stability and shoulder mobility.',
      intermediate: 'Implement strict form overhead with barbell, locking down glutes and ribs.',
      advanced: 'Incorporate push press overload and pin presses at sticking points.'
    },
    biomechanicalFocus: 'Shoulder abduction and flexion in scapular plane with upward rotation of scapula.',
    has3DModel: true,
    modelType: 'ohp',
    vectorVisualType: 'ohp'
  },
  {
    id: 'dumbbell-lateral-raise',
    name: 'Dumbbell Lateral Raise',
    shortSummary: 'The undisputed king of lateral deltoid isolation for broad shoulders and V-taper aesthetics.',
    targetMuscles: 'Lateral Deltoid (Middle Deltoid), Supraspinatus, Upper Trapezius',
    primaryMuscles: ['Shoulders'],
    secondaryMuscles: [],
    equipment: ['Dumbbell'],
    difficulty: 'Beginner',
    category: 'Both',
    startingPosition: 'Stand tall with feet hip-width apart holding dumbbells at sides or slightly in front of thighs. Lean torso forward roughly 10 degrees, soften knees, and maintain slight bend in elbows.',
    executionSteps: [
      'Raise dumbbells out to sides in the scapular plane (roughly 20–30 degrees in front of direct side).',
      'Lead with elbows rather than hands, keeping pinkies slightly higher than or level with thumbs.',
      'Lift until dumbbells reach parallel with shoulder height.',
      'Pause briefly for peak contraction at apex.',
      'Lower weights smoothly over 2–3 seconds to maintain eccentric tension.'
    ],
    postureCues: [
      'Do not swing torso or use momentum from hips.',
      'Do not shrug traps up to your ears; keep neck relaxed and traps depressed.',
      'Keep elbows softly bent and fixed at same angle throughout.'
    ],
    breathingPattern: 'Exhale while raising dumbbells upward; inhale on the smooth downward descent.',
    recommendedSetsReps: {
      hypertrophy: '3–4 sets of 12–20 reps with 2-second eccentric phase',
      strength: 'Not ideal for low-rep heavy sets; stick to higher rep fatigue',
      endurance: '3 sets of 20–25 reps with drop sets'
    },
    commonMistakes: [
      'Using weights that are too heavy and swinging torso back and forth.',
      'Lifting hands higher than elbows, shifting tension to anterior delts.',
      'Shrugging shoulders into ears, turning it into an upper trap exercise.'
    ],
    safetyPrecautions: [
      'Stay within scapular plane to prevent impingement of the supraspinatus tendon.'
    ],
    easierVariation: 'Resistance Band Lateral Raise or Water Bottle Raises at home',
    harderVariation: 'Cable Lateral Raise with cuff attachment or 1.5-rep lateral raises',
    alternatives: ['Cable Lateral Raise', 'Leaning Dumbbell Lateral Raise', 'Water Bottle Lateral Raise'],
    guidanceByLevel: {
      beginner: 'Use 2–5kg dumbbells or two filled water bottles; master the zero-momentum strict form.',
      intermediate: 'Perform 15 strict reps, then pause at bottom and perform 5 partial bottom reps to failure.',
      advanced: 'Use cable setup for constant resistance profile across full excursion.'
    },
    biomechanicalFocus: 'Glenohumeral abduction in the scapular plane; peak torque at 90 degrees abduction.',
    has3DModel: true,
    modelType: 'ohp',
    vectorVisualType: 'lateral-raise'
  },
  {
    id: 'pike-pushup',
    name: 'Pike Push-Up (Home Shoulder Builder)',
    shortSummary: 'Bodyweight overhead pressing progression building deltoid strength and headstand readiness without equipment.',
    targetMuscles: 'Anterior Deltoid, Lateral Deltoid, Triceps Brachii, Upper Trapezius',
    primaryMuscles: ['Shoulders'],
    secondaryMuscles: ['Triceps'],
    equipment: ['Bodyweight'],
    difficulty: 'Intermediate',
    category: 'Home',
    startingPosition: 'Start in a standard push-up position, then walk feet forward toward hands while lifting hips high into an inverted V-shape (pike position). Keep legs straight or soft knees if hamstring mobility is tight.',
    executionSteps: [
      'Shift bodyweight forward so shoulders are stacked over wrists.',
      'Inhale and lower head forward in front of hands, creating a tripod shape with hands and top of head.',
      'Lightly touch forehead to floor or pillow.',
      'Exhale and push back and up along diagonal path to return to high-hip pike position.'
    ],
    postureCues: [
      'Keep elbows tucked at roughly 45 degrees, never flared wide.',
      'Hips should stay high and stacked as close to over the shoulders as possible.',
      'Move crown of head forward into the tripod shape rather than dropping between hands.'
    ],
    breathingPattern: 'Inhale on the eccentric descent; exhale forcefully driving back up to pike.',
    recommendedSetsReps: {
      hypertrophy: '3–4 sets of 8–15 reps',
      strength: '3–4 sets of 5–8 reps (elevate feet on chair)',
      endurance: '3 sets of 15–20 reps'
    },
    commonMistakes: [
      'Dropping head straight between hands instead of forward into tripod trajectory.',
      'Allowing hips to drop back into standard push-up angle.',
      'Flaring elbows out laterally.'
    ],
    safetyPrecautions: [
      'Place a soft cushion or mat under forehead while learning the balance point.'
    ],
    easierVariation: 'Hands on elevated surface (coffee table) or downward dog push-up pulses',
    harderVariation: 'Elevated Feet Pike Push-Up (feet on couch/chair) or Handstand Push-Up against wall',
    alternatives: ['Dumbbell Overhead Press', 'Water Jug Shoulder Press'],
    guidanceByLevel: {
      beginner: 'Start on floor with knees bent to learn tripod head path.',
      intermediate: 'Feet straight on floor, focus on pushing head back through arms at lockout.',
      advanced: 'Elevate feet onto chair or 24-inch box to bring torso near vertical.'
    },
    biomechanicalFocus: 'Vertical shoulder flexion and scapular upward rotation against bodyweight load.',
    has3DModel: false,
    vectorVisualType: 'pike-pushup'
  },

  // --- ARMS: BICEPS & TRICEPS & FOREARMS ---
  {
    id: 'barbell-bicep-curl',
    name: 'Standing Barbell Bicep Curl',
    shortSummary: 'The definitive mass builder for biceps brachii and brachialis using straight or EZ barbell.',
    targetMuscles: 'Biceps Brachii (Short & Long Head), Brachialis, Brachioradialis',
    primaryMuscles: ['Biceps'],
    secondaryMuscles: ['Forearms'],
    equipment: ['Barbell'],
    difficulty: 'Beginner',
    category: 'Gym',
    startingPosition: 'Stand tall with feet shoulder-width apart holding barbell with an underhand (supinated) grip shoulder-width apart. Arms hanging straight, shoulders pinned back, glutes tight.',
    executionSteps: [
      'Brace core and pin elbows lightly to sides of ribcage.',
      'Curl the bar upward by flexing elbows while keeping upper arms fixed in place.',
      'Squeeze biceps hard at top of contraction when bar reaches upper chest height.',
      'Resist the weight and lower the barbell smoothly over a full 2–3 second eccentric descent.',
      'Reach full elbow extension at bottom before initiating next rep.'
    ],
    postureCues: [
      'Do not swing lower back or rock hips backward to hoist the bar.',
      'Keep wrists straight and firm; do not hyperextend wrists backward.',
      'Do not let elbows drift forward excessively during curling action.'
    ],
    breathingPattern: 'Exhale while curling upward; inhale smoothly on the controlled descent.',
    recommendedSetsReps: {
      hypertrophy: '3–4 sets of 8–12 reps with 2-second negative',
      strength: '3–4 sets of 6–8 reps',
      endurance: '3 sets of 15–20 reps'
    },
    commonMistakes: [
      'Using body momentum / hyperextending lumbar spine to start the curl.',
      'Allowing elbows to flare outward or drift forward 6 inches into front delts.',
      'Stopping reps at 90 degrees and skipping bottom full extension.'
    ],
    safetyPrecautions: [
      'If straight barbell causes inner wrist or forearm discomfort, switch to an angled EZ-curl bar.'
    ],
    easierVariation: 'Dumbbell Alternating Curl or Resistance Band Bicep Curl',
    harderVariation: 'Barbell Preacher Curl or Strict Wall-Curl (back pinned flat against wall)',
    alternatives: ['Incline Dumbbell Curl', 'Hammer Curls', 'Chin-ups'],
    guidanceByLevel: {
      beginner: 'Stand with upper back against a wall to eliminate cheating momentum.',
      intermediate: 'Implement strict 3-second negatives to maximize mechanical tension.',
      advanced: 'Use 21s (7 bottom partials, 7 top partials, 7 full reps) for metabolic stress.'
    },
    biomechanicalFocus: 'Elbow flexion and forearm supination; highest mechanical tension in mid-range of curl.',
    has3DModel: true,
    modelType: 'bicep_curl',
    vectorVisualType: 'bicep-curl'
  },
  {
    id: 'tricep-rope-pushdown',
    name: 'Cable Tricep Rope Pushdown',
    shortSummary: 'Top triceps isolation exercise targeting lateral and medial heads with excellent elbow extension lockout.',
    targetMuscles: 'Triceps Brachii (Lateral, Medial, and Long Head)',
    primaryMuscles: ['Triceps'],
    secondaryMuscles: [],
    equipment: ['Cable'],
    difficulty: 'Beginner',
    category: 'Gym',
    startingPosition: 'Attach a rope to high pulley. Grip rope with neutral grip (thumbs up). Take a half-step back, hinge torso slightly forward (15 degrees), pin elbows snugly against ribs, and lock shoulders.',
    executionSteps: [
      'Start with forearms parallel to floor or slightly higher for full stretch.',
      'Push hands down toward thighs by extending elbows.',
      'At the bottom of the movement, spread the rope ends apart laterally past your thighs.',
      'Lock out elbows and squeeze triceps intensely for 1 full second.',
      'Return rope slowly up to starting position, stopping before elbows drift forward.'
    ],
    postureCues: [
      'Keep elbows pinned firmly like hinges; no forward or backward elbow travel.',
      'Keep shoulders down away from ears; no upper trap shrugging.',
      'Squeeze triceps hard at bottom spread.'
    ],
    breathingPattern: 'Exhale as you push down and spread rope; inhale as rope returns to top.',
    recommendedSetsReps: {
      hypertrophy: '3–4 sets of 10–15 reps with 1-second pause at lockout',
      strength: '3–4 sets of 8–10 reps',
      endurance: '3 sets of 15–20 reps with drop sets'
    },
    commonMistakes: [
      'Letting elbows flare forward and back, turning pushdown into an awkward press.',
      'Leaning bodyweight onto the rope and pushing with chest instead of triceps.',
      'Not spreading the rope at the bottom, missing maximum contraction.'
    ],
    safetyPrecautions: [
      'Do not snap elbows violently into hyperextension; control the lockout smoothly.'
    ],
    easierVariation: 'Resistance Band Pushdown or Close-Grip Push-up on knees',
    harderVariation: 'Overhead Cable Tricep Extension or Skull Crushers with barbell',
    alternatives: ['Skull Crushers', 'Diamond Push-ups', 'Chair Dips'],
    guidanceByLevel: {
      beginner: 'Master keeping upper arms frozen at sides; focus on tricep mind-muscle connection.',
      intermediate: 'Implement peak contraction hold for 2 seconds on every repetition.',
      advanced: 'Superset with overhead rope extensions to target the long head in stretched position.'
    },
    biomechanicalFocus: 'Pure elbow extension in sagittal plane with forearm pronation/abduction at terminal extension.',
    has3DModel: false,
    vectorVisualType: 'tricep-pushdown'
  },
  {
    id: 'household-water-jug-hammer-curl',
    name: 'Home Hammer Curl (Water Bottles or Backpack)',
    shortSummary: 'Accessible home arm exercise building brachialis mass (which pushes biceps up) and forearm density.',
    targetMuscles: 'Brachialis, Biceps Brachii, Brachioradialis (Forearm)',
    primaryMuscles: ['Biceps', 'Forearms'],
    secondaryMuscles: [],
    equipment: ['Household Item', 'Dumbbell'],
    difficulty: 'Beginner',
    category: 'Home',
    startingPosition: 'Stand tall holding two filled 2–5L water jugs or dumbbells by the handles with palms facing each other (neutral grip). Arms extended at sides, shoulders relaxed.',
    executionSteps: [
      'Keep palms facing each other throughout the entire movement.',
      'Curl the weights upward toward shoulder height without twisting wrists.',
      'Squeeze the outer arm and forearm muscles at top.',
      'Lower weights with control over 3 seconds back to dead hang.'
    ],
    postureCues: [
      'Keep palms facing inward throughout the entire range of motion.',
      'Maintain an upright posture; avoid rocking back and forth.',
      'Squeeze handles tightly to build grip strength.'
    ],
    breathingPattern: 'Exhale curling up; inhale lowering down.',
    recommendedSetsReps: {
      hypertrophy: '3–4 sets of 10–15 reps',
      strength: '3 sets of 8–12 reps with heavy jugs',
      endurance: '3 sets of 20 reps'
    },
    commonMistakes: [
      'Twisting wrists into supination (keep neutral hammer grip).',
      'Using elbow swinging momentum.'
    ],
    safetyPrecautions: [
      'Ensure water bottle caps are screwed tightly shut to avoid leakage.'
    ],
    easierVariation: 'Single-arm curl with smaller 1L bottle',
    harderVariation: 'Backpack loaded with books or slow 4-second eccentric descent',
    alternatives: ['Dumbbell Hammer Curl', 'Towel Pull-Ups', 'Band Hammer Curls'],
    guidanceByLevel: {
      beginner: 'Focus on 12-15 controlled reps with 2L water bottles (approx 2kg).',
      intermediate: 'Fill 5L jugs with water (5kg) or sand/water mix (up to 8kg).',
      advanced: 'Wear a loaded backpack while curling heavy jugs with pauses.'
    },
    biomechanicalFocus: 'Elbow flexion with forearm in neutral position, maximizing recruitment of the brachialis muscle.',
    has3DModel: false,
    vectorVisualType: 'hammer-curl'
  },
  {
    id: 'dead-hangs-farmer-walk',
    name: 'Dead Hangs & Farmer Carries',
    shortSummary: 'High-yield grip, forearm, and shoulder decompression protocol building unbreakable crushing grip.',
    targetMuscles: 'Forearm Flexors, Forearm Extensors, Upper Trapezius, Core Stabilizers',
    primaryMuscles: ['Forearms'],
    secondaryMuscles: ['Back', 'Shoulders'],
    equipment: ['Bodyweight', 'Dumbbell', 'Household Item'],
    difficulty: 'Beginner',
    category: 'Both',
    startingPosition: 'For Dead Hang: Grip an overhead bar with full overhand grip. Allow body to hang freely. For Farmer Carry: Stand tall holding two heavy dumbbells, kettlebells, or heavy water jugs at sides.',
    executionSteps: [
      'Dead Hang: Engage core softly, keep shoulders slightly active (avoid completely dislocating), and hold for time.',
      'Farmer Carry: Walk smoothly in a straight line with upright posture, taking measured heel-to-toe steps.',
      'Do not allow shoulders to slump forward or torso to sway side to side.',
      'Maintain continuous crushing grip until designated time or distance is reached.'
    ],
    postureCues: [
      'Shoulders packed and down; chest proudly elevated.',
      'Rib cage locked down to prevent spinal extension.',
      'Breathe rhythmically into diaphragm while holding high isometric tension.'
    ],
    breathingPattern: 'Rhythmic, deep diaphragmatic breaths through nose while maintaining abdominal brace.',
    recommendedSetsReps: {
      hypertrophy: '3 sets of 45–60 second maximum effort holds',
      strength: '4 sets of 20–30 second heavy carries',
      endurance: '2–3 sets of 90+ second dead hangs'
    },
    commonMistakes: [
      'Letting shoulders shrug completely into ears and relaxing deep stabilizers.',
      'Wobbling and slouching side to side during farmer carries.'
    ],
    safetyPrecautions: [
      'Step down safely from pull-up bar; do not jump down recklessly after a fatigued dead hang.'
    ],
    easierVariation: 'Partial hang with toes lightly resting on floor or lighter suitcase carry',
    harderVariation: 'Towel Hangs (wrap towel around bar) or Single-arm Suitcase Carry',
    alternatives: ['Wrist Curls', 'Reverse Barbell Curls', 'Plate Pinches'],
    guidanceByLevel: {
      beginner: 'Aim for 3 sets of 30-second passive/active hangs on bar.',
      intermediate: 'Progress to 60-second unbroken hangs and bodyweight farmer carries.',
      advanced: 'Wrap a thick towel around the bar or carry 50% bodyweight per hand.'
    },
    biomechanicalFocus: 'Isometric finger flexor activation (Flexor Digitorum Profundus and Superficialis) and scapular traction.',
    has3DModel: false,
    vectorVisualType: 'dead-hang'
  },

  // --- LEGS: QUADS & HAMSTRINGS & GLUTES & CALVES ---
  {
    id: 'barbell-back-squat',
    name: 'Barbell Back Squat',
    shortSummary: 'The king of lower body compound exercises, stimulating quadriceps, glutes, adductors, and spinal erectors.',
    targetMuscles: 'Quadriceps Femoris, Gluteus Maximus, Adductor Magnus, Hamstrings, Erector Spinae',
    primaryMuscles: ['Quadriceps', 'Glutes'],
    secondaryMuscles: ['Hamstrings', 'Abdominals'],
    equipment: ['Barbell'],
    difficulty: 'Intermediate',
    category: 'Gym',
    startingPosition: 'Step under barbell in rack, resting it across upper trapezius (high bar) or across rear deltoids (low bar). Grip bar tightly, unrack with hips, take 2–3 measured steps back. Set feet slightly wider than shoulder-width with toes flared out 15–30 degrees.',
    executionSteps: [
      'Take a deep 360-degree belly breath, clamp core tight with Valsalva maneuver.',
      'Initiate descent by breaking simultaneously at hips and knees, sitting down into the space between your thighs.',
      'Track knees in the exact same direction your toes are pointing.',
      'Descend until hip crease drops below parallel to top of knee joint (or full comfortable depth).',
      'Drive powerfully upward through midfoot and heels, maintaining constant torso angle out of the hole.',
      'Exhale through pursed lips past the sticking point and stand tall.'
    ],
    postureCues: [
      'Maintain neutral spine; do not let lower back round into a "butt wink" at the bottom.',
      'Keep knees pushed out in line with toes throughout both descent and ascent.',
      'Keep entire foot glued to floor: big toe, pinky toe, and heel (tripod foot).'
    ],
    breathingPattern: 'Inhale deeply and hold intra-abdominal brace through the descent and turnaround; exhale past sticking point on ascent.',
    recommendedSetsReps: {
      hypertrophy: '3–4 sets of 8–12 reps @ RPE 7–8.5',
      strength: '4–5 sets of 3–5 reps @ RPE 8–9',
      endurance: '3 sets of 15–20 reps'
    },
    commonMistakes: [
      'Knees caving inward (valgus collapse) on the ascent, stressing the ACL and menisci.',
      'Heels lifting off floor due to tight ankles or poor weight distribution.',
      'Good-morning squat: hips shooting up first, turning squat into an accidental spinal hinge.'
    ],
    safetyPrecautions: [
      'Always set safety spotter bars inside the power rack at hip height.',
      'Wear flat, incompressible lifting shoes or Olympic lifting shoes with raised heel.'
    ],
    easierVariation: 'Goblet Squat with dumbbell or Bodyweight Box Squat',
    harderVariation: 'Front Squat or 2-second Paused Back Squat in the hole',
    alternatives: ['Leg Press', 'Hack Squat', 'Bulgarian Split Squat'],
    guidanceByLevel: {
      beginner: 'Master bodyweight squats and dumbbell goblet squats with full depth before barbell loading.',
      intermediate: 'Implement structured linear or undulating progression with consistent depth verification.',
      advanced: 'Use paused squats, pin squats, and periodized volume cycles.'
    },
    biomechanicalFocus: 'Simultaneous knee extension and hip extension with high quadriceps torque.',
    has3DModel: true,
    modelType: 'squat',
    vectorVisualType: 'squat'
  },
  {
    id: 'romanian-deadlift',
    name: 'Romanian Deadlift (RDL)',
    shortSummary: 'The premier hip-hinge isolation exercise for intense hamstring stretch, glute hypertrophy, and lower back strength.',
    targetMuscles: 'Hamstrings (Biceps Femoris, Semitendinosus, Semimembranosus), Gluteus Maximus, Erector Spinae',
    primaryMuscles: ['Hamstrings', 'Glutes'],
    secondaryMuscles: ['Back', 'Forearms'],
    equipment: ['Barbell', 'Dumbbell'],
    difficulty: 'Intermediate',
    category: 'Gym',
    startingPosition: 'Stand tall with feet hip-width apart holding barbell or dumbbells with an overhand grip against thighs. Soften knees to a 15–20 degree angle and keep that knee angle completely locked throughout.',
    executionSteps: [
      'Take a breath, brace core, and initiate movement by pushing hips straight back behind you.',
      'Glide the barbell down along thighs and shins, keeping weights in constant touch with legs.',
      'Stop when hips can travel no further backward (typically just below knees or mid-shin).',
      'Feel an intense, deep stretch across the hamstring bellies.',
      'Drive hips forward powerfully by squeezing glutes to return to standing upright.'
    ],
    postureCues: [
      'Movement is horizontal hip displacement, not vertical bending down.',
      'Knees stay softly unlocked but DO NOT bend further as you lower.',
      'Keep lats tight to keep bar scraped against shins; no gap between legs and bar.'
    ],
    breathingPattern: 'Inhale and brace at the top; hold breath as hips push back; exhale as hips drive through to top.',
    recommendedSetsReps: {
      hypertrophy: '3–4 sets of 8–12 reps with 3-second lowering tempo',
      strength: '3–4 sets of 6–8 reps',
      endurance: '3 sets of 12–15 reps'
    },
    commonMistakes: [
      'Bending knees too much, turning the RDL into a conventional squat.',
      'Continuing to lower the bar by rounding lumbar spine after hips have finished traveling back.',
      'Letting the barbell drift forward away from legs.'
    ],
    safetyPrecautions: [
      'Do not go lower than your active hamstring flexibility allows without spinal flexion.',
      'Use lifting straps if grip fatigues before hamstrings reach target volume.'
    ],
    easierVariation: 'Dumbbell Romanian Deadlift or Single-Leg RDL with hand on wall for balance',
    harderVariation: 'Snatch-Grip RDL (wider grip) or Deficit RDL standing on a small plate',
    alternatives: ['Lying Leg Curl', 'Nordic Hamstring Curl', 'Good Mornings'],
    guidanceByLevel: {
      beginner: 'Practice with butt facing a wall 1 foot away; push hips back until touching wall.',
      intermediate: 'Focus on a 3-second eccentric descent to induce maximal muscle damage and hypertrophy.',
      advanced: 'Add micro-plates and maintain strict paused stretches at bottom.'
    },
    biomechanicalFocus: 'Hip extension moment with long moment arm across the hamstrings at lengthened muscle position.',
    has3DModel: true,
    modelType: 'deadlift',
    vectorVisualType: 'rdl'
  },
  {
    id: 'bulgarian-split-squat',
    name: 'Bulgarian Split Squat',
    shortSummary: 'Unilateral powerhouse exercise fixing muscular imbalances while building enormous quads and glutes.',
    targetMuscles: 'Quadriceps, Gluteus Maximus, Adductors, Hamstrings, Calves',
    primaryMuscles: ['Quadriceps', 'Glutes'],
    secondaryMuscles: ['Hamstrings', 'Calves'],
    equipment: ['Dumbbell', 'Bodyweight', 'Household Item'],
    difficulty: 'Intermediate',
    category: 'Both',
    startingPosition: 'Stand roughly 2–3 feet in front of a bench or sturdy chair. Place top of one foot rearward onto the bench surface. Hold dumbbells at sides or keep hands on hips. Square hips forward.',
    executionSteps: [
      'Descend by bending front knee, dropping back knee straight down toward the floor.',
      'Maintain front shin angle slightly forward or vertical depending on quad vs glute bias.',
      'Lower until back knee is hovering 1 inch from floor.',
      'Drive up through the front heel and midfoot, extending hip and knee back to top.',
      'Complete all repetitions on one leg before switching sides.'
    ],
    postureCues: [
      'Slight forward torso lean (20 degrees) targets glute max; upright torso emphasizes quads.',
      'Do not allow front knee to cave inward; track it directly over second toe.',
      'Keep 85% of bodyweight loaded through the front working leg.'
    ],
    breathingPattern: 'Inhale descending into the lunge; exhale forcefully driving through front foot.',
    recommendedSetsReps: {
      hypertrophy: '3 sets of 8–12 reps per leg with 2-second eccentric phase',
      strength: '3–4 sets of 6–8 reps per leg',
      endurance: '3 sets of 15 reps per leg (bodyweight)'
    },
    commonMistakes: [
      'Placing front foot too close to bench, jamming front knee awkwardly.',
      'Pushing too much weight through the back leg instead of driving with front leg.',
      'Collapsing chest forward into lap.'
    ],
    safetyPrecautions: [
      'Maintain balance by keeping feet hip-width apart horizontally (like on train tracks, not a tightrope).'
    ],
    easierVariation: 'Static Split Squat with both feet on the floor or Reverse Lunge',
    harderVariation: 'Deficit Bulgarian Split Squat (front foot elevated on a 2-inch block) with dumbbells',
    alternatives: ['Walking Lunges', 'Step-ups', 'Pistol Squats'],
    guidanceByLevel: {
      beginner: 'Master bodyweight split squat with hands resting on a sturdy wall or stick for balance.',
      intermediate: 'Add dumbbells held at sides with full range of motion.',
      advanced: 'Add deficit front foot elevation and 3-second descent.'
    },
    biomechanicalFocus: 'Unilateral closed-chain knee extension and hip extension; challenges hip abductors for pelvis stability.',
    has3DModel: true,
    modelType: 'lunge',
    vectorVisualType: 'split-squat'
  },
  {
    id: 'barbell-hip-thrust',
    name: 'Barbell Hip Thrust',
    shortSummary: 'The gold standard exercise for maximal gluteus maximus hypertrophy and horizontal hip extension power.',
    targetMuscles: 'Gluteus Maximus, Hamstrings, Adductors, Quadriceps',
    primaryMuscles: ['Glutes'],
    secondaryMuscles: ['Hamstrings', 'Quadriceps'],
    equipment: ['Barbell'],
    difficulty: 'Intermediate',
    category: 'Gym',
    startingPosition: 'Sit on floor with upper back (inferior scapula border) resting against a bench. Roll a padded barbell directly over hips. Bend knees at 90 degrees with feet flat on floor, shoulder-width apart.',
    executionSteps: [
      'Tuck chin to chest, gaze forward across the room (never look up at ceiling).',
      'Drive through heels and push hips vertically toward the ceiling.',
      'At top, fully extend hips into posterior pelvic tilt: squeeze glutes with maximum force.',
      'Form a straight table top from knees to shoulders; shins should be strictly vertical at top.',
      'Lower hips down under control until glutes tap floor, maintaining forward gaze.'
    ],
    postureCues: [
      'Keep chin tucked and eyes focused forward throughout whole set to avoid spinal arching.',
      'Drive strictly through heels; do not lift toes or rise on balls of feet.',
      'Lock out with glute contraction, NOT by arching lower back.'
    ],
    breathingPattern: 'Inhale descending; exhale forcefully as hips thrust upward into peak contraction.',
    recommendedSetsReps: {
      hypertrophy: '3–4 sets of 8–15 reps with 2-second hold at top',
      strength: '4 sets of 5–8 reps with heavy barbell',
      endurance: '3 sets of 15–25 reps with resistance band around knees'
    },
    commonMistakes: [
      'Looking up at ceiling and hyperextending lumbar spine at top.',
      'Feet placed too far forward (targets hamstrings) or too close to hips (targets quads).',
      'Rushing through reps without pausing at the top glute lockout.'
    ],
    safetyPrecautions: [
      'Always use a thick foam barbell pad to protect pelvic bones from bruising.'
    ],
    easierVariation: 'Bodyweight Glute Bridge on floor or Single-Leg Glute Bridge',
    harderVariation: 'Barbell Hip Thrust with mini-band around knees and 3-second isometric top hold',
    alternatives: ['Cable Pull-Through', 'Glute Kickbacks', 'Romanian Deadlift'],
    guidanceByLevel: {
      beginner: 'Master 20 reps of bodyweight floor glute bridges with 2-second top squeeze.',
      intermediate: 'Progress to barbell on bench, focusing on vertical shins at top.',
      advanced: 'Load heavy with 2-second top pause and perform rest-pause drop sets.'
    },
    biomechanicalFocus: 'Pure hip extension in the transverse/sagittal plane; peak tension occurs at terminal shortened position.',
    has3DModel: false,
    vectorVisualType: 'hip-thrust'
  },
  {
    id: 'nordic-hamstring-curl',
    name: 'Nordic Hamstring Curl & Slider Curl',
    shortSummary: 'High-level eccentric knee flexion exercise proven in sports science to dramatically reduce hamstring strain injuries.',
    targetMuscles: 'Hamstrings (Biceps Femoris, Semitendinosus, Semimembranosus), Gastrocnemius',
    primaryMuscles: ['Hamstrings'],
    secondaryMuscles: ['Calves', 'Glutes'],
    equipment: ['Bodyweight', 'Household Item'],
    difficulty: 'Advanced',
    category: 'Both',
    startingPosition: 'Kneel on a soft pad with ankles securely anchored under a loaded barbell, heavy sofa, or held firmly by a partner. Keep torso tall and hips extended in a straight line with thighs.',
    executionSteps: [
      'Maintain straight line from knees through hips to shoulders (do not bend at hips).',
      'Lower torso forward toward floor as slowly and smoothly as humanly possible using pure hamstring strength.',
      'Resist gravity as long as possible until hamstrings can no longer hold.',
      'Catch yourself smoothly with hands on the floor in a push-up position.',
      'Push off floor lightly with hands to help return to starting kneeling position.'
    ],
    postureCues: [
      'Do not bend at hips; keep glutes squeezed to lock hip extension.',
      'Focus 100% on the slow negative lowering phase.',
      'Keep feet flexed into dorsiflexion.'
    ],
    breathingPattern: 'Inhale while descending slowly; exhale catching yourself and returning to top.',
    recommendedSetsReps: {
      hypertrophy: '3 sets of 5–8 slow eccentric reps (3–5 seconds lowering)',
      strength: '3–4 sets of 4–6 reps',
      endurance: 'Not designed for high reps due to extreme muscular tension'
    },
    commonMistakes: [
      'Bending at hips (piking) to relieve tension from hamstrings.',
      'Dropping immediately without attempting to resist the fall.'
    ],
    safetyPrecautions: [
      'Always have hands ready to catch chest before hitting floor.'
    ],
    easierVariation: 'Towel Hamstring Slider Curls on smooth floor or Swiss Ball Leg Curls',
    harderVariation: 'Unassisted full concentric return without pushing off floor',
    alternatives: ['Lying Leg Curl Machine', 'Seated Leg Curl', 'Romanian Deadlift'],
    guidanceByLevel: {
      beginner: 'Use a towel on smooth floor: lie on back, bridge hips, slide heels in and out.',
      intermediate: 'Use a resistance band tied around chest to assist the Nordic descent.',
      advanced: 'Perform unassisted 5-second controlled descents.'
    },
    biomechanicalFocus: 'Supramaximal eccentric knee flexion lengthening contractions, shifting length-tension curve.',
    has3DModel: false,
    vectorVisualType: 'nordic-curl'
  },
  {
    id: 'single-leg-calf-raise',
    name: 'Standing Single-Leg Calf Raise',
    shortSummary: 'Essential lower leg movement strengthening the gastrocnemius, soleus, and Achilles tendon resilience.',
    targetMuscles: 'Gastrocnemius, Soleus, Plantaris, Tibialis Posterior',
    primaryMuscles: ['Calves'],
    secondaryMuscles: [],
    equipment: ['Bodyweight', 'Dumbbell', 'Household Item'],
    difficulty: 'Beginner',
    category: 'Both',
    startingPosition: 'Stand on edge of a stair or wooden block on the ball of one foot with heel hanging off. Lightly touch wall or railing for balance. Tuck other foot behind working leg.',
    executionSteps: [
      'Lower heel down deeply below the step edge until you feel a profound stretch across the calf and Achilles tendon.',
      'Hold the bottom stretched position for a full 2-second pause to dissipate stretch reflex.',
      'Drive up through the ball of foot (first and second toe) as high as possible into full plantarflexion.',
      'Pause for 1 second at apex with peak calf contraction.',
      'Lower under 3-second eccentric control back to the deep stretch.'
    ],
    postureCues: [
      'Keep knee straight to target the gastrocnemius (straight knee) or soft bend for soleus.',
      'Do not bounce rapidly at the bottom; pause strictly.',
      'Push through big toe knuckle to prevent ankle rolling outward.'
    ],
    breathingPattern: 'Inhale descending into deep heel stretch; exhale driving up onto ball of foot.',
    recommendedSetsReps: {
      hypertrophy: '3–4 sets of 12–20 reps with 2-second bottom stretch pause',
      strength: '3 sets of 8–12 reps with heavy dumbbell in hand',
      endurance: '3 sets of 25–30 reps per leg'
    },
    commonMistakes: [
      'Bouncing rapidly using the Achilles tendon elastic recoil rather than muscle fibers.',
      'Cutting the bottom stretch short.',
      'Rolling weight onto outside of foot instead of driving through big toe.'
    ],
    safetyPrecautions: [
      'Ease into deep stretch to avoid acute strain if Achilles tendon is stiff.'
    ],
    easierVariation: 'Two-leg calf raise on flat floor',
    harderVariation: 'Single-leg raise holding 15kg dumbbell or loaded backpack',
    alternatives: ['Standing Machine Calf Raise', 'Seated Calf Raise', 'Donkey Calf Raise'],
    guidanceByLevel: {
      beginner: 'Perform with both feet on floor, working up to 30 continuous controlled reps.',
      intermediate: 'Perform on stair step with single leg and 2-second bottom stretch.',
      advanced: 'Hold a heavy dumbbell on same side as working calf with 3-second negative.'
    },
    biomechanicalFocus: 'Ankle plantarflexion over full excursion; gastrocnemius requires straight knee for full active insufficiency avoidance.',
    has3DModel: false,
    vectorVisualType: 'calf-raise'
  },

  // --- CORE & ABDOMINALS ---
  {
    id: 'hanging-leg-raise',
    name: 'Hanging Leg & Knee Raise',
    shortSummary: 'High-level core movement targeting rectus abdominis, hip flexors, and deep stabilizing musculature.',
    targetMuscles: 'Rectus Abdominis, Iliopsoas, Obliques, Forearms/Grip',
    primaryMuscles: ['Abdominals'],
    secondaryMuscles: ['Forearms'],
    equipment: ['Bodyweight'],
    difficulty: 'Intermediate',
    category: 'Both',
    startingPosition: 'Hang from an overhead pull-up bar with overhand grip, arms straight, shoulders active, legs extended together.',
    executionSteps: [
      'Exhale and tuck pelvis into posterior pelvic tilt before lifting legs.',
      'Raise straight legs (or bent knees) upward toward the chest.',
      'At top of movement, curl pelvis upward toward ribcage to ensure abdominal contraction rather than pure hip flexion.',
      'Pause for a fraction of a second at peak crunch.',
      'Lower legs back down slowly over 3 seconds without swinging.'
    ],
    postureCues: [
      'Do not use swinging momentum; if swinging occurs, pause completely at bottom before next rep.',
      'The crucial movement is curling the pelvis toward chest; simply lifting thighs only works hip flexors.'
    ],
    breathingPattern: 'Inhale at bottom hang; exhale forcefully as knees or toes curl toward chest.',
    recommendedSetsReps: {
      hypertrophy: '3–4 sets of 10–15 strict reps',
      strength: '3 sets of 8–10 strict toes-to-bar reps',
      endurance: '3 sets of 15–20 bent-knee raises'
    },
    commonMistakes: [
      'Swinging body like a pendulum to generate momentum.',
      'Failing to tilt pelvis upward, turning it into a pure hip flexor exercise.'
    ],
    safetyPrecautions: [
      'Keep shoulders engaged in active hang to prevent shoulder joint strain.'
    ],
    easierVariation: 'Hanging Knee Tuck or Captain\'s Chair Knee Raise with forearms supported',
    harderVariation: 'Toes-To-Bar or Hanging Leg Raise holding a light dumbbell between feet',
    alternatives: ['Ab Wheel Rollout', 'Reverse Crunch on floor', 'Cable Crunch'],
    guidanceByLevel: {
      beginner: 'Perform lying reverse crunches on floor, focusing on rolling pelvis off the ground.',
      intermediate: 'Hanging bent-knee raises with 2-second pause at chest.',
      advanced: 'Straight-leg raises with toes touching bar on every repetition.'
    },
    biomechanicalFocus: 'Pelvic retroversion and lumbar flexion initiated against gravity load.',
    has3DModel: false,
    vectorVisualType: 'leg-raise'
  },
  {
    id: 'ab-wheel-rollout',
    name: 'Ab Wheel Rollout (Floor / Towel)',
    shortSummary: 'Superior anti-extension core exercise delivering massive mechanical tension across the entire abdominal wall.',
    targetMuscles: 'Rectus Abdominis, Transverse Abdominis, Latissimus Dorsi, Serratus Anterior',
    primaryMuscles: ['Abdominals'],
    secondaryMuscles: ['Back', 'Shoulders'],
    equipment: ['Bodyweight', 'Household Item'],
    difficulty: 'Advanced',
    category: 'Both',
    startingPosition: 'Kneel on a soft mat holding ab wheel (or hands on a towel / socks on smooth hardwood floor). Round upper back slightly, tuck pelvis into posterior tilt, and squeeze glutes.',
    executionSteps: [
      'Roll wheel forward smoothly, allowing hips and torso to extend toward floor in a synchronized unit.',
      'Go as far forward as you can while maintaining a flat or rounded lower back (NO sagging).',
      'Pause for a split-second in the fully extended hollow position.',
      'Pull back by contracting abdominals and lats, pulling wheel back under knees.'
    ],
    postureCues: [
      'Never allow lumbar spine to arch or hyperextend into anterior pelvic tilt.',
      'Squeeze glutes tight throughout the entire movement.',
      'Do not just sit back on heels with hips first; pull with abs.'
    ],
    breathingPattern: 'Inhale while rolling out forward; exhale forcefully pulling back to starting kneeling position.',
    recommendedSetsReps: {
      hypertrophy: '3–4 sets of 8–12 strict reps',
      strength: '3–4 sets of 6–8 reps with 2-second pause at full rollout',
      endurance: '3 sets of 15 reps'
    },
    commonMistakes: [
      'Arching lower back into extension, placing severe shear stress on lumbar spine.',
      'Hips shooting back first instead of pulling with the core.'
    ],
    safetyPrecautions: [
      'Stop rollout distance short of where lower back begins to arch. Use a wall as a bumper to limit range.'
    ],
    easierVariation: 'Plank with forward arm reaches or partial rollout to a wall',
    harderVariation: 'Standing Ab Wheel Rollout from toes',
    alternatives: ['Long-Lever Plank', 'Hollow Body Hold', 'Cable Crunch'],
    guidanceByLevel: {
      beginner: 'Roll out toward a wall placed 2 feet away to ensure safe range limit.',
      intermediate: 'Full kneeling rollout with chest hovering 1 inch from floor.',
      advanced: 'Standing ab wheel rollouts from toes with pause.'
    },
    biomechanicalFocus: 'Isometric anti-extension torque resisting lumbar hyperextension.',
    has3DModel: false,
    vectorVisualType: 'ab-wheel'
  },

  // --- CARDIO, MOBILITY & RECOVERY ---
  {
    id: 'hiit-jump-rope',
    name: 'HIIT Jump Rope Intervals',
    shortSummary: 'High-efficiency cardiovascular conditioning improving footwork, calf endurance, and VO2 max.',
    targetMuscles: 'Cardiovascular System, Calves, Forearms, Shoulders, Core',
    primaryMuscles: ['Cardio'],
    secondaryMuscles: ['Calves', 'Shoulders'],
    equipment: ['Household Item', 'Bodyweight'],
    difficulty: 'Intermediate',
    category: 'Both',
    startingPosition: 'Stand tall holding jump rope handles at hip height, rope behind heels. Elbows tucked close to ribs.',
    executionSteps: [
      'Rotate rope using wrists rather than whole arm circles.',
      'Jump just 1–2 inches off ground, landing softly on balls of feet.',
      'Maintain steady rhythmic cadence.',
      'Alternate fast sprint intervals (30 seconds) with recovery tempo (30 seconds).'
    ],
    postureCues: [
      'Stay light on balls of feet with knees softly spring-loaded.',
      'Keep core braced and gaze forward.',
      'Wrist flick drives the rope.'
    ],
    breathingPattern: 'Rhythmic nasal inhalation, controlled exhalation synchronized to jumping cadence.',
    recommendedSetsReps: {
      hypertrophy: 'Not applicable (conditioning focus)',
      strength: 'Not applicable',
      endurance: '10–15 rounds of 30s work / 30s rest'
    },
    commonMistakes: [
      'Jumping too high and landing hard on heels.',
      'Flaring arms wide away from torso.'
    ],
    safetyPrecautions: [
      'Wear supportive athletic shoes and avoid jumping on bare concrete if joints are sensitive.'
    ],
    easierVariation: 'Ghost rope (mimicking jump rope without actual rope) or high-knees march',
    harderVariation: 'Double-unders (rope passes twice per jump) or boxer skips',
    alternatives: ['Shadow Boxing', 'Burpees', 'Mountain Climbers'],
    guidanceByLevel: {
      beginner: 'Basic single bounces at steady 100 rpm for 30s intervals.',
      intermediate: 'Boxer skip style for 60s rounds.',
      advanced: 'High-intensity interval double-unders.'
    },
    biomechanicalFocus: 'Cardiorespiratory interval stimulation and stretch-shortening cycle of the Achilles complex.',
    has3DModel: false,
    vectorVisualType: 'jump-rope'
  },
  {
    id: 'worlds-greatest-stretch',
    name: "World's Greatest Stretch & Thoracic Flow",
    shortSummary: 'Comprehensive multi-planar mobility drill targeting hip flexors, hamstrings, groin, and thoracic spine.',
    targetMuscles: 'Hip Flexors, Hamstrings, Thoracic Spine, Glutes, Adductors',
    primaryMuscles: ['Mobility'],
    secondaryMuscles: ['Hamstrings', 'Glutes'],
    equipment: ['Bodyweight'],
    difficulty: 'Beginner',
    category: 'Both',
    startingPosition: 'Start in a tall push-up plank. Step right foot forward directly outside right hand into a deep lunge.',
    executionSteps: [
      'Drop right elbow toward the inside of right instep, holding for 2 seconds to stretch hip and adductor.',
      'Rotate right arm up toward ceiling, turning thoracic chest toward the right while following hand with eyes.',
      'Place right hand back down, then shift hips back and straighten right leg to stretch right hamstring.',
      'Step back to plank and repeat smoothly on left side.'
    ],
    postureCues: [
      'Keep back leg active and knee extended if possible.',
      'Rotate through upper back (thoracic) rather than twisting lower back.',
      'Breathe deeply into every position.'
    ],
    breathingPattern: 'Inhale while expanding chest toward ceiling; exhale dropping into hip stretch.',
    recommendedSetsReps: {
      hypertrophy: 'Not applicable (mobility prep)',
      strength: 'Not applicable',
      endurance: '5–8 smooth reps per side before workout or on recovery days'
    },
    commonMistakes: [
      'Rushing through positions without pausing.',
      'Twisting lumbar spine instead of thoracic spine.'
    ],
    safetyPrecautions: [
      'Move gently into the end range of motion; never force sharp pinching feelings.'
    ],
    easierVariation: 'Drop back knee to floor for a supported low-lunge variation',
    harderVariation: 'Add a deep overhead reach with both arms while in deep lunge',
    alternatives: ['Cat-Cow Flow', '90/90 Hip Switches', 'Deep Squat Pry'],
    guidanceByLevel: {
      beginner: 'Drop rear knee to mat and take your time in each position for 5 deep breaths.',
      intermediate: 'Perform as a dynamic warm-up protocol before squatting or deadlifting.',
      advanced: 'Pair with deep hip prying and ankle dorsiflexion rocks.'
    },
    biomechanicalFocus: 'Hip extension of posterior leg, hip flexion and abduction of anterior leg, and thoracic rotation.',
    has3DModel: false,
    vectorVisualType: 'mobility-flow'
  },

  // --- PRENATAL SAFE EXERCISES (ACOG Evidenced) ---
  {
    id: 'prenatal-seated-dumbbell-curl-press',
    name: 'Supported Seated Dumbbell Curl & Postural Press',
    shortSummary: 'ACOG-safe seated dumbbell movement building carrying arm stamina, shoulder posture, and pelvic floor connection.',
    targetMuscles: 'Biceps Brachii, Anterior Deltoids, Rhomboids, Core Stabilizers',
    primaryMuscles: ['Biceps', 'Shoulders'],
    secondaryMuscles: ['Back', 'Forearms'],
    equipment: ['Dumbbell'],
    difficulty: 'Beginner',
    category: 'Home',
    startingPosition: 'Sit tall on a sturdy chair, bench, or birth ball with feet planted flat wider than hip-width. Hold light dumbbells (3–8 lbs) at sides with neutral hammer grip.',
    executionSteps: [
      'Inhale to prepare, feeling 360° rib expansion without bearing down.',
      'Exhale and curl dumbbells smoothly up toward shoulders with elbows close to torso.',
      'Continue pressing dumbbells smoothly overhead to soft lockout without arching lumbar spine.',
      'Inhale and lower under complete control back to shoulders, then smoothly down to sides.'
    ],
    postureCues: [
      'Keep neutral hammer grip (palms facing inward) to protect shoulder joint integrity.',
      'Sit tall with ribs stacked directly over pelvis; do not lean backward or flare chest.',
      'Exhale on the lift while gently hugging baby toward your spine.'
    ],
    breathingPattern: 'Inhale on descent; exhale on curl and press while gently lifting pelvic floor.',
    recommendedSetsReps: {
      hypertrophy: '3 sets of 10–12 reps with light weight',
      strength: '2–3 sets of 8–10 reps',
      endurance: '2–3 sets of 12–15 reps'
    },
    commonMistakes: [
      'Using heavy weights that induce breath holding (Valsalva maneuver).',
      'Arching lower spine or swinging torso backward during the overhead press.',
      'Letting elbows flare excessively outward.'
    ],
    safetyPrecautions: [
      'Always maintain the ACOG Talk Test (ability to hold conversation comfortably). Avoid exercising to exhaustion.'
    ],
    easierVariation: 'Seated Resistance Band Bicep Curl or Bodyweight Arm Reach',
    harderVariation: 'Standing Neutral Dumbbell Press (First Trimester Only)',
    alternatives: ['Seated Resistance Band Row', 'Incline Wall Push-Up'],
    guidanceByLevel: {
      beginner: 'Use 3-5 lb dumbbells seated with back supported on a sturdy chair.',
      intermediate: 'Perform seated on a birth ball to incorporate subtle pelvic stabilization.',
      advanced: 'Add a 2-second pause at shoulder contraction and peak overhead press.'
    },
    biomechanicalFocus: 'Elbow flexion and glenohumeral scapular plane abduction with neutral pelvic base.',
    has3DModel: false,
    vectorVisualType: 'arm-curl'
  }
];

export const MUSCLE_GROUPS_LIST = [
  'All',
  'Chest',
  'Back',
  'Shoulders',
  'Biceps',
  'Triceps',
  'Forearms',
  'Abdominals',
  'Quadriceps',
  'Hamstrings',
  'Glutes',
  'Calves',
  'Cardio',
  'Mobility'
] as const;

export const EQUIPMENT_LIST = [
  'All',
  'Barbell',
  'Dumbbell',
  'Bodyweight',
  'Household Item',
  'Cable',
  'Resistance Band'
] as const;
