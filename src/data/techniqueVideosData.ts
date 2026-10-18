import { TechniqueVideo } from '../types';

export const TECHNIQUE_VIDEOS_MAP: Record<string, TechniqueVideo> = {
  'barbell-back-squat': {
    youtubeId: 'ultWZbUMPL8',
    youtubeUrl: 'https://www.youtube.com/watch?v=ultWZbUMPL8',
    youtubeTitle: 'How to Squat: Proper Technique & Form Guide',
    youtubeChannel: 'Buff Dudes',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-squats-in-a-gym-43308-large.mp4',
    fallbackVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: '/src/assets/images/squat_3d_render_1791810126737.jpg',
    durationSeconds: 14,
    cameraAngles: ['Side View (Spine & Depth)', 'Front View (Knee Tracking)', '45° Posterior Angle'],
    phases: [
      {
        name: 'Unrack & Foot Stance',
        timestamp: 0,
        cue: 'Bar wedged across upper traps/rear delts, feet shoulder-width, toes turned 15-30° out.',
        biomechanicAngle: 'Torso: 0° vertical, Elbows pulled down'
      },
      {
        name: 'Eccentric Deceleration',
        timestamp: 4,
        cue: 'Inhale deep diaphragmatic breath (Valsalva), break at hips and knees simultaneously.',
        biomechanicAngle: 'Hip crease descending below top of patella'
      },
      {
        name: 'Bottom Position (Depth)',
        timestamp: 7,
        cue: 'Hit parallel or below. Keep knees tracking in line with second toes; avoid knee valgus cave.',
        biomechanicAngle: 'Knee angle: ~75-85°, Hip flexion: ~110°'
      },
      {
        name: 'Concentric Drive & Lockout',
        timestamp: 10,
        cue: 'Drive midfoot hard through floor. Push shoulders up into the bar simultaneously with hips.',
        biomechanicAngle: 'Triple extension: ankles, knees, hips'
      }
    ],
    keyCues: [
      'Root feet with 3-point tripod pressure (heel, big toe, pinky toe).',
      'Brace abdominal wall 360° before unhinging hips.',
      'Maintain vertical bar path directly over mid-foot throughout the entire rep.',
      'Drive knees outwards continuously against resistance.'
    ],
    commonFaults: [
      'Knee valgus collapse inward upon concentric turnaround.',
      'Lumbar spinal rounding / "butt wink" under heavy flexion load.',
      'Shifting weight onto the balls of the feet and raising heels off the floor.'
    ],
    doAndDont: [
      { doText: 'Descend until hip crease is below top of patella', dontText: 'Cutting depth high above parallel' },
      { doText: 'Keep chest proud and elbows tucked close to ribcage', dontText: 'Collapsing forward like a "good morning"' },
      { doText: 'Drive knees outward along angle of toes', dontText: 'Allowing knees to cave together internally' }
    ]
  },

  'barbell-bench-press': {
    youtubeId: '4Y2ZdHCOXok',
    youtubeUrl: 'https://www.youtube.com/watch?v=4Y2ZdHCOXok',
    youtubeTitle: 'How to Bench Press: Complete Form Tutorial',
    youtubeChannel: 'Buff Dudes',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-pushups-in-the-gym-43314-large.mp4',
    fallbackVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: '/src/assets/images/bench_3d_render_1791810139754.jpg',
    durationSeconds: 12,
    cameraAngles: ['Side View (Bar Path & Arch)', 'Front View (Elbow Tuck 60°)', 'Top Down Angle'],
    phases: [
      {
        name: 'Scapular Retraction & Unrack',
        timestamp: 0,
        cue: 'Pin shoulder blades back and down into the bench padding. Stack wrists vertically over forearms.',
        biomechanicAngle: 'Scapulae depressed & retracted'
      },
      {
        name: 'Controlled Descent',
        timestamp: 3,
        cue: 'Lower bar in slight J-curve toward lower sternum. Keep elbows tucked 45-70° to spare shoulder rotator cuffs.',
        biomechanicAngle: 'Elbow tuck: 60° angle to torso'
      },
      {
        name: 'Chest Touch / Pause',
        timestamp: 6,
        cue: 'Light contact at sternum without bouncing. Maintain leg drive and core tension.',
        biomechanicAngle: 'Forearms perpendicular to floor'
      },
      {
        name: 'Concentric Push & Lockout',
        timestamp: 9,
        cue: 'Drive feet into floor and press bar up and back toward eye level.',
        biomechanicAngle: 'Full elbow extension at lockout'
      }
    ],
    keyCues: [
      'Squeeze the bar aggressively with thumbs wrapped securely.',
      'Plant feet flat and generate isometric leg drive backward into the bench.',
      'Keep glutes glued to the pad at all times; do not lift hips.',
      'Press the bar in an arc: lower sternum to over shoulders.'
    ],
    commonFaults: [
      'Flaring elbows out at 90° (subacromial impingement hazard).',
      'Bouncing the heavy barbell forcefully off the ribcage.',
      'Lifting glutes off the bench to manufacture fake leverage.'
    ],
    doAndDont: [
      { doText: 'Tuck elbows at 45–70° relative to torso', dontText: 'Flaring elbows at 90° shoulder-level' },
      { doText: 'Sustain natural thoracic arch with glutes pinned', dontText: 'Lifting hips off bench to shorten range' },
      { doText: 'Lower with a controlled 2-second eccentric tempo', dontText: 'Free-falling bar and bouncing off sternum' }
    ]
  },

  'barbell-deadlift': {
    youtubeId: 'wYREQkVtvEc',
    youtubeUrl: 'https://www.youtube.com/watch?v=wYREQkVtvEc',
    youtubeTitle: 'How to Deadlift with Proper Form: Step by Step',
    youtubeChannel: 'Buff Dudes',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-athlete-lifting-weights-in-gym-43309-large.mp4',
    fallbackVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnailUrl: '/src/assets/images/deadlift_3d_render_1791810154346.jpg',
    durationSeconds: 15,
    cameraAngles: ['Side View (Spinal Neutrality)', 'Front View (Hip Wedge)', 'Diagonal Posterior'],
    phases: [
      {
        name: 'The Set-Up & Grip',
        timestamp: 0,
        cue: 'Bar over mid-foot (1 inch from shins). Feet hip-width. Hinge down and grip just outside legs.',
        biomechanicAngle: 'Bar 1" from shin, shins contact bar'
      },
      {
        name: 'Pulling Slack & Wedging',
        timestamp: 4,
        cue: 'Engage lats by squeezing armpits shut. Pull the click of slack out of the barbell plates.',
        biomechanicAngle: 'Chest proud, lats packed'
      },
      {
        name: 'Floor Break & Knee Clearance',
        timestamp: 8,
        cue: 'Push floor away through heels and mid-foot. Hips and chest rise at same rate.',
        biomechanicAngle: 'Barbell scraping shins'
      },
      {
        name: 'Hip Extension Lockout',
        timestamp: 11,
        cue: 'Drive hips into the bar, squeeze glutes. Avoid hyperextending lumbar backward.',
        biomechanicAngle: 'Standing erect, shoulders over hips'
      }
    ],
    keyCues: [
      'Do not squat the weight up; think of pushing the floor away into a leg press.',
      'Keep barbell in continuous physical contact with shins, knees, and thighs.',
      'Pack lats into back pockets to support spinal rigidity.',
      'Never round lumbar spine off the floor.'
    ],
    commonFaults: [
      'Hips shooting up first, turning lift into a stiff-legged good morning.',
      'Allowing bar to drift forward away from shins.',
      'Exaggerated lumbar hyperextension lean at lockout.'
    ],
    doAndDont: [
      { doText: 'Drag bar tightly against shins and thighs', dontText: 'Allowing bar to drift forward away from body' },
      { doText: 'Pull slack out of bar before lifting', dontText: 'Yanking violently from the floor' },
      { doText: 'Squeeze glutes to lock out tall', dontText: 'Leaning backward and hyperextending lumbar' }
    ]
  },

  'pull-up-chin-up': {
    youtubeId: 'eGo4IYlbE5g',
    youtubeUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g',
    youtubeTitle: 'How to Do a Pull Up - The Right Way (Proper Form)',
    youtubeChannel: 'Calisthenicmovement',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-on-a-pull-up-bar-43307-large.mp4',
    fallbackVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    thumbnailUrl: '/src/assets/images/pullup_3d_render_1791810171202.jpg',
    durationSeconds: 12,
    cameraAngles: ['Rear Posterior View (Lat Wing)', 'Front Core View', 'Side Angle'],
    phases: [
      {
        name: 'Dead Hang & Scapular Pull',
        timestamp: 0,
        cue: 'Full extension at elbows. Depress scapulae downward into active hang before bending elbows.',
        biomechanicAngle: 'Scapular depression 15-20°'
      },
      {
        name: 'Vertical Pull & Chest to Bar',
        timestamp: 3,
        cue: 'Drive elbows down into your back pockets. Pull until chin clears bar or upper chest touches.',
        biomechanicAngle: 'Elbows tucked down and back'
      },
      {
        name: 'Apex Contraction Pause',
        timestamp: 6,
        cue: 'Squeeze lats and mid-back rhomboids for a distinct 0.5-second pause.',
        biomechanicAngle: 'Full lat shortening'
      },
      {
        name: 'Controlled Eccentric Stretch',
        timestamp: 9,
        cue: 'Lower under control for 2-3 seconds to full dead-hang stretch. Avoid dropping down violently.',
        biomechanicAngle: 'Slow lowering without swing'
      }
    ],
    keyCues: [
      'Cross ankles or keep legs straight with hollow-body core brace.',
      'Lead with chest towards the bar, not your chin.',
      'Avoid swinging or using leg kipping momentum for strict strength.',
      'Achieve full elbow extension at the bottom of every rep.'
    ],
    commonFaults: [
      'Kipping legs and using hip swing instead of lat power.',
      'Half-reps (not locking out bottom or failing to clear bar).',
      'Shoulders shrugging up into ears at the top.'
    ],
    doAndDont: [
      { doText: 'Pull elbows down toward hip pockets', dontText: 'Using violent leg swings / kipping' },
      { doText: 'Descend to full elbow lockout every rep', dontText: 'Bouncing at 90-degree half-hang' },
      { doText: 'Keep core hollow and ribcage depressed', dontText: 'Excessive flailing with hyperextended spine' }
    ]
  },

  'overhead-press': {
    youtubeId: '2yjwXTZQDDI',
    youtubeUrl: 'https://www.youtube.com/watch?v=2yjwXTZQDDI',
    youtubeTitle: 'How to Overhead Press with Proper Form: Step by Step',
    youtubeChannel: 'Buff Dudes',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-athlete-lifting-weights-in-gym-43309-large.mp4',
    thumbnailUrl: '/src/assets/images/app_hero_3d_1791810105161.jpg',
    durationSeconds: 11,
    cameraAngles: ['Side View (Head Clearance)', 'Front View (Vertical Forearms)'],
    phases: [
      {
        name: 'Front Rack Stance',
        timestamp: 0,
        cue: 'Bar resting on anterior delts/clavicles. Forearms vertical, glutes and quads squeezed tight.',
        biomechanicAngle: 'Vertical forearms under bar'
      },
      {
        name: 'Head Tilt & Upward Drive',
        timestamp: 3,
        cue: 'Tilt head slightly back to clear chin. Drive bar vertically straight up over mid-foot.',
        biomechanicAngle: 'Straight vertical bar trajectory'
      },
      {
        name: 'Head Through & Lockout',
        timestamp: 6,
        cue: 'Push head through "window" under bar once bar clears forehead. Shrug traps at top.',
        biomechanicAngle: 'Bar stacked over shoulders, hips, ankles'
      },
      {
        name: 'Controlled Lowering',
        timestamp: 8,
        cue: 'Lower under control to clavicles, tilting head back slightly to clear nose.',
        biomechanicAngle: 'Smooth eccentric return'
      }
    ],
    keyCues: [
      'Squeeze glutes and brace abs as hard as possible to protect lower back.',
      'Wrists kept straight and stacked over elbows.',
      'Press straight up, not looped forward in a wide arc.'
    ],
    commonFaults: [
      'Excessive backward lean into a pseudo-incline bench.',
      'Pressing forward instead of vertical.',
      'Bending knees to cheat with leg momentum (unless doing push press).'
    ],
    doAndDont: [
      { doText: 'Lock glutes and keep core braced rigid', dontText: 'Arching lower back backward to cheat' },
      { doText: 'Push head forward through window at lockout', dontText: 'Leaving bar in front of center of gravity' }
    ]
  },

  'standard-pushup': {
    youtubeId: 'IODxDxX7oi4',
    youtubeUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4',
    youtubeTitle: 'The Perfect Push Up - Step by Step Tutorial',
    youtubeChannel: 'Calisthenicmovement',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-pushups-in-the-gym-43314-large.mp4',
    thumbnailUrl: '/src/assets/images/bench_3d_render_1791810139754.jpg',
    durationSeconds: 10,
    cameraAngles: ['Side View (Plank Line)', 'Top 45° Angle (Elbow Arrow)'],
    phases: [
      {
        name: 'High Plank Setup',
        timestamp: 0,
        cue: 'Hands under shoulders, fingers spread. Body forms rigid straight line from heels to crown.',
        biomechanicAngle: 'Straight 180° spinal alignment'
      },
      {
        name: 'Arrow Descent',
        timestamp: 3,
        cue: 'Lower until chest touches floor or is 1 inch away. Elbows track back in an arrow shape (~45°).',
        biomechanicAngle: 'Elbow angle 45-60° to torso'
      },
      {
        name: 'Strong Push & Protract',
        timestamp: 6,
        cue: 'Press the floor away aggressively. Protract shoulder blades slightly at top for serratus anterior.',
        biomechanicAngle: 'Full arm extension with active chest'
      }
    ],
    keyCues: [
      'Maintain tight glutes and posterior pelvic tilt.',
      'Neck neutral: eyes looking 6 inches ahead of hands.',
      'Full range of motion: chest to floor, lock elbows at top.'
    ],
    commonFaults: [
      'Sagging hips / swayed lower back.',
      'Flaring elbows straight out to sides like a "T".',
      'Craning neck down to fake reaching the floor.'
    ],
    doAndDont: [
      { doText: 'Elbows track at 45° arrow angle', dontText: 'Flaring elbows at 90° T-shape' },
      { doText: 'Full plank tension from heels to head', dontText: 'Sagging hips or piking glutes in air' }
    ]
  },

  'barbell-bicep-curl': {
    youtubeId: 'kwG2ipFRgfo',
    youtubeUrl: 'https://www.youtube.com/watch?v=kwG2ipFRgfo',
    youtubeTitle: 'How to Barbell Bicep Curl: Strict Form & Mistakes',
    youtubeChannel: 'Buff Dudes',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-with-dumbbells-43306-large.mp4',
    thumbnailUrl: '/src/assets/images/app_hero_3d_1791810105161.jpg',
    durationSeconds: 10,
    cameraAngles: ['Side View (Elbow Anchor)', 'Front View (Bicep Peak)'],
    phases: [
      {
        name: 'Setup & Supinated Grip',
        timestamp: 0,
        cue: 'Stand tall, shoulders pinned back. Underhand grip shoulder-width apart.',
        biomechanicAngle: 'Elbows pinned to sides'
      },
      {
        name: 'Concentric Bicep Curl',
        timestamp: 3,
        cue: 'Curl bar up toward chest while keeping elbows stationary by your ribs. No torso rocking.',
        biomechanicAngle: 'Elbow flexion from 180° to 45°'
      },
      {
        name: 'Peak Squeeze & Slow Lower',
        timestamp: 6,
        cue: 'Squeeze biceps intensely at top. Lower slowly for 3 seconds to complete stretch.',
        biomechanicAngle: '3-second eccentric stretch'
      }
    ],
    keyCues: [
      'Keep upper arms perpendicular to floor throughout movement.',
      'Squeeze bar hard and resist using lumbar rocking.',
      'Full eccentric stretch at the bottom before initiating next rep.'
    ],
    commonFaults: [
      'Swinging hips and back to heave weight up.',
      'Moving elbows forward to turn curl into a front raise.',
      'Dropping weight rapidly without eccentric tension.'
    ],
    doAndDont: [
      { doText: 'Keep elbows locked at sides like hinges', dontText: 'Swinging torso and thrusting hips' },
      { doText: 'Lower under strict 3-second control', dontText: 'Letting weights drop freely' }
    ]
  },

  'dumbbell-lateral-raise': {
    youtubeId: '3VcKaXpzqRo',
    youtubeUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo',
    youtubeTitle: 'Dumbbell Lateral Raise: Proper Form Guide for Shoulder Width',
    youtubeChannel: 'Buff Dudes',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-with-dumbbells-43306-large.mp4',
    thumbnailUrl: '/src/assets/images/app_hero_3d_1791810105161.jpg',
    durationSeconds: 10,
    cameraAngles: ['Front View (Scapular Plane)', 'Side Angle'],
    phases: [
      {
        name: 'Setup & Slight Lean',
        timestamp: 0,
        cue: 'Dumbbells at sides, slight 10° forward lean at hips, slight bend in elbows.',
        biomechanicAngle: '10° torso lean, 15° elbow bend'
      },
      {
        name: 'Raise in Scapular Plane',
        timestamp: 3,
        cue: 'Lead with elbows slightly forward in scapular plane (30° forward of coronal plane).',
        biomechanicAngle: 'Raise to shoulder height (90°)'
      },
      {
        name: 'Parallel Hold & Lower',
        timestamp: 6,
        cue: 'Stop at parallel with shoulders. Lower slowly with deltoid control.',
        biomechanicAngle: 'Controlled 2-sec eccentric'
      }
    ],
    keyCues: [
      'Think "push walls away" rather than lifting weights straight up.',
      'Do not shrug traps up toward ears.',
      'Keep pinky slightly higher than or level with thumb.'
    ],
    commonFaults: [
      'Shrugging traps and using neck muscles.',
      'Swinging body backwards to heave heavy dumbbells.',
      'Raising hands higher than elbows.'
    ],
    doAndDont: [
      { doText: 'Lead with elbows in scapular plane', dontText: 'Shrugging traps up to neck' },
      { doText: 'Use moderate weight with strict control', dontText: 'Swinging body with heavy momentum' }
    ]
  },

  'bulgarian-split-squat': {
    youtubeId: '2C-uNgKwPLE',
    youtubeUrl: 'https://www.youtube.com/watch?v=2C-uNgKwPLE',
    youtubeTitle: 'Bulgarian Split Squat: Stop Doing It Wrong (Proper Form)',
    youtubeChannel: 'Scott Herman Fitness',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-exercising-in-a-gym-43312-large.mp4',
    thumbnailUrl: '/src/assets/images/squat_3d_render_1791810126737.jpg',
    durationSeconds: 12,
    cameraAngles: ['Side View (Front Shin & Hip Hinge)', 'Front View (Pelvic Alignment)'],
    phases: [
      {
        name: 'Bench Lunge Setup',
        timestamp: 0,
        cue: 'Rear foot laces down on bench. Front foot out so knee is stacked over midfoot when descending.',
        biomechanicAngle: 'Hips squared forward'
      },
      {
        name: 'Deep Unilateral Descent',
        timestamp: 4,
        cue: 'Descend until front thigh is parallel to floor and rear knee hovers 1 inch above ground.',
        biomechanicAngle: 'Front knee: 90°, Hip flexion: 90°'
      },
      {
        name: 'Front Heel Drive',
        timestamp: 8,
        cue: 'Drive through front heel and midfoot. Keep 85% of load on front leg.',
        biomechanicAngle: 'Vertical ascent through front quad'
      }
    ],
    keyCues: [
      'Slight forward torso lean shifts focus to glutes and keeps lower back safe.',
      'Keep front knee tracking in line with toes.',
      'Use rear leg primarily for balance, not driving force.'
    ],
    commonFaults: [
      'Pushing too much through the back foot on the bench.',
      'Front heel lifting off floor.',
      'Pelvis tilting or twisting sideways.'
    ],
    doAndDont: [
      { doText: 'Drive 85% through front heel and midfoot', dontText: 'Pushing off rear elevated foot' },
      { doText: 'Descend until front thigh hits parallel', dontText: 'Shortening range of motion' }
    ]
  },

  'plank-hold': {
    youtubeId: 'ASdvN_XEl_c',
    youtubeUrl: 'https://www.youtube.com/watch?v=ASdvN_XEl_c',
    youtubeTitle: 'The Perfect Plank - Step by Step Tutorial',
    youtubeChannel: 'Calisthenicmovement',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-plank-exercise-in-gym-43313-large.mp4',
    thumbnailUrl: '/src/assets/images/bench_3d_render_1791810139754.jpg',
    durationSeconds: 10,
    cameraAngles: ['Side View (Spine Line & Pelvis)'],
    phases: [
      {
        name: 'Forearm Setup',
        timestamp: 0,
        cue: 'Elbows directly under shoulders, forearms parallel on floor. Feet together or hip-width.',
        biomechanicAngle: 'Elbows 90° under shoulders'
      },
      {
        name: 'Posterior Pelvic Tilt',
        timestamp: 3,
        cue: 'Tuck tailbone, squeeze glutes hard, and pull belly button firmly toward spine.',
        biomechanicAngle: 'Flat neutral spine, no lumbar dip'
      },
      {
        name: 'Isometric Bracing (Tension)',
        timestamp: 6,
        cue: 'Actively pull elbows towards toes isometrically to amplify rectus abdominis activation.',
        biomechanicAngle: 'Full body tension'
      }
    ],
    keyCues: [
      'Do not let lower back sag or sway towards floor.',
      'Breathe steadily while maintaining tight abdominal brace.',
      'Keep head in line with spine; do not let chin drop to chest.'
    ],
    commonFaults: [
      'Sagging hips putting shear on lower lumbar.',
      'Hiking glutes up into a mountain pike.',
      'Holding breath instead of diaphragmatic breathing.'
    ],
    doAndDont: [
      { doText: 'Squeeze glutes and tuck pelvis', dontText: 'Sagging lower back towards floor' },
      { doText: 'Pull elbows toward toes isometrically', dontText: 'Piking hips up in the air' }
    ]
  },

  'incline-dumbbell-press': {
    youtubeId: '8iPEnn-ltC8',
    youtubeUrl: 'https://www.youtube.com/watch?v=8iPEnn-ltC8',
    youtubeTitle: 'Incline Dumbbell Bench Press: Upper Chest Growth',
    youtubeChannel: 'Scott Herman Fitness',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-pushups-in-the-gym-43314-large.mp4',
    thumbnailUrl: '/src/assets/images/bench_3d_render_1791810139754.jpg',
    durationSeconds: 12,
    cameraAngles: ['Side Angle 30° Incline', 'Front Angle'],
    phases: [
      {
        name: 'Bench Angle & Knee Kick',
        timestamp: 0,
        cue: 'Set bench to 30-45°. Kick dumbbells up with knees and plant feet firmly.',
        biomechanicAngle: 'Incline angle: 30° to 45°'
      },
      {
        name: 'Controlled Lowering',
        timestamp: 4,
        cue: 'Lower dumbbells to outer upper chest. Keep wrists directly above elbows.',
        biomechanicAngle: 'Elbows tucked 60°'
      },
      {
        name: 'Upper Chest Press',
        timestamp: 8,
        cue: 'Press dumbbells up and slightly inward in an arc without clanking them together.',
        biomechanicAngle: 'Full clavicular pectoral contraction'
      }
    ],
    keyCues: [
      'Retract scapulae against bench for shoulder safety.',
      'Do not set bench too steep (over 45° shifts load to front delts).',
      'Lower dumbbells with a 2-second eccentric tempo.'
    ],
    commonFaults: [
      'Setting bench at 60° turning it into a shoulder press.',
      'Flaring elbows out perpendicular to torso.'
    ],
    doAndDont: [
      { doText: 'Use 30° incline for upper chest bias', dontText: 'Setting angle too high over 45°' },
      { doText: 'Keep forearms vertical throughout', dontText: 'Clanking dumbbells aggressively at the top' }
    ]
  },

  'chest-dips': {
    youtubeId: '2z8JmcrW-As',
    youtubeUrl: 'https://www.youtube.com/watch?v=2z8JmcrW-As',
    youtubeTitle: 'How to Do Dips - Master The Dip (Chest & Triceps)',
    youtubeChannel: 'Calisthenicmovement',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-exercising-in-a-gym-43312-large.mp4',
    thumbnailUrl: '/src/assets/images/bench_3d_render_1791810139754.jpg',
    durationSeconds: 11,
    cameraAngles: ['Side View (Torso Lean & Depth)', 'Front Angle'],
    phases: [
      {
        name: 'Support Hold Setup',
        timestamp: 0,
        cue: 'Jump or step up onto dip bars. Lock elbows, depress shoulders down away from ears.',
        biomechanicAngle: 'Depressed scapulae, locked arms'
      },
      {
        name: 'Forward Lean & Descent',
        timestamp: 4,
        cue: 'Lean torso forward 20-30° to target chest. Descend until shoulders are level with elbows.',
        biomechanicAngle: 'Elbows at 90°, torso leaned forward'
      },
      {
        name: 'Strong Press to Lockout',
        timestamp: 8,
        cue: 'Press bars straight down, driving through palms. Push all the way back to full lockout.',
        biomechanicAngle: 'Full elbow lockout with depression'
      }
    ],
    keyCues: [
      'Keep torso tilted forward for chest; stay upright for triceps.',
      'Control the descent to protect the anterior shoulder capsule.',
      'Never allow shoulders to roll forward or shrug into ears.'
    ],
    commonFaults: [
      'Cutting depth high at 45° or diving too deep past comfort.',
      'Shoulders shrugging up into ears.'
    ],
    doAndDont: [
      { doText: 'Lean torso forward 20-30° for chest recruitment', dontText: 'Dropping down rapidly into shoulder joint' },
      { doText: 'Stop when upper arms are parallel to bars', dontText: 'Hyperextending shoulders excessively' }
    ]
  },

  'barbell-pendlay-row': {
    youtubeId: 'G8l_8chR5BE',
    youtubeUrl: 'https://www.youtube.com/watch?v=G8l_8chR5BE',
    youtubeTitle: 'How to Do Barbell Rows: Proper Form (Pendlay Row)',
    youtubeChannel: 'Buff Dudes',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-athlete-lifting-weights-in-gym-43309-large.mp4',
    thumbnailUrl: '/src/assets/images/deadlift_3d_render_1791810154346.jpg',
    durationSeconds: 12,
    cameraAngles: ['Side View (Torso Parallel)', 'Posterior Lat Angle'],
    phases: [
      {
        name: 'Floor Setup & Hip Hinge',
        timestamp: 0,
        cue: 'Bar on floor over midfoot. Torso parallel to floor, spine flat, knees slightly bent.',
        biomechanicAngle: 'Torso ~0° horizontal parallel'
      },
      {
        name: 'Explosive Pull to Sternum',
        timestamp: 4,
        cue: 'Drive elbows violently toward ceiling. Pull barbell to touch lower sternum.',
        biomechanicAngle: 'Elbows pulling past ribcage'
      },
      {
        name: 'Controlled Return to Dead Stop',
        timestamp: 8,
        cue: 'Lower bar smoothly back to dead stop on floor. Reset tension for next rep.',
        biomechanicAngle: 'Complete dead stop on floor'
      }
    ],
    keyCues: [
      'Maintain rigid parallel torso; do not stand up to cheat.',
      'Pull with back muscles and elbows, not biceps.',
      'Let weight come to a complete rest on floor between each rep.'
    ],
    commonFaults: [
      'Jerking torso upright during pull.',
      'Spinal rounding under heavy load.'
    ],
    doAndDont: [
      { doText: 'Keep torso strictly parallel to floor', dontText: 'Standing up at a 45-degree angle to heave' },
      { doText: 'Reset from dead stop on floor each rep', dontText: 'Bouncing bar off the floor plates' }
    ]
  },

  'romanian-deadlift': {
    youtubeId: 'JCXUYuzwNrM',
    youtubeUrl: 'https://www.youtube.com/watch?v=JCXUYuzwNrM',
    youtubeTitle: 'How to Romanian Deadlift (RDL): Hamstring & Glute Form',
    youtubeChannel: 'Scott Herman Fitness',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-athlete-lifting-weights-in-gym-43309-large.mp4',
    thumbnailUrl: '/src/assets/images/deadlift_3d_render_1791810154346.jpg',
    durationSeconds: 13,
    cameraAngles: ['Side View (Hip Hinge & Hamstring Stretch)'],
    phases: [
      {
        name: 'Tall Standing Unrack',
        timestamp: 0,
        cue: 'Stand tall with bar against thighs. Feet hip-width, soft unlocked knees.',
        biomechanicAngle: 'Erect posture, unlocked knees'
      },
      {
        name: 'Pure Hip Hinge Descent',
        timestamp: 4,
        cue: 'Push hips back towards the wall behind you. Bar slides down thighs to just below knees.',
        biomechanicAngle: 'Hips displaced backward, flat spine'
      },
      {
        name: 'Glute Drive Lockout',
        timestamp: 8,
        cue: 'When hamstrings reach full stretch, squeeze glutes hard and drive hips forward.',
        biomechanicAngle: 'Full hip extension without hyperextension'
      }
    ],
    keyCues: [
      'Movement is horizontal (hips moving backward) not vertical squatting.',
      'Keep bar in physical contact with legs throughout.',
      'Maintain neutral neck and rigid flat lumbar spine.'
    ],
    commonFaults: [
      'Bending knees too much, turning it into a standard deadlift.',
      'Rounding the lower back to reach lower than hamstring mobility allows.'
    ],
    doAndDont: [
      { doText: 'Push hips backward like closing a car door with glutes', dontText: 'Squatting down and dropping hips low' },
      { doText: 'Stop when hips can no longer travel backward', dontText: 'Rounding spine to touch floor plates' }
    ]
  },

  'barbell-hip-thrust': {
    youtubeId: 'LM8XHLYJoYs',
    youtubeUrl: 'https://www.youtube.com/watch?v=LM8XHLYJoYs',
    youtubeTitle: 'How to Hip Thrust: Perfect Glute Form Guide',
    youtubeChannel: 'Bret Contreras',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-pushups-in-the-gym-43314-large.mp4',
    thumbnailUrl: '/src/assets/images/squat_3d_render_1791810126737.jpg',
    durationSeconds: 11,
    cameraAngles: ['Side View (Pelvic Lockout & Vertical Shins)'],
    phases: [
      {
        name: 'Bench & Bar Setup',
        timestamp: 0,
        cue: 'Upper back against bench edge (under scapulae). Bar padded across hip crease. Feet flat.',
        biomechanicAngle: 'Upper back pivot on bench'
      },
      {
        name: 'Drive to Parallel Lockout',
        timestamp: 4,
        cue: 'Drive through heels, squeeze glutes, lift hips until thighs and torso are in straight line.',
        biomechanicAngle: 'Vertical shins (90° at knees) at top'
      },
      {
        name: 'Posterior Pelvic Squeeze',
        timestamp: 7,
        cue: 'Tuck chin, maintain posterior pelvic tilt at top, pause for 1 second.',
        biomechanicAngle: 'Full glute peak contraction'
      }
    ],
    keyCues: [
      'Keep chin tucked and eyes looking forward, not up at ceiling.',
      'Ensure shins are vertical (90 degrees) at the top of the thrust.',
      'Drive exclusively through the heels and mid-foot.'
    ],
    commonFaults: [
      'Hyperextending lower lumbar spine at the top.',
      'Feet placed too close or too far away.'
    ],
    doAndDont: [
      { doText: 'Keep chin tucked and ribs down', dontText: 'Throwing head back and arching lumbar' },
      { doText: 'Form 90° right angle at knees at peak', dontText: 'Pike hips without reaching full extension' }
    ]
  },

  'tricep-rope-pushdown': {
    youtubeId: '2-LAMcpzODU',
    youtubeUrl: 'https://www.youtube.com/watch?v=2-LAMcpzODU',
    youtubeTitle: 'How To: Triceps Cable Rope Pushdown',
    youtubeChannel: 'Scott Herman Fitness',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-athlete-lifting-weights-in-gym-43309-large.mp4',
    thumbnailUrl: '/src/assets/images/app_hero_3d_1791810105161.jpg',
    durationSeconds: 10,
    cameraAngles: ['Side View (Pinned Elbows)'],
    phases: [
      {
        name: 'Setup & Elbow Pin',
        timestamp: 0,
        cue: 'Grip rope ends. Slight forward torso lean. Pin elbows firmly against sides of ribcage.',
        biomechanicAngle: 'Elbows locked at sides'
      },
      {
        name: 'Pushdown & Flare',
        timestamp: 4,
        cue: 'Push downward and spread the rope ends apart at bottom for peak triceps contraction.',
        biomechanicAngle: 'Full triceps lockout and flare'
      },
      {
        name: 'Controlled High Return',
        timestamp: 7,
        cue: 'Allow rope to rise back up to chest height while keeping elbows stationary.',
        biomechanicAngle: '90°+ elbow flexion stretch'
      }
    ],
    keyCues: [
      'Do not allow elbows to drift forward or flare out.',
      'Spread rope ends outward at bottom of rep.',
      'Control the eccentric return; don’t let the weight stack slam.'
    ],
    commonFaults: [
      'Using bodyweight to lean and press weight down.',
      'Moving elbows forward and backward during rep.'
    ],
    doAndDont: [
      { doText: 'Spread the ropes apart at full extension', dontText: 'Swinging shoulders and using chest momentum' },
      { doText: 'Lock elbows in place like hinges', dontText: 'Letting elbows flare forward on the stretch' }
    ]
  },

  'ab-wheel-rollout': {
    youtubeId: 'rqiTPdK1c_I',
    youtubeUrl: 'https://www.youtube.com/watch?v=rqiTPdK1c_I',
    youtubeTitle: 'How to Do Ab Wheel Rollouts: Proper Core Technique',
    youtubeChannel: 'Calisthenicmovement',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-plank-exercise-in-gym-43313-large.mp4',
    thumbnailUrl: '/src/assets/images/bench_3d_render_1791810139754.jpg',
    durationSeconds: 10,
    cameraAngles: ['Side View (Hollow Body Rollout)'],
    phases: [
      {
        name: 'Kneeling Cat Setup',
        timestamp: 0,
        cue: 'Kneel on mat, grip wheel. Round upper back slightly (hollow body), squeeze glutes.',
        biomechanicAngle: 'Posterior pelvic tilt'
      },
      {
        name: 'Rollout Reach',
        timestamp: 4,
        cue: 'Roll wheel forward while keeping abs braced. Extend as far as can be controlled without back sagging.',
        biomechanicAngle: 'Extended body line, braced core'
      },
      {
        name: 'Abdominal Pull-Back',
        timestamp: 7,
        cue: 'Pull back using core and lats, not by sitting back onto heels.',
        biomechanicAngle: 'Return to hollow position'
      }
    ],
    keyCues: [
      'Maintain posterior pelvic tilt; never let lower back hyperextend or sag.',
      'Initiate pull back from the abdominal wall, not your hips.',
      'Work within your active control range.'
    ],
    commonFaults: [
      'Lumbar hyperextension dip as wheel reaches apex.',
      'Sitting back on heels before pulling with abs.'
    ],
    doAndDont: [
      { doText: 'Keep glutes squeezed and pelvis tucked', dontText: 'Allowing belly and lower back to dip to floor' },
      { doText: 'Pull back with lats and abdominal wall', dontText: 'Hiking hips back over heels' }
    ]
  },

  'inverted-table-row': {
    youtubeId: 'oyO3X4kOuhc',
    youtubeUrl: 'https://www.youtube.com/watch?v=oyO3X4kOuhc',
    youtubeTitle: 'Inverted Row Tutorial: Technique & Progressions',
    youtubeChannel: 'Calisthenicmovement',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-athlete-lifting-weights-in-gym-43309-large.mp4',
    thumbnailUrl: '/src/assets/images/pullup_3d_render_1791810171202.jpg',
    durationSeconds: 12,
    cameraAngles: ['Side View (Spine Line)', 'Front Angle (Elbow Drive)'],
    phases: [
      { name: 'Underneath Setup', timestamp: 0, cue: 'Position body under table or bar with feet planted, glutes braced.', biomechanicAngle: 'Rigid 180° body plank' },
      { name: 'Concentric Pull', timestamp: 4, cue: 'Drive elbows down and back, pulling chest toward the surface.', biomechanicAngle: 'Scapular retraction' },
      { name: 'Peak Contraction', timestamp: 7, cue: 'Squeeze lats and rhomboids for 1 second.', biomechanicAngle: 'Chest touching edge' },
      { name: 'Controlled Lowering', timestamp: 9, cue: 'Lower under strict 2-second eccentric control without sagging.', biomechanicAngle: 'Full arm extension' }
    ],
    keyCues: [
      'Maintain an unbroken straight line from heels to head.',
      'Lead with your chest, not your hips.',
      'Pull through your elbows, squeezing shoulder blades together.'
    ],
    commonFaults: [
      'Sagging hips or hyperextending lower back.',
      'Shrugging shoulders up toward ears.'
    ],
    doAndDont: [
      { doText: 'Keep body in rigid plank with glutes engaged', dontText: 'Letting hips drop or piking at the waist' },
      { doText: 'Retract scapulae fully at top of pull', dontText: 'Half reps with rounded upper back' }
    ]
  },

  'pike-pushup': {
    youtubeId: 'q3aG7j12DTo',
    youtubeUrl: 'https://www.youtube.com/watch?v=q3aG7j12DTo',
    youtubeTitle: 'How to Pike Push Up: Complete Form Guide',
    youtubeChannel: 'Calisthenicmovement',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-pushups-in-the-gym-43314-large.mp4',
    thumbnailUrl: '/src/assets/images/bench_3d_render_1791810139754.jpg',
    durationSeconds: 12,
    cameraAngles: ['Side View (Inverted Angle)', 'Front View (Elbow Path)'],
    phases: [
      { name: 'Pike Inversion Setup', timestamp: 0, cue: 'Hips piked high, hands shoulder-width, weight shifted onto toes.', biomechanicAngle: 'Torso ~60-70° inverted' },
      { name: 'Forward Lean & Descent', timestamp: 4, cue: 'Lower head forward in a tripod trajectory ahead of hands.', biomechanicAngle: 'Elbows tucked 45°' },
      { name: 'Apex Depth', timestamp: 7, cue: 'Light touch of forehead just ahead of fingertip line.', biomechanicAngle: 'Shoulder flexion ~120°' },
      { name: 'Concentric Press', timestamp: 9, cue: 'Push ground away, pressing head back between shoulders.', biomechanicAngle: 'Full overhead lockout' }
    ],
    keyCues: [
      'Lower in a forward diagonal tripod path, not straight down.',
      'Keep elbows tucked at 45° to protect rotator cuffs.',
      'Push all the way through the shoulders at top lockout.'
    ],
    commonFaults: [
      'Flaring elbows out horizontally.',
      'Dropping hips and turning the movement into a normal pushup.'
    ],
    doAndDont: [
      { doText: 'Descend forward in tripod formation', dontText: 'Dropping crown of head between hands' },
      { doText: 'Maintain high hip pike throughout', dontText: 'Letting hips sag down' }
    ]
  },

  'household-water-jug-hammer-curl': {
    youtubeId: 'zC3nLlEvin4',
    youtubeUrl: 'https://www.youtube.com/watch?v=zC3nLlEvin4',
    youtubeTitle: 'How to Hammer Curl for Bigger Arms: Proper Form',
    youtubeChannel: 'Buff Dudes',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-athlete-lifting-weights-in-gym-43309-large.mp4',
    thumbnailUrl: '/src/assets/images/bench_3d_render_1791810139754.jpg',
    durationSeconds: 12,
    cameraAngles: ['Side View (Elbow Stability)', 'Front View (Neutral Grip)'],
    phases: [
      { name: 'Neutral Grip Hang', timestamp: 0, cue: 'Palms facing each other, shoulders pinned, elbows glued to ribs.', biomechanicAngle: 'Neutral forearm grip' },
      { name: 'Controlled Curl', timestamp: 4, cue: 'Curl weight upward focusing on the brachialis and brachioradialis.', biomechanicAngle: 'Elbow flexion ~135°' },
      { name: 'Peak Squeeze', timestamp: 7, cue: 'Squeeze outer bicep and forearm hard at top for 1 second.', biomechanicAngle: 'Zero elbow drift' },
      { name: 'Eccentric Lowering', timestamp: 9, cue: 'Lower under strict 3-second control.', biomechanicAngle: 'Full arm extension' }
    ],
    keyCues: [
      'Maintain neutral palms-facing-in grip throughout.',
      'Keep upper arms pinned vertically to sides; avoid swinging hips.',
      'Control the eccentric lowering phase for maximum hypertrophy.'
    ],
    commonFaults: [
      'Swinging torso back to initiate momentum.',
      'Flaring elbows out sideways.'
    ],
    doAndDont: [
      { doText: 'Keep elbows locked against ribcage', dontText: 'Swinging elbows forward or backward' },
      { doText: 'Squeeze brachialis at peak contraction', dontText: 'Dropping weights rapidly on descent' }
    ]
  },

  'dead-hangs-farmer-walk': {
    youtubeId: 'rt17lmnaLSM',
    youtubeUrl: 'https://www.youtube.com/watch?v=rt17lmnaLSM',
    youtubeTitle: 'How to Do Farmer Walks & Grip Work for Functional Strength',
    youtubeChannel: 'Buff Dudes',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-athlete-lifting-weights-in-gym-43309-large.mp4',
    thumbnailUrl: '/src/assets/images/deadlift_3d_render_1791810154346.jpg',
    durationSeconds: 14,
    cameraAngles: ['Front View (Posture & Gait)', 'Side View (Spine Alignment)'],
    phases: [
      { name: 'Deadlift Setup & Pick', timestamp: 0, cue: 'Hinge with flat spine, grip heavy handles securely, and stand tall.', biomechanicAngle: 'Neutral spine, packed neck' },
      { name: 'Postural Lock', timestamp: 4, cue: 'Pull shoulders back and down, brace core 360°, keep chest proud.', biomechanicAngle: 'Scapulae depressed' },
      { name: 'Controlled Cadence Walk', timestamp: 7, cue: 'Take deliberate, short, heel-to-toe strides with zero lateral torso sway.', biomechanicAngle: 'Anti-lateral flexion' },
      { name: 'Safe Descent', timestamp: 11, cue: 'Hinge at hips with neutral spine to return weights safely to floor.', biomechanicAngle: 'Controlled hip hinge' }
    ],
    keyCues: [
      'Crush grip into the handles with full finger engagement.',
      'Walk like a statue: smooth, controlled, tall posture.',
      'Do not allow shoulders to roll forward or round.'
    ],
    commonFaults: [
      'Shrugging traps to ears or rolling shoulders forward.',
      'Taking wild, unstable steps and swaying side to side.'
    ],
    doAndDont: [
      { doText: 'Maintain tall upright posture with chest proud', dontText: 'Slouching forward under heavy load' },
      { doText: 'Take smooth, controlled steps', dontText: 'Rushing with unstable footsteps' }
    ]
  },

  'nordic-hamstring-curl': {
    youtubeId: 'iC_3m9j2z_E',
    youtubeUrl: 'https://www.youtube.com/watch?v=iC_3m9j2z_E',
    youtubeTitle: 'Nordic Hamstring Curl: Bulletproof Hamstrings Technique',
    youtubeChannel: 'Ben Patrick - Knees Over Toes Guy',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-athlete-lifting-weights-in-gym-43309-large.mp4',
    thumbnailUrl: '/src/assets/images/deadlift_3d_render_1791810154346.jpg',
    durationSeconds: 14,
    cameraAngles: ['Side View (Hip Extension)', '45° Angle'],
    phases: [
      { name: 'Anchor & Lock', timestamp: 0, cue: 'Ankles secured firmly, knees on soft pad, glutes squeezed tight.', biomechanicAngle: 'Straight knee-to-shoulder line' },
      { name: 'Eccentric Descent', timestamp: 4, cue: 'Fall forward slowly resisting with hamstrings as long as possible.', biomechanicAngle: 'Knee extension under tension' },
      { name: 'Floor Catch & Push', timestamp: 8, cue: 'Catch with hands in pushup position, give gentle assist push.', biomechanicAngle: 'Controlled push rebound' },
      { name: 'Concentric Pull Back', timestamp: 11, cue: 'Pull through hamstrings to return to upright vertical torso.', biomechanicAngle: 'Hamstring contraction' }
    ],
    keyCues: [
      'Keep hips locked in full extension; do not break or bend at the waist.',
      'Fight the eccentric descent for 3-5 seconds.',
      'Use hands lightly for assistance as needed.'
    ],
    commonFaults: [
      'Piking at the hips to avoid hamstring tension.',
      'Free-falling to the floor without eccentric resistance.'
    ],
    doAndDont: [
      { doText: 'Maintain straight line from knees to shoulders', dontText: 'Bending at the hips to cheat the load' },
      { doText: 'Resist gravity for as long as possible', dontText: 'Collapsing immediately to the floor' }
    ]
  },

  'single-leg-calf-raise': {
    youtubeId: '-M4-G8p8fmc',
    youtubeUrl: 'https://www.youtube.com/watch?v=-M4-G8p8fmc',
    youtubeTitle: 'How to Grow Calves with Proper Form: Single Leg Calf Raise',
    youtubeChannel: 'Jeff Nippard',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-squats-in-a-gym-43308-large.mp4',
    thumbnailUrl: '/src/assets/images/squat_3d_render_1791810126737.jpg',
    durationSeconds: 12,
    cameraAngles: ['Posterior Angle (Ankle Alignment)', 'Side View (Full Stretch)'],
    phases: [
      { name: 'Deep Deficit Stretch', timestamp: 0, cue: 'Heel lowered below step level for a deep 2-second stretch in gastrocnemius.', biomechanicAngle: 'Full ankle dorsiflexion' },
      { name: 'Concentric Drive', timestamp: 4, cue: 'Drive through the ball of the big toe straight up to peak height.', biomechanicAngle: 'Full plantarflexion' },
      { name: 'Peak 1-Second Pause', timestamp: 7, cue: 'Hold the top contraction without bouncing or rolling ankle out.', biomechanicAngle: 'Maximum calf peak' },
      { name: 'Slow Controlled Descent', timestamp: 9, cue: 'Lower under 3-second tempo back into full deficit stretch.', biomechanicAngle: 'Eccentric stretch' }
    ],
    keyCues: [
      'Eliminate the stretch reflex: pause 1 full second at the bottom stretch.',
      'Drive pressure straight through the first and second toes.',
      'Avoid knee bending; keep knee straight to target the gastrocnemius.'
    ],
    commonFaults: [
      'Bouncing rapidly using the Achilles tendon spring.',
      'Rolling ankle outward onto pinky toe (inversion).'
    ],
    doAndDont: [
      { doText: 'Pause 1 full second at full bottom stretch', dontText: 'Rapid bouncing without full stretch' },
      { doText: 'Drive straight up over the big toe', dontText: 'Rolling onto outside edge of foot' }
    ]
  },

  'hanging-leg-raise': {
    youtubeId: 'hdng3Nm1x_E',
    youtubeUrl: 'https://www.youtube.com/watch?v=hdng3Nm1x_E',
    youtubeTitle: 'Hanging Leg Raise Tutorial: Perfect Core Execution',
    youtubeChannel: 'Calisthenicmovement',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-athlete-lifting-weights-in-gym-43309-large.mp4',
    thumbnailUrl: '/src/assets/images/pullup_3d_render_1791810171202.jpg',
    durationSeconds: 14,
    cameraAngles: ['Side View (Pelvic Tilt)', 'Front View (Leg Path)'],
    phases: [
      { name: 'Dead Hang & Scapular Pack', timestamp: 0, cue: 'Hang with active shoulders, lats engaged, zero body swing.', biomechanicAngle: 'Neutral spine, depressed scapulae' },
      { name: 'Pelvic Curl & Raise', timestamp: 4, cue: 'Initiate by curling pelvis upward toward sternum, lifting legs to 90° or higher.', biomechanicAngle: 'Posterior pelvic tilt' },
      { name: 'Peak Contraction', timestamp: 7, cue: 'Hold legs parallel to floor or higher with abdominal wall clamped.', biomechanicAngle: 'Lumbar flexion & hip flexion' },
      { name: 'Controlled Descent', timestamp: 10, cue: 'Lower legs slowly over 3 seconds without swinging hips back.', biomechanicAngle: 'Eccentric control' }
    ],
    keyCues: [
      'Focus on curling your pelvis upward, not just lifting thighs with hip flexors.',
      'Completely eliminate momentum and swinging.',
      'Breathe all air out at top contraction to maximize rectus abdominis shortening.'
    ],
    commonFaults: [
      'Using swinging momentum like a kipping pullup.',
      'Arching lower back at the bottom of the hang.'
    ],
    doAndDont: [
      { doText: 'Roll pelvis toward sternum on every rep', dontText: 'Relying purely on hip flexors with flat pelvis' },
      { doText: 'Control the descent with zero swing', dontText: 'Swinging legs like a pendulum' }
    ]
  },

  'hiit-jump-rope': {
    youtubeId: '1BZM2Vre5oc',
    youtubeUrl: 'https://www.youtube.com/watch?v=1BZM2Vre5oc',
    youtubeTitle: 'How to Jump Rope for Beginners: Proper Technique',
    youtubeChannel: 'Jump Rope Dudes',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-squats-in-a-gym-43308-large.mp4',
    thumbnailUrl: '/src/assets/images/squat_3d_render_1791810126737.jpg',
    durationSeconds: 12,
    cameraAngles: ['Front View (Wrist & Elbow Alignment)', 'Side View (Bounding Height)'],
    phases: [
      { name: 'Athletic Stance', timestamp: 0, cue: 'Feet together, elbows tucked close to ribcage, wrists angled forward.', biomechanicAngle: 'Upright athletic stance' },
      { name: 'Wrist Rotation', timestamp: 3, cue: 'Rotate rope purely from the wrists, not large arm swings.', biomechanicAngle: 'Wrist flick rotation' },
      { name: 'Low Bounding Impact', timestamp: 6, cue: 'Bounce 1-2 inches off the ground on the balls of the feet with soft knees.', biomechanicAngle: 'Plantarflexion bounce' },
      { name: 'Rhythm Cadence', timestamp: 9, cue: 'Maintain consistent breathing rhythm and synchronized cadence.', biomechanicAngle: 'Aerobic & anaerobic pacing' }
    ],
    keyCues: [
      'Stay light on the balls of your feet; heels should never slap the floor.',
      'Turn the rope with quick wrist flicks, keeping elbows pinned near ribs.',
      'Jump just high enough for the rope to clear under your toes (~1 inch).'
    ],
    commonFaults: [
      'Flaring arms wide away from body.',
      'Jumping too high and landing hard on heels.'
    ],
    doAndDont: [
      { doText: 'Keep elbows tucked and rotate with wrists', dontText: 'Swinging entire arms in huge circles' },
      { doText: 'Land softly on balls of feet', dontText: 'Slapping heels heavily onto floor' }
    ]
  },

  'worlds-greatest-stretch': {
    youtubeId: '4A5xXF5-h0Y',
    youtubeUrl: 'https://www.youtube.com/watch?v=4A5xXF5-h0Y',
    youtubeTitle: 'How to Do The World\'s Greatest Stretch (Mobility Guide)',
    youtubeChannel: 'Squat University',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-athlete-lifting-weights-in-gym-43309-large.mp4',
    thumbnailUrl: '/src/assets/images/squat_3d_render_1791810126737.jpg',
    durationSeconds: 15,
    cameraAngles: ['Side View (Hip & Hamstring)', '45° Angle (Thoracic Rotation)'],
    phases: [
      { name: 'Deep Runner\'s Lunge', timestamp: 0, cue: 'Step into deep lunge, back leg straight, hands planted inside lead foot.', biomechanicAngle: 'Hip flexor stretch' },
      { name: 'Elbow Instep Drop', timestamp: 4, cue: 'Drop inside elbow toward the instep of the front foot to open hips.', biomechanicAngle: 'Deep adductor & hip opening' },
      { name: 'Thoracic Sky Reach', timestamp: 8, cue: 'Rotate chest and reach hand toward the sky, following fingers with eyes.', biomechanicAngle: 'Thoracic spine rotation' },
      { name: 'Hamstring Rock-Back', timestamp: 12, cue: 'Plant both hands and shift hips back, straightening front leg into hamstring stretch.', biomechanicAngle: 'Hamstring & calf lengthen' }
    ],
    keyCues: [
      'Keep back knee off the floor and squeeze back glute to deepen hip flexor stretch.',
      'Rotate through your mid-back (thoracic spine), not just flinging your shoulder.',
      'Breathe deeply in each segment.'
    ],
    commonFaults: [
      'Rushing through the stretch without pausing in each key position.',
      'Rounding lower back rather than rotating the thoracic cage.'
    ],
    doAndDont: [
      { doText: 'Squeeze back glute to release front hip flexor', dontText: 'Letting back knee collapse to floor' },
      { doText: 'Rotate from mid-back and follow hand with eyes', dontText: 'Hyperextending neck or shoulder' }
    ]
  },

  // PRENATAL SAFE EXERCISES (ACOG Evidenced)
  'prenatal-360-breathing': {
    youtubeId: 'mTgnkua35pg',
    youtubeUrl: 'https://www.youtube.com/watch?v=mTgnkua35pg',
    youtubeTitle: 'Pregnancy Exercise for an Easier Birth & 360 Breathing',
    youtubeChannel: 'Pregnancy and Postpartum TV',
    thumbnailUrl: '/src/assets/images/app_hero_3d_1791810105161.jpg',
    durationSeconds: 16,
    cameraAngles: ['Front View (Rib Expansion)', 'Side View (Spine Alignment)'],
    phases: [
      { name: 'Upright Neutral Alignment', timestamp: 0, cue: 'Sit tall on chair or birth ball, ribs stacked over pelvis.', biomechanicAngle: 'Neutral spine' },
      { name: '360° Inhalation', timestamp: 4, cue: 'Inhale through nose, expanding ribcage and releasing pelvic floor.', biomechanicAngle: 'Ribcage lateral flare' },
      { name: 'Exhalation & Gentle Hug', timestamp: 8, cue: 'Exhale through pursed lips, lifting pelvic floor and hugging baby.', biomechanicAngle: 'Transverse core draw' },
      { name: 'Gentle Reset', timestamp: 12, cue: 'Pause without bearing down, maintaining tall posture.', biomechanicAngle: 'Relaxed pelvic floor' }
    ],
    keyCues: [
      'Inhale: ribcage expands 360° like an umbrella opening.',
      'Exhale: pelvic floor gently lifts as if drawing a tissue from a box.',
      'Never hold your breath or push downward into pelvic floor.'
    ],
    commonFaults: [
      'Bearing down or forcing abdominal pressure downwards.',
      'Clinching glutes or arching lower spine.'
    ],
    doAndDont: [
      { doText: 'Breathe into sides and back of ribcage', dontText: 'Sucking in stomach aggressively' },
      { doText: 'Consciously relax pelvic floor on inhalation', dontText: 'Holding breath during exertion' }
    ]
  },

  'prenatal-seated-dumbbell-curl-press': {
    youtubeId: '_5bIiWEdfUo',
    youtubeUrl: 'https://www.youtube.com/watch?v=_5bIiWEdfUo',
    youtubeTitle: 'Dumbbell Bicep Curl & Arm Stamina | Prenatal + Pregnancy Workouts',
    youtubeChannel: 'April Hamilton',
    thumbnailUrl: '/src/assets/images/bench_3d_render_1791810139754.jpg',
    durationSeconds: 15,
    cameraAngles: ['Front View (Neutral Grip)', 'Side View (Rib Alignment)'],
    phases: [
      { name: 'Seated Neutral Setup', timestamp: 0, cue: 'Sit tall with feet planted wide, holding light dumbbells at sides.', biomechanicAngle: 'Seated base of support' },
      { name: 'Controlled Bicep Curl', timestamp: 4, cue: 'Exhale and curl dumbbells to shoulders with neutral hammer grip.', biomechanicAngle: 'Elbow flexion 90-130°' },
      { name: 'Overhead Posture Press', timestamp: 8, cue: 'Press overhead smoothly without arching lower back or flaring ribs.', biomechanicAngle: 'Shoulder scapular plane' },
      { name: 'Controlled Descent', timestamp: 12, cue: 'Inhale and lower smoothly back to shoulders, then down to sides.', biomechanicAngle: 'Eccentric control' }
    ],
    keyCues: [
      'Sit tall with wide feet for pelvic stability.',
      'Keep neutral hammer grip (palms facing each other) throughout.',
      'Exhale on the lift while gently hugging baby toward spine.'
    ],
    commonFaults: [
      'Arching lower back or leaning torso backward to press weight.',
      'Using heavy weights that trigger breath holding (Valsalva).'
    ],
    doAndDont: [
      { doText: 'Use light dumbbells (3-8 lbs) with seated back support', dontText: 'Hyperextending spine or swinging torso' },
      { doText: 'Exhale on curl and press; inhale on descent', dontText: 'Holding breath or straining abdominal wall' }
    ]
  },

  'prenatal-bird-dog-grounded': {
    youtubeId: 'CBPKeAkqyaw',
    youtubeUrl: 'https://www.youtube.com/watch?v=CBPKeAkqyaw',
    youtubeTitle: 'Bird Dog | Prenatal + Pregnancy Safe Core Exercise',
    youtubeChannel: 'April Hamilton',
    thumbnailUrl: '/src/assets/images/deadlift_3d_render_1791810154346.jpg',
    durationSeconds: 16,
    cameraAngles: ['Side View (Spine Line)', 'Front Angle (Pelvic Level)'],
    phases: [
      { name: 'Tabletop Setup', timestamp: 0, cue: 'Wrists under shoulders, knees under hips, belly supported.', biomechanicAngle: 'Neutral quadruped' },
      { name: 'Diagonal Limb Extension', timestamp: 4, cue: 'Exhale, reach right arm forward and left leg backward.', biomechanicAngle: '180° horizontal sling' },
      { name: 'Isometric Core Hold', timestamp: 8, cue: 'Hold for 2 seconds without letting hips tilt or lower back sag.', biomechanicAngle: 'Anti-rotation stability' },
      { name: 'Controlled Return', timestamp: 12, cue: 'Inhale and return with control; switch to opposite side.', biomechanicAngle: 'Quadruped reset' }
    ],
    keyCues: [
      'Gaze at the floor between your hands to keep neck neutral.',
      'Imagine balancing a cup of water on your sacrum without spilling.',
      'Hug baby in gently before lifting limbs.'
    ],
    commonFaults: [
      'Letting the belly dip down or lower back excessively arch.',
      'Lifting leg higher than hip height causing pelvic rotation.'
    ],
    doAndDont: [
      { doText: 'Reach limbs long rather than lifting high', dontText: 'Arching lumbar spine or dropping belly' },
      { doText: 'Slide toe along mat if balance feels unstable', dontText: 'Twisting hips open to the ceiling' }
    ]
  },

  'prenatal-cat-cow-mobility': {
    youtubeId: 'diQcRPd22M0',
    youtubeUrl: 'https://www.youtube.com/watch?v=diQcRPd22M0',
    youtubeTitle: 'Cat Cow | Prenatal + Pregnancy Pelvic Mobility',
    youtubeChannel: 'April Hamilton',
    thumbnailUrl: '/src/assets/images/squat_3d_render_1791810126737.jpg',
    durationSeconds: 14,
    cameraAngles: ['Side View (Spinal Wave)', '45° Angle (Pelvic Tilts)'],
    phases: [
      { name: 'Neutral Tabletop', timestamp: 0, cue: 'Hands under shoulders, knees hip-width apart.', biomechanicAngle: 'Neutral spine' },
      { name: 'Gentle Cow Pose', timestamp: 4, cue: 'Inhale, draw chest forward, mild pelvic tilt (do not drop belly).', biomechanicAngle: 'Mild thoracic extension' },
      { name: 'Gentle Cat Pose', timestamp: 8, cue: 'Exhale, press floor away, gently round spine, hugging baby to spine.', biomechanicAngle: 'Thoracic & lumbar flexion' },
      { name: 'Fluid Reset', timestamp: 12, cue: 'Return to neutral and flow with natural breath rhythm.', biomechanicAngle: 'Pelvic reset' }
    ],
    keyCues: [
      'Keep cow pose very gentle: avoid letting heavy belly sag to floor.',
      'Focus on upper and mid-back rounding to relieve brassiere-line tension.',
      'Flow smoothly without jerky movements.'
    ],
    commonFaults: [
      'Deep hyperextension of lumbar spine in cow pose.',
      'Dropping head back aggressively.'
    ],
    doAndDont: [
      { doText: 'Focus on gentle rounding through mid-back', dontText: 'Dropping belly forcefully into lumbar extension' },
      { doText: 'Widen knees slightly to create belly space', dontText: 'Holding breath during transition' }
    ]
  },

  'prenatal-side-lying-clamshell': {
    youtubeId: 'EByLjnoF2PU',
    youtubeUrl: 'https://www.youtube.com/watch?v=EByLjnoF2PU',
    youtubeTitle: 'Clamshell | Prenatal + Pregnancy Workouts',
    youtubeChannel: 'April Hamilton',
    thumbnailUrl: '/src/assets/images/squat_3d_render_1791810126737.jpg',
    durationSeconds: 15,
    cameraAngles: ['Side Angle (Stacked Hips)', 'Top Angle (Knee Arc)'],
    phases: [
      { name: 'Side-Lying Setup', timestamp: 0, cue: 'Lie on side with head supported by pillow, hips stacked vertically.', biomechanicAngle: 'Side-lying 90° knees' },
      { name: 'Top Knee Lift', timestamp: 4, cue: 'Exhale, keep feet glued together and open top knee like a clamshell.', biomechanicAngle: 'Hip external rotation 35-45°' },
      { name: 'Glute Contraction Hold', timestamp: 8, cue: 'Squeeze side glute (gluteus medius) for 1 second at top.', biomechanicAngle: 'Glute medius peak' },
      { name: 'Smooth Lowering', timestamp: 12, cue: 'Inhale and lower top knee smoothly without rocking hips back.', biomechanicAngle: 'Controlled eccentric' }
    ],
    keyCues: [
      'Keep pelvis perpendicular to floor; do not roll top hip backward.',
      'Place a pillow under belly and between knees for sacral comfort.',
      'Feel contraction in side hip/glute, not in front hip flexor.'
    ],
    commonFaults: [
      'Rolling hips backward to fake extra range of motion.',
      'Letting feet separate during the knee raise.'
    ],
    doAndDont: [
      { doText: 'Keep hips vertically stacked like two plates', dontText: 'Rolling hips backward as knee opens' },
      { doText: 'Support head and belly with comfortable pillows', dontText: 'Jerking or bouncing at end range' }
    ]
  },

  'prenatal-wide-box-squat': {
    youtubeId: 'B_9aaDBDeI0',
    youtubeUrl: 'https://www.youtube.com/watch?v=B_9aaDBDeI0',
    youtubeTitle: 'Bodyweight Box Squat | Prenatal + Pregnancy Workouts',
    youtubeChannel: 'April Hamilton',
    thumbnailUrl: '/src/assets/images/squat_3d_render_1791810126737.jpg',
    durationSeconds: 15,
    cameraAngles: ['Side View (Bench Target)', 'Front View (Knee Tracking)'],
    phases: [
      { name: 'Wide Base Setup', timestamp: 0, cue: 'Stand with feet wider than shoulders, toes turned out 20° in front of chair.', biomechanicAngle: 'Wide pelvic stance' },
      { name: 'Controlled Descent', timestamp: 4, cue: 'Inhale, sit hips back and down toward chair, chest proud.', biomechanicAngle: 'Hip hinge & knee flex' },
      { name: 'Light Chair Tap', timestamp: 8, cue: 'Lightly tap glutes to chair without bouncing or collapsing weight.', biomechanicAngle: '90° parallel safety' },
      { name: 'Drive to Standing', timestamp: 12, cue: 'Exhale, drive through heels, lift pelvic floor and stand tall.', biomechanicAngle: 'Hip extension' }
    ],
    keyCues: [
      'Drive knees outward in line with second toes to make room for belly.',
      'Chair provides infallible fall protection and balance security.',
      'Exhale on the way up, visualizing drawing baby into your spine.'
    ],
    commonFaults: [
      'Letting knees cave inward (valgus collapse).',
      'Bouncing heavily onto the chair seat.'
    ],
    doAndDont: [
      { doText: 'Keep chest tall and track knees over toes', dontText: 'Allowing knees to cave inward' },
      { doText: 'Use a sturdy chair or countertop for balance', dontText: 'Dropping down rapidly without control' }
    ]
  },

  'prenatal-incline-glute-bridge': {
    youtubeId: 'U6pi-zCgFBY',
    youtubeUrl: 'https://www.youtube.com/watch?v=U6pi-zCgFBY',
    youtubeTitle: 'Glute Bridge | Prenatal + Pregnancy Workouts',
    youtubeChannel: 'April Hamilton',
    thumbnailUrl: '/src/assets/images/bench_3d_render_1791810139754.jpg',
    durationSeconds: 15,
    cameraAngles: ['Side View (Incline Support)', '45° Angle (Hip Extension)'],
    phases: [
      { name: 'Incline Back Setup', timestamp: 0, cue: 'Shoulders and upper back rested on bench or incline wedge (zero flat-on-back).', biomechanicAngle: '30-45° torso incline' },
      { name: 'Heel Drive & Hip Lift', timestamp: 4, cue: 'Exhale, press through heels, and lift hips toward neutral alignment.', biomechanicAngle: 'Hip extension 0°' },
      { name: 'Peak Glute Squeeze', timestamp: 8, cue: 'Squeeze glutes at top for 1-2 seconds without hyperextending lower spine.', biomechanicAngle: 'Gluteus maximus peak' },
      { name: 'Controlled Descent', timestamp: 12, cue: 'Inhale, lower hips smoothly back toward floor.', biomechanicAngle: 'Controlled return' }
    ],
    keyCues: [
      'Always keep upper back elevated on bench or pillows after week 16 to protect vena cava.',
      'Drive purely through heels to engage glutes and hamstrings.',
      'Keep pelvis level and avoid arching lower spine.'
    ],
    commonFaults: [
      'Performing completely flat on floor in late pregnancy.',
      'Hyperextending lumbar spine at top of bridge.'
    ],
    doAndDont: [
      { doText: 'Elevate upper back on bench or incline wedge', dontText: 'Lying flat on your back after week 16' },
      { doText: 'Press through heels and squeeze glutes at top', dontText: 'Pushing hips so high that lower back arches' }
    ]
  },

  'prenatal-seated-band-row': {
    youtubeId: 'ZJA4xjVAsRc',
    youtubeUrl: 'https://www.youtube.com/watch?v=ZJA4xjVAsRc',
    youtubeTitle: 'Single Arm Split Stance Row | Prenatal + Pregnancy Workouts',
    youtubeChannel: 'April Hamilton',
    thumbnailUrl: '/src/assets/images/pullup_3d_render_1791810171202.jpg',
    durationSeconds: 15,
    cameraAngles: ['Side View (Spine Length)', 'Back View (Scapular Pinch)'],
    phases: [
      { name: 'Seated Posture Setup', timestamp: 0, cue: 'Sit upright on chair with band anchored securely at chest height.', biomechanicAngle: 'Neutral thoracic spine' },
      { name: 'Elbow Drive & Retraction', timestamp: 4, cue: 'Exhale, pull elbows close along ribcage, squeezing shoulder blades.', biomechanicAngle: 'Scapular retraction' },
      { name: 'Postural Pinch Hold', timestamp: 8, cue: 'Pause 1 second, opening chest and countering rounded shoulders.', biomechanicAngle: 'Rhomboid contraction' },
      { name: 'Smooth Extension', timestamp: 12, cue: 'Inhale, slowly extend arms forward with control.', biomechanicAngle: 'Controlled return' }
    ],
    keyCues: [
      'Keep neck relaxed and shoulders away from ears.',
      'Drive movement by squeezing shoulder blades together.',
      'Keep ribs stacked over pelvis without leaning backward.'
    ],
    commonFaults: [
      'Shrugging shoulders up toward ears.',
      'Leaning backward using body momentum.'
    ],
    doAndDont: [
      { doText: 'Pinch shoulder blades back and down', dontText: 'Shrugging shoulders up to ears' },
      { doText: 'Sit tall on chair or birth ball', dontText: 'Swinging torso backward' }
    ]
  },

  'prenatal-incline-wall-pushup': {
    youtubeId: 'QIbewVCF1gQ',
    youtubeUrl: 'https://www.youtube.com/watch?v=QIbewVCF1gQ',
    youtubeTitle: 'Wall Push-Ups for Pregnancy | Safe Upper Body Strength',
    youtubeChannel: 'The Mom Fit Hub',
    thumbnailUrl: '/src/assets/images/bench_3d_render_1791810139754.jpg',
    durationSeconds: 14,
    cameraAngles: ['Side View (Incline Angle)', 'Back View (Elbow Track)'],
    phases: [
      { name: 'Wall Incline Plank', timestamp: 0, cue: 'Hands on wall at shoulder height, step back to gentle plank incline.', biomechanicAngle: 'Incline plank line' },
      { name: 'Controlled Descent', timestamp: 4, cue: 'Inhale, bend elbows at 45° angle, lowering chest toward wall.', biomechanicAngle: 'Elbow flexion 45°' },
      { name: 'Chest Hover', timestamp: 8, cue: 'Hover 1 inch from wall with spine straight and belly supported.', biomechanicAngle: 'Zero belly coning' },
      { name: 'Palms Press Away', timestamp: 12, cue: 'Exhale, press through palms to return to start while hugging baby.', biomechanicAngle: 'Pectoral extension' }
    ],
    keyCues: [
      'Keep body in a solid straight diagonal line from heels to ears.',
      'Elbows should track back at 45° angles, not flare out horizontally.',
      'Incline eliminates intra-abdominal downward pressure and prevents coning.'
    ],
    commonFaults: [
      'Doing standard floor pushups which cause abdominal doming/diastasis strain.',
      'Flaring elbows out to 90° stressing shoulder joints.'
    ],
    doAndDont: [
      { doText: 'Perform on wall or high countertop', dontText: 'Floor pushups after first trimester' },
      { doText: 'Keep elbows tucked at 45° to torso', dontText: 'Letting belly sag toward wall' }
    ]
  },

  'prenatal-supported-malasana-squat': {
    youtubeId: 'q9XIOaLHJNw',
    youtubeUrl: 'https://www.youtube.com/watch?v=q9XIOaLHJNw',
    youtubeTitle: 'Deep Squat Hold | Prenatal + Pregnancy Workouts',
    youtubeChannel: 'April Hamilton',
    thumbnailUrl: '/src/assets/images/squat_3d_render_1791810126737.jpg',
    durationSeconds: 16,
    cameraAngles: ['Front View (Prayer Pose)', 'Side View (Block Support)'],
    phases: [
      { name: 'Block Elevation Setup', timestamp: 0, cue: 'Place 1-2 yoga blocks on mat; stand with wide turned-out stance.', biomechanicAngle: 'Wide hip abduction' },
      { name: 'Sit onto Block', timestamp: 4, cue: 'Lower hips to rest fully on block; bring palms to prayer at heart center.', biomechanicAngle: 'Supported pelvic opening' },
      { name: 'Perineal Release & Softening', timestamp: 8, cue: 'Elbows gently press knees open; inhale deeply, relaxing pelvic floor.', biomechanicAngle: 'Pelvic outlet widening' },
      { name: 'Labor Preparation Breath', timestamp: 12, cue: 'Visualize perineum blossoming like a flower; stay soft and grounded.', biomechanicAngle: 'Diaphragmatic release' }
    ],
    keyCues: [
      'Always support hips on yoga blocks or low stool to protect pelvic joints.',
      'Focus 100% on pelvic floor relaxation rather than tension.',
      'Breathe deeply into belly, ribs, and lower pelvis.'
    ],
    commonFaults: [
      'Attempting deep unsupported squats with severe pelvic girdle pain or after week 34 if baby is breech.',
      'Gripping pelvic floor tightly instead of releasing.'
    ],
    doAndDont: [
      { doText: 'Rest weight fully on yoga blocks or stool', dontText: 'Squatting unsupported with joint pain' },
      { doText: 'Consciously soften pelvic floor and jaw', dontText: 'Tensing shoulders or bearing down' }
    ]
  },

  'prenatal-wide-childs-pose': {
    youtubeId: 'nC63qwY8Yk0',
    youtubeUrl: 'https://www.youtube.com/watch?v=nC63qwY8Yk0',
    youtubeTitle: 'A. Pregnancy Wide Leg Child’s Pose Relief',
    youtubeChannel: 'RAI Chiropractic',
    thumbnailUrl: '/src/assets/images/squat_3d_render_1791810126737.jpg',
    durationSeconds: 15,
    cameraAngles: ['Side View (Spinal Traction)', 'Top View (Wide Knees)'],
    phases: [
      { name: 'Wide Mat Kneeling', timestamp: 0, cue: 'Kneel with knees wide to mat edges, big toes touching.', biomechanicAngle: 'Wide hip spread' },
      { name: 'Hips to Heels', timestamp: 4, cue: 'Hinge hips back toward heels, creating plenty of room for belly.', biomechanicAngle: 'Sacral decompression' },
      { name: 'Arms Walk Forward', timestamp: 8, cue: 'Walk hands forward, resting forehead on mat, yoga block, or bolster.', biomechanicAngle: 'Thoracolumbar release' },
      { name: 'Restorative Breath', timestamp: 12, cue: 'Breathe into lower back and sacrum, completely letting go of tension.', biomechanicAngle: 'Parasympathetic calming' }
    ],
    keyCues: [
      'Knees spread as wide as necessary to accommodate belly without pressure.',
      'Use a bolster or stacked pillows under chest for comfort.',
      'Rest in this restorative position whenever fatigued during workout.'
    ],
    commonFaults: [
      'Keeping knees together, which squashes the pregnant belly.',
      'Holding breath or tensing neck.'
    ],
    doAndDont: [
      { doText: 'Widen knees generously to provide full room for belly', dontText: 'Pressing belly against thighs' },
      { doText: 'Rest forehead on block or pillow for neck ease', dontText: 'Forcing hips lower if knees hurt' }
    ]
  }
};

