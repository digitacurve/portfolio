/**
 * BANKAI Living Holographic Core Component
 * 
 * 3D Holographic Particle Sphere made from a dense field of luminous,
 * self-organizing quantum dots. Features genuine volumetric depth,
 * Fresnel silhouette luminescence, atmospheric energy aura, and state-driven
 * organic deformation responding to voice (idle, listening, thinking, speaking).
 * 
 * - High-efficiency 2D Canvas + 3D mathematical projection (Zero WebGL context contention)
 * - Single source of truth: Consumes BankaiVoiceState only
 * - Lightweight, capped devicePixelRatio, pauses on background tabs
 * - Dual export: React component `<BankaiCore />` & DOM helper `createBankaiCoreElement()`
 */

import React, { useEffect, useRef } from 'react';
import { type BankaiVoiceState, bankaiVoice } from '../ai/bankaiVoice';

export interface BankaiCoreProps {
  state?: BankaiVoiceState;
  size?: number;
  onClick?: () => void;
  className?: string;
}

interface SphereParticle {
  // Baseline spherical coordinates
  theta: number;        // Azimuth angle [0, 2pi]
  phi: number;          // Polar angle [-pi/2, pi/2]
  baseRadius: number;   // Radial ratio [0.2 to 1.0]
  type: 'surface' | 'volume' | 'corona';
  
  // Individual organic variation
  orbitSpeed: number;
  flowPhase: number;
  noiseFreq: number;
  baseSize: number;
  colorType: 'cyan' | 'blue' | 'violet' | 'white';
}

/**
 * Generates an ultra-dense spherical particle field with Fibonacci spiral surface
 * distribution, internal volumetric lattice, and outer corona energy field.
 */
function createSphereParticleField(totalParticles = 880): SphereParticle[] {
  const particles: SphereParticle[] = [];
  const goldenRatio = (1 + Math.sqrt(5)) / 2;

  const surfaceCount = Math.floor(totalParticles * 0.65); // 65% on surface shell
  const volumeCount = Math.floor(totalParticles * 0.25);  // 25% in interior volume
  const coronaCount = totalParticles - surfaceCount - volumeCount; // 10% in atmospheric corona

  // 1. Surface Shell Particles (Fibonacci spherical distribution)
  for (let i = 0; i < surfaceCount; i++) {
    const y = 1 - (i / (surfaceCount - 1)) * 2; // y goes from 1 to -1
    const theta = 2 * Math.PI * i / goldenRatio;
    const phi = Math.asin(Math.max(-1, Math.min(1, y)));

    const rand = Math.random();
    let colorType: 'cyan' | 'blue' | 'violet' | 'white' = 'cyan';
    if (rand < 0.45) colorType = 'cyan';
    else if (rand < 0.70) colorType = 'blue';
    else if (rand < 0.88) colorType = 'violet';
    else colorType = 'white';

    particles.push({
      theta,
      phi,
      baseRadius: 0.95 + (Math.random() - 0.5) * 0.08,
      type: 'surface',
      orbitSpeed: (0.35 + Math.random() * 0.3) * (Math.random() > 0.5 ? 1 : -1),
      flowPhase: Math.random() * Math.PI * 2,
      noiseFreq: 2.0 + Math.random() * 3.0,
      baseSize: colorType === 'white' ? 1.4 : 0.85 + Math.random() * 0.6,
      colorType
    });
  }

  // 2. Interior Volumetric Core Particles (Layered radial distribution)
  for (let i = 0; i < volumeCount; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0) - Math.PI / 2;
    // Cube root distribution for uniform spherical volume density
    const r = 0.25 + Math.cbrt(Math.random()) * 0.65;

    const rand = Math.random();
    let colorType: 'cyan' | 'blue' | 'violet' | 'white' = 'blue';
    if (rand < 0.40) colorType = 'blue';
    else if (rand < 0.75) colorType = 'violet';
    else if (rand < 0.90) colorType = 'cyan';
    else colorType = 'white';

    particles.push({
      theta,
      phi,
      baseRadius: r,
      type: 'volume',
      orbitSpeed: (0.4 + Math.random() * 0.4) * (Math.random() > 0.5 ? 1 : -1),
      flowPhase: Math.random() * Math.PI * 2,
      noiseFreq: 1.5 + Math.random() * 2.0,
      baseSize: 0.7 + Math.random() * 0.5,
      colorType
    });
  }

  // 3. Outer Corona / Atmosphere Particles (Escaping and returning plasma filaments)
  for (let i = 0; i < coronaCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = (Math.random() - 0.5) * Math.PI;
    const r = 1.05 + Math.random() * 0.28;

    particles.push({
      theta,
      phi,
      baseRadius: r,
      type: 'corona',
      orbitSpeed: (0.6 + Math.random() * 0.5) * (Math.random() > 0.5 ? 1 : -1),
      flowPhase: Math.random() * Math.PI * 2,
      noiseFreq: 3.0 + Math.random() * 3.0,
      baseSize: 0.6 + Math.random() * 0.5,
      colorType: Math.random() > 0.4 ? 'cyan' : 'white'
    });
  }

  return particles;
}

