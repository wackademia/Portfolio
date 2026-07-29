'use client';
import { motion } from 'framer-motion';
import { STACK } from '../../(lib)/content';
import { Reveal, SectionHead } from '../ui/Reveal';

const TICKER = STACK.flatMap((g) => g.items);

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
            <Reveal key={g.group} delay={gi * 0.05}>
              <div className="h-full bg-[rgba(6,10,16,0.8)] p-7">
                <div className="mono mb-5 flex items-center gap-3 text-[10px] tracking-[0.28em] text-[var(--accent)]">
                  <span>{String(gi + 1).padStart(2, '0')}</span>
                  <span className="h-px flex-1 bg-[var(--line)]" />
                  <span>{g.group.toUpperCase()}</span>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((it, ii) => (
                    <motion.li
                      key={it}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: ii * 0.04, duration: 0.4 }}
                      whileHover={{
                        borderColor: 'rgba(53,230,255,0.7)',
                        color: '#dbe7f0',
                        y: -2,
                      }}
                      className="mono cursor-default border border-[var(--line)] px-3 py-1.5 text-[11px] tracking-[0.12em] text-[var(--ink-dim)]"
                    >
                      {it}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Reveal>
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
