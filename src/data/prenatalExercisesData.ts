import { PrenatalExercise, PrenatalRoutine, PregnancyTrimester } from '../types';

export interface PrenatalSafetyGuideline {
  title: string;
  category: 'ACOG Core Standard' | 'Red Flags to Stop' | 'Trimester Physiological Rule' | 'Pelvic Health';
  description: string;
  clinicalSource: string;
}

export const PRENATAL_CLINICAL_GUIDELINES: PrenatalSafetyGuideline[] = [
  {
    title: 'ACOG Physical Activity Standard',
    category: 'ACOG Core Standard',
    description: 'The American College of Obstetricians and Gynecologists (ACOG Committee Opinion No. 804) recommends at least 150 minutes of moderate-intensity aerobic and strength activity per week throughout uncomplicated pregnancies.',
    clinicalSource: 'ACOG Committee Opinion No. 804 (2020)'
  },
  {
    title: 'The "Talk Test" & Perceived Exertion (RPE)',
    category: 'ACOG Core Standard',
    description: 'Use the "Talk Test": you should always be able to hold a full conversation while exercising without gasping for air. Keep RPE between 12-14 on the 6-20 Borg scale. Avoid exercising to exhaustion.',
    clinicalSource: 'CSEP Canadian Guideline for Physical Activity throughout Pregnancy (2019)'
  },
  {
    title: 'Avoid Flat Supine Position After Week 16',
    category: 'Trimester Physiological Rule',
    description: 'After the first trimester (~16 weeks), avoid lying completely flat on your back (supine) for exercises. The heavy uterus can compress the inferior vena cava (supine hypotensive syndrome), reducing cardiac output and placental blood flow. Elevate your head/torso by 30-45° using pillows, wedges, or perform movements seated, side-lying, or standing.',
    clinicalSource: 'ACOG Clinical Guidelines on Exercise & Cardiovascular Hemodynamics'
  },
  {
    title: 'Protecting the Abdominal Wall & Diastasis Recti',
    category: 'Pelvic Health',
    description: 'Avoid traditional sit-ups, crunches, twisting crunches, and standard hanging leg raises that cause the abdominal midline to cone or dome outward. Focus on diaphragmatic breathing and gentle transverse abdominis engagement (drawing baby gently toward spine on exhalation).',
    clinicalSource: 'Journal of Orthopaedic & Sports Physical Therapy (JOSPT)'
  },
  {
    title: 'Relaxin Hormone & Joint Laxity Safeguards',
    category: 'Trimester Physiological Rule',
    description: 'The placenta produces relaxin, which increases ligamentous laxity throughout the pelvis and peripheral joints. Avoid sudden ballistic jumping, extreme end-range overstretching, or asymmetric lunges that aggravate the pubic symphysis or sacroiliac (SI) joints.',
    clinicalSource: 'Obstetrics & Gynecology Clinical Review'
  },
  {
    title: 'ACOG Warning Signs - STOP EXERCISING IMMEDIATELY',
    category: 'Red Flags to Stop',
    description: 'Discontinue exercise and contact your OB-GYN or midwife immediately if you experience: vaginal bleeding, regular painful uterine contractions, amniotic fluid leakage, dizziness or feeling faint, shortness of breath before exertion, chest pain, calf pain/swelling (DVT risk), headache, or muscle weakness affecting balance.',
    clinicalSource: 'ACOG Committee on Obstetric Practice Warning Checklist'
  }
];

