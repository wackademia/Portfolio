'use client';
import { useEffect, useRef } from 'react';
import { animate, createScope } from 'animejs';
import { EASE, revealIn, skipMotion } from '../../(lib)/motion';

export function Reveal({ children, delay = 0, y = 34, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const scope = createScope({ root: ref }).add(() => {
      const io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            revealIn(el, { delay: delay * 1000, y });
            io.disconnect();
          }
        },
        { threshold: 0.12, rootMargin: '-12% 0px -12% 0px' }
      );
      io.observe(el);
      return () => io.disconnect();
    });

    return () => scope.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: 0, transform: `translateY(${y}px)`, filter: 'blur(6px)' }}
    >
      {children}
    </div>
  );
}

/** Section heading with an index code and a rule that draws itself in. */
export function SectionHead({ code, kana, title, lede }) {
  const ref = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const line = lineRef.current;
    if (!el || !line) return;

    const scope = createScope({ root: ref }).add(() => {
      const io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            if (skipMotion()) {
              line.style.transform = 'scaleX(1)';
            } else {
              animate(line, {
                scaleX: [0, 1],
                duration: 1100,
                ease: EASE,
                delay: 100,
              });
            }
            io.disconnect();
          }
        },
        { threshold: 0.15, rootMargin: '-15% 0px -15% 0px' }
      );
      io.observe(el);
      return () => io.disconnect();
    });

    return () => scope.revert();
  }, []);

  return (
    <div ref={ref} className="mb-14 md:mb-20">
      <div className="mb-6 flex items-center gap-4">
        <span className="eyebrow">
          /{code} {kana}
        </span>
        <span
          ref={lineRef}
          className="h-px flex-1"
          style={{
            background: 'var(--line-hot)',
            transformOrigin: 'left',
            transform: 'scaleX(0)',
          }}
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
