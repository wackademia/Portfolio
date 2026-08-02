'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { animate, createTimeline } from 'animejs';
import { EASE, skipMotion } from '../(lib)/motion';
import { rig, pulse, emit } from '../(lib)/store';
import { BOOT_LINES, PROFILE } from '../(lib)/content';

export default function Gate() {
  const [progress, setProgress] = useState(0);
  const [lines, setLines] = useState([]);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [lock, setLock] = useState(0); // 0..1 pointer "signal lock"
  const reticle = useRef(null);
  const raf = useRef(0);
  const closingRef = useRef(false);

  const rootRef = useRef(null);
  const plateRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonRef = useRef(null);

  /* ---- boot sequence -------------------------------------------------- */
  useEffect(() => {
    document.body.setAttribute('data-locked', 'true');

    let i = 0;
    const step = () => {
      i += 1;
      setLines(BOOT_LINES.slice(0, i));
      setProgress(Math.round((i / BOOT_LINES.length) * 100));
      if (i >= BOOT_LINES.length) {
        setReady(true);
        return;
      }
      timer = setTimeout(step, 110 + Math.random() * 170);
    };
    let timer = setTimeout(step, 300);
    return () => clearTimeout(timer);
  }, []);

  /* ---- entrance: eyebrow / heading / paragraph timeline ---------------- */
  useEffect(() => {
    if (skipMotion()) {
      [eyebrowRef, headingRef, paragraphRef].forEach((r) => {
        if (r.current) {
          r.current.style.opacity = 1;
          r.current.style.transform = 'none';
        }
      });
      return;
    }
    const tl = createTimeline({ defaults: { ease: EASE } });
    tl.add(eyebrowRef.current, { opacity: [0, 1], translateY: [12, 0], duration: 700 }, 150)
      .add(headingRef.current, { opacity: [0, 1], translateY: [26, 0], duration: 900 }, 250)
      .add(paragraphRef.current, { opacity: [0, 1], duration: 800 }, 500);
    return () => tl.pause?.();
  }, []);

  /* ---- button block eases in once boot finishes ------------------------ */
  useEffect(() => {
    const el = buttonRef.current;
    if (!el) return;
    if (skipMotion()) {
      el.style.opacity = ready ? 1 : 0.25;
      el.style.transform = 'none';
      return;
    }
    animate(el, {
      opacity: ready ? 1 : 0.25,
      translateY: ready ? 0 : 14,
      duration: 600,
      ease: EASE,
    });
  }, [ready]);

  /* ---- pointer telemetry: moving toward the centre "locks" the signal -- */
  useEffect(() => {
    const onMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      rig.pointer.x = nx;
      rig.pointer.y = ny;

      const d = Math.min(1, Math.hypot(nx, ny) / 0.85);
      setLock(1 - d);

      if (reticle.current) {
        cancelAnimationFrame(raf.current);
        raf.current = requestAnimationFrame(() => {
          reticle.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        });
      }
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  /* ---- enter ---------------------------------------------------------- */
  const enter = useCallback(() => {
    if (!ready || open || closingRef.current) return;
    closingRef.current = true;
    rig.gateOpen = true;
    pulse(1.5);
    emit('enter');
    window.setTimeout(() => {
      document.body.setAttribute('data-locked', 'false');
      window.scrollTo(0, 0);
    }, 420);

    if (skipMotion()) {
      setOpen(true);
      return;
    }
    animate(plateRef.current, {
      clipPath: ['inset(0% 0% 0% 0%)', 'inset(50% 0% 50% 0%)'],
      duration: 800,
      ease: EASE,
    });
    animate(rootRef.current, {
      opacity: [1, 0],
      duration: 750,
      ease: EASE,
      onComplete: () => setOpen(true),
    });
  }, [ready, open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        enter();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [enter]);

  if (open) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[80] flex flex-col justify-between overflow-hidden"
    >
      {/* black plate that shutters open on enter */}
      <div
        ref={plateRef}
        className="absolute inset-0 bg-[#04060a]"
        style={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 0.92 }}
      />

      {/* reticle that follows the pointer */}
      <div
        ref={reticle}
        className="pointer-events-none absolute left-0 top-0 hidden md:block"
        style={{ willChange: 'transform' }}
      >
        <div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-200"
          style={{
            width: 90 + (1 - lock) * 130,
            height: 90 + (1 - lock) * 130,
            borderColor: `rgba(53,230,255,${0.15 + lock * 0.6})`,
            boxShadow: `0 0 ${lock * 70}px rgba(53,230,255,${lock * 0.28})`,
          }}
        />
      </div>

      {/* ---- top bar ---- */}
      <header className="relative z-10 shell flex items-center justify-between pt-6 md:pt-8">
        <span className="mono text-[10px] tracking-[0.32em] text-[var(--ink-dim)]">
          23.7936 N · 90.4066 E — DHAKA
        </span>
        <span className="mono text-[10px] tracking-[0.32em] text-[var(--accent)]">
          BOOT {String(progress).padStart(3, '0')}%
        </span>
      </header>

      {/* ---- centre ---- */}
      <main className="relative z-10 shell flex-1 flex flex-col justify-center py-10">
        <p ref={eyebrowRef} className="eyebrow mb-5" style={{ opacity: 0, transform: 'translateY(12px)' }}>
          Terminal 00 · access
        </p>

        <h1
          ref={headingRef}
          className="display text-[13vw] leading-[0.82] md:text-[9vw] lg:text-[7.5rem]"
          style={{ opacity: 0, transform: 'translateY(26px)' }}
        >
          <span className="block">ZABIR</span>
          <span
            className="block"
            style={{
              WebkitTextStroke: '1px rgba(53,230,255,0.75)',
              color: 'transparent',
            }}
          >
            AZMAYAN
          </span>
        </h1>

        <p
          ref={paragraphRef}
          className="mono mt-7 max-w-lg text-[13px] leading-relaxed text-[var(--ink-dim)]"
          style={{ opacity: 0 }}
        >
          {PROFILE.role}. Move the cursor — the grid answers. Return to
          centre and the signal locks.
        </p>

        {/* signal lock meter */}
        <div className="mt-8 max-w-xs">
          <div className="mono mb-2 flex justify-between text-[10px] tracking-[0.28em] text-[var(--ink-faint)]">
            <span>SIGNAL LOCK</span>
            <span style={{ color: lock > 0.7 ? 'var(--accent)' : undefined }}>
              {String(Math.round(lock * 100)).padStart(3, '0')}%
            </span>
          </div>
          <div className="h-[2px] w-full bg-[rgba(255,255,255,0.08)]">
            <div
              className="h-full transition-[width] duration-150"
              style={{
                width: `${lock * 100}%`,
                background: 'var(--accent)',
                boxShadow: '0 0 12px var(--accent)',
              }}
            />
          </div>
        </div>

        <div ref={buttonRef} className="mt-10" style={{ opacity: 0.25, transform: 'translateY(14px)' }}>
          <button
            type="button"
            onClick={enter}
            disabled={!ready}
            data-cursor="hot"
            className="btn disabled:cursor-not-allowed"
          >
            <span>{ready ? 'Enter ▸' : 'Loading…'}</span>
          </button>
          <p className="mono mt-3 text-[10px] tracking-[0.24em] text-[var(--ink-faint)]">
            or press ENTER
          </p>
        </div>
      </main>

      {/* ---- boot log ---- */}
      <footer className="relative z-10 shell pb-6 md:pb-8">
        <div className="hairline mb-4" />
        <div className="mono h-[74px] overflow-hidden text-[11px] leading-[1.55] text-[var(--ink-faint)]">
          {lines.slice(-4).map((l, i, arr) => (
            <div
              key={l}
              style={{ opacity: 0.35 + (i / Math.max(1, arr.length - 1)) * 0.65 }}
            >
              <span className="text-[var(--accent)]">›</span> {l}
            </div>
          ))}
          {ready && <div className="caret" />}
        </div>
      </footer>
    </div>
  );
}
