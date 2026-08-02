'use client';
import { useEffect, useRef } from 'react';
import { animate, createScope, scrambleText } from 'animejs';
import { skipMotion } from '../../(lib)/motion';

// '-' is a range operator in animejs's chars string, so it sits at the end to read literally.
const CHARS = '█▓▒░<>/\\{}[]#$%&*+=_01-';

/**
 * Decodes text character-by-character out of noise, using animejs's built-in
 * scrambleText text-tween. Runs once on enter and again on hover, which makes
 * headings feel like they're being received rather than rendered.
 */
export default function Scramble({ text, as: Tag = 'span', className = '', speed = 34 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const run = () => {
      if (skipMotion()) {
        el.textContent = text;
        return;
      }
      animate(el, {
        textContent: scrambleText({
          chars: CHARS,
          from: 'random',
          revealRate: 1000 / speed,
        }),
      });
    };

    const scope = createScope({ root: ref }).add(() => {
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
      el.addEventListener('mouseenter', run);
      return () => {
        io.disconnect();
        el.removeEventListener('mouseenter', run);
      };
    });

    return () => scope.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed]);

  return (
    <Tag ref={ref} className={className}>
      {text}
    </Tag>
  );
}
