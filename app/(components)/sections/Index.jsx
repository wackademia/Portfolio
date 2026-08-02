'use client';
import { animate, createTimeline, onScroll } from 'animejs';
import { useEffect, useRef } from 'react';
import { EASE, skipMotion } from '../../(lib)/motion';
import { PROFILE, EDUCATION } from '../../(lib)/content';
import Scramble from '../ui/Scramble';

export default function Index() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const badgeRef = useRef(null);
  const wordRefs = useRef([]);
  wordRefs.current = [];
  const paragraphRef = useRef(null);
  const ctaRef = useRef(null);
  const socialRef = useRef(null);
  const statusRef = useRef(null);
  const cueRef = useRef(null);
  const cueBarRef = useRef(null);

  /* ---- scroll-scrubbed parallax on the whole hero ----------------------- */
  useEffect(() => {
    if (skipMotion()) return;
    const animation = animate(contentRef.current, {
      translateY: [0, 140],
      opacity: [1, 0.001],
      ease: 'linear',
      autoplay: onScroll({
        target: sectionRef.current,
        enter: 'top top',
        leave: 'bottom top',
        sync: true,
      }),
    });
    return () => animation.pause?.();
  }, []);

  /* ---- entrance timeline -------------------------------------------------- */
  useEffect(() => {
    const refs = [badgeRef, paragraphRef, ctaRef, socialRef, statusRef, cueRef];
    if (skipMotion()) {
      refs.forEach((r) => {
        if (r.current) {
          r.current.style.opacity = 1;
          r.current.style.transform = 'none';
        }
      });
      wordRefs.current.forEach((el) => {
        if (el) el.style.transform = 'none';
      });
      return;
    }

    const tl = createTimeline({ defaults: { ease: EASE } });
    tl.add(badgeRef.current, { opacity: [0, 1], translateY: [20, 0], duration: 800 }, 1250);

    // headline words slide up individually, staggered 100ms apart
    wordRefs.current.forEach((el, i) => {
      if (!el) return;
      animate(el, {
        translateY: ['110%', '0%'],
        duration: 1000,
        delay: 1300 + i * 100,
        ease: EASE,
      });
    });
    tl.add(statusRef.current, { opacity: [0, 1], translateX: [40, 0], duration: 1000 }, 1550)
      .add(paragraphRef.current, { opacity: [0, 1], duration: 900 }, 1700)
      .add(ctaRef.current, { opacity: [0, 1], translateY: [18, 0], duration: 800 }, 1900)
      .add(socialRef.current, { opacity: [0, 1], duration: 900 }, 2100)
      .add(cueRef.current, { opacity: [0, 1], duration: 1000 }, 2400);

    animate(cueBarRef.current, {
      scaleY: [0.2, 1, 0.2],
      duration: 2000,
      loop: true,
      ease: 'inOutSine',
      delay: 2400,
    });

    return () => tl.pause?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="index"
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center pt-28 pb-24"
    >
      <div ref={contentRef} className="shell w-full">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ---- left: identity ---- */}
          <div className="lg:col-span-7">
            <div
              ref={badgeRef}
              style={{ opacity: 0, transform: 'translateY(20px)' }}
              className="mb-7 flex flex-wrap items-center gap-x-4 gap-y-2"
            >
              <span className="eyebrow">/00 Index</span>
              <span className="h-px w-10 bg-[var(--line-hot)]" />
              <span className="mono text-[11px] tracking-[0.28em] text-[var(--ink-dim)]">
                {PROFILE.role}
              </span>
            </div>

            <h1 className="display text-[15vw] leading-[0.84] sm:text-[11vw] lg:text-[7.4rem]">
              {['ZABIR', 'AZMAYAN'].map((word, i) => (
                <span key={word} className="block overflow-hidden">
                  <span
                    ref={(el) => (wordRefs.current[i] = el)}
                    className="block"
                    style={{
                      transform: 'translateY(110%)',
                      ...(i === 1
                        ? {
                            WebkitTextStroke: '1px rgba(53,230,255,0.8)',
                            color: 'transparent',
                          }
                        : undefined),
                    }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            <p
              ref={paragraphRef}
              style={{ opacity: 0 }}
              className="mt-9 max-w-xl text-lg leading-relaxed text-[var(--ink-dim)]"
            >
              {PROFILE.blurb}
            </p>

            <div
              ref={ctaRef}
              style={{ opacity: 0, transform: 'translateY(18px)' }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a href="#archive" className="btn">
                <span>View archive</span>
              </a>
              <a href="#uplink" className="btn btn-ghost">
                <span>Open uplink</span>
              </a>
            </div>

            <div
              ref={socialRef}
              style={{ opacity: 0 }}
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
            </div>
          </div>

          {/* ---- right: status card ---- */}
          <div
            ref={statusRef}
            style={{ opacity: 0, transform: 'translateX(40px)' }}
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
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div
        ref={cueRef}
        style={{ opacity: 0 }}
        className="absolute bottom-14 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="mono text-[10px] tracking-[0.3em] text-[var(--ink-faint)]">
          SCROLL
        </span>
        <span
          ref={cueBarRef}
          style={{ transformOrigin: 'top', transform: 'scaleY(0.2)' }}
          className="block h-10 w-px bg-[var(--accent)]"
        />
      </div>
    </section>
  );
}
