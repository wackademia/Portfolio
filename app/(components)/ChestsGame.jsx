"use client";
import { useEffect, useRef, useState } from "react";

export default function ChestsGame() {
  const containerRef = useRef(null);
  const timers = useRef([]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const rafRef = useRef();
  const [speed, setSpeed] = useState(120); // px per second
  const CHEST_SIZE = 64; // uniform size for all chests
  const draggingIdRef = useRef(null);
  const dragOffsetRef = useRef({ dx: 0, dy: 0 });
  const dragElemSizeRef = useRef({ w: 0, h: 0 });

  const chestTemplates = [
    {
      id: 1,
      infoTitle: "About",
      infoText: "I build modern web & mobile apps (React, Flutter) and ML systems.",
    },
    {
      id: 2,
      infoTitle: "Education",
      infoText: "B.Sc. CSE, BRAC University — focus in SE, ML, DS&A.",
    },
    {
      id: 3,
      infoTitle: "Projects",
      infoText: "Azure Business, Medihelp, Ride Sharing, YOLOv8 — real shipped work.",
    },
    {
      id: 4,
      infoTitle: "Contact",
      infoText: "Email: zabirazmyan53@gmail.com • Phone: +880 1969 526795.",
    },
  ];

  const generateChests = (width, height) =>
    chestTemplates.map((t) => {
      const size = CHEST_SIZE;
      const angle = Math.random() * Math.PI * 2;
      return {
        id: t.id,
        x: Math.random() * (width - size),
        y: Math.random() * (height - size),
        size,
        dx: Math.cos(angle),
        dy: Math.sin(angle),
        opened: false,
        burst: false,
        infoTitle: t.infoTitle,
        infoText: t.infoText,
      };
    });

  const [chests, setChests] = useState([]);

  const handleMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const xMouse = e.clientX - rect.left;
    const yMouse = e.clientY - rect.top;
    setMouse({ x: xMouse, y: yMouse });

    const draggingId = draggingIdRef.current;
    if (draggingId != null) {
      const width = rect.width;
      const height = rect.height;
      const { dx, dy } = dragOffsetRef.current;
      const { w, h } = dragElemSizeRef.current;
      let nx = xMouse - dx;
      let ny = yMouse - dy;
      nx = Math.max(0, Math.min(nx, width - w));
      ny = Math.max(0, Math.min(ny, height - h));
      setChests((prev) => prev.map((c) => (c.id === draggingId ? { ...c, x: nx, y: ny } : c)));
    }
  };

  const startDrag = (e, chest) => {
    if (!chest.opened) return;
    const rect = containerRef.current.getBoundingClientRect();
    draggingIdRef.current = chest.id;
    dragOffsetRef.current = { dx: e.clientX - rect.left - chest.x, dy: e.clientY - rect.top - chest.y };
    dragElemSizeRef.current = { w: e.currentTarget.offsetWidth, h: e.currentTarget.offsetHeight };
    e.preventDefault();
    e.stopPropagation();
  };

  const stopDrag = () => {
    draggingIdRef.current = null;
  };

  const openChest = (id) => {
    setChests((prev) => prev.map((c) => (c.id === id ? { ...c, burst: true } : c)));
    const t = setTimeout(() => {
      setChests((prev) => prev.map((c) => (c.id === id ? { ...c, burst: false, opened: true } : c)));
    }, 420);
    timers.current.push(t);
  };

  const resetGame = () => {
    // Cancel any pending explosion timers
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
    // Reset moving chests with random positions/directions/sizes
    const rect = containerRef.current?.getBoundingClientRect();
    const width = rect?.width ?? 600;
    const height = rect?.height ?? 400;
    setChests(generateChests(width, height));
  };

  useEffect(() => {
    return () => {
      timers.current.forEach((t) => clearTimeout(t));
      timers.current = [];
    };
  }, []);

  // Initialize chests after mount when container size is known
  useEffect(() => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setChests(generateChests(rect.width, rect.height));
    }
  }, []);

  // Movement for the chests (moving targets) — no dynamic size changes
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let { width, height } = container.getBoundingClientRect();

    const onResize = () => {
      const r = container.getBoundingClientRect();
      width = r.width;
      height = r.height;
    };
    window.addEventListener("resize", onResize);

    let last = performance.now();
    const loop = (now) => {
      const dt = (now - last) / 1000;
      last = now;

      setChests((prev) =>
        prev.map((c) => {
          if (c.opened) return c; // stop moving once opened to read info
          let { x, y, size, dx, dy } = c;
          const s = Math.max(10, speed);
          x += dx * s * dt;
          y += dy * s * dt;

          // Bounce on walls
          if (x <= 0) {
            x = 0;
            dx = Math.abs(dx);
          } else if (x + size >= width) {
            x = width - size;
            dx = -Math.abs(dx);
          }
          if (y <= 0) {
            y = 0;
            dy = Math.abs(dy);
          } else if (y + size >= height) {
            y = height - size;
            dy = -Math.abs(dy);
          }

          // Occasional direction jitter
          if (Math.random() < 0.02) {
            const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.6;
            dx = Math.cos(angle);
            dy = Math.sin(angle);
          }

          return { ...c, x, y, dx, dy };
        })
      );

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [speed]);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3 text-xs sm:text-sm">
          <span className="text-slate-300">Speed</span>
          <input
            type="range"
            min={30}
            max={300}
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value, 10))}
            className="w-40 sm:w-56 accent-indigo-500"
          />
          <span className="text-slate-400">{speed} px/s</span>
        </div>
        <button
          onClick={resetGame}
          className="px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-700 bg-slate-900/70 text-slate-200 hover:bg-slate-800 hover:border-slate-600 transition-colors"
        >
          Refresh Game
        </button>
      </div>
      <div
        ref={containerRef}
        onMouseMove={handleMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        className="relative h-[60vh] md:h-[70vh] rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden cursor-none"
      >
      <GunCursor x={mouse.x} y={mouse.y} />
      {chests.map((c) => (
        <button
          key={c.id}
          onClick={c.opened ? undefined : () => openChest(c.id)}
          onMouseDown={(e) => c.opened && startDrag(e, c)}
          className="absolute group"
          style={{ left: c.x, top: c.y, zIndex: draggingIdRef.current === c.id ? 50 : c.opened ? 30 : 10 }}
        >
          {!c.opened && (
            <div
              className="rounded-md bg-gradient-to-b from-yellow-300 to-amber-600 border-2 border-amber-700 shadow-xl relative"
              style={{ width: c.size, height: Math.round(c.size * 0.7) }}
            >
              <div className="absolute inset-x-2 top-1 h-3 bg-amber-700/60 rounded-sm" />
              <div className="absolute inset-x-4 bottom-2 h-2 bg-amber-800/80 rounded-sm" />
              <div className="absolute left-1/2 -translate-x-1/2 top-[40%] w-6 h-6 bg-amber-900/90 rounded-full border-2 border-yellow-200" />
            </div>
          )}
          {c.burst && <Explosion />}
          {c.opened && (
            <div className="w-[220px] sm:w-[260px] lg:w-[300px] p-3 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 animate-fade-in shadow-2xl">
              <p className="font-semibold text-sm mb-1">{c.infoTitle}</p>
              <p className="text-xs leading-relaxed">{c.infoText}</p>
            </div>
          )}
        </button>
      ))}
      </div>
    </div>
  );
}

function GunCursor({ x, y }) {
  return (
    <div className="absolute pointer-events-none -translate-x-5 -translate-y-7" style={{ left: x, top: y }} aria-hidden>
      <svg width="48" height="48" viewBox="0 0 60 60" className="drop-shadow-lg">
        <g transform="rotate(-12 30 30)">
          <rect x="8" y="26" width="28" height="10" rx="3" fill="#94a3b8"></rect>
          <rect x="36" y="28" width="18" height="6" rx="2" fill="#64748b"></rect>
          <rect x="4" y="28" width="7" height="6" rx="1" fill="#1f2937"></rect>
          <rect x="16" y="22" width="8" height="4" rx="1" fill="#6b7280"></rect>
        </g>
      </svg>
    </div>
  );
}

function Explosion() {
  return (
    <div className="absolute -left-6 -top-6 w-32 h-32 pointer-events-none">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 explosion-burst" />
    </div>
  );
}