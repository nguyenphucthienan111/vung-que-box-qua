"use client";

import React, { useState, useEffect, useRef } from "react";
import { Product, FoodItem3D } from "@/types/product";
import { TransitionState } from "@/hooks/useProduct3DTransition";

interface ExplodedBoxExperienceProps {
  product: Product;
  transitionState: TransitionState;
  className?: string;
  onHoverItem?: (item: FoodItem3D | null) => void;
}

// 4 Exploded Anchor Configurations around the central gift box (like the Figma layered video)
const ITEM_LAYOUTS = [
  {
    // Top Left: Floating high and slightly forward
    containerClass: "top-1 sm:top-2 left-2 sm:left-4 lg:left-6",
    floatClass: "animate-float-slow",
    depthZ: 75,
    tiltRot: -6,
    badgeAlign: "left",
  },
  {
    // Top Right: Floating high on the right - pulled inward to avoid overlapping right column
    containerClass: "top-1 sm:top-2 right-4 sm:right-8 lg:right-12",
    floatClass: "animate-float-delayed",
    depthZ: 90,
    tiltRot: 7,
    badgeAlign: "right",
  },
  {
    // Bottom Left: Floating low on the left
    containerClass: "bottom-4 sm:bottom-6 left-2 sm:left-4 lg:left-6",
    floatClass: "animate-float-reverse",
    depthZ: 65,
    tiltRot: 5,
    badgeAlign: "left",
  },
  {
    // Bottom Right: Floating low on the right - pulled inward
    containerClass: "bottom-4 sm:bottom-6 right-4 sm:right-8 lg:right-10",
    floatClass: "animate-float-slow",
    depthZ: 80,
    tiltRot: -8,
    badgeAlign: "right",
  },
];

