import React, { useState, useEffect, useRef } from 'react';
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Minus,
  X,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Wind,
  Activity,
  Flame,
  CheckCircle2,
  ChevronUp,
  ChevronDown,
  Clock,
  Sparkles
} from 'lucide-react';

export interface RestTimerStopwatchProps {
  initialSeconds?: number;
  isActive?: boolean;
  defaultMode?: 'countdown' | 'stopwatch';
  onComplete?: () => void;
  onDismiss?: () => void;
  onAddSeconds?: (seconds: number) => void;
  title?: string;
  nextExerciseOrSet?: string;
  soundEnabled?: boolean;
  variant?: 'banner' | 'card' | 'floating' | 'inline';
  className?: string;
}

// Sound synthesizers via Web Audio API (Zero external assets needed)
const playAudioTick = (frequency: number = 880, durationMs: number = 70) => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationMs / 1000);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + durationMs / 1000);
  } catch (e) {
    // AudioContext might be restricted by browser until first interaction
  }
};

const playCompletionFanfare = () => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);

      gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.1);
      osc.stop(ctx.currentTime + idx * 0.1 + 0.35);
    });
  } catch (e) {
    // Ignore audio errors
  }
};

export const RestTimerStopwatch: React.FC<RestTimerStopwatchProps> = ({
  initialSeconds = 90,
  isActive = true,
  defaultMode = 'countdown',
  onComplete,
  onDismiss,
  onAddSeconds,
  title = 'Rest Period',
  nextExerciseOrSet,
  soundEnabled = true,
  variant = 'banner',
  className = ''
}) => {
  const [mode, setMode] = useState<'countdown' | 'stopwatch'>(defaultMode);
  const [isRunning, setIsRunning] = useState<boolean>(isActive);
  const [isExpanded, setIsExpanded] = useState<boolean>(variant === 'card');
  const [isMuted, setIsMuted] = useState<boolean>(!soundEnabled);
  const [activeTab, setActiveTab] = useState<'timer' | 'breathing'>('timer');

  // Countdown timer state
  const [targetDuration, setTargetDuration] = useState<number>(initialSeconds);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(initialSeconds);
  const [overtimeSeconds, setOvertimeSeconds] = useState<number>(0);

  // Stopwatch state
  const [stopwatchMs, setStopwatchMs] = useState<number>(0);
  const [laps, setLaps] = useState<number[]>([]);

  // Breathing pacer state (Inhale 4s -> Hold 2s -> Exhale 4s -> Hold 2s)
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');
  const [breathPercent, setBreathPercent] = useState<number>(0);

  const prevSecondsRef = useRef<number>(initialSeconds);

  // Sync initial seconds if prop changes
  useEffect(() => {
    setTargetDuration(initialSeconds);
    setSecondsRemaining(initialSeconds);
    setOvertimeSeconds(0);
    setIsRunning(isActive);
  }, [initialSeconds, isActive]);

  // Main countdown timer interval
  useEffect(() => {
    let interval: any = null;

    if (mode === 'countdown' && isRunning) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev > 0) {
            const next = prev - 1;
            // Sound tick on final 3 seconds
            if (!isMuted && next <= 3 && next > 0) {
              playAudioTick(800, 60);
            }
            if (next === 0) {
              if (!isMuted) {
                playCompletionFanfare();
              }
              if (onComplete) {
                onComplete();
              }
            }
            return next;
          } else {
            // Overtime count-up
            setOvertimeSeconds((ot) => ot + 1);
            return 0;
          }
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [mode, isRunning, isMuted, onComplete]);

  // Stopwatch interval
  useEffect(() => {
    let interval: any = null;

    if (mode === 'stopwatch' && isRunning) {
      const startTime = Date.now() - stopwatchMs;
      interval = setInterval(() => {
        setStopwatchMs(Date.now() - startTime);
      }, 10);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [mode, isRunning, stopwatchMs]);

  // Breathing cadence cycle
  useEffect(() => {
    if (!isExpanded || activeTab !== 'breathing') return;

    let progress = 0;
    const interval = setInterval(() => {
      progress = (progress + 2) % 100;
      setBreathPercent(progress);

      if (progress < 35) {
        setBreathPhase('Inhale');
      } else if (progress < 50) {
        setBreathPhase('Hold');
      } else if (progress < 85) {
        setBreathPhase('Exhale');
      } else {
        setBreathPhase('Rest');
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isExpanded, activeTab]);

  // Quick adjustment functions
  const addSeconds = (secs: number) => {
    setSecondsRemaining((prev) => {
      const updated = Math.max(0, prev + secs);
      if (updated > targetDuration) {
        setTargetDuration(updated);
      }
      return updated;
    });
    setOvertimeSeconds(0);
    setIsRunning(true);
    if (onAddSeconds) onAddSeconds(secs);
  };

  const setPresetSeconds = (secs: number) => {
    setTargetDuration(secs);
    setSecondsRemaining(secs);
    setOvertimeSeconds(0);
    setIsRunning(true);
  };

  const handleReset = () => {
    if (mode === 'countdown') {
      setSecondsRemaining(targetDuration);
      setOvertimeSeconds(0);
      setIsRunning(false);
    } else {
      setStopwatchMs(0);
      setLaps([]);
      setIsRunning(false);
    }
  };

  const handleLap = () => {
    if (mode === 'stopwatch' && isRunning) {
      setLaps((prev) => [stopwatchMs, ...prev]);
    }
  };

  // Formatters
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatStopwatch = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    const hundredths = Math.floor((ms % 1000) / 10);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${hundredths
      .toString()
      .padStart(2, '0')}`;
  };

  // Progress percentage (0 to 100)
  const percentCompleted =
    targetDuration > 0
      ? Math.min(100, Math.max(0, ((targetDuration - secondsRemaining) / targetDuration) * 100))
      : 100;

  const isCompleted = secondsRemaining === 0;

  // ---------------------------------------------------------------------------
  // COMPACT / DOCKED BANNER VIEW
  // ---------------------------------------------------------------------------
  if (!isExpanded && variant === 'banner') {
    return (
      <div
        className={`w-full bg-[#0a1224] border-b border-blue-500/30 px-3 sm:px-4 py-2 flex items-center justify-between shadow-xl transition-all ${className}`}
      >
        {/* Left: Indicator, Title & Timer */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div
            onClick={() => setIsExpanded(true)}
            className="cursor-pointer flex items-center gap-2 group"
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                isCompleted
                  ? 'bg-amber-500 text-black animate-pulse'
                  : 'bg-blue-600/30 text-sky-400 group-hover:bg-blue-600 group-hover:text-white'
              }`}
            >
              <Timer className="w-4 h-4" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-400">
                  {mode === 'countdown' ? 'REST' : 'STOPWATCH'}
                </span>
                {nextExerciseOrSet && (
                  <span className="text-[10px] text-gray-400 hidden md:inline truncate max-w-[140px]">
                    • Next: {nextExerciseOrSet}
                  </span>
                )}
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-mono text-base sm:text-lg font-bold text-white tracking-tight">
                  {mode === 'countdown'
                    ? formatTime(secondsRemaining)
                    : formatStopwatch(stopwatchMs)}
                </span>
                {isCompleted && overtimeSeconds > 0 && (
                  <span className="text-[10px] font-mono text-amber-400 font-bold animate-pulse">
                    +{formatTime(overtimeSeconds)} OT
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Mini Progress Bar */}
          {mode === 'countdown' && (
            <div className="w-16 sm:w-24 h-1.5 bg-[#162038] rounded-full overflow-hidden hidden sm:block">
              <div
                className={`h-full transition-all duration-300 ${
                  isCompleted ? 'bg-amber-400' : 'bg-gradient-to-r from-blue-500 to-sky-400'
                }`}
                style={{ width: `${percentCompleted}%` }}
              />
            </div>
          )}
        </div>

        {/* Right: Quick Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Play/Pause */}
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="p-1.5 rounded-lg bg-[#162038] hover:bg-[#1f2d4d] text-gray-300 hover:text-white transition-colors"
            title={isRunning ? 'Pause' : 'Resume'}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          {/* Quick +30s */}
          {mode === 'countdown' && (
            <button
              onClick={() => addSeconds(30)}
              className="px-2 py-1 bg-[#162038] hover:bg-[#1f2d4d] text-sky-300 rounded-lg text-[11px] font-mono font-semibold border border-[#213253] transition-colors"
              title="Add 30 seconds"
            >
              +30s
            </button>
          )}

          {/* Mode Switcher */}
          <button
            onClick={() => setMode(mode === 'countdown' ? 'stopwatch' : 'countdown')}
            className="px-2 py-1 bg-[#162038] hover:bg-[#1f2d4d] text-gray-300 hover:text-white rounded-lg text-[10px] font-mono border border-[#213253] hidden xs:inline"
            title="Switch Mode"
          >
            {mode === 'countdown' ? 'Stopwatch' : 'Timer'}
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white transition-colors"
            title={isMuted ? 'Unmute chime' : 'Mute chime'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-gray-500" /> : <Volume2 className="w-3.5 h-3.5 text-sky-400" />}
          </button>

          {/* Expand HUD */}
          <button
            onClick={() => setIsExpanded(true)}
            className="p-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600 text-sky-200 hover:text-white transition-colors"
            title="Expand Rest HUD"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          {/* Skip / Dismiss */}
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] rounded-lg transition-colors"
            >
              Skip
            </button>
          )}
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // FULL EXPANDED RECOVERY CARD / MODAL VIEW
  // ---------------------------------------------------------------------------
  return (
    <div
      className={`rounded-2xl border border-blue-500/40 bg-gradient-to-b from-[#0f172a] via-[#091122] to-[#080d1a] p-4 sm:p-5 shadow-2xl space-y-4 text-gray-100 ${className}`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#213253] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-sky-400">
            <Timer className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-bold font-heading text-white">
                {title}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-sky-300 font-bold uppercase">
                {mode === 'countdown' ? 'Interval Rest' : 'Stopwatch'}
              </span>
            </div>
            {nextExerciseOrSet && (
              <p className="text-xs text-gray-400 mt-0.5">
                Up Next: <span className="text-sky-300 font-semibold">{nextExerciseOrSet}</span>
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Sound Toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-2 rounded-xl border transition-colors ${
              isMuted
                ? 'bg-[#162038] text-gray-500 border-[#213253]'
                : 'bg-blue-600/20 text-sky-400 border-blue-500/40'
            }`}
            title={isMuted ? 'Chime muted' : 'Chime active'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Minimize */}
          {variant === 'banner' && (
            <button
              onClick={() => setIsExpanded(false)}
              className="p-2 rounded-xl bg-[#162038] text-gray-400 hover:text-white border border-[#213253]"
              title="Minimize HUD"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          )}

          {/* Dismiss / Close */}
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="p-2 rounded-xl bg-[#162038] text-gray-400 hover:text-white border border-[#213253]"
              title="Dismiss Rest Timer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Mode & Tool Selector Tabs */}
      <div className="flex bg-[#0a1020] p-1 rounded-xl border border-[#213253] gap-1">
        <button
          onClick={() => {
            setMode('countdown');
            setActiveTab('timer');
          }}
          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
            mode === 'countdown' && activeTab === 'timer'
              ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Timer className="w-3.5 h-3.5" />
          <span>Rest Countdown</span>
        </button>

        <button
          onClick={() => {
            setMode('stopwatch');
            setActiveTab('timer');
          }}
          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
            mode === 'stopwatch' && activeTab === 'timer'
              ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Stopwatch</span>
        </button>

        <button
          onClick={() => setActiveTab('breathing')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === 'breathing'
              ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-500/20'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Wind className="w-3.5 h-3.5" />
          <span>Recovery Breath</span>
        </button>
      </div>

      {/* BODY CONTENT: TAB 1 (TIMER / STOPWATCH) */}
      {activeTab === 'timer' && (
        <div className="space-y-4">
          {/* Big Center Display */}
          <div className="flex flex-col items-center justify-center py-4 relative">
            {mode === 'countdown' ? (
              /* Circular Countdown Ring */
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                  {/* Track Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="transparent"
                    stroke="#162038"
                    strokeWidth="6"
                  />
                  {/* Active Progress Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="transparent"
                    stroke={isCompleted ? '#f59e0b' : '#38bdf8'}
                    strokeWidth="6"
                    strokeDasharray={264}
                    strokeDashoffset={264 - (264 * percentCompleted) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-linear"
                  />
                </svg>

                {/* Inner Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400 mb-0.5">
                    {isCompleted ? 'REST OVER' : 'REMAINING'}
                  </span>
                  <span className="font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {formatTime(secondsRemaining)}
                  </span>
                  {isCompleted && overtimeSeconds > 0 ? (
                    <span className="text-[11px] font-mono text-amber-400 font-bold mt-1 animate-pulse">
                      +{formatTime(overtimeSeconds)} Overtime
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-gray-400 mt-1">
                      {Math.round(percentCompleted)}% Recovered
                    </span>
                  )}
                </div>
              </div>
            ) : (
              /* Stopwatch Display */
              <div className="p-6 rounded-3xl bg-[#0a1224] border border-[#213253] text-center w-full max-w-xs shadow-inner">
                <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400 block mb-1">
                  ELAPSED TIME
                </span>
                <span className="font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {formatStopwatch(stopwatchMs)}
                </span>
                <div className="text-[11px] font-mono text-gray-400 mt-2">
                  Laps recorded: {laps.length}
                </div>
              </div>
            )}
          </div>

          {/* Primary Action Buttons (Play / Pause / Add / Reset) */}
          <div className="flex items-center justify-center gap-3">
            {/* -15s or Lap */}
            {mode === 'countdown' ? (
              <button
                onClick={() => addSeconds(-15)}
                className="px-3 py-2 bg-[#162038] hover:bg-[#1f2d4d] text-gray-300 hover:text-white rounded-xl text-xs font-mono border border-[#213253] transition-colors"
                title="Subtract 15 seconds"
              >
                -15s
              </button>
            ) : (
              <button
                onClick={handleLap}
                disabled={!isRunning}
                className="px-3 py-2 bg-[#162038] hover:bg-[#1f2d4d] disabled:opacity-40 text-sky-300 rounded-xl text-xs font-mono border border-[#213253] transition-colors"
              >
                Lap
              </button>
            )}

            {/* Play / Pause Toggle */}
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/30 flex items-center gap-2 text-sm transition-transform active:scale-95"
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4 fill-white" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>{mode === 'countdown' && isCompleted ? 'Restart' : 'Start'}</span>
                </>
              )}
            </button>

            {/* +30s or Reset */}
            {mode === 'countdown' ? (
              <button
                onClick={() => addSeconds(30)}
                className="px-3 py-2 bg-[#162038] hover:bg-[#1f2d4d] text-sky-300 hover:text-white rounded-xl text-xs font-mono font-bold border border-[#213253] transition-colors"
                title="Add 30 seconds"
              >
                +30s
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="px-3 py-2 bg-[#162038] hover:bg-[#1f2d4d] text-gray-400 hover:text-white rounded-xl text-xs font-mono border border-[#213253] transition-colors"
                title="Reset stopwatch"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}

            {mode === 'countdown' && (
              <button
                onClick={handleReset}
                className="p-2.5 bg-[#162038] hover:bg-[#1f2d4d] text-gray-400 hover:text-white rounded-xl border border-[#213253] transition-colors"
                title="Reset timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Countdown Presets Pill Bar */}
          {mode === 'countdown' && (
            <div className="space-y-1.5 pt-2">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">
                Evidence-Based Recovery Presets:
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 text-xs">
                {[
                  { sec: 30, label: '30s', desc: 'Pump / Iso' },
                  { sec: 60, label: '60s', desc: 'Accessory' },
                  { sec: 90, label: '90s', desc: 'Hypertrophy' },
                  { sec: 120, label: '2 min', desc: 'Strength' },
                  { sec: 180, label: '3 min', desc: 'Compound' },
                  { sec: 300, label: '5 min', desc: 'Max Effort' }
                ].map((preset) => (
                  <button
                    key={preset.sec}
                    onClick={() => setPresetSeconds(preset.sec)}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      targetDuration === preset.sec
                        ? 'bg-blue-600/30 border-blue-400 text-white font-bold ring-1 ring-blue-400'
                        : 'bg-[#162038] border-[#213253] text-gray-300 hover:bg-[#1f2d4d] hover:text-white'
                    }`}
                  >
                    <div className="font-mono font-bold text-xs">{preset.label}</div>
                    <div className="text-[9px] text-gray-400 truncate">{preset.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stopwatch Laps List */}
          {mode === 'stopwatch' && laps.length > 0 && (
            <div className="space-y-1.5 pt-2 max-h-36 overflow-y-auto pr-1">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">
                Split Times ({laps.length}):
              </span>
              <div className="space-y-1">
                {laps.map((lapMs, idx) => (
                  <div
                    key={idx}
                    className="p-2 bg-[#0a1020] rounded-xl border border-[#213253] flex items-center justify-between text-xs font-mono"
                  >
                    <span className="text-gray-400">Lap {laps.length - idx}</span>
                    <span className="text-sky-300 font-bold">{formatStopwatch(lapMs)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* BODY CONTENT: TAB 2 (PARASYMPATHETIC BREATHING PACER) */}
      {activeTab === 'breathing' && (
        <div className="p-4 rounded-2xl bg-[#091122] border border-emerald-500/30 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-emerald-400">
            <Wind className="w-5 h-5 animate-pulse" />
            <h4 className="font-bold text-sm font-heading uppercase text-white">
              Parasympathetic Recovery Breathing
            </h4>
          </div>

          <p className="text-xs text-gray-300 leading-relaxed max-w-md mx-auto">
            Deep diaphragmatic breathing between sets stimulates the vagus nerve, rapidly lowering sympathetic arousal, clearing blood lactate, and replenishing cellular ATP-CP stores.
          </p>

          {/* Animated Circle Breathing Visualizer */}
          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative w-36 h-36 flex items-center justify-center">
              {/* Outer Pulse */}
              <div
                className="absolute rounded-full bg-emerald-500/20 ring-4 ring-emerald-400/30 transition-all duration-300"
                style={{
                  width: `${65 + breathPercent * 0.7}%`,
                  height: `${65 + breathPercent * 0.7}%`
                }}
              />
              {/* Center Core */}
              <div className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-br from-emerald-600 to-teal-700 border border-emerald-300 text-white flex flex-col items-center justify-center shadow-xl">
                <span className="text-xs font-mono font-extrabold uppercase tracking-widest">
                  {breathPhase}
                </span>
                <span className="text-[10px] font-mono opacity-80 mt-0.5">
                  {breathPhase === 'Inhale'
                    ? '4 sec'
                    : breathPhase === 'Hold'
                    ? '2 sec'
                    : breathPhase === 'Exhale'
                    ? '4 sec'
                    : '2 sec'}
                </span>
              </div>
            </div>
          </div>

          <div className="text-[11px] font-mono text-emerald-300">
            Current Rest Countdown Running: <strong>{formatTime(secondsRemaining)}</strong>
          </div>
        </div>
      )}

      {/* Footer Bottom Actions */}
      <div className="pt-2 border-t border-[#213253] flex items-center justify-between gap-3 text-xs">
        <div className="text-gray-400 text-[11px] flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>Optimal rest restores 85–95% muscular ATP</span>
        </div>

        {onDismiss && (
          <button
            onClick={onDismiss}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
          >
            Ready for Next Set
          </button>
        )}
      </div>
    </div>
  );
};
