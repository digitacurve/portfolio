/**
 * BANKAI Voice Layer (Browser-Native Speech-to-Text & Text-to-Speech)
 * 
 * Provides an isolated, zero-dependency browser-native voice interface for BANKAI.
 * 
 * - SpeechRecognition / webkitSpeechRecognition for Speech-to-Text
 * - window.speechSynthesis for Text-to-Speech
 * - Isolated state machine: idle | listening | thinking | speaking | error
 * - Zero external APIs, zero npm packages, zero client secrets
 * - Single source of truth for voice state
 */

import { bankaiWake, type WakeDetectionResult } from './bankaiWake';

export type BankaiVoiceState = 'idle' | 'wake-ready' | 'listening' | 'thinking' | 'speaking' | 'error';

export interface BankaiVoiceStateChange {
  state: BankaiVoiceState;
  message?: string;
  transcript?: string;
}

type StateListener = (change: BankaiVoiceStateChange) => void;

// Type declarations for browser SpeechRecognition API
interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message?: string;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onstart: ((this: ISpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: ISpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onerror: ((this: ISpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
  onend: ((this: ISpeechRecognition, ev: Event) => any) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

interface SpeechRecognitionConstructor {
  new (): ISpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

class BankaiVoiceManager {
  private currentState: BankaiVoiceState = 'idle';
  private errorMessage = '';
  private listeners: Set<StateListener> = new Set();
  private recognition: ISpeechRecognition | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private errorResetTimeout: number | null = null;
  private onResultCallback: ((transcript: string) => void) | null = null;
  private voicesLoaded = false;
  private cachedVoices: SpeechSynthesisVoice[] = [];
  private isWakeEnabled = false;
  private wakeQueryHandler: ((query: string) => void) | null = null;

  constructor() {
    this.initVoices();
  }

  /**
   * Pre-loads available system voices for Text-to-Speech
   */
  private initVoices(): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    const loadVoices = () => {
      this.cachedVoices = window.speechSynthesis.getVoices();
      if (this.cachedVoices.length > 0) {
        this.voicesLoaded = true;
      }
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  /**
   * Checks if browser speech recognition is supported
   */
  public isSpeechRecognitionSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  /**
   * Checks if browser text-to-speech is supported
   */
  public isTextToSpeechSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  }

  /**
   * Subscribes a listener to voice state transitions
   */
  public subscribe(listener: StateListener): () => void {
    this.listeners.add(listener);
    // Trigger initial notification
    listener({
      state: this.currentState,
      message: this.errorMessage
    });
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Returns the current state of the voice manager
   */
  public getState(): BankaiVoiceState {
    return this.currentState;
  }

  /**
   * Returns current error message if in error state
   */
  /**
   * Returns current error message if in error state
   */
  public getErrorMessage(): string {
    return this.errorMessage;
  }

  /**
   * Checks if browser speech recognition is supported for wake-word mode
   */
  public isWakeSupported(): boolean {
    return bankaiWake.isWakeSupported();
  }

  /**
   * Checks whether wake-word mode is actively enabled
   */
  public isWakeModeActive(): boolean {
    return this.isWakeEnabled;
  }

  /**
   * Enables managed wake-word detection mode
   */
  public enableWakeMode(onQuery: (query: string) => void): boolean {
    if (!this.isWakeSupported()) {
      return false;
    }

    this.isWakeEnabled = true;
    this.wakeQueryHandler = onQuery;

    const started = bankaiWake.enableWakeDetection((result) => {
      this.handleWakeTrigger(result);
    });

    if (started) {
      this.setState('wake-ready', 'LISTENING FOR "BANKAI"...');
      return true;
    } else {
      this.isWakeEnabled = false;
      this.wakeQueryHandler = null;
      this.setState('idle');
      return false;
    }
  }

  /**
   * Disables wake-word detection mode
   */
  public disableWakeMode(): void {
    this.isWakeEnabled = false;
    this.wakeQueryHandler = null;
    bankaiWake.disableWakeDetection();

    if (this.currentState === 'wake-ready' || this.currentState === 'listening') {
      this.stopListening();
      this.setState('idle');
    }
  }

  /**
   * Handles wake detection events from bankaiWake
   */
  private handleWakeTrigger(result: WakeDetectionResult): void {
    if (!this.isWakeEnabled || !this.wakeQueryHandler) return;

    // 1. Compound command (e.g. "BANKAI show me your projects")
    if (result.extractedQuery && result.extractedQuery.trim()) {
      const query = result.extractedQuery.trim();
      this.wakeQueryHandler(query);
      return;
    }

    // 2. Standalone wake word ("BANKAI") -> enter listening state to capture user question
    this.startListening((transcript) => {
      if (this.wakeQueryHandler && transcript.trim()) {
        this.wakeQueryHandler(transcript.trim());
      }
    });
  }

  private returnToReadyState(): void {
    if (this.isWakeEnabled) {
      this.setState('wake-ready', 'LISTENING FOR "BANKAI"...');
      bankaiWake.resume();
    } else {
      this.setState('idle');
    }
  }

  private setState(state: BankaiVoiceState, message = '', transcript?: string): void {
    this.currentState = state;
    this.errorMessage = message;
    
    if (this.errorResetTimeout) {
      window.clearTimeout(this.errorResetTimeout);
      this.errorResetTimeout = null;
    }

    // Auto-recover from error state to ready/idle after 3 seconds
    if (state === 'error') {
      this.errorResetTimeout = window.setTimeout(() => {
        if (this.currentState === 'error') {
          this.returnToReadyState();
        }
      }, 3000);
    }

    const payload: BankaiVoiceStateChange = { state, message, transcript };
    this.listeners.forEach((listener) => {
      try {
        listener(payload);
      } catch (err) {
        console.error('[BANKAI Voice] Listener error:', err);
      }
    });
  }

  /**
   * Initializes and starts a speech recognition session
   */
  public startListening(onResult: (transcript: string) => void): void {
    // 1. If currently speaking, cancel speech first
    this.cancelSpeech();

    // 2. Temporarily pause wake detection during explicit listening session
    if (this.isWakeEnabled) {
      bankaiWake.pause();
    }

    // 3. Verify browser recognition support
    if (!this.isSpeechRecognitionSupported()) {
      this.setState('error', 'SPEECH RECOGNITION NOT SUPPORTED');
      return;
    }

    // 4. Abort any prior recognition instance
    if (this.recognition) {
      try {
        this.recognition.abort();
      } catch {
        // Safe ignore
      }
      this.recognition = null;
    }

    try {
      const RecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!RecognitionClass) {
        this.setState('error', 'VOICE UNAVAILABLE');
        return;
      }

      const rec = new RecognitionClass();
      this.recognition = rec;
      this.onResultCallback = onResult;

      // Prefer browser's default/current language
      rec.lang = (typeof navigator !== 'undefined' && navigator.language) ? navigator.language : 'en-US';
      rec.continuous = false;
      rec.interimResults = false;
      rec.maxAlternatives = 1;

      rec.onstart = () => {
        this.setState('listening', 'LISTENING...');
      };

      rec.onresult = (event: SpeechRecognitionEvent) => {
        if (event.results && event.results.length > 0) {
          const firstResult = event.results[0];
          if (firstResult && firstResult.length > 0) {
            const transcript = firstResult[0].transcript.trim();
            if (transcript) {
              if (this.onResultCallback) {
                const callback = this.onResultCallback;
                this.onResultCallback = null;
                callback(transcript);
              }
            }
          }
        }
      };

      rec.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.warn('[BANKAI Voice] Recognition error event:', event.error);
        let errorMsg = 'VOICE ERROR';

        switch (event.error) {
          case 'not-allowed':
          case 'permission-denied':
            errorMsg = 'MIC PERMISSION DENIED';
            break;
          case 'no-speech':
            errorMsg = 'NO SPEECH DETECTED';
            break;
          case 'audio-capture':
            errorMsg = 'NO MICROPHONE FOUND';
            break;
          case 'network':
            errorMsg = 'NETWORK ERROR';
            break;
          case 'aborted':
            // If aborted intentionally, return to ready/idle
            this.returnToReadyState();
            return;
          default:
            errorMsg = 'VOICE UNAVAILABLE';
            break;
        }

        this.setState('error', errorMsg);
      };

      rec.onend = () => {
        this.recognition = null;
        // If recognition ended without moving to thinking or speaking or error, return to ready
        if (this.currentState === 'listening') {
          this.returnToReadyState();
        }
      };

      rec.start();
    } catch (err) {
      console.error('[BANKAI Voice] Failed to start speech recognition:', err);
      this.setState('error', 'MICROPHONE UNAVAILABLE');
    }
  }

  /**
   * Aborts active speech recognition
   */
  public stopListening(): void {
    if (this.recognition) {
      try {
        this.recognition.abort();
      } catch {
        // Safe ignore
      }
      this.recognition = null;
    }
    if (this.currentState === 'listening') {
      this.returnToReadyState();
    }
  }

  /**
   * Sets the voice state to thinking while BANKAI processes the query
   */
  public setThinking(): void {
    this.setState('thinking', 'THINKING...');
  }

  /**
   * Speaks the response text using browser-native Text-to-Speech
   */
  public speak(text: string, onEnd?: () => void): void {
    if (!this.isTextToSpeechSupported()) {
      this.returnToReadyState();
      if (onEnd) onEnd();
      return;
    }

    // Cancel any current utterance
    this.cancelSpeech();

    // Clean text of technical characters or excessive whitespace
    const cleanText = text
      .replace(/→/g, '')
      .replace(/•/g, '')
      .replace(/[*_#`]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) {
      this.returnToReadyState();
      if (onEnd) onEnd();
      return;
    }

    try {
      const UtteranceClass = (typeof window !== 'undefined' && window.SpeechSynthesisUtterance) ? window.SpeechSynthesisUtterance : (typeof SpeechSynthesisUtterance !== 'undefined' ? SpeechSynthesisUtterance : null);
      if (!UtteranceClass) {
        this.returnToReadyState();
        if (onEnd) onEnd();
        return;
      }

      const utterance = new UtteranceClass(cleanText);
      this.currentUtterance = utterance;

      // Select neutral system voice
      const voice = this.selectBestSystemVoice();
      if (voice) {
        utterance.voice = voice;
      }

      // Neutral, clear audio configuration
      utterance.rate = 1.0;
      utterance.pitch = 0.95;
      utterance.volume = 1.0;

      utterance.onstart = () => {
        this.setState('speaking', 'BANKAI SPEAKING...');
      };

      utterance.onend = () => {
        this.currentUtterance = null;
        this.returnToReadyState();
        if (onEnd) onEnd();
      };

      utterance.onerror = (e) => {
        console.warn('[BANKAI Voice] TTS error:', e);
        this.currentUtterance = null;
        this.returnToReadyState();
        if (onEnd) onEnd();
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error('[BANKAI Voice] TTS synthesis error:', err);
      this.returnToReadyState();
      if (onEnd) onEnd();
    }
  }

  /**
   * Cancels any active Text-to-Speech and returns to ready state
   */
  public cancelSpeech(): void {
    if (this.isTextToSpeechSupported()) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Safe ignore
      }
    }
    this.currentUtterance = null;
    if (this.currentState === 'speaking') {
      this.returnToReadyState();
    }
  }

  /**
   * Selects the most suitable deep neutral system voice from available browser voices
   */
  private selectBestSystemVoice(): SpeechSynthesisVoice | null {
    const voices = this.cachedVoices.length > 0 
      ? this.cachedVoices 
      : (typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis.getVoices() : []);

    if (!voices || voices.length === 0) {
      return null;
    }

    const preferredVoiceNames = [
      'Daniel',
      'Arthur',
      'Oliver',
      'Aaron',
      'Google UK English Male',
      'Google US English',
      'Microsoft David Online',
      'Microsoft David',
      'Microsoft Mark',
      'Alex',
      'Fred'
    ];

    // 1. Try finding a preferred voice match
    for (const name of preferredVoiceNames) {
      const match = voices.find((v) => v.name.toLowerCase().includes(name.toLowerCase()));
      if (match) return match;
    }

    // 2. Try finding any English male voice
    const englishMaleVoice = voices.find(
      (v) => (v.lang.startsWith('en') || v.lang.startsWith('en-')) && /male/i.test(v.name)
    );
    if (englishMaleVoice) return englishMaleVoice;

    // 3. Try finding any default English voice
    const englishVoice = voices.find(
      (v) => v.lang.startsWith('en') && (v.default || !v.localService)
    ) || voices.find((v) => v.lang.startsWith('en'));
    if (englishVoice) return englishVoice;

    // 4. Default system fallback
    return voices.find((v) => v.default) || voices[0] || null;
  }
}

// Export singleton instance
export const bankaiVoice = new BankaiVoiceManager();
