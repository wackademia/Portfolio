'use client';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { rig, damp } from '../../(lib)/store';

// built once at module scope, not per render
const OUTER = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(3, 1));
const INNER = new THREE.EdgesGeometry(new THREE.OctahedronGeometry(1.7, 0));

/**
 * The focal object in the hero: a nested wireframe polyhedron that behaves like
 * a gyroscope. It tracks the pointer, spins up with scroll velocity, and drops
 * behind you as you enter the archive.
 */
export default function Core() {
  const group = useRef();
  const inner = useRef();
  const outer = useRef();
  const rings = useRef();
  const glow = useRef();
  const spin = useRef(0);

  const ringGeo = useMemo(() => new THREE.TorusGeometry(3.4, 0.012, 6, 128), []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    if (!group.current) return;

    const vel = Math.min(1.2, Math.abs(rig.velocity) * 26 + rig.impulse * 0.6);
    spin.current = damp(spin.current, 0.18 + vel * 2.6, 3, dt);

    // stays around the hero, then recedes as the page scrolls on
    const s = rig.scrollEased;
    group.current.position.set(
      3.2 + rig.pointerEased.x * 1.6,
      1.4 - rig.pointerEased.y * 1.2 + Math.sin(t * 0.5) * 0.3,
      -14 - s * 40
    );

    const appear = rig.entered * (1 - Math.min(1, s * 5.5));
    group.current.scale.setScalar(0.2 + appear * 1.0);
    group.current.visible = appear > 0.01;

    outer.current.rotation.y += spin.current * dt;
    outer.current.rotation.x += spin.current * 0.35 * dt;
    inner.current.rotation.y -= spin.current * 1.7 * dt;
    inner.current.rotation.z += spin.current * 0.8 * dt;

    rings.current.rotation.x = t * 0.4;
    rings.current.rotation.y = t * 0.27;
    rings.current.children[1].rotation.x = Math.PI / 2;
    rings.current.children[2].rotation.y = Math.PI / 2;

    if (glow.current) {
      glow.current.material.opacity = 0.05 + vel * 0.12;
      glow.current.scale.setScalar(1 + Math.sin(t * 1.2) * 0.04);
    }
  });

  return (
    <group ref={group}>
      <mesh ref={glow}>
        <sphereGeometry args={[3.1, 24, 24]} />
        <meshBasicMaterial
          color="#35e6ff"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <lineSegments ref={outer} geometry={OUTER}>
        <lineBasicMaterial
          color="#35e6ff"
          transparent
          opacity={0.75}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      <lineSegments ref={inner} geometry={INNER}>
        <lineBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      <group ref={rings}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} geometry={ringGeo}>
            <meshBasicMaterial
              color={i === 0 ? '#ffb03a' : '#6d7dff'}
              transparent
              opacity={0.55}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
