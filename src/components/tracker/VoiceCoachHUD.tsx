import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  HelpCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Command,
  Radio,
  X
} from 'lucide-react';
import { voiceCommandCoach, VoiceCommandHandler } from '../../utils/voiceCommandCoach';

interface VoiceCoachHUDProps {
  onAction: VoiceCommandHandler;
  currentExerciseName: string;
  currentSetIndex: number;
  totalSets: number;
  targetReps: number;
  currentWeight: number;
  weightUnit: string;
  isRestActive: boolean;
  restSeconds: number;
}

export const VoiceCoachHUD: React.FC<VoiceCoachHUDProps> = ({
  onAction,
  currentExerciseName,
  currentSetIndex,
  totalSets,
  targetReps,
  currentWeight,
  weightUnit,
  isRestActive,
  restSeconds
}) => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [lastAction, setLastAction] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showCheatSheet, setShowCheatSheet] = useState<boolean>(false);
  const [voiceFeedbackEnabled, setVoiceFeedbackEnabled] = useState<boolean>(true);
  const isSupported = voiceCommandCoach.isSupported();

  // Internal action wrapper to capture feedback text for UI display
  const wrappedAction: VoiceCommandHandler = (action) => {
    let feedback = onAction(action);

    let actionLabel = '';
    switch (action.type) {
      case 'COMPLETE_CURRENT_SET':
        actionLabel = `Set ${currentSetIndex + 1} Logged ✓`;
        break;
      case 'UNDO_CURRENT_SET':
        actionLabel = `Set ${currentSetIndex + 1} Reopened`;
        break;
      case 'SET_REPS':
        actionLabel = `Reps set to ${action.payload}`;
        break;
      case 'SET_WEIGHT':
        actionLabel = `Weight set to ${action.payload} ${weightUnit}`;
        break;
      case 'ADJUST_WEIGHT':
        actionLabel = `Weight adjusted by ${action.payload > 0 ? '+' : ''}${action.payload} ${weightUnit}`;
        break;
      case 'SET_RPE':
        actionLabel = `RPE ${action.payload} logged`;
        break;
      case 'NEXT_EXERCISE':
        actionLabel = 'Next Exercise';
        break;
      case 'PREV_EXERCISE':
        actionLabel = 'Previous Exercise';
        break;
      case 'ADD_SET':
        actionLabel = 'Added New Set';
        break;
      case 'REMOVE_SET':
        actionLabel = 'Removed Set';
        break;
      case 'SKIP_REST':
        actionLabel = 'Rest Skipped';
        break;
      case 'START_REST':
        actionLabel = `Rest Started (${action.payload}s)`;
        break;
      case 'ADD_REST_TIME':
        actionLabel = '+30s Rest Added';
        break;
      case 'PAUSE_WORKOUT':
        actionLabel = 'Workout Paused';
        break;
      case 'RESUME_WORKOUT':
        actionLabel = 'Workout Resumed';
        break;
      case 'FINISH_WORKOUT':
        actionLabel = 'Ending Workout...';
        break;
      case 'SPOKEN_STATUS':
        actionLabel = 'Readout Status';
        break;
      case 'HELP':
        setShowCheatSheet(true);
        actionLabel = 'Voice Help Opened';
        break;
    }

    if (actionLabel) {
      setLastAction(actionLabel);
      setTimeout(() => setLastAction(''), 3500);
    }

    return feedback;
  };

  const handleToggleListening = () => {
    if (isListening) {
      voiceCommandCoach.stopListening();
      setIsListening(false);
      setTranscript('');
    } else {
      setErrorMessage(null);
      const started = voiceCommandCoach.startListening(
        wrappedAction,
        (text, isFinal) => {
          setTranscript(text);
          if (isFinal) {
            setTimeout(() => setTranscript(''), 2500);
          }
        },
        (listening, error) => {
          setIsListening(listening);
          if (error) setErrorMessage(error);
        }
      );

      if (!started && !isSupported) {
        setErrorMessage('Web Speech API is not supported in this browser. Voice commands require Chrome or Edge.');
      }
    }
  };

  const toggleVoiceFeedback = () => {
    const next = !voiceFeedbackEnabled;
    setVoiceFeedbackEnabled(next);
    voiceCommandCoach.setVoiceFeedbackEnabled(next);
    if (next) {
      voiceCommandCoach.speak('Voice feedback enabled');
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      voiceCommandCoach.stopListening();
    };
  }, []);

  const commandGroups = [
    {
      category: 'Sets & Reps',
      commands: [
        { phrase: 'Complete set / Done set', desc: 'Marks current set done & starts rest' },
        { phrase: '10 reps / 8 reps', desc: 'Updates completed rep count' },
        { phrase: 'Weight 80 / Weight 135', desc: 'Sets barbell/dumbbell load' },
        { phrase: 'Add 5 / Minus 5', desc: 'Increases or decreases weight' },
        { phrase: 'RPE 8 / RPE 9', desc: 'Logs effort rating' },
        { phrase: 'Undo set', desc: 'Unmarks current set' }
      ]
    },
    {
      category: 'Exercise & Routine',
      commands: [
        { phrase: 'Next exercise', desc: 'Advances to following movement' },
        { phrase: 'Previous exercise', desc: 'Jumps back one movement' },
        { phrase: 'Add set', desc: 'Adds extra set row' },
        { phrase: 'What\'s next / Status', desc: 'Speaks current exercise & target' }
      ]
    },
    {
      category: 'Rest & Workout Flow',
      commands: [
        { phrase: 'Skip rest / Stop rest', desc: 'Immediately ends rest timer' },
        { phrase: 'Add 30 seconds', desc: 'Extends rest interval' },
        { phrase: 'Pause workout', desc: 'Stops stopwatch clock' },
        { phrase: 'Resume workout', desc: 'Restarts clock' },
        { phrase: 'Finish workout', desc: 'Opens completion review' }
      ]
    }
  ];

  return (
    <div className="bg-[#0f172a] border border-[#213253] rounded-2xl p-3 sm:p-4 shadow-xl shadow-blue-950/20 relative overflow-hidden transition-all">
      {/* Background radial blue glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Voice Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
        {/* Left: Status & Microphone button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleListening}
            className={`relative p-3 rounded-xl border flex items-center justify-center transition-all duration-300 ${
              isListening
                ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-500/40 scale-105'
                : 'bg-[#162038] hover:bg-[#1b2947] text-gray-300 border-[#213253]'
            }`}
            title={isListening ? 'Click to Mute Voice Coach' : 'Click to Enable Hands-Free Voice Commands'}
          >
            {isListening ? (
              <>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-sky-400 rounded-full animate-ping" />
                <Mic className="w-5 h-5 text-white" />
              </>
            ) : (
              <MicOff className="w-5 h-5 text-gray-400" />
            )}
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-sm tracking-wide text-white">
                Hands-Free Voice Coach
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold border ${
                  isListening
                    ? 'bg-blue-500/20 text-sky-300 border-blue-500/40 animate-pulse'
                    : 'bg-gray-800 text-gray-400 border-gray-700'
                }`}
              >
                {isListening ? 'Active Listening' : 'Muted'}
              </span>
            </div>

            <p className="text-xs text-gray-400 mt-0.5">
              {isListening ? (
                <span className="text-sky-300 flex items-center gap-1.5 font-mono">
                  <Radio className="w-3 h-3 animate-spin text-sky-400" />
                  Try: "Complete set" • "10 reps" • "Next exercise"
                </span>
              ) : (
                <span>Tap microphone for hands-free set logging during lifts</span>
              )}
            </p>
          </div>
        </div>

        {/* Right: Controls & Helper */}
        <div className="flex items-center gap-2 self-end sm:self-center">
          {/* Spoken voice feedback toggle */}
          <button
            onClick={toggleVoiceFeedback}
            className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 transition-colors ${
              voiceFeedbackEnabled
                ? 'bg-[#162038] text-blue-400 border-blue-500/30 hover:bg-[#1b2947]'
                : 'bg-[#111a2e] text-gray-500 border-[#213253] hover:text-gray-300'
            }`}
            title={voiceFeedbackEnabled ? 'Audio Speech Feedback ON' : 'Audio Speech Feedback Muted'}
          >
            {voiceFeedbackEnabled ? (
              <Volume2 className="w-4 h-4 text-blue-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-gray-500" />
            )}
            <span className="text-[11px] font-mono hidden md:inline">
              {voiceFeedbackEnabled ? 'Audio Coach ON' : 'Audio OFF'}
            </span>
          </button>

          {/* Voice Cheat Sheet Drawer Trigger */}
          <button
            onClick={() => setShowCheatSheet(!showCheatSheet)}
            className="flex items-center gap-1 px-2.5 py-2 bg-[#162038] hover:bg-[#1b2947] text-gray-300 hover:text-white border border-[#213253] rounded-xl text-xs font-mono transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-sky-400" />
            <span>Commands</span>
            {showCheatSheet ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Live Transcript / Recognized Command Readout */}
      {(transcript || lastAction) && (
        <div className="mt-3 pt-2.5 border-t border-[#213253]/80 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping shrink-0" />
            <span className="text-gray-400 font-mono text-[11px]">Heard:</span>
            <span className="text-white font-medium italic truncate">
              "{transcript || '...'}"
            </span>
          </div>

          {lastAction && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-500/20 border border-blue-500/40 rounded-lg text-sky-300 font-mono font-bold text-xs shrink-0 animate-fade-in">
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
              <span>{lastAction}</span>
            </div>
          )}
        </div>
      )}

      {/* Error / Permission message if any */}
      {errorMessage && (
        <div className="mt-3 p-2.5 bg-red-950/40 border border-red-500/40 rounded-xl text-xs text-red-300 flex items-center justify-between">
          <span>{errorMessage}</span>
          <button
            onClick={() => setErrorMessage(null)}
            className="text-gray-400 hover:text-white p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Expandable Voice Commands Cheat Sheet */}
      {showCheatSheet && (
        <div className="mt-3 pt-3 border-t border-[#213253] space-y-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-heading font-bold text-sky-300 flex items-center gap-1.5 uppercase tracking-wider">
              <Command className="w-3.5 h-3.5" />
              Available Voice Commands
            </span>
            <span className="text-[10px] font-mono text-gray-400">
              Speak naturally while training
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {commandGroups.map((grp) => (
              <div
                key={grp.category}
                className="bg-[#111a2e] p-2.5 rounded-xl border border-[#213253]/80 space-y-2"
              >
                <div className="text-[11px] font-bold text-blue-400 font-mono">
                  {grp.category}
                </div>
                <div className="space-y-1.5">
                  {grp.commands.map((cmd) => (
                    <div
                      key={cmd.phrase}
                      onClick={() => {
                        // Clicking tests or executes the command directly!
                        voiceCommandCoach.parseAndExecuteCommand(cmd.phrase);
                      }}
                      className="group cursor-pointer p-1.5 rounded-lg bg-[#162038]/60 hover:bg-blue-600/20 border border-transparent hover:border-blue-500/40 transition-all"
                    >
                      <div className="text-xs font-medium text-white group-hover:text-sky-300 font-mono">
                        "{cmd.phrase}"
                      </div>
                      <div className="text-[10px] text-gray-400 leading-tight">
                        {cmd.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