/**
 * Returns technique video data for an exercise, with fallback to closest movement pattern
 */
export function getTechniqueVideoForExercise(exerciseId: string, category?: string): TechniqueVideo {
  if (TECHNIQUE_VIDEOS_MAP[exerciseId]) {
    return TECHNIQUE_VIDEOS_MAP[exerciseId];
  }

  const lower = exerciseId.toLowerCase();

  // Prenatal specific routing
  if (lower.includes('prenatal') || lower.includes('pregnancy')) {
    if (lower.includes('dumbbell') || lower.includes('curl') || lower.includes('arm')) {
      return TECHNIQUE_VIDEOS_MAP['prenatal-seated-dumbbell-curl-press'];
    }
    if (lower.includes('breath') || lower.includes('pelvic') || lower.includes('kegel')) {
      return TECHNIQUE_VIDEOS_MAP['prenatal-360-breathing'];
    }
    if (lower.includes('bird')) {
      return TECHNIQUE_VIDEOS_MAP['prenatal-bird-dog-grounded'];
    }
    if (lower.includes('cat') || lower.includes('cow')) {
      return TECHNIQUE_VIDEOS_MAP['prenatal-cat-cow-mobility'];
    }
    if (lower.includes('clam')) {
      return TECHNIQUE_VIDEOS_MAP['prenatal-side-lying-clamshell'];
    }
    if (lower.includes('bridge')) {
      return TECHNIQUE_VIDEOS_MAP['prenatal-incline-glute-bridge'];
    }
    if (lower.includes('pushup') || lower.includes('push-up')) {
      return TECHNIQUE_VIDEOS_MAP['prenatal-incline-wall-pushup'];
    }
    if (lower.includes('row')) {
      return TECHNIQUE_VIDEOS_MAP['prenatal-seated-band-row'];
    }
    if (lower.includes('child')) {
      return TECHNIQUE_VIDEOS_MAP['prenatal-wide-childs-pose'];
    }
    if (lower.includes('malasana') || lower.includes('deep-squat') || lower.includes('labor')) {
      return TECHNIQUE_VIDEOS_MAP['prenatal-supported-malasana-squat'];
    }
    return TECHNIQUE_VIDEOS_MAP['prenatal-wide-box-squat'];
  }

  // Specific matches before generic fallbacks
  if (lower.includes('nordic')) {
    return TECHNIQUE_VIDEOS_MAP['nordic-hamstring-curl'];
  }
  if (lower.includes('hammer')) {
    return TECHNIQUE_VIDEOS_MAP['household-water-jug-hammer-curl'];
  }
  if (lower.includes('pike')) {
    return TECHNIQUE_VIDEOS_MAP['pike-pushup'];
  }
  if (lower.includes('table') || lower.includes('inverted')) {
    return TECHNIQUE_VIDEOS_MAP['inverted-table-row'];
  }
  if (lower.includes('farmer') || lower.includes('hangs') || lower.includes('dead-hang')) {
    return TECHNIQUE_VIDEOS_MAP['dead-hangs-farmer-walk'];
  }
  if (lower.includes('calf') || lower.includes('calves')) {
    return TECHNIQUE_VIDEOS_MAP['single-leg-calf-raise'];
  }
  if (lower.includes('hanging') || lower.includes('leg-raise')) {
    return TECHNIQUE_VIDEOS_MAP['hanging-leg-raise'];
  }
  if (lower.includes('jump') || lower.includes('rope')) {
    return TECHNIQUE_VIDEOS_MAP['hiit-jump-rope'];
  }
  if (lower.includes('stretch') || lower.includes('flow')) {
    return TECHNIQUE_VIDEOS_MAP['worlds-greatest-stretch'];
  }

  // Generic patterns
  if (lower.includes('squat') && !lower.includes('split')) {
    return TECHNIQUE_VIDEOS_MAP['barbell-back-squat'];
  }
  if (lower.includes('split') || lower.includes('lunge')) {
    return TECHNIQUE_VIDEOS_MAP['bulgarian-split-squat'];
  }
  if (lower.includes('incline')) {
    return TECHNIQUE_VIDEOS_MAP['incline-dumbbell-press'];
  }
  if (lower.includes('bench') || lower.includes('chest-press')) {
    return TECHNIQUE_VIDEOS_MAP['barbell-bench-press'];
  }
  if (lower.includes('pushup') || lower.includes('push-up')) {
    return TECHNIQUE_VIDEOS_MAP['standard-pushup'];
  }
  if (lower.includes('dip')) {
    return TECHNIQUE_VIDEOS_MAP['chest-dips'];
  }
  if (lower.includes('romanian') || lower.includes('rdl')) {
    return TECHNIQUE_VIDEOS_MAP['romanian-deadlift'];
  }
  if (lower.includes('thrust')) {
    return TECHNIQUE_VIDEOS_MAP['barbell-hip-thrust'];
  }
  if (lower.includes('deadlift')) {
    return TECHNIQUE_VIDEOS_MAP['barbell-deadlift'];
  }
  if (lower.includes('row')) {
    return TECHNIQUE_VIDEOS_MAP['barbell-pendlay-row'];
  }
  if (lower.includes('pull-up') || lower.includes('pullup') || lower.includes('chin')) {
    return TECHNIQUE_VIDEOS_MAP['pull-up-chin-up'];
  }
  if (lower.includes('press') && (lower.includes('shoulder') || lower.includes('overhead') || lower.includes('military'))) {
    return TECHNIQUE_VIDEOS_MAP['overhead-press'];
  }
  if (lower.includes('lateral') || lower.includes('raise')) {
    return TECHNIQUE_VIDEOS_MAP['dumbbell-lateral-raise'];
  }
  if (lower.includes('curl')) {
    return TECHNIQUE_VIDEOS_MAP['barbell-bicep-curl'];
  }
  if (lower.includes('tricep') || lower.includes('pushdown')) {
    return TECHNIQUE_VIDEOS_MAP['tricep-rope-pushdown'];
  }
  if (lower.includes('wheel') || lower.includes('rollout')) {
    return TECHNIQUE_VIDEOS_MAP['ab-wheel-rollout'];
  }
  if (lower.includes('plank') || lower.includes('core') || lower.includes('ab')) {
    return TECHNIQUE_VIDEOS_MAP['plank-hold'];
  }

  // Base fallback
  return TECHNIQUE_VIDEOS_MAP['barbell-back-squat'];
}
