"use client";

import { useState, useCallback, useRef } from "react";
import { Product } from "@/types/product";

export type TransitionState =
  | "IDLE"
  | "EXITING_FOOD"
  | "EXITING_BOX"
  | "ENTERING_BOX"
  | "ENTERING_FOOD"
  | "SETTLE";

export function useProduct3DTransition(initialProduct: Product) {
  const [currentProduct, setCurrentProduct] = useState<Product>(initialProduct);
  const [transitionState, setTransitionState] = useState<TransitionState>("IDLE");
  const [foodExitProgress, setFoodExitProgress] = useState(0);
  const [boxExitProgress, setBoxExitProgress] = useState(0);
  const [boxEnterProgress, setBoxEnterProgress] = useState(1);
  const [foodEnterProgress, setFoodEnterProgress] = useState(1);

  const isTransitioningRef = useRef(false);

  // Helper to animate a numeric progress from 0 to 1
  const animateValue = (
    durationMs: number,
    onUpdate: (val: number) => void
  ): Promise<void> => {
    return new Promise((resolve) => {
      const startTime = performance.now();
      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / durationMs);
        onUpdate(progress);
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          resolve();
        }
      };
      requestAnimationFrame(step);
    });
  };

  const transitionToProduct = useCallback(
    async (nextProduct: Product) => {
      if (isTransitioningRef.current || nextProduct.id === currentProduct.id) {
        return;
      }

      isTransitioningRef.current = true;

      // STEP 1: Current Food Items Fly Out of Box
      setTransitionState("EXITING_FOOD");
      await animateValue(480, (val) => setFoodExitProgress(val));

      // STEP 2: Current Box Dips and Moves Out
      setTransitionState("EXITING_BOX");
      await animateValue(320, (val) => setBoxExitProgress(val));

      // STEP 3: Swap Product Data
      setCurrentProduct(nextProduct);
      setFoodExitProgress(0);
      setBoxExitProgress(0);
      setBoxEnterProgress(0);
      setFoodEnterProgress(0);

      // STEP 4: New Box Moves In
      setTransitionState("ENTERING_BOX");
      await animateValue(360, (val) => setBoxEnterProgress(val));

      // STEP 5: New Food Items Fly into Box along curved trajectories
      setTransitionState("ENTERING_FOOD");
      await animateValue(700, (val) => setFoodEnterProgress(val));

      // STEP 6: Settle and Finish
      setTransitionState("SETTLE");
      setTimeout(() => {
        setTransitionState("IDLE");
        isTransitioningRef.current = false;
      }, 250);
    },
    [currentProduct.id]
  );

  return {
    currentProduct,
    transitionState,
    isTransitioning: transitionState !== "IDLE",
    foodExitProgress,
    boxExitProgress,
    boxEnterProgress,
    foodEnterProgress,
    transitionToProduct,
  };
}
