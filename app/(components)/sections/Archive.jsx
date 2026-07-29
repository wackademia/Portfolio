'use client';
import { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { PROJECTS } from '../../(lib)/content';
import { pulse } from '../../(lib)/store';
import { Reveal, SectionHead } from '../ui/Reveal';
import Scramble from '../ui/Scramble';

const EASE = [0.16, 1, 0.3, 1];
const SPRING = { stiffness: 180, damping: 20, mass: 0.6 };

function ProjectCard({ p, i, open, onToggle }) {
  const ref = useRef(null);
  const rx = useSpring(useMotionValue(0), SPRING);
  const ry = useSpring(useMotionValue(0), SPRING);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);

  // holographic sheen tracks the pointer across the card face
  const sheen = useMotionTemplate`radial-gradient(340px circle at ${mx}% ${my}%, rgba(53,230,255,0.16), transparent 62%)`;

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(px * 100);
    my.set(py * 100);
    ry.set((px - 0.5) * 13);
    rx.set(-(py - 0.5) * 13);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
    mx.set(50);
    my.set(50);
  };

  return (
    <Reveal delay={i * 0.08}>
      <motion.article
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        onClick={() => {
          onToggle();
          pulse(0.7);
        }}
        style={{
          rotateX: rx,
          rotateY: ry,
          transformPerspective: 1100,
          transformStyle: 'preserve-3d',
        }}
        className="panel group relative cursor-pointer overflow-hidden p-7 md:p-8"
        data-cursor="hot"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: sheen }}
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

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="overflow-hidden"
              >
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
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-7 flex items-center justify-between border-t border-[var(--line)] pt-5">
            <span className="mono text-[10px] tracking-[0.24em] text-[var(--ink-dim)]">
              {p.role.toUpperCase()}
            </span>
            <span className="mono flex items-center gap-2 text-[10px] tracking-[0.24em] text-[var(--accent)]">
              {open ? 'COLLAPSE' : 'EXPAND'}
              <motion.span animate={{ rotate: open ? 45 : 0 }}>+</motion.span>
            </span>
          </div>
        </div>
      </motion.article>
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
