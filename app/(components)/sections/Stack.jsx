'use client';
import { useEffect, useRef } from 'react';
import { animate, createScope, stagger } from 'animejs';
import { skipMotion } from '../../(lib)/motion';
import { STACK } from '../../(lib)/content';
import { Reveal, SectionHead } from '../ui/Reveal';

const TICKER = STACK.flatMap((g) => g.items);

const HOVER_ON = { translateY: -2, borderColor: 'rgba(53,230,255,0.7)', color: '#dbe7f0' };
const HOVER_OFF = { translateY: 0, borderColor: 'rgba(120,200,230,0.14)', color: '#7d8c9c' };

function StackGroup({ g, gi }) {
  const ulRef = useRef(null);

  useEffect(() => {
    const ul = ulRef.current;
    if (!ul) return;
    const items = Array.from(ul.children);

    const scope = createScope({ root: ulRef }).add(() => {
      const io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            if (skipMotion()) {
              items.forEach((el) => {
                el.style.opacity = 1;
                el.style.transform = 'none';
              });
            } else {
              animate(items, {
                opacity: [0, 1],
                scale: [0.9, 1],
                duration: 400,
                delay: stagger(40),
              });
            }
            io.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      io.observe(ul);

      const onOver = (e) => {
        const li = e.target.closest('li');
        if (!li || !ul.contains(li)) return;
        animate(li, { ...HOVER_ON, duration: 250, ease: 'outQuad' });
      };
      const onOut = (e) => {
        const li = e.target.closest('li');
        if (!li || !ul.contains(li)) return;
        animate(li, { ...HOVER_OFF, duration: 250, ease: 'outQuad' });
      };
      ul.addEventListener('mouseover', onOver);
      ul.addEventListener('mouseout', onOut);

      return () => {
        io.disconnect();
        ul.removeEventListener('mouseover', onOver);
        ul.removeEventListener('mouseout', onOut);
      };
    });

    return () => scope.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Reveal delay={gi * 0.05}>
      <div className="h-full bg-[rgba(6,10,16,0.8)] p-7">
        <div className="mono mb-5 flex items-center gap-3 text-[10px] tracking-[0.28em] text-[var(--accent)]">
          <span>{String(gi + 1).padStart(2, '0')}</span>
          <span className="h-px flex-1 bg-[var(--line)]" />
          <span>{g.group.toUpperCase()}</span>
        </div>
        <ul ref={ulRef} className="flex flex-wrap gap-2">
          {g.items.map((it) => (
            <li
              key={it}
              style={{ opacity: 0, transform: 'scale(0.9)' }}
              className="mono cursor-default border border-[var(--line)] px-3 py-1.5 text-[11px] tracking-[0.12em] text-[var(--ink-dim)]"
            >
              {it}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

export default function Stack() {
  return (
    <section id="stack" className="relative py-28 md:py-40">
      <div className="shell">
        <SectionHead
          code="04"
          kana="stack"
          title={
            <>
              The tools,
              <br />
              grouped by <span className="text-[var(--accent)]">layer</span>.
            </>
          }
          lede="Listed by where they sit in a build rather than by how confident I feel about them — the layer is what tells you whether I can actually take a feature from screen to schema."
        />

        <div className="grid gap-px border border-[var(--line)] bg-[var(--line)] md:grid-cols-2 lg:grid-cols-3">
          {STACK.map((g, gi) => (
            <StackGroup key={g.group} g={g} gi={gi} />
          ))}
        </div>
      </div>

      {/* full-bleed ticker */}
      <div className="mt-20 overflow-hidden border-y border-[var(--line)] py-5">
        <div className="marquee">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0">
              {TICKER.map((t) => (
                <span
                  key={`${dup}-${t}`}
                  className="mono flex items-center gap-8 px-8 text-sm tracking-[0.24em] text-[var(--ink-faint)]"
                >
                  {t.toUpperCase()}
                  <span className="text-[var(--accent)]">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
