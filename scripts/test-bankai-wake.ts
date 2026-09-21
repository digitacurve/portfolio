/**
 * BANKAI Wake-Word Layer Automated Test Suite
 * 
 * Verifies all 24 requirements of the browser-native managed "BANKAI" keyword detection engine.
 */

import { BankaiWakeDetector, WAKE_PHONETIC_VARIANTS } from '../src/ai/bankaiWake';
import { bankaiVoice } from '../src/ai/bankaiVoice';
import { askPortfolioAssistant } from '../src/ai/portfolioAssistant';

// Mock Browser Environment for Node.js
class MockSpeechRecognitionInstance {
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
  Object.defineProperty(global, 'window', {
    value: {
      SpeechRecognition: MockSpeechRecognitionInstance,
      setTimeout: setTimeout,
      clearTimeout: clearTimeout,
      speechSynthesis: {
        speak: () => {},
        cancel: () => {},
        getVoices: () => []
      }
    },
    configurable: true,
    writable: true
  });
} catch {}

try {
  Object.defineProperty(global, 'document', {
    value: {
      hidden: false,
      addEventListener: () => {},
      removeEventListener: () => {}
    },
    configurable: true,
    writable: true
  });
} catch {}

async function runWakeTests() {
  console.log('==================================================');
  console.log('RUNNING BANKAI WAKE-WORD ARCHITECTURE TEST SUITE');
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

  const detector = new BankaiWakeDetector();

  // Test 1: Exact "bankai"
  assert(detector.parseWakeUtterance('bankai').detected === true, '1. Exact "bankai" detected');

  // Test 2: "BANKAI" (Uppercase)
  assert(detector.parseWakeUtterance('BANKAI').detected === true, '2. "BANKAI" uppercase detected');

  // Test 3: "bank eye"
  assert(detector.parseWakeUtterance('bank eye').detected === true, '3. "bank eye" phonetic variant detected');

  // Test 4: "ban kai"
  assert(detector.parseWakeUtterance('ban kai').detected === true, '4. "ban kai" phonetic variant detected');

  // Test 5: "bank i"
  assert(detector.parseWakeUtterance('bank i').detected === true, '5. "bank i" phonetic variant detected');

  // Test 6: "bunk eye"
  assert(detector.parseWakeUtterance('bunk eye').detected === true, '6. "bunk eye" phonetic variant detected');

  // Test 7: "bunkai"
  assert(detector.parseWakeUtterance('bunkai').detected === true, '7. "bunkai" phonetic variant detected');

  // Test 8: "bonzai"
  assert(detector.parseWakeUtterance('bonzai').detected === true, '8. "bonzai" phonetic variant detected');

  // Test 9: "bang kai"
  assert(detector.parseWakeUtterance('bang kai').detected === true, '9. "bang kai" phonetic variant detected');

  // Test 10: "bank-ai"
  assert(detector.parseWakeUtterance('bank-ai').detected === true, '10. "bank-ai" phonetic variant detected');

  // Test 11: Compound query extraction
  const compound1 = detector.parseWakeUtterance('BANKAI show me your projects');
  assert(
    compound1.detected === true && compound1.extractedQuery === 'show me your projects',
    '11. Compound query "BANKAI show me your projects" extracts "show me your projects"'
  );

  // Test 12: Leading punctuation
  const compound2 = detector.parseWakeUtterance('...BANKAI, what services do you offer?');
  assert(
    compound2.detected === true && compound2.extractedQuery === 'what services do you offer',
    '12. Leading punctuation properly stripped and matched'
  );

  // Test 13: Mixed casing
  const compound3 = detector.parseWakeUtterance('bAnK eYe tell me about SEO');
  assert(
    compound3.detected === true && compound3.extractedQuery === 'tell me about seo',
    '13. Mixed casing phonetic compound query matched'
  );

  // Test 14: Extra whitespace
  const compound4 = detector.parseWakeUtterance('   ban   kai     how can I contact Vivek?   ');
  assert(
    compound4.detected === true && compound4.extractedQuery === 'how can i contact vivek',
    '14. Extra whitespace normalized properly'
  );

  // Test 15: Non-BANKAI speech rejection
  const negative1 = detector.parseWakeUtterance('Hey Siri what is the weather today');
  assert(negative1.detected === false, '15. Non-BANKAI speech "Hey Siri..." rejected');

  // Test 16: Standalone "bank" rejection
  const negative2 = detector.parseWakeUtterance('I want to go to the bank');
  assert(negative2.detected === false, '16. Standalone "bank" rejected');

  // Test 17: Empty transcript
  assert(detector.parseWakeUtterance('').detected === false, '17. Empty transcript rejected');

  // Test 18: Visibility lifecycle (pause on hidden)
  detector.enableWakeDetection(() => {});
  detector.pause();
  assert(detector.isWakeEnabled() === true, '18. Visibility pause leaves wake enabled state true');

  // Test 19: Disable immediately stops detection
  detector.disableWakeDetection();
  assert(detector.isWakeEnabled() === false, '19. Disable immediately sets isWakeEnabled to false');

  // Test 20: Unsupported browser handling
  const originalSpeechRec = (global as any).window.SpeechRecognition;
  (global as any).window.SpeechRecognition = null;
  (global as any).window.webkitSpeechRecognition = null;
  const unsupportedDetector = new BankaiWakeDetector();
  assert(unsupportedDetector.isWakeSupported() === false, '20. Unsupported browser correctly returns isWakeSupported=false');
  assert(unsupportedDetector.enableWakeDetection(() => {}) === false, '20. enableWakeDetection returns false when unsupported');
  (global as any).window.SpeechRecognition = originalSpeechRec;

  // Test 21: Permission denied handling
  let permErrorDetector = new BankaiWakeDetector();
  permErrorDetector.enableWakeDetection(() => {});
  const mockRec = (permErrorDetector as any).recognition;
  if (mockRec && mockRec.onerror) {
    mockRec.onerror({ error: 'not-allowed' });
  }
  assert(permErrorDetector.isWakeEnabled() === false, '21. Permission denied (not-allowed) shuts down wake mode');

  // Test 22: Query extraction does not accidentally remove normal words
  const compound5 = detector.parseWakeUtterance('bankai banking services');
  assert(
    compound5.detected === true && compound5.extractedQuery === 'banking services',
    '22. Query extraction preserves subsequent words ("banking services")'
  );

  // Test 23: Standalone BANKAI integration with BankaiVoiceManager transitions to listening
  let receivedQuery = '';
  bankaiVoice.enableWakeMode((q) => {
    receivedQuery = q;
  });

  assert(bankaiVoice.getState() === 'wake-ready', '23. BankaiVoiceManager state is wake-ready when wake mode enabled');

  // Trigger standalone wake event
  (bankaiVoice as any).handleWakeTrigger({
    detected: true,
    rawTranscript: 'bankai',
    normalizedTranscript: 'bankai',
    extractedQuery: ''
  });

  assert(bankaiVoice.getState() === 'listening', '23. Standalone BANKAI triggers listening state in BankaiVoiceManager');

  // Test 24: Compound query reaches existing query pipeline exactly once
  let queryExecutionCount = 0;
  bankaiVoice.enableWakeMode((q) => {
    queryExecutionCount++;
    receivedQuery = q;
  });

  (bankaiVoice as any).handleWakeTrigger({
    detected: true,
    rawTranscript: 'bankai tell me about Google Ads',
    normalizedTranscript: 'bankai tell me about google ads',
    extractedQuery: 'tell me about Google Ads'
  });

  assert(queryExecutionCount === 1, '24. Compound query invokes query callback exactly once');
  assert(receivedQuery === 'tell me about Google Ads', '24. Query payload transferred accurately');

  // Clean up
  bankaiVoice.disableWakeMode();
  assert(bankaiVoice.getState() === 'idle', 'BankaiVoiceManager returns to idle after wake mode disabled');

  console.log('\n==================================================');
  console.log(`WAKE RESULTS: ${passed}/${passed + failed} PASSED (${failed} FAILED)`);
  console.log('==================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runWakeTests();
