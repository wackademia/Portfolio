'use client';
import { Reveal, SectionHead } from '../ui/Reveal';

const PILLARS = [
  {
    n: '01',
    t: 'One stack, end to end',
    d: 'Interface, API, database and model — I build across the whole line instead of handing off at the seam where things usually break.',
  },
  {
    n: '02',
    t: 'Built, not templated',
    d: 'Every screen is designed for the thing it does. No dragged-in themes, no components fighting a design they were not made for.',
  },
  {
    n: '03',
    t: 'Fast is a feature',
    d: '60fps including on mid-range phones. Immersion that costs the user a two-second wait is not immersion, it is a loading screen.',
  },
];

const STATS = [
  ['Nodes rendered', '24,000'],
  ['Target frame rate', '60 fps'],
  ['Shipped projects', '04'],
  ['Reply time', '< 24 h'],
];

export default function Manifest() {
  return (
    <section id="manifest" className="relative py-28 md:py-40">
      <div className="shell">
        <SectionHead
          code="01"
          kana="manifest"
          title={
            <>
              I build the whole
              <br />
              <span className="text-[var(--accent)]">system</span>, not a slice.
            </>
          }
          lede="Design, frontend, backend and the model layer under it. Fewer handoffs means fewer places for a product to lose its shape between the idea and the deploy."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.1}>
              <div className="panel h-full p-7 transition-colors duration-500 hover:border-[rgba(53,230,255,0.4)]">
                <span className="mono text-[10px] tracking-[0.3em] text-[var(--accent)]">
                  {p.n}
                </span>
                <h3 className="display mt-5 text-2xl">{p.t}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--ink-dim)]">
                  {p.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-6 grid grid-cols-2 gap-px border border-[var(--line)] bg-[var(--line)] md:grid-cols-4">
            {STATS.map(([label, value]) => (
              <div key={label} className="bg-[rgba(6,10,16,0.75)] p-6 md:p-7">
                <p className="display text-3xl md:text-4xl">{value}</p>
                <p className="mono mt-2 text-[10px] tracking-[0.26em] text-[var(--ink-faint)]">
                  {label.toUpperCase()}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
