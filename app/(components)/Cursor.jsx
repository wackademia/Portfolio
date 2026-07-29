'use client';
import { useEffect, useRef } from 'react';

/**
 * Two-part cursor: a dot pinned to the pointer and a ring that lags behind it.
 * The ring swells over anything marked `data-cursor="hot"` or any link/button.
 */
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const lag = { ...pos };
    let raf;

    const onMove = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }
      const hot = e.target.closest?.(
        'a, button, [data-cursor="hot"], input, textarea, select'
      );
      ring.current?.setAttribute('data-hot', hot ? 'true' : 'false');
    };

    const loop = () => {
      lag.x += (pos.x - lag.x) * 0.16;
      lag.y += (pos.y - lag.y) * 0.16;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${lag.x}px, ${lag.y}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    document.documentElement.style.cursor = 'none';
    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.style.cursor = '';
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
