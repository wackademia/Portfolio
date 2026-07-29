'use client';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Noise,
  Vignette,
  Scanline,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import { rig } from '../../(lib)/store';

/**
 * Scroll velocity and one-shot impulses drive the aberration + bloom, so the
 * whole image "strains" when you move fast and settles when you stop reading.
 */
export default function Effects({ tier = 2 }) {
  const bloom = useRef();

  /**
   * `wrapEffect` forwards props straight into the effect's constructor, so an
   * array here would overwrite the `offset` uniform with a plain array and the
   * effect would have no `.set`. It has to be a real Vector2 — and because we
   * own the instance, we can just mutate it every frame instead of re-creating.
   */
  const offset = useMemo(() => new THREE.Vector2(0.0008, 0.0004), []);

  useFrame(() => {
    const v = Math.min(1, Math.abs(rig.velocity) * 26);
    const shock = Math.min(1.4, v + rig.impulse);

    const o = 0.0006 + shock * 0.006;
    offset.set(o, o * 0.55);

    if (bloom.current) {
      bloom.current.intensity = 0.75 + shock * 0.9 + rig.entered * 0.25;
    }
  });

  return (
    <EffectComposer multisampling={0} disableNormalPass>
      <Bloom
        ref={bloom}
        intensity={0.9}
        luminanceThreshold={0.12}
        luminanceSmoothing={0.5}
        mipmapBlur
        radius={0.72}
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={offset}
        radialModulation
        modulationOffset={0.2}
      />
      {/* EffectComposer reads its real three.js children, so a `false` here is
          harmless — the scanline simply never mounts below tier 2 */}
      {tier >= 2 && (
        <Scanline blendFunction={BlendFunction.OVERLAY} density={1.6} opacity={0.05} />
      )}
      <Noise premultiply blendFunction={BlendFunction.SCREEN} opacity={0.16} />
      <Vignette eskil={false} offset={0.22} darkness={0.85} />
    </EffectComposer>
  );
}
