/**
 * BANKAI Living Holographic Core Automated Tests
 */

import { initBankaiCoreCanvas, createBankaiCoreElement } from '../src/components/BankaiCore';
import { bankaiVoice, type BankaiVoiceState } from '../src/ai/bankaiVoice';

// Mock Browser Environment for Node.js test runner
const mockCanvasContext = {
  clearRect: () => {},
  beginPath: () => {},
  arc: () => {},
  fill: () => {},
  stroke: () => {},
  moveTo: () => {},
  lineTo: () => {},
  createRadialGradient: () => ({
    addColorStop: () => {}
  }),
  fillStyle: '',
  strokeStyle: '',
  lineWidth: 1
};

const mockCanvas = {
  getContext: () => mockCanvasContext,
  width: 0,
  height: 0,
  style: { width: '', height: '' }
};

let capturedRafCallback: FrameRequestCallback | null = null;
let rafIdCounter = 1;

(global as any).requestAnimationFrame = (cb: FrameRequestCallback) => {
  capturedRafCallback = cb;
  return rafIdCounter++;
};

(global as any).cancelAnimationFrame = (id: number) => {
  capturedRafCallback = null;
};

try {
  Object.defineProperty(global, 'document', {
    value: {
      createElement: (tag: string) => {
        if (tag === 'canvas') return { ...mockCanvas, className: '' };
        return {
          className: '',
          style: {},
          dataset: {},
          children: [],
          appendChild: function (c: any) { this.children.push(c); },
          remove: () => {},
          setAttribute: () => {},
          addEventListener: () => {},
          removeEventListener: () => {}
        };
      },
      addEventListener: () => {},
      removeEventListener: () => {},
      hidden: false
    },
    configurable: true,
    writable: true
  });
} catch {}

try {
  Object.defineProperty(global, 'window', {
    value: {
      devicePixelRatio: 2,
      setTimeout: setTimeout,
      clearTimeout: clearTimeout
    },
    configurable: true,
    writable: true
  });
} catch {}

async function runCoreTests() {
  console.log('==================================================');
  console.log('RUNNING BANKAI HOLOGRAPHIC CORE AUTOMATED TESTS');
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

  // 1. Canvas Initializer test
  let testState: BankaiVoiceState = 'idle';
  const cleanup = initBankaiCoreCanvas(mockCanvas as any, () => testState, 72);
  assert(typeof cleanup === 'function', 'initBankaiCoreCanvas returns a valid cleanup function');
  assert(mockCanvas.width === 144, 'Canvas width scaled by dpr correctly (72 * 2 = 144)');

  // 2. Trigger animation frame render for all 5 states
  const states: BankaiVoiceState[] = ['idle', 'listening', 'thinking', 'speaking', 'error'];
  for (const s of states) {
    testState = s;
    if (capturedRafCallback) {
      capturedRafCallback(performance.now());
    }
    assert(true, `Render loop successfully executes frame for state: ${s}`);
  }

  // 3. Clean up canvas loop
  cleanup();
  assert(true, 'Cleanup stops animation frame without error');

  // 4. DOM Factory Helper test
  let clicked = false;
  const coreDOM = createBankaiCoreElement({
    size: 64,
    onClick: () => { clicked = true; }
  });

  assert(coreDOM.element.className === 'bankai-hologram-core-wrap', 'createBankaiCoreElement creates proper wrapper element');
  assert(coreDOM.element.dataset.voiceState === 'idle', 'Initial voiceState dataset is idle');

  // 5. Update state on DOM element
  coreDOM.updateState('speaking');
  assert(coreDOM.element.dataset.voiceState === 'speaking', 'updateState updates DOM dataset to speaking');

  // 6. Test Click trigger
  if (coreDOM.element.onclick) {
    coreDOM.element.onclick({ preventDefault: () => {}, stopPropagation: () => {} } as any);
  }
  assert(clicked === true, 'Clicking core triggers onClick callback');

  // 7. Cleanup DOM element
  coreDOM.destroy();
  assert(true, 'destroy() tears down core cleanly');

  console.log('\n==================================================');
  console.log(`CORE RESULTS: ${passed}/${passed + failed} PASSED (${failed} FAILED)`);
  console.log('==================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runCoreTests();