export const PRENATAL_EXERCISES: PrenatalExercise[] = [
  {
    id: 'prenatal-360-breathing',
    name: '360° Diaphragmatic Breath & Pelvic Floor Hug',
    subtitle: 'Deep core foundation • Prevents pelvic floor hypertonicity & incontinence',
    category: 'Pelvic Floor & Core',
    trimestersSafe: ['Trimester 1', 'Trimester 2', 'Trimester 3', 'Postpartum'],
    targetMuscles: 'Diaphragm, Transverse Abdominis, Pelvic Floor, Multifidus',
    benefits: 'Establishes proper intra-abdominal pressure management, prevents diastasis recti doming, and teaches both engagement and essential relaxation of the pelvic floor for labor.',
    safetyCues: [
      'Sit comfortably on an exercise ball, yoga block, or chair with feet flat and spine neutral.',
      'Inhale slowly through your nose into ribs, belly, and back (360° umbrella expansion), feeling your pelvic floor gently expand.',
      'Exhale through pursed lips, gently drawing your pelvic floor upward and hugging baby toward your spine without squeezing glutes.'
    ],
    contraindications: [
      'Do not bear down or force pressure downward into the pelvic floor.',
      'Avoid sucking in the belly aggressively or holding your breath.'
    ],
    equipmentNeeded: ['Chair, Birth Ball, or Yoga Block'],
    recommendedReps: '8 - 10 slow conscious breaths',
    breathingTechnique: 'Inhale to expand (relax pelvic floor) • Exhale to gently lift and hug baby toward spine.',
    executionSteps: [
      'Sit upright with ribs stacked directly over pelvis, hands placed on side ribs.',
      'Inhale deeply through nose for 3-4 seconds, allowing ribcage to expand wide like an umbrella and pelvic floor to yield and lengthen.',
      'Exhale gently for 4-5 seconds through pursed lips, lifting pelvic floor as if drawing a tissue from a box.',
      'Gently engage deep transverse abdominals without tucking tailbone or clinching buttocks.'
    ],
    modifications: {
      firstTrimester: 'Can be practiced seated or in side-lying position.',
      secondTrimester: 'Seated on an exercise ball helps relieve pelvic girdle pressure.',
      thirdTrimester: 'Focus equally on the relaxation phase of the breath to prepare pelvic muscles for birth opening.',
      pelvicGirdlePain: 'Keep knees shoulder-width apart without crossing legs.'
    },
    youtubeVideoId: 'mTgnkua35pg',
    youtubeChannel: 'Pregnancy and Postpartum TV',
    youtubeTitle: 'Pregnancy Exercise for an Easier Birth & 360 Breathing Techniques'
  },
  {
    id: 'prenatal-seated-dumbbell-curl-press',
    name: 'Supported Seated Dumbbell Curl & Postural Press',
    subtitle: 'Functional arm & shoulder stamina • Safe seated posture • Postpartum baby carrying prep',
    category: 'Upper Body & Posture',
    trimestersSafe: ['Trimester 1', 'Trimester 2', 'Trimester 3', 'Postpartum'],
    targetMuscles: 'Biceps Brachii, Anterior Deltoids, Rhomboids, Scapular Retractors, Core Stabilizers',
    benefits: 'Safely builds arm, bicep, and shoulder stamina required for holding and carrying a newborn baby (averaging 8-12 lbs + car seat) without causing abdominal midline doming. Seated support prevents orthostatic lightheadedness, eliminates fall risks, and maintains pelvis alignment.',
    safetyCues: [
      'Sit tall on a sturdy chair, workout bench, or birth ball with feet flat and planted wider than hips.',
      'Hold light dumbbells (3 - 8 lbs / 1.5 - 4 kg) with a comfortable neutral hammer grip (palms facing inward).',
      'Inhale to prepare; exhale as you curl weights to shoulders and press overhead without arching lower back.',
      'Keep ribs stacked over pelvis without flaring chest or leaning backward.'
    ],
    contraindications: [
      'Avoid heavy weights that trigger breath holding (Valsalva maneuver) or belly coning.',
      'Do not hyperextend lower spine or push weights backward behind head plane.',
      'If dizziness occurs, pause and rest with feet firmly grounded.'
    ],
    equipmentNeeded: ['Light Pair of Dumbbells (3 - 8 lbs / 1.5 - 4 kg)', 'Sturdy Chair or Birth Ball'],
    recommendedReps: '10 - 12 controlled reps',
    breathingTechnique: 'Inhale as dumbbells lower • Exhale as you curl and press overhead, gently hugging baby to spine.',
    executionSteps: [
      'Sit upright on chair with feet wide for belly room and spine aligned in neutral.',
      'Hold dumbbells at your sides with palms facing inward (neutral hammer grip).',
      'Exhale and curl dumbbells smoothly up toward shoulders while keeping elbows close to torso.',
      'Continue pressing dumbbells straight overhead to soft elbow extension (do not lock elbows).',
      'Inhale and lower under full control back to shoulders, then smoothly down to sides.'
    ],
    modifications: {
      firstTrimester: 'Can be performed seated or standing with 5-10 lb dumbbells.',
      secondTrimester: 'Always perform seated on chair or birth ball to support pelvic floor and eliminate fall risk.',
      thirdTrimester: 'Use light 3-5 lb dumbbells or resistance water bottles, focusing on posture and breath cadence.',
      pelvicGirdlePain: 'Keep feet parallel and planted squarely on floor; avoid asymmetric leg positioning.'
    },
    youtubeVideoId: '_5bIiWEdfUo',
    youtubeChannel: 'April Hamilton',
    youtubeTitle: 'Dumbbell Bicep Curl & Arm Stamina | Prenatal + Pregnancy Workouts'
  },
  {
    id: 'prenatal-bird-dog-grounded',
    name: 'Supported Bird Dog (Belly-Safe Core & Glute Stability)',
    subtitle: 'Spinal alignment • Anti-rotation stability • Diastasis recti safe',
    category: 'Pelvic Floor & Core',
    trimestersSafe: ['Trimester 1', 'Trimester 2', 'Trimester 3', 'Postpartum'],
    targetMuscles: 'Erector Spinae, Gluteus Maximus, Transverse Abdominis, Deltoids',
    benefits: 'Strengthens posterior chain and cross-body diagonal sling without placing stress on the linea alba or causing belly doming.',
    safetyCues: [
      'On all fours with wrists under shoulders and knees under hips. Place a pillow under knees if sensitive.',
      'Keep belly supported by engaging transverse core before lifting limbs.',
      'Keep neck neutral by gazing at the mat between hands.'
    ],
    contraindications: [
      'Do not allow lower back to arch or belly to sag toward floor.',
      'If pubic symphysis pain occurs, slide toe along floor instead of lifting leg.'
    ],
    equipmentNeeded: ['Yoga Mat', 'Knee Cushion (optional)'],
    recommendedReps: '8 - 10 alternating reps per side',
    breathingTechnique: 'Inhale on all fours • Exhale as you extend arm and opposite leg, bracing core.',
    executionSteps: [
      'Start in quadruped tabletop position on hands and knees.',
      'Inhale to prepare, feeling 360° rib expansion.',
      'Exhale, gently hug baby inward, and extend right arm forward and left leg backward until parallel to floor.',
      'Hold for 2 seconds with hips square to the ground, then return with control and switch sides.'
    ],
    modifications: {
      firstTrimester: 'Standard bird dog with arm and opposite leg lift.',
      secondTrimester: 'Slide toe along floor if balance feels unstable.',
      thirdTrimester: 'Lift one limb at a time (just arm, then just leg) to protect balance.',
      pelvicGirdlePain: 'Keep leg low to floor to prevent sacroiliac joint torque.'
    },
    youtubeVideoId: 'CBPKeAkqyaw',
    youtubeChannel: 'April Hamilton',
    youtubeTitle: 'Bird Dog | Prenatal + Pregnancy Safe Core Exercise'
  },
  {
    id: 'prenatal-cat-cow-mobility',
    name: 'Gentle Cat-Cow Lumbar Decompression',
    subtitle: 'Relieves lower back ache • Fetal optimal positioning • Pelvic tilt mobility',
    category: 'Pelvic Floor & Core',
    trimestersSafe: ['Trimester 1', 'Trimester 2', 'Trimester 3', 'Postpartum'],
    targetMuscles: 'Spinal Extensors, Rectus Abdominis (Gentle), Pelvis',
    benefits: 'Eases lower back compression caused by anterior pelvic tilt and growing baby weight; encourages baby into optimal anterior position for labor.',
    safetyCues: [
      'Move gently through your active pain-free range of motion.',
      'In cow pose, do not drop belly forcefully or hyperextend lower spine.',
      'Keep shoulders relaxed away from ears.'
    ],
    contraindications: [
      'Avoid deep extreme spinal hyperextension.',
      'Wrist discomfort: use fists or place forearms on a chair or birth ball.'
    ],
    equipmentNeeded: ['Yoga Mat'],
    recommendedReps: '8 - 10 gentle flowing repetitions',
    breathingTechnique: 'Inhale on cow pose (chest forward, gentle tilt) • Exhale on cat pose (round spine, baby to spine).',
    executionSteps: [
      'Position hands beneath shoulders and knees beneath hips with a neutral spine.',
      'Inhale, gently draw chest through shoulders, looking slightly forward (cow pose).',
      'Exhale, press hands into the mat, round upper and mid back gently, letting head release toward floor (cat pose).',
      'Flow smoothly with your natural breathing rhythm.'
    ],
    modifications: {
      firstTrimester: 'Standard full gentle mobility.',
      secondTrimester: 'Keep the cow phase shallow, focusing more on gentle rounding in cat.',
      thirdTrimester: 'Can be performed seated on a birth ball using pelvic tilts.',
      pelvicGirdlePain: 'Widen knees slightly wider than hip-width.'
    },
    youtubeVideoId: 'diQcRPd22M0',
    youtubeChannel: 'April Hamilton',
    youtubeTitle: 'Cat Cow | Prenatal + Pregnancy Pelvic Mobility'
  },
  {
    id: 'prenatal-side-lying-clamshell',
    name: 'Supported Side-Lying Clamshells (Pelvic Girdle Shield)',
    subtitle: 'Gluteus medius • Stabilizes sacroiliac joint • Relieves hip bursitis',
    category: 'Lower Body & Stability',
    trimestersSafe: ['Trimester 1', 'Trimester 2', 'Trimester 3', 'Postpartum'],
    targetMuscles: 'Gluteus Medius, Gluteus Minimus, Deep Hip External Rotators',
    benefits: 'The gold-standard physical therapy movement for preventing and rehabilitating Pregnancy-Related Pelvic Girdle Pain (PGP) and Sciatica by strengthening the lateral hip stabilizers.',
    safetyCues: [
      'Lie on your side with head supported on a pillow and a pillow under your belly.',
      'Hips stacked vertically; do not let top hip roll backward during the movement.',
      'Keep feet glued together as knees open like a clamshell.'
    ],
    contraindications: [
      'Rolling hips backward to cheat range of motion.',
      'Lifting knee past the point where pelvis tilts.'
    ],
    equipmentNeeded: ['Yoga Mat', 'Pillow or Yoga Block'],
    recommendedReps: '10 - 15 controlled reps per side',
    breathingTechnique: 'Inhale with knees together • Exhale as you rotate top knee open, activating side glute.',
    executionSteps: [
      'Lie on your left side with knees bent at 90° and hips at 45°, feet aligned with your spine.',
      'Place a pillow under your head and another between your knees for joint support.',
      'Keeping feet together, exhale and lift your top knee as high as possible without rotating your pelvis backward.',
      'Pause for 1 second at top squeeze, then lower with control.'
    ],
    modifications: {
      firstTrimester: 'Standard clamshell on floor.',
      secondTrimester: 'Add a light loop resistance band around thighs above knees if comfortable.',
      thirdTrimester: 'Use a wedge pillow under belly and support upper torso.',
      pelvicGirdlePain: 'Perform with smaller range of motion without resistance band.'
    },
    youtubeVideoId: 'EByLjnoF2PU',
    youtubeChannel: 'April Hamilton',
    youtubeTitle: 'Clamshell | Prenatal + Pregnancy Workouts'
  },
  {
    id: 'prenatal-wide-box-squat',
    name: 'Wide-Stance Supported Box Squat',
    subtitle: 'Functional leg power • Labor prep • Safe pelvic base of support',
    category: 'Lower Body & Stability',
    trimestersSafe: ['Trimester 1', 'Trimester 2', 'Trimester 3', 'Postpartum'],
    targetMuscles: 'Quadriceps, Gluteus Maximus, Adductors, Calves',
    benefits: 'Builds vital quad and glute strength for carrying gestational weight and enduring labor stages, with the safety of a chair/box behind to prevent loss of balance.',
    safetyCues: [
      'Stand with feet slightly wider than shoulder-width, toes turned out 15-30° to create space for your belly.',
      'Place a sturdy chair or bench behind you as a target.',
      'Keep chest proud and drive knees out over second toes as you sit back.'
    ],
    contraindications: [
      'Do not bounce off the chair seat.',
      'Avoid deep squatting without support if pelvic girdle pain is severe.'
    ],
    equipmentNeeded: ['Sturdy Chair or Workout Bench'],
    recommendedReps: '10 - 12 controlled reps',
    breathingTechnique: 'Inhale as you sit back toward chair • Exhale as you drive through heels to stand, gently lifting pelvic floor.',
    executionSteps: [
      'Stand 3-4 inches in front of chair with wide, stable base.',
      'Inhale, hinge hips back and bend knees, lowering under control until glutes lightly tap the chair.',
      'Keep torso upright and chest open.',
      'Exhale, press firmly through your heels, and return to standing without locking out knees.'
    ],
    modifications: {
      firstTrimester: 'Can hold light dumbbells at chest level.',
      secondTrimester: 'Use bodyweight or hold onto a wall/countertop for stability.',
      thirdTrimester: 'Keep squat depth shallow (above parallel) and hold countertop for balance.',
      pelvicGirdlePain: 'Narrow stance slightly and reduce depth to avoid shearing forces.'
    },
    youtubeVideoId: 'B_9aaDBDeI0',
    youtubeChannel: 'April Hamilton',
    youtubeTitle: 'Bodyweight Box Squat | Prenatal + Pregnancy Workouts'
  },
  {
    id: 'prenatal-incline-glute-bridge',
    name: 'Elevated Incline Glute Bridge (Vena Cava Safe)',
    subtitle: 'Posterior chain • Sacral support • Zero flat-on-back pressure',
    category: 'Lower Body & Stability',
    trimestersSafe: ['Trimester 1', 'Trimester 2', 'Trimester 3', 'Postpartum'],
    targetMuscles: 'Gluteus Maximus, Hamstrings, Pelvic Floor',
    benefits: 'Strengthens glutes and hamstrings to offset postural changes while elevating the upper back and shoulders on a bolster/bench to completely prevent vena cava compression.',
    safetyCues: [
      'Upper back and shoulders supported on a bench, sofa, or inclined wedge pillow (30-45° angle).',
      'Feet flat on the floor hip-width apart.',
      'Drive hips up to neutral alignment; do not hyperextend lower spine.'
    ],
    contraindications: [
      'Do not perform flat on floor after week 16.',
      'Avoid arching lower back at peak extension.'
    ],
    equipmentNeeded: ['Bench, Sofa, or Incline Wedge Cushion'],
    recommendedReps: '10 - 12 reps',
    breathingTechnique: 'Inhale at bottom • Exhale as you press through heels and lift hips, engaging glutes.',
    executionSteps: [
      'Rest upper shoulder blades on an inclined support, knees bent at 90°, feet planted flat on floor.',
      'Inhale, letting hips lower comfortably toward floor.',
      'Exhale, press through heels, and lift hips upward until thighs and torso form a straight line.',
      'Squeeze glutes for 1 second, then lower with control.'
    ],
    modifications: {
      firstTrimester: 'Can be done flat on floor or elevated.',
      secondTrimester: 'Always use upper back incline elevation.',
      thirdTrimester: 'Place a soft Pilates ball or yoga block between thighs to support pelvic alignment.',
      pelvicGirdlePain: 'Squeeze a block between knees to stabilize the pubic bone.'
    },
    youtubeVideoId: 'U6pi-zCgFBY',
    youtubeChannel: 'April Hamilton',
    youtubeTitle: 'Glute Bridge | Prenatal + Pregnancy Workouts'
  },
  {
    id: 'prenatal-seated-band-row',
    name: 'Seated Resistance Band Posture Row',
    subtitle: 'Combats rounded shoulders • Upper back strength • Labor stamina',
    category: 'Upper Body & Posture',
    trimestersSafe: ['Trimester 1', 'Trimester 2', 'Trimester 3', 'Postpartum'],
    targetMuscles: 'Rhomboids, Latissimus Dorsi, Middle Trapezius, Biceps',
    benefits: 'Counterbalances the forward pull of breast tissue and growing belly, preventing thoracic kyphosis, neck tension, and mid-back pain.',
    safetyCues: [
      'Sit tall on a chair or birth ball with spine lengthened.',
      'Anchor resistance band around feet or a sturdy post at chest height.',
      'Pull elbows back close to ribcage, squeezing shoulder blades together.'
    ],
    contraindications: [
      'Shrugging shoulders up toward ears.',
      'Leaning backward excessively with momentum.'
    ],
    equipmentNeeded: ['Resistance Band', 'Chair or Birth Ball'],
    recommendedReps: '12 - 15 smooth reps',
    breathingTechnique: 'Inhale with arms extended • Exhale as you pull band toward ribs, drawing shoulder blades back.',
    executionSteps: [
      'Sit tall with knees wide enough to accommodate belly.',
      'Hold band handles with arms extended at chest height.',
      'Exhale, drive elbows back in a rowing motion, pinching shoulder blades together.',
      'Pause for 1 second at peak contraction, then slowly extend arms on inhalation.'
    ],
    modifications: {
      firstTrimester: 'Can be done seated or standing.',
      secondTrimester: 'Perform seated on a birth ball to incorporate gentle pelvic balancing.',
      thirdTrimester: 'Keep resistance moderate to focus on pure postural endurance.',
      pelvicGirdlePain: 'Seated on a supportive stable chair with feet grounded.'
    },
    youtubeVideoId: 'ZJA4xjVAsRc',
    youtubeChannel: 'April Hamilton',
    youtubeTitle: 'Single Arm Split Stance Row | Prenatal + Pregnancy Workouts'
  },
  {
    id: 'prenatal-incline-wall-pushup',
    name: 'Elevated Wall or Countertop Push-Up',
    subtitle: 'Chest & arm strength • Core stability • Zero belly coning pressure',
    category: 'Upper Body & Posture',
    trimestersSafe: ['Trimester 1', 'Trimester 2', 'Trimester 3', 'Postpartum'],
    targetMuscles: 'Pectoralis Major, Anterior Deltoids, Triceps, Deep Core',
    benefits: 'Maintains upper body pushing strength for lifting and handling baby postpartum while completely eliminating intra-abdominal coning and diastasis recti strain.',
    safetyCues: [
      'Place hands on a wall or high countertop slightly wider than shoulders.',
      'Step feet back until body forms an inclined plank angle.',
      'Keep body in a straight line from heels to ears without letting belly sag.'
    ],
    contraindications: [
      'Floor pushups after first trimester (causes severe abdominal coning).',
      'Flaring elbows out horizontally at 90°.'
    ],
    equipmentNeeded: ['Sturdy Wall or Kitchen Countertop'],
    recommendedReps: '10 - 12 reps',
    breathingTechnique: 'Inhale as you lower chest toward wall • Exhale as you press away to starting position.',
    executionSteps: [
      'Stand facing wall, hands flat at shoulder height.',
      'Step back 2-3 feet so body is at a gentle incline.',
      'Inhale, bend elbows at a 45° angle, lowering chest toward wall.',
      'Exhale, press through palms to return to starting position while gently hugging baby to spine.'
    ],
    modifications: {
      firstTrimester: 'Can use a sturdy bench or countertop incline.',
      secondTrimester: 'Use high countertop or wall to reduce core load.',
      thirdTrimester: 'Perform upright against wall with smaller forward lean.',
      pelvicGirdlePain: 'Keep feet hip-width apart and evenly weighted.'
    },
    youtubeVideoId: 'QIbewVCF1gQ',
    youtubeChannel: 'The Mom Fit Hub',
    youtubeTitle: 'Wall Push-Ups for Pregnancy | Safe Upper Body Strength'
  },
  {
    id: 'prenatal-supported-malasana-squat',
    name: 'Supported Deep Malasana Squat (Labor & Perineal Prep)',
    subtitle: 'Pelvic floor lengthening • Birth canal preparation • Hip mobility',
    category: 'Mobility & Labor Prep',
    trimestersSafe: ['Trimester 1', 'Trimester 2', 'Trimester 3', 'Postpartum'],
    targetMuscles: 'Adductors, Pelvic Floor, Ankles, Hip Flexors',
    benefits: 'Widens the pelvic outlet by up to 28-30% and teaches the mother to completely release and soften the perineum and pelvic floor muscles in preparation for physiological labor.',
    safetyCues: [
      'Always support hips on one or two yoga blocks, a low stool, or birth ball.',
      'Feet wider than hips with toes angled outwards 30-45°.',
      'Hands at prayer position in front of heart with elbows gently nudging thighs open.'
    ],
    contraindications: [
      'If baby is in breech position after week 34, consult OB before deep squatting.',
      'Severe hemorrhoids or pubic symphysis separation (SPD): avoid deep squats.'
    ],
    equipmentNeeded: ['1-2 Yoga Blocks or Sturdy Low Stool'],
    recommendedReps: 'Hold for 5 - 8 slow diaphragmatic breaths',
    breathingTechnique: 'Inhale deeply into pelvic floor, visualizing blossoming and releasing tension.',
    executionSteps: [
      'Place yoga block on mat. Stand in front with feet wider than shoulder-width.',
      'Lower hips to sit firmly onto the block.',
      'Bring palms together at heart center, gently pressing elbows against inner knees.',
      'Breathe slowly and deeply, consciously relaxing your pelvic floor on every inhalation.'
    ],
    modifications: {
      firstTrimester: 'Can be done unsupported or supported.',
      secondTrimester: 'Use 2 stacked blocks for comfortable elevation.',
      thirdTrimester: 'Sit on a birth ball or 2 blocks; hold partner or countertop for easy standing.',
      pelvicGirdlePain: 'Skip deep squats; use seated tailor pose instead.'
    },
    youtubeVideoId: 'q9XIOaLHJNw',
    youtubeChannel: 'April Hamilton',
    youtubeTitle: 'Deep Squat Hold | Prenatal + Pregnancy Workouts'
  },
  {
    id: 'prenatal-wide-childs-pose',
    name: 'Wide-Knee Restorative Child\'s Pose',
    subtitle: 'Relieves pelvic floor tension • Decompresses sacrum • Mind-body calming',
    category: 'Mobility & Labor Prep',
    trimestersSafe: ['Trimester 1', 'Trimester 2', 'Trimester 3', 'Postpartum'],
    targetMuscles: 'Latissimus Dorsi, Thoracolumbar Fascia, Hip Abductors, Pelvic Floor',
    benefits: 'Provides gentle spinal traction, releases tension in the lower back and sacrum, and creates abundant space for the pregnant belly between widely spaced knees.',
    safetyCues: [
      'Knees spread as wide as the yoga mat, big toes touching.',
      'Rest chest on a supportive bolster or folded pillows if belly feels crowded.',
      'Rest forehead on mat or block and breathe slowly.'
    ],
    contraindications: [
      'Knee joint pain: place a rolled towel behind knees.',
      'Do not compress the belly against thighs.'
    ],
    equipmentNeeded: ['Yoga Mat', 'Bolster or Pillows (optional)'],
    recommendedReps: 'Hold for 1 - 2 minutes of restorative breathing',
    breathingTechnique: 'Slow diaphragmatic breaths expanding upper back and lower pelvis.',
    executionSteps: [
      'Kneel on mat with big toes touching and knees opened wide to mat edges.',
      'Hinge hips back toward heels.',
      'Walk hands forward, lowering torso between thighs.',
      'Rest forehead on mat, block, or bolster, allowing lower back and pelvic floor to soften completely.'
    ],
    modifications: {
      firstTrimester: 'Standard wide child\'s pose.',
      secondTrimester: 'Place a bolster vertically under chest and head.',
      thirdTrimester: 'Rest chest on a birth ball or stack of pillows for higher elevation.',
      pelvicGirdlePain: 'Keep knees hip-width if wide knees cause groin discomfort.'
    },
    youtubeVideoId: 'nC63qwY8Yk0',
    youtubeChannel: 'RAI Chiropractic',
    youtubeTitle: 'A. Pregnancy Wide Leg Child’s Pose Relief'
  }
];

