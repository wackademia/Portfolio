'use client';
import { useState } from 'react';
import { PROFILE } from '../../(lib)/content';
import { pulse } from '../../(lib)/store';
import { Reveal, SectionHead } from '../ui/Reveal';

const KINDS = [
  'Web app',
  'Mobile app',
  'ML / computer vision',
  'Immersive 3D site',
  'Internship',
  'Something else',
];

export default function Uplink() {
  const [kind, setKind] = useState(KINDS[0]);
  const [name, setName] = useState('');
  const [brief, setBrief] = useState('');

  // no backend on a static portfolio — compose a mailto instead of pretending
  const href =
    `mailto:${PROFILE.email}` +
    `?subject=${encodeURIComponent(`[${kind}] enquiry${name ? ` — ${name}` : ''}`)}` +
    `&body=${encodeURIComponent(
      `Name: ${name || '—'}\nType: ${kind}\n\n${brief || ''}`
    )}`;

  const field =
    'mono w-full border border-[var(--line)] bg-[rgba(4,8,14,0.65)] px-4 py-3 text-[13px] text-[var(--ink)] outline-none transition-colors focus:border-[var(--accent)] placeholder:text-[var(--ink-faint)]';

  return (
    <section id="uplink" className="relative py-28 md:py-40">
      <div className="shell">
        <SectionHead
          code="05"
          kana="uplink"
          title={
            <>
              Send the
              <br />
              <span className="text-[var(--accent)]">signal</span>.
            </>
          }
          lede="Roles, freelance builds, or a half-formed idea in two lines. Fill this in and it opens a pre-written email — nothing is stored anywhere."
        />

        <div className="grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="panel p-7 md:p-9">
              <p className="mono mb-6 text-[10px] tracking-[0.28em] text-[var(--ink-faint)]">
                TRANSMISSION DRAFT
              </p>

              <div className="space-y-5">
                <div>
                  <label className="mono mb-2 block text-[10px] tracking-[0.24em] text-[var(--ink-dim)]">
                    NAME / COMPANY
                  </label>
                  <input
                    className={field}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="who is calling"
                  />
                </div>

                <div>
                  <p className="mono mb-3 block text-[10px] tracking-[0.24em] text-[var(--ink-dim)]">
                    TYPE
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {KINDS.map((k) => (
                      <button
                        key={k}
                        type="button"
                        onClick={() => {
                          setKind(k);
                          pulse(0.35);
                        }}
                        className="mono border px-3 py-2 text-[11px] tracking-[0.14em] transition-colors"
                        style={
                          kind === k
                            ? {
                                borderColor: 'var(--accent)',
                                color: '#02040a',
                                background: 'var(--accent)',
                              }
                            : {
                                borderColor: 'var(--line)',
                                color: 'var(--ink-dim)',
                              }
                        }
                      >
                        {k}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mono mb-2 block text-[10px] tracking-[0.24em] text-[var(--ink-dim)]">
                    BRIEF
                  </label>
                  <textarea
                    rows={5}
                    className={`${field} resize-none`}
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    placeholder="two lines is plenty"
                  />
                  <p className="mono mt-2 text-right text-[10px] tracking-[0.2em] text-[var(--ink-faint)]">
                    {brief.length} CHARS
                  </p>
                </div>

                <a href={href} onClick={() => pulse(1)} className="btn w-full justify-center">
                  <span>Transmit ▸</span>
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="flex h-full flex-col gap-6">
              <div className="panel panel-hot flex-1 p-7 md:p-9">
                <p className="mono mb-6 text-[10px] tracking-[0.28em] text-[var(--ink-faint)]">
                  DIRECT CHANNELS
                </p>
                {[
                  ['EMAIL', PROFILE.email, `mailto:${PROFILE.email}`],
                  ['PHONE', PROFILE.phone, `tel:${PROFILE.phoneHref}`],
                  ['LINKEDIN', 'in/Zabir-Azmayan', PROFILE.linkedin],
                  ['GITHUB', 'github.com', PROFILE.github],
                ].map(([label, value, url]) => (
                  <a
                    key={label}
                    href={url}
                    className="group flex items-center justify-between border-b border-[var(--line)] py-4 transition-colors last:border-0"
                  >
                    <span className="mono text-[10px] tracking-[0.26em] text-[var(--ink-faint)]">
                      {label}
                    </span>
                    <span className="mono text-[12px] text-[var(--ink-dim)] transition-colors group-hover:text-[var(--accent)]">
                      {value} ↗
                    </span>
                  </a>
                ))}
              </div>

              <div className="panel p-7">
                <p className="mono text-[10px] tracking-[0.28em] text-[var(--ink-faint)]">
                  BASE
                </p>
                <p className="display mt-3 text-2xl">{PROFILE.location}</p>
                <p className="mono mt-3 text-[11px] leading-relaxed tracking-[0.16em] text-[var(--ink-dim)]">
                  UTC+6 · available remote, worldwide
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
