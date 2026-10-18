import { MuscleGroup, WarmUpMovement, WarmUpRoutine } from '../types';

export const WARM_UP_MOVEMENTS_POOL: WarmUpMovement[] = [
  // --- RAISE PHASE (General Temperature & Heart Rate) ---
  {
    id: 'raise-boxer-skip',
    name: 'Dynamic Boxer Skip & Arm Circles',
    durationSeconds: 60,
    targetMuscleGroups: ['Cardio', 'Full Body', 'Calves', 'Shoulders'],
    rampPhase: 'Raise',
    purpose: 'Elevates core body temperature, increases heart rate, and lubricates shoulder glenohumeral joint capsules with synovial fluid.',
    coachingCues: [
      'Stay light on the balls of feet, shifting weight rhythmically side to side.',
      'Perform large forward arm circles for 30 seconds, then reverse backward for 30 seconds.',
      'Breathe deeply in through the nose and out through the mouth.'
    ],
    breathing: 'Steady rhythmic nasal breathing synchronized with foot bounces.'
  },
  {
    id: 'raise-seal-jacks',
    name: 'Seal Jacks & Horizontal Pec Hugs',
    durationSeconds: 60,
    targetMuscleGroups: ['Chest', 'Shoulders', 'Cardio', 'Full Body'],
    rampPhase: 'Raise',
    purpose: 'Warms anterior chest and deltoids while promoting shoulder blade retraction and adduction under elevated heart rate.',
    coachingCues: [
      'Clap hands together in front of chest as feet jump together.',
      'Open arms wide into a deep chest stretch as feet jump outward.',
      'Avoid hyperextending lower back; keep abdominal wall gently braced.'
    ],
    breathing: 'Exhale on the arm clap; inhale deeply on the expansive horizontal arm opening.'
  },
  {
    id: 'raise-high-knees-march',
    name: 'High Knee Dynamic March & Overhead Reaches',
    durationSeconds: 60,
    targetMuscleGroups: ['Quadriceps', 'Glutes', 'Full Body', 'Cardio'],
    rampPhase: 'Raise',
    purpose: 'Activates hip flexors, increases hamstring compliance, and mobilizes shoulder flexion overhead.',
    coachingCues: [
      'Drive knees up toward hip height in a controlled, rhythmic march.',
      'Reach alternating arms straight overhead toward ceiling with locked elbows.',
      'Keep torso vertical and avoid leaning backward as knees rise.'
    ],
    breathing: 'Continuous rhythmic breathing throughout the 60 seconds.'
  },

  // --- ACTIVATE & MOBILIZE: CHEST, SHOULDERS & TRICEPS (PUSH) ---
  {
    id: 'mob-scapular-pushup',
    name: 'Scapular Push-Ups & Serratus Protraction',
    durationSeconds: 60,
    targetMuscleGroups: ['Chest', 'Shoulders', 'Triceps'],
    rampPhase: 'Activate',
    purpose: 'Fires the serratus anterior and establishes neuromuscular control over scapular retraction and protraction for stable pressing.',
    coachingCues: [
      'Set up in a tall plank on hands or knees with locked elbows.',
      'Pinch shoulder blades together allowing chest to sink slightly (retraction).',
      'Push the floor away firmly, rounding upper back slightly toward ceiling (protraction).',
      'Elbows must remain completely straight throughout; all motion is scapular.'
    ],
    breathing: 'Inhale while pinching shoulder blades; exhale forcefully pushing the floor away.'
  },
  {
    id: 'mob-band-dislocates',
    name: 'Shoulder Pass-Throughs / Band Dislocates',
    durationSeconds: 60,
    targetMuscleGroups: ['Shoulders', 'Chest', 'Back'],
    rampPhase: 'Mobilize',
    purpose: 'Opens anterior shoulder capsule and pectoralis minor, enhancing glenohumeral mobility for overhead and bench pressing.',
    coachingCues: [
      'Hold a towel, PVC pipe, or resistance band with a wide overhand grip in front of hips.',
      'Keep arms straight and circle the bar smoothly up overhead and all the way behind hips.',
      'Do not bend elbows or shrug traps into ears; widen grip if tightness restricts movement.'
    ],
    breathing: 'Inhale as arms rise overhead; exhale as arms descend behind back.'
  },
  {
    id: 'mob-prone-ytw',
    name: 'Prone Y-T-W Rotator Cuff & Mid-Trap Activation',
    durationSeconds: 60,
    targetMuscleGroups: ['Shoulders', 'Back'],
    rampPhase: 'Activate',
    purpose: 'Activates lower traps, rhomboids, and infraspinatus to create a solid posterior shelf and prevent shoulder impingement.',
    coachingCues: [
      'Lie face down on floor with forehead lightly resting on mat.',
      'Perform 20s of "Y" raises (arms at 45° angle, thumbs to ceiling).',
      'Perform 20s of "T" raises (arms straight out to sides, thumbs to ceiling).',
      'Perform 20s of "W" raises (elbows bent at 90°, rotating forearms upward).'
    ],
    breathing: 'Exhale on each 2-second hold at top; inhale descending.'
  },

  // --- ACTIVATE & MOBILIZE: BACK, BICEPS & POSTERIOR CHAIN (PULL) ---
  {
    id: 'mob-cat-cow-thoracic',
    name: 'Cat-Cow Flow & Thoracic Thread-the-Needle',
    durationSeconds: 60,
    targetMuscleGroups: ['Back', 'Mobility', 'Abdominals'],
    rampPhase: 'Mobilize',
    purpose: 'Restores spinal flexion and extension while lubricating facet joints and priming upper back lat engagement.',
    coachingCues: [
      'Hands directly under shoulders, knees under hips.',
      'Inhale: drop belly, lift tailbone, and expand chest forward into Cow.',
      'Exhale: tuck tailbone, arch spine toward ceiling, and tuck chin into Cat.',
      'Spend the final 20 seconds threading each arm underneath torso for rotational mobility.'
    ],
    breathing: 'Deep synchronized diaphragmatic breathing matching spinal curves.'
  },
  {
    id: 'mob-lat-bow-stretch',
    name: 'Dynamic Child’s Pose to Lat Side Bow',
    durationSeconds: 60,
    targetMuscleGroups: ['Back', 'Shoulders', 'Biceps'],
    rampPhase: 'Mobilize',
    purpose: 'Lengthens latissimus dorsi and thoracolumbar fascia, enabling full humeral elevation without lumbar compensation.',
    coachingCues: [
      'Sit hips back onto heels into a long Child’s Pose with fingertips walking forward.',
      'Walk both hands 45° to the right, sitting left hip back into floor to stretch left lat for 25s.',
      'Walk hands across center to the left side and hold for 25s to open right lat.',
      'Breathe into the rib cage on each stretch.'
    ],
    breathing: 'Deep expansive inhales expanding lateral ribcage.'
  },
  {
    id: 'mob-bird-dog-brace',
    name: 'Bird-Dog Cross-Brace & Posterior Activation',
    durationSeconds: 60,
    targetMuscleGroups: ['Back', 'Glutes', 'Abdominals'],
    rampPhase: 'Activate',
    purpose: 'Drills cross-body rotary stability (glute max to contralateral lat) and reinforces rigid intra-abdominal pressure.',
    coachingCues: [
      'From quadruped position, simultaneously extend right arm forward and left leg backward.',
      'Form a straight horizontal line from fingertip to heel without tilting pelvis or arching lower back.',
      'Pause for 2 seconds at full reach, then alternate smoothly to left arm and right leg.',
      'Keep core braced as if resisting a twisting force.'
    ],
    breathing: 'Exhale on the extension and hold; inhale as limbs return to center.'
  },

  // --- ACTIVATE & MOBILIZE: LEGS, QUADS, HAMSTRINGS, GLUTES & HIPS ---
  {
    id: 'mob-worlds-greatest',
    name: 'World’s Greatest Stretch with Thoracic Rotation',
    durationSeconds: 60,
    targetMuscleGroups: ['Quadriceps', 'Hamstrings', 'Glutes', 'Back', 'Mobility'],
    rampPhase: 'Mobilize',
    purpose: 'Gold-standard multi-planar drill opening hip flexors, adductors, hamstrings, and thoracic spine simultaneously.',
    coachingCues: [
      'Step forward into a deep lunge with right foot outside right hand.',
      'Drop right elbow toward the right ankle for a 2-second deep hip and groin stretch.',
      'Reach right arm up toward the ceiling, turning chest open to the right for 2 seconds.',
      'Shift hips back into a brief hamstring stretch, then alternate smoothly to left leg (30s per side).'
    ],
    breathing: 'Inhale on the thoracic reach; exhale dropping deep into the hip sink.'
  },
  {
    id: 'mob-deep-squat-pry',
    name: 'Deep Squat Pry & Ankle Dorsiflexion Rocks',
    durationSeconds: 60,
    targetMuscleGroups: ['Quadriceps', 'Glutes', 'Calves', 'Mobility'],
    rampPhase: 'Mobilize',
    purpose: 'Improves talocrural (ankle) dorsiflexion and opens hip capsules for below-parallel squatting without foot collapse.',
    coachingCues: [
      'Drop down into your deepest comfortable bodyweight squat with chest elevated.',
      'Place elbows inside knees and pry knees gently outward against thighs.',
      'Shift bodyweight gently side-to-side over each foot to stretch Achilles tendons and calves.',
      'Keep entire foot (heel, big toe, pinky toe) glued to floor.'
    ],
    breathing: 'Calm, steady nasal breathing while relaxing into the deep squat hole.'
  },
  {
    id: 'mob-glute-bridges',
    name: 'Glute Bridges with Isometric Abduction',
    durationSeconds: 60,
    targetMuscleGroups: ['Glutes', 'Hamstrings', 'Abdominals'],
    rampPhase: 'Activate',
    purpose: 'Wakes up sleepy gluteus maximus fibers to ensure strong hip extension and prevent excessive hamstring dominance.',
    coachingCues: [
      'Lie supine on back, knees bent 90°, feet flat hip-width apart.',
      'Drive heels into floor and thrust hips upward into full extension.',
      'Squeeze glutes maximally at the top for a full 2-second isometric contraction.',
      'Do not hyperextend lower back; focus tension strictly in glute bellies.'
    ],
    breathing: 'Exhale driving hips up into peak squeeze; inhale returning to floor.'
  },
  {
    id: 'mob-inchworm-hinge',
    name: 'Inchworm Walkout & Dynamic Hamstring Sweep',
    durationSeconds: 60,
    targetMuscleGroups: ['Hamstrings', 'Chest', 'Shoulders', 'Abdominals'],
    rampPhase: 'Mobilize',
    purpose: 'Stretches the posterior chain dynamically while firing core stabilizers and anterior deltoid stabilizers.',
    coachingCues: [
      'Stand tall, hinge at hips, and touch hands to floor with soft knees.',
      'Feel the deep stretch across hamstrings, then walk hands out into a solid high plank.',
      'Hold plank for 1 second, then walk feet with small steps back toward hands.',
      'Stand upright, reset, and repeat.'
    ],
    breathing: 'Inhale standing tall; exhale walking hands forward into plank.'
  },
  {
    id: 'mob-cossack-squats',
    name: 'Side-to-Side Cossack Squat Glides',
    durationSeconds: 60,
    targetMuscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings', 'Mobility'],
    rampPhase: 'Mobilize',
    purpose: 'Mobilizes adductor magnus and gracilis in the frontal plane, essential for wide-stance squats and unilateral knee stability.',
    coachingCues: [
      'Stand with feet double shoulder-width apart, toes pointing forward or slightly out.',
      'Shift weight and squat down to the right leg while keeping left leg straight with toes pointing up.',
      'Keep right heel firmly on floor; stay as low as comfortable.',
      'Glide across smoothly to the left side without standing all the way up.'
    ],
    breathing: 'Inhale descending into the lateral bend; exhale gliding across to other side.'
  },

  // --- POTENTIATE PHASE (CNS Neural Primer & Rate Coding) ---
  {
    id: 'pot-rapid-bodyweight-squats',
    name: 'Crisp Speed Squats with Explosive Hip Extension',
    durationSeconds: 60,
    targetMuscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings', 'Calves'],
    rampPhase: 'Potentiate',
    purpose: 'Primes high-threshold motor unit recruitment and stretch-shortening cycle (SSC) prior to heavy loading.',
    coachingCues: [
      'Perform bodyweight squats with a controlled 1-second descent followed by a rapid, explosive ascent.',
      'Squeeze glutes with maximum velocity at lockout without jumping off floor.',
      'Maintain pristine spinal posture and knee tracking at speed.',
      'Focus on acceleration through the concentric movement phase.'
    ],
    breathing: 'Sharp forceful exhalation at the top of each rapid repetition.'
  },
  {
    id: 'pot-explosive-plyo-pushups',
    name: 'Incline Hand-Release Push-Up Speed Pulses',
    durationSeconds: 60,
    targetMuscleGroups: ['Chest', 'Triceps', 'Shoulders'],
    rampPhase: 'Potentiate',
    purpose: 'Fires fast-twitch pectoral and tricep motor units, potentiating neurological rate of force development (RFD).',
    coachingCues: [
      'Perform push-ups on knees or elevated bench for speed efficiency.',
      'Descend quickly with control, then push floor away explosively so hands briefly lighten or leave surface.',
      'Land softly and transition smoothly into next rep.',
      'Maintain strict core plank alignment.'
    ],
    breathing: 'Sharp explosive exhale on each push.'
  },
  {
    id: 'pot-pogo-hops',
    name: 'Ankle Spring Pogo Hops & Arm Swings',
    durationSeconds: 60,
    targetMuscleGroups: ['Calves', 'Full Body', 'Cardio'],
    rampPhase: 'Potentiate',
    purpose: 'Pre-tensions the Achilles tendon and neuromuscular stretch-reflex pathways for optimal explosive force transfer.',
    coachingCues: [
      'Bounce rapidly on the balls of feet with stiff knees (ankles act as rigid springs).',
      'Spend minimal time on ground (quick ground contact time).',
      'Synchronize with explosive upward arm swings every 5th hop.'
    ],
    breathing: 'Fast rhythmic breathing.'
  }
];

