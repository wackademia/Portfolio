'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { PROFILE, EDUCATION } from '../../(lib)/content';
import Scramble from '../ui/Scramble';

const EASE = [0.16, 1, 0.3, 1];

export default function Index() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      id="index"
      ref={ref}
      className="relative flex min-h-[100svh] items-center pt-28 pb-24"
    >
      <motion.div style={{ y, opacity }} className="shell w-full">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ---- left: identity ---- */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.25, duration: 0.8, ease: EASE }}
              className="mb-7 flex flex-wrap items-center gap-x-4 gap-y-2"
            >
              <span className="eyebrow">/00 Index</span>
              <span className="h-px w-10 bg-[var(--line-hot)]" />
              <span className="mono text-[11px] tracking-[0.28em] text-[var(--ink-dim)]">
                {PROFILE.role}
              </span>
            </motion.div>

            <h1 className="display text-[15vw] leading-[0.84] sm:text-[11vw] lg:text-[7.4rem]">
              {['ZABIR', 'AZMAYAN'].map((word, i) => (
                <span key={word} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ delay: 1.3 + i * 0.1, duration: 1, ease: EASE }}
                    style={
                      i === 1
                        ? {
                            WebkitTextStroke: '1px rgba(53,230,255,0.8)',
                            color: 'transparent',
                          }
                        : undefined
                    }
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7, duration: 0.9 }}
              className="mt-9 max-w-xl text-lg leading-relaxed text-[var(--ink-dim)]"
            >
              {PROFILE.blurb}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9, duration: 0.8, ease: EASE }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a href="#archive" className="btn">
                <span>View archive</span>
              </a>
              <a href="#uplink" className="btn btn-ghost">
                <span>Open uplink</span>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.1, duration: 0.9 }}
              className="mono mt-10 flex flex-wrap gap-x-7 gap-y-2 text-[11px] tracking-[0.22em] text-[var(--ink-faint)]"
            >
              {[
                ['GITHUB', PROFILE.github],
                ['LINKEDIN', PROFILE.linkedin],
                ['X', PROFILE.x],
                [PROFILE.phone, `tel:${PROFILE.phoneHref}`],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="transition-colors hover:text-[var(--accent)]"
                >
                  {label}
                </a>
              ))}
            </motion.div>
          </div>

          {/* ---- right: status card ---- */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.55, duration: 1, ease: EASE }}
            className="lg:col-span-5 lg:pl-6"
          >
            <div className="panel panel-hot p-7 md:p-8">
              <div className="mono mb-6 flex items-center justify-between text-[10px] tracking-[0.28em] text-[var(--ink-faint)]">
                <span>CURRENT</span>
                <span className="flex items-center gap-2 text-[var(--accent)]">
                  <span className="block h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
                  ACTIVE
                </span>
              </div>

              <Scramble
                as="h2"
                text={EDUCATION.school}
                className="display block text-3xl md:text-4xl"
              />
              <p className="mono mt-3 text-[11px] tracking-[0.2em] text-[var(--accent)]">
                {EDUCATION.degree}
              </p>
              <p className="mono mt-1.5 text-[11px] tracking-[0.2em] text-[var(--ink-faint)]">
                {EDUCATION.span} · {EDUCATION.place}
              </p>

              <div className="my-6 hairline" />

              <p className="mono mb-3 text-[10px] tracking-[0.28em] text-[var(--ink-faint)]">
                COURSEWORK
              </p>
              <ul className="space-y-2">
                {EDUCATION.coursework.map((c) => (
                  <li
                    key={c}
                    className="mono flex items-start gap-2.5 text-[12px] leading-relaxed text-[var(--ink-dim)]"
                  >
                    <span className="text-[var(--accent)]">›</span>
                    {c}
                  </li>
                ))}
              </ul>

              <div className="mt-7 inline-flex border border-[var(--line-hot)] px-4 py-2">
                <span className="mono text-[10px] tracking-[0.24em] text-[var(--accent)]">
                  OPEN TO INTERNSHIPS · REMOTE / ONSITE
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute bottom-14 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="mono text-[10px] tracking-[0.3em] text-[var(--ink-faint)]">
          SCROLL
        </span>
        <motion.span
          animate={{ scaleY: [0.2, 1, 0.2], originY: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="block h-10 w-px bg-[var(--accent)]"
        />
      </motion.div>
    </section>
  );
}
