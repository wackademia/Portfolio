'use client';
import { THESIS } from '../../(lib)/content';
import { Reveal, SectionHead } from '../ui/Reveal';

export default function Research() {
  return (
    <section id="research" className="relative py-28 md:py-40">
      <div className="shell">
        <SectionHead
          code="03"
          kana="research"
          title={
            <>
              Watching the
              <br />
              <span className="text-[var(--accent)]">watchers</span>.
            </>
          }
        />

        <Reveal>
          <div className="panel panel-hot p-8 md:p-12">
            <div className="mono mb-8 flex flex-wrap items-center justify-between gap-3 text-[10px] tracking-[0.28em] text-[var(--ink-faint)]">
              <span>UNDERGRADUATE THESIS · BRAC UNIVERSITY</span>
              <span className="text-[var(--warn)]">TARGET {THESIS.target.toUpperCase()}</span>
            </div>

            <p className="display text-2xl leading-snug md:text-[2.1rem] md:leading-[1.25]">
              {THESIS.title}
            </p>

            <div className="my-9 hairline" />

            <ol className="space-y-6">
              {THESIS.points.map((p, i) => (
                <li key={p} className="flex gap-5">
                  <span className="mono shrink-0 pt-1 text-[11px] tracking-[0.2em] text-[var(--accent)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-base leading-relaxed text-[var(--ink-dim)] md:text-lg">
                    {p}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
