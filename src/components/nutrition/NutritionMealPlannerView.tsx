import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NutritionGoal, MealItem, DailyMealPlan } from '../../types';
import {
  GOAL_MEAL_PLANS,
  NUTRITION_SCIENCE_RESEARCH,
  calculatePersonalizedNutrition
} from '../../data/nutritionData';
import {
  Utensils,
  Flame,
  Award,
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  ShoppingBag,
  Calculator,
  ChevronRight,
  ChevronDown,
  RefreshCw,
  Copy,
  Check,
  ExternalLink,
  Info,
  Scale,
  Zap,
  ShieldCheck,
  Leaf,
  Dumbbell
} from 'lucide-react';

export const NutritionMealPlannerView: React.FC = () => {
  const { profile } = useApp();

  const [selectedGoal, setSelectedGoal] = useState<NutritionGoal>('hypertrophy');
  const [activeTab, setActiveTab] = useState<'plan' | 'grocery' | 'science' | 'calculator'>('plan');
  const [loggedMealIds, setLoggedMealIds] = useState<string[]>([]);
  const [copiedPlan, setCopiedPlan] = useState<boolean>(false);
  const [checkedGroceryItems, setCheckedGroceryItems] = useState<string[]>([]);
  const [expandedMealId, setExpandedMealId] = useState<string | null>(null);

  // Custom calculator state
  const [calcWeight, setCalcWeight] = useState<number>(78);
  const [calcHeight, setCalcHeight] = useState<number>(178);
  const [calcAge, setCalcAge] = useState<number>(27);
  const [calcGender, setCalcGender] = useState<'male' | 'female'>('male');
  const [calcActivity, setCalcActivity] = useState<'sedentary' | 'light' | 'moderate' | 'very_active'>('moderate');
  const [customCalculated, setCustomCalculated] = useState<ReturnType<typeof calculatePersonalizedNutrition> | null>(null);

  const currentPlan: DailyMealPlan = GOAL_MEAL_PLANS[selectedGoal];

  // Calculate consumed totals based on checked meals
  const consumedTotals = currentPlan.meals
    .filter((m) => loggedMealIds.includes(m.id))
    .reduce(
      (acc, m) => ({
        calories: acc.calories + m.calories,
        protein: acc.protein + m.proteinGrams,
        carbs: acc.carbs + m.carbsGrams,
        fat: acc.fat + m.fatGrams,
        fiber: acc.fiber + m.fiberGrams
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
    );

  const toggleMealLog = (mealId: string) => {
    if (loggedMealIds.includes(mealId)) {
      setLoggedMealIds(loggedMealIds.filter((id) => id !== mealId));
    } else {
      setLoggedMealIds([...loggedMealIds, mealId]);
    }
  };

  const handleRunCalculator = () => {
    const res = calculatePersonalizedNutrition({
      weightKg: calcWeight,
      heightCm: calcHeight,
      ageYears: calcAge,
      gender: calcGender,
      activityLevel: calcActivity,
      goal: selectedGoal
    });
    setCustomCalculated(res);
  };

  const handleCopyMealPlan = () => {
    let text = `=== ${currentPlan.title.toUpperCase()} ===\n`;
    text += `${currentPlan.subtitle}\n`;
    text += `Target Daily: ${currentPlan.targetCalories} kcal | ${currentPlan.targetProteinGrams}g Protein | ${currentPlan.targetCarbsGrams}g Carbs | ${currentPlan.targetFatGrams}g Fat\n\n`;

    currentPlan.meals.forEach((meal, i) => {
      text += `[MEAL ${i + 1}: ${meal.name} (${meal.mealType})]\n`;
      text += `Macros: ${meal.calories} kcal | ${meal.proteinGrams}g P | ${meal.carbsGrams}g C | ${meal.fatGrams}g F\n`;
      text += `Ingredients:\n`;
      meal.ingredients.forEach((ing) => {
        text += `  • ${ing.item}: ${ing.amount}\n`;
      });
      text += `Prep: ${meal.instructions.join(' ')}\n\n`;
    });

    navigator.clipboard.writeText(text);
    setCopiedPlan(true);
    setTimeout(() => setCopiedPlan(false), 2000);
  };

  // Grocery list compilation
  const groceryCategories: Record<string, { item: string; amount: string; meal: string }[]> = {};
  currentPlan.meals.forEach((m) => {
    m.ingredients.forEach((ing) => {
      if (!groceryCategories[ing.category]) {
        groceryCategories[ing.category] = [];
      }
      groceryCategories[ing.category].push({
        item: ing.item,
        amount: ing.amount,
        meal: m.name
      });
    });
  });

  const toggleGroceryItem = (itemKey: string) => {
    if (checkedGroceryItems.includes(itemKey)) {
      setCheckedGroceryItems(checkedGroceryItems.filter((k) => k !== itemKey));
    } else {
      setCheckedGroceryItems([...checkedGroceryItems, itemKey]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#080d1a] text-gray-100 pb-24 overflow-y-auto">
      {/* Header Bar */}
      <div className="p-4 sm:p-5 bg-[#0f172a] border-b border-[#213253]">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <h1 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-wide">
                GOAL NUTRITION & MEAL PLANNER
              </h1>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Evidence-based meal plans, macro periodization & clinical nutrition science
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMealPlan}
              className="px-3 py-1.5 bg-[#162038] hover:bg-[#1f2d4d] text-gray-300 hover:text-white rounded-xl border border-[#213253] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
              title="Copy Full Daily Meal Plan"
            >
              {copiedPlan ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Plan</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Goal Selector Pill Bar */}
        <div className="flex gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none">
          {[
            { id: 'hypertrophy' as NutritionGoal, label: 'Hypertrophy / Bulk', icon: <Flame className="w-3.5 h-3.5" /> },
            { id: 'fat_loss' as NutritionGoal, label: 'Fat Loss / Shred', icon: <Scale className="w-3.5 h-3.5" /> },
            { id: 'strength' as NutritionGoal, label: 'Strength & Power', icon: <Dumbbell className="w-3.5 h-3.5" /> },
            { id: 'endurance' as NutritionGoal, label: 'Endurance / Stamina', icon: <Zap className="w-3.5 h-3.5" /> },
            { id: 'plant_based' as NutritionGoal, label: '100% Plant-Based', icon: <Leaf className="w-3.5 h-3.5" /> },
            { id: 'maintenance' as NutritionGoal, label: 'Clean Maintenance', icon: <ShieldCheck className="w-3.5 h-3.5" /> }
          ].map((goalOption) => (
            <button
              key={goalOption.id}
              onClick={() => {
                setSelectedGoal(goalOption.id);
                setLoggedMealIds([]);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all shadow-sm ${
                selectedGoal === goalOption.id
                  ? 'bg-blue-600 text-white shadow-blue-500/25 ring-2 ring-blue-400/50 scale-[1.02]'
                  : 'bg-[#162038] text-gray-300 hover:bg-[#1f2d4d] hover:text-white border border-[#213253]'
              }`}
            >
              {goalOption.icon}
              <span>{goalOption.label}</span>
            </button>
          ))}
        </div>

        {/* View Mode Tabs: [Daily Meal Plan], [Grocery Shopping List], [Science Research], [TDEE Calculator] */}
        <div className="flex gap-1.5 pt-3 border-t border-[#213253]/60 mt-3">
          {[
            { id: 'plan' as const, label: 'Daily Meal Plan', icon: <Utensils className="w-3.5 h-3.5" /> },
            { id: 'grocery' as const, label: 'Grocery List', icon: <ShoppingBag className="w-3.5 h-3.5" /> },
            { id: 'calculator' as const, label: 'TDEE & Macro Calc', icon: <Calculator className="w-3.5 h-3.5" /> },
            { id: 'science' as const, label: 'Research & Citations', icon: <BookOpen className="w-3.5 h-3.5" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white font-bold shadow-md'
                  : 'bg-[#111a2f] text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 sm:p-5 max-w-4xl mx-auto w-full space-y-5">
        {/* TAB 1: DAILY MEAL PLAN */}
        {activeTab === 'plan' && (
          <div className="space-y-5">
            {/* Goal Overview Banner */}
            <div className="bg-gradient-to-r from-[#101b33] via-[#0e172a] to-[#122040] p-4 sm:p-5 rounded-2xl border border-blue-500/40 shadow-xl space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono text-sky-400 uppercase font-bold tracking-wider block">
                    Current Protocol Focus
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                    {currentPlan.title}
                  </h2>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-600/20 text-sky-300 border border-blue-500/30">
                  {currentPlan.subtitle}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
                {currentPlan.summary}
              </p>

              {/* Macro Target Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-2">
                <div className="bg-[#080d1a]/80 p-3 rounded-xl border border-blue-500/30 text-center">
                  <span className="text-[10px] font-mono text-gray-400 uppercase block">Daily Calories</span>
                  <span className="text-lg font-bold font-mono text-white">{currentPlan.targetCalories}</span>
                  <span className="text-[10px] text-gray-400 block font-mono">kcal</span>
                </div>

                <div className="bg-[#080d1a]/80 p-3 rounded-xl border border-blue-500/30 text-center">
                  <span className="text-[10px] font-mono text-sky-400 uppercase block">Protein</span>
                  <span className="text-lg font-bold font-mono text-sky-300">{currentPlan.targetProteinGrams}g</span>
                  <span className="text-[10px] text-gray-400 block font-mono">
                    {Math.round((currentPlan.targetProteinGrams * 400) / currentPlan.targetCalories)}%
                  </span>
                </div>

                <div className="bg-[#080d1a]/80 p-3 rounded-xl border border-blue-500/30 text-center">
                  <span className="text-[10px] font-mono text-amber-400 uppercase block">Carbohydrates</span>
                  <span className="text-lg font-bold font-mono text-amber-300">{currentPlan.targetCarbsGrams}g</span>
                  <span className="text-[10px] text-gray-400 block font-mono">
                    {Math.round((currentPlan.targetCarbsGrams * 400) / currentPlan.targetCalories)}%
                  </span>
                </div>

                <div className="bg-[#080d1a]/80 p-3 rounded-xl border border-blue-500/30 text-center">
                  <span className="text-[10px] font-mono text-rose-400 uppercase block">Fats</span>
                  <span className="text-lg font-bold font-mono text-rose-300">{currentPlan.targetFatGrams}g</span>
                  <span className="text-[10px] text-gray-400 block font-mono">
                    {Math.round((currentPlan.targetFatGrams * 900) / currentPlan.targetCalories)}%
                  </span>
                </div>

                <div className="bg-[#080d1a]/80 p-3 rounded-xl border border-blue-500/30 text-center col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase block">Dietary Fiber</span>
                  <span className="text-lg font-bold font-mono text-emerald-300">{currentPlan.targetFiberGrams}g</span>
                  <span className="text-[10px] text-gray-400 block font-mono">Gut & Satiety</span>
                </div>
              </div>

              {/* Logged Daily Intake Live Tracker */}
              <div className="bg-[#091122] p-3 rounded-xl border border-[#213253] space-y-2 mt-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-300 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Logged Today ({loggedMealIds.length}/{currentPlan.meals.length} meals):</span>
                  </span>
                  <span className="text-sky-300 font-bold">
                    {consumedTotals.calories} / {currentPlan.targetCalories} kcal (
                    {Math.round((consumedTotals.calories / currentPlan.targetCalories) * 100)}%)
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-[#162038] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full transition-all duration-300"
                    style={{
                      width: `${Math.min(100, (consumedTotals.calories / currentPlan.targetCalories) * 100)}%`
                    }}
                  />
                </div>

                <div className="flex justify-between text-[11px] font-mono text-gray-400 pt-0.5">
                  <span>Protein: <strong className="text-sky-300">{consumedTotals.protein}g</strong> / {currentPlan.targetProteinGrams}g</span>
                  <span>Carbs: <strong className="text-amber-300">{consumedTotals.carbs}g</strong> / {currentPlan.targetCarbsGrams}g</span>
                  <span>Fat: <strong className="text-rose-300">{consumedTotals.fat}g</strong> / {currentPlan.targetFatGrams}g</span>
                </div>
              </div>
            </div>

            {/* Scientific Rationale Highlights */}
            <div className="bg-[#0f172a] p-4 rounded-2xl border border-[#213253] space-y-2">
              <h3 className="text-xs font-mono uppercase text-sky-400 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                <span>Evidence-Based Mechanism Behind This Plan</span>
              </h3>
              <ul className="space-y-1.5 text-xs text-gray-300">
                {currentPlan.scientificRationale.map((rationale, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                    <span className="leading-relaxed">{rationale}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* List of Meals for the Day */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base font-heading text-white">
                  Daily Structured Meals ({currentPlan.meals.length})
                </h3>
                <span className="text-xs text-gray-400">Tap checkbox to log meal consumed</span>
              </div>

              {currentPlan.meals.map((meal, index) => {
                const isLogged = loggedMealIds.includes(meal.id);
                const isExpanded = expandedMealId === meal.id;

                return (
                  <div
                    key={meal.id}
                    className={`rounded-2xl border transition-all overflow-hidden ${
                      isLogged
                        ? 'bg-[#0a1524] border-emerald-500/50 shadow-emerald-950/20 shadow-lg'
                        : 'bg-[#0f172a] border-[#213253] hover:border-blue-500/50'
                    }`}
                  >
                    {/* Meal Header Card */}
                    <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-start sm:items-center gap-3.5">
                        {/* Checkbox for Eaten / Logged */}
                        <button
                          onClick={() => toggleMealLog(meal.id)}
                          className={`mt-0.5 sm:mt-0 p-1 rounded-xl transition-all ${
                            isLogged
                              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                              : 'bg-[#162038] text-gray-400 hover:text-white border border-[#213253]'
                          }`}
                          title={isLogged ? 'Mark as not eaten' : 'Mark meal as eaten / logged'}
                          aria-label="Toggle meal eaten"
                        >
                          {isLogged ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                        </button>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-600/20 text-sky-400 border border-blue-500/30">
                              Meal {index + 1} • {meal.mealType}
                            </span>
                            <span className="text-[11px] text-gray-400 flex items-center gap-1 font-mono">
                              <Clock className="w-3 h-3" />
                              <span>{meal.prepTimeMinutes} min prep</span>
                            </span>
                          </div>

                          <h4 className="text-base font-bold text-white mt-1 font-heading">
                            {meal.name}
                          </h4>
                          <p className="text-xs text-gray-400 mt-0.5">{meal.description}</p>
                        </div>
                      </div>

                      {/* Macros Badge & Accordion Toggle */}
                      <div className="flex items-center gap-3 self-end sm:self-center">
                        <div className="flex items-center gap-2 text-xs font-mono">
                          <span className="bg-[#162038] px-2.5 py-1 rounded-lg text-white font-bold border border-[#213253]">
                            {meal.calories} kcal
                          </span>
                          <span className="text-sky-300 font-semibold">{meal.proteinGrams}g P</span>
                          <span className="text-amber-300 font-semibold">{meal.carbsGrams}g C</span>
                          <span className="text-rose-300 font-semibold">{meal.fatGrams}g F</span>
                        </div>

                        <button
                          onClick={() => setExpandedMealId(isExpanded ? null : meal.id)}
                          className="p-1.5 rounded-xl bg-[#162038] hover:bg-[#1f2d4d] text-gray-300 border border-[#213253]"
                          aria-label="Toggle recipe instructions"
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Expanded Detail Panel: Ingredients & Quick Recipe */}
                    {isExpanded && (
                      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 border-t border-[#1c2948] bg-[#0b1324] space-y-4">
                        {/* Ingredients Table */}
                        <div className="space-y-2">
                          <span className="text-[11px] font-mono uppercase text-sky-400 font-bold block">
                            Exact Ingredients & Measurements
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {meal.ingredients.map((ing, i) => (
                              <div
                                key={i}
                                className="flex items-center justify-between p-2 rounded-lg bg-[#0f172a] border border-[#213253] text-xs"
                              >
                                <span className="text-gray-200">{ing.item}</span>
                                <span className="font-mono text-sky-300 font-semibold">{ing.amount}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Step-by-Step Cooking Guide */}
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-mono uppercase text-sky-400 font-bold block">
                            Quick Preparation Instructions ({meal.prepTimeMinutes} mins)
                          </span>
                          <ol className="space-y-1 text-xs text-gray-300">
                            {meal.instructions.map((inst, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="font-mono text-sky-400 font-bold">{idx + 1}.</span>
                                <span className="leading-relaxed">{inst}</span>
                              </li>
                            ))}
                          </ol>
                        </div>

                        {/* Science Note */}
                        <div className="p-3 bg-[#080d1a] rounded-xl border border-blue-500/20 text-xs text-gray-300 flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-sky-300 font-bold">Biochemical Purpose: </span>
                            <span>{meal.scienceNote}</span>
                          </div>
                        </div>

                        {/* Micronutrients */}
                        {meal.micronutrients && (
                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            <span className="text-[10px] font-mono text-gray-400 uppercase">Micronutrients:</span>
                            {meal.micronutrients.map((micro, mIdx) => (
                              <span
                                key={mIdx}
                                className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-blue-950 text-sky-300 border border-blue-600/30"
                              >
                                {micro}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: GROCERY SHOPPING LIST */}
        {activeTab === 'grocery' && (
          <div className="space-y-5">
            <div className="bg-[#0f172a] p-4 sm:p-5 rounded-2xl border border-[#213253] flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold font-heading text-white">
                  Consolidated Weekly Grocery Checklist
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  All ingredients organized by supermarket department for the {currentPlan.title}
                </p>
              </div>

              <div className="text-xs font-mono text-sky-400">
                {checkedGroceryItems.length} checked
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(groceryCategories).map(([category, items]) => (
                <div key={category} className="bg-[#0f172a] p-4 rounded-2xl border border-[#213253] space-y-3">
                  <div className="flex items-center justify-between border-b border-[#213253] pb-2">
                    <h4 className="font-bold text-sm text-sky-400 font-mono uppercase tracking-wider">
                      {category}
                    </h4>
                    <span className="text-[10px] font-mono text-gray-400 px-2 py-0.5 rounded bg-[#162038]">
                      {items.length} items
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {items.map((item, idx) => {
                      const itemKey = `${category}-${item.item}-${idx}`;
                      const isChecked = checkedGroceryItems.includes(itemKey);

                      return (
                        <div
                          key={itemKey}
                          onClick={() => toggleGroceryItem(itemKey)}
                          className={`p-2 rounded-xl flex items-center justify-between gap-2 text-xs cursor-pointer transition-colors ${
                            isChecked
                              ? 'bg-emerald-950/20 text-gray-400 line-through border border-emerald-900/30'
                              : 'bg-[#162038] text-white hover:bg-[#1f2d4d] border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                                isChecked
                                  ? 'bg-emerald-500 border-emerald-500 text-white'
                                  : 'border-gray-500 bg-transparent'
                              }`}
                            >
                              {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className="font-medium">{item.item}</span>
                          </div>

                          <span className="font-mono text-sky-300 text-[11px] shrink-0 font-semibold">
                            {item.amount}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: TDEE & MACRO CALCULATOR */}
        {activeTab === 'calculator' && (
          <div className="space-y-5">
            <div className="bg-[#0f172a] p-5 rounded-2xl border border-[#213253] space-y-4">
              <div>
                <h3 className="text-lg font-bold font-heading text-white flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-sky-400" />
                  <span>Personalized TDEE & Macronutrient Calculator</span>
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Applies the clinically verified Mifflin-St Jeor formula and activity coefficients to establish your exact caloric maintenance and goal targets.
                </p>
              </div>

              {/* Form Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 pt-2">
                <div>
                  <label className="text-[11px] font-mono text-gray-400 block mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    value={calcWeight}
                    onChange={(e) => setCalcWeight(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#162038] border border-[#213253] rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-gray-400 block mb-1">Height (cm)</label>
                  <input
                    type="number"
                    value={calcHeight}
                    onChange={(e) => setCalcHeight(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#162038] border border-[#213253] rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-gray-400 block mb-1">Age (Years)</label>
                  <input
                    type="number"
                    value={calcAge}
                    onChange={(e) => setCalcAge(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#162038] border border-[#213253] rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-gray-400 block mb-1">Biological Sex</label>
                  <select
                    value={calcGender}
                    onChange={(e) => setCalcGender(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#162038] border border-[#213253] rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="male">Male (+5 kcal baseline)</option>
                    <option value="female">Female (-161 kcal baseline)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] font-mono text-gray-400 block mb-1">Physical Activity Level</label>
                  <select
                    value={calcActivity}
                    onChange={(e) => setCalcActivity(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#162038] border border-[#213253] rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="sedentary">Sedentary (desk job, 0 workouts/week) [1.2x]</option>
                    <option value="light">Light Activity (1-3 gym sessions/week) [1.375x]</option>
                    <option value="moderate">Moderate Activity (3-5 intense workouts/week) [1.55x]</option>
                    <option value="very_active">Very Active (6-7 workouts/week or physical job) [1.725x]</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleRunCalculator}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                <span>Calculate My Custom Targets</span>
              </button>
            </div>

            {/* Calculated Output Display */}
            {customCalculated && (
              <div className="bg-gradient-to-r from-[#101b33] to-[#0f172a] p-5 rounded-2xl border border-blue-500/40 shadow-xl space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold font-heading text-white">
                    Your Personalized Targets ({selectedGoal.toUpperCase()})
                  </h4>
                  <span className="text-xs font-mono text-sky-400">
                    BMR: {customCalculated.bmr} kcal • TDEE: {customCalculated.tdee} kcal
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-[#080d1a] p-3.5 rounded-xl border border-blue-500/30 text-center">
                    <span className="text-[10px] font-mono text-gray-400 uppercase block">Daily Calorie Target</span>
                    <span className="text-xl font-bold font-mono text-white">{customCalculated.targetCalories}</span>
                    <span className="text-[10px] text-gray-400 block font-mono">kcal / day</span>
                  </div>

                  <div className="bg-[#080d1a] p-3.5 rounded-xl border border-blue-500/30 text-center">
                    <span className="text-[10px] font-mono text-sky-400 uppercase block">Protein</span>
                    <span className="text-xl font-bold font-mono text-sky-300">{customCalculated.targetProteinGrams}g</span>
                    <span className="text-[10px] text-gray-400 block font-mono">
                      {(customCalculated.targetProteinGrams / calcWeight).toFixed(1)}g / kg
                    </span>
                  </div>

                  <div className="bg-[#080d1a] p-3.5 rounded-xl border border-blue-500/30 text-center">
                    <span className="text-[10px] font-mono text-amber-400 uppercase block">Carbohydrates</span>
                    <span className="text-xl font-bold font-mono text-amber-300">{customCalculated.targetCarbsGrams}g</span>
                    <span className="text-[10px] text-gray-400 block font-mono">
                      {(customCalculated.targetCarbsGrams / calcWeight).toFixed(1)}g / kg
                    </span>
                  </div>

                  <div className="bg-[#080d1a] p-3.5 rounded-xl border border-blue-500/30 text-center">
                    <span className="text-[10px] font-mono text-rose-400 uppercase block">Fats</span>
                    <span className="text-xl font-bold font-mono text-rose-300">{customCalculated.targetFatGrams}g</span>
                    <span className="text-[10px] text-gray-400 block font-mono">Hormone Health</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: PEER-REVIEWED NUTRITION SCIENCE & CITATIONS */}
        {activeTab === 'science' && (
          <div className="space-y-4">
            <div className="bg-[#0f172a] p-4 sm:p-5 rounded-2xl border border-[#213253]">
              <h3 className="text-base sm:text-lg font-bold font-heading text-white">
                Clinical Nutrition Science & Meta-Analyses
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Rigorous peer-reviewed literature citations on protein distribution, energy balance, glycogen resynthesis, and endocrine lipid support.
              </p>
            </div>

            {NUTRITION_SCIENCE_RESEARCH.map((topic) => (
              <div
                key={topic.id}
                className="bg-[#0f172a] p-5 rounded-2xl border border-[#213253] space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-bold text-base text-white font-heading">
                    {topic.title}
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-600/20 text-sky-400 border border-blue-500/30">
                    {topic.category}
                  </span>
                </div>

                <div className="p-3 bg-blue-950/30 rounded-xl border border-blue-500/30 text-xs text-sky-200">
                  <strong className="text-white block mb-0.5">Key Clinical Takeaway:</strong>
                  {topic.keyTakeaway}
                </div>

                <p className="text-xs text-gray-300 leading-relaxed font-sans">
                  {topic.detailedAnalysis}
                </p>

                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-mono text-sky-400 font-bold uppercase block">
                    Practical Application Standards:
                  </span>
                  <ul className="space-y-1 text-xs text-gray-300">
                    {topic.practicalGuidelines.map((guide, gIdx) => (
                      <li key={gIdx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{guide}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Citations Box */}
                <div className="pt-2 border-t border-[#1c2948] space-y-1">
                  <span className="text-[10px] font-mono text-gray-400 uppercase font-bold block">
                    Peer-Reviewed Literature:
                  </span>
                  {topic.citations.map((cit, cIdx) => (
                    <div key={cIdx} className="text-[11px] text-gray-400 font-sans">
                      <span className="text-gray-300 font-medium">{cit.authors} ({cit.year}).</span>{' '}
                      <em>"{cit.title}."</em> <span className="text-sky-400">{cit.journal}</span>.
                      {cit.doi && <span className="text-gray-400 text-[10px] block font-mono">DOI: {cit.doi}</span>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
