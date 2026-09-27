"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingParticles3DProps {
  count?: number;
  color?: string;
}

export function FloatingParticles3D({
  count = 35,
  color = "#B9955A",
}: FloatingParticles3DProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  // Generate random positions, scales, and phase offsets
  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        x: (Math.random() - 0.5) * 5,
        y: Math.random() * 3 - 0.5,
        z: (Math.random() - 0.5) * 4,
        scale: 0.02 + Math.random() * 0.035,
        speed: 0.3 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 1.5,
      });
    }
    return data;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    particles.forEach((p, i) => {
      // Gentle floating up and oscillating
      const curY = p.y + Math.sin(time * p.speed + p.phase) * 0.25;
      const curX = p.x + Math.cos(time * 0.4 + p.phase) * 0.15;
      const curZ = p.z + Math.sin(time * 0.3 + p.phase) * 0.15;

      dummy.position.set(curX, curY, curZ);
      dummy.scale.set(p.scale, p.scale, p.scale);
      dummy.rotation.set(
        time * p.rotSpeed,
        time * p.rotSpeed * 0.5,
        time * p.rotSpeed * 0.8
      );
      dummy.updateMatrix();

      meshRef.current?.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      frustumCulled={false}
    >
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        roughness={0.3}
        metalness={0.8}
        transparent
        opacity={0.7}
      />
    </instancedMesh>
  );
}
