'use client';
import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { rig } from '../../(lib)/store';

const vertex = /* glsl */ `
  varying vec3 vWorld;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorld = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

/**
 * The floor / ceiling of the corridor. The mesh is parented to the camera's Z
 * so it never runs out, but the grid coordinates are world-space — which is
 * what makes the lines appear to rush past instead of sliding with you.
 */
const fragment = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uCamZ;
  uniform float uVel;
  uniform float uEntered;
  uniform float uFade;
  uniform vec3  uColor;
  uniform vec3  uHot;
  varying vec3 vWorld;

  float gridMask(vec2 p, float scale, float weight) {
    vec2 c = p / scale;
    vec2 d = fwidth(c) * weight;
    vec2 g = abs(fract(c - 0.5) - 0.5) / max(d, vec2(1e-5));
    return 1.0 - min(min(g.x, g.y), 1.0);
  }

  void main() {
    vec2 p = vWorld.xz;

    float fine   = gridMask(p, 2.0,  1.0) * 0.30;
    float coarse = gridMask(p, 10.0, 1.6) * 0.75;
    float lines  = max(fine, coarse);

    // distance falloff from the camera, in the corridor's own axis
    float dz = abs(vWorld.z - uCamZ);
    float dx = abs(vWorld.x);
    float depthFade = 1.0 - smoothstep(8.0, 150.0, dz);
    float sideFade  = 1.0 - smoothstep(10.0, 90.0, dx);
    float nearFade  = smoothstep(1.0, 9.0, dz);
    float fade = depthFade * sideFade * nearFade;

    // expanding sonar rings from the origin of the corridor
    float radial = length(vec2(vWorld.x, vWorld.z - uCamZ));
    float ring = smoothstep(0.9, 0.0, abs(sin(radial * 0.16 - uTime * 0.9)) ) ;
    ring = pow(ring, 12.0) * 0.55;

    // a scan bar that sweeps down the corridor
    float sweep = exp(-pow((vWorld.z - (uCamZ - 60.0 - mod(uTime * 26.0, 120.0))) * 0.09, 2.0));

    vec3 col = uColor * lines;
    col += uHot * (ring + sweep * lines * 2.2 + lines * uVel * 3.0);

    float a = (lines * 0.85 + ring * 0.5 + sweep * 0.25) * fade * uFade;
    a *= 0.25 + 0.75 * uEntered;

    if (a < 0.002) discard;
    gl_FragColor = vec4(col, a);
  }
`;

export default function InfiniteGrid({ y = -6, flip = false, fade = 1 }) {
  const mesh = useRef();
  const { camera } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uCamZ: { value: 0 },
      uVel: { value: 0 },
      uEntered: { value: 0 },
      uFade: { value: fade },
      uColor: { value: new THREE.Color('#2b6f8a') },
      uHot: { value: new THREE.Color('#35e6ff') },
    }),
    [fade]
  );

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.position.z = camera.position.z - 60;
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uCamZ.value = camera.position.z;
    uniforms.uVel.value = Math.min(1, Math.abs(rig.velocity) * 26 + rig.impulse * 0.4);
    uniforms.uEntered.value = rig.entered;
  });

  return (
    <mesh
      ref={mesh}
      position={[0, y, 0]}
      rotation={[flip ? Math.PI / 2 : -Math.PI / 2, 0, 0]}
      frustumCulled={false}
    >
      <planeGeometry args={[400, 400, 1, 1]} />
      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