/**
 * Creates and initializes the Holographic Particle Sphere canvas rendering loop
 */
export function initBankaiCoreCanvas(
  canvas: HTMLCanvasElement,
  getState: () => BankaiVoiceState,
  size = 72
): () => void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2);
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  canvas.style.width = `${size}px`;
  canvas.style.height = `${size}px`;

  const particles = createSphereParticleField(920);

  let animFrameId: number | null = null;
  let isRunning = true;
  let time = 0;

  // Rotation angles for multiple harmonic axes
  let rotY = 0;
  let rotX = 0.22;
  let rotZ = 0.12;

  function render() {
    if (!isRunning || !ctx) return;

    const state = getState();
    const cx = (size * dpr) / 2;
    const cy = (size * dpr) / 2;
    const sphereRadius = (size * dpr) * 0.38; // Radius of main holographic sphere

    // -------------------------------------------------------------
    // Voice State Dynamics & Physical Parameters
    // -------------------------------------------------------------
    let speedMult = 1.0;
    let breathScale = 1.0;
    let waveAmplitude = 0.03;
    let energyGlow = 0.25;
    let speakingDeform = 0;
    let thinkingTurbulence = 0;

    switch (state) {
      case 'wake-ready':
        speedMult = 1.35;
        breathScale = 1.04 + Math.sin(time * 2.8) * 0.04;
        waveAmplitude = 0.06;
        energyGlow = 0.35;
        break;

      case 'listening':
        // Listening: Expands slightly, energetic ripple waves responding to audio input
        speedMult = 2.0;
        breathScale = 1.09 + Math.sin(time * 4.2) * 0.055;
        waveAmplitude = 0.12;
        energyGlow = 0.45;
        break;

      case 'thinking':
        // Thinking: High internal swirl, turbulent vortex currents, purple/cyan surges
        speedMult = 2.6;
        breathScale = 1.01 + Math.sin(time * 5.5) * 0.035;
        waveAmplitude = 0.09;
        thinkingTurbulence = 1.0;
        energyGlow = 0.40;
        break;

      case 'speaking':
        // Speaking: Strongest reaction — organic physical vocal deformation & harmonic pulses
        speedMult = 1.9;
        speakingDeform = Math.sin(time * 6.5) * 0.08 + Math.sin(time * 13.2) * 0.045 + Math.cos(time * 9.1) * 0.035;
        breathScale = 1.08 + speakingDeform;
        waveAmplitude = 0.18;
        energyGlow = 0.52;
        break;

      case 'error':
        speedMult = 0.7;
        breathScale = 0.95 + Math.sin(time * 1.6) * 0.02;
        waveAmplitude = 0.04;
        energyGlow = 0.25;
        break;

      case 'idle':
      default:
        // Idle: Slow, elegant organic movement, peaceful breathing
        speedMult = 1.0;
        breathScale = 1.0 + Math.sin(time * 1.8) * 0.028;
        waveAmplitude = 0.035;
        energyGlow = 0.24;
        break;
    }

    const dt = 0.016 * speedMult;
    time += dt;
    rotY += 0.012 * speedMult;
    rotX = 0.22 + Math.sin(time * 0.5) * 0.08;
    rotZ = 0.12 + Math.cos(time * 0.4) * 0.06;

    ctx.clearRect(0, 0, size * dpr, size * dpr);

    // -------------------------------------------------------------
    // 1. Volumetric Atmosphere & Silhouette Glow Background
    // -------------------------------------------------------------
    const auraRadius = sphereRadius * 1.45 * breathScale;
    const auraGrad = ctx.createRadialGradient(cx, cy, sphereRadius * 0.25, cx, cy, auraRadius);

    if (state === 'thinking') {
      auraGrad.addColorStop(0, `rgba(186, 124, 222, ${energyGlow * 0.85})`);
      auraGrad.addColorStop(0.6, `rgba(0, 229, 255, ${energyGlow * 0.4})`);
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    } else if (state === 'error') {
      auraGrad.addColorStop(0, `rgba(255, 159, 10, ${energyGlow * 0.9})`);
      auraGrad.addColorStop(0.6, `rgba(255, 69, 58, ${energyGlow * 0.4})`);
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    } else {
      auraGrad.addColorStop(0, `rgba(0, 180, 255, ${energyGlow * 0.5})`);
      auraGrad.addColorStop(0.65, `rgba(0, 240, 255, ${energyGlow * 0.8})`);
      auraGrad.addColorStop(0.95, `rgba(0, 229, 255, ${energyGlow * 0.2})`);
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    }

    ctx.fillStyle = auraGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, auraRadius, 0, Math.PI * 2);
    ctx.fill();

    // -------------------------------------------------------------
    // 2. Projected 3D Holographic Particle Swarm
    // -------------------------------------------------------------
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);
    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);
    const cosZ = Math.cos(rotZ);
    const sinZ = Math.sin(rotZ);

    const currentRadius = sphereRadius * breathScale;

    // Use additive blending for dazzling glowing star-field luminescence
    ctx.globalCompositeOperation = 'lighter';

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Dynamic orbital motion & flow vectors
      let curTheta = p.theta + (p.orbitSpeed * dt * 2.0);
      let curPhi = p.phi;

      // Thinking: Counter-rotating latitude vortex swirls
      if (thinkingTurbulence > 0) {
        const swirlDir = curPhi > 0 ? 1 : -1;
        curTheta += swirlDir * 0.03 * speedMult;
      }

      // Surface organic harmonic waves (ripples across spherical surface)
      const wave = Math.sin(curTheta * p.noiseFreq + time * 3.2 + p.flowPhase) *
                   Math.cos(curPhi * p.noiseFreq - time * 2.5) * waveAmplitude;

      // Speaking: Harmonic vocal waves & particle ejection / pull-back
      let vocalPulse = 0;
      if (state === 'speaking') {
        vocalPulse = Math.sin(curTheta * 4.0 + time * 8.0) * Math.cos(curPhi * 3.0 - time * 6.0) * 0.12;
        if (p.type === 'corona' && Math.sin(time * 5.0 + i) > 0.6) {
          vocalPulse += 0.25 * Math.sin(time * 10.0 + i);
        }
      }

      // Compute local 3D point
      const r = currentRadius * (p.baseRadius + wave + vocalPulse);
      const cosPhi = Math.cos(curPhi);
      const sinPhi = Math.sin(curPhi);

      const x0 = Math.cos(curTheta) * cosPhi * r;
      const y0 = sinPhi * r;
      const z0 = Math.sin(curTheta) * cosPhi * r;

      // 3D Matrix Rotation (Y -> X -> Z)
      // Rotate Y
      const x1 = x0 * cosY + z0 * sinY;
      const z1 = -x0 * sinY + z0 * cosY;

      // Rotate X
      const y2 = y0 * cosX - z1 * sinX;
      const z2 = y0 * sinX + z1 * cosX;

      // Rotate Z
      const x3 = x1 * cosZ - y2 * sinZ;
      const y3 = x1 * sinZ + y2 * cosZ;
      const z3 = z2;

      // Perspective projection & Depth parameters
      // z3 > 0 is front facing; z3 < 0 is back facing
      const normalizedZ = z3 / currentRadius; // [-1.2 to +1.2]
      const depthFactor = (normalizedZ + 1.2) / 2.4; // [0.0 (deep back) to 1.0 (front)]

      // Fresnel Silhouette Edge Enhancement:
      // Points near the 2D outer rim (perpendicular to viewing ray) glow with highest density
      const distFromCenter2D = Math.sqrt(x3 * x3 + y3 * y3) / currentRadius;
      const edgeFactor = Math.min(1.0, Math.pow(distFromCenter2D, 2.2));

      // Calculate particle luminescence & alpha
      let alpha = 0.25 + depthFactor * 0.45 + edgeFactor * 0.4;
      alpha = Math.max(0.08, Math.min(1.0, alpha));

      // Particle rendered size with depth scaling
      let pDrawSize = p.baseSize * dpr * (0.65 + depthFactor * 0.6);
      if (p.type === 'surface' && edgeFactor > 0.8) {
        pDrawSize *= 1.2; // Pronounced outer edge micro-dots
      }

      // Color mapping with state tints
      let colorStr: string;
      if (state === 'thinking') {
        if (p.colorType === 'white' && depthFactor > 0.6) {
          colorStr = `rgba(255, 255, 255, ${alpha})`;
        } else if (p.colorType === 'violet' || (i % 3 === 0)) {
          colorStr = `rgba(200, 140, 255, ${alpha})`;
        } else {
          colorStr = `rgba(0, 229, 255, ${alpha * 0.8})`;
        }
      } else if (state === 'error') {
        colorStr = p.colorType === 'white'
          ? `rgba(255, 255, 255, ${alpha})`
          : `rgba(255, 120, 20, ${alpha})`;
      } else {
        // Cyan / Electric Blue / Violet / White core palette
        if (p.colorType === 'white' && depthFactor > 0.5) {
          colorStr = `rgba(255, 255, 255, ${alpha})`;
        } else if (p.colorType === 'cyan') {
          colorStr = `rgba(0, 247, 255, ${alpha})`;
        } else if (p.colorType === 'blue') {
          colorStr = `rgba(0, 140, 255, ${alpha})`;
        } else {
          colorStr = `rgba(186, 124, 222, ${alpha * 0.9})`;
        }
      }

      // Draw glowing luminous micro-particle
      ctx.fillStyle = colorStr;
      ctx.beginPath();
      ctx.arc(cx + x3, cy + y3, pDrawSize, 0, Math.PI * 2);
      ctx.fill();
    }

    // -------------------------------------------------------------
    // 3. Dense Edge Silhouette Ring (Luminous Circular Horizon)
    // -------------------------------------------------------------
    const rimRadius = currentRadius * 0.98;
    ctx.beginPath();
    ctx.arc(cx, cy, rimRadius, 0, Math.PI * 2);
    ctx.lineWidth = 1.0 * dpr;
    if (state === 'thinking') {
      ctx.strokeStyle = `rgba(186, 124, 222, ${0.35 * energyGlow})`;
    } else if (state === 'error') {
      ctx.strokeStyle = `rgba(255, 159, 10, ${0.4 * energyGlow})`;
    } else {
      ctx.strokeStyle = `rgba(0, 240, 255, ${0.45 * energyGlow})`;
    }
    ctx.stroke();

    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';

    animFrameId = requestAnimationFrame(render);
  }

  // Handle visibility state for power saving
  const handleVisibility = () => {
    if (document.hidden) {
      if (animFrameId !== null) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
    } else if (isRunning && animFrameId === null) {
      animFrameId = requestAnimationFrame(render);
    }
  };

  document.addEventListener('visibilitychange', handleVisibility);
  animFrameId = requestAnimationFrame(render);

  return () => {
    isRunning = false;
    if (animFrameId !== null) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
    document.removeEventListener('visibilitychange', handleVisibility);
  };
}

