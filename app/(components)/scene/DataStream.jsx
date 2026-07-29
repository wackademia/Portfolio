'use client';
import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { rig } from '../../(lib)/store';

const LENGTH = 340;

const vertex = /* glsl */ `
  precision highp float;

  attribute float aSeed;
  attribute float aScale;
  attribute float aKind;

  uniform float uTime;
  uniform float uCamZ;
  uniform float uSize;
  uniform float uVel;
  uniform float uEntered;
  uniform float uLength;
  uniform vec2  uPointer;

  varying float vAlpha;
  varying float vKind;
  varying float vTwinkle;

  void main() {
    vec3 p = position;

    // wrap the particle into the slab of space directly ahead of the camera
    float z = uCamZ - mod(p.z - uCamZ, uLength);

    // slow organic drift, unique per particle
    float t = uTime * (0.16 + aSeed * 0.22);
    p.x += sin(t + aSeed * 41.0) * (0.9 + aSeed * 1.6);
    p.y += cos(t * 0.83 + aSeed * 27.0) * (0.9 + aSeed * 1.4);

    // the whole field leans away from the pointer — the "wind" of the cursor
    float lean = (1.0 - uEntered) * 0.4 + 0.6;
    p.x += uPointer.x * 2.6 * lean * (0.3 + aSeed);
    p.y += -uPointer.y * 2.0 * lean * (0.3 + aSeed);

    vec4 mv = modelViewMatrix * vec4(p.x, p.y, z, 1.0);

    float dist = -mv.z;
    // fade in from the far plane, fade out as it whips past the near plane
    vAlpha = smoothstep(uLength, uLength * 0.55, dist) * smoothstep(0.5, 14.0, dist);
    vAlpha *= 0.25 + 0.75 * uEntered;
    vKind = aKind;
    vTwinkle = 0.55 + 0.45 * sin(uTime * (1.4 + aSeed * 3.0) + aSeed * 62.0);

    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aScale * (1.0 + uVel * 1.8) * (260.0 / max(dist, 1.0));
  }
`;

const fragment = /* glsl */ `
  precision highp float;

  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;

  varying float vAlpha;
  varying float vKind;
  varying float vTwinkle;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;

    // hard core + soft halo reads as a light source rather than a blurry dot
    float core = smoothstep(0.16, 0.0, d);
    float halo = smoothstep(0.5, 0.0, d) * 0.42;

    vec3 col = mix(uColorA, uColorB, smoothstep(0.0, 0.6, vKind));
    col = mix(col, uColorC, smoothstep(0.93, 1.0, vKind));

    float a = (core + halo) * vAlpha * vTwinkle;
    if (a < 0.004) discard;
    gl_FragColor = vec4(col, a);
  }
`;

export default function DataStream({ count = 24000, radius = 46, size = 2.6 }) {
  const points = useRef();
  const { camera } = useThree();

  const geometry = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    const scale = new Float32Array(count);
    const kind = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // cylindrical shell around the corridor — hollow in the middle so the
      // camera always has a clear tunnel to fly through
      const a = Math.random() * Math.PI * 2;
      const r = 4 + Math.pow(Math.random(), 0.65) * radius;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = Math.sin(a) * r * 0.62 + 2;
      pos[i * 3 + 2] = -Math.random() * LENGTH;

      seed[i] = Math.random();
      scale[i] = 0.35 + Math.pow(Math.random(), 2.4) * 1.9;
      kind[i] = Math.random();
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    g.setAttribute('aScale', new THREE.BufferAttribute(scale, 1));
    g.setAttribute('aKind', new THREE.BufferAttribute(kind, 1));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e6);
    return g;
  }, [count, radius]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uCamZ: { value: 0 },
      uSize: { value: size },
      uVel: { value: 0 },
      uEntered: { value: 0 },
      uLength: { value: LENGTH },
      uPointer: { value: new THREE.Vector2() },
      uColorA: { value: new THREE.Color('#35e6ff') },
      uColorB: { value: new THREE.Color('#c9f4ff') },
      uColorC: { value: new THREE.Color('#ffb03a') },
    }),
    [size]
  );

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uCamZ.value = camera.position.z;
    uniforms.uVel.value = Math.min(1.4, Math.abs(rig.velocity) * 30 + rig.impulse);
    uniforms.uEntered.value = rig.entered;
    uniforms.uPointer.value.set(rig.pointerEased.x, rig.pointerEased.y);
  });

  return (
    <points ref={points} geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
