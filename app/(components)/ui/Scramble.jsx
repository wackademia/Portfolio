'use client';
import { useEffect, useRef, useState } from 'react';

const CHARS = '█▓▒░<>/\\{}[]#$%&*+=-_01';

/**
 * Decodes text character-by-character out of noise. Runs once on enter and
 * again on hover, which makes headings feel like they're being received rather
 * than rendered.
 */
export default function Scramble({ text, as: Tag = 'span', className = '', speed = 34 }) {
  const [out, setOut] = useState(text);
  const ref = useRef(null);
  const timer = useRef(null);

  const run = () => {
    clearInterval(timer.current);
    let frame = 0;
    const total = text.length * 2 + 8;

    timer.current = setInterval(() => {
      frame += 1;
      const revealed = Math.floor((frame / total) * text.length * 1.6);
      setOut(
        text
          .split('')
          .map((c, i) => {
            if (c === ' ') return ' ';
            if (i < revealed) return c;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );
      if (frame >= total) {
        clearInterval(timer.current);
        setOut(text);
      }
    }, speed);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <Tag ref={ref} className={className} onMouseEnter={run}>
      {out}
    </Tag>
  );
}
