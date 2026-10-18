import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Gauge,
  Activity,
  Flame,
  Volume2,
  VolumeX,
  Eye,
  Maximize2,
  Layers,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Video,
  Split,
  ExternalLink
} from 'lucide-react';
import { MuscleId, ExerciseMuscleHeatmap } from '../../data/muscleHeatmapData';
import { TECHNIQUE_VIDEOS_MAP } from '../../data/techniqueVideosData';

interface AnimatedWorkoutPictureProps {
  exerciseId: string;
  exerciseName: string;
  category: string;
  primaryMuscleLabel: string;
  jointFocus: string;
  postureCues: string[];
  biomechanicalReadout: {
    targetAngleName: string;
    startAngle: string;
    finishAngle: string;
  };
  heatmapData: ExerciseMuscleHeatmap;
  selectedMuscleId: MuscleId | null;
  onSelectMuscle: (id: MuscleId | null) => void;
  playbackSpeed: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
  progress: number;
  onProgressChange: (val: number) => void;
}

export const AnimatedWorkoutPicture: React.FC<AnimatedWorkoutPictureProps> = ({
  exerciseId,
  exerciseName,
  category,
  primaryMuscleLabel,
  jointFocus,
  postureCues,
  biomechanicalReadout,
  heatmapData,
  selectedMuscleId,
  onSelectMuscle,
  playbackSpeed,
  isPlaying,
  onTogglePlay,
  progress,
  onProgressChange
}) => {
  const [viewAngle, setViewAngle] = useState<'side' | 'front' | '45'>('side');
  const [pictureMode, setPictureMode] = useState<'graphic' | 'motion' | 'split'>('graphic');
  const [showBarPath, setShowBarPath] = useState<boolean>(true);
  const [showJointAngle, setShowJointAngle] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [repCount, setRepCount] = useState<number>(1);
  const prevProgressRef = useRef<number>(progress);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Technique video if available
  const videoData =
    TECHNIQUE_VIDEOS_MAP[exerciseId] ||
    Object.entries(TECHNIQUE_VIDEOS_MAP).find(([k]) =>
      exerciseId.includes(k) || k.includes(exerciseId)
    )?.[1];

  // Detect completed repetition to advance rep counter
  useEffect(() => {
    if (prevProgressRef.current > 0.85 && progress < 0.15) {
      setRepCount((c) => c + 1);
    }
    prevProgressRef.current = progress;
  }, [progress]);

  // Sync video time if motion mode is visible
  useEffect(() => {
    if (videoRef.current && videoData) {
      const targetTime = progress * (videoData.durationSeconds || 12);
      if (Math.abs(videoRef.current.currentTime - targetTime) > 0.3) {
        videoRef.current.currentTime = targetTime;
      }
      if (isPlaying && videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      } else if (!isPlaying && !videoRef.current.paused) {
        videoRef.current.pause();
      }
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [progress, isPlaying, playbackSpeed, videoData]);

  // Determine current phase of repetition
  let phaseName = 'START POSITION';
  let phaseColor = '#38bdf8';
  if (progress > 0.05 && progress <= 0.45) {
    phaseName = 'ECCENTRIC LOWERING';
    phaseColor = '#60a5fa';
  } else if (progress > 0.45 && progress <= 0.55) {
    phaseName = 'PEAK TENSION / DEPTH';
    phaseColor = '#3b82f6';
  } else if (progress > 0.55 && progress <= 0.92) {
    phaseName = 'CONCENTRIC DRIVE';
    phaseColor = '#38bdf8';
  } else if (progress > 0.92) {
    phaseName = 'FULL LOCKOUT';
    phaseColor = '#00f2fe';
  }

  // Current dynamic inflection factor (0 at start/end, 1 at peak inflection/depth)
  // Using smooth sine curve:
  const t = Math.sin(progress * Math.PI);

  // Dynamic tension percentage
  const tensionPercent = Math.round(t * 100);

  // Dynamic Joint Angle calculation for display
  let dynamicAngleText = biomechanicalReadout.startAngle;
  let numericAngle = 180;
  if (exerciseId.includes('squat')) {
    numericAngle = Math.round(180 - t * 102); // 180° down to 78°
    dynamicAngleText = `${numericAngle}° (Knee Flexion)`;
  } else if (exerciseId.includes('bench')) {
    numericAngle = Math.round(180 - t * 105); // 180° down to 75°
    dynamicAngleText = `${numericAngle}° (Elbow Angle)`;
  } else if (exerciseId.includes('deadlift')) {
    numericAngle = Math.round(60 + (1 - t) * 120); // 60° hinge to 180° lockout
    dynamicAngleText = `${numericAngle}° (Hip Hinge)`;
  } else if (exerciseId.includes('press')) {
    numericAngle = Math.round(65 + (1 - t) * 115); // 65° rack to 180° overhead
    dynamicAngleText = `${numericAngle}° (Shoulder Abduction)`;
  } else if (exerciseId.includes('pull')) {
    numericAngle = Math.round(180 - t * 135); // 180° dead hang to 45° chin over bar
    dynamicAngleText = `${numericAngle}° (Elbow Flexion)`;
  } else if (exerciseId.includes('curl')) {
    numericAngle = Math.round(175 - t * 135); // 175° bottom to 40° peak
    dynamicAngleText = `${numericAngle}° (Bicep Flexion)`;
  } else {
    numericAngle = Math.round(180 - t * 90);
    dynamicAngleText = `${numericAngle}° (Joint Flexion)`;
  }

  // Dynamic muscle glow highlight intensity
  const muscleGlowOpacity = 0.35 + t * 0.65;
  const isSelectedMuscleActive = (muscle: string) => {
    if (!selectedMuscleId) return true;
    return selectedMuscleId.toLowerCase().includes(muscle.toLowerCase()) || muscle.toLowerCase().includes(selectedMuscleId.toLowerCase());
  };

  return (
    <div className="relative flex flex-col w-full h-full bg-[#080d1a] overflow-hidden select-none">
      {/* Top Overlay HUD Bar */}
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Left: Live Phase Indicator */}
        <div className="pointer-events-auto flex items-center gap-2 bg-[#0f172a]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#213253] shadow-lg">
          <span
            className="w-2.5 h-2.5 rounded-full animate-pulse shadow-md"
            style={{ backgroundColor: phaseColor }}
          />
          <div className="flex flex-col">
            <span className="text-[9px] font-mono uppercase tracking-wider text-gray-400">
              Kinematic Phase
            </span>
            <span className="text-xs font-bold text-white font-heading">
              {phaseName}
            </span>
          </div>
          <div className="ml-2 pl-2 border-l border-[#213253] flex flex-col">
            <span className="text-[9px] font-mono text-sky-400 font-bold">
              Rep #{repCount}
            </span>
            <span className="text-[10px] text-gray-300 font-mono">
              {Math.round(progress * 100)}%
            </span>
          </div>
        </div>

        {/* Right: Picture Mode & View Controls */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-[#0f172a]/90 backdrop-blur-md p-1 rounded-xl border border-[#213253] shadow-lg text-xs">
          <button
            onClick={() => setPictureMode('graphic')}
            className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
              pictureMode === 'graphic'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                : 'text-gray-400 hover:text-white'
            }`}
            title="Animated Biomechanical Graphic Picture"
          >
            <Activity className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Biomechanical Picture</span>
            <span className="sm:hidden">Graphic</span>
          </button>

          {videoData && (
            <button
              onClick={() => setPictureMode('motion')}
              className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                pictureMode === 'motion'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Animated Motion Video Picture"
            >
              <Video className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Motion Picture</span>
              <span className="sm:hidden">Video</span>
            </button>
          )}

          {videoData && (
            <button
              onClick={() => setPictureMode('split')}
              className={`px-2 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all ${
                pictureMode === 'split'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Dual Split View (Both in Sync)"
            >
              <Split className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Split</span>
            </button>
          )}
        </div>
      </div>

      {/* Angle Presets and Feature Toggles */}
      <div className="absolute top-16 left-3 z-20 flex flex-wrap items-center gap-1.5">
        {(['side', 'front', '45'] as const).map((ang) => (
          <button
            key={ang}
            onClick={() => setViewAngle(ang)}
            className={`px-2.5 py-1 text-[10px] font-mono rounded-lg border transition-all ${
              viewAngle === ang
                ? 'bg-blue-600 text-white font-bold border-blue-400 shadow-md shadow-blue-500/25'
                : 'bg-[#0f172a]/80 text-gray-300 border-[#213253] hover:bg-[#162038]'
            }`}
          >
            {ang === 'side' ? 'SIDE VIEW' : ang === 'front' ? 'FRONT VIEW' : '45° ANGLE'}
          </button>
        ))}

        <button
          onClick={() => setShowBarPath(!showBarPath)}
          className={`px-2 py-1 text-[10px] font-mono rounded-lg border transition-all ${
            showBarPath
              ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
              : 'bg-[#0f172a]/80 text-gray-400 border-[#213253]'
          }`}
          title="Toggle Barbell Path Trajectory Line"
        >
          Path Line
        </button>

        <button
          onClick={() => setShowJointAngle(!showJointAngle)}
          className={`px-2 py-1 text-[10px] font-mono rounded-lg border transition-all ${
            showJointAngle
              ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
              : 'bg-[#0f172a]/80 text-gray-400 border-[#213253]'
          }`}
          title="Toggle Biomechanical Joint Angle Arc"
        >
          Angle Arc
        </button>
      </div>

      {/* Main Viewport Content Area */}
      <div className="relative flex-1 w-full h-full min-h-[440px] flex items-center justify-center p-2 sm:p-4">
        {/* VIEW MODE 1: BIOMECHANICAL GRAPHIC PICTURE */}
        {(pictureMode === 'graphic' || pictureMode === 'split') && (
          <div
            className={`relative flex items-center justify-center w-full h-full max-h-[540px] ${
              pictureMode === 'split' ? 'w-1/2 pr-1' : 'w-full'
            }`}
          >
            <BiomechanicalVectorAthlete
              exerciseId={exerciseId}
              progress={progress}
              viewAngle={viewAngle}
              showBarPath={showBarPath}
              showJointAngle={showJointAngle}
              numericAngle={numericAngle}
              dynamicAngleText={dynamicAngleText}
              t={t}
              muscleGlowOpacity={muscleGlowOpacity}
              selectedMuscleId={selectedMuscleId}
              onSelectMuscle={onSelectMuscle}
            />
          </div>
        )}

        {/* VIEW MODE 2: MOTION PICTURE / YOUTUBE DEMO */}
        {(pictureMode === 'motion' || pictureMode === 'split') && videoData && (
          <div
            className={`relative flex items-center justify-center w-full h-full max-h-[540px] rounded-2xl overflow-hidden border border-[#213253] bg-black ${
              pictureMode === 'split' ? 'w-1/2 pl-1' : 'w-full'
            }`}
          >
            {videoData.youtubeId ? (
              <div className="relative w-full h-full flex flex-col">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${videoData.youtubeId}?rel=0&modestbranding=1`}
                  title={videoData.youtubeTitle || `${exerciseName} Technique Tutorial`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0 flex-1"
                />
                <div className="bg-[#080d1a] px-3 py-1.5 border-t border-[#213253] flex items-center justify-between text-[11px] font-mono text-gray-400">
                  <span className="text-red-400 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    YouTube: {videoData.youtubeChannel || 'Form Tutorial'}
                  </span>
                  <a
                    href={videoData.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-400 hover:underline flex items-center gap-1"
                  >
                    <span>Full Screen on YouTube</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ) : (
              <video
                ref={videoRef}
                src={videoData.videoUrl}
                poster={videoData.thumbnailUrl}
                autoPlay={isPlaying}
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center"
                onClick={onTogglePlay}
              />
            )}

            {/* In-video dynamic angle tag */}
            <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-blue-500/40 text-white text-xs font-mono shadow-xl flex items-center gap-2 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
              <span>{dynamicAngleText}</span>
            </div>
          </div>
        )}

        {/* Floating Real-time Biomechanical Gauge */}
        <div className="absolute bottom-3 right-3 z-20 bg-[#0f172a]/95 backdrop-blur-md p-3 rounded-2xl border border-[#213253] text-xs font-mono shadow-2xl text-right space-y-1.5 pointer-events-none">
          <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
            {biomechanicalReadout.targetAngleName}
          </div>
          <div className="text-sky-400 font-bold text-base font-mono">
            {dynamicAngleText}
          </div>
          <div className="flex items-center justify-end gap-1.5 text-[10px] text-gray-400 pt-1 border-t border-[#1e2e4a]">
            <Gauge className="w-3.5 h-3.5 text-sky-400" />
            <span>Muscle Tension:</span>
            <span className="text-white font-bold">{tensionPercent}%</span>
          </div>
          <div className="w-28 h-1.5 bg-[#162038] rounded-full overflow-hidden ml-auto">
            <div
              className="h-full bg-gradient-to-r from-blue-600 via-sky-400 to-cyan-300 transition-all duration-75"
              style={{ width: `${tensionPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* BIOMECHANICAL VECTOR ATHLETE COMPONENT                                      */
/* Generates smooth 60fps anatomical animated vector illustration             */
/* -------------------------------------------------------------------------- */

interface BiomechanicalVectorAthleteProps {
  exerciseId: string;
  progress: number; // 0 to 1
  viewAngle: 'side' | 'front' | '45';
  showBarPath: boolean;
  showJointAngle: boolean;
  numericAngle: number;
  dynamicAngleText: string;
  t: number; // 0 to 1 inflection
  muscleGlowOpacity: number;
  selectedMuscleId: MuscleId | null;
  onSelectMuscle: (id: MuscleId | null) => void;
}

const BiomechanicalVectorAthlete: React.FC<BiomechanicalVectorAthleteProps> = ({
  exerciseId,
  progress,
  viewAngle,
  showBarPath,
  showJointAngle,
  numericAngle,
  dynamicAngleText,
  t,
  muscleGlowOpacity,
  selectedMuscleId,
  onSelectMuscle
}) => {
  // SVG dimensions
  const width = 600;
  const height = 480;

  // Determine exercise model
  const isSquat = exerciseId.includes('squat');
  const isBench = exerciseId.includes('bench');
  const isDeadlift = exerciseId.includes('deadlift');
  const isPress = exerciseId.includes('press');
  const isPullUp = exerciseId.includes('pull');
  const isCurl = exerciseId.includes('curl');
  const isLunge = exerciseId.includes('lunge') || exerciseId.includes('split');
  const isPushup = exerciseId.includes('pushup') || exerciseId.includes('push-up');

  // Athletic color scheme (Sapphire & Electric Blue Theme)
  const skinColor = '#d4a373';
  const skinShadow = '#b88656';
  const shirtColor = '#0f172a';
  const shirtAccent = '#3b82f6';
  const shortsColor = '#1e293b';
  const shoeColor = '#3b82f6';
  const barbellBarColor = '#94a3b8';
  const plateColor = '#1d4ed8'; // Olympic blue plate
  const glowCyan = '#38bdf8';
  const glowHighlight = '#00f2fe';

  // -------------------------------------------------------------------------
  // SQUAT KINEMATICS
  // -------------------------------------------------------------------------
  if (isSquat) {
    // Ground level: y = 430
    const footX = 300;
    const footY = 420;

    // Side view kinematics
    // Stance: foot at (300, 420). Knee moves forward slightly with depth. Hip hinges back and down.
    const kneeX = 300 + (viewAngle === 'side' ? t * 25 : t * 10);
    const kneeY = 320 + t * 45;
    const hipX = 300 - (viewAngle === 'side' ? t * 45 : 0);
    const hipY = 230 + t * 95; // Hip drops from 230 to 325 (below knee level for deep squat)
    const shoulderX = hipX + (viewAngle === 'side' ? 22 + t * 35 : 0);
    const shoulderY = hipY - 95;
    const headX = shoulderX + (viewAngle === 'side' ? 12 : 0);
    const headY = shoulderY - 32;

    // Barbell sits on upper traps (shoulderX, shoulderY)
    const barX = shoulderX;
    const barY = shoulderY + 4;

    // Elbows under bar
    const elbowX = barX - (viewAngle === 'side' ? 15 : 45);
    const elbowY = barY + 38;

    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full max-h-full drop-shadow-2xl"
      >
        <defs>
          <linearGradient id="gymFloor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0b1329" />
            <stop offset="100%" stopColor="#040711" />
          </linearGradient>
          <linearGradient id="muscleGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity={muscleGlowOpacity} />
            <stop offset="100%" stopColor="#2563eb" stopOpacity={muscleGlowOpacity * 0.7} />
          </linearGradient>
          <filter id="neonBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Gym Platform Floor */}
        <line x1="60" y1="422" x2="540" y2="422" stroke="#213253" strokeWidth="3" />
        <line x1="80" y1="426" x2="520" y2="426" stroke="#162038" strokeWidth="6" />

        {/* Bar Path Trace Line (Vertical Guide) */}
        {showBarPath && (
          <g>
            <line
              x1={barX}
              y1="120"
              x2={barX}
              y2="420"
              stroke="#38bdf8"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.45"
            />
            {/* Active Bar Tracker Dot */}
            <circle
              cx={barX}
              cy={barY}
              r="6"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
              className="animate-ping"
            />
            <text
              x={barX + 15}
              y="140"
              fill="#38bdf8"
              fontSize="10"
              fontFamily="monospace"
              opacity="0.8"
            >
              BAR PATH: VERTICAL MIDFOOT
            </text>
          </g>
        )}

        {/* Parallel Depth Indicator Line */}
        {t > 0.8 && (
          <g>
            <line
              x1="180"
              y1={kneeY}
              x2="420"
              y2={kneeY}
              stroke="#34d399"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
            <text
              x="360"
              y={kneeY - 6}
              fill="#34d399"
              fontSize="10"
              fontFamily="monospace"
              fontWeight="bold"
            >
              ✓ DEPTH: BELOW PARALLEL
            </text>
          </g>
        )}

        {/* Athletic Human Figure Body Parts */}
        {/* Rear Leg (for depth) */}
        <g opacity="0.6">
          <line
            x1={hipX - 10}
            y1={hipY}
            x2={kneeX - 10}
            y2={kneeY}
            stroke={skinShadow}
            strokeWidth="20"
            strokeLinecap="round"
          />
          <line
            x1={kneeX - 10}
            y1={kneeY}
            x2={footX - 10}
            y2={footY}
            stroke={skinShadow}
            strokeWidth="16"
            strokeLinecap="round"
          />
          {/* Rear Shoe */}
          <ellipse cx={footX - 5} cy={footY + 2} rx="16" ry="6" fill="#1e293b" />
        </g>

        {/* Main Front Leg Bones & Muscle Masses */}
        {/* Thigh / Quadriceps & Hamstrings */}
        <line
          x1={hipX}
          y1={hipY}
          x2={kneeX}
          y2={kneeY}
          stroke={skinColor}
          strokeWidth="26"
          strokeLinecap="round"
        />

        {/* Dynamic Quadriceps Muscle Contraction Glow */}
        <path
          d={`M ${hipX} ${hipY - 10} Q ${(hipX + kneeX) / 2 + 15} ${(hipY + kneeY) / 2 - 10} ${kneeX} ${kneeY - 8}`}
          stroke={glowHighlight}
          strokeWidth="12"
          strokeLinecap="round"
          opacity={muscleGlowOpacity}
          filter="url(#neonBlur)"
          className="cursor-pointer"
          onClick={() => onSelectMuscle('quads')}
        />

        {/* Gluteus Maximus Contraction Glow */}
        <circle
          cx={hipX - 12}
          cy={hipY + 5}
          r={22}
          fill="url(#muscleGlow)"
          filter="url(#neonBlur)"
          className="cursor-pointer"
          onClick={() => onSelectMuscle('glutes')}
        />

        {/* Lower Leg / Calf */}
        <line
          x1={kneeX}
          y1={kneeY}
          x2={footX}
          y2={footY}
          stroke={skinColor}
          strokeWidth="18"
          strokeLinecap="round"
        />

        {/* Knee Sleeve */}
        <rect
          x={kneeX - 12}
          y={kneeY - 15}
          width="24"
          height="30"
          rx="6"
          fill="#162038"
          stroke="#3b82f6"
          strokeWidth="1.5"
        />

        {/* Athletic Sneaker */}
        <path
          d={`M ${footX - 12} ${footY} L ${footX + 18} ${footY} L ${footX + 22} ${footY + 8} L ${footX - 14} ${footY + 8} Z`}
          fill={shoeColor}
          stroke="#1e293b"
          strokeWidth="1"
        />

        {/* Hips & Gym Shorts */}
        <ellipse
          cx={hipX}
          cy={hipY}
          rx="22"
          ry="16"
          fill={shortsColor}
          stroke="#3b82f6"
          strokeWidth="1.5"
        />

        {/* Torso & Ribcage with Gym Tank Top */}
        <line
          x1={hipX}
          y1={hipY}
          x2={shoulderX}
          y2={shoulderY}
          stroke={shirtColor}
          strokeWidth="30"
          strokeLinecap="round"
        />
        {/* Core & Abdominal Wall Brace Glow */}
        <line
          x1={hipX + 8}
          y1={hipY - 10}
          x2={shoulderX + 6}
          y2={shoulderY + 12}
          stroke={glowCyan}
          strokeWidth="8"
          opacity={muscleGlowOpacity * 0.8}
          filter="url(#neonBlur)"
        />

        {/* Head & Neck */}
        <line
          x1={shoulderX}
          y1={shoulderY}
          x2={headX}
          y2={headY + 14}
          stroke={skinColor}
          strokeWidth="14"
        />
        <circle cx={headX} cy={headY} r="16" fill={skinColor} />
        {/* Athletic Hair & Headband */}
        <path
          d={`M ${headX - 16} ${headY - 4} Q ${headX} ${headY - 20} ${headX + 16} ${headY - 4}`}
          fill="#1e293b"
        />
        <rect
          x={headX - 15}
          y={headY - 6}
          width="30"
          height="5"
          rx="2"
          fill="#3b82f6"
        />

        {/* Arms holding barbell */}
        <line
          x1={shoulderX}
          y1={shoulderY}
          x2={elbowX}
          y2={elbowY}
          stroke={skinColor}
          strokeWidth="14"
          strokeLinecap="round"
        />
        <line
          x1={elbowX}
          y1={elbowY}
          x2={barX}
          y2={barY}
          stroke={skinColor}
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Barbell Olympic Bar & Weight Plates */}
        <line
          x1={barX - 110}
          y1={barY}
          x2={barX + 110}
          y2={barY}
          stroke={barbellBarColor}
          strokeWidth="6"
        />
        {/* Olympic 45lb / 20kg Bumper Plates */}
        <rect
          x={barX - 85}
          y={barY - 45}
          width="12"
          height="90"
          rx="3"
          fill={plateColor}
          stroke="#60a5fa"
          strokeWidth="1.5"
        />
        <rect
          x={barX + 73}
          y={barY - 45}
          width="12"
          height="90"
          rx="3"
          fill={plateColor}
          stroke="#60a5fa"
          strokeWidth="1.5"
        />
        {/* Barbell Collars */}
        <rect x={barX - 71} y={barY - 10} width="6" height="20" rx="1" fill="#38bdf8" />
        <rect x={barX + 65} y={barY - 10} width="6" height="20" rx="1" fill="#38bdf8" />

        {/* Real-time Joint Angle Arc at the Knee */}
        {showJointAngle && (
          <g>
            <path
              d={`M ${kneeX - 18} ${kneeY - 15} A 25 25 0 0 1 ${kneeX + 10} ${kneeY + 20}`}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
              strokeDasharray="2 2"
            />
            <rect
              x={kneeX + 22}
              y={kneeY - 10}
              width="62"
              height="20"
              rx="4"
              fill="#0f172a"
              stroke="#3b82f6"
              strokeWidth="1"
            />
            <text
              x={kneeX + 53}
              y={kneeY + 4}
              fill="#38bdf8"
              fontSize="11"
              fontFamily="monospace"
              fontWeight="bold"
              textAnchor="middle"
            >
              {numericAngle}°
            </text>
          </g>
        )}
      </svg>
    );
  }

  // -------------------------------------------------------------------------
  // BENCH PRESS KINEMATICS
  // -------------------------------------------------------------------------
  if (isBench) {
    const benchY = 320;
    const athleteHeadX = 200;
    const athleteHipX = 350;
    const chestX = 265;
    const chestY = benchY - 24;

    // Barbell descends to touch chest at peak t
    const barStartY = 160;
    const barFinishY = chestY - 10;
    const barY = barStartY + t * (barFinishY - barStartY);
    const barX = chestX;

    // Elbow tuck angle (flaring smoothly as bar descends)
    const elbowX = chestX + t * 25;
    const elbowY = barY + 45;

    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full max-h-full drop-shadow-2xl"
      >
        <defs>
          <filter id="neonBlurBench">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Gym Floor */}
        <line x1="60" y1="422" x2="540" y2="422" stroke="#213253" strokeWidth="3" />

        {/* Flat Bench Structure */}
        {/* Bench Legs */}
        <rect x="210" y="325" width="12" height="97" rx="2" fill="#1e293b" />
        <rect x="360" y="325" width="12" height="97" rx="2" fill="#1e293b" />
        {/* Bench Padding */}
        <rect
          x="180"
          y="315"
          width="210"
          height="16"
          rx="4"
          fill="#0f172a"
          stroke="#3b82f6"
          strokeWidth="1.5"
        />

        {/* Bar Path Vertical Guideline */}
        {showBarPath && (
          <line
            x1={chestX}
            y1="120"
            x2={chestX}
            y2={chestY}
            stroke="#38bdf8"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.45"
          />
        )}

        {/* Athlete Torso Lie Flat with Slight Arch */}
        <path
          d={`M ${athleteHeadX} ${benchY - 14} Q ${chestX} ${chestY - 8} ${athleteHipX} ${benchY - 14}`}
          stroke={shirtColor}
          strokeWidth="32"
          strokeLinecap="round"
        />

        {/* Pectoralis Major Dynamic Contraction Glow */}
        <ellipse
          cx={chestX - 5}
          cy={chestY}
          rx="22"
          ry="14"
          fill={glowCyan}
          opacity={muscleGlowOpacity}
          filter="url(#neonBlurBench)"
          className="cursor-pointer"
          onClick={() => onSelectMuscle('chest')}
        />

        {/* Head on Bench */}
        <circle cx={athleteHeadX} cy={benchY - 16} r="15" fill={skinColor} />

        {/* Legs planted firmly on floor for leg drive */}
        <line
          x1={athleteHipX}
          y1={benchY - 14}
          x2={athleteHipX + 45}
          y2={370}
          stroke={skinColor}
          strokeWidth="18"
          strokeLinecap="round"
        />
        <line
          x1={athleteHipX + 45}
          y1={370}
          x2={athleteHipX + 40}
          y2={420}
          stroke={skinColor}
          strokeWidth="16"
          strokeLinecap="round"
        />
        {/* Planted Gym Sneaker */}
        <ellipse cx={athleteHipX + 45} cy={422} rx="16" ry="6" fill={shoeColor} />

        {/* Arms pressing Barbell */}
        {/* Upper Arm / Triceps */}
        <line
          x1={chestX}
          y1={chestY}
          x2={elbowX}
          y2={elbowY}
          stroke={skinColor}
          strokeWidth="16"
          strokeLinecap="round"
        />
        {/* Triceps Contraction Glow */}
        <line
          x1={chestX}
          y1={chestY}
          x2={elbowX}
          y2={elbowY}
          stroke={glowHighlight}
          strokeWidth="8"
          opacity={muscleGlowOpacity * 0.9}
          filter="url(#neonBlurBench)"
          className="cursor-pointer"
          onClick={() => onSelectMuscle('triceps')}
        />
        {/* Forearm */}
        <line
          x1={elbowX}
          y1={elbowY}
          x2={barX}
          y2={barY}
          stroke={skinColor}
          strokeWidth="14"
          strokeLinecap="round"
        />

        {/* Olympic Barbell */}
        <line
          x1={barX - 120}
          y1={barY}
          x2={barX + 120}
          y2={barY}
          stroke={barbellBarColor}
          strokeWidth="7"
        />
        {/* Bumper Plates */}
        <rect
          x={barX - 95}
          y={barY - 45}
          width="14"
          height="90"
          rx="3"
          fill={plateColor}
          stroke="#60a5fa"
          strokeWidth="1.5"
        />
        <rect
          x={barX + 81}
          y={barY - 45}
          width="14"
          height="90"
          rx="3"
          fill={plateColor}
          stroke="#60a5fa"
          strokeWidth="1.5"
        />

        {/* Joint Angle Arc at Elbow */}
        {showJointAngle && (
          <g>
            <rect
              x={elbowX + 14}
              y={elbowY - 12}
              width="60"
              height="20"
              rx="4"
              fill="#0f172a"
              stroke="#3b82f6"
              strokeWidth="1"
            />
            <text
              x={elbowX + 44}
              y={elbowY + 2}
              fill="#38bdf8"
              fontSize="11"
              fontFamily="monospace"
              fontWeight="bold"
              textAnchor="middle"
            >
              {numericAngle}°
            </text>
          </g>
        )}
      </svg>
    );
  }

  // -------------------------------------------------------------------------
  // DEADLIFT KINEMATICS
  // -------------------------------------------------------------------------
  if (isDeadlift) {
    // Floor: y = 420
    const footX = 300;
    const footY = 420;

    // t=1 is loaded start off floor (hip hinge); t=0 is full erect lockout
    const hinge = t; // 0 = tall, 1 = bent over floor
    const kneeX = 300 - hinge * 15;
    const kneeY = 330 + hinge * 20;
    const hipX = 260 - hinge * 45;
    const hipY = 250 + hinge * 45;
    const shoulderX = 310 - hinge * 20;
    const shoulderY = 160 + hinge * 90;
    const headX = shoulderX + 15;
    const headY = shoulderY - 25;

    // Barbell moves straight vertically along shins
    const barX = 310;
    const barY = 240 + hinge * 135; // from hip height down to floor plates

    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full max-h-full drop-shadow-2xl"
      >
        <defs>
          <filter id="neonBlurDeadlift">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <line x1="60" y1="422" x2="540" y2="422" stroke="#213253" strokeWidth="3" />

        {/* Bar path guide line */}
        {showBarPath && (
          <line
            x1={barX}
            y1="180"
            x2={barX}
            y2="420"
            stroke="#38bdf8"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.45"
          />
        )}

        {/* Legs & Posterior Chain */}
        <line
          x1={hipX}
          y1={hipY}
          x2={kneeX}
          y2={kneeY}
          stroke={skinColor}
          strokeWidth="24"
          strokeLinecap="round"
        />
        {/* Hamstring Activation Glow */}
        <line
          x1={hipX - 6}
          y1={hipY + 5}
          x2={kneeX - 6}
          y2={kneeY - 5}
          stroke={glowHighlight}
          strokeWidth="10"
          opacity={muscleGlowOpacity}
          filter="url(#neonBlurDeadlift)"
          className="cursor-pointer"
          onClick={() => onSelectMuscle('hamstrings')}
        />

        <line
          x1={kneeX}
          y1={kneeY}
          x2={footX}
          y2={footY}
          stroke={skinColor}
          strokeWidth="18"
          strokeLinecap="round"
        />
        <ellipse cx={footX} cy={footY + 2} rx="16" ry="6" fill={shoeColor} />

        {/* Gluteus Maximus Glow */}
        <circle
          cx={hipX - 10}
          cy={hipY}
          r={20}
          fill={glowCyan}
          opacity={muscleGlowOpacity}
          filter="url(#neonBlurDeadlift)"
          className="cursor-pointer"
          onClick={() => onSelectMuscle('glutes')}
        />

        {/* Torso & Erector Spinae */}
        <line
          x1={hipX}
          y1={hipY}
          x2={shoulderX}
          y2={shoulderY}
          stroke={shirtColor}
          strokeWidth="28"
          strokeLinecap="round"
        />
        {/* Spinal Erector & Lat Pack Glow */}
        <line
          x1={hipX + 2}
          y1={hipY - 4}
          x2={shoulderX - 2}
          y2={shoulderY + 6}
          stroke={glowCyan}
          strokeWidth="8"
          opacity={muscleGlowOpacity * 0.9}
          filter="url(#neonBlurDeadlift)"
          className="cursor-pointer"
          onClick={() => onSelectMuscle('erectors')}
        />

        {/* Head */}
        <circle cx={headX} cy={headY} r="15" fill={skinColor} />

        {/* Long Straight Arms (Hook or Double Overhand Grip) */}
        <line
          x1={shoulderX}
          y1={shoulderY}
          x2={barX}
          y2={barY}
          stroke={skinColor}
          strokeWidth="14"
          strokeLinecap="round"
        />

        {/* Barbell & Plates */}
        <line
          x1={barX - 100}
          y1={barY}
          x2={barX + 100}
          y2={barY}
          stroke={barbellBarColor}
          strokeWidth="6"
        />
        <rect
          x={barX - 75}
          y={barY - 45}
          width="14"
          height="90"
          rx="3"
          fill={plateColor}
          stroke="#60a5fa"
          strokeWidth="1.5"
        />
        <rect
          x={barX + 61}
          y={barY - 45}
          width="14"
          height="90"
          rx="3"
          fill={plateColor}
          stroke="#60a5fa"
          strokeWidth="1.5"
        />

        {/* Hip Hinge Angle Arc */}
        {showJointAngle && (
          <g>
            <rect
              x={hipX - 70}
              y={hipY - 10}
              width="60"
              height="20"
              rx="4"
              fill="#0f172a"
              stroke="#3b82f6"
              strokeWidth="1"
            />
            <text
              x={hipX - 40}
              y={hipY + 4}
              fill="#38bdf8"
              fontSize="11"
              fontFamily="monospace"
              fontWeight="bold"
              textAnchor="middle"
            >
              {numericAngle}°
            </text>
          </g>
        )}
      </svg>
    );
  }

  // -------------------------------------------------------------------------
  // OVERHEAD PRESS KINEMATICS
  // -------------------------------------------------------------------------
  if (isPress) {
    const footX = 300;
    const footY = 420;
    const hipX = 300;
    const hipY = 270;
    const shoulderX = 300;
    const shoulderY = 175;
    const headX = 300 - (t < 0.5 ? t * 15 : (1 - t) * 15); // head pushes back slightly to clear bar path
    const headY = 140;

    // Barbell moves vertically from front rack (175) to full overhead lockout (85)
    const barY = 175 - t * 90;
    const barX = 300;

    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full max-h-full drop-shadow-2xl"
      >
        <line x1="60" y1="422" x2="540" y2="422" stroke="#213253" strokeWidth="3" />

        {/* Legs planted tall */}
        <line x1={hipX} y1={hipY} x2={footX} y2={footY} stroke={skinColor} strokeWidth="22" />
        <ellipse cx={footX} cy={footY + 2} rx="16" ry="6" fill={shoeColor} />

        {/* Torso & Core */}
        <line x1={hipX} y1={hipY} x2={shoulderX} y2={shoulderY} stroke={shirtColor} strokeWidth="28" strokeLinecap="round" />

        {/* Head */}
        <circle cx={headX} cy={headY} r="15" fill={skinColor} />

        {/* Deltoids Contraction Flare */}
        <circle
          cx={shoulderX}
          cy={shoulderY}
          r="18"
          fill={glowCyan}
          opacity={muscleGlowOpacity}
          filter="url(#neonBlur)"
          className="cursor-pointer"
          onClick={() => onSelectMuscle('deltoids')}
        />

        {/* Arms pressing up overhead */}
        <line x1={shoulderX} y1={shoulderY} x2={barX} y2={barY} stroke={skinColor} strokeWidth="14" strokeLinecap="round" />
        <line x1={shoulderX} y1={shoulderY} x2={barX} y2={barY} stroke={glowHighlight} strokeWidth="6" opacity={muscleGlowOpacity * 0.8} />

        {/* Barbell */}
        <line x1={barX - 110} y1={barY} x2={barX + 110} y2={barY} stroke={barbellBarColor} strokeWidth="6" />
        <rect x={barX - 85} y={barY - 40} width="12" height="80" rx="3" fill={plateColor} stroke="#60a5fa" strokeWidth="1.5" />
        <rect x={barX + 73} y={barY - 40} width="12" height="80" rx="3" fill={plateColor} stroke="#60a5fa" strokeWidth="1.5" />

        {/* Angle readout */}
        {showJointAngle && (
          <g>
            <rect x={shoulderX + 25} y={shoulderY - 10} width="60" height="20" rx="4" fill="#0f172a" stroke="#3b82f6" strokeWidth="1" />
            <text x={shoulderX + 55} y={shoulderY + 4} fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              {numericAngle}°
            </text>
          </g>
        )}
      </svg>
    );
  }

  // -------------------------------------------------------------------------
  // PULL-UP KINEMATICS
  // -------------------------------------------------------------------------
  if (isPullUp) {
    const barX = 300;
    const barY = 70;

    // Athlete body pulls up toward bar
    // t=0 is dead hang; t=1 is chin over bar
    const pullY = t * 115;
    const headX = 300;
    const headY = 175 - pullY;
    const shoulderX = 300;
    const shoulderY = 210 - pullY;
    const hipX = 300;
    const hipY = 320 - pullY;
    const kneeX = 305;
    const kneeY = 385 - pullY;
    const footX = 310;
    const footY = 430 - pullY;

    // Elbows drive down and back
    const elbowX = 265;
    const elbowY = 150 - pullY + t * 45;

    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full max-h-full drop-shadow-2xl"
      >
        {/* Pull-Up Rig Rigging */}
        <line x1="80" y1="50" x2="80" y2="440" stroke="#1e293b" strokeWidth="8" />
        <line x1="520" y1="50" x2="520" y2="440" stroke="#1e293b" strokeWidth="8" />
        <line x1="70" y1={barY} x2="530" y2={barY} stroke={barbellBarColor} strokeWidth="8" />

        {/* Hands on Bar */}
        <circle cx={250} cy={barY} r="8" fill="#3b82f6" />
        <circle cx={350} cy={barY} r="8" fill="#3b82f6" />

        {/* Latissimus Dorsi Muscle Flare Glow */}
        <ellipse
          cx={shoulderX}
          cy={shoulderY + 25}
          rx="32"
          ry="40"
          fill={glowCyan}
          opacity={muscleGlowOpacity}
          filter="url(#neonBlur)"
          className="cursor-pointer"
          onClick={() => onSelectMuscle('lats')}
        />

        {/* Torso */}
        <line x1={hipX} y1={hipY} x2={shoulderX} y2={shoulderY} stroke={shirtColor} strokeWidth="30" strokeLinecap="round" />

        {/* Head */}
        <circle cx={headX} cy={headY} r="15" fill={skinColor} />

        {/* Arms pulling up */}
        <line x1={250} y1={barY} x2={elbowX} y2={elbowY} stroke={skinColor} strokeWidth="14" strokeLinecap="round" />
        <line x1={elbowX} y1={elbowY} x2={shoulderX - 15} y2={shoulderY} stroke={skinColor} strokeWidth="14" strokeLinecap="round" />
        <line x1={350} y1={barY} x2={600 - elbowX} y2={elbowY} stroke={skinColor} strokeWidth="14" strokeLinecap="round" />
        <line x1={600 - elbowX} y1={elbowY} x2={shoulderX + 15} y2={shoulderY} stroke={skinColor} strokeWidth="14" strokeLinecap="round" />

        {/* Legs crossed in hollow rock */}
        <line x1={hipX} y1={hipY} x2={kneeX} y2={kneeY} stroke={skinColor} strokeWidth="18" strokeLinecap="round" />
        <line x1={kneeX} y1={kneeY} x2={footX} y2={footY} stroke={skinColor} strokeWidth="16" strokeLinecap="round" />
        <ellipse cx={footX} cy={footY} rx="12" ry="6" fill={shoeColor} />

        {/* Chin Over Bar Indicator */}
        {t > 0.85 && (
          <g>
            <line x1="220" y1={barY} x2="380" y2={barY} stroke="#34d399" strokeWidth="2" strokeDasharray="3 3" />
            <text x="300" y={barY - 14} fill="#34d399" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              ✓ CHIN CLEARS BAR (PEAK LAT CONTRACTION)
            </text>
          </g>
        )}
      </svg>
    );
  }

  // -------------------------------------------------------------------------
  // BICEP CURL KINEMATICS
  // -------------------------------------------------------------------------
  if (isCurl) {
    const footX = 300;
    const footY = 420;
    const hipX = 300;
    const hipY = 270;
    const shoulderX = 300;
    const shoulderY = 175;
    const headX = 300;
    const headY = 140;

    // Fixed elbow at side:
    const elbowX = 295;
    const elbowY = 230;

    // Forearm hinges up from waist (y=300) to upper chest (y=180)
    const wristX = elbowX + 10 + (1 - t) * 5 + t * 25;
    const wristY = 305 - t * 115;
    const curlAngle = Math.round(170 - t * 130);

    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full max-h-full drop-shadow-2xl"
      >
        <line x1="60" y1="422" x2="540" y2="422" stroke="#213253" strokeWidth="3" />

        {/* Legs & Torso */}
        <line x1={hipX} y1={hipY} x2={footX} y2={footY} stroke={skinColor} strokeWidth="22" />
        <ellipse cx={footX} cy={footY + 2} rx="16" ry="6" fill={shoeColor} />
        <line x1={hipX} y1={hipY} x2={shoulderX} y2={shoulderY} stroke={shirtColor} strokeWidth="28" strokeLinecap="round" />
        <circle cx={headX} cy={headY} r="15" fill={skinColor} />

        {/* Upper Arm pinned at side */}
        <line x1={shoulderX} y1={shoulderY} x2={elbowX} y2={elbowY} stroke={skinColor} strokeWidth="16" strokeLinecap="round" />

        {/* Biceps Brachii Contraction Peak Ball Glow */}
        <ellipse
          cx={elbowX + 4}
          cy={elbowY - 24}
          rx={12 + t * 6}
          ry={14 + t * 8}
          fill={glowCyan}
          opacity={muscleGlowOpacity}
          filter="url(#neonBlur)"
          className="cursor-pointer"
          onClick={() => onSelectMuscle('biceps')}
        />

        {/* Forearm pivoting around elbow */}
        <line x1={elbowX} y1={elbowY} x2={wristX} y2={wristY} stroke={skinColor} strokeWidth="14" strokeLinecap="round" />

        {/* Barbell held in hand */}
        <line x1={wristX - 70} y1={wristY} x2={wristX + 70} y2={wristY} stroke={barbellBarColor} strokeWidth="6" />
        <circle cx={wristX - 60} cy={wristY} r="18" fill={plateColor} stroke="#60a5fa" strokeWidth="1.5" />
        <circle cx={wristX + 60} cy={wristY} r="18" fill={plateColor} stroke="#60a5fa" strokeWidth="1.5" />

        {/* Elbow Angle Readout */}
        {showJointAngle && (
          <g>
            <rect x={elbowX - 70} y={elbowY - 10} width="60" height="20" rx="4" fill="#0f172a" stroke="#3b82f6" strokeWidth="1" />
            <text x={elbowX - 40} y={elbowY + 4} fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              {curlAngle}°
            </text>
          </g>
        )}
      </svg>
    );
  }

  // -------------------------------------------------------------------------
  // GENERAL FALLBACK / LUNGES / PUSHUPS / LATERAL RAISES
  // -------------------------------------------------------------------------
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-full max-h-full drop-shadow-2xl"
    >
      <line x1="60" y1="422" x2="540" y2="422" stroke="#213253" strokeWidth="3" />

      {/* Dynamic athletic figure */}
      <circle cx={300} cy={140 - t * 20} r="18" fill={skinColor} />
      <line x1="300" y1={170 - t * 20} x2="300" y2={270 - t * 20} stroke={shirtColor} strokeWidth="32" strokeLinecap="round" />

      {/* Primary Target Muscle Glow */}
      <circle
        cx="300"
        cy={200 - t * 20}
        r="28"
        fill={glowCyan}
        opacity={muscleGlowOpacity}
        filter="url(#neonBlur)"
      />

      {/* Arms */}
      <line x1="300" y1={175 - t * 20} x2={230 - t * 30} y2={240 - t * 30} stroke={skinColor} strokeWidth="16" strokeLinecap="round" />
      <line x1="300" y1={175 - t * 20} x2={370 + t * 30} y2={240 - t * 30} stroke={skinColor} strokeWidth="16" strokeLinecap="round" />

      {/* Legs */}
      <line x1="300" y1={270 - t * 20} x2={270 - t * 20} y2={350 + t * 15} stroke={skinColor} strokeWidth="20" strokeLinecap="round" />
      <line x1={270 - t * 20} y1={350 + t * 15} x2="260" y2="420" stroke={skinColor} strokeWidth="18" strokeLinecap="round" />
      <ellipse cx="260" cy="422" rx="16" ry="6" fill={shoeColor} />

      <line x1="300" y1={270 - t * 20} x2={330 + t * 20} y2={350 + t * 15} stroke={skinColor} strokeWidth="20" strokeLinecap="round" />
      <line x1={330 + t * 20} y1={350 + t * 15} x2="340" y2="420" stroke={skinColor} strokeWidth="18" strokeLinecap="round" />
      <ellipse cx="340" cy="422" rx="16" ry="6" fill={shoeColor} />

      <text
        x="300"
        y="80"
        fill="#38bdf8"
        fontSize="14"
        fontFamily="sans-serif"
        fontWeight="bold"
        textAnchor="middle"
      >
        {dynamicAngleText}
      </text>
    </svg>
  );
};
