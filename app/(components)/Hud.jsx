'use client';
import { useEffect, useState } from 'react';
import { rig, pulse } from '../(lib)/store';
import { SECTIONS, PROFILE } from '../(lib)/content';

/**
 * Persistent instrument panel: section index down the right edge, depth /
 * clock readout along the bottom, corner brackets. Deliberately reads like the
 * chrome of a flight system rather than a website nav.
 */
export default function Hud() {
  const [active, setActive] = useState('index');
  const [depth, setDepth] = useState(0);
  const [clock, setClock] = useState('--:--:--');
  const [fps, setFps] = useState(60);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    let raf;
    let frames = 0;
    let mark = performance.now();

    const tick = () => {
      setDepth(Math.round(rig.scrollEased * 300));
      frames += 1;
      const now = performance.now();
      if (now - mark > 1000) {
        setFps(Math.round((frames * 1000) / (now - mark)));
        frames = 0;
        mark = now;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const t = setInterval(() => {
      setClock(
        new Date().toLocaleTimeString('en-GB', {
          hour12: false,
          timeZone: 'Asia/Dhaka',
        })
      );
    }, 1000);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(t);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-30">
      {/* corner brackets */}
      {[
        'left-4 top-4 border-l border-t',
        'right-4 top-4 border-r border-t',
        'left-4 bottom-4 border-l border-b',
        'right-4 bottom-4 border-r border-b',
      ].map((c) => (
        <div
          key={c}
          className={`absolute h-5 w-5 border-[var(--line-hot)] opacity-50 ${c}`}
        />
      ))}

      {/* section index */}
      <nav className="pointer-events-auto absolute right-5 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex">
        {SECTIONS.map((s) => {
          const on = active === s.id;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => pulse(0.5)}
              className="mono group flex items-center gap-3 text-[10px] tracking-[0.28em] transition-colors"
              style={{ color: on ? 'var(--accent)' : 'var(--ink-faint)' }}
            >
              <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {s.label.toUpperCase()}
              </span>
              <span>{s.code}</span>
              <span
                className="block h-px transition-all duration-500"
                style={{
                  width: on ? 34 : 12,
                  background: on ? 'var(--accent)' : 'var(--ink-faint)',
                  boxShadow: on ? '0 0 10px var(--accent)' : 'none',
                }}
              />
            </a>
          );
        })}
      </nav>

      {/* bottom readout */}
      <div className="mono absolute bottom-5 left-0 right-0 flex items-center justify-between px-8 text-[10px] tracking-[0.26em] text-[var(--ink-faint)] md:px-12">
        <span className="hidden sm:inline">
          DEPTH <span className="text-[var(--accent)]">{String(depth).padStart(3, '0')}</span>M
        </span>
        <span className="hidden md:inline">{fps} FPS</span>
        <a
          href={`mailto:${PROFILE.email}`}
          className="pointer-events-auto hidden transition-colors hover:text-[var(--accent)] lg:inline"
        >
          {PROFILE.email}
        </a>
        <span>DHAKA {clock}</span>
      </div>
    </div>
  );
}
