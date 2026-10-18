import { DailyMealPlan, NutritionGoal } from '../types';

export interface NutritionScienceTopic {
  id: string;
  title: string;
  category: 'Energy Balance' | 'Protein Science' | 'Carbohydrate Timing' | 'Fats & Hormones' | 'Hydration & Micros';
  keyTakeaway: string;
  detailedAnalysis: string;
  practicalGuidelines: string[];
  citations: {
    authors: string;
    year: number;
    title: string;
    journal: string;
    doi?: string;
  }[];
}

export const NUTRITION_SCIENCE_RESEARCH: NutritionScienceTopic[] = [
  {
    id: 'protein-distribution-mps',
    title: 'Protein Distribution & Muscle Protein Synthesis (MPS)',
    category: 'Protein Science',
    keyTakeaway: 'Consume 1.6 to 2.2g of protein per kg of bodyweight per day, distributed across 3 to 5 meals with ~0.4g/kg and at least 2.7–3.0g leucine per meal to trigger the muscle protein synthesis threshold.',
    detailedAnalysis: 'Muscle Protein Synthesis is triggered in a pulsatile manner dictated by the intracellular leucine threshold (~3g of leucine per feeding). Once the threshold is surpassed, additional protein within the same bolus does not further increase the rate of acute MPS (the "muscle-full effect"). Optimal hypertrophy requires spacing protein doses every 3 to 4.5 hours to allow the refractory period to clear and restimulate the mTORC1 pathway.',
    practicalGuidelines: [
      'Target 1.6 - 2.2 g/kg (0.8 - 1.0 g/lb) of total daily protein for hypertrophy and strength.',
      'During aggressive caloric deficits, elevate protein to 2.2 - 2.6 g/kg to prevent catabolism of lean tissue.',
      'Distribute into 4 meals containing 30-45g of high-biological-value protein each (whey, eggs, chicken, Greek yogurt, or pea-rice blend).',
      'Consume 30-40g of slow-digesting protein (casein or cottage cheese) 30-45 minutes before sleep to sustain overnight amino acid availability.'
    ],
    citations: [
      {
        authors: 'Morton RW, Murphy KT, McKellar SR, et al.',
        year: 2018,
        title: 'A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults',
        journal: 'British Journal of Sports Medicine',
        doi: '10.1136/bjsports-2017-097608'
      },
      {
        authors: 'Schoenfeld BJ, Aragon AA.',
        year: 2018,
        title: 'How much protein can the body use in a single meal for muscle-building? Implications for daily distribution',
        journal: 'Journal of the International Society of Sports Nutrition',
        doi: '10.1186/s12970-018-0215-1'
      }
    ]
  },
  {
    id: 'energy-balance-tdee',
    title: 'Energy Balance & Caloric Periodization for Body Composition',
    category: 'Energy Balance',
    keyTakeaway: 'A controlled surplus of +250 to +350 kcal/day optimizes lean muscle gains while minimizing adipose storage, whereas a moderate deficit of -400 to -500 kcal/day (~15-20% under maintenance) maximizes fat oxidation while sparing skeletal muscle mass.',
    detailedAnalysis: 'The Mifflin-St Jeor equation provides the highest clinical accuracy for estimating Basal Metabolic Rate (BMR) in non-obese lifting populations. Multiplying BMR by Physical Activity Level (PAL) yields Total Daily Energy Expenditure (TDEE). Hypertrophy is an energetically costly anabolic process requiring roughly ~350-480 kcal excess per day to synthesize 1 kg of muscle tissue. Extreme "dirty bulking" surpluses (>700 kcal) yield no additional muscle gain over modest surpluses, only accelerating fat accumulation and worsening insulin sensitivity.',
    practicalGuidelines: [
      'Calculate BMR: Men = 10×weight(kg) + 6.25×height(cm) - 5×age(y) + 5; Women = 10×weight(kg) + 6.25×height(cm) - 5×age(y) - 161.',
      'Multiply by Activity Factor: 1.375 (1-3 gym days/wk), 1.55 (4-5 days/wk), or 1.725 (6-7 days/wk intense training).',
      'Lean Bulk rate of weight gain target: 0.25% - 0.5% of bodyweight per week for intermediate lifters.',
      'Fat Loss rate of weight loss target: 0.5% - 1.0% of bodyweight per week to preserve maximum power and lean mass.'
    ],
    citations: [
      {
        authors: 'Helms ER, Aragon AA, Fitschen PJ.',
        year: 2014,
        title: 'Evidence-based recommendations for natural bodybuilding contest preparation: nutrition and supplementation',
        journal: 'Journal of the International Society of Sports Nutrition',
        doi: '10.1186/1550-2783-11-20'
      },
      {
        authors: 'Garthe I, Raastad T, Refsnes PE, et al.',
        year: 2011,
        title: 'Effect of two different weight-loss rates on body composition and strength and power-related performance in elite athletes',
        journal: 'International Journal of Sport Nutrition and Exercise Metabolism'
      }
    ]
  },
  {
    id: 'carbohydrate-glycogen-timing',
    title: 'Carbohydrate Periodization & Workout Fueling',
    category: 'Carbohydrate Timing',
    keyTakeaway: 'Carbohydrates are the primary substrate for anaerobic glycolysis during intense weightlifting. Consuming 1-2g/kg of complex carbs 2 hours pre-workout maximizes intramuscular glycogen stores and performance.',
    detailedAnalysis: 'Intense resistance exercise derives over 80% of its ATP replenishment from anaerobic glycogenolysis. Low glycogen status impairs power output, reduces total session training volume by up to 25%, and amplifies post-workout cortisol secretion. Carbohydrate intake triggers insulin secretion, which suppresses muscle protein breakdown (MPB) and accelerates the replenishment of muscle glycogen stores via GLUT4 transporter upregulation post-workout.',
    practicalGuidelines: [
      'Daily Target: 3 to 5 g/kg for moderate resistance training; 5 to 8 g/kg for high-volume athletic conditioning.',
      'Pre-Workout (90-120 min before): 40-75g of complex, moderate-GI carbohydrates (oatmeal, bananas, rice, sweet potatoes) with low fat/fiber for rapid gastric emptying.',
      'Post-Workout (within 60-90 min): 40-60g carbohydrates paired with 30-40g protein to maximize glycogen resynthesis and suppress proteolysis.'
    ],
    citations: [
      {
        authors: 'Thomas DT, Erdman KA, Burke LM.',
        year: 2016,
        title: 'Position of the Academy of Nutrition and Dietetics, Dietitians of Canada, and the American College of Sports Medicine: Nutrition and Athletic Performance',
        journal: 'Journal of the Academy of Nutrition and Dietetics',
        doi: '10.1016/j.jand.2015.12.006'
      }
    ]
  },
  {
    id: 'dietary-fats-hormones',
    title: 'Essential Fatty Acids, Lipids & Endocrine Function',
    category: 'Fats & Hormones',
    keyTakeaway: 'Maintain dietary fat between 20% and 35% of total caloric intake. Diets dropping below 15-20% fat induce significant declines in free testosterone, luteinizing hormone, and fat-soluble vitamin absorption.',
    detailedAnalysis: 'Cholesterol is the biochemical precursor for all steroid hormones, including testosterone, estrogen, and cortisol. Polyunsaturated omega-3 fatty acids (EPA and DHA) downregulate pro-inflammatory cytokines (IL-6, TNF-alpha) and enhance muscle cell membrane fluidity, accelerating post-workout recovery and reducing Delayed Onset Muscle Soreness (DOMS).',
    practicalGuidelines: [
      'Keep fat at 0.7 - 1.2 g/kg (minimum 20% of total daily energy).',
      'Prioritize monounsaturated fats (extra virgin olive oil, avocados, almonds) and omega-3s (salmon, mackerel, chia seeds, walnuts).',
      'Supplement 2-3g of combined EPA/DHA daily if fatty fish is not consumed twice weekly.'
    ],
    citations: [
      {
        authors: 'Whittaker J, Wu K.',
        year: 2021,
        title: 'Low-fat diets and testosterone in men: Systematic review and meta-analysis of intervention studies',
        journal: 'The Journal of Steroid Biochemistry and Molecular Biology',
        doi: '10.1016/j.jsbmb.2021.105878'
      }
    ]
  },
  {
    id: 'hydration-electrolytes',
    title: 'Hydration Kinetics & Electrolyte Homeostasis',
    category: 'Hydration & Micros',
    keyTakeaway: 'A mere 2% drop in bodyweight from dehydration causes a measurable 10-15% reduction in 1-rep max strength, power output, and cognitive alertness during workouts.',
    detailedAnalysis: 'Skeletal muscle is approximately 75% water. Intracellular water retention drives cell swelling, which functions as an anabolic signaling trigger for protein synthesis. Muscle contraction requires rapid sodium and potassium flux across the sarcolemma, while calcium ions mediate actin-myosin cross-bridge cycling. Without adequate sodium and fluid, cramping and reduced motor unit recruitment occur.',
    practicalGuidelines: [
      'Baseline Intake: 35-45 ml per kg of bodyweight per day (~3.0 - 4.5 liters for active athletes).',
      'Drink 500 ml of water with a pinch of sea salt (300-500mg sodium) 45 minutes prior to training.',
      'Sip 500-750 ml of electrolyte water per hour of vigorous lifting in warm gym environments.'
    ],
    citations: [
      {
        authors: 'Judelson DA, Maresh CM, Anderson JM, et al.',
        year: 2007,
        title: 'Hydration and muscular performance: Does fluid balance affect strength, power and high-intensity endurance?',
        journal: 'Sports Medicine',
        doi: '10.2165/00007256-200737100-00006'
      }
    ]
  }
];

