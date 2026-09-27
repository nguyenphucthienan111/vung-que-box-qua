"use client";

import React from "react";
import { Product, DEFAULT_FOOD_PLACEHOLDER } from "@/types/product";
import { TransitionState } from "@/hooks/useProduct3DTransition";

interface BoxScene25DProps {
  product: Product;
  transitionState: TransitionState;
  foodExitProgress: number;
  boxExitProgress: number;
  boxEnterProgress: number;
  foodEnterProgress: number;
  className?: string;
}

export function BoxScene25D({
  product,
  transitionState,
  boxExitProgress,
  boxEnterProgress,
  foodEnterProgress,
  className = "w-full h-full",
}: BoxScene25DProps) {
  const isExiting = transitionState === "EXITING_BOX";
  const boxScale = isExiting ? 1 - boxExitProgress * 0.4 : 0.6 + boxEnterProgress * 0.4;
  const boxOpacity = isExiting ? 1 - boxExitProgress : boxEnterProgress;

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ perspective: 1200 }}
    >
      {/* 2.5D Stage */}
      <div
        className="relative transition-all duration-300 ease-out"
        style={{
          transform: `scale(${boxScale}) rotateX(12deg) rotateY(-8deg)`,
          opacity: boxOpacity,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Box Shadow */}
        <div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-72 h-16 rounded-full blur-xl pointer-events-none"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        />

        {/* 2.5D Box Container with Real Image */}
        <div
          className="relative w-80 sm:w-96 rounded-2xl p-4 shadow-2xl border border-gold/30 flex flex-col items-center overflow-hidden"
          style={{
            backgroundColor: product.theme.boxColor,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
          }}
        >
          {/* Header */}
          <div className="w-full flex items-center justify-between border-b border-white/10 pb-2 z-10">
            <span className="text-xs font-serif tracking-widest text-gold uppercase font-bold">
              VÙNG QUÊ • {product.regionName}
            </span>
            <span className="text-[10px] text-warmWhite/70 bg-white/10 px-2 py-0.5 rounded-full border border-white/10">
              Unbox Experience
            </span>
          </div>

          {/* Central Real Box Photo */}
          <div className="relative w-64 h-48 sm:w-72 sm:h-52 my-2 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.boxOpenAsset || product.heroImage}
              alt={product.name}
              className="max-w-full max-h-full object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Real Food Items floating below / around box */}
          <div className="w-full grid grid-cols-4 gap-2 pt-2 border-t border-white/10 z-10">
            {product.items3D.map((item, idx) => {
              const itemProgress = Math.min(
                1,
                Math.max(0, (foodEnterProgress - idx * 0.1) / 0.7)
              );
              return (
                <div
                  key={item.id}
                  className="flex flex-col items-center text-center group cursor-pointer"
                  style={{
                    transform: `translateY(${(1 - itemProgress) * 20}px) scale(${itemProgress})`,
                    opacity: itemProgress,
                    transition: "all 0.4s ease-out",
                  }}
                >
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md p-1 border border-white/15 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imageAsset || DEFAULT_FOOD_PLACEHOLDER}
                      alt={item.name}
                      className="w-full h-full object-contain filter drop-shadow"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.onerror = null;
                        target.src = DEFAULT_FOOD_PLACEHOLDER;
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-warmWhite/80 mt-1 line-clamp-1 group-hover:text-gold transition-colors font-medium">
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
