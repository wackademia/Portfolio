'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

export function Reveal({ children, delay = 0, y = 34, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-12% 0px -12% 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
          : { opacity: 0, y, filter: 'blur(6px)' }
      }
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Section heading with an index code and a rule that draws itself in. */
export function SectionHead({ code, kana, title, lede }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <div ref={ref} className="mb-14 md:mb-20">
      <div className="mb-6 flex items-center gap-4">
        <span className="eyebrow">
          /{code} {kana}
        </span>
        <motion.span
          className="h-px flex-1"
          style={{ background: 'var(--line-hot)', transformOrigin: 'left' }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
        />
      </div>
      <Reveal>
        <h2 className="display text-[10vw] leading-[0.88] sm:text-6xl lg:text-7xl">
          {title}
        </h2>
      </Reveal>
      {lede && (
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--ink-dim)] md:text-lg">
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  );
}
