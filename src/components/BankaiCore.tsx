/**
 * BANKAI Living Holographic Core Component (Phase 2)
 * 
 * Futuristic holographic energy core with 3D projected gyroscopic rings,
 * orbiting quantum particles, and state-driven energy field dynamics.
 * 
 * - Zero WebGL context contention (High-efficiency 2D Canvas + 3D mathematical projection)
 * - Single source of truth: Consumes BankaiVoiceState only
 * - Lightweight, capped devicePixelRatio, pauses on background tabs
 * - Dual export: React component `<BankaiCore />` & DOM mount helper `createBankaiCoreElement()`
 */

import React, { useEffect, useRef } from 'react';
import { type BankaiVoiceState, bankaiVoice } from '../ai/bankaiVoice';

export interface BankaiCoreProps {
  state?: BankaiVoiceState;
  size?: number;
  onClick?: () => void;
  className?: string;
}

interface Particle3D {
  theta: number;
  phi: number;
  radius: number;
  speed: number;
  size: number;
  color: string;
}

/**
 * Creates and initializes the holographic canvas rendering loop
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

  // Initialize 16 3D orbiting particles
  const particles: Particle3D[] = [];
  const particleColors = ['#00e5ff', '#ffffff', '#7df9ff', '#ba7cde'];
  for (let i = 0; i < 16; i++) {
    particles.push({
      theta: Math.random() * Math.PI * 2,
      phi: (Math.random() - 0.5) * Math.PI,
      radius: size * (0.32 + Math.random() * 0.12),
      speed: (0.015 + Math.random() * 0.015) * (Math.random() > 0.5 ? 1 : -1),
      size: 1.0 + Math.random() * 1.5,
      color: particleColors[i % particleColors.length]
    });
  }

  let animFrameId: number | null = null;
  let isRunning = true;
  let time = 0;

  // 3D rotation helper
  function rotate3D(x: number, y: number, z: number, rx: number, ry: number, rz: number): [number, number, number] {
    // Rotate X
    const cosX = Math.cos(rx);
    const sinX = Math.sin(rx);
    const y1 = y * cosX - z * sinX;
    const z1 = y * sinX + z * cosX;

    // Rotate Y
    const cosY = Math.cos(ry);
    const sinY = Math.sin(ry);
    const x2 = x * cosY + z1 * sinY;
    const z2 = -x * sinY + z1 * cosY;

    // Rotate Z
    const cosZ = Math.cos(rz);
    const sinZ = Math.sin(rz);
    const x3 = x2 * cosZ - y1 * sinZ;
    const y3 = x2 * sinZ + y1 * cosZ;

    return [x3, y3, z2];
  }

  function render() {
    if (!isRunning || !ctx) return;

    const state = getState();
    const cx = (size * dpr) / 2;
    const cy = (size * dpr) / 2;
    const baseR = (size * dpr) * 0.32;

    // State-specific motion dynamics
    let speedMult = 1.0;
    let pulseScale = 1.0;
    let coreColor = '#00e5ff';
    let auraAlpha = 0.18;

    switch (state) {
      case 'wake-ready':
        speedMult = 1.15;
        pulseScale = 1.02 + Math.sin(time * 2.4) * 0.035;
        coreColor = '#00f7ff';
        auraAlpha = 0.24;
        break;
      case 'listening':
        speedMult = 1.8;
        pulseScale = 1.06 + Math.sin(time * 3.5) * 0.05;
        coreColor = '#00f0ff';
        auraAlpha = 0.35;
        break;
      case 'thinking':
        speedMult = 2.4;
        pulseScale = 0.98 + Math.sin(time * 5.0) * 0.03;
        coreColor = '#ba7cde';
        auraAlpha = 0.28;
        break;
      case 'speaking':
        speedMult = 1.6;
        // Harmonic vocal simulation
        pulseScale = 1.04 + Math.sin(time * 4.2) * 0.06 + Math.sin(time * 8.4) * 0.03;
        coreColor = '#00e5ff';
        auraAlpha = 0.32;
        break;
      case 'error':
        speedMult = 0.6;
        pulseScale = 0.96 + Math.sin(time * 1.5) * 0.02;
        coreColor = '#ff9f0a';
        auraAlpha = 0.22;
        break;
      case 'idle':
      default:
        speedMult = 1.0;
        pulseScale = 1.0 + Math.sin(time * 1.8) * 0.025;
        coreColor = '#00e5ff';
        auraAlpha = 0.18;
        break;
    }

    time += 0.016 * speedMult;

    ctx.clearRect(0, 0, size * dpr, size * dpr);

    // 1. Atmospheric Volumetric Glow
    const auraRadius = baseR * 1.6 * pulseScale;
    const auraGrad = ctx.createRadialGradient(cx, cy, baseR * 0.2, cx, cy, auraRadius);
    if (state === 'thinking') {
      auraGrad.addColorStop(0, `rgba(186, 124, 222, ${auraAlpha * 1.2})`);
      auraGrad.addColorStop(0.5, `rgba(0, 229, 255, ${auraAlpha * 0.6})`);
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    } else if (state === 'error') {
      auraGrad.addColorStop(0, `rgba(255, 159, 10, ${auraAlpha * 1.2})`);
      auraGrad.addColorStop(0.6, `rgba(255, 69, 58, ${auraAlpha * 0.5})`);
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    } else if (state === 'wake-ready') {
      auraGrad.addColorStop(0, `rgba(0, 247, 255, ${auraAlpha * 1.35})`);
      auraGrad.addColorStop(0.5, `rgba(0, 200, 255, ${auraAlpha * 0.7})`);
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    } else {
      auraGrad.addColorStop(0, `rgba(0, 229, 255, ${auraAlpha * 1.3})`);
      auraGrad.addColorStop(0.5, `rgba(0, 180, 255, ${auraAlpha * 0.5})`);
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    }
    ctx.fillStyle = auraGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, auraRadius, 0, Math.PI * 2);
    ctx.fill();

    // 2. Draw 3D Gyroscopic Orbital Rings
    const rings = [
      { rx: 0.85, ry: time * 0.8, rz: 0.2, r: baseR * 1.05 * pulseScale, segments: 40, width: 1.5 },
      { rx: -0.6, ry: -time * 1.1, rz: time * 0.4, r: baseR * 0.92 * pulseScale, segments: 36, width: 1.2 },
      { rx: time * 0.5, ry: 0.9, rz: -time * 0.7, r: baseR * 1.18 * pulseScale, segments: 44, width: 1.0 }
    ];

    rings.forEach((ring, rIdx) => {
      const pts: { x: number; y: number; z: number }[] = [];
      for (let s = 0; s <= ring.segments; s++) {
        const theta = (s / ring.segments) * Math.PI * 2;
        const x0 = Math.cos(theta) * ring.r;
        const y0 = Math.sin(theta) * ring.r;
        const z0 = 0;
        const [x1, y1, z1] = rotate3D(x0, y0, z0, ring.rx, ring.ry, ring.rz);
        pts.push({ x: cx + x1, y: cy + y1, z: z1 });
      }

      // Draw ring segments with depth luminescence
      for (let i = 0; i < pts.length - 1; i++) {
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const avgZ = (p1.z + p2.z) / 2;
        const depthAlpha = Math.max(0.12, Math.min(0.95, 0.5 + avgZ / (baseR * 2)));

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineWidth = ring.width * (0.8 + depthAlpha * 0.6) * dpr;

        if (rIdx === 1 && state === 'thinking') {
          ctx.strokeStyle = `rgba(186, 124, 222, ${depthAlpha * 0.9})`;
        } else if (state === 'error') {
          ctx.strokeStyle = `rgba(255, 159, 10, ${depthAlpha * 0.85})`;
        } else {
          ctx.strokeStyle = `rgba(0, 229, 255, ${depthAlpha * 0.9})`;
        }
        ctx.stroke();
      }
    });

    // 3. Central Energy Core Singularity
    const coreR = baseR * 0.38 * pulseScale;
    const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
    if (state === 'thinking') {
      coreGrad.addColorStop(0, '#ffffff');
      coreGrad.addColorStop(0.4, '#e0b0ff');
      coreGrad.addColorStop(0.8, '#ba7cde');
      coreGrad.addColorStop(1, 'rgba(186, 124, 222, 0)');
    } else if (state === 'error') {
      coreGrad.addColorStop(0, '#ffffff');
      coreGrad.addColorStop(0.4, '#ffd166');
      coreGrad.addColorStop(0.8, '#ff9f0a');
      coreGrad.addColorStop(1, 'rgba(255, 159, 10, 0)');
    } else {
      coreGrad.addColorStop(0, '#ffffff');
      coreGrad.addColorStop(0.35, '#80f2ff');
      coreGrad.addColorStop(0.75, coreColor);
      coreGrad.addColorStop(1, 'rgba(0, 229, 255, 0)');
    }
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
    ctx.fill();

    // 4. Orbiting Quantum Particle Swarm
    particles.forEach((p) => {
      p.theta += p.speed * speedMult;
      const x0 = Math.cos(p.theta) * Math.cos(p.phi) * p.radius * pulseScale;
      const y0 = Math.sin(p.theta) * Math.cos(p.phi) * p.radius * pulseScale;
      const z0 = Math.sin(p.phi) * p.radius * pulseScale;

      const [px, py, pz] = rotate3D(x0, y0, z0, 0.4, time * 0.6, 0.2);
      const depthAlpha = Math.max(0.2, Math.min(1.0, 0.55 + pz / (baseR * 2)));
      const pDrawSize = p.size * (0.8 + depthAlpha * 0.5) * dpr;

      ctx.beginPath();
      ctx.arc(cx + px, cy + py, pDrawSize, 0, Math.PI * 2);
      if (state === 'thinking') {
        ctx.fillStyle = depthAlpha > 0.6 ? '#ffffff' : `rgba(186, 124, 222, ${depthAlpha})`;
      } else if (state === 'error') {
        ctx.fillStyle = depthAlpha > 0.6 ? '#ffffff' : `rgba(255, 159, 10, ${depthAlpha})`;
      } else {
        ctx.fillStyle = depthAlpha > 0.6 ? '#ffffff' : `rgba(0, 229, 255, ${depthAlpha})`;
      }
      ctx.fill();
    });

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
  container.setAttribute('aria-label', 'BANKAI Holographic Core');

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
      aria-label="BANKAI Holographic Core"
      data-voice-state={state || bankaiVoice.getState()}
    >
      <canvas ref={canvasRef} className="bankai-hologram-canvas" />
    </div>
  );
};
