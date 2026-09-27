"use client";

import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BoxTheme } from "@/types/product";

interface BoxModelProps {
  theme: BoxTheme;
  boxOpenAsset?: string;
  isTransitioning?: boolean;
}

export function BoxModel({
  theme,
  boxOpenAsset,
  isTransitioning = false,
}: BoxModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [boxTexture, setBoxTexture] = useState<THREE.Texture | null>(null);

  // Load realistic box imagery texture
  useEffect(() => {
    if (!boxOpenAsset) return;
    const loader = new THREE.TextureLoader();
    loader.load(
      boxOpenAsset,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        setBoxTexture(tex);
      },
      undefined,
      (err) => {
        console.warn("Box texture load fallback:", err);
      }
    );
  }, [boxOpenAsset]);

  // Subtle breathing idle motion when not transitioning
  useFrame((state) => {
    if (!groupRef.current || isTransitioning) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.02;
    groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.015;
  });

  return (
    <group ref={groupRef} position={[0, -0.15, 0]} rotation={[0.08, -0.1, 0]}>
      {boxTexture ? (
        /* Realistic Photographic Gift Box Model with contact shadow */
        <group>
          {/* Main Photorealistic Open Box with Kraft Bed & Gold Trim */}
          <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
            <planeGeometry args={[3.2, 3.2]} />
            <meshStandardMaterial
              map={boxTexture}
              transparent
              alphaTest={0.05}
              roughness={0.4}
              metalness={0.1}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ) : (
        /* Procedural Fallback Mesh if texture is still loading */
        <group>
          <mesh position={[0, -0.1, 0]} receiveShadow castShadow>
            <boxGeometry args={[2.5, 0.6, 1.8]} />
            <meshStandardMaterial
              color={theme.boxColor}
              roughness={0.4}
              metalness={0.1}
            />
          </mesh>

      {/* Box Inner Bed / Shredded kraft paper bed */}
      <mesh position={[0, 0.08, 0]} receiveShadow>
        <boxGeometry args={[2.35, 0.35, 1.65]} />
        <meshStandardMaterial
          color="#D8C8B0"
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>

      {/* Decorative Gold Ribbon Wrap - Horizontal */}
      <mesh position={[0, -0.09, 0]}>
        <boxGeometry args={[2.52, 0.1, 1.82]} />
        <meshStandardMaterial
          color={theme.ribbonColor}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Decorative Gold Ribbon Wrap - Vertical */}
      <mesh position={[0, -0.09, 0]}>
        <boxGeometry args={[0.22, 0.62, 1.82]} />
        <meshStandardMaterial
          color={theme.ribbonColor}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Open Gift Box Lid propped gracefully behind */}
      <group position={[0, 0.45, -0.95]} rotation={[-0.95, 0, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.54, 0.14, 1.84]} />
          <meshStandardMaterial
            color={theme.lidColor}
            roughness={0.4}
            metalness={0.1}
          />
        </mesh>

        {/* Gold Trim along lid rim */}
        <mesh position={[0, 0.08, 0]}>
          <boxGeometry args={[2.56, 0.02, 1.86]} />
          <meshStandardMaterial
            color={theme.ribbonColor}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </group>

      {/* Front Brand Medallion (VÙNG QUÊ) */}
      <mesh position={[0, -0.1, 0.91]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.02, 32]} />
        <meshStandardMaterial
          color="#B9955A"
          roughness={0.25}
          metalness={0.85}
        />
      </mesh>
        </group>
      )}
    </group>
  );
}