export const GOAL_MEAL_PLANS: Record<NutritionGoal, DailyMealPlan> = {
  hypertrophy: {
    id: 'hypertrophy-lean-bulk',
    goal: 'hypertrophy',
    title: 'Lean Muscle Hypertrophy & Anabolic Growth',
    subtitle: 'Calculated 300 kcal surplus • High Leucine • Glycogen Optimizing',
    targetCalories: 2850,
    targetProteinGrams: 205,
    targetCarbsGrams: 345,
    targetFatGrams: 72,
    targetFiberGrams: 38,
    summary: 'Engineered for dedicated lifters looking to maximize muscle protein synthesis, progressive strength gains, and cell volumization with minimal adipose accumulation.',
    scientificRationale: [
      'Structured around 4 distinct 40-50g protein pulses every 3.5 hours to repeatedly activate mTORC1.',
      'Complex carbohydrates timed before and after resistance training to fuel glycolytic demand and accelerate glycogen replenishment.',
      'Healthy monounsaturated and omega-3 fats supporting testosterone synthesis and cellular membrane elasticity.'
    ],
    meals: [
      {
        id: 'hyp-1',
        name: 'Anabolic Power Oatmeal & Scrambled Eggs',
        mealType: 'Breakfast',
        description: 'Warm rolled oats with blueberries, whey protein, honey, paired with whole pasture-raised eggs.',
        prepTimeMinutes: 8,
        calories: 680,
        proteinGrams: 48,
        carbsGrams: 78,
        fatGrams: 20,
        fiberGrams: 10,
        ingredients: [
          { item: 'Rolled Oats (dry)', amount: '80g (1 cup)', category: 'Grains' },
          { item: 'Whey Protein Isolate (Vanilla or Chocolate)', amount: '30g (1 scoop)', category: 'Protein' },
          { item: 'Whole Eggs (Pasture-raised)', amount: '2 large eggs', category: 'Protein' },
          { item: 'Egg Whites', amount: '100g (1/2 cup)', category: 'Protein' },
          { item: 'Fresh Blueberries', amount: '75g (1/2 cup)', category: 'Produce' },
          { item: 'Raw Honey', amount: '1 tbsp (15g)', category: 'Seasoning & Other' },
          { item: 'Ground Ceylon Cinnamon', amount: '1/2 tsp', category: 'Seasoning & Other' }
        ],
        instructions: [
          'Cook rolled oats in 1.5 cups of water or unsweetened almond milk for 4 minutes until thick.',
          'Let oatmeal cool slightly for 60 seconds, then whisk in the whey protein isolate, honey, and cinnamon.',
          'Top with blueberries.',
          'In a nonstick skillet with a light olive spray, scramble the whole eggs and egg whites until fluffy.',
          'Serve side-by-side with 500ml water.'
        ],
        scienceNote: 'Provides 3.4g of bioavailable leucine from eggs and whey to stimulate the morning muscle protein synthesis threshold.',
        micronutrients: ['Choline', 'Lutein', 'Vitamin D', 'Zinc', 'Antioxidants']
      },
      {
        id: 'hyp-2',
        name: 'Greek Yogurt & Honey Berry Crunch',
        mealType: 'Morning Snack',
        description: 'Rich thick 0% Greek yogurt folded with raw almonds, chia seeds, and banana slices.',
        prepTimeMinutes: 3,
        calories: 360,
        proteinGrams: 30,
        carbsGrams: 38,
        fatGrams: 10,
        fiberGrams: 6,
        ingredients: [
          { item: 'Plain Greek Yogurt (0% fat)', amount: '225g (1 cup)', category: 'Dairy' },
          { item: 'Raw Whole Almonds', amount: '20g (approx 16 almonds)', category: 'Healthy Fats' },
          { item: 'Chia Seeds', amount: '1 tbsp (12g)', category: 'Healthy Fats' },
          { item: 'Banana (sliced)', amount: '1/2 medium', category: 'Produce' }
        ],
        instructions: [
          'Scoop Greek yogurt into a bowl.',
          'Top with sliced banana, crushed raw almonds, and chia seeds.',
          'Stir gently and enjoy as a mid-morning sustained amino acid pulse.'
        ],
        scienceNote: 'Casein-rich dairy releases amino acids slowly over 3 hours, keeping muscle breakdown at near zero levels.',
        micronutrients: ['Calcium', 'Magnesium', 'Potassium', 'Probiotics']
      },
      {
        id: 'hyp-3',
        name: 'Grilled Chicken Breast, Jasmine Rice & Roasted Broccoli',
        mealType: 'Lunch',
        description: 'Herb-seasoned grilled chicken breast over fragrant jasmine rice with garlic-roasted broccoli and avocado.',
        prepTimeMinutes: 15,
        calories: 720,
        proteinGrams: 52,
        carbsGrams: 82,
        fatGrams: 18,
        fiberGrams: 9,
        ingredients: [
          { item: 'Skinless Chicken Breast (raw weight)', amount: '220g (cooked ~175g)', category: 'Protein' },
          { item: 'Jasmine White Rice (cooked)', amount: '250g (1.25 cups)', category: 'Grains' },
          { item: 'Steamed Broccoli Florets', amount: '150g (1.5 cups)', category: 'Produce' },
          { item: 'Fresh Avocado', amount: '50g (1/4 medium avocado)', category: 'Healthy Fats' },
          { item: 'Extra Virgin Olive Oil', amount: '1 tsp (5ml)', category: 'Healthy Fats' },
          { item: 'Sea Salt & Smoked Paprika', amount: 'To taste', category: 'Seasoning & Other' }
        ],
        instructions: [
          'Season chicken breast with smoked paprika, sea salt, black pepper, and garlic powder.',
          'Pan-sear or grill over medium-high heat for 6-7 minutes per side until internal temperature hits 165°F (74°C).',
          'Steam broccoli for 4 minutes until vibrant green with a tender crunch.',
          'Plate over fluffy jasmine rice, drizzle with extra virgin olive oil, and top with sliced avocado.'
        ],
        scienceNote: 'Jasmine rice replenishes liver and muscle glycogen with minimal digestive friction, priming energy for afternoon training.',
        micronutrients: ['B-Complex Vitamins', 'Niacin', 'Selenium', 'Sulforaphane']
      },
      {
        id: 'hyp-4',
        name: 'Pre-Workout Fuel: Sourdough, Peanut Butter & Banana',
        mealType: 'Pre-Workout Fuel',
        description: 'Easily digestible complex carbs with natural electrolytes and healthy fats 90 minutes before lifting.',
        prepTimeMinutes: 3,
        calories: 340,
        proteinGrams: 14,
        carbsGrams: 52,
        fatGrams: 10,
        fiberGrams: 5,
        ingredients: [
          { item: 'Artisan Sourdough Bread', amount: '2 slices (70g)', category: 'Grains' },
          { item: 'Natural Peanut Butter', amount: '1 tbsp (16g)', category: 'Healthy Fats' },
          { item: 'Banana (sliced)', amount: '1/2 banana', category: 'Produce' },
          { item: 'Sea Salt Pinch', amount: '1 pinch', category: 'Seasoning & Other' }
        ],
        instructions: [
          'Toast sourdough bread until golden and crisp.',
          'Spread natural peanut butter evenly over warm toast.',
          'Top with sliced banana and a light dusting of sea salt for workout electrolyte priming.',
          'Consume 60 to 90 minutes before your workout alongside 400ml water.'
        ],
        scienceNote: 'Sodium from sea salt expands vascular volume and enhances muscle pumps; potassium from banana prevents cramping.',
        micronutrients: ['Potassium', 'Sodium', 'Vitamin B6', 'Folate']
      },
      {
        id: 'hyp-5',
        name: 'Atlantic Salmon, Roasted Sweet Potatoes & Asparagus',
        mealType: 'Post-Workout Dinner',
        description: 'Omega-3 rich wild salmon fillet with caramelized sweet potato wedges and tender asparagus spears.',
        prepTimeMinutes: 20,
        calories: 750,
        proteinGrams: 61,
        carbsGrams: 95,
        fatGrams: 14,
        fiberGrams: 8,
        ingredients: [
          { item: 'Wild Atlantic Salmon Fillet', amount: '200g (7 oz)', category: 'Protein' },
          { item: 'Sweet Potatoes (cubed & roasted)', amount: '300g (approx 2 medium)', category: 'Produce' },
          { item: 'Fresh Asparagus Spears', amount: '150g (1 bunch)', category: 'Produce' },
          { item: 'Lemon & Garlic Butter or Olive Oil', amount: '1 tsp', category: 'Healthy Fats' },
          { item: 'Coarse Sea Salt & Crushed Pepper', amount: 'To taste', category: 'Seasoning & Other' }
        ],
        instructions: [
          'Preheat oven to 400°F (200°C). Toss cubed sweet potatoes with sea salt and roast for 25 minutes until caramelized.',
          'Season salmon with sea salt, pepper, and lemon juice. Pan-sear skin side down for 5 minutes, flip, and finish for 3 minutes.',
          'Pan-sauté asparagus spears in the remaining pan juices for 3 minutes.',
          'Serve together hot for supreme post-workout recovery.'
        ],
        scienceNote: 'EPA and DHA omega-3 fatty acids attenuate eccentric-exercise induced inflammation and enhance muscle protein synthesis signaling.',
        micronutrients: ['Omega-3 (EPA/DHA)', 'Vitamin A (Beta-Carotene)', 'Potassium', 'Vitamin B12']
      }
    ]
  },

  fat_loss: {
    id: 'fat-loss-shred',
    goal: 'fat_loss',
    title: 'Fat Loss, Definition & Muscle Sparing',
    subtitle: '500 kcal deficit • High Satiety Index • 2.2g/kg Protein Guard',
    targetCalories: 2050,
    targetProteinGrams: 195,
    targetCarbsGrams: 175,
    targetFatGrams: 55,
    targetFiberGrams: 42,
    summary: 'High-volume, fiber-rich, nutrient-dense nutrition protocol designed to torch adipose tissue, control hunger hormones (ghrelin), and preserve hard-earned muscle mass.',
    scientificRationale: [
      'Elevated protein intake (2.2g/kg) leverages high Diet-Induced Thermogenesis (TEF) and guards muscle during negative energy balance.',
      'High-volume, low-caloric-density vegetables (zucchini, spinach, cauliflower rice, berries) maximize gastric stretch receptors.',
      'Strategic carbohydrate timing concentrated pre- and post-workout to maintain gym strength and performance.'
    ],
    meals: [
      {
        id: 'fat-1',
        name: 'Veggie Egg White Frittata & Berries',
        mealType: 'Breakfast',
        description: 'Fluffy whole egg and egg white frittata loaded with spinach, bell peppers, tomatoes, and fresh strawberries.',
        prepTimeMinutes: 10,
        calories: 380,
        proteinGrams: 42,
        carbsGrams: 32,
        fatGrams: 9,
        fiberGrams: 8,
        ingredients: [
          { item: 'Liquid Egg Whites', amount: '200g (approx 6 egg whites)', category: 'Protein' },
          { item: 'Whole Egg', amount: '1 large egg', category: 'Protein' },
          { item: 'Baby Spinach (fresh)', amount: '50g (2 packed cups)', category: 'Produce' },
          { item: 'Red Bell Pepper (diced)', amount: '50g', category: 'Produce' },
          { item: 'Fresh Strawberries', amount: '120g (1 cup)', category: 'Produce' },
          { item: 'Whole Grain Sprouted Toast (Ezekiel)', amount: '1 slice (34g)', category: 'Grains' }
        ],
        instructions: [
          'In a skillet with olive oil spray, sauté diced bell peppers and baby spinach until wilted.',
          'Whisk whole egg and liquid egg whites with sea salt and black pepper.',
          'Pour over veggies and cook on low heat until set, folding gently into an omelet or frittata.',
          'Serve with 1 slice of toasted sprouted bread and 1 cup of fresh strawberries on the side.'
        ],
        scienceNote: 'Over 40g of pure protein with huge volume and low energy density sets an anti-craving baseline for the entire day.',
        micronutrients: ['Lycopene', 'Vitamin C', 'Folate', 'Lutein', 'Potassium']
      },
      {
        id: 'fat-2',
        name: 'Turkey Breast, Quinoa & Massive Green Bowl',
        mealType: 'Lunch',
        description: 'Lean roasted turkey breast over warm quinoa, mixed greens, cucumbers, and apple cider vinaigrette.',
        prepTimeMinutes: 8,
        calories: 490,
        proteinGrams: 50,
        carbsGrams: 45,
        fatGrams: 12,
        fiberGrams: 10,
        ingredients: [
          { item: 'Lean Turkey Breast (99% lean or roasted breast)', amount: '200g', category: 'Protein' },
          { item: 'Cooked Quinoa', amount: '140g (3/4 cup)', category: 'Grains' },
          { item: 'Mixed Baby Greens & Romaine', amount: '100g (3 cups)', category: 'Produce' },
          { item: 'Cucumber & Cherry Tomatoes', amount: '100g', category: 'Produce' },
          { item: 'Extra Virgin Olive Oil', amount: '1 tsp (5ml)', category: 'Healthy Fats' },
          { item: 'Apple Cider Vinegar & Dijon Mustard', amount: '1 tbsp each', category: 'Seasoning & Other' }
        ],
        instructions: [
          'Slice warm roasted turkey breast into strips.',
          'Arrange mixed baby greens and crisp cucumbers in a wide bowl.',
          'Add warm quinoa in the center and top with turkey.',
          'Whisk olive oil, apple cider vinegar, and dijon mustard with cracked pepper, then drizzle over the bowl.'
        ],
        scienceNote: 'Quinoa provides complete plant amino acids and slow-digesting complex carbs with a low glycemic index, stabilizing insulin.',
        micronutrients: ['Magnesium', 'Iron', 'Zinc', 'Vitamin K', 'Polyphenols']
      },
      {
        id: 'fat-3',
        name: 'Pre-Workout Whey & Rice Cake Stack',
        mealType: 'Pre-Workout Fuel',
        description: 'Rapid-absorbing, fat-free pre-training fuel for high glycogen utilization and zero digestive heaviness.',
        prepTimeMinutes: 2,
        calories: 220,
        proteinGrams: 28,
        carbsGrams: 24,
        fatGrams: 1.5,
        fiberGrams: 2,
        ingredients: [
          { item: 'Whey Protein Isolate', amount: '30g (1 scoop)', category: 'Protein' },
          { item: 'Lightly Salted Rice Cakes', amount: '2 cakes (18g)', category: 'Grains' },
          { item: 'Ground Cinnamon & Pinch Sea Salt', amount: '1 pinch', category: 'Seasoning & Other' },
          { item: 'Water or Black Coffee', amount: '350ml', category: 'Seasoning & Other' }
        ],
        instructions: [
          'Mix whey protein isolate in cold water until smooth.',
          'Enjoy with 2 crispy rice cakes 45-60 minutes before your workout session.',
          'Add black coffee or green tea if desired for metabolic rate elevation.'
        ],
        scienceNote: 'Fast-digesting amylopectin carbs from rice cakes provide direct circulating blood glucose to fuel lifting sets.',
        micronutrients: ['Sodium', 'Leucine', 'BCAAs']
      },
      {
        id: 'fat-4',
        name: 'Pan-Seared White Fish / Cod, Sweet Potato & Asparagus',
        mealType: 'Post-Workout Dinner',
        description: 'Ultra-lean Pacific cod or halibut with baked sweet potato cubes and lemon-garlic asparagus.',
        prepTimeMinutes: 15,
        calories: 580,
        proteinGrams: 52,
        carbsGrams: 58,
        fatGrams: 12,
        fiberGrams: 12,
        ingredients: [
          { item: 'Pacific Wild Cod or Halibut Fillet', amount: '230g (8 oz)', category: 'Protein' },
          { item: 'Sweet Potato (baked)', amount: '200g (1 medium)', category: 'Produce' },
          { item: 'Fresh Asparagus', amount: '150g', category: 'Produce' },
          { item: 'Cauliflower Rice (steamed volume booster)', amount: '150g (1.5 cups)', category: 'Produce' },
          { item: 'Avocado Oil', amount: '1 tsp', category: 'Healthy Fats' },
          { item: 'Lemon wedges & Garlic Herb seasoning', amount: 'To taste', category: 'Seasoning & Other' }
        ],
        instructions: [
          'Season cod fillets with garlic powder, dill, sea salt, and lemon pepper.',
          'Sear in a skillet with 1 tsp avocado oil for 3-4 minutes per side until flaky.',
          'Steam cauliflower rice and asparagus for 3 minutes.',
          'Serve beside baked sweet potato and freshly squeezed lemon juice.'
        ],
        scienceNote: 'White fish contains virtually zero saturated fat and possesses one of the highest satiety index ratings of any tested food.',
        micronutrients: ['Iodine', 'Selenium', 'Vitamin D3', 'Beta-Carotene']
      },
      {
        id: 'fat-5',
        name: 'Micellar Casein Protein Pudding & Almonds',
        mealType: 'Evening Recovery',
        description: 'Slow-digesting nighttime protein cream that prevents nocturnal muscle breakdown while you sleep.',
        prepTimeMinutes: 2,
        calories: 220,
        proteinGrams: 28,
        carbsGrams: 8,
        fatGrams: 8,
        fiberGrams: 3,
        ingredients: [
          { item: 'Micellar Casein Protein (or Low Fat Cottage Cheese)', amount: '30g (1 scoop)', category: 'Protein' },
          { item: 'Raw Almonds (crushed)', amount: '12g (approx 10 almonds)', category: 'Healthy Fats' },
          { item: 'Cold Water or Almond Milk', amount: '100ml (to pudding consistency)', category: 'Dairy' }
        ],
        instructions: [
          'Slowly whisk cold water or unsweetened almond milk into the casein powder until a smooth pudding forms.',
          'Top with crushed almonds and a sprinkle of cinnamon.',
          'Eat 30-45 minutes before sleep.'
        ],
        scienceNote: 'Casein forms a gentle gel in the stomach that releases amino acids for up to 7 hours, sustaining overnight recovery in a deficit.',
        micronutrients: ['Calcium', 'Magnesium', 'Vitamin E']
      }
    ]
  },

  strength: {
    id: 'strength-power',
    goal: 'strength',
    title: 'Maximum Strength, Power & Neuromuscular Drive',
    subtitle: 'High Glycogen Availability • Creatine Rich • Explosive Output',
    targetCalories: 3200,
    targetProteinGrams: 215,
    targetCarbsGrams: 410,
    targetFatGrams: 85,
    targetFiberGrams: 40,
    summary: 'Fueling maximal 1RM efforts, nervous system recovery, tendon collagen integrity, and heavy compound barbell lifts (Squat, Bench, Deadlift, Overhead Press).',
    scientificRationale: [
      'High carbohydrate availability ensures intracellular glycogen saturation for phosphocreatine resynthesis between heavy sets.',
      'Grass-fed beef and wild salmon provide naturally occurring creatine, carnitine, heme iron, and bioavailable zinc.',
      'Adequate healthy fats maintain synovial joint lubrication and systemic androgenic hormone production.'
    ],
    meals: [
      {
        id: 'str-1',
        name: 'Strength Athlete Power Breakfast: 3 Whole Eggs & Bagel',
        mealType: 'Breakfast',
        description: 'Toasted whole grain bagel with cream cheese, 3 pasture-raised scrambled eggs, and fresh orange slices.',
        prepTimeMinutes: 10,
        calories: 780,
        proteinGrams: 46,
        carbsGrams: 88,
        fatGrams: 26,
        fiberGrams: 8,
        ingredients: [
          { item: 'Whole Grain Everything Bagel', amount: '1 whole bagel (95g)', category: 'Grains' },
          { item: 'Pasture-Raised Whole Eggs', amount: '3 large eggs', category: 'Protein' },
          { item: 'Liquid Egg Whites', amount: '75g (1/3 cup)', category: 'Protein' },
          { item: 'Whipped Cream Cheese or Grass-Fed Butter', amount: '1.5 tbsp (20g)', category: 'Dairy' },
          { item: 'Fresh Navel Orange', amount: '1 whole medium', category: 'Produce' }
        ],
        instructions: [
          'Scramble whole eggs and egg whites in a skillet until soft and creamy.',
          'Toast the bagel until crispy, then spread whipped cream cheese.',
          'Layer scrambled eggs over bagel halves or serve alongside fresh orange slices.'
        ],
        scienceNote: 'Whole eggs provide dietary cholesterol and choline, both essential for cell membrane repair and acetylcholine nerve transmission.',
        micronutrients: ['Choline', 'Vitamin B12', 'Vitamin C', 'Lutein']
      },
      {
        id: 'str-2',
        name: 'Grass-Fed Ground Beef, Jasmine Rice & Avocado Bowl',
        mealType: 'Lunch',
        description: 'Lean grass-fed ground beef seasoned with cumin and garlic over high-carb jasmine rice and sliced avocado.',
        prepTimeMinutes: 12,
        calories: 820,
        proteinGrams: 58,
        carbsGrams: 94,
        fatGrams: 22,
        fiberGrams: 8,
        ingredients: [
          { item: '90/10 Grass-Fed Ground Beef', amount: '220g (cooked weight ~175g)', category: 'Protein' },
          { item: 'Jasmine White Rice (cooked)', amount: '300g (1.5 cups)', category: 'Grains' },
          { item: 'Fresh Avocado', amount: '60g (approx 1/3 avocado)', category: 'Healthy Fats' },
          { item: 'Bone Broth (used to simmer rice)', amount: '100ml', category: 'Protein' },
          { item: 'Garlic Powder, Cumin & Sea Salt', amount: 'To taste', category: 'Seasoning & Other' }
        ],
        instructions: [
          'Brown grass-fed ground beef in a skillet with cumin, garlic, and sea salt until fully cooked.',
          'Warm jasmine rice and toss with bone broth for savory moisture.',
          'Top with cooked ground beef and sliced avocado.'
        ],
        scienceNote: 'Beef provides 5g of natural creatine per kg of meat plus heme iron to maximize red blood cell oxygen carrying capacity.',
        micronutrients: ['Heme Iron', 'Zinc', 'Creatine', 'Carnosine', 'Vitamin B12']
      },
      {
        id: 'str-3',
        name: 'Pre-Lift Carb-Load: Oats, Honey & Whey Shake',
        mealType: 'Pre-Workout Fuel',
        description: 'Power shake designed to maximize glycogen stores and blood amino acid concentration 75 minutes before heavy lifting.',
        prepTimeMinutes: 3,
        calories: 450,
        proteinGrams: 35,
        carbsGrams: 65,
        fatGrams: 6,
        fiberGrams: 7,
        ingredients: [
          { item: 'Instant Quick Oats', amount: '60g', category: 'Grains' },
          { item: 'Whey Protein Isolate', amount: '30g', category: 'Protein' },
          { item: 'Pure Raw Honey', amount: '1.5 tbsp (22g)', category: 'Seasoning & Other' },
          { item: 'Banana', amount: '1 medium', category: 'Produce' },
          { item: 'Sea Salt', amount: '1/4 tsp', category: 'Seasoning & Other' }
        ],
        instructions: [
          'Blend oats, whey protein, banana, honey, and sea salt with 400ml water or almond milk until silky.',
          'Drink 60 to 75 minutes prior to hitting heavy squats or deadlifts.'
        ],
        scienceNote: 'The combination of fast (glucose/fructose) and medium-speed complex starches sustains power output across multi-set training.',
        micronutrients: ['Potassium', 'Sodium', 'Magnesium']
      },
      {
        id: 'str-4',
        name: 'Roast Chicken Thighs, Baked Potatoes & Buttered Green Beans',
        mealType: 'Post-Workout Dinner',
        description: 'Hearty high-energy recovery meal delivering electrolytes, collagen, and sustained glycogen replenishment.',
        prepTimeMinutes: 20,
        calories: 840,
        proteinGrams: 56,
        carbsGrams: 110,
        fatGrams: 20,
        fiberGrams: 11,
        ingredients: [
          { item: 'Boneless Skinless Chicken Thighs', amount: '220g', category: 'Protein' },
          { item: 'Russet Baking Potatoes', amount: '350g (approx 2 medium)', category: 'Produce' },
          { item: 'Fresh Green Beans', amount: '150g', category: 'Produce' },
          { item: 'Grass-Fed Butter or Olive Oil', amount: '1 tbsp (14g)', category: 'Dairy' },
          { item: 'Rosemary, Paprika & Sea Salt', amount: 'To taste', category: 'Seasoning & Other' }
        ],
        instructions: [
          'Pierce russet potatoes with a fork and microwave or bake until fluffy and tender.',
          'Season chicken thighs with smoked paprika, sea salt, and rosemary. Pan-sear or grill until golden and juicy (165°F).',
          'Steam green beans for 4 minutes and toss in grass-fed butter.',
          'Split baked potatoes open, season with sea salt, and serve with the chicken and green beans.'
        ],
        scienceNote: 'White russet potatoes have an extremely high glycemic and insulinogenic index, ideal for rapid post-training muscle glycogen resynthesis.',
        micronutrients: ['Potassium (over 1500mg)', 'Vitamin B6', 'Vitamin C']
      },
      {
        id: 'str-5',
        name: 'Whole Milk Greek Yogurt & Mixed Nuts',
        mealType: 'Evening Recovery',
        description: 'Sustained night recovery fueling tendon and muscle remodeling during sleep cycles.',
        prepTimeMinutes: 2,
        calories: 310,
        proteinGrams: 26,
        carbsGrams: 18,
        fatGrams: 14,
        fiberGrams: 4,
        ingredients: [
          { item: 'Whole Milk Greek Yogurt (5% fat)', amount: '200g', category: 'Dairy' },
          { item: 'Raw Walnuts & Almonds', amount: '20g', category: 'Healthy Fats' },
          { item: 'Wild Blackberries', amount: '50g', category: 'Produce' }
        ],
        instructions: [
          'Combine whole Greek yogurt with fresh berries and crushed walnuts.',
          'Enjoy 30 minutes before sleep.'
        ],
        scienceNote: 'Slow casein release paired with healthy dietary lipids prevents overnight proteolysis and supports growth hormone peaks.',
        micronutrients: ['Zinc', 'Calcium', 'Omega-3 ALA']
      }
    ]
  },

  endurance: {
    id: 'endurance-conditioning',
    goal: 'endurance',
    title: 'Endurance, Conditioning & High-Volume Stamina',
    subtitle: 'High Carbohydrate (6g/kg) • Electrolyte Balanced • Rapid Glycogen Turnover',
    targetCalories: 2600,
    targetProteinGrams: 165,
    targetCarbsGrams: 375,
    targetFatGrams: 60,
    targetFiberGrams: 44,
    summary: 'Designed for functional fitness, CrossFit athletes, runners, cyclists, and HIIT trainees needing relentless aerobic and anaerobic engine output.',
    scientificRationale: [
      'Focuses on 5-7g/kg carbohydrate availability to prevent glycogen depletion and central nervous system fatigue.',
      'Electrolyte density (Sodium, Potassium, Magnesium) optimized to offset heavy sweat rates and muscle cramping.',
      'Lean easily digestible protein sources that minimize gastrointestinal distress during intense conditioning work.'
    ],
    meals: [
      {
        id: 'end-1',
        name: 'Endurance Berry Porridge & Egg White Toast',
        mealType: 'Breakfast',
        description: 'Creamy rolled oats cooked with chia seeds, banana slices, honey, paired with soft egg whites on sourdough.',
        prepTimeMinutes: 8,
        calories: 620,
        proteinGrams: 38,
        carbsGrams: 95,
        fatGrams: 11,
        fiberGrams: 13,
        ingredients: [
          { item: 'Rolled Oats', amount: '90g (1 cup)', category: 'Grains' },
          { item: 'Chia Seeds', amount: '1 tbsp (12g)', category: 'Healthy Fats' },
          { item: 'Liquid Egg Whites', amount: '180g', category: 'Protein' },
          { item: 'Sourdough Bread', amount: '1 slice (35g)', category: 'Grains' },
          { item: 'Banana (sliced)', amount: '1 whole', category: 'Produce' },
          { item: 'Maple Syrup', amount: '1 tbsp', category: 'Seasoning & Other' }
        ],
        instructions: [
          'Simmer oats and chia seeds in water until creamy. Stir in pure maple syrup and top with sliced bananas.',
          'Scramble egg whites in a light pan and spoon onto toasted sourdough bread.',
          'Drink with 500ml of electrolyte water.'
        ],
        scienceNote: 'Provides soluble beta-glucan fiber and complex carbohydrates for sustained steady-state glycemic release.',
        micronutrients: ['Potassium', 'Soluble Fiber', 'B-Vitamins']
      },
      {
        id: 'end-2',
        name: 'Grilled Chicken, Brown Rice & Sweet Corn Medley',
        mealType: 'Lunch',
        description: 'Tender chicken breast strips over brown rice, black beans, sweet corn, and fresh lime salsa.',
        prepTimeMinutes: 12,
        calories: 690,
        proteinGrams: 48,
        carbsGrams: 96,
        fatGrams: 12,
        fiberGrams: 14,
        ingredients: [
          { item: 'Grilled Chicken Breast', amount: '180g', category: 'Protein' },
          { item: 'Brown Rice (cooked)', amount: '220g (1 cup)', category: 'Grains' },
          { item: 'Black Beans (rinsed & cooked)', amount: '100g (1/2 cup)', category: 'Produce' },
          { item: 'Sweet Corn', amount: '60g', category: 'Produce' },
          { item: 'Fresh Pico de Gallo / Salsa', amount: '3 tbsp', category: 'Produce' },
          { item: 'Olive Oil', amount: '1 tsp', category: 'Healthy Fats' }
        ],
        instructions: [
          'Combine warm brown rice, black beans, and sweet corn in a wide bowl.',
          'Slice grilled chicken breast and lay across the grain bowl.',
          'Top with fresh zesty salsa and a drizzle of olive oil.'
        ],
        scienceNote: 'Black beans and brown rice offer complementary amino acids, complex resistant starch, and natural potassium.',
        micronutrients: ['Magnesium', 'Folate', 'Phosphorus', 'Iron']
      },
      {
        id: 'end-3',
        name: 'Pre-Conditioning Dates & Hydration Fuel',
        mealType: 'Pre-Workout Fuel',
        description: 'Medjool dates with light almond butter and pink Himalayan salt for instant explosive glycogen release.',
        prepTimeMinutes: 2,
        calories: 280,
        proteinGrams: 6,
        carbsGrams: 54,
        fatGrams: 7,
        fiberGrams: 6,
        ingredients: [
          { item: 'Medjool Dates (pitted)', amount: '3 whole (72g)', category: 'Produce' },
          { item: 'Almond Butter', amount: '1 tbsp (16g)', category: 'Healthy Fats' },
          { item: 'Pink Himalayan Salt', amount: '1 generous pinch', category: 'Seasoning & Other' },
          { item: 'Cold Water', amount: '500ml', category: 'Seasoning & Other' }
        ],
        instructions: [
          'Slice open medjool dates and stuff each with a dollop of almond butter.',
          'Sprinkle lightly with coarse pink salt.',
          'Consume 45 minutes before intense conditioning or endurance training.'
        ],
        scienceNote: 'Medjool dates deliver high-potassium glucose and fructose that rapidly clear the stomach and fuel working muscles without cramping.',
        micronutrients: ['Potassium', 'Natural Sugars', 'Copper']
      },
      {
        id: 'end-4',
        name: 'Pan-Seared Salmon, Quinoa & Steamed Zucchini',
        mealType: 'Post-Workout Dinner',
        description: 'Lean wild salmon over fluffy quinoa with garlic zucchini and roasted carrots.',
        prepTimeMinutes: 18,
        calories: 720,
        proteinGrams: 49,
        carbsGrams: 88,
        fatGrams: 20,
        fiberGrams: 8,
        ingredients: [
          { item: 'Wild Salmon Fillet', amount: '180g', category: 'Protein' },
          { item: 'Cooked Quinoa', amount: '250g (1.25 cups)', category: 'Grains' },
          { item: 'Fresh Zucchini (sliced)', amount: '150g', category: 'Produce' },
          { item: 'Roasted Baby Carrots', amount: '100g', category: 'Produce' },
          { item: 'Olive Oil & Lemon juice', amount: '1 tsp each', category: 'Healthy Fats' }
        ],
        instructions: [
          'Pan-sear wild salmon fillet with sea salt and black pepper for 4 minutes per side.',
          'Sauté sliced zucchini in olive oil and minced garlic.',
          'Serve beside fluffy quinoa and steamed baby carrots with fresh lemon squeeze.'
        ],
        scienceNote: 'Omega-3 fatty acids accelerate systemic lactate clearance and mitigate exercise-induced oxidative stress.',
        micronutrients: ['Omega-3', 'Vitamin A', 'Selenium', 'Potassium']
      },
      {
        id: 'end-5',
        name: 'Recovery Whey Isolate & Banana Smoothie',
        mealType: 'Evening Recovery',
        description: 'Light evening shake providing pure whey peptide absorption and restorative electrolytes.',
        prepTimeMinutes: 2,
        calories: 240,
        proteinGrams: 27,
        carbsGrams: 30,
        fatGrams: 2,
        fiberGrams: 3,
        ingredients: [
          { item: 'Whey Protein Isolate', amount: '30g', category: 'Protein' },
          { item: 'Frozen Banana', amount: '1 small', category: 'Produce' },
          { item: 'Unsweetened Almond Milk', amount: '250ml', category: 'Dairy' }
        ],
        instructions: [
          'Blend whey isolate, frozen banana, and almond milk until smooth and frosty.',
          'Drink 45 minutes before sleep.'
        ],
        scienceNote: 'Fast amino acid assimilation combined with natural magnesium from bananas promotes restful sleep and tissue recovery.',
        micronutrients: ['Potassium', 'Magnesium', 'Vitamin B6']
      }
    ]
  },

  plant_based: {
    id: 'vegan-muscle-builder',
    goal: 'plant_based',
    title: '100% Plant-Based High-Protein Muscle Builder',
    subtitle: 'Complete Amino Acid Matrix • High Leucine • Zero Animal Products',
    targetCalories: 2550,
    targetProteinGrams: 180,
    targetCarbsGrams: 310,
    targetFatGrams: 65,
    targetFiberGrams: 52,
    summary: 'Scientifically formulated to overcome the traditional plant protein limiting factors through complementary amino acid pairing (grain + legume), elevated leucine density, and rich micronutrient density.',
    scientificRationale: [
      'Combines diverse plant protein sources (peas, brown rice, tofu, tempeh, lentils, hemp seeds) to ensure a complete Essential Amino Acid (EAA) profile.',
      'Slightly higher total protein target (1.8 - 2.0g/kg) accounts for ~10-15% lower bioavailability of plant-bound proteins due to cellulose and phytates.',
      'Features high-iron, high-zinc, and vitamin C pairings to maximize non-heme iron absorption.'
    ],
    meals: [
      {
        id: 'pln-1',
        name: 'Tofu Scramble, Sprouted Toast & Avocado',
        mealType: 'Breakfast',
        description: 'High-protein organic firm tofu scrambled with turmeric, nutritional yeast, spinach, and avocado toast.',
        prepTimeMinutes: 10,
        calories: 550,
        proteinGrams: 38,
        carbsGrams: 48,
        fatGrams: 22,
        fiberGrams: 12,
        ingredients: [
          { item: 'High-Protein Organic Firm Tofu', amount: '220g', category: 'Protein' },
          { item: 'Nutritional Yeast (fortified with B12)', amount: '2 tbsp (16g)', category: 'Protein' },
          { item: 'Baby Spinach', amount: '50g (2 cups)', category: 'Produce' },
          { item: 'Sprouted Ezekiel Bread', amount: '2 slices (68g)', category: 'Grains' },
          { item: 'Fresh Avocado', amount: '40g', category: 'Healthy Fats' },
          { item: 'Ground Turmeric, Black Salt (Kala Namak) & Cumin', amount: '1/2 tsp each', category: 'Seasoning & Other' }
        ],
        instructions: [
          'Crumble firm tofu with hands into a hot skillet lightly coated with olive oil spray.',
          'Add turmeric, nutritional yeast, cumin, and black salt (which provides authentic eggy aroma).',
          'Toss in baby spinach and cook for 5 minutes until spinach wilts and tofu is golden.',
          'Serve with toasted sprouted bread topped with smashed avocado.'
        ],
        scienceNote: 'Nutritional yeast provides complete protein along with 100% RDA of bioactive Vitamin B12; tofu provides 38g of bioavailable plant protein.',
        micronutrients: ['Vitamin B12', 'Isoflavones', 'Calcium', 'Iron']
      },
      {
        id: 'pln-2',
        name: 'Tempeh, Warm Quinoa & Edamame Power Bowl',
        mealType: 'Lunch',
        description: 'Marinated pan-crisped tempeh over quinoa, steamed shelled edamame, and broccoli with tahini drizzle.',
        prepTimeMinutes: 15,
        calories: 680,
        proteinGrams: 48,
        carbsGrams: 68,
        fatGrams: 24,
        fiberGrams: 16,
        ingredients: [
          { item: 'Organic Tempeh (sliced)', amount: '150g', category: 'Protein' },
          { item: 'Shelled Edamame (steamed)', amount: '100g (3/4 cup)', category: 'Protein' },
          { item: 'Cooked Quinoa', amount: '180g (1 cup)', category: 'Grains' },
          { item: 'Steamed Broccoli Florets', amount: '120g', category: 'Produce' },
          { item: 'Sesame Tahini', amount: '1 tbsp (15g)', category: 'Healthy Fats' },
          { item: 'Tamari (Gluten-Free Soy Sauce) & Lime', amount: '1 tbsp each', category: 'Seasoning & Other' }
        ],
        instructions: [
          'Pan-sear sliced tempeh with 1 tbsp tamari until deeply browned and crisp on both sides (5 mins).',
          'Assemble bowl: layer cooked quinoa, steamed edamame, and broccoli florets.',
          'Top with crispy tempeh.',
          'Whisk tahini with warm water, lime juice, and sea salt, then drizzle over the bowl.'
        ],
        scienceNote: 'Tempeh is fermented soy, which reduces phytic acid content and increases protein digestibility and zinc bioavailability.',
        micronutrients: ['Prebiotics', 'Calcium', 'Magnesium', 'Iron', 'Zinc']
      },
      {
        id: 'pln-3',
        name: 'Pea & Rice Protein Fuel Smoothie',
        mealType: 'Pre-Workout Fuel',
        description: 'Synergistic pea-rice protein blend with rolled oats, blueberries, and chia seeds 75 mins before lifting.',
        prepTimeMinutes: 3,
        calories: 360,
        proteinGrams: 32,
        carbsGrams: 45,
        fatGrams: 6,
        fiberGrams: 8,
        ingredients: [
          { item: 'Plant Protein Powder (Pea & Brown Rice blend)', amount: '35g (1 scoop)', category: 'Protein' },
          { item: 'Rolled Oats', amount: '40g', category: 'Grains' },
          { item: 'Frozen Wild Blueberries', amount: '80g (1/2 cup)', category: 'Produce' },
          { item: 'Chia Seeds', amount: '1 tsp (5g)', category: 'Healthy Fats' },
          { item: 'Cold Water or Oat Milk', amount: '350ml', category: 'Dairy' }
        ],
        instructions: [
          'Blend plant protein powder, oats, wild blueberries, chia seeds, and liquid until ultra smooth.',
          'Drink 60 to 75 minutes prior to your workout.'
        ],
        scienceNote: 'Pea protein is rich in lysine and leucine, while rice protein is rich in methionine, forming a PDCAAS 1.0 equivalent to whey.',
        micronutrients: ['Anthocyanins', 'BCAAs', 'Omega-3 ALA']
      },
      {
        id: 'pln-4',
        name: 'Red Lentil & Chickpea Protein Curry over Jasmine Rice',
        mealType: 'Post-Workout Dinner',
        description: 'Hearty, warming red lentil dahl with chickpeas, coconut milk, ginger, and fragrant jasmine rice.',
        prepTimeMinutes: 20,
        calories: 680,
        proteinGrams: 42,
        carbsGrams: 105,
        fatGrams: 12,
        fiberGrams: 18,
        ingredients: [
          { item: 'Red Lentils (dry weight)', amount: '80g (cooked ~180g)', category: 'Protein' },
          { item: 'Chickpeas / Garbanzo Beans (cooked)', amount: '100g (1/2 cup)', category: 'Protein' },
          { item: 'Jasmine Rice (cooked)', amount: '200g (1 cup)', category: 'Grains' },
          { item: 'Light Coconut Milk', amount: '100ml', category: 'Healthy Fats' },
          { item: 'Crushed Tomatoes', amount: '100g', category: 'Produce' },
          { item: 'Baby Spinach', amount: '50g', category: 'Produce' },
          { item: 'Ginger, Garlic, Garam Masala & Sea Salt', amount: '1 tsp each', category: 'Seasoning & Other' }
        ],
        instructions: [
          'Sauté minced garlic and fresh ginger in a pot with garam masala for 1 minute.',
          'Add red lentils, crushed tomatoes, light coconut milk, and 1.5 cups water. Simmer for 15 minutes until lentils are soft.',
          'Stir in chickpeas and baby spinach until wilted.',
          'Serve piping hot over fragrant jasmine rice.'
        ],
        scienceNote: 'Combining legumes (lentils and chickpeas) with grains (jasmine rice) produces an optimal amino acid balance while reloading glycogen.',
        micronutrients: ['Iron (with Vitamin C pairing)', 'Folate', 'Manganese']
      },
      {
        id: 'pln-5',
        name: 'Hemp Seed & Cacao Overnight Protein Pudding',
        mealType: 'Evening Recovery',
        description: 'Nutrient-rich hemp hearts with chia seeds, raw cacao, and plant protein for sustained nocturnal recovery.',
        prepTimeMinutes: 3,
        calories: 280,
        proteinGrams: 20,
        carbsGrams: 14,
        fatGrams: 15,
        fiberGrams: 8,
        ingredients: [
          { item: 'Raw Hemp Hearts', amount: '20g (2 tbsp)', category: 'Protein' },
          { item: 'Chia Seeds', amount: '1 tbsp (12g)', category: 'Healthy Fats' },
          { item: 'Raw Cacao Powder', amount: '1 tbsp (10g)', category: 'Seasoning & Other' },
          { item: 'Plant Protein (Chocolate)', amount: '15g (1/2 scoop)', category: 'Protein' },
          { item: 'Unsweetened Almond Milk', amount: '150ml', category: 'Dairy' }
        ],
        instructions: [
          'Whisk plant protein, cacao powder, chia seeds, and almond milk in a jar.',
          'Top with raw hemp hearts and refrigerate or enjoy immediately.',
          'Eat 30 minutes before bed.'
        ],
        scienceNote: 'Hemp hearts provide edestin and albumin proteins, high in arginine and magnesium to promote vascular relaxation and deep sleep.',
        micronutrients: ['Magnesium', 'Zinc', 'Flavonoids', 'Omega-3 ALA']
      }
    ]
  },

  maintenance: {
    id: 'clean-maintenance',
    goal: 'maintenance',
    title: 'Clean Maintenance, Vitality & Metabolic Health',
    subtitle: 'Isocaloric • Whole Foods • Anti-Inflammatory Longevity Protocol',
    targetCalories: 2400,
    targetProteinGrams: 175,
    targetCarbsGrams: 260,
    targetFatGrams: 68,
    targetFiberGrams: 36,
    summary: 'Balanced nutritional structure designed for active adults maintaining optimal body composition, high daily cognitive clarity, and sustained vitality.',
    scientificRationale: [
      'Isocaloric energy balance keeps weight rock-steady while permitting gradual body recomposition.',
      'Emphasizes Mediterranean-style whole food biodiversity for gut microbiome health.',
      'Sustains steady insulin curves with low-glycemic starches, preventing energy crashes.'
    ],
    meals: [
      {
        id: 'mnt-1',
        name: 'Eggs, Avocado Toast & Mixed Berries',
        mealType: 'Breakfast',
        description: '2 whole eggs and 2 whites on rustic sourdough with mashed avocado and fresh blackberries.',
        prepTimeMinutes: 8,
        calories: 520,
        proteinGrams: 36,
        carbsGrams: 48,
        fatGrams: 18,
        fiberGrams: 9,
        ingredients: [
          { item: 'Whole Eggs', amount: '2 large', category: 'Protein' },
          { item: 'Liquid Egg Whites', amount: '100g', category: 'Protein' },
          { item: 'Artisan Sourdough', amount: '2 slices (65g)', category: 'Grains' },
          { item: 'Fresh Avocado', amount: '45g', category: 'Healthy Fats' },
          { item: 'Fresh Blackberries', amount: '80g', category: 'Produce' }
        ],
        instructions: [
          'Toast sourdough until golden brown and mash avocado on top with sea salt.',
          'Scramble eggs and egg whites in a skillet until fluffy.',
          'Serve with blackberries on the side.'
        ],
        scienceNote: 'Combines slow carbs, healthy fats, and high-quality protein to maintain stable blood glucose throughout the morning.',
        micronutrients: ['Choline', 'Vitamin E', 'Vitamin C', 'Monounsaturated Fats']
      },
      {
        id: 'mnt-2',
        name: 'Mediterranean Grilled Chicken Salad & Quinoa',
        mealType: 'Lunch',
        description: 'Herb grilled chicken breast over baby spinach, quinoa, kalamata olives, cucumber, and feta cheese.',
        prepTimeMinutes: 12,
        calories: 620,
        proteinGrams: 48,
        carbsGrams: 58,
        fatGrams: 20,
        fiberGrams: 9,
        ingredients: [
          { item: 'Grilled Chicken Breast', amount: '180g', category: 'Protein' },
          { item: 'Cooked Quinoa', amount: '160g (1 cup)', category: 'Grains' },
          { item: 'Baby Spinach & Romaine', amount: '80g (3 cups)', category: 'Produce' },
          { item: 'Cucumber & Cherry Tomatoes', amount: '100g', category: 'Produce' },
          { item: 'Kalamata Olives', amount: '20g (approx 6 olives)', category: 'Healthy Fats' },
          { item: 'Feta Cheese (crumbled)', amount: '25g', category: 'Dairy' },
          { item: 'Extra Virgin Olive Oil & Lemon', amount: '1 tsp each', category: 'Healthy Fats' }
        ],
        instructions: [
          'Chop cucumber and cherry tomatoes, toss with baby spinach and cooked quinoa.',
          'Slice grilled chicken breast and place on top.',
          'Garnish with kalamata olives and crumbled feta.',
          'Drizzle with extra virgin olive oil and fresh lemon juice.'
        ],
        scienceNote: 'The Mediterranean diet pattern has the most extensive clinical literature supporting cardiovascular and endothelial health.',
        micronutrients: ['Polyphenols', 'Lycopene', 'Selenium', 'Vitamin K']
      },
      {
        id: 'mnt-3',
        name: 'Pre-Workout Apple & Whey Protein',
        mealType: 'Pre-Workout Fuel',
        description: 'Crisp green apple paired with cold whey isolate for light training energy.',
        prepTimeMinutes: 2,
        calories: 240,
        proteinGrams: 26,
        carbsGrams: 28,
        fatGrams: 1.5,
        fiberGrams: 4,
        ingredients: [
          { item: 'Whey Protein Isolate', amount: '30g', category: 'Protein' },
          { item: 'Fresh Crisp Green Apple', amount: '1 medium (150g)', category: 'Produce' },
          { item: 'Water', amount: '300ml', category: 'Seasoning & Other' }
        ],
        instructions: [
          'Slice apple into wedges.',
          'Mix whey protein in ice-cold water.',
          'Consume 45-60 minutes before training.'
        ],
        scienceNote: 'Pectin fiber in apples moderates fructose absorption, providing smooth aerobic energy without bloating.',
        micronutrients: ['Vitamin C', 'Quercetin', 'Potassium']
      },
      {
        id: 'mnt-4',
        name: 'Baked Salmon, Roasted Baby Potatoes & Broccolini',
        mealType: 'Post-Workout Dinner',
        description: 'Tender wild salmon fillet with crispy roasted herb baby potatoes and garlic broccolini.',
        prepTimeMinutes: 18,
        calories: 740,
        proteinGrams: 52,
        carbsGrams: 82,
        fatGrams: 19,
        fiberGrams: 10,
        ingredients: [
          { item: 'Wild Salmon Fillet', amount: '200g', category: 'Protein' },
          { item: 'Baby Potatoes (halved & roasted)', amount: '250g', category: 'Produce' },
          { item: 'Fresh Broccolini', amount: '150g', category: 'Produce' },
          { item: 'Olive Oil', amount: '1 tsp', category: 'Healthy Fats' },
          { item: 'Garlic Herb Seasoning & Sea Salt', amount: 'To taste', category: 'Seasoning & Other' }
        ],
        instructions: [
          'Roast halved baby potatoes at 400°F (200°C) with rosemary and sea salt for 22 minutes.',
          'Bake or pan-sear salmon with lemon for 8 minutes.',
          'Steam broccolini for 3 minutes.',
          'Plate together hot.'
        ],
        scienceNote: 'Provides high-potency omega-3 fatty acids and complete electrolyte recovery without excess calories.',
        micronutrients: ['Omega-3 (EPA/DHA)', 'Sulforaphane', 'Vitamin B12']
      },
      {
        id: 'mnt-5',
        name: 'Greek Yogurt & Crushed Pistachios',
        mealType: 'Evening Recovery',
        description: 'Creamy high-protein yogurt with roasted pistachios and cinnamon.',
        prepTimeMinutes: 2,
        calories: 220,
        proteinGrams: 23,
        carbsGrams: 12,
        fatGrams: 8,
        fiberGrams: 3,
        ingredients: [
          { item: 'Plain Greek Yogurt (2% fat)', amount: '175g', category: 'Dairy' },
          { item: 'Roasted Pistachios (shelled)', amount: '15g (approx 25 pistachios)', category: 'Healthy Fats' },
          { item: 'Ground Cinnamon', amount: '1/2 tsp', category: 'Seasoning & Other' }
        ],
        instructions: [
          'Scoop yogurt into a bowl, sprinkle crushed pistachios and ground cinnamon on top.',
          'Eat 30 minutes before sleep.'
        ],
        scienceNote: 'Pistachios contain natural melatonin and magnesium, synergizing with casein to deepen restorative sleep.',
        micronutrients: ['Melatonin', 'Magnesium', 'Vitamin B6']
      }
    ]
  }
};

