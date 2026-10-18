// Voice Workout & Set Command Coach
// Uses Web Speech API (SpeechRecognition / webkitSpeechRecognition) with SpeechSynthesis for hands-free gym control

export interface VoiceCommandResult {
  rawTranscript: string;
  matchedAction: string;
  feedbackSpeech: string;
  confidence: number;
}

export type VoiceCommandHandler = (action: {
  type:
    | 'COMPLETE_CURRENT_SET'
    | 'UNDO_CURRENT_SET'
    | 'SET_REPS'
    | 'SET_WEIGHT'
    | 'ADJUST_WEIGHT'
    | 'SET_RPE'
    | 'NEXT_EXERCISE'
    | 'PREV_EXERCISE'
    | 'ADD_SET'
    | 'REMOVE_SET'
    | 'START_REST'
    | 'SKIP_REST'
    | 'ADD_REST_TIME'
    | 'PAUSE_WORKOUT'
    | 'RESUME_WORKOUT'
    | 'FINISH_WORKOUT'
    | 'SPOKEN_STATUS'
    | 'HELP';
  payload?: any;
}) => string | void; // returns optional custom verbal feedback message

class VoiceCommandCoachService {
  private recognition: any = null;
  private isListening: boolean = false;
  private isSpeechSupported: boolean = false;
  private onTranscriptCallback: ((transcript: string, isFinal: boolean) => void) | null = null;
  private onActionCallback: VoiceCommandHandler | null = null;
  private onStatusChangeCallback: ((isListening: boolean, error?: string) => void) | null = null;
  private autoRestart: boolean = false;
  private speechQueue: string[] = [];
  private isSpeaking: boolean = false;
  private voiceEnabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        this.isSpeechSupported = true;
        this.initRecognition(SpeechRecognition);
      }
    }
  }

  private initRecognition(SpeechRecognitionClass: any) {
    try {
      this.recognition = new SpeechRecognitionClass();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';
      this.recognition.maxAlternatives = 3;

      this.recognition.onstart = () => {
        this.isListening = true;
        if (this.onStatusChangeCallback) this.onStatusChangeCallback(true);
      };

      this.recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const item = event.results[i];
          const text = item[0]?.transcript || '';
          if (item.isFinal) {
            finalTranscript += text;
          } else {
            interimTranscript += text;
          }
        }

        const activeText = (finalTranscript || interimTranscript).trim();
        if (this.onTranscriptCallback && activeText) {
          this.onTranscriptCallback(activeText, !!finalTranscript);
        }

        if (finalTranscript) {
          this.parseAndExecuteCommand(finalTranscript.toLowerCase());
        }
      };

      this.recognition.onerror = (event: any) => {
        console.warn('SpeechRecognition error:', event.error);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          this.autoRestart = false;
          this.isListening = false;
          if (this.onStatusChangeCallback) {
            this.onStatusChangeCallback(false, 'Microphone permission denied. Please allow microphone access.');
          }
        }
      };

      this.recognition.onend = () => {
        this.isListening = false;
        if (this.autoRestart) {
          // Reconnect automatically for seamless gym hands-free session
          setTimeout(() => {
            if (this.autoRestart) {
              try {
                this.recognition.start();
              } catch {
                // Ignore if already active
              }
            }
          }, 300);
        } else {
          if (this.onStatusChangeCallback) this.onStatusChangeCallback(false);
        }
      };
    } catch (e) {
      console.warn('Could not initialize SpeechRecognition:', e);
      this.isSpeechSupported = false;
    }
  }

  public isSupported(): boolean {
    return this.isSpeechSupported;
  }

  public getIsListening(): boolean {
    return this.isListening;
  }

  public setVoiceFeedbackEnabled(enabled: boolean) {
    this.voiceEnabled = enabled;
  }

  public getVoiceFeedbackEnabled(): boolean {
    return this.voiceEnabled;
  }

  public startListening(
    onAction: VoiceCommandHandler,
    onTranscript?: (transcript: string, isFinal: boolean) => void,
    onStatusChange?: (isListening: boolean, error?: string) => void
  ): boolean {
    if (!this.isSpeechSupported || !this.recognition) return false;

    this.onActionCallback = onAction;
    this.onTranscriptCallback = onTranscript || null;
    this.onStatusChangeCallback = onStatusChange || null;
    this.autoRestart = true;

    try {
      this.recognition.start();
      this.speak("Voice coach active. Say 'Complete set' or 'Help' anytime.");
      return true;
    } catch {
      // If already started, ensure status
      this.isListening = true;
      if (this.onStatusChangeCallback) this.onStatusChangeCallback(true);
      return true;
    }
  }

  public stopListening() {
    this.autoRestart = false;
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch {
        // Ignore
      }
    }
    this.isListening = false;
    if (this.onStatusChangeCallback) this.onStatusChangeCallback(false);
  }

  // Text-To-Speech verbal coach feedback
  public speak(text: string, force: boolean = false) {
    if (!this.voiceEnabled && !force) return;
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    try {
      window.speechSynthesis.cancel(); // Cancel any lingering utterance
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      // Select natural English voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        (v) => (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Daniel')) && v.lang.startsWith('en')
      ) || voices.find((v) => v.lang.startsWith('en'));

      if (preferredVoice) utterance.voice = preferredVoice;

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  }

  // Parse natural language gym commands
  public parseAndExecuteCommand(text: string): boolean {
    const clean = text.trim().toLowerCase();
    if (!this.onActionCallback) return false;

    // 1. SET COMPLETION / LOGGING
    if (
      clean.includes('complete set') ||
      clean.includes('finish set') ||
      clean.includes('done set') ||
      clean.includes('set done') ||
      clean.includes('set complete') ||
      clean.includes('log set') ||
      clean.includes('check set') ||
      clean.includes('next set') ||
      clean === 'done' ||
      clean === 'finished' ||
      clean === 'complete'
    ) {
      const customFeedback = this.onActionCallback({ type: 'COMPLETE_CURRENT_SET' });
      this.speak(customFeedback || 'Set completed! Rest timer started.');
      return true;
    }

    // 2. UNDO / UNCHECK SET
    if (
      clean.includes('undo set') ||
      clean.includes('uncheck set') ||
      clean.includes('reopen set') ||
      clean.includes('cancel set')
    ) {
      const customFeedback = this.onActionCallback({ type: 'UNDO_CURRENT_SET' });
      this.speak(customFeedback || 'Set marked incomplete.');
      return true;
    }

    // 3. SET REPS (e.g. "10 reps", "12 reps", "reps 8", "did 10 reps", "logged 12 reps")
    const repMatch = clean.match(/(?:reps?|did|got)\s*(\d{1,3})/i) || clean.match(/(\d{1,3})\s*reps?/i);
    if (repMatch) {
      const reps = parseInt(repMatch[1], 10);
      if (reps > 0 && reps < 200) {
        this.onActionCallback({ type: 'SET_REPS', payload: reps });
        this.speak(`Reps set to ${reps}`);
        return true;
      }
    }

    // 4. SET WEIGHT (e.g. "weight 100", "weight 80 kilos", "135 pounds", "weight to 60")
    const weightMatch =
      clean.match(/(?:weight|load|barbell)\s*(?:is|to)?\s*(\d{1,4}(?:\.\d+)?)/i) ||
      clean.match(/(\d{1,4}(?:\.\d+)?)\s*(?:kg|kilos|pounds|lbs)/i);
    if (weightMatch) {
      const weight = parseFloat(weightMatch[1]);
      if (weight >= 0 && weight <= 600) {
        this.onActionCallback({ type: 'SET_WEIGHT', payload: weight });
        this.speak(`Weight set to ${weight}`);
        return true;
      }
    }

    // 5. ADJUST WEIGHT (+/- e.g. "add 5 pounds", "add 10 kilos", "plus 5", "minus 5")
    const addWeightMatch = clean.match(/(?:add|plus)\s*(\d{1,3}(?:\.\d+)?)/i);
    if (addWeightMatch) {
      const amount = parseFloat(addWeightMatch[1]);
      this.onActionCallback({ type: 'ADJUST_WEIGHT', payload: amount });
      this.speak(`Added ${amount}`);
      return true;
    }
    const subWeightMatch = clean.match(/(?:subtract|minus|drop)\s*(\d{1,3}(?:\.\d+)?)/i);
    if (subWeightMatch) {
      const amount = -parseFloat(subWeightMatch[1]);
      this.onActionCallback({ type: 'ADJUST_WEIGHT', payload: amount });
      this.speak(`Subtracted ${Math.abs(amount)}`);
      return true;
    }

    // 6. RATE RPE (e.g. "RPE 8", "RPE 9", "rate 8")
    const rpeMatch = clean.match(/(?:rpe|rate|effort)\s*(\d{1,2})/i);
    if (rpeMatch) {
      const rpe = parseInt(rpeMatch[1], 10);
      if (rpe >= 1 && rpe <= 10) {
        this.onActionCallback({ type: 'SET_RPE', payload: rpe });
        this.speak(`RPE logged as ${rpe}`);
        return true;
      }
    }

    // 7. EXERCISE NAVIGATION
    if (
      clean.includes('next exercise') ||
      clean.includes('skip exercise') ||
      clean.includes('next workout')
    ) {
      const customFeedback = this.onActionCallback({ type: 'NEXT_EXERCISE' });
      this.speak(customFeedback || 'Moving to next exercise.');
      return true;
    }

    if (
      clean.includes('previous exercise') ||
      clean.includes('prev exercise') ||
      clean.includes('last exercise') ||
      clean.includes('go back')
    ) {
      const customFeedback = this.onActionCallback({ type: 'PREV_EXERCISE' });
      this.speak(customFeedback || 'Returning to previous exercise.');
      return true;
    }

    // 8. ADD / REMOVE SETS
    if (clean.includes('add set') || clean.includes('extra set') || clean.includes('new set')) {
      this.onActionCallback({ type: 'ADD_SET' });
      this.speak('New set added.');
      return true;
    }

    if (clean.includes('remove set') || clean.includes('delete set') || clean.includes('drop set row')) {
      this.onActionCallback({ type: 'REMOVE_SET' });
      this.speak('Last set removed.');
      return true;
    }

    // 9. REST TIMER COMMANDS
    if (clean.includes('skip rest') || clean.includes('stop rest') || clean.includes('stop timer') || clean.includes('end rest')) {
      this.onActionCallback({ type: 'SKIP_REST' });
      this.speak('Rest timer stopped. Let’s lift!');
      return true;
    }

    if (clean.includes('start rest') || clean.includes('rest timer')) {
      const secMatch = clean.match(/(\d{1,3})\s*seconds?/i);
      const seconds = secMatch ? parseInt(secMatch[1], 10) : 90;
      this.onActionCallback({ type: 'START_REST', payload: seconds });
      this.speak(`Rest timer set to ${seconds} seconds.`);
      return true;
    }

    if (clean.includes('add 30') || clean.includes('plus 30') || clean.includes('more rest')) {
      this.onActionCallback({ type: 'ADD_REST_TIME', payload: 30 });
      this.speak('Added 30 seconds of rest.');
      return true;
    }

    // 10. PAUSE / RESUME WORKOUT
    if (clean.includes('pause workout') || clean.includes('pause timer') || clean === 'pause') {
      this.onActionCallback({ type: 'PAUSE_WORKOUT' });
      this.speak('Workout session paused.');
      return true;
    }

    if (clean.includes('resume workout') || clean.includes('continue workout') || clean === 'resume') {
      this.onActionCallback({ type: 'RESUME_WORKOUT' });
      this.speak('Workout resumed. Clock running.');
      return true;
    }

    // 11. SPOKEN STATUS / WHAT'S NEXT
    if (
      clean.includes("what's next") ||
      clean.includes('what is next') ||
      clean.includes('status') ||
      clean.includes('current set') ||
      clean.includes('where am i') ||
      clean.includes('current exercise')
    ) {
      const customFeedback = this.onActionCallback({ type: 'SPOKEN_STATUS' });
      if (customFeedback) {
        this.speak(customFeedback);
      }
      return true;
    }

    // 12. FINISH WORKOUT
    if (clean.includes('finish workout') || clean.includes('end workout') || clean.includes('complete workout')) {
      this.onActionCallback({ type: 'FINISH_WORKOUT' });
      this.speak('Opening workout summary. Great work today!');
      return true;
    }

    // 13. HELP / AVAILABLE COMMANDS
    if (clean.includes('help') || clean.includes('commands') || clean.includes('what can i say')) {
      this.onActionCallback({ type: 'HELP' });
      this.speak("You can say: Complete set, 10 reps, Weight 80, Next exercise, Skip rest, or Status.");
      return true;
    }

    return false;
  }
}

export const voiceCommandCoach = new VoiceCommandCoachService();