/**
 * Creates a native DOM element containing the BANKAI holographic core
 */
export function createBankaiCoreElement(options: {
  size?: number;
  onClick?: () => void;
  initialState?: BankaiVoiceState;
} = {}): {
  element: HTMLElement;
  updateState: (state: BankaiVoiceState) => void;
  destroy: () => void;
} {
  const size = options.size || 68;
  const container = document.createElement('div');
  container.className = 'bankai-hologram-core-wrap';
  container.setAttribute('role', 'button');
  container.setAttribute('tabindex', '0');
  container.setAttribute('aria-label', 'BANKAI Holographic Particle Core');

  const canvas = document.createElement('canvas');
  canvas.className = 'bankai-hologram-canvas';
  container.appendChild(canvas);

  let currentState: BankaiVoiceState = options.initialState || bankaiVoice.getState();
  container.dataset.voiceState = currentState;

  if (options.onClick) {
    container.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      options.onClick!();
    };
    container.onkeydown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        options.onClick!();
      }
    };
  }

  const cleanupCanvas = initBankaiCoreCanvas(canvas, () => currentState, size);

  return {
    element: container,
    updateState: (newState: BankaiVoiceState) => {
      currentState = newState;
      container.dataset.voiceState = newState;
    },
    destroy: () => {
      cleanupCanvas();
      container.remove();
    }
  };
}

/**
 * React Component Export
 */
export const BankaiCore: React.FC<BankaiCoreProps> = ({
  state,
  size = 72,
  onClick,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const internalStateRef = useRef<BankaiVoiceState>(state || bankaiVoice.getState());

  useEffect(() => {
    if (state !== undefined) {
      internalStateRef.current = state;
    }
  }, [state]);

  useEffect(() => {
    // If no explicit state prop passed, subscribe to BankaiVoiceManager singleton
    if (state === undefined) {
      const unsubscribe = bankaiVoice.subscribe((change) => {
        internalStateRef.current = change.state;
      });
      return unsubscribe;
    }
  }, [state]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cleanup = initBankaiCoreCanvas(canvas, () => internalStateRef.current, size);
    return cleanup;
  }, [size]);

  return (
    <div
      className={`bankai-hologram-core-wrap ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : 'presentation'}
      tabIndex={onClick ? 0 : -1}
      aria-label="BANKAI Holographic Particle Core"
      data-voice-state={state || bankaiVoice.getState()}
    >
      <canvas ref={canvasRef} className="bankai-hologram-canvas" />
    </div>
  );
};
