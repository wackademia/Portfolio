'use client';

/**
 * Render-free shared state.
 *
 * The 3D scene reads scroll/pointer every frame inside useFrame. Routing that
 * through React state would re-render the whole tree 60x/sec, so instead we
 * mutate one module-level object and let the scene sample it. Only discrete
 * events (gate opened, active section changed) go through the subscriber list.
 */
export const rig = {
  // normalised scroll 0..1 across the whole document
  scroll: 0,
  // smoothed scroll — what the camera actually follows
  scrollEased: 0,
  // px/frame delta, drives speed lines + chromatic aberration
  velocity: 0,
  // pointer in -1..1 NDC, and a smoothed copy
  pointer: { x: 0, y: 0 },
  pointerEased: { x: 0, y: 0 },
  // true once the operator clicks ENTER
  gateOpen: false,
  // 0 while the gate is up, eases to 1 after enter
  entered: 0,
  // one-shot glitch impulse, decays every frame
  impulse: 0,
  // perf tier: 2 = desktop, 1 = mid, 0 = mobile / reduced motion
  tier: 2,
  reduced: false,
};

const listeners = new Set();

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function emit(event, payload) {
  listeners.forEach((fn) => fn(event, payload));
}

/** Kick a glitch/chromatic burst — used on enter, nav jumps and card opens. */
export function pulse(amount = 1) {
  rig.impulse = Math.min(1.6, rig.impulse + amount);
}

export function detectTier() {
  if (typeof window === 'undefined') return 2;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  rig.reduced = reduced;
  if (reduced) return 0;

  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const cores = navigator.hardwareConcurrency || 4;
  const narrow = window.innerWidth < 820;

  if (coarse || narrow || cores <= 4) return 1;
  if (cores <= 6) return 1;
  return 2;
}

export const damp = (current, target, lambda, dt) =>
  current + (target - current) * (1 - Math.exp(-lambda * dt));