export const PRENATAL_ROUTINES: PrenatalRoutine[] = [
  {
    id: 'routine-trimester-1',
    title: 'Trimester 1: Energy, Posture & Dumbbell Arm Prep',
    trimester: 'Trimester 1',
    durationMinutes: 16,
    description: 'Gentle, low-nausea routine establishing core-diaphragm connection, combating early fatigue, and building upper body carrying stamina with optional light dumbbells.',
    intensity: 'Gentle & Restorative',
    exercises: [
      { exerciseId: 'prenatal-360-breathing', repsOrDuration: '10 Breaths', restSeconds: 30, tip: 'Establish connection with pelvic floor expansion.' },
      { exerciseId: 'prenatal-seated-dumbbell-curl-press', repsOrDuration: '10 Reps', restSeconds: 45, tip: 'Keep neutral hammer grip and seated posture.' },
      { exerciseId: 'prenatal-cat-cow-mobility', repsOrDuration: '8 Reps', restSeconds: 30, tip: 'Keep movements gentle and fluid.' },
      { exerciseId: 'prenatal-bird-dog-grounded', repsOrDuration: '8 Reps/side', restSeconds: 45, tip: 'Maintain neutral spine without arching.' },
      { exerciseId: 'prenatal-wide-box-squat', repsOrDuration: '10 Reps', restSeconds: 45, tip: 'Keep feet slightly wider than hips.' },
      { exerciseId: 'prenatal-wide-childs-pose', repsOrDuration: '1 Minute', restSeconds: 0, tip: 'Rest and breathe deeply.' }
    ]
  },
  {
    id: 'routine-trimester-2',
    title: 'Trimester 2: Pelvic Stability, Glutes & Dumbbell Flow',
    trimester: 'Trimester 2',
    durationMinutes: 20,
    description: 'Targeted strengthening of glutes, arms, back, and hips to support growing belly weight, build arm stamina with light dumbbells, and shield against SI joint pain.',
    intensity: 'Moderate Strength',
    exercises: [
      { exerciseId: 'prenatal-360-breathing', repsOrDuration: '8 Breaths', restSeconds: 30, tip: 'Practice gentle baby hug on exhalation.' },
      { exerciseId: 'prenatal-seated-dumbbell-curl-press', repsOrDuration: '10-12 Reps', restSeconds: 45, tip: 'Light 3-5 lb dumbbells, seated upright on chair.' },
      { exerciseId: 'prenatal-side-lying-clamshell', repsOrDuration: '12 Reps/side', restSeconds: 30, tip: 'Keep pelvis vertically stacked without rolling.' },
      { exerciseId: 'prenatal-incline-glute-bridge', repsOrDuration: '10 Reps', restSeconds: 45, tip: 'Ensure upper back is elevated on bench or wedge.' },
      { exerciseId: 'prenatal-wide-box-squat', repsOrDuration: '12 Reps', restSeconds: 45, tip: 'Drive knees outward over second toes.' },
      { exerciseId: 'prenatal-incline-wall-pushup', repsOrDuration: '10 Reps', restSeconds: 45, tip: 'Keep body in straight incline plank.' },
      { exerciseId: 'prenatal-wide-childs-pose', repsOrDuration: '90 Seconds', restSeconds: 0, tip: 'Allow pelvic floor to soften and decompress.' }
    ]
  },
  {
    id: 'routine-trimester-3',
    title: 'Trimester 3: Birth Prep, Mobility, Light Dumbbells & Pelvic Opening',
    trimester: 'Trimester 3',
    durationMinutes: 18,
    description: 'Designed for the final stretch: widening pelvic outlet, releasing perineal tension, easing sacral pressure, seated light arm maintenance, and labor breathing practice.',
    intensity: 'Birth Preparation',
    exercises: [
      { exerciseId: 'prenatal-360-breathing', repsOrDuration: '10 Breaths', restSeconds: 30, tip: 'Focus on full surrender and relaxation on inhale.' },
      { exerciseId: 'prenatal-seated-dumbbell-curl-press', repsOrDuration: '8-10 Reps', restSeconds: 45, tip: 'Very light weights or cans; focus on rhythmic breathing.' },
      { exerciseId: 'prenatal-cat-cow-mobility', repsOrDuration: '8 Gentle Reps', restSeconds: 30, tip: 'Gentle spinal wave to help baby position.' },
      { exerciseId: 'prenatal-supported-malasana-squat', repsOrDuration: 'Hold 6 Breaths', restSeconds: 45, tip: 'Rest fully on yoga blocks to open pelvis.' },
      { exerciseId: 'prenatal-side-lying-clamshell', repsOrDuration: '10 Reps/side', restSeconds: 30, tip: 'Support belly with pillow.' },
      { exerciseId: 'prenatal-incline-wall-pushup', repsOrDuration: '8 Reps', restSeconds: 45, tip: 'Gentle upper body strength without core strain.' },
      { exerciseId: 'prenatal-wide-childs-pose', repsOrDuration: '2 Minutes', restSeconds: 0, tip: 'Completely let go of tension in jaw and pelvic floor.' }
    ]
  },
  {
    id: 'routine-postpartum',
    title: 'Postpartum / 4th Trimester: Gentle Core, Arms & Pelvic Reconnect',
    trimester: 'Postpartum',
    durationMinutes: 14,
    description: 'Gentle recovery routine for new mothers (after provider clearance) to safely awaken deep core, support diastasis recti healing, rebuild carrying arm stamina, and soothe posture.',
    intensity: 'Gentle & Restorative',
    exercises: [
      { exerciseId: 'prenatal-360-breathing', repsOrDuration: '10 Breaths', restSeconds: 30, tip: 'Reconnect with transverse abdominis without straining.' },
      { exerciseId: 'prenatal-seated-dumbbell-curl-press', repsOrDuration: '10 Reps', restSeconds: 45, tip: 'Rebuild postural upper back and carrying arm strength.' },
      { exerciseId: 'prenatal-cat-cow-mobility', repsOrDuration: '8 Reps', restSeconds: 30, tip: 'Gentle spinal movement.' },
      { exerciseId: 'prenatal-side-lying-clamshell', repsOrDuration: '10 Reps/side', restSeconds: 30, tip: 'Rebuild lateral hip stability.' },
      { exerciseId: 'prenatal-incline-glute-bridge', repsOrDuration: '10 Reps', restSeconds: 30, tip: 'Squeeze glutes at top with gentle pelvic floor lift.' },
      { exerciseId: 'prenatal-wide-childs-pose', repsOrDuration: '90 Seconds', restSeconds: 0, tip: 'Deep restorative resting posture.' }
    ]
  }
];
