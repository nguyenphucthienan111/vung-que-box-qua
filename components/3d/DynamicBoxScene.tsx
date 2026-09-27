"use client";

import dynamic from "next/dynamic";
import React from "react";
import { Product } from "@/types/product";
import { TransitionState } from "@/hooks/useProduct3DTransition";

// Fallback loader while WebGL engine loads
function SceneLoadingFallback({ product }: { product: Product }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl bg-forest-800/40 border border-gold/20 flex items-center justify-center animate-pulse">
        <div className="w-24 h-24 rounded-full border-2 border-gold/60 border-t-transparent animate-spin" />
        <span className="absolute bottom-6 text-xs text-gold font-serif tracking-widest uppercase">
          Vùng Quê 3D
        </span>
      </div>
      <p className="mt-4 text-xs text-warmWhite/60 font-sans tracking-wide">
        Đang khởi tạo không gian ẩm thực {product.name}...
      </p>
    </div>
  );
}

const BoxSceneComponent = dynamic(
  () => import("./BoxScene").then((mod) => mod.BoxScene),
  {
    ssr: false,
    loading: () => <SceneLoadingFallback product={{} as Product} />,
  }
);

interface DynamicBoxSceneProps {
  product: Product;
  transitionState: TransitionState;
  foodExitProgress: number;
  boxExitProgress: number;
  boxEnterProgress: number;
  foodEnterProgress: number;
  className?: string;
}

export function DynamicBoxScene(props: DynamicBoxSceneProps) {
  return <BoxSceneComponent {...props} />;
}
