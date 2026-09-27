"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Product, FoodItem3D as FoodItemType } from "@/types/product";
import { BoxModel } from "./BoxModel";
import { FoodItems3D } from "./FoodItems3D";
import { FloatingParticles3D } from "./FloatingParticles3D";
import { SceneLighting } from "./SceneLighting";
import { TransitionState } from "@/hooks/useProduct3DTransition";

interface ProductTransition3DProps {
  product: Product;
  transitionState: TransitionState;
  foodExitProgress: number;
  boxExitProgress: number;
  boxEnterProgress: number;
  foodEnterProgress: number;
  onHoverItem?: (item: FoodItemType | null) => void;
}

export function ProductTransition3D({
  product,
  transitionState,
  foodExitProgress,
  boxExitProgress,
  boxEnterProgress,
  foodEnterProgress,
  onHoverItem,
}: ProductTransition3DProps) {
  const boxGroupRef = useRef<THREE.Group>(null);

  // Manage Box entering & exiting motion
  useFrame(() => {
    if (!boxGroupRef.current) return;

    if (transitionState === "EXITING_BOX") {
      // Box dips down and fades/scales slightly
      const p = boxExitProgress;
      boxGroupRef.current.position.y = -p * 1.5;
      boxGroupRef.current.rotation.y = -p * 0.4;
      const s = Math.max(0.01, 1 - p * 0.5);
      boxGroupRef.current.scale.set(s, s, s);
    } else if (transitionState === "ENTERING_BOX") {
      // New box comes in from slight scale/rise
      const p = boxEnterProgress;
      // Spring bounce
      const s = 0.5 + p * 0.5;
      boxGroupRef.current.scale.set(s, s, s);
      boxGroupRef.current.position.y = (1 - p) * 0.8;
      boxGroupRef.current.rotation.y = (1 - p) * 0.3;
    } else if (transitionState === "SETTLE") {
      boxGroupRef.current.position.y = 0;
      boxGroupRef.current.rotation.y = 0;
      boxGroupRef.current.scale.set(1, 1, 1);
    }
  });

  const isExitingFood = transitionState === "EXITING_FOOD";

  return (
    <>
      <SceneLighting
        atmosphereColor={product.theme.atmosphereColor}
        accentColor={product.theme.accentColor}
      />

      <FloatingParticles3D
        count={32}
        color={product.theme.ribbonColor || "#B9955A"}
      />

      <group ref={boxGroupRef} position={[0, 0, 0]}>
        <BoxModel
          theme={product.theme}
          boxOpenAsset={product.boxOpenAsset || product.heroImage}
          isTransitioning={transitionState !== "IDLE"}
        />

        <FoodItems3D
          items={product.items3D}
          entryProgress={foodEnterProgress}
          isExiting={isExitingFood}
          exitProgress={foodExitProgress}
          onHoverItem={onHoverItem}
        />
      </group>
    </>
  );
}
