'use client';
import { useEffect } from 'react';
import { rig } from '../(lib)/store';

/**
 * Lenis inertial scrolling. Disabled entirely for reduced-motion users, who get
 * plain native scroll instead.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let lenis;
    let raf;
    let cancelled = false;

    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.6,
        lerp: 0.09,
      });
      window.__lenis = lenis;

      const loop = (time) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      // anchor links routed through lenis so jumps are eased, not instant
      const onClick = (e) => {
        const a = e.target.closest?.('a[href^="#"]');
        if (!a) return;
        const id = a.getAttribute('href');
        if (!id || id === '#') return;
        const el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        lenis.scrollTo(el, { offset: -10, duration: 1.4 });
      };
      document.addEventListener('click', onClick);
      lenis.__cleanupClick = () => document.removeEventListener('click', onClick);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenis?.__cleanupClick?.();
      lenis?.destroy?.();
      delete window.__lenis;
      rig.velocity = 0;
    };
  }, []);

  return null;
}
