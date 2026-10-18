import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Play,
  Pause,
  RotateCcw,
  Eye,
  ShieldCheck,
  Activity,
  ChevronRight,
  Layers,
  Info,
  Box,
  User,
  Zap,
  Sparkles,
  Gauge,
  Flame,
  Target,
  Crosshair,
  Video,
  Split,
  FastForward,
  Rewind
} from 'lucide-react';
import {
  MuscleId,
  ExerciseMuscleHeatmap,
  MuscleActivationInfo,
  getExerciseMuscleHeatmap,
  getHeatColorForEMG
} from '../../data/muscleHeatmapData';
import { MuscleHeatmapOverlay } from './MuscleHeatmapOverlay';
import { AnimatedWorkoutPicture } from './AnimatedWorkoutPicture';

interface BiomechanicalModelDef {
  id: string;
  name: string;
  category: string;
  primaryMuscleLabel: string;
  jointFocus: string;
  hasBarbell: boolean;
  barbellType: 'barbell' | 'dumbbells' | 'bodyweight';
  postureCues: string[];
  biomechanicalReadout: {
    targetAngleName: string;
    startAngle: string;
    finishAngle: string;
  };
}

const MODELS_DATA: BiomechanicalModelDef[] = [
  {
    id: 'barbell-back-squat',
    name: 'Barbell Back Squat',
    category: 'Lower Body Compound',
    primaryMuscleLabel: 'Quadriceps & Gluteus Maximus',
    jointFocus: 'Knee Flexion & Hip Extension',
    hasBarbell: true,
    barbellType: 'barbell',
    postureCues: [
      'Maintain neutral spine; avoid lumbar flexion (butt wink).',
      'Knees track outward in the exact plane of the toes.',
      'Center of gravity remains aligned directly over mid-foot.'
    ],
    biomechanicalReadout: {
      targetAngleName: 'Knee Joint Flexion',
      startAngle: '180° (Full Extension)',
      finishAngle: '70° (Below Parallel)'
    }
  },
  {
    id: 'barbell-bench-press',
    name: 'Barbell Bench Press',
    category: 'Upper Body Horizontal Push',
    primaryMuscleLabel: 'Pectoralis Major & Triceps',
    jointFocus: 'Glenohumeral Horizontal Adduction',
    hasBarbell: true,
    barbellType: 'barbell',
    postureCues: [
      'Scapulae tightly retracted and depressed into bench padding.',
      'Elbows tucked at 45–70 degrees, avoiding 90-degree flare.',
      'Continuous leg drive without glutes losing bench contact.'
    ],
    biomechanicalReadout: {
      targetAngleName: 'Elbow Joint Angle',
      startAngle: '180° (Lockout)',
      finishAngle: '75° (Chest Touch)'
    }
  },
  {
    id: 'barbell-deadlift',
    name: 'Conventional Barbell Deadlift',
    category: 'Posterior Chain Compound',
    primaryMuscleLabel: 'Hamstrings, Glutes & Erector Spinae',
    jointFocus: 'Hip Hinge & Scapular Pack',
    hasBarbell: true,
    barbellType: 'barbell',
    postureCues: [
      'Barbell remains in continuous scraping contact with shins and thighs.',
      'Lats engaged to prevent lumbar rounding and anterior bar drift.',
      'Lockout completed with glute squeeze, avoiding hyperextension.'
    ],
    biomechanicalReadout: {
      targetAngleName: 'Hip Hinge Angle',
      startAngle: '45° (Loaded Tension)',
      finishAngle: '180° (Erect Lockout)'
    }
  },
  {
    id: 'overhead-press',
    name: 'Overhead Barbell Press',
    category: 'Upper Body Vertical Push',
    primaryMuscleLabel: 'Anterior & Lateral Deltoids',
    jointFocus: 'Scapular Upward Rotation & Shoulder Flexion',
    hasBarbell: true,
    barbellType: 'barbell',
    postureCues: [
      'Lock glutes and brace core to prevent lumbar hyperextension.',
      'Vertical forearm alignment under barbell throughout the lift.',
      'Head pushes slightly forward once bar clears forehead.'
    ],
    biomechanicalReadout: {
      targetAngleName: 'Shoulder Abduction',
      startAngle: '0° (Front Rack)',
      finishAngle: '180° (Overhead Stack)'
    }
  },
  {
    id: 'pull-up',
    name: 'Strict Bodyweight Pull-Up',
    category: 'Upper Body Vertical Pull',
    primaryMuscleLabel: 'Latissimus Dorsi & Biceps',
    jointFocus: 'Scapular Depression & Elbow Flexion',
    hasBarbell: false,
    barbellType: 'bodyweight',
    postureCues: [
      'Initiate pull with scapular depression, not forearm pulling.',
      'Maintain hollow body posture; avoid swinging legs.',
      'Chest reaches up to the bar for peak lat engagement.'
    ],
    biomechanicalReadout: {
      targetAngleName: 'Elbow Flexion Angle',
      startAngle: '180° (Dead Hang)',
      finishAngle: '45° (Chin Over Bar)'
    }
  },
  {
    id: 'barbell-bicep-curl',
    name: 'Standing Barbell Bicep Curl',
    category: 'Upper Arm Isolation',
    primaryMuscleLabel: 'Biceps Brachii & Brachialis',
    jointFocus: 'Isolated Elbow Flexion',
    hasBarbell: true,
    barbellType: 'barbell',
    postureCues: [
      'Elbows remain pinned at sides like fixed hinges.',
      'No torso rocking or hip thrust cheating.',
      'Full elbow extension at bottom of every repetition.'
    ],
    biomechanicalReadout: {
      targetAngleName: 'Elbow Flexion Peak',
      startAngle: '175° (Extended)',
      finishAngle: '40° (Peak Contraction)'
    }
  },
  {
    id: 'standard-pushup',
    name: 'Standard Push-Up',
    category: 'Bodyweight Compound',
    primaryMuscleLabel: 'Pectoralis Major & Triceps',
    jointFocus: 'Horizontal Push & Core Stability',
    hasBarbell: false,
    barbellType: 'bodyweight',
    postureCues: [
      'Maintain rigid straight line from heels through crown of head.',
      'Elbows track backward at 45 degrees relative to torso.',
      'Full lockout at top without winging shoulder blades.'
    ],
    biomechanicalReadout: {
      targetAngleName: 'Elbow Joint Angle',
      startAngle: '180° (Plank Lockout)',
      finishAngle: '70° (Chest to Floor)'
    }
  },
  {
    id: 'bulgarian-split-squat',
    name: 'Bulgarian Split Squat',
    category: 'Unilateral Lower Body',
    primaryMuscleLabel: 'Quadriceps, Glutes & Adductors',
    jointFocus: 'Unilateral Knee Flexion & Balance',
    hasBarbell: false,
    barbellType: 'dumbbells',
    postureCues: [
      'Front foot placed far enough forward so knee stays over ankle.',
      'Maintain upright torso with hips squared to front.',
      'Drive directly through front heel on concentric ascent.'
    ],
    biomechanicalReadout: {
      targetAngleName: 'Front Knee Flexion',
      startAngle: '180° (Extended)',
      finishAngle: '85° (Full Depth)'
    }
  },
  {
    id: 'dumbbell-lateral-raise',
    name: 'Dumbbell Lateral Raise',
    category: 'Shoulder Isolation',
    primaryMuscleLabel: 'Lateral Deltoid',
    jointFocus: 'Glenohumeral Abduction',
    hasBarbell: false,
    barbellType: 'dumbbells',
    postureCues: [
      'Slight forward torso lean (10°) to align with scapular plane.',
      'Lead with elbows, keeping hands slightly lower than elbows.',
      'Stop at parallel (90°) to avoid impingement.'
    ],
    biomechanicalReadout: {
      targetAngleName: 'Shoulder Abduction',
      startAngle: '0° (At Sides)',
      finishAngle: '90° (Parallel to Floor)'
    }
  }
];

