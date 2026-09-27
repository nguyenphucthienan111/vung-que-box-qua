"use client";

import React from "react";
import { FoodItem3D as FoodItemType } from "@/types/product";
import { FoodItem3D } from "./FoodItem3D";

interface FoodItems3DProps {
  items: FoodItemType[];
  entryProgress: number; // 0 to 1
  isExiting: boolean;
  exitProgress: number; // 0 to 1
  onHoverItem?: (item: FoodItemType | null) => void;
}

export function FoodItems3D({
  items,
  entryProgress,
  isExiting,
  exitProgress,
  onHoverItem,
}: FoodItems3DProps) {
  return (
    <group position={[0, 0.05, 0]}>
      {items.map((item, idx) => {
        // Stagger each item slightly for cinematic cascading arrival
        const staggeredEntry = Math.min(
          1,
          Math.max(0, (entryProgress - idx * 0.08) / 0.76)
        );
        const staggeredExit = Math.min(
          1,
          Math.max(0, (exitProgress - idx * 0.06) / 0.82)
        );

        return (
          <FoodItem3D
            key={item.id}
            item={item}
            animationProgress={staggeredEntry}
            isExiting={isExiting}
            exitProgress={staggeredExit}
            onHover={onHoverItem}
          />
        );
      })}
    </group>
  );
}
