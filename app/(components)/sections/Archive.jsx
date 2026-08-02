'use client';
import { useEffect, useRef, useState } from 'react';
import { animate, createAnimatable, spring } from 'animejs';
import { EASE, skipMotion } from '../../(lib)/motion';
import { PROJECTS } from '../../(lib)/content';
import { pulse } from '../../(lib)/store';
import { Reveal, SectionHead } from '../ui/Reveal';
import Scramble from '../ui/Scramble';

// mirrors the { stiffness: 180, damping: 20, mass: 0.6 } spring the tilt used to run on
const TILT_SPRING = spring({ stiffness: 180, damping: 20, mass: 0.6 });

function ProjectCard({ p, i, open, onToggle }) {
  const ref = useRef(null);
  const detailRef = useRef(null);
  const iconRef = useRef(null);
  const animatableRef = useRef(null);

  // holographic tilt — createAnimatable is built for exactly this: cheap,
  // continuously-retargeted updates driven straight from pointermove
  useEffect(() => {
    if (skipMotion() || !ref.current) return;
    animatableRef.current = createAnimatable(ref.current, {
      rotateX: { unit: 'deg', duration: 300, ease: TILT_SPRING },
      rotateY: { unit: 'deg', duration: 300, ease: TILT_SPRING },
    });
    return () => animatableRef.current?.revert();
  }, []);

  const onMove = (e) => {
    const el = ref.current;
    const r = el?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
    animatableRef.current?.rotateY((px - 0.5) * 13).rotateX(-(py - 0.5) * 13);
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--mx', '50%');
    el.style.setProperty('--my', '50%');
    animatableRef.current?.rotateX(0).rotateY(0);
  };

  // expand/collapse detail panel — measured-height animation replaces
  // framer's height:'auto' AnimatePresence trick
  useEffect(() => {
    const el = detailRef.current;
    if (!el) return;
    if (skipMotion()) {
      el.style.height = open ? 'auto' : '0px';
      el.style.opacity = open ? 1 : 0;
      return;
    }
    if (open) {
      const target = el.scrollHeight;
      el.style.height = '0px';
      animate(el, {
        height: [0, target],
        opacity: [0, 1],
        duration: 500,
        ease: EASE,
        onComplete: () => {
          el.style.height = 'auto';
        },
      });
    } else {
      const from = el.scrollHeight;
      el.style.height = `${from}px`;
      animate(el, {
        height: [from, 0],
        opacity: [1, 0],
        duration: 400,
        ease: EASE,
      });
    }
  }, [open]);

  useEffect(() => {
    const el = iconRef.current;
    if (!el) return;
    if (skipMotion()) {
      el.style.transform = open ? 'rotate(45deg)' : 'rotate(0deg)';
      return;
    }
    animate(el, { rotate: open ? 45 : 0, duration: 300, ease: EASE });
  }, [open]);

  return (
    <Reveal delay={i * 0.08}>
      <article
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        onClick={() => {
          onToggle();
          pulse(0.7);
        }}
        style={{
          transformPerspective: 1100,
          transformStyle: 'preserve-3d',
          '--mx': '50%',
          '--my': '50%',
        }}
        className="panel group relative cursor-pointer overflow-hidden p-7 md:p-8"
        data-cursor="hot"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(340px circle at var(--mx) var(--my), rgba(53,230,255,0.16), transparent 62%)',
          }}
        />

        {/* scan sweep on hover */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-x-0 -top-1/2 h-1/2 translate-y-0 bg-gradient-to-b from-transparent via-[rgba(53,230,255,0.09)] to-transparent transition-transform duration-[1400ms] ease-out group-hover:translate-y-[400%]" />
        </div>

        <div style={{ transform: 'translateZ(38px)' }}>
          <div className="mono mb-6 flex items-center justify-between text-[10px] tracking-[0.28em]">
            <span className="text-[var(--accent)]">{p.id}</span>
            <span className="text-[var(--ink-faint)]">{p.year}</span>
          </div>

          <p className="mono mb-3 text-[10px] tracking-[0.26em] text-[var(--ink-faint)]">
            {p.kind.toUpperCase()}
          </p>

          <Scramble
            as="h3"
            text={p.title}
            className="display block text-[7vw] leading-[0.95] sm:text-3xl lg:text-4xl"
          />

          <p className="mt-5 text-sm leading-relaxed text-[var(--ink-dim)]">
            {p.desc}
          </p>

          <div ref={detailRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
            <div className="my-6 hairline" />
            <div className="grid grid-cols-3 gap-4">
              {p.metrics.map(([k, v]) => (
                <div key={k}>
                  <p className="mono text-[10px] tracking-[0.24em] text-[var(--ink-faint)]">
                    {k.toUpperCase()}
                  </p>
                  <p className="mt-1.5 text-base text-[var(--ink)]">{v}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="mono border border-[var(--line)] px-2.5 py-1 text-[10px] tracking-[0.16em] text-[var(--ink-dim)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-7 flex items-center justify-between border-t border-[var(--line)] pt-5">
            <span className="mono text-[10px] tracking-[0.24em] text-[var(--ink-dim)]">
              {p.role.toUpperCase()}
            </span>
            <span className="mono flex items-center gap-2 text-[10px] tracking-[0.24em] text-[var(--accent)]">
              {open ? 'COLLAPSE' : 'EXPAND'}
              <span ref={iconRef} className="inline-block">+</span>
            </span>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Archive() {
  const [open, setOpen] = useState(null);

  return (
    <section id="archive" className="relative py-28 md:py-40">
      <div className="shell">
        <SectionHead
          code="02"
          kana="archive"
          title={
            <>
              Four records.
              <br />
              All of them <span className="text-[var(--accent)]">shipped</span>.
            </>
          }
          lede="Consulting platform, health app, campus logistics, computer vision. Click any record to open its readout."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <ProjectCard
              key={p.id}
              p={p}
              i={i}
              open={open === p.id}
              onToggle={() => setOpen(open === p.id ? null : p.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
