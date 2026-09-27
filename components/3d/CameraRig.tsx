"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CameraRigProps {
  intensity?: number;
}

export function CameraRig({ intensity = 1 }: CameraRigProps) {
  const vec = useRef(new THREE.Vector3());

  useFrame((state) => {
    // Subtle parallax response to mouse cursor (-1 to 1)
    const targetX = state.pointer.x * 0.45 * intensity;
    const targetY = 2.2 + state.pointer.y * 0.25 * intensity;
    const targetZ = 3.8;

    // Smooth lerp damping
    state.camera.position.lerp(
      vec.current.set(targetX, targetY, targetZ),
      0.04
    );

    // Always focus on center of the gift box
    state.camera.lookAt(0, 0.15, 0);
  });

  return null;
}
