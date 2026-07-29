# ZABIR AZMAYAN — terminal

Immersive WebGL portfolio. Data-terminal / cyber-grid direction: a reflective
infinite grid, 24,000 GPU-animated nodes, wireframe monoliths, and a scroll-driven
camera that flies down a 300-unit corridor. Gated behind a cinematic boot sequence.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Node 18+.

## How it's put together

```
app/
├── (lib)/
│   ├── store.js          render-free shared state (scroll, pointer, impulses)
│   └── content.js        all copy, projects, stack — edit here, not in components
├── (components)/
│   ├── Shell.jsx         composes everything; lazy-loads the 3D scene
│   ├── Scene.jsx         <Canvas>, perf tiers, fog, tone mapping
│   ├── scene/
│   │   ├── Rig.jsx           camera down the corridor + pointer parallax
│   │   ├── InfiniteGrid.jsx  floor/ceiling grid shader (sonar rings, sweep bar)
│   │   ├── DataStream.jsx    24k-point GPU particle field
│   │   ├── Monoliths.jsx     wireframe slabs flanking the corridor
│   │   ├── Core.jsx          the gyroscope object in the hero
│   │   └── Effects.jsx       bloom / chromatic aberration / scanline / noise
│   ├── Gate.jsx          boot log, signal-lock meter, ENTER
│   ├── Telemetry.jsx     the only window-level input listener
│   ├── SmoothScroll.jsx  Lenis inertial scroll + eased anchor jumps
│   ├── Cursor.jsx        dot + lagging ring
│   ├── Hud.jsx           section index, depth/FPS/clock readout
│   ├── Nav.jsx / Footer.jsx
│   ├── ui/               Reveal, SectionHead, Scramble
│   └── sections/         Index, Manifest, Archive, Research, Stack, Uplink
└── globals.css           design tokens + all non-Tailwind effects
```

### The one thing worth knowing

Scroll and pointer never touch React state. `Telemetry` writes into the plain
`rig` object in `(lib)/store.js` and the scene samples it inside `useFrame`.
Putting 60Hz input through `useState` would re-render the whole tree every frame
and kill the frame budget. Only discrete events (gate opened, active section)
go through React.

## Performance tiers

`detectTier()` probes pointer type, viewport, core count and `prefers-reduced-motion`,
then `Scene.jsx` picks a preset:

| tier | particles | slabs | DPR cap | postprocessing |
|------|-----------|-------|---------|----------------|
| 2 desktop | 24,000 | 22 | 1.75 | full + scanline |
| 1 mid / mobile | 8,000 | 12 | 1.3 | no scanline |
| 0 reduced-motion | 2,500 | 6 | 1.0 | off |

Reduced-motion also disables Lenis and collapses every CSS animation.

## Editing content

Everything lives in `app/(lib)/content.js` — projects, thesis, stack groups,
education, the boot log lines. Components read from it; none of them hardcode copy.

Section IDs (`index`, `manifest`, `archive`, `research`, `stack`, `uplink`) are
referenced by the nav, HUD and footer via `SECTIONS`, so renaming one there
updates all three.

## Accessibility notes

- `prefers-reduced-motion` is honoured throughout.
- The gate is keyboard-operable (Enter / Space) and the whole site is reachable
  without it once opened.
- `<noscript>` in `layout.js` serves the full text content and contact details,
  so crawlers and no-JS visitors don't hit a blank canvas.
- The canvas is `aria-hidden` — it carries no information the DOM doesn't.

## Stack

Next.js 14 · React 18 · Three.js r169 · @react-three/fiber ·
@react-three/postprocessing · Framer Motion · Lenis · Tailwind CSS
