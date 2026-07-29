'use client';
import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

import Rig from './scene/Rig';
import InfiniteGrid from './scene/InfiniteGrid';
import DataStream from './scene/DataStream';
import Monoliths from './scene/Monoliths';
import Core from './scene/Core';
import Effects from './scene/Effects';
import { rig, detectTier } from '../(lib)/store';

const PRESETS = {
  2: { particles: 24000, slabs: 22, dpr: [1, 1.75], fx: true, ceiling: true },
  1: { particles: 8000, slabs: 12, dpr: [1, 1.3], fx: true, ceiling: false },
  0: { particles: 2500, slabs: 6, dpr: [1, 1], fx: false, ceiling: false },
};

export default function Scene() {
  const [tier, setTier] = useState(null);

  useEffect(() => {
    const t = detectTier();
    rig.tier = t;
    setTier(t);
  }, []);

  // wait for the tier probe so we never build 24k points on a phone
  if (tier === null) return <div className="fixed inset-0 -z-10 bg-[#04060a]" />;

  const p = PRESETS[tier];

  return (
    <div
      className="fixed inset-0 -z-10"
      style={{ background: 'radial-gradient(120% 80% at 50% 30%, #071018 0%, #04060a 60%, #010203 100%)' }}
      aria-hidden="true"
    >
      <Canvas
        dpr={p.dpr}
        frameloop="always"
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        camera={{ fov: 58, near: 0.1, far: 420, position: [0, 1.5, 36] }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color('#04060a'), 0);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.15;
        }}
      >
        <fog attach="fog" args={['#04060a', 40, 240]} />
        <Suspense fallback={null}>
          <Rig />
          <InfiniteGrid y={-6} fade={1} />
          {p.ceiling ? <InfiniteGrid y={16} flip fade={0.45} /> : null}
          <DataStream count={p.particles} />
          <Monoliths count={p.slabs} />
          <Core />
          {p.fx ? <Effects tier={tier} /> : null}
        </Suspense>
      </Canvas>
    </div>
  );
}
