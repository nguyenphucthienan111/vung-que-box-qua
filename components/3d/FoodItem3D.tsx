"use client";

import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { FoodItem3D as FoodItemType } from "@/types/product";

interface FoodItem3DProps {
  item: FoodItemType;
  animationProgress: number; // 0 (at start pos) to 1 (settled in box)
  isExiting: boolean;
  exitProgress: number; // 0 to 1 (flying out)
  onHover?: (item: FoodItemType | null) => void;
}

export function FoodItem3D({
  item,
  animationProgress,
  isExiting,
  exitProgress,
  onHover,
}: FoodItem3DProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  // Load realistic transparent food texture asynchronously
  useEffect(() => {
    if (!item.imageAsset) return;
    const loader = new THREE.TextureLoader();
    loader.load(
      item.imageAsset,
      (loadedTex) => {
        loadedTex.colorSpace = THREE.SRGBColorSpace;
        loadedTex.generateMipmaps = true;
        loadedTex.minFilter = THREE.LinearMipmapLinearFilter;
        setTexture(loadedTex);
      },
      undefined,
      (err) => {
        // Fallback gracefully to procedural shape if file not found
        console.warn(`Texture load fallback for ${item.name}:`, err);
      }
    );
  }, [item.imageAsset, item.name]);

  // Compute entry start coordinates based on entryDirection
  const getStartTransform = (dir: FoodItemType["entryDirection"]) => {
    switch (dir) {
      case "left":
        return {
          pos: new THREE.Vector3(-4.5, 1.8, 0.9),
          rot: new THREE.Euler(-0.4, 0.9, -0.6),
          scale: 1.35,
        };
      case "right":
        return {
          pos: new THREE.Vector3(4.5, 2.0, -0.7),
          rot: new THREE.Euler(0.4, -0.9, 0.6),
          scale: 1.35,
        };
      case "top":
        return {
          pos: new THREE.Vector3(0.2, 5.0, 0.6),
          rot: new THREE.Euler(0.7, 0.3, -0.4),
          scale: 1.4,
        };
      case "bottom":
        return {
          pos: new THREE.Vector3(-0.5, -4.0, 1.2),
          rot: new THREE.Euler(-0.6, -0.4, 0.5),
          scale: 1.25,
        };
      case "behind":
      default:
        return {
          pos: new THREE.Vector3(0, 2.5, -4.8),
          rot: new THREE.Euler(-0.8, 0.6, 0.3),
          scale: 1.3,
        };
    }
  };

  // Easing functions for organic fluid motion
  const easeOutBack = (x: number): number => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  };

  const easeInCubic = (x: number): number => x * x * x;

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    const start = getStartTransform(item.entryDirection);
    const targetPos = new THREE.Vector3(...item.position);
    const targetRot = new THREE.Euler(...item.rotation);

    if (isExiting) {
      // Curve out trajectory
      const p = easeInCubic(Math.min(1, Math.max(0, exitProgress)));
      const exitPos = new THREE.Vector3(
        targetPos.x + (item.entryDirection === "left" ? -4.0 : 4.0) * p,
        targetPos.y + 3.0 * p,
        targetPos.z + (item.entryDirection === "behind" ? -4.5 : 2.5) * p
      );

      meshRef.current.position.copy(exitPos);
      meshRef.current.rotation.set(
        targetRot.x + p * 1.8,
        targetRot.y + p * 2.2,
        targetRot.z + p * 1.4
      );
      const s = Math.max(0, item.scale * (1 - p * 0.75));
      meshRef.current.scale.set(s, s, s);
    } else {
      // Entering into box
      const p = Math.min(1, Math.max(0, animationProgress));
      const easedP = p < 1 ? easeOutBack(p) : 1;

      // Curved bezier arc via intermediate apex
      const currentX = THREE.MathUtils.lerp(start.pos.x, targetPos.x, easedP);
      const currentY =
        THREE.MathUtils.lerp(start.pos.y, targetPos.y, easedP) +
        Math.sin(p * Math.PI) * 0.75;
      const currentZ = THREE.MathUtils.lerp(start.pos.z, targetPos.z, easedP);

      // Subtle hover elevation & gentle breathing float when settled
      const hoverOffset = hovered ? 0.14 : 0;
      const idleFloat =
        p >= 1 ? Math.sin(t * 1.6 + item.position[0] * 3) * 0.018 : 0;

      meshRef.current.position.set(
        currentX,
        currentY + hoverOffset + idleFloat,
        currentZ
      );

      // Interpolate 3D rotation
      meshRef.current.rotation.set(
        THREE.MathUtils.lerp(start.rot.x, targetRot.x, Math.min(1, p * 1.1)),
        THREE.MathUtils.lerp(start.rot.y, targetRot.y, Math.min(1, p * 1.1)),
        THREE.MathUtils.lerp(start.rot.z, targetRot.z, Math.min(1, p * 1.1))
      );

      // Interpolate scale
      const currentScale =
        THREE.MathUtils.lerp(start.scale, item.scale, Math.min(1, p * 1.1)) *
        (hovered ? 1.1 : 1);
      meshRef.current.scale.set(currentScale, currentScale, currentScale);
    }
  });

  return (
    <group
      ref={meshRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        onHover?.(item);
      }}
      onPointerOut={() => {
        setHovered(false);
        onHover?.(null);
      }}
    >
      {texture ? (
        // Realistic Transparent Food Photo Mesh with 3D physical depth
        <group>
          {/* Main Front Photo Plane with Alpha Channel */}
          <mesh castShadow receiveShadow position={[0, 0, 0.015]}>
            <planeGeometry args={[1.0, 1.0]} />
            <meshStandardMaterial
              map={texture}
              transparent
              alphaTest={0.01}
              roughness={0.35}
              metalness={0.05}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Secondary Back Plane giving physical 3D thickness */}
          <mesh position={[0, 0, -0.015]}>
            <planeGeometry args={[0.98, 0.98]} />
            <meshStandardMaterial
              map={texture}
              transparent
              alphaTest={0.01}
              roughness={0.5}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Subtle Dynamic Contact Shadow beneath the food item */}
          <mesh position={[0, -0.45, -0.05]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.7, 0.4]} />
            <meshBasicMaterial
              color="#0F1812"
              transparent
              opacity={hovered ? 0.2 : 0.45}
            />
          </mesh>
        </group>
      ) : (
        // High-fidelity fallback procedural silhouette
        <group>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.26, 0.26, 0.55, 32]} />
            <meshStandardMaterial
              color={item.color}
              roughness={0.3}
              metalness={0.2}
            />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.28, 0.28, 0.08, 32]} />
            <meshStandardMaterial
              color={item.accentColor || "#B9955A"}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        </group>
      )}
    </group>
  );
}
