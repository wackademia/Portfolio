'use client';
import { useEffect } from 'react';
import { rig } from '../(lib)/store';

/**
 * Single owner of window-level input. Writes straight into the `rig` object —
 * no React state — so scrolling never triggers a re-render.
 */
export default function Telemetry() {
  useEffect(() => {
    let last = 0;
    let raf = 0;

    const read = () => {
      const max = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const y = window.scrollY || window.pageYOffset || 0;
      const s = Math.min(1, Math.max(0, y / max));
      rig.velocity = rig.velocity * 0.86 + (s - last) * 0.14 * 60;
      last = s;
      rig.scroll = s;
      raf = requestAnimationFrame(read);
    };
    raf = requestAnimationFrame(read);

    const onMove = (e) => {
      rig.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      rig.pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const onLeave = () => {
      rig.pointer.x = 0;
      rig.pointer.y = 0;
    };

    // gyroscope parallax on phones, where there is no pointer
    const onTilt = (e) => {
      if (e.gamma == null || e.beta == null) return;
      rig.pointer.x = Math.max(-1, Math.min(1, e.gamma / 35));
      rig.pointer.y = Math.max(-1, Math.min(1, (e.beta - 45) / 40));
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    window.addEventListener('deviceorientation', onTilt);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('deviceorientation', onTilt);
    };
  }, []);

  return null;
}
