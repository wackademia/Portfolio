'use client';
import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';
import { EASE, skipMotion } from '../(lib)/motion';
import { SECTIONS, PROFILE } from '../(lib)/content';
import { pulse } from '../(lib)/store';

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);

  const headerRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const menuRef = useRef(null);
  const linkRefs = useRef([]);
  linkRefs.current = [];

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ---- header slide-in on mount ---------------------------------------- */
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    if (skipMotion()) {
      el.style.opacity = 1;
      el.style.transform = 'none';
      return;
    }
    animate(el, {
      translateY: [-80, 0],
      opacity: [0, 1],
      duration: 800,
      delay: 1100,
      ease: EASE,
    });
  }, []);

  /* ---- hamburger + mobile menu ------------------------------------------ */
  useEffect(() => {
    if (skipMotion()) {
      if (line1Ref.current) line1Ref.current.style.transform = menu ? 'rotate(45deg) translateY(3.5px)' : 'none';
      if (line2Ref.current) line2Ref.current.style.transform = menu ? 'rotate(-45deg) translateY(-3.5px)' : 'none';
      if (menuRef.current) {
        menuRef.current.style.opacity = menu ? 1 : 0;
        menuRef.current.style.clipPath = menu ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)';
        menuRef.current.style.pointerEvents = menu ? 'auto' : 'none';
      }
      return;
    }

    if (line1Ref.current) {
      animate(line1Ref.current, {
        rotate: menu ? 45 : 0,
        translateY: menu ? 3.5 : 0,
        duration: 300,
        ease: EASE,
      });
    }
    if (line2Ref.current) {
      animate(line2Ref.current, {
        rotate: menu ? -45 : 0,
        translateY: menu ? -3.5 : 0,
        duration: 300,
        ease: EASE,
      });
    }

    const overlay = menuRef.current;
    if (!overlay) return;

    if (menu) {
      overlay.style.pointerEvents = 'auto';
      animate(overlay, {
        opacity: [0, 1],
        clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0% 0)'],
        duration: 500,
        ease: EASE,
      });
      animate(linkRefs.current, {
        opacity: [0, 1],
        translateX: [-24, 0],
        duration: 500,
        delay: stagger(60, { start: 80 }),
        ease: EASE,
      });
    } else {
      overlay.style.pointerEvents = 'none';
      animate(overlay, {
        opacity: [1, 0],
        clipPath: ['inset(0 0 0% 0)', 'inset(0 0 100% 0)'],
        duration: 500,
        ease: EASE,
      });
    }
  }, [menu]);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
        style={{
          opacity: 0,
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
              <span ref={line1Ref} className="block h-px w-4 bg-[var(--ink)]" />
              <span ref={line2Ref} className="block h-px w-4 bg-[var(--ink)]" />
            </button>
          </div>
        </nav>
      </header>

      <div
        ref={menuRef}
        className="fixed inset-0 z-40 bg-[rgba(4,6,10,0.94)] backdrop-blur-xl md:hidden"
        style={{ opacity: 0, clipPath: 'inset(0 0 100% 0)', pointerEvents: 'none' }}
      >
        <div className="shell flex h-full flex-col justify-center gap-2">
          {SECTIONS.map((s, i) => (
            <a
              key={s.id}
              ref={(el) => (linkRefs.current[i] = el)}
              href={`#${s.id}`}
              onClick={() => {
                setMenu(false);
                pulse(0.6);
              }}
              className="display flex items-baseline gap-4 border-b border-[var(--line)] py-4 text-4xl"
            >
              <span className="mono text-xs text-[var(--accent)]">{s.code}</span>
              {s.label}
            </a>
          ))}
          <a
            href={`mailto:${PROFILE.email}`}
            className="mono mt-8 text-xs tracking-[0.24em] text-[var(--ink-dim)]"
          >
            {PROFILE.email}
          </a>
        </div>
      </div>
    </>
  );
}
