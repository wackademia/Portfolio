'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SECTIONS, PROFILE } from '../(lib)/content';
import { pulse } from '../(lib)/store';

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
        style={{
          background: solid ? 'rgba(4,6,10,0.62)' : 'transparent',
          backdropFilter: solid ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: solid ? 'blur(16px)' : 'none',
          borderBottom: solid ? '1px solid var(--line)' : '1px solid transparent',
        }}
      >
        <nav className="shell flex items-center justify-between py-4">
          <a
            href="#index"
            onClick={() => pulse(0.4)}
            className="mono flex items-center gap-3 text-xs tracking-[0.28em]"
          >
            <span
              className="grid h-8 w-8 place-items-center border text-[11px]"
              style={{ borderColor: 'var(--line-hot)', color: 'var(--accent)' }}
            >
              {PROFILE.handle.slice(0, 2)}
            </span>
            <span className="hidden sm:inline">ZABIR AZMAYAN</span>
          </a>

          <div className="mono hidden items-center gap-7 text-[11px] tracking-[0.24em] md:flex">
            {SECTIONS.slice(1).map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => pulse(0.5)}
                className="group relative text-[var(--ink-dim)] transition-colors hover:text-[var(--ink)]"
              >
                <span className="mr-1.5 text-[var(--ink-faint)]">{s.code}</span>
                {s.label.toUpperCase()}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="#uplink" onClick={() => pulse(0.6)} className="btn hidden sm:inline-flex">
              <span>Open uplink</span>
            </a>
            <button
              type="button"
              aria-label="Menu"
              onClick={() => setMenu((v) => !v)}
              className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] border border-[var(--line)] md:hidden"
            >
              <motion.span
                animate={menu ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
                className="block h-px w-4 bg-[var(--ink)]"
              />
              <motion.span
                animate={menu ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
                className="block h-px w-4 bg-[var(--ink)]"
              />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[rgba(4,6,10,0.94)] backdrop-blur-xl md:hidden"
          >
            <div className="shell flex h-full flex-col justify-center gap-2">
              {SECTIONS.map((s, i) => (
                <motion.a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => {
                    setMenu(false);
                    pulse(0.6);
                  }}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06 }}
                  className="display flex items-baseline gap-4 border-b border-[var(--line)] py-4 text-4xl"
                >
                  <span className="mono text-xs text-[var(--accent)]">{s.code}</span>
                  {s.label}
                </motion.a>
              ))}
              <a
                href={`mailto:${PROFILE.email}`}
                className="mono mt-8 text-xs tracking-[0.24em] text-[var(--ink-dim)]"
              >
                {PROFILE.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
