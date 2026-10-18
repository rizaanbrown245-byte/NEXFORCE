import { ResearchArticle } from '../types';

export const RESEARCH_ARTICLES: ResearchArticle[] = [
  {
    id: 'hypertrophy-mechanisms-tension',
    title: 'The Mechanisms of Muscle Hypertrophy and Their Application to Resistance Training',
    category: 'Hypertrophy',
    plainSummary: 'Muscle growth is primarily driven by mechanical tension across muscle fibers. Metabolic stress and muscle damage play smaller, secondary roles. You do not need to feel extreme soreness to stimulate muscle growth.',
    detailedExplanation: `In seminal reviews on skeletal muscle hypertrophy, mechanical tension is identified as the paramount driving force behind mechanotransduction. When sarcomeres contract against high relative loads or during high-effort repetitions approaching muscular failure, mechanosensors (such as focal adhesion kinase and the titin kinase domain) convert mechanical deformative force into biochemical signaling cascades via the mTORC1 pathway.
    
    While early literature theorized that exercise-induced muscle damage (EIMD) was a mandatory prerequisite for growth, subsequent systematic investigations have demonstrated that excessive muscle damage can impair subsequent training volume, delay recovery, and divert protein synthesis toward tissue repair rather than de novo myofibrillar accretion.
    
    Metabolic stress (the accumulation of intramuscular metabolites such as lactate, inorganic phosphate, and hydrogen ions) can augment muscle fiber recruitment in moderate-to-high repetition ranges, but cannot induce significant hypertrophy in the complete absence of mechanical tension.`,
    practicalApplications: [
      'Focus primarily on generating high mechanical tension across full active ranges of motion.',
      'Train each working set within 0 to 3 Reps in Reserve (RIR) to recruit high-threshold motor units.',
      'Avoid chasing excessive Delayed Onset Muscle Soreness (DOMS); soreness is an indicator of structural remodeling and unfamiliarity, not an optimal proxy for muscle protein synthesis.'
    ],
    limitations: [
      'Individual genetic differences in satellite cell donation and ribosome biogenesis lead to wide variability in muscle growth responses (high responders vs. low responders).',
      'Most acute molecular signaling studies (mTOR phosphorylation) correlate moderately, but not always linearly, with chronic 12-week myofibrillar growth.'
    ],
    evidenceStrength: 'Strong Consensus',
    citations: [
      {
        authors: 'Schoenfeld, B. J.',
        year: 2010,
        journal: 'Journal of Strength and Conditioning Research',
        doiOrUrl: 'https://doi.org/10.1519/JSC.0b013e3181e840f3',
        title: 'The mechanisms of muscle hypertrophy and their application to resistance training'
      },
      {
        authors: 'Wackerhage, H., Schoenfeld, B. J., Hamilton, D. L., Lehti, M., & Hulmi, J. J.',
        year: 2019,
        journal: 'Journal of Applied Physiology',
        doiOrUrl: 'https://doi.org/10.1152/japplphysiol.00611.2018',
        title: 'Stimuli and sensors that initiate skeletal muscle hypertrophy following resistance exercise'
      }
    ],
    reviewDate: '2024-03-15',
    readTimeMinutes: 5
  },
  {
    id: 'progressive-overload-principles',
    title: 'Dose-Response Relationships and Progressive Overload in Resistance Exercise',
    category: 'Programming',
    plainSummary: 'Progressive overload does not just mean piling on heavier barbell plates every week. Adding repetitions, improving form consistency, increasing range of motion, and controlling eccentric tempo are all valid forms of progressive overload.',
    detailedExplanation: `The principle of progressive overload dictates that neuromuscular tissue must be subjected to stimuli exceeding its prior adaptive capacity to evoke structural adaptation. In human skeletal muscle, the adaptive threshold shifts as training age increases.
    
    Progressive overload manifests through multiple distinct variables:
    1. External Load: Increasing absolute resistance (kg/lbs) at a fixed repetition count and technique.
    2. Repetition Volume: Performing more repetitions with identical load, technique, and tempo.
    3. Kinetic Quality: Executing identical external loads with enhanced range of motion, minimized momentum, and strict eccentric cadence.
    4. Set Volume: Increasing weekly hard sets per muscle group within an individual's Maximum Recoverable Volume (MRV).
    
    Trainees often mistake increasing weight with deteriorating execution for true overload. If an athlete adds 5kg to the bench press but cuts range of motion by 2 inches and bounces off the sternum, net mechanical tension on the pectoral muscle fibers has actually decreased.`,
    practicalApplications: [
      'Log workouts accurately: record reps, load, and perceived effort (RPE/RIR) in a dedicated tracker.',
      'Progress rep count first within a target bracket (e.g., progress from 8 to 12 reps at 60kg) before increasing load to 62.5kg and resetting to 8 reps.',
      'Standardize form before claiming a personal record. True progression requires identical range of motion and cadence.'
    ],
    limitations: [
      'Linear progression is unsustainable long-term; intermediate and advanced athletes require undulating or block periodization.',
      'Fatigue accumulation must be managed with deload phases every 4 to 8 weeks.'
    ],
    evidenceStrength: 'Strong Consensus',
    citations: [
      {
        authors: 'American College of Sports Medicine (ACSM)',
        year: 2009,
        journal: 'Medicine & Science in Sports & Exercise',
        doiOrUrl: 'https://doi.org/10.1249/MSS.0b013e318191567f',
        title: 'Progression models in resistance training for healthy adults'
      },
      {
        authors: 'Plotkin, D., et al.',
        year: 2022,
        journal: 'PeerJ',
        doiOrUrl: 'https://doi.org/10.7717/peerj.14140',
        title: 'Progressive overload without progressing load? The effects of load or repetition progression on muscular adaptations'
      }
    ],
    reviewDate: '2024-05-10',
    readTimeMinutes: 6
  },
  {
    id: 'weekly-training-volume-hypertrophy',
    title: 'Dose-Response Relationship Between Weekly Resistance Training Volume and Hypertrophy',
    category: 'Hypertrophy',
    plainSummary: 'Training a muscle with 10 to 20 hard sets per week produces optimal muscle growth for most people. Less than 10 sets works well for beginners or maintenance, while exceeding 20–25 sets often leads to "junk volume" and slower recovery.',
    detailedExplanation: `A meta-analysis conducted by Schoenfeld, Ogborn, and Krieger (2017) evaluated the effects of weekly set volume on muscle hypertrophy across 15 peer-reviewed studies. The researchers revealed a significant dose-response relationship:
    - Less than 5 weekly sets: modest hypertrophic stimulus (suitable for beginners or maintenance phases).
    - 5 to 9 weekly sets: significant improvements over low volume.
    - 10+ weekly sets: yielded 3.9% greater muscle mass accretion compared to fewer than 5 sets (Effect Size = 0.24).
    
    Subsequent trials by Baz-Valle et al. (2022) suggest that for trained individuals, 12 to 22 direct sets per muscle group per week represents the practical upper threshold for productive volume. Beyond this threshold, additional sets often qualify as "junk volume," wherein accumulated central and peripheral fatigue diminishes myofibrillar protein synthesis stimulation while elevating recovery demands.`,
    practicalApplications: [
      'Establish a baseline of 10–12 direct sets per muscle group per week distributed across 2–3 weekly sessions.',
      'If progress stalls and recovery markers (sleep quality, appetite, motivation) are strong, increase volume gradually by 2 sets per week.',
      'Count direct sets (e.g., Barbell Bench Press counts 1 set for Chest, 0.5 set for Triceps and Front Delts).'
    ],
    limitations: [
      'Volume thresholds vary by muscle group (e.g., side delts recover faster than spinal erectors or hamstrings).',
      'The definition of a "hard set" (must be within 0-3 RIR) is crucial; doing 20 easy sets is ineffective compared to 10 high-effort sets.'
    ],
    evidenceStrength: 'Strong Consensus',
    citations: [
      {
        authors: 'Schoenfeld, B. J., Ogborn, D., & Krieger, J. W.',
        year: 2017,
        journal: 'Journal of Sports Sciences',
        doiOrUrl: 'https://doi.org/10.1080/02640414.2016.1210197',
        title: 'Dose-response relationship between weekly resistance training volume and increases in muscle mass: A systematic review and meta-analysis'
      },
      {
        authors: 'Baz-Valle, E., Balsalobre-Fernández, C., Carlos-Vivas, J., Santos-Concejero, J.',
        year: 2022,
        journal: 'Journal of Human Kinetics',
        doiOrUrl: 'https://doi.org/10.2478/hukin-2022-0017',
        title: 'A Systematic Review of The Effects of Different Volumes of Resistance Training on Muscle Hypertrophy in Trained Populations'
      }
    ],
    reviewDate: '2024-04-22',
    readTimeMinutes: 7
  },
  {
    id: 'training-frequency-hypertrophy',
    title: 'Training Frequency: 1x vs 2x vs 3x Weekly Frequency Per Muscle Group',
    category: 'Programming',
    plainSummary: 'Training a muscle group 2 times per week is superior to once per week ("bro split") when total weekly volume is matched. Spreading sets across multiple sessions allows higher quality reps and less intra-session fatigue.',
    detailedExplanation: `The systematic review and meta-analysis by Schoenfeld, Ogborn, and Krieger (2016) directly evaluated the impact of weekly resistance training frequency on muscular adaptations.
    
    Key findings:
    - Training a muscle group twice per week demonstrated superior muscle growth compared to training once per week (Effect Size = 0.49 vs 0.30, p = 0.002).
    - Splitting 16 weekly sets into two 8-set sessions (e.g., Upper/Lower or Push/Pull/Legs) maintains greater mechanical output, higher average power, and reduced acute fatigue compared to cramming all 16 sets into one exhausting chest day.
    - Muscle Protein Synthesis (MPS) peaks between 24 and 48 hours post-exercise in trained individuals and returns to baseline. By training each muscle every 3 to 4 days, athletes stimulate MPS multiple times per week.`,
    practicalApplications: [
      'Adopt routines that hit each target muscle group 2 times per week (such as Upper/Lower 4-day split, Push/Pull/Legs 6-day split, or Full Body 3-day split).',
      'If time allows only 3 training days per week, a Full Body routine hitting each muscle 3x per week with 3–4 sets per session is highly optimal.'
    ],
    limitations: [
      'When volume is strictly equated, differences between 2x and 3x frequency are minimal.',
      'Personal recovery capacity, joint tolerance, and life schedule should dictate frequency.'
    ],
    evidenceStrength: 'Strong Consensus',
    citations: [
      {
        authors: 'Schoenfeld, B. J., Ogborn, D., & Krieger, J. W.',
        year: 2016,
        journal: 'Sports Medicine',
        doiOrUrl: 'https://doi.org/10.1007/s40279-016-0543-8',
        title: 'Effects of Resistance Training Frequency on Measures of Muscle Hypertrophy: A Systematic Review and Meta-Analysis'
      }
    ],
    reviewDate: '2024-02-18',
    readTimeMinutes: 5
  },
  {
    id: 'protein-intake-muscle-protein-synthesis',
    title: 'Optimal Daily Protein Intake and Distribution for Resistance-Trained Adults',
    category: 'Nutrition',
    plainSummary: 'To maximize muscle protein synthesis and recovery, consume 1.6 to 2.2 grams of protein per kilogram of body weight per day (0.7–1.0 g/lb). Spreading protein across 3 to 5 meals rich in leucine is optimal.',
    detailedExplanation: `In a comprehensive systematic review and meta-analysis of 49 randomized controlled trials involving 1,863 participants, Morton et al. (2018) analyzed the impact of dietary protein supplementation on fat-free mass accretion.
    
    Crucial scientific findings:
    - Dietary protein intake beyond 1.62 g/kg/day (95% CI: 1.03 to 2.20 g/kg/day) showed no statistically significant additional benefit for fat-free mass accretion in non-calorie-restricted resistance-trained adults.
    - During an energetic deficit (caloric deficit/cutting phase), higher intakes of 2.0 to 2.4 g/kg/day are supported by Helms et al. (2014) to mitigate lean tissue catabolism.
    - The "Leucine Trigger": Each meal should contain approximately 2.5–3.5g of the essential amino acid leucine (equivalent to ~25–40g of complete high-quality protein) to saturate the intracellular sensor Sestrin2 and activate mTORC1.`,
    practicalApplications: [
      'Target an intake between 1.6 and 2.2 g/kg of total bodyweight (or per kg of lean mass for higher body fat individuals).',
      'Distribute protein evenly across 3 to 5 meals separated by 3 to 5 hours.',
      'Prioritize complete protein sources (eggs, chicken, fish, dairy, tofu, tempeh, whey, soy/pea protein blends).'
    ],
    limitations: [
      'Higher protein intakes (>3g/kg) are not toxic in healthy adults with normal renal function, but offer diminishing returns for muscle hypertrophy.',
      'Plant-based athletes should combine varied protein sources or consume slightly higher total protein (~10-15% more) to compensate for lower branched-chain amino acid densities.'
    ],
    evidenceStrength: 'Strong Consensus',
    citations: [
      {
        authors: 'Morton, R. W., Murphy, K. T., McKellar, S. R., Schoenfeld, B. J., et al.',
        year: 2018,
        journal: 'British Journal of Sports Medicine',
        doiOrUrl: 'https://doi.org/10.1136/bjsports-2017-097608',
        title: 'A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults'
      },
      {
        authors: 'Jäger, R., Kerksick, C. M., Campbell, B. I., et al. (ISSN)',
        year: 2017,
        journal: 'Journal of the International Society of Sports Nutrition',
        doiOrUrl: 'https://doi.org/10.1186/s12970-017-0177-8',
        title: 'International Society of Sports Nutrition Position Stand: protein and exercise'
      }
    ],
    reviewDate: '2024-06-01',
    readTimeMinutes: 6
  },
  {
    id: 'rest-intervals-between-sets',
    title: 'Rest Intervals Between Sets: Longer vs. Shorter Rest Periods for Hypertrophy and Strength',
    category: 'Programming',
    plainSummary: 'Resting 2 to 3 minutes between heavy compound sets produces significantly more muscle growth and strength than rushing through 30–60 second rest periods. Longer rest allows your central nervous system and ATP-CP stores to recover.',
    detailedExplanation: `For decades, bodybuilding dogma held that 60-second rest intervals were optimal for hypertrophy due to acute post-exercise growth hormone spikes. However, subsequent sports science has debunked this endocrine hypothesis.
    
    In a direct comparison trial by Schoenfeld et al. (2016), trained men followed an identical resistance training protocol, resting either 1 minute or 3 minutes between sets.
    - The 3-minute rest group demonstrated significantly greater increases in muscle thickness of the quadriceps and triceps, as well as significantly superior 1RM strength in squat and bench press.
    - Shorter rest periods induce premature peripheral fatigue and central nervous system depletion, causing a drastic decline in repetitions performed across successive sets. This drops total training volume load by up to 40%.`,
    practicalApplications: [
      'Rest 2.5 to 3.5 minutes on heavy multi-joint compound exercises (Squats, Deadlifts, Bench Press, Rows, Overhead Press).',
      'Rest 1.5 to 2 minutes on single-joint isolation exercises (Curls, Lateral Raises, Calf Raises).',
      'Use an active rest timer in the app to avoid cutting rest periods short when feeling rushed.'
    ],
    limitations: [
      'For trainees constrained by time, antagonist supersets (e.g. Bicep Curl immediately followed by Tricep Pushdown) provide equal volume in 50% less gym time without compromising rest periods.',
      'Cardiovascular conditioning may be modestly higher with shorter rest periods, but at the direct cost of mechanical load.'
    ],
    evidenceStrength: 'Strong Consensus',
    citations: [
      {
        authors: 'Schoenfeld, B. J., Pope, Z. K., Benik, F. M., et al.',
        year: 2016,
        journal: 'Journal of Strength and Conditioning Research',
        doiOrUrl: 'https://doi.org/10.1519/JSC.0000000000001272',
        title: 'Longer Interset Rest Periods Enhance Muscle Strength and Hypertrophy in Resistance-Trained Men'
      },
      {
        authors: 'Henselmans, M., & Schoenfeld, B. J.',
        year: 2014,
        journal: 'Sports Medicine',
        doiOrUrl: 'https://doi.org/10.1007/s40279-014-0228-0',
        title: 'The Effect of Inter-Set Rest Intervals on Resistance Exercise-Induced Muscle Hypertrophy'
      }
    ],
    reviewDate: '2024-01-30',
    readTimeMinutes: 5
  },
  {
    id: 'sleep-muscle-recovery-performance',
    title: 'Sleep Architecture, Endocrine Milieu, and Skeletal Muscle Recovery',
    category: 'Recovery',
    plainSummary: 'Sleeping less than 7 hours per night reduces testosterone and IGF-1 secretion, increases cortisol, and impairs muscle glycogen replenishment. In caloric deficits, sleep restriction causes up to 60% of lost weight to come from muscle rather than fat.',
    detailedExplanation: `Slow Wave Sleep (SWS / Deep Sleep, Stage N3) is the primary window for pulsatile Human Growth Hormone (hGH) release and parasympathetic dominance. Sleep deprivation exerts profound catabolic effects on the musculoskeletal system.
    
    In a landmark randomized crossover study by Nedeltcheva et al. (2010), subjects on identical caloric deficits were subjected to either 8.5 hours or 5.5 hours of sleep per night.
    - While both groups lost identical total body weight (~3 kg), the 8.5-hour sleep group lost 50% of weight from fat and 50% from lean mass.
    - In the sleep-deprived group, 80% of weight lost came from lean muscle tissue and only 20% from fat!
    - Sleep deprivation downregulates fractional synthetic rate (FSR) of myofibrillar protein and elevates systemic inflammatory cytokines (TNF-alpha, IL-6), impairing glycogen replenishment and neuromuscular firing rate.`,
    practicalApplications: [
      'Prioritize 7 to 9 hours of uninterrupted nocturnal sleep.',
      'Maintain consistent bedtimes and wake times within a 30-minute window, even on weekends.',
      'Avoid blue light exposure from screens 60 minutes before bed; keep bedroom cool (18–20°C / 65–68°F).'
    ],
    limitations: [
      'Genetically short sleepers (carriers of DEC2 mutation) can thrive on less sleep, but this accounts for less than 1% of the human population.',
      'Brief 20-30 minute power naps can partially offset acute sleep debt, but cannot fully replace restorative nocturnal Slow Wave Sleep.'
    ],
    evidenceStrength: 'Strong Consensus',
    citations: [
      {
        authors: 'Nedeltcheva, A. V., Kilkus, J. M., Imperial, J., Schoeller, D. A., Penev, P. D.',
        year: 2010,
        journal: 'Annals of Internal Medicine',
        doiOrUrl: 'https://doi.org/10.7326/0003-4819-153-7-201010050-00006',
        title: 'Insufficient sleep undermines dietary efforts to reduce adiposity'
      },
      {
        authors: 'Dattilo, M., Antunes, H. K., Medeiros, A., et al.',
        year: 2011,
        journal: 'Medical Hypotheses',
        doiOrUrl: 'https://doi.org/10.1016/j.mehy.2011.04.017',
        title: 'Sleep and muscle recovery: endocrinological and molecular basis for a new and promising hypothesis'
      }
    ],
    reviewDate: '2024-03-01',
    readTimeMinutes: 6
  },
  {
    id: 'fitness-myths-spot-reduction-toning',
    title: 'Scientific Deconstruction of Fitness Myths: Spot Reduction, "Toning", and the Anabolic Window',
    category: 'Mythbusters',
    plainSummary: 'You cannot spot-reduce belly fat with crunches. "Toning" is simply building muscle while reducing body fat percentage. And the "30-minute anabolic window" is a myth: total daily protein intake matters far more than chugging a shake within minutes of finishing a workout.',
    detailedExplanation: `Scientific investigation has thoroughly dismantled several widespread fitness industry dogmas:
    
    1. The Spot Reduction Myth:
    Subcutaneous adipose tissue is mobilized through systemic lipolysis. Lipase enzymes hydrolyze triglycerides into free fatty acids based on genetic hormone receptors, not local muscular contraction. Visconte et al. (2013) demonstrated that training abdominal muscles exclusively for 6 weeks produced zero localized fat loss compared to controls.
    
    2. The "Toning" Myth:
    Physiologically, muscles can only hypertrophy (grow), atrophy (shrink), or remain static in cross-sectional area. There is no biological mechanism for "toning" a muscle to make it hard without hypertrophy. The "toned" appearance is the visual outcome of possessing sufficient myofibrillar density underneath a low subcutaneous body fat percentage.
    
    3. The 30-Minute Anabolic Window Myth:
    In a comprehensive meta-analysis, Aragon and Schoenfeld (2013) established that the period of elevated Muscle Protein Synthesis remains receptive for 24 to 48 hours post-exercise. As long as a high-protein meal is ingested within roughly 2–3 hours on either side of a training session, muscle growth is fully optimized.`,
    practicalApplications: [
      'To lose abdominal fat, maintain a modest caloric deficit (300–500 kcal/day) paired with resistance training.',
      'Train with progressive resistance rather than ultra-light weights with 50 reps in pursuit of "toning".',
      'Do not stress about rushing to consume protein within 15 minutes of working out; focus on meeting total daily protein targets.'
    ],
    limitations: [
      'Extreme fasted training (>16 hours fast prior to heavy lifting) makes immediate post-workout protein ingestion slightly more beneficial.'
    ],
    evidenceStrength: 'Debunked Myth',
    citations: [
      {
        authors: 'Aragon, A. A., & Schoenfeld, B. J.',
        year: 2013,
        journal: 'Journal of the International Society of Sports Nutrition',
        doiOrUrl: 'https://doi.org/10.1186/1550-2783-10-5',
        title: 'Nutrient timing revisited: is there a post-exercise anabolic window?'
      },
      {
        authors: 'Vispute, S. S., Smith, J. D., LeCheminant, J. D., Hurley, K. S.',
        year: 2011,
        journal: 'Journal of Strength and Conditioning Research',
        doiOrUrl: 'https://doi.org/10.1519/JSC.0b013e3181fb4a46',
        title: 'The effect of abdominal exercise on abdominal fat'
      }
    ],
    reviewDate: '2024-05-15',
    readTimeMinutes: 7
  }
];

export const RESEARCH_CATEGORIES = [
  'All',
  'Hypertrophy',
  'Strength',
  'Programming',
  'Nutrition',
  'Recovery',
  'Biomechanics',
  'Mythbusters'
] as const;
