import { animate } from 'animejs';
import { rig } from './store';

/** Shared entrance ease — matches the cubic-bezier(0.16,1,0.3,1) used site-wide. */
export const EASE = 'outExpo';

/** True when animation should snap to end state instead of playing. */
export function skipMotion() {
  return rig.reduced;
}

/** The Reveal.jsx entrance tween, reused wherever a panel/heading fades+lifts in. */
export function revealIn(el, { delay = 0, y = 34, duration = 900 } = {}) {
  if (!el) return;
  if (skipMotion()) {
    el.style.opacity = 1;
    el.style.transform = 'none';
    el.style.filter = 'none';
    return;
  }
  animate(el, {
    opacity: [0, 1],
    translateY: [y, 0],
    filter: ['blur(6px)', 'blur(0px)'],
    duration,
    delay,
    ease: EASE,
  });
}