export const ThreeDStudio: React.FC = () => {
  const { selectedStudioExerciseId, setSelectedStudioExerciseId, startWorkout } = useApp();
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [phaseProgress, setPhaseProgress] = useState<number>(0.1); // 0 = start, 1 = finish
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  // Heatmap State
  const [heatmapMode, setHeatmapMode] = useState<'heatmap' | 'standard' | 'isolation'>('heatmap');
  const [selectedMuscleId, setSelectedMuscleId] = useState<MuscleId | null>(null);

  // Active Model with robust alias matching
  const activeModel =
    MODELS_DATA.find(
      (m) =>
        m.id === selectedStudioExerciseId ||
        selectedStudioExerciseId.includes(m.id) ||
        m.id.includes(selectedStudioExerciseId) ||
        (selectedStudioExerciseId.includes('bench') && m.id.includes('bench')) ||
        (selectedStudioExerciseId.includes('squat') && m.id.includes('squat')) ||
        (selectedStudioExerciseId.includes('deadlift') && m.id.includes('deadlift')) ||
        (selectedStudioExerciseId.includes('pull') && m.id.includes('pull')) ||
        (selectedStudioExerciseId.includes('press') && m.id.includes('press')) ||
        (selectedStudioExerciseId.includes('curl') && m.id.includes('curl')) ||
        (selectedStudioExerciseId.includes('pushup') && m.id.includes('pushup'))
    ) || MODELS_DATA[0];

  // Current Exercise Heatmap Data
  const currentHeatmapData = getExerciseMuscleHeatmap(activeModel.id);

  // Animation Frame Loop for 60fps smooth playback
  const lastTimeRef = useRef<number>(performance.now());
  const reqIdRef = useRef<number | null>(null);

  useEffect(() => {
    const loop = (now: number) => {
      const dt = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      if (isPlaying) {
        // Full rep cycle takes approximately 3.5 seconds at 1.0x speed
        const cycleDuration = 3.5 / playbackSpeed;
        setPhaseProgress((prev) => {
          const next = prev + dt / cycleDuration;
          return next >= 1 ? next - 1 : next;
        });
      }

      reqIdRef.current = requestAnimationFrame(loop);
    };

    lastTimeRef.current = performance.now();
    reqIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
    };
  }, [isPlaying, playbackSpeed]);

  const selectedMuscleInfo = selectedMuscleId ? currentHeatmapData.muscles[selectedMuscleId] : null;

  return (
    <div className="flex flex-col min-h-full bg-[#080d1a] text-white">
      {/* Studio Header */}
      <div className="p-4 bg-[#0f172a] border-b border-[#213253] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600/30 to-sky-500/20 border border-blue-500/40 flex items-center justify-center text-sky-400 shadow-md shadow-blue-500/20">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold font-heading text-white tracking-wide">
                Animated Workout Studio
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-blue-500/20 text-sky-300 border border-blue-500/40">
                Animated Picture Demo
              </span>
            </div>
            <p className="text-[11px] text-gray-400">
              Biomechanical movement visualization & muscle activation for {activeModel.name}
            </p>
          </div>
        </div>

        {/* Exercise Switcher Dropdown */}
        <div className="flex items-center gap-2.5">
          <select
            value={activeModel.id}
            onChange={(e) => {
              setSelectedStudioExerciseId(e.target.value);
              setSelectedMuscleId(null);
            }}
            className="bg-[#162038] text-sky-400 font-semibold text-xs rounded-xl px-3 py-2 border border-[#213253] focus:outline-none focus:border-blue-500 shadow-sm cursor-pointer"
          >
            {MODELS_DATA.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Animated Workout Picture Viewport */}
      <div className="relative flex-1 min-h-[460px] bg-[#080d1a] overflow-hidden select-none">
        <AnimatedWorkoutPicture
          exerciseId={activeModel.id}
          exerciseName={activeModel.name}
          category={activeModel.category}
          primaryMuscleLabel={activeModel.primaryMuscleLabel}
          jointFocus={activeModel.jointFocus}
          postureCues={activeModel.postureCues}
          biomechanicalReadout={activeModel.biomechanicalReadout}
          heatmapData={currentHeatmapData}
          selectedMuscleId={selectedMuscleId}
          onSelectMuscle={(id) => setSelectedMuscleId(id)}
          playbackSpeed={playbackSpeed}
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          progress={phaseProgress}
          onProgressChange={(val) => {
            setPhaseProgress(val);
            setIsPlaying(false);
          }}
        />

        {/* Active Selected Muscle Callout Card if clicked */}
        {selectedMuscleInfo && (
          <div className="absolute top-16 right-3 max-w-xs bg-[#0f172a]/95 backdrop-blur-md p-3 rounded-2xl border border-blue-500/50 shadow-2xl space-y-1.5 z-30 animate-fade-in">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-sky-400" />
                <span className="text-xs font-bold text-white">{selectedMuscleInfo.name}</span>
              </div>
              <button
                onClick={() => setSelectedMuscleId(null)}
                className="text-gray-400 hover:text-white p-0.5 text-xs font-bold"
              >
                ✕
              </button>
            </div>
            <div className="text-[10px] text-gray-400 italic">
              {selectedMuscleInfo.latinName}
            </div>
            <div className="flex items-center justify-between text-xs font-mono pt-1">
              <span className="text-gray-400">EMG Activation:</span>
              <span
                className="font-bold text-sm"
                style={{ color: selectedMuscleInfo.heatColor }}
              >
                {selectedMuscleInfo.emgPercent}%
              </span>
            </div>
            <p className="text-[10px] text-gray-300 leading-relaxed">
              {selectedMuscleInfo.functionInExercise}
            </p>
            <div className="text-[10px] text-sky-400 flex items-start gap-1 pt-0.5">
              <span className="font-bold">Cue:</span>
              <span>{selectedMuscleInfo.cue}</span>
            </div>
          </div>
        )}
      </div>

      {/* Timeline Scrubber & Media Controls Card */}
      <div className="bg-[#0f172a] border-t border-[#213253] p-4 space-y-3.5">
        <div className="space-y-1.5 max-w-lg mx-auto w-full">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-gray-400 w-12 text-left">
              {Math.floor(phaseProgress * 3.5).toFixed(1)}s
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.005"
              value={phaseProgress}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setPhaseProgress(val);
                setIsPlaying(false);
              }}
              className="flex-1 h-2 bg-[#213253] rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <span className="text-xs font-mono text-gray-400 w-12 text-right">
              3.5s
            </span>
          </div>

          {/* Quick Rep Phase Jump Markers */}
          <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 px-1">
            <button
              onClick={() => {
                setPhaseProgress(0);
                setIsPlaying(false);
              }}
              className="hover:text-sky-300 transition-colors"
            >
              Start (0%)
            </button>
            <button
              onClick={() => {
                setPhaseProgress(0.25);
                setIsPlaying(false);
              }}
              className="hover:text-sky-300 transition-colors"
            >
              Eccentric
            </button>
            <button
              onClick={() => {
                setPhaseProgress(0.5);
                setIsPlaying(false);
              }}
              className="hover:text-sky-300 transition-colors font-bold text-sky-400"
            >
              Inflection (50%)
            </button>
            <button
              onClick={() => {
                setPhaseProgress(0.75);
                setIsPlaying(false);
              }}
              className="hover:text-sky-300 transition-colors"
            >
              Concentric
            </button>
            <button
              onClick={() => {
                setPhaseProgress(0.98);
                setIsPlaying(false);
              }}
              className="hover:text-sky-300 transition-colors"
            >
              Lockout (100%)
            </button>
          </div>
        </div>

        {/* Player Action Buttons */}
        <div className="flex items-center justify-center gap-4 sm:gap-6">
          <div className="flex items-center bg-[#162038] rounded-xl p-0.5 border border-[#213253] text-[11px] font-mono">
            {[0.5, 1, 1.5, 2].map((spd) => (
              <button
                key={spd}
                onClick={() => setPlaybackSpeed(spd)}
                className={`px-2 py-1 rounded-lg transition-colors ${
                  playbackSpeed === spd
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              const prev = Math.max(0, phaseProgress - 0.2);
              setPhaseProgress(prev);
            }}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#162038] hover:bg-[#1f2d4d] text-gray-300 border border-[#213253] transition-colors"
            title="Rewind phase"
          >
            <Rewind className="w-4 h-4 text-gray-300" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-14 h-14 rounded-full bg-white hover:bg-gray-100 text-black flex items-center justify-center shadow-xl shadow-blue-500/25 transition-all hover:scale-105"
            title={isPlaying ? 'Pause Workout Animation' : 'Play Workout Animation'}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-black" />
            ) : (
              <Play className="w-6 h-6 fill-black ml-1" />
            )}
          </button>

          <button
            onClick={() => {
              const next = Math.min(1, phaseProgress + 0.2);
              setPhaseProgress(next);
            }}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#162038] hover:bg-[#1f2d4d] text-gray-300 border border-[#213253] transition-colors"
            title="Fast forward phase"
          >
            <FastForward className="w-4 h-4 text-gray-300" />
          </button>

          <button
            onClick={() => {
              setPhaseProgress(0);
              setIsPlaying(true);
            }}
            className="w-9 h-9 rounded-full bg-[#162038] hover:bg-[#1f2d4d] text-gray-300 border border-[#213253] flex items-center justify-center transition-colors"
            title="Restart Repetition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* INTERACTIVE MUSCLE ACTIVATION HEATMAP SECTION */}
      <div className="p-4 bg-[#0a1020] border-t border-[#213253]">
        <MuscleHeatmapOverlay
          heatmapData={currentHeatmapData}
          selectedMuscleId={selectedMuscleId}
          onSelectMuscle={(id) => setSelectedMuscleId(id)}
          heatmapMode={heatmapMode}
          onSetHeatmapMode={(mode) => setHeatmapMode(mode)}
          onFocusCameraToMuscle={() => {}}
          currentProgress={phaseProgress}
        />
      </div>

      {/* Biomechanical Form & Kinematic Posture Cues Drawer */}
      <div className="p-4 bg-[#0f172a] border-t border-[#213253] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Kinematic Posture & Joint Alignment Cues
            </h3>
          </div>
          <button
            onClick={() =>
              startWorkout(undefined, {
                id: activeModel.id,
                name: activeModel.name,
                shortSummary: '',
                targetMuscles: activeModel.primaryMuscleLabel,
                primaryMuscles: ['Quadriceps'],
                secondaryMuscles: [],
                equipment: ['Barbell'],
                difficulty: 'Intermediate',
                category: 'Gym',
                startingPosition: '',
                executionSteps: [],
                postureCues: activeModel.postureCues,
                breathingPattern: '',
                recommendedSetsReps: { hypertrophy: '3x10', strength: '5x5', endurance: '3x15' },
                commonMistakes: [],
                safetyPrecautions: [],
                easierVariation: '',
                harderVariation: '',
                alternatives: [],
                guidanceByLevel: { beginner: '', intermediate: '', advanced: '' },
                biomechanicalFocus: '',
                vectorVisualType: 'squat'
              })
            }
            className="text-xs bg-blue-600 hover:bg-blue-500 text-white font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-md shadow-blue-500/25 transition-all hover:scale-105"
          >
            <span>Train This in Live Tracker</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {activeModel.postureCues.map((cue, idx) => (
            <div
              key={idx}
              className="bg-[#162038] p-2.5 rounded-lg border border-[#213253] text-xs text-gray-300 flex items-start gap-2"
            >
              <span className="w-4 h-4 rounded-full bg-blue-500/20 text-sky-400 flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span>{cue}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