/**
 * Dynamically builds an evidence-based 5-minute (300-second) warm-up
 * based on the target muscle groups of the upcoming training session.
 */
export function generateDynamicWarmUp(targetMuscles: MuscleGroup[] = ['Full Body']): WarmUpRoutine {
  const isUpper = targetMuscles.some(m => ['Chest', 'Shoulders', 'Triceps'].includes(m));
  const isBack = targetMuscles.some(m => ['Back', 'Biceps'].includes(m));
  const isLower = targetMuscles.some(m => ['Quadriceps', 'Hamstrings', 'Glutes', 'Calves'].includes(m));

  // Determine Title
  let title = '5-Minute Total-Body Dynamic Warm-Up';
  if (isUpper && !isLower) {
    title = '5-Minute Upper Body & Pressing Primer';
  } else if (isBack && !isLower && !isUpper) {
    title = '5-Minute Posterior Pull & Scapular Primer';
  } else if (isLower && !isUpper) {
    title = '5-Minute Lower Body & Hip Mobility Primer';
  } else if (isUpper && isBack && !isLower) {
    title = '5-Minute Upper Torso (Push & Pull) Primer';
  }

  const selectedMovements: WarmUpMovement[] = [];

  // Phase 1: RAISE (60s)
  if (isUpper && !isLower) {
    selectedMovements.push(WARM_UP_MOVEMENTS_POOL.find(m => m.id === 'raise-seal-jacks')!);
  } else if (isLower) {
    selectedMovements.push(WARM_UP_MOVEMENTS_POOL.find(m => m.id === 'raise-high-knees-march')!);
  } else {
    selectedMovements.push(WARM_UP_MOVEMENTS_POOL.find(m => m.id === 'raise-boxer-skip')!);
  }

  // Phase 2: ACTIVATE & MOBILIZE (3 movements = 3 x 60s = 180s)
  if (isLower && isUpper) {
    // Hybrid / Full Body
    selectedMovements.push(WARM_UP_MOVEMENTS_POOL.find(m => m.id === 'mob-worlds-greatest')!);
    selectedMovements.push(WARM_UP_MOVEMENTS_POOL.find(m => m.id === 'mob-scapular-pushup')!);
    selectedMovements.push(WARM_UP_MOVEMENTS_POOL.find(m => m.id === 'mob-deep-squat-pry')!);
  } else if (isLower) {
    // Pure Lower Body
    selectedMovements.push(WARM_UP_MOVEMENTS_POOL.find(m => m.id === 'mob-worlds-greatest')!);
    selectedMovements.push(WARM_UP_MOVEMENTS_POOL.find(m => m.id === 'mob-deep-squat-pry')!);
    selectedMovements.push(
      targetMuscles.includes('Hamstrings')
        ? WARM_UP_MOVEMENTS_POOL.find(m => m.id === 'mob-inchworm-hinge')!
        : WARM_UP_MOVEMENTS_POOL.find(m => m.id === 'mob-glute-bridges')!
    );
  } else if (isUpper && isBack) {
    // Upper Body Push & Pull
    selectedMovements.push(WARM_UP_MOVEMENTS_POOL.find(m => m.id === 'mob-scapular-pushup')!);
    selectedMovements.push(WARM_UP_MOVEMENTS_POOL.find(m => m.id === 'mob-band-dislocates')!);
    selectedMovements.push(WARM_UP_MOVEMENTS_POOL.find(m => m.id === 'mob-cat-cow-thoracic')!);
  } else if (isUpper) {
    // Push Bias
    selectedMovements.push(WARM_UP_MOVEMENTS_POOL.find(m => m.id === 'mob-scapular-pushup')!);
    selectedMovements.push(WARM_UP_MOVEMENTS_POOL.find(m => m.id === 'mob-band-dislocates')!);
    selectedMovements.push(WARM_UP_MOVEMENTS_POOL.find(m => m.id === 'mob-prone-ytw')!);
  } else if (isBack) {
    // Pull Bias
    selectedMovements.push(WARM_UP_MOVEMENTS_POOL.find(m => m.id === 'mob-cat-cow-thoracic')!);
    selectedMovements.push(WARM_UP_MOVEMENTS_POOL.find(m => m.id === 'mob-lat-bow-stretch')!);
    selectedMovements.push(WARM_UP_MOVEMENTS_POOL.find(m => m.id === 'mob-bird-dog-brace')!);
  } else {
    // General Full Body
    selectedMovements.push(WARM_UP_MOVEMENTS_POOL.find(m => m.id === 'mob-worlds-greatest')!);
    selectedMovements.push(WARM_UP_MOVEMENTS_POOL.find(m => m.id === 'mob-scapular-pushup')!);
    selectedMovements.push(WARM_UP_MOVEMENTS_POOL.find(m => m.id === 'mob-deep-squat-pry')!);
  }

  // Phase 3: POTENTIATE (60s)
  if (isLower) {
    selectedMovements.push(WARM_UP_MOVEMENTS_POOL.find(m => m.id === 'pot-rapid-bodyweight-squats')!);
  } else if (isUpper) {
    selectedMovements.push(WARM_UP_MOVEMENTS_POOL.find(m => m.id === 'pot-explosive-plyo-pushups')!);
  } else {
    selectedMovements.push(WARM_UP_MOVEMENTS_POOL.find(m => m.id === 'pot-pogo-hops')!);
  }

  // Calculate total seconds (should equal 300 seconds / 5 mins)
  const totalDuration = selectedMovements.reduce((sum, m) => sum + m.durationSeconds, 0);

  return {
    id: `warmup-${Date.now()}`,
    title,
    targetMuscleGroups: targetMuscles,
    totalDurationSeconds: totalDuration,
    movements: selectedMovements
  };
}
