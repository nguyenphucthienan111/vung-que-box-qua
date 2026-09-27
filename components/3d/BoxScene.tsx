"use client";

import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ProductTransition3D } from "./ProductTransition3D";
import { Product, FoodItem3D } from "@/types/product";
import { TransitionState } from "@/hooks/useProduct3DTransition";

interface BoxSceneProps {
  product: Product;
  transitionState: TransitionState;
  foodExitProgress: number;
  boxExitProgress: number;
  boxEnterProgress: number;
  foodEnterProgress: number;
  className?: string;
}

export function BoxScene({
  product,
  transitionState,
  foodExitProgress,
  boxExitProgress,
  boxEnterProgress,
  foodEnterProgress,
  className = "w-full h-full",
}: BoxSceneProps) {
  const [hoveredFood, setHoveredFood] = useState<FoodItem3D | null>(null);

  return (
    <div className={`relative ${className} cursor-grab active:cursor-grabbing`}>
      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 2.2, 3.8], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <OrbitControls
            makeDefault
            enableZoom={false}
            enablePan={false}
            enableDamping={true}
            dampingFactor={0.08}
            rotateSpeed={0.9}
            minPolarAngle={Math.PI / 5}
            maxPolarAngle={Math.PI / 2.05}
            minAzimuthAngle={-Math.PI / 2.4}
            maxAzimuthAngle={Math.PI / 2.4}
          />
          <ProductTransition3D
            product={product}
            transitionState={transitionState}
            foodExitProgress={foodExitProgress}
            boxExitProgress={boxExitProgress}
            boxEnterProgress={boxEnterProgress}
            foodEnterProgress={foodEnterProgress}
            onHoverItem={setHoveredFood}
          />
        </Suspense>
      </Canvas>

      {/* Interactive Tooltip when hovering over a 3D food item */}
      {hoveredFood && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-20 animate-fade-in">
          <div className="bg-forest-900/90 text-warmWhite backdrop-blur-md px-4 py-2 rounded-full border border-gold/40 shadow-gold flex items-center space-x-2 text-xs md:text-sm">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{ backgroundColor: hoveredFood.color }}
            />
            <span className="font-semibold text-gold">{hoveredFood.name}</span>
            <span className="text-warmWhite/60">|</span>
            <span className="text-warmWhite/80">{hoveredFood.shortNote}</span>
          </div>
        </div>
      )}

      {/* Subtle indicator hint */}
      <div className="absolute top-4 right-4 pointer-events-none text-xs text-warmWhite/75 hidden md:flex items-center space-x-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-lg">
        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
        <span>✦ Giữ & rê chuột để xoay 3D</span>
      </div>
    </div>
  );
}
