'use client';
import { PROFILE, SECTIONS } from '../(lib)/content';
import { Reveal } from './ui/Reveal';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--line)] bg-[rgba(4,6,10,0.72)] backdrop-blur-xl">
      <Reveal className="shell py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="display text-3xl">ZABIR AZMAYAN</p>
            <p className="mono mt-4 max-w-xs text-[12px] leading-relaxed text-[var(--ink-dim)]">
              Full-stack and ML engineering out of Dhaka. Web, mobile, and the
              model layer underneath.
            </p>
          </div>

          <div>
            <p className="mono mb-4 text-[10px] tracking-[0.28em] text-[var(--ink-faint)]">
              INDEX
            </p>
            <ul className="space-y-2">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="mono text-[12px] tracking-[0.14em] text-[var(--ink-dim)] transition-colors hover:text-[var(--accent)]"
                  >
                    <span className="mr-2 text-[var(--ink-faint)]">{s.code}</span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mono mb-4 text-[10px] tracking-[0.28em] text-[var(--ink-faint)]">
              CHANNELS
            </p>
            <ul className="space-y-2">
              {[
                [PROFILE.email, `mailto:${PROFILE.email}`],
                [PROFILE.phone, `tel:${PROFILE.phoneHref}`],
                ['LinkedIn', PROFILE.linkedin],
                ['GitHub', PROFILE.github],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="mono text-[12px] tracking-[0.14em] text-[var(--ink-dim)] transition-colors hover:text-[var(--accent)]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 hairline" />

        <div className="mono mt-6 flex flex-col gap-2 text-[10px] tracking-[0.24em] text-[var(--ink-faint)] sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} ZABIR AZMAYAN</span>
          <span>BUILT WITH NEXT.JS · THREE.JS · WEBGL</span>
        </div>
      </Reveal>
    </footer>
  );
}
