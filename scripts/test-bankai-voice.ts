/**
 * BANKAI Voice Layer Automated State & Logic Tests
 */

import { bankaiVoice, type BankaiVoiceStateChange } from '../src/ai/bankaiVoice';
import { askPortfolioAssistant } from '../src/ai/portfolioAssistant';

// Mock Browser Environment for Node.js test runner
const originalWindow = (global as any).window;
const originalNavigator = (global as any).navigator;

let lastSpokenText = '';
let speechCancelled = false;

class MockSpeechSynthesisUtterance {
  text: string;
  voice: any = null;
  rate = 1.0;
  pitch = 1.0;
  volume = 1.0;
  onstart: (() => void) | null = null;
  onend: (() => void) | null = null;
  onerror: ((err: any) => void) | null = null;

  constructor(text: string) {
    this.text = text;
  }
}

const mockSpeechSynthesis = {
  getVoices: () => [
    { name: 'Google UK English Male', lang: 'en-GB', default: false, localService: false },
    { name: 'Daniel', lang: 'en-GB', default: true, localService: true }
  ],
  speak: (utterance: MockSpeechSynthesisUtterance) => {
    lastSpokenText = utterance.text;
    if (utterance.onstart) utterance.onstart();
    setTimeout(() => {
      if (utterance.onend) utterance.onend();
    }, 20);
  },
  cancel: () => {
    speechCancelled = true;
  },
  onvoiceschanged: null
};

class MockSpeechRecognition {
  continuous = false;
  interimResults = false;
  lang = 'en-US';
  maxAlternatives = 1;
  onstart: (() => void) | null = null;
  onresult: ((ev: any) => void) | null = null;
  onerror: ((ev: any) => void) | null = null;
  onend: (() => void) | null = null;

  start() {
    if (this.onstart) this.onstart();
  }

  abort() {
    if (this.onend) this.onend();
  }

  stop() {
    if (this.onend) this.onend();
  }
}

try {
  Object.defineProperty(global, 'navigator', {
    value: { language: 'en-US' },
    configurable: true,
    writable: true
  });
} catch {
  // safe fallback
}

try {
  Object.defineProperty(global, 'window', {
    value: {
      speechSynthesis: mockSpeechSynthesis,
      SpeechSynthesisUtterance: MockSpeechSynthesisUtterance,
      SpeechRecognition: MockSpeechRecognition,
      setTimeout: setTimeout,
      clearTimeout: clearTimeout
    },
    configurable: true,
    writable: true
  });
} catch {
  // safe fallback
}

async function runTests() {
  console.log('==================================================');
  console.log('RUNNING BANKAI VOICE AUTOMATED VERIFICATION TESTS');
  console.log('==================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`✔ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`✖ [FAIL] ${testName}`);
      failed++;
    }
  }

  // 1. Check initial state
  assert(bankaiVoice.getState() === 'idle', 'Initial state must be idle');

  // 2. Subscription state updates
  const stateHistory: string[] = [];
  const unsubscribe = bankaiVoice.subscribe((change: BankaiVoiceStateChange) => {
    stateHistory.push(change.state);
  });

  assert(stateHistory.includes('idle'), 'Subscription receives current idle state');

  // 3. Simulated Speech Recognition Flow
  let recognizedTranscript = '';
  bankaiVoice.startListening((transcript) => {
    recognizedTranscript = transcript;
  });

  assert(bankaiVoice.getState() === 'listening', 'State transitions to listening upon startListening');

  // Simulate Recognition Result
  const recInstance = (bankaiVoice as any).recognition;
  if (recInstance && recInstance.onresult) {
    recInstance.onresult({
      results: [[{ transcript: 'Tell me about Google Ads' }]]
    });
  }

  assert(recognizedTranscript === 'Tell me about Google Ads', 'Transcript captured accurately');

  // 4. Thinking state transition
  bankaiVoice.setThinking();
  assert(bankaiVoice.getState() === 'thinking', 'State transitions to thinking');

  // 5. Existing assistant query execution
  const assistantResult = await askPortfolioAssistant(recognizedTranscript);
  assert(assistantResult.targetSlug === 'skills/google-ads', 'Assistant resolves to skills/google-ads target slug');
  assert(assistantResult.text.includes('Google Ads'), 'Assistant response contains Google Ads');

  // 6. Text-to-speech execution
  bankaiVoice.speak(assistantResult.text);
  assert(bankaiVoice.getState() === 'speaking', 'State transitions to speaking on TTS start');

  // 7. Cancellation handling
  speechCancelled = false;
  bankaiVoice.cancelSpeech();
  assert(speechCancelled === true, 'SpeechSynthesis.cancel() invoked on cancel');
  assert(bankaiVoice.getState() === 'idle', 'State returns to idle after cancel');

  // 8. Stop listening handling
  bankaiVoice.startListening(() => {});
  assert(bankaiVoice.getState() === 'listening', 'State back to listening');
  bankaiVoice.stopListening();
  assert(bankaiVoice.getState() === 'idle', 'stopListening cleanly resets state to idle');

  unsubscribe();

  console.log('\n==================================================');
  console.log(`VOICE RESULTS: ${passed}/${passed + failed} PASSED (${failed} FAILED)`);
  console.log('==================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
