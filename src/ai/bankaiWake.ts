/**
 * BANKAI Wake-Word Module (Browser-Native Managed Keyword Detection)
 * 
 * Provides managed keyword detection for the exact wake word: "BANKAI"
 * using browser-native SpeechRecognition / webkitSpeechRecognition.
 * 
 * - Privacy Notice: The application does not intentionally upload, store, or transmit
 *   raw microphone audio itself. Browser SpeechRecognition processing is vendor/browser
 *   dependent and may be handled outside the page's local JavaScript environment.
 * - Non-Dedicated Acoustic Engine: Detection accuracy depends on browser, OS, microphone,
 *   ambient noise, accent, and speech recognition behavior.
 * - Tap to Speak remains the reliable fallback.
 */

export interface WakeDetectionResult {
  detected: boolean;
  rawTranscript: string;
  normalizedTranscript: string;
  matchedVariant?: string;
  extractedQuery?: string;
}

export type WakeCallback = (result: WakeDetectionResult) => void;

// Normalized phonetic variations of "BANKAI" commonly produced by browser speech recognizers
export const WAKE_PHONETIC_VARIANTS = [
  'bankai',
  'ban kai',
  'bank eye',
  'bank i',
  'bunk eye',
  'bunkai',
  'bonzai',
  'bang kai',
  'bank ai',
  'bank-ai'
] as const;

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message?: string;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface ISpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onstart: ((this: ISpeechRecognitionInstance, ev: Event) => any) | null;
  onresult: ((this: ISpeechRecognitionInstance, ev: SpeechRecognitionEvent) => any) | null;
  onerror: ((this: ISpeechRecognitionInstance, ev: SpeechRecognitionErrorEvent) => any) | null;
  onend: ((this: ISpeechRecognitionInstance, ev: Event) => any) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

export class BankaiWakeDetector {
  private isEnabled = false;
  private isListening = false;
  private recognition: ISpeechRecognitionInstance | null = null;
  private onWakeTrigger: WakeCallback | null = null;
  private restartTimeout: number | null = null;
  private consecutiveErrors = 0;
  private isPausedForVisibility = false;
  private visibilityHandlerAttached = false;

  constructor() {
    this.setupVisibilityListener();
  }

