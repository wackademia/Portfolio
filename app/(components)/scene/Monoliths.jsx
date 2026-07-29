'use client';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { rig } from '../../(lib)/store';

// one shared box + edge geometry for every slab — allocating these per render
// would churn GPU buffers on every frame the component re-renders
const BOX = new THREE.BoxGeometry(1, 1, 1);
const EDGES = new THREE.EdgesGeometry(BOX);

/**
 * Wireframe slabs flanking the corridor. They're pure atmosphere — no
 * interaction — but they give the fly-through a sense of scale and speed that
 * particles alone can't.
 */
function makeSlabs(count) {
  const out = [];
  for (let i = 0; i < count; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const r = (n) => Math.sin(i * 12.9898 + n * 78.233) * 43758.5453 % 1;
    const rand = (n) => Math.abs(r(n));
    out.push({
      pos: [
        side * (13 + rand(1) * 12),
        -4 + rand(2) * 9,
        -14 - i * 15 - rand(3) * 8,
      ],
      scale: [
        1.6 + rand(4) * 3.4,
        7 + rand(5) * 22,
        1.6 + rand(6) * 3.4,
      ],
      spin: (rand(7) - 0.5) * 0.12,
      phase: rand(8) * 6.28,
      hot: rand(9) > 0.72,
    });
  }
  return out;
}

function Slab({ data }) {
  const group = useRef();
  const edge = useRef();

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * data.spin + data.phase;
    group.current.position.y =
      data.pos[1] + Math.sin(t * 0.4 + data.phase) * 0.7;
    if (edge.current) {
      const flick = data.hot
        ? 0.35 + 0.35 * Math.abs(Math.sin(t * 2.1 + data.phase))
        : 0.16;
      edge.current.material.opacity = flick * (0.3 + 0.7 * rig.entered);
    }
  });

  return (
    <group ref={group} position={data.pos}>
      <mesh scale={data.scale} geometry={BOX}>
        <meshBasicMaterial
          color="#050a10"
          transparent
          opacity={0.55}
          depthWrite={false}
        />
      </mesh>
      <lineSegments ref={edge} scale={data.scale} geometry={EDGES}>
        <lineBasicMaterial
          color={data.hot ? '#35e6ff' : '#4b7f96'}
          transparent
          opacity={0.2}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

export default function Monoliths({ count = 22 }) {
  const slabs = useMemo(() => makeSlabs(count), [count]);
  return (
    <group>
      {slabs.map((d, i) => (
        <Slab key={i} data={d} />
      ))}
    </group>
  );
}
