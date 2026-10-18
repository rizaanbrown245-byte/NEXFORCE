import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { PregnancyTrimester, PrenatalExercise, PrenatalRoutine } from '../../types';
import {
  PRENATAL_EXERCISES,
  PRENATAL_ROUTINES,
  PRENATAL_CLINICAL_GUIDELINES
} from '../../data/prenatalExercisesData';
import {
  Heart,
  ShieldCheck,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Info,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Flower2,
  Baby,
  Smile,
  Activity,
  Layers,
  X,
  Check,
  Volume2,
  VolumeX,
  Search,
  Dumbbell,
  Tv,
  Eye,
  Wind
} from 'lucide-react';

export const PrenatalSafeExerciseView: React.FC = () => {
  const { theme, playChime } = useApp();
  const isLight = theme === 'light';

  const [activeSection, setActiveSection] = useState<'exercises' | 'routines' | 'safety'>('exercises');
  const [selectedTrimester, setSelectedTrimester] = useState<PregnancyTrimester | 'All'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedExerciseId, setExpandedExerciseId] = useState<string | null>('prenatal-seated-dumbbell-curl-press');

  // Video / Visual Modal State
  const [activeVideoExercise, setActiveVideoExercise] = useState<PrenatalExercise | null>(null);
  const [playerTab, setPlayerTab] = useState<'youtube' | 'animation'>('youtube');
  const [isVoiceSpeaking, setIsVoiceSpeaking] = useState<boolean>(false);

  // Animated Cadence Cycle State (Inhale 4s -> Exhale 4s)
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Exhale'>('Inhale');
  const [breathProgress, setBreathProgress] = useState<number>(0);
  const [isBreathTimerActive, setIsBreathTimerActive] = useState<boolean>(true);

  // Active Guided Routine Player State
  const [activeRoutine, setActiveRoutine] = useState<PrenatalRoutine | null>(null);
  const [routineExerciseIndex, setRoutineExerciseIndex] = useState<number>(0);
  const [routineTimerSeconds, setRoutineTimerSeconds] = useState<number>(45);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Real-time breathing cadence loop
  useEffect(() => {
    if (!activeVideoExercise || playerTab !== 'animation' || !isBreathTimerActive) return;

    const interval = setInterval(() => {
      setBreathProgress((prev) => {
        if (prev >= 100) {
          setBreathPhase((p) => (p === 'Inhale' ? 'Exhale' : 'Inhale'));
          return 0;
        }
        return prev + 2.5; // ~4 second cycle
      });
    }, 100);

    return () => clearInterval(interval);
  }, [activeVideoExercise, playerTab, isBreathTimerActive]);

  // Routine countdown timer
  useEffect(() => {
    let timer: any = null;
    if (activeRoutine && isTimerRunning && routineTimerSeconds > 0) {
      timer = setInterval(() => {
        setRoutineTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (routineTimerSeconds === 0 && isTimerRunning) {
      playChime('rest-end');
      setIsTimerRunning(false);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [activeRoutine, isTimerRunning, routineTimerSeconds, playChime]);

  // Text to Speech for exercise instruction
  const handleSpeakGuidance = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    if (isVoiceSpeaking) {
      window.speechSynthesis.cancel();
      setIsVoiceSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsVoiceSpeaking(false);
    utterance.onerror = () => setIsVoiceSpeaking(false);
    setIsVoiceSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Stop voice when modal closes
  const handleCloseVideoModal = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsVoiceSpeaking(false);
    setActiveVideoExercise(null);
  };

  // Filter exercises
  const filteredExercises = PRENATAL_EXERCISES.filter((ex) => {
    const matchesTrimester =
      selectedTrimester === 'All' || ex.trimestersSafe.includes(selectedTrimester);
    const matchesCategory =
      selectedCategory === 'All' || ex.category === selectedCategory;

    const matchesEquipment =
      selectedEquipment === 'All' ||
      (selectedEquipment === 'Dumbbells' &&
        ex.equipmentNeeded.some((eq) => eq.toLowerCase().includes('dumbbell'))) ||
      (selectedEquipment === 'Bodyweight' &&
        ex.equipmentNeeded.some((eq) => eq.toLowerCase().includes('mat') || eq.toLowerCase().includes('bodyweight'))) ||
      (selectedEquipment === 'Resistance Band' &&
        ex.equipmentNeeded.some((eq) => eq.toLowerCase().includes('band'))) ||
      (selectedEquipment === 'Chair / Block' &&
        ex.equipmentNeeded.some((eq) => eq.toLowerCase().includes('chair') || eq.toLowerCase().includes('block')));

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      ex.name.toLowerCase().includes(q) ||
      ex.subtitle.toLowerCase().includes(q) ||
      ex.targetMuscles.toLowerCase().includes(q) ||
      ex.category.toLowerCase().includes(q) ||
      ex.equipmentNeeded.some((eq) => eq.toLowerCase().includes(q));

    return matchesTrimester && matchesCategory && matchesEquipment && matchesSearch;
  });

  const categories = [
    'All',
    'Pelvic Floor & Core',
    'Lower Body & Stability',
    'Upper Body & Posture',
    'Mobility & Labor Prep'
  ];

  // Start Guided Routine
  const handleStartRoutine = (routine: PrenatalRoutine) => {
    setActiveRoutine(routine);
    setRoutineExerciseIndex(0);
    setRoutineTimerSeconds(45);
    setIsTimerRunning(true);
    playChime('beep');
  };

  const handleNextRoutineExercise = () => {
    if (!activeRoutine) return;
    if (routineExerciseIndex < activeRoutine.exercises.length - 1) {
      setRoutineExerciseIndex(routineExerciseIndex + 1);
      setRoutineTimerSeconds(45);
      setIsTimerRunning(true);
      playChime('beep');
    } else {
      playChime('success');
      alert('Congratulations! You completed your prenatal wellness session.');
      setActiveRoutine(null);
    }
  };

  return (
    <div
      className={`flex flex-col h-full pb-24 overflow-y-auto transition-colors duration-200 ${
        isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#080d1a] text-gray-100'
      }`}
    >
      {/* Top Header Bar */}
      <div
        className={`p-4 sm:p-5 border-b backdrop-blur-md sticky top-0 z-20 transition-colors ${
          isLight ? 'bg-white/95 border-slate-200' : 'bg-[#0f172a]/95 border-[#213253]'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)] animate-pulse" />
              <h1 className={`text-xl sm:text-2xl font-bold font-heading tracking-wide ${isLight ? 'text-slate-900' : 'text-white'}`}>
                PRENATAL SAFE EXERCISE STUDIO
              </h1>
            </div>
            <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>
              ACOG-certified movement library, pelvic floor care, trimester adaptations & safe dumbbell training
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-rose-500/15 text-rose-500 dark:text-rose-400 border border-rose-500/30 flex items-center gap-1.5">
              <Heart className="w-3 h-3 fill-rose-500" />
              <span>ACOG Evidenced</span>
            </span>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center gap-1">
              <Dumbbell className="w-3 h-3" />
              <span>Dumbbell Safe</span>
            </span>
          </div>
        </div>

        {/* Trimester Selector Pill Bar */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'All' as const, label: 'All Trimesters', icon: <Flower2 className="w-3.5 h-3.5" /> },
            { id: 'Trimester 1' as const, label: 'Trimester 1 (Weeks 1-12)', icon: <Sparkles className="w-3.5 h-3.5" /> },
            { id: 'Trimester 2' as const, label: 'Trimester 2 (Weeks 13-27)', icon: <Baby className="w-3.5 h-3.5" /> },
            { id: 'Trimester 3' as const, label: 'Trimester 3 (Weeks 28-40+)', icon: <Heart className="w-3.5 h-3.5" /> },
            { id: 'Postpartum' as const, label: 'Postpartum Recovery', icon: <Smile className="w-3.5 h-3.5" /> }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedTrimester(item.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all shadow-sm ${
                selectedTrimester === item.id
                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-rose-500/25 ring-2 ring-rose-400/50 scale-[1.02]'
                  : isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                  : 'bg-[#162038] text-gray-300 hover:bg-[#1f2d4d] hover:text-white border border-[#213253]'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Main Section Mode Tabs */}
        <div className={`flex gap-1.5 pt-3 border-t mt-2.5 ${isLight ? 'border-slate-200' : 'border-[#213253]/60'}`}>
          {[
            { id: 'exercises' as const, label: 'Safe Exercises & Videos', icon: <Activity className="w-3.5 h-3.5" /> },
            { id: 'routines' as const, label: 'Guided Trimester Routines', icon: <Layers className="w-3.5 h-3.5" /> },
            { id: 'safety' as const, label: 'ACOG Safety & Red Flags', icon: <ShieldCheck className="w-3.5 h-3.5" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                activeSection === tab.id
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold shadow-md'
                  : isLight
                  ? 'bg-slate-100 text-slate-600 hover:text-slate-900'
                  : 'bg-[#111a2f] text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab.icon}
              <span className="text-[11px] sm:text-xs">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 sm:p-5 max-w-4xl mx-auto w-full space-y-5">
        {/* REASSURING MEDICAL NOTICE BANNER */}
        <div
          className={`p-4 rounded-2xl border flex items-start gap-3.5 shadow-sm ${
            isLight
              ? 'bg-rose-50/90 border-rose-200 text-slate-800'
              : 'bg-gradient-to-r from-rose-950/30 via-[#0f172a] to-[#122040] border-rose-500/40 text-gray-200'
          }`}
        >
          <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-500 shrink-0 mt-0.5">
            <Heart className="w-4 h-4 fill-current" />
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-xs font-bold font-heading ${isLight ? 'text-rose-950' : 'text-white'}`}>
                Obstetric Safety Guideline: Listen to Your Body
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-600 dark:text-rose-300 font-bold">
                TALK TEST & RPE 12-14
              </span>
            </div>
            <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-gray-300'} leading-relaxed`}>
              All exercises in this portal follow the <strong>American College of Obstetricians and Gynecologists (ACOG)</strong> and Canadian CSEP prenatal standards. Always maintain the <strong>"Talk Test"</strong> (you can comfortably hold a full conversation), stay cool, drink water, and avoid lying flat on your back after 16 weeks.
            </p>
          </div>
        </div>

        {/* SECTION 1: SAFE EXERCISES LIST */}
        {activeSection === 'exercises' && (
          <div className="space-y-4">
            {/* Search and Equipment Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search Box */}
              <div className="relative flex-1">
                <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isLight ? 'text-slate-400' : 'text-gray-400'}`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search exercises (e.g. dumbbell, pelvic, squat, breathing)..."
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm focus:outline-none transition-colors border shadow-inner ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-rose-500'
                      : 'bg-[#0f172a] border-[#213253] text-white placeholder-gray-500 focus:border-rose-500'
                  }`}
                />
              </div>

              {/* Equipment Quick Filter */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none items-center">
                {[
                  { id: 'All', label: 'All Equipment' },
                  { id: 'Dumbbells', label: 'Dumbbells (NEW)', isHighlight: true },
                  { id: 'Bodyweight', label: 'Bodyweight & Mat' },
                  { id: 'Resistance Band', label: 'Band' },
                  { id: 'Chair / Block', label: 'Chair / Block' }
                ].map((eq) => (
                  <button
                    key={eq.id}
                    onClick={() => setSelectedEquipment(eq.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
                      selectedEquipment === eq.id
                        ? eq.isHighlight
                          ? 'bg-amber-500 text-black font-extrabold shadow-md'
                          : 'bg-rose-600 text-white font-bold shadow-md'
                        : eq.isHighlight
                        ? isLight
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                        : isLight
                        ? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                        : 'bg-[#162038] text-gray-300 hover:bg-[#1f2d4d] border border-[#213253]'
                    }`}
                  >
                    {eq.isHighlight && <Dumbbell className="w-3.5 h-3.5" />}
                    <span>{eq.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-rose-600 text-white font-bold'
                      : isLight
                      ? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      : 'bg-[#162038] text-gray-300 hover:bg-[#1f2d4d] border border-[#213253]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Exercise Count Heading */}
            <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
              <span>Showing {filteredExercises.length} evidence-based prenatal movements</span>
              <span className="text-[11px] font-mono">Tap card to view form, adaptations & verified video</span>
            </div>

            {/* Exercise Cards */}
            <div className="space-y-3.5">
              {filteredExercises.map((exercise) => {
                const isExpanded = expandedExerciseId === exercise.id;
                const isDumbbellExercise = exercise.id.includes('dumbbell');

                return (
                  <div
                    key={exercise.id}
                    className={`rounded-2xl border transition-all overflow-hidden ${
                      isDumbbellExercise
                        ? isLight
                          ? 'bg-white border-amber-300/80 shadow-md ring-1 ring-amber-300/50'
                          : 'bg-gradient-to-r from-[#0f172a] to-[#1a1c2e] border-amber-500/50 shadow-lg'
                        : isLight
                        ? 'bg-white border-slate-200 shadow-sm hover:border-rose-300'
                        : 'bg-[#0f172a] border-[#213253] hover:border-rose-500/50 shadow-md'
                    }`}
                  >
                    {/* Exercise Card Header */}
                    <div
                      onClick={() => setExpandedExerciseId(isExpanded ? null : exercise.id)}
                      className="p-4 sm:p-5 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                            isDumbbellExercise
                              ? isLight
                                ? 'bg-amber-100 border border-amber-300 text-amber-700'
                                : 'bg-amber-500/20 border border-amber-500/40 text-amber-400'
                              : isLight
                              ? 'bg-rose-50 border border-rose-200 text-rose-600'
                              : 'bg-rose-500/10 border border-rose-500/30 text-rose-400'
                          }`}
                        >
                          {isDumbbellExercise ? (
                            <Dumbbell className="w-5 h-5" />
                          ) : (
                            <Flower2 className="w-5 h-5" />
                          )}
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-1.5">
                            {isDumbbellExercise && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 flex items-center gap-1">
                                <Dumbbell className="w-3 h-3" />
                                <span>DUMBBELL EXERCISE</span>
                              </span>
                            )}
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/15 text-rose-600 dark:text-rose-300 border border-rose-500/25">
                              {exercise.category}
                            </span>
                            <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                              {exercise.trimestersSafe.join(' • ')}
                            </span>
                          </div>

                          <h3 className={`text-base font-bold font-heading mt-1 flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                            <span>{exercise.name}</span>
                          </h3>
                          <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>
                            {exercise.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <span className={`text-xs font-mono px-2.5 py-1 rounded-lg border ${
                          isLight
                            ? 'bg-slate-100 border-slate-200 text-slate-800'
                            : 'bg-[#162038] border-[#213253] text-gray-200'
                        }`}>
                          {exercise.recommendedReps}
                        </span>

                        <div className={`p-1.5 rounded-xl border ${
                          isLight ? 'bg-slate-100 text-slate-600' : 'bg-[#162038] text-gray-400'
                        }`}>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Expanded Detail View */}
                    {isExpanded && (
                      <div
                        className={`px-4 pb-5 sm:px-5 border-t space-y-4 pt-4 ${
                          isLight ? 'bg-slate-50/70 border-slate-200' : 'bg-[#0b1324] border-[#1c2948]'
                        }`}
                      >
                        {/* Benefits & Target Muscles */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className={`p-3 rounded-xl border ${isLight ? 'bg-white border-slate-200' : 'bg-[#0f172a] border-[#213253]'}`}>
                            <span className="text-[10px] font-mono text-rose-500 uppercase font-bold block mb-1">
                              Pregnancy & Birth Benefits
                            </span>
                            <p className={isLight ? 'text-slate-700' : 'text-gray-300'}>{exercise.benefits}</p>
                          </div>

                          <div className={`p-3 rounded-xl border ${isLight ? 'bg-white border-slate-200' : 'bg-[#0f172a] border-[#213253]'}`}>
                            <span className="text-[10px] font-mono text-rose-500 uppercase font-bold block mb-1">
                              Target Muscles & Support Sling
                            </span>
                            <p className={isLight ? 'text-slate-700' : 'text-gray-300'}>{exercise.targetMuscles}</p>
                            <div className="mt-2 text-[10px] font-mono text-gray-400">
                              Equipment: <span className="text-amber-500 font-bold">{exercise.equipmentNeeded.join(', ')}</span>
                            </div>
                          </div>
                        </div>

                        {/* Breathing Technique Box */}
                        <div
                          className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs ${
                            isLight
                              ? 'bg-rose-50 border-rose-200 text-slate-800'
                              : 'bg-rose-950/20 border-rose-500/30 text-rose-200'
                          }`}
                        >
                          <Wind className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          <div className="space-y-0.5">
                            <strong className="block text-rose-600 dark:text-rose-300 font-mono text-[11px] uppercase">
                              Breathing & Pelvic Connection Cue:
                            </strong>
                            <span>{exercise.breathingTechnique}</span>
                          </div>
                        </div>

                        {/* Step-by-Step Instructions */}
                        <div className="space-y-1.5">
                          <span className={`text-[11px] font-mono uppercase font-bold block ${isLight ? 'text-slate-700' : 'text-rose-400'}`}>
                            How to Perform Safely:
                          </span>
                          <ol className="space-y-1.5 text-xs">
                            {exercise.executionSteps.map((step, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-600 dark:text-rose-400 font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                                  {idx + 1}
                                </span>
                                <span className={isLight ? 'text-slate-700' : 'text-gray-300'}>{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>

                        {/* Trimester-Specific Modifications */}
                        <div className="space-y-2">
                          <span className={`text-[11px] font-mono uppercase font-bold block ${isLight ? 'text-slate-700' : 'text-rose-400'}`}>
                            Trimester Adaptations & Pelvic Girdle Care:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            {exercise.modifications.firstTrimester && (
                              <div className={`p-2.5 rounded-lg border ${isLight ? 'bg-white border-slate-200' : 'bg-[#0f172a] border-[#213253]'}`}>
                                <span className="text-rose-500 font-bold block text-[11px]">1st Trimester:</span>
                                <span className={isLight ? 'text-slate-600' : 'text-gray-300'}>{exercise.modifications.firstTrimester}</span>
                              </div>
                            )}
                            {exercise.modifications.secondTrimester && (
                              <div className={`p-2.5 rounded-lg border ${isLight ? 'bg-white border-slate-200' : 'bg-[#0f172a] border-[#213253]'}`}>
                                <span className="text-rose-500 font-bold block text-[11px]">2nd Trimester:</span>
                                <span className={isLight ? 'text-slate-600' : 'text-gray-300'}>{exercise.modifications.secondTrimester}</span>
                              </div>
                            )}
                            {exercise.modifications.thirdTrimester && (
                              <div className={`p-2.5 rounded-lg border ${isLight ? 'bg-white border-slate-200' : 'bg-[#0f172a] border-[#213253]'}`}>
                                <span className="text-rose-500 font-bold block text-[11px]">3rd Trimester:</span>
                                <span className={isLight ? 'text-slate-600' : 'text-gray-300'}>{exercise.modifications.thirdTrimester}</span>
                              </div>
                            )}
                            {exercise.modifications.pelvicGirdlePain && (
                              <div className={`p-2.5 rounded-lg border ${isLight ? 'bg-white border-slate-200' : 'bg-[#0f172a] border-[#213253]'}`}>
                                <span className="text-rose-500 font-bold block text-[11px]">If Pelvic / SI Joint Pain:</span>
                                <span className={isLight ? 'text-slate-600' : 'text-gray-300'}>{exercise.modifications.pelvicGirdlePain}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Safety & What NOT to do */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
                          <div className={`p-2.5 rounded-xl border ${isLight ? 'bg-emerald-50/70 border-emerald-200' : 'bg-emerald-950/20 border-emerald-500/30'}`}>
                            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase font-bold flex items-center gap-1 mb-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Key Form Checklist</span>
                            </span>
                            <ul className="space-y-1">
                              {exercise.safetyCues.map((cue, cIdx) => (
                                <li key={cIdx} className={`text-[11px] ${isLight ? 'text-slate-700' : 'text-gray-300'}`}>• {cue}</li>
                              ))}
                            </ul>
                          </div>

                          <div className={`p-2.5 rounded-xl border ${isLight ? 'bg-amber-50/70 border-amber-200' : 'bg-amber-950/20 border-amber-500/30'}`}>
                            <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 uppercase font-bold flex items-center gap-1 mb-1">
                              <AlertTriangle className="w-3.5 h-3.5" />
                              <span>Contraindications & Avoid</span>
                            </span>
                            <ul className="space-y-1">
                              {exercise.contraindications.map((con, cIdx) => (
                                <li key={cIdx} className={`text-[11px] ${isLight ? 'text-slate-700' : 'text-gray-300'}`}>• {con}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Action Buttons: Watch Video & Visual Guide */}
                        <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 dark:border-[#213253]/60">
                          <div className="text-xs text-gray-400 flex items-center gap-1.5">
                            <span>Clinical Channel:</span>
                            <span className="font-semibold text-rose-500">{exercise.youtubeChannel}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setActiveVideoExercise(exercise);
                                setPlayerTab('animation');
                              }}
                              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-[#162038] dark:hover:bg-[#1f2d4d] text-slate-800 dark:text-gray-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-slate-300 dark:border-[#213253] transition-colors"
                            >
                              <Wind className="w-3.5 h-3.5 text-rose-500" />
                              <span>Breathing Cadence</span>
                            </button>

                            <button
                              onClick={() => {
                                setActiveVideoExercise(exercise);
                                setPlayerTab('youtube');
                              }}
                              className="px-3.5 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all hover:scale-[1.01]"
                            >
                              <Play className="w-3.5 h-3.5 fill-white" />
                              <span>Watch Real Video Tutorial</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SECTION 2: GUIDED TRIMESTER ROUTINES */}
        {activeSection === 'routines' && (
          <div className="space-y-5">
            <div className={`p-4 sm:p-5 rounded-2xl border ${isLight ? 'bg-white border-slate-200' : 'bg-[#0f172a] border-[#213253]'}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                  DUMBBELL & BODYWEIGHT INTEGRATED
                </span>
              </div>
              <h3 className={`text-base sm:text-lg font-bold font-heading ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Trimester-Specific Guided Routines
              </h3>
              <p className={`text-xs mt-1 ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>
                12 to 20 minute clinician-reviewed sessions specifically paced for safe maternal heart rate, pelvic health, and postural stamina with optional light dumbbells.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PRENATAL_ROUTINES.map((routine) => (
                <div
                  key={routine.id}
                  className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                    isLight
                      ? 'bg-white border-slate-200 shadow-md hover:border-rose-400'
                      : 'bg-[#0f172a] border-[#213253] hover:border-rose-500/50 shadow-lg'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-rose-500/15 text-rose-600 dark:text-rose-300 border border-rose-500/30">
                        {routine.trimester}
                      </span>
                      <span className="text-xs font-mono text-gray-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{routine.durationMinutes} mins</span>
                      </span>
                    </div>

                    <h4 className={`text-base font-bold font-heading ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {routine.title}
                    </h4>
                    <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-gray-300'}`}>
                      {routine.description}
                    </p>

                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-mono text-rose-500 font-bold uppercase">
                        Included Safe Movements ({routine.exercises.length}):
                      </span>
                      <div className="space-y-1">
                        {routine.exercises.map((item, idx) => {
                          const exInfo = PRENATAL_EXERCISES.find((e) => e.id === item.exerciseId);
                          const isDb = item.exerciseId.includes('dumbbell');
                          return (
                            <div
                              key={idx}
                              className={`p-2 rounded-lg text-xs flex items-center justify-between ${
                                isDb
                                  ? isLight
                                    ? 'bg-amber-50 border border-amber-200'
                                    : 'bg-amber-950/20 border border-amber-500/30'
                                  : isLight
                                  ? 'bg-slate-50 border border-slate-100'
                                  : 'bg-[#162038] border border-[#213253]'
                              }`}
                            >
                              <span className={`flex items-center gap-1.5 ${isLight ? 'text-slate-800' : 'text-gray-200'}`}>
                                {isDb && <Dumbbell className="w-3 h-3 text-amber-500" />}
                                <span>{exInfo ? exInfo.name : item.exerciseId}</span>
                              </span>
                              <span className="font-mono text-rose-500 font-semibold text-[11px]">
                                {item.repsOrDuration}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-3 border-t border-slate-200 dark:border-[#213253]">
                    <button
                      onClick={() => handleStartRoutine(routine)}
                      className="w-full py-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-600/25 flex items-center justify-center gap-2 transition-all"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Start Guided Routine</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 3: ACOG CLINICAL SAFETY & RED FLAGS */}
        {activeSection === 'safety' && (
          <div className="space-y-5">
            {/* Red Flag Stop Warnings Alert */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-red-950/40 via-[#0f172a] to-red-900/20 border-2 border-red-500/70 shadow-2xl space-y-3">
              <div className="flex items-center gap-2.5 text-red-400">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <h3 className="font-bold text-base font-heading uppercase tracking-wide text-white">
                  ACOG Clinical Warning Signs: When to Stop Exercising Immediately
                </h3>
              </div>
              <p className="text-xs text-red-200 leading-relaxed font-sans">
                According to the <strong>American College of Obstetricians and Gynecologists (ACOG)</strong> Committee Opinion No. 804, discontinue all physical activity and call your OB-GYN, midwife, or labor unit immediately if you experience:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-200 pt-1">
                <div className="flex items-start gap-2 bg-black/40 p-2.5 rounded-xl border border-red-500/30">
                  <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span><strong>Vaginal bleeding</strong> or fluid leaking</span>
                </div>
                <div className="flex items-start gap-2 bg-black/40 p-2.5 rounded-xl border border-red-500/30">
                  <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span><strong>Dizziness, presyncope</strong> or feeling faint</span>
                </div>
                <div className="flex items-start gap-2 bg-black/40 p-2.5 rounded-xl border border-red-500/30">
                  <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span><strong>Shortness of breath</strong> prior to beginning exertion</span>
                </div>
                <div className="flex items-start gap-2 bg-black/40 p-2.5 rounded-xl border border-red-500/30">
                  <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span><strong>Chest pain</strong> or rapid palpitations</span>
                </div>
                <div className="flex items-start gap-2 bg-black/40 p-2.5 rounded-xl border border-red-500/30">
                  <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span><strong>Regular, painful uterine contractions</strong></span>
                </div>
                <div className="flex items-start gap-2 bg-black/40 p-2.5 rounded-xl border border-red-500/30">
                  <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span><strong>Calf pain or unilateral swelling</strong> (DVT risk)</span>
                </div>
              </div>
            </div>

            {/* Detailed Clinical Guidelines Cards */}
            <div className="space-y-3.5">
              {PRENATAL_CLINICAL_GUIDELINES.map((guideline, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border space-y-2 ${
                    isLight ? 'bg-white border-slate-200' : 'bg-[#0f172a] border-[#213253]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <h4 className={`font-bold text-sm font-heading ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {guideline.title}
                    </h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/15 text-rose-600 dark:text-rose-300 font-semibold">
                      {guideline.category}
                    </span>
                  </div>

                  <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-gray-300'}`}>
                    {guideline.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 dark:border-[#1c2948] text-[10px] font-mono text-gray-400">
                    Source: <span className="text-rose-500 font-semibold">{guideline.clinicalSource}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* POPUP: INTERACTIVE DUAL-MODE PRENATAL VIDEO & CADENCE MODAL */}
      {activeVideoExercise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0f172a] border border-rose-500/40 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="p-4 bg-[#0a1020] border-b border-[#213253] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  activeVideoExercise.id.includes('dumbbell')
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : 'bg-red-600/20 text-red-400 border border-red-500/40'
                }`}>
                  {activeVideoExercise.id.includes('dumbbell') ? (
                    <Dumbbell className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 fill-current" />
                  )}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-heading">
                    {activeVideoExercise.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-rose-400 font-mono">
                      By {activeVideoExercise.youtubeChannel}
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-emerald-400 font-mono text-[11px]">
                      ACOG Verified
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCloseVideoModal}
                className="p-2 text-gray-400 hover:text-white rounded-xl bg-[#162038] border border-[#213253]"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex border-b border-[#213253] bg-[#0c1426] p-1.5 gap-1.5">
              <button
                onClick={() => setPlayerTab('youtube')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
                  playerTab === 'youtube'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Tv className="w-3.5 h-3.5" />
                <span>Real Video Tutorial</span>
              </button>
              <button
                onClick={() => setPlayerTab('animation')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
                  playerTab === 'animation'
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Wind className="w-3.5 h-3.5" />
                <span>Breathing & Cadence Guide</span>
              </button>
            </div>

            {/* Player Body */}
            <div className="flex-1 overflow-y-auto">
              {playerTab === 'youtube' ? (
                <div>
                  {/* Embedded YouTube Player */}
                  <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${activeVideoExercise.youtubeVideoId}?rel=0&autoplay=1&modestbranding=1`}
                      title={activeVideoExercise.youtubeTitle}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>

                  {/* Video Helper Notice */}
                  <div className="p-4 bg-[#0a1020] border-t border-[#213253] space-y-2 text-xs">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-gray-300 font-medium">
                        {activeVideoExercise.youtubeTitle}
                      </span>
                      <a
                        href={`https://www.youtube.com/watch?v=${activeVideoExercise.youtubeVideoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl flex items-center gap-1.5 shrink-0 transition-colors shadow"
                      >
                        <span>Open on YouTube</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      💡 Tip: If your browser blocks video embeds, click the <strong>Open on YouTube</strong> button above to watch directly without ads in a free new tab.
                    </p>
                  </div>
                </div>
              ) : (
                /* Interactive Breathing Cadence & Form Guide */
                <div className="p-5 bg-gradient-to-b from-[#0a1224] to-[#080d1a] space-y-5">
                  {/* Breathing Pulse Visualizer */}
                  <div className="flex flex-col items-center justify-center py-6 space-y-4">
                    <div className="relative flex items-center justify-center w-40 h-40">
                      {/* Outer Pulse Ring */}
                      <div
                        className={`absolute rounded-full transition-all duration-300 ${
                          breathPhase === 'Inhale'
                            ? 'bg-rose-500/20 ring-4 ring-rose-400/40'
                            : 'bg-emerald-500/20 ring-4 ring-emerald-400/40'
                        }`}
                        style={{
                          width: `${80 + breathProgress * 0.7}%`,
                          height: `${80 + breathProgress * 0.7}%`
                        }}
                      />
                      {/* Center Core Circle */}
                      <div className={`relative z-10 w-28 h-28 rounded-full flex flex-col items-center justify-center text-center p-2 shadow-2xl border ${
                        breathPhase === 'Inhale'
                          ? 'bg-gradient-to-br from-rose-600 to-pink-600 border-rose-300 text-white'
                          : 'bg-gradient-to-br from-emerald-600 to-teal-600 border-emerald-300 text-white'
                      }`}>
                        <span className="text-[10px] font-mono uppercase tracking-wider opacity-90">
                          {breathPhase}
                        </span>
                        <span className="text-sm font-extrabold font-heading">
                          {breathPhase === 'Inhale' ? 'Expand' : 'Hug Baby'}
                        </span>
                        <span className="text-[9px] font-mono opacity-80 mt-0.5">
                          {breathPhase === 'Inhale' ? 'Yield pelvic floor' : 'Gently lift & press'}
                        </span>
                      </div>
                    </div>

                    <div className="text-center space-y-1">
                      <p className="text-xs text-rose-300 font-medium">
                        {activeVideoExercise.breathingTechnique}
                      </p>
                      <span className="text-[10px] font-mono text-gray-400 block">
                        Cadence: Inhale 4s • Exhale 4s (ACOG Intra-abdominal safety rhythm)
                      </span>
                    </div>
                  </div>

                  {/* Voice Coach Narration */}
                  <div className="p-4 rounded-2xl bg-[#0f172a] border border-rose-500/30 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <Volume2 className="w-4 h-4 text-rose-400 shrink-0" />
                      <div>
                        <span className="text-xs font-bold text-white block">
                          Audio Form Narration
                        </span>
                        <span className="text-[11px] text-gray-400">
                          Hear step-by-step guidance spoken aloud while you exercise
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        handleSpeakGuidance(
                          `${activeVideoExercise.name}. ${activeVideoExercise.benefits}. How to perform: ${activeVideoExercise.executionSteps.join('. ')}. Breathing focus: ${activeVideoExercise.breathingTechnique}`
                        )
                      }
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                        isVoiceSpeaking
                          ? 'bg-red-600 text-white animate-pulse'
                          : 'bg-rose-600 hover:bg-rose-500 text-white'
                      }`}
                    >
                      {isVoiceSpeaking ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5" />
                          <span>Stop Voice</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Play Audio</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Step by step list */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono font-bold text-rose-400 uppercase">
                      Execution Phases:
                    </h4>
                    <div className="space-y-1.5 text-xs">
                      {activeVideoExercise.executionSteps.map((step, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl bg-[#0f172a] border border-[#213253] flex items-start gap-2.5"
                        >
                          <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="text-gray-300">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Video Footer Info */}
            <div className="p-4 bg-[#080d1a] border-t border-[#213253] flex items-center justify-between gap-3 text-xs">
              <div className="text-gray-300 truncate">
                <span className="text-rose-400 font-bold">Equipment: </span>
                <span>{activeVideoExercise.equipmentNeeded.join(', ')}</span>
              </div>
              <button
                onClick={handleCloseVideoModal}
                className="px-4 py-1.5 bg-[#162038] hover:bg-[#1f2d4d] text-white font-bold rounded-xl transition-colors shrink-0"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP: ACTIVE GUIDED ROUTINE SESSION HUD */}
      {activeRoutine && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md">
          <div className="bg-[#0f172a] border-2 border-rose-500/50 rounded-3xl w-full max-w-lg p-5 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#213253] pb-3">
              <div>
                <span className="text-[10px] font-mono text-rose-400 uppercase font-bold block">
                  Prenatal Routine Session • {activeRoutine.trimester}
                </span>
                <h3 className="text-base sm:text-lg font-bold font-heading text-white">
                  {activeRoutine.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveRoutine(null)}
                className="p-1.5 text-gray-400 hover:text-white rounded-xl bg-[#162038]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current Exercise Display */}
            {(() => {
              const currentItem = activeRoutine.exercises[routineExerciseIndex];
              const exDetail = PRENATAL_EXERCISES.find((e) => e.id === currentItem?.exerciseId);
              const isDb = currentItem?.exerciseId.includes('dumbbell');

              return (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                    <span>
                      Exercise {routineExerciseIndex + 1} of {activeRoutine.exercises.length}
                    </span>
                    <span className="text-rose-400 font-bold">
                      {currentItem?.repsOrDuration}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#091122] border border-rose-500/30 text-center space-y-2">
                    {isDb && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 inline-flex items-center gap-1">
                        <Dumbbell className="w-3 h-3" />
                        <span>Dumbbell Strength</span>
                      </span>
                    )}
                    <h4 className="text-xl font-extrabold font-heading text-white">
                      {exDetail?.name}
                    </h4>
                    <p className="text-xs text-rose-300 font-medium">
                      {currentItem?.tip}
                    </p>
                  </div>

                  {/* Timer Display */}
                  <div className="p-3 rounded-2xl bg-[#162038] border border-[#213253] flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-300 font-mono">
                      <Clock className="w-4 h-4 text-rose-400" />
                      <span>Movement Timer:</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-mono font-bold text-white">
                        {routineTimerSeconds}s
                      </span>
                      <button
                        onClick={() => setIsTimerRunning(!isTimerRunning)}
                        className="p-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white"
                      >
                        {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#162038] text-xs text-gray-300">
                    <strong className="text-white block mb-0.5">Breathing Focus:</strong>
                    {exDetail?.breathingTechnique}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => setActiveRoutine(null)}
                      className="flex-1 py-3 bg-[#162038] hover:bg-[#1f2d4d] text-gray-300 font-bold text-xs rounded-xl"
                    >
                      End Early
                    </button>

                    <button
                      onClick={handleNextRoutineExercise}
                      className="flex-1 py-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-1.5"
                    >
                      <span>
                        {routineExerciseIndex === activeRoutine.exercises.length - 1
                          ? 'Finish Session'
                          : 'Next Movement'}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};