  /**
   * Checks whether the current browser supports SpeechRecognition for wake detection
   */
  public isWakeSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return !!(window.SpeechRecognition || (window as any).webkitSpeechRecognition);
  }

  /**
   * Checks whether wake detection is currently active
   */
  public isWakeEnabled(): boolean {
    return this.isEnabled;
  }

  /**
   * Normalizes an incoming transcript for resilient phonetic keyword matching
   */
  public normalizeWakeTranscript(raw: string): string {
    return (raw || '')
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Evaluates whether a transcript contains the "BANKAI" wake word (standalone or leading compound)
   */
  public parseWakeUtterance(raw: string): WakeDetectionResult {
    const rawTranscript = raw || '';
    const normalized = this.normalizeWakeTranscript(rawTranscript);

    if (!normalized) {
      return {
        detected: false,
        rawTranscript,
        normalizedTranscript: ''
      };
    }

    // Sort variants by length descending so longer phrases ("bank eye", "ban kai") match first
    const sortedVariants = [...WAKE_PHONETIC_VARIANTS]
      .map((v) => this.normalizeWakeTranscript(v))
      .filter((v, idx, arr) => arr.indexOf(v) === idx)
      .sort((a, b) => b.length - a.length);

    for (const variant of sortedVariants) {
      // 1. Standalone match (exact word/phrase)
      if (normalized === variant) {
        return {
          detected: true,
          rawTranscript,
          normalizedTranscript: normalized,
          matchedVariant: variant,
          extractedQuery: ''
        };
      }

      // 2. Leading compound command match ("bankai show me your projects")
      if (normalized.startsWith(variant + ' ')) {
        const remaining = normalized.slice(variant.length).trim();
        return {
          detected: true,
          rawTranscript,
          normalizedTranscript: normalized,
          matchedVariant: variant,
          extractedQuery: remaining
        };
      }
    }

    return {
      detected: false,
      rawTranscript,
      normalizedTranscript: normalized
    };
  }

  /**
   * Enables managed wake-word detection session
   */
  public enableWakeDetection(callback: WakeCallback): boolean {
    if (!this.isWakeSupported()) {
      return false;
    }

    this.isEnabled = true;
    this.onWakeTrigger = callback;
    this.consecutiveErrors = 0;
    this.startManagedSession();
    return true;
  }

  /**
   * Disables and terminates wake-word detection
   */
  public disableWakeDetection(): void {
    this.isEnabled = false;
    this.onWakeTrigger = null;
    this.stopManagedSession();
  }

  /**
   * Temporarily pauses wake detection (e.g. while user is speaking or TTS is playing)
   */
  public pause(): void {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.abort();
      } catch {
        // safe ignore
      }
      this.isListening = false;
    }
  }

  /**
   * Resumes managed wake detection if enabled
   */
  public resume(): void {
    if (this.isEnabled && !this.isListening && (typeof document === 'undefined' || !document.hidden)) {
      this.startManagedSession();
    }
  }

  private startManagedSession(): void {
    if (!this.isEnabled || (typeof document !== 'undefined' && document.hidden)) {
      return;
    }

    if (this.restartTimeout) {
      window.clearTimeout(this.restartTimeout);
      this.restartTimeout = null;
    }

    if (this.recognition) {
      try {
        this.recognition.abort();
      } catch {
        // safe ignore
      }
      this.recognition = null;
    }

    try {
      const RecognitionClass =
        (typeof window !== 'undefined' && (window.SpeechRecognition || (window as any).webkitSpeechRecognition)) || null;

      if (!RecognitionClass) {
        this.isEnabled = false;
        return;
      }

      const rec = new RecognitionClass();
      this.recognition = rec;

      rec.continuous = true;
      rec.interimResults = false;
      rec.maxAlternatives = 1;
      rec.lang = (typeof navigator !== 'undefined' && navigator.language) ? navigator.language : 'en-US';

      rec.onstart = () => {
        this.isListening = true;
        this.consecutiveErrors = 0;
      };

      rec.onresult = (event: SpeechRecognitionEvent) => {
        if (!this.isEnabled || !this.onWakeTrigger) return;

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const res = event.results[i];
          if (res && res.isFinal && res.length > 0) {
            const transcript = res[0].transcript;
            const parsed = this.parseWakeUtterance(transcript);

            if (parsed.detected) {
              // Pause active wake detection before notifying handler
              this.pause();
              this.onWakeTrigger(parsed);
              return;
            }
          }
        }
      };

      rec.onerror = (event: SpeechRecognitionErrorEvent) => {
        this.isListening = false;

        // Permanent permission failure or audio capture failure -> clean shutdown
        if (event.error === 'not-allowed' || event.error === 'audio-capture') {
          console.warn('[BANKAI Wake] Permission or device error, disabling wake mode:', event.error);
          this.disableWakeDetection();
          return;
        }

        // For temporary network/no-speech/aborted errors, apply guarded restart
        this.consecutiveErrors++;
        if (this.consecutiveErrors > 5) {
          console.warn('[BANKAI Wake] Excessive recognition errors, disabling wake session.');
          this.disableWakeDetection();
          return;
        }

        this.scheduleRestart(800);
      };

      rec.onend = () => {
        this.isListening = false;
        this.recognition = null;

        // Restart session if wake mode is still enabled and tab is active
        if (this.isEnabled && (typeof document === 'undefined' || !document.hidden)) {
          this.scheduleRestart(300);
        }
      };

      rec.start();
    } catch (err) {
      console.error('[BANKAI Wake] Failed to initialize SpeechRecognition:', err);
      this.disableWakeDetection();
    }
  }

  private stopManagedSession(): void {
    if (this.restartTimeout) {
      window.clearTimeout(this.restartTimeout);
      this.restartTimeout = null;
    }

    if (this.recognition) {
      try {
        this.recognition.abort();
      } catch {
        // safe ignore
      }
      this.recognition = null;
    }

    this.isListening = false;
  }

  private scheduleRestart(delayMs: number): void {
    if (!this.isEnabled || (typeof document !== 'undefined' && document.hidden)) {
      return;
    }

    if (this.restartTimeout) {
      window.clearTimeout(this.restartTimeout);
    }

    this.restartTimeout = window.setTimeout(() => {
      this.restartTimeout = null;
      if (this.isEnabled) {
        this.startManagedSession();
      }
    }, delayMs);
  }

  private setupVisibilityListener(): void {
    if (typeof document === 'undefined' || this.visibilityHandlerAttached) return;

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (this.isEnabled && this.isListening) {
          this.isPausedForVisibility = true;
          this.pause();
        }
      } else {
        if (this.isEnabled && this.isPausedForVisibility) {
          this.isPausedForVisibility = false;
          this.resume();
        }
      }
    });

    this.visibilityHandlerAttached = true;
  }
}

// Export singleton wake detector instance
export const bankaiWake = new BankaiWakeDetector();