/**
 * Calculates customized daily caloric and macronutrient targets based on user metrics
 */
export function calculatePersonalizedNutrition(params: {
  weightKg: number;
  heightCm: number;
  ageYears: number;
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'very_active';
  goal: NutritionGoal;
}) {
  const { weightKg, heightCm, ageYears, gender, activityLevel, goal } = params;

  // Mifflin-St Jeor BMR Equation
  let bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageYears;
  bmr = gender === 'male' ? bmr + 5 : bmr - 161;

  // Activity multipliers
  const activityFactors = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    very_active: 1.725
  };

  const tdee = Math.round(bmr * activityFactors[activityLevel]);

  // Goal caloric adjustments
  let targetCalories = tdee;
  if (goal === 'hypertrophy') targetCalories = tdee + 300;
  else if (goal === 'fat_loss') targetCalories = Math.max(1300, tdee - 500);
  else if (goal === 'strength') targetCalories = tdee + 200;
  else if (goal === 'endurance') targetCalories = tdee + 150;
  else if (goal === 'plant_based') targetCalories = tdee + 100;

  // Macronutrient calculation
  // Protein: 2.0g/kg (2.3g/kg for fat loss, 1.8g/kg for endurance)
  let proteinPerKg = 2.0;
  if (goal === 'fat_loss') proteinPerKg = 2.3;
  if (goal === 'endurance') proteinPerKg = 1.7;
  if (goal === 'strength') proteinPerKg = 2.1;

  const targetProteinGrams = Math.round(weightKg * proteinPerKg);
  const proteinCalories = targetProteinGrams * 4;

  // Fats: ~25% of total calories (0.8g/kg minimum)
  const targetFatGrams = Math.round((targetCalories * 0.25) / 9);
  const fatCalories = targetFatGrams * 9;

  // Carbs: Remaining calories
  const remainingCalories = Math.max(200, targetCalories - (proteinCalories + fatCalories));
  const targetCarbsGrams = Math.round(remainingCalories / 4);

  return {
    bmr: Math.round(bmr),
    tdee,
    targetCalories,
    targetProteinGrams,
    targetCarbsGrams,
    targetFatGrams,
    targetFiberGrams: Math.round((targetCalories / 1000) * 14) // 14g per 1000 kcal standard
  };
}