export function ExplodedBoxExperience({
  product,
  transitionState,
  className = "w-full h-full",
  onHoverItem,
}: ExplodedBoxExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  // Smooth mouse parallax listener
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    };

    const handleMouseLeave = () => {
      setMousePos({ x: 0, y: 0 });
    };

    const node = containerRef.current;
    if (node) {
      node.addEventListener("mousemove", handleMouseMove);
      node.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      if (node) {
        node.removeEventListener("mousemove", handleMouseMove);
        node.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  const isCollapsing =
    transitionState === "EXITING_FOOD" || transitionState === "EXITING_BOX";
  const isEntering =
    transitionState === "ENTERING_FOOD" || transitionState === "SETTLE";

  // Calculate 3D stage tilt
  const tiltX = mousePos.y * -14;
  const tiltY = mousePos.x * 18;

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none overflow-visible ${className}`}
      style={{ perspective: 1200 }}
    >
      {/* Dynamic Atmospheric Light Glow behind the box */}
      <div
        className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full blur-3xl pointer-events-none transition-colors duration-1000 opacity-40 -z-10"
        style={{
          backgroundColor: product.theme.accentColor || "#B9955A",
          transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)`,
        }}
      />

      {/* Golden Particle sparkles floating around */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span className="absolute top-1/4 left-1/5 w-1.5 h-1.5 rounded-full bg-gold animate-ping opacity-60" />
        <span className="absolute top-1/3 right-1/4 w-1 h-1 rounded-full bg-gold/80 animate-pulse" />
        <span className="absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full bg-gold/40 animate-pulse delay-700" />
      </div>

      {/* Main 3D Stage with Mouse Parallax Tilt */}
      <div
        className="relative w-full h-full max-w-[540px] max-h-[480px] flex items-center justify-center transition-transform duration-200 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
        }}
      >
        {/* Soft Organic Drop Shadow beneath the entire box */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-64 sm:w-80 h-14 rounded-full blur-2xl pointer-events-none"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.55)",
            transform: `translate3d(0, 0, -40px) scale(${isCollapsing ? 0.7 : 1})`,
            transition: "transform 0.5s ease",
          }}
        />

        {/* 1. CENTRAL HERO GIFT BOX (Open Box with Kraft Straw Bed & Gold Trim) */}
        <div
          className="relative z-10 w-64 h-52 sm:w-80 sm:h-64 flex items-center justify-center transition-all duration-700 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: isCollapsing
              ? "scale(0.85) translateZ(-60px) rotateY(15deg)"
              : `scale(${isEntering ? 1 : 0.9}) translateZ(0px)`,
            opacity: transitionState === "EXITING_BOX" ? 0.3 : 1,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.boxOpenAsset || product.heroImage}
            alt={product.name}
            className="max-w-full max-h-full object-contain filter drop-shadow-2xl transition-transform duration-500 hover:scale-105"
            style={{
              filter:
                "drop-shadow(0 20px 30px rgba(0, 0, 0, 0.45)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))",
            }}
          />

          {/* Interactive center badge indicating open state */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-forest-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-gold/40 text-[10px] text-gold uppercase tracking-widest font-serif font-bold shadow-lg pointer-events-none flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
            <span>{product.name}</span>
          </div>
        </div>

        {/* 2. SURROUNDING EXPLODED 3D FOOD ITEMS (Layered like next-level Figma burger video) */}
        {product.items3D.map((item, idx) => {
          const layout = ITEM_LAYOUTS[idx % ITEM_LAYOUTS.length];
          const isHovered = hoveredItemId === item.id;
          const staggerDelay = idx * 0.08;

          // When collapsing, food items fly into the center of the box
          // When entering, food items burst outward with spring bounce
          const itemTransform = isCollapsing
            ? "translate3d(0, 30px, -80px) scale(0) rotate(15deg)"
            : isHovered
            ? `translate3d(0, -10px, ${layout.depthZ + 50}px) scale(1.18) rotate(0deg)`
            : `translate3d(${mousePos.x * 20}px, ${mousePos.y * 15}px, ${layout.depthZ}px) scale(1) rotate(${layout.tiltRot}deg)`;

          const itemOpacity = isCollapsing ? 0 : 1;

          return (
            <div
              key={item.id}
              className={`absolute z-30 ${layout.containerClass} transition-all duration-700 group cursor-pointer`}
              style={{
                transformStyle: "preserve-3d",
                transform: itemTransform,
                opacity: itemOpacity,
                transitionTimingFunction: isCollapsing
                  ? "cubic-bezier(0.4, 0, 0.2, 1)"
                  : "cubic-bezier(0.34, 1.56, 0.64, 1)", // Spring bounce
                transitionDelay: isCollapsing ? "0s" : `${staggerDelay}s`,
              }}
              onMouseEnter={() => {
                setHoveredItemId(item.id);
                onHoverItem?.(item);
              }}
              onMouseLeave={() => {
                setHoveredItemId(null);
                onHoverItem?.(null);
              }}
            >
              {/* Floating Wrapper with subtle organic hover animation */}
              <div className={`relative flex flex-col items-center ${isHovered ? "" : layout.floatClass}`}>
                {/* 3D Food Item Image Cutout with drop shadow */}
                <div className="relative w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center p-1">
                  {/* Outer subtle golden halo on hover */}
                  <div
                    className="absolute inset-0 rounded-full bg-gold/20 blur-md transition-opacity duration-300"
                    style={{ opacity: isHovered ? 1 : 0 }}
                  />

                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageAsset || "/images/placeholder.png"}
                    alt={item.name}
                    className="max-w-full max-h-full object-contain filter drop-shadow-xl transition-transform duration-300 group-hover:scale-110"
                    style={{
                      filter:
                        "drop-shadow(0 12px 18px rgba(0, 0, 0, 0.5)) drop-shadow(0 2px 5px rgba(0, 0, 0, 0.3))",
                    }}
                  />
                </div>

                {/* Glassmorphic Pill Tag below each food item */}
                <div
                  className={`mt-1.5 px-2.5 py-1 rounded-full bg-forest-900/90 backdrop-blur-md border border-white/20 text-warmWhite shadow-card flex items-center space-x-1.5 transition-all duration-300 ${
                    isHovered
                      ? "border-gold scale-105 bg-forest-900"
                      : "group-hover:border-gold/60"
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0 shadow-sm"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[11px] font-sans font-bold whitespace-nowrap text-warmWhite">
                    {item.name}
                  </span>
                </div>

                {/* Extended Short Note Tooltip appearing on hover */}
                <div
                  className={`absolute -bottom-8 pointer-events-none transition-all duration-300 z-40 whitespace-nowrap ${
                    isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
                  }`}
                >
                  <span className="text-[10px] text-gold font-sans font-medium bg-black/80 px-2.5 py-0.5 rounded-full border border-gold/30 shadow-md">
                    {item.shortNote}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
