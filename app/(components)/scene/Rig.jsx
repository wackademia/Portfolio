'use client';
import { useFrame, useThree } from '@react-three/fiber';
import { rig, damp } from '../../(lib)/store';

/** Total depth the camera travels between scroll 0 and scroll 1. */
export const CORRIDOR = 300;
export const START_Z = 10;

/**
 * Drives the camera down the corridor from scroll, adds pointer parallax and a
 * little idle drift so the frame is never completely static.
 */
export default function Rig() {
  const { camera } = useThree();

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);

    // ease the raw inputs so a jerky trackpad doesn't jerk the camera
    rig.scrollEased = damp(rig.scrollEased, rig.scroll, 6, dt);
    rig.pointerEased.x = damp(rig.pointerEased.x, rig.pointer.x, 4, dt);
    rig.pointerEased.y = damp(rig.pointerEased.y, rig.pointer.y, 4, dt);
    rig.impulse = Math.max(0, rig.impulse - dt * 1.8);
    rig.entered = damp(rig.entered, rig.gateOpen ? 1 : 0, 2.2, dt);

    const t = state.clock.elapsedTime;
    const px = rig.pointerEased.x;
    const py = rig.pointerEased.y;

    // while the gate is up the camera sits further back and lower
    const gate = 1 - rig.entered;

    camera.position.z =
      START_Z + gate * 26 - rig.scrollEased * CORRIDOR;
    camera.position.x = px * 3.2 + Math.sin(t * 0.21) * 0.5;
    camera.position.y =
      1.5 - py * 1.6 + Math.sin(t * 0.17) * 0.28 - gate * 0.6;

    // look slightly ahead and toward the pointer — makes the corridor bank
    camera.lookAt(
      px * 5.5,
      1.2 - py * 3.4,
      camera.position.z - 24
    );
    camera.rotation.z = -px * 0.045 + Math.sin(t * 0.13) * 0.01;
    camera.fov = 58 + rig.velocity * 90 + gate * 6;
    camera.updateProjectionMatrix();
  });

  return null;
}
