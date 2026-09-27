"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { useProduct3DTransition } from "@/hooks/useProduct3DTransition";
import { DynamicBoxScene } from "@/components/3d/DynamicBoxScene";
import { BoxScene25D } from "@/components/3d/BoxScene25D";
import { ExplodedBoxExperience } from "@/components/3d/ExplodedBoxExperience";
import { useCart } from "@/lib/cartContext";
import { formatCurrency } from "@/lib/utils";
import {
  ShoppingBag,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Check,
  Star,
} from "lucide-react";

// Circular distance calculation for infinite 3D cylindrical carousel
function getOffset(index: number, currentIndex: number, total: number) {
  let diff = index - currentIndex;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

export function HeroSection() {
  const { addItem } = useCart();
  const [renderMode, setRenderMode] = useState<"3D" | "WEBGL" | "2.5D">("3D");
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Available boxes to showcase in Hero (6 regions)
  const heroBoxes = PRODUCTS.slice(0, 6);

  const {
    currentProduct,
    transitionState,
    isTransitioning,
    foodExitProgress,
    boxExitProgress,
    boxEnterProgress,
    foodEnterProgress,
    transitionToProduct,
  } = useProduct3DTransition(heroBoxes[0]);

  const currentIndex = heroBoxes.findIndex((p) => p.id === currentProduct.id);

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % heroBoxes.length;
    transitionToProduct(heroBoxes[nextIdx]);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + heroBoxes.length) % heroBoxes.length;
    transitionToProduct(heroBoxes[prevIdx]);
  };

  const handleAddToCart = () => {
    addItem(currentProduct, 1);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  return (
    <section className="relative min-h-[96vh] flex flex-col justify-between pt-20 pb-8 overflow-hidden transition-colors duration-1000 bg-forest-900 text-warmWhite">
      {/* 1. Dynamic Regional Ambient Atmosphere Gradient */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-out pointer-events-none"
        style={{
          background: currentProduct.theme.bgGradient,
          opacity: 0.95,
        }}
      />

      {/* Ambient Radial Spotlight behind center 3D box */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] pointer-events-none transition-colors duration-1000 opacity-40 -z-0"
        style={{
          backgroundColor: currentProduct.theme.accentColor || "#B9955A",
        }}
      />

      {/* Floating Ember & Steam Particles (TikTok Aesthetic) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-0">
        <span className="absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full bg-gold/70 blur-[1px] animate-ember-1" />
        <span className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 rounded-full bg-gold/90 blur-[0.5px] animate-ember-2" />
        <span className="absolute bottom-1/5 right-1/3 w-2 h-2 rounded-full bg-gold/60 blur-[1px] animate-ember-3" />
        <span className="absolute top-1/3 left-1/4 w-1 h-1 rounded-full bg-warmWhite/80 animate-ping opacity-50" />
      </div>

      {/* Subtle organic paper grain overlay */}
      <div className="absolute inset-0 opacity-[0.035] bg-paper-texture pointer-events-none" />

      {/* 2. Top Floating Pill Navigation Bar (TikTok Style: Story / Blog / Gallery / Contact Us) */}
      <div className="w-full flex justify-center pt-2 pb-4 relative z-20">
        <nav className="inline-flex items-center space-x-1 sm:space-x-3 px-3 sm:px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/15 shadow-2xl text-xs">
          <Link
            href="/about"
            className="px-3 py-1 rounded-full text-warmWhite/75 hover:text-warmWhite hover:bg-white/10 transition-all"
          >
            Câu chuyện
          </Link>
          <Link
            href="/shop"
            className="px-3 py-1 rounded-full text-warmWhite/75 hover:text-warmWhite hover:bg-white/10 transition-all"
          >
            Đặc sản
          </Link>
          <button
            onClick={() => setRenderMode("3D")}
            className="px-3 py-1 rounded-full text-gold font-semibold bg-white/10 border border-gold/30 shadow-sm"
          >
            ✦ 3D Unboxing
          </button>
          <Link
            href="/contact"
            className="px-3.5 py-1 rounded-full bg-gold hover:bg-gold-400 text-forest-900 font-bold transition-all shadow-gold"
          >
            Liên hệ
          </Link>
        </nav>
      </div>

      {/* 3. Main Hero 3-Column Panoramic Grid */}
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center py-2">
          
          {/* LEFT COLUMN: Bold Grotesque Headline & Navigation (like BUN CHA CA / BUN REAL CUA) */}
          <div className="lg:col-span-3 xl:col-span-3 flex flex-col space-y-4 sm:space-y-5 text-center lg:text-left">
            {/* Region Eyebrow Pill */}
            <div className="inline-flex items-center space-x-2 self-center lg:self-start px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-gold/40 text-[11px] text-gold">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="uppercase tracking-widest font-semibold">
                ĐẶC SẢN VIỆT NAM • 0{currentIndex + 1} / 0{heroBoxes.length}
              </span>
            </div>

            {/* Giant Condensed Headline */}
            <div className="space-y-1">
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight text-warmWhite leading-[0.95] drop-shadow-xl">
                BOX QUÀ <br />
                <span
                  className="transition-colors duration-700"
                  style={{ color: currentProduct.theme.accentColor || "#B9955A" }}
                >
                  {currentProduct.regionName}
                </span>
              </h1>
            </div>

            {/* Editorial Description in Vietnamese */}
            <p className="text-xs sm:text-sm text-warmWhite/80 max-w-sm mx-auto lg:mx-0 leading-relaxed font-sans line-clamp-3">
              {currentProduct.shortDescription ||
                "Mỗi hộp quà là một câu chuyện về vùng đất, con người và những hương vị đáng nhớ được chắt chiu từ khắp dặm dài non sông."}
            </p>

            {/* Circular Navigation Controls (←) (→) (TikTok Signature) */}
            <div className="flex items-center justify-center lg:justify-start space-x-3 pt-2">
              <button
                onClick={handlePrev}
                disabled={isTransitioning}
                className="w-12 h-12 rounded-full bg-black/40 hover:bg-gold hover:text-forest-900 border border-white/20 text-warmWhite flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-40 shadow-lg group"
                aria-label="Box trước"
              >
                <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
              </button>

              <button
                onClick={handleNext}
                disabled={isTransitioning}
                className="w-12 h-12 rounded-full bg-black/40 hover:bg-gold hover:text-forest-900 border border-white/20 text-warmWhite flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-40 shadow-lg group"
                aria-label="Box tiếp theo"
              >
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
              </button>

              <span className="text-xs tracking-wider text-warmWhite/60 font-mono pl-2">
                {currentProduct.regionName} ({currentIndex + 1}/{heroBoxes.length})
              </span>
            </div>
          </div>

          {/* CENTER COLUMN: Central 3D Exploded Box Experience */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-center justify-center relative min-h-[380px] sm:min-h-[460px] lg:min-h-[500px]">
            {/* 3D Scene / Exploded Experience */}
            <div className="w-full h-[380px] sm:h-[460px] lg:h-[490px] relative">
              {renderMode === "3D" ? (
                <ExplodedBoxExperience
                  product={currentProduct}
                  transitionState={transitionState}
                />
              ) : renderMode === "WEBGL" ? (
                <DynamicBoxScene
                  product={currentProduct}
                  transitionState={transitionState}
                  foodExitProgress={foodExitProgress}
                  boxExitProgress={boxExitProgress}
                  boxEnterProgress={boxEnterProgress}
                  foodEnterProgress={foodEnterProgress}
                />
              ) : (
                <BoxScene25D
                  product={currentProduct}
                  transitionState={transitionState}
                  foodExitProgress={foodExitProgress}
                  boxExitProgress={boxExitProgress}
                  boxEnterProgress={boxEnterProgress}
                  foodEnterProgress={foodEnterProgress}
                />
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: 3D CYLINDRICAL HORIZONTAL ROLLING CAROUSEL DECK */}
          <div
            className="lg:col-span-3 xl:col-span-3 relative flex items-center justify-center lg:justify-end min-h-[480px] sm:min-h-[500px]"
            style={{ perspective: 1200, transformStyle: "preserve-3d" }}
          >
            {/* Mode Switcher pill moved to top right of page/hero where it's spacious and completely unobstructed */}
            <div className="absolute top-0 right-0 z-30 flex items-center space-x-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 text-[10px] sm:text-[11px] shadow-xl">
              <button
                onClick={() => setRenderMode("3D")}
                className={`px-2.5 py-0.5 rounded-full font-bold transition-all ${
                  renderMode === "3D"
                    ? "bg-gold text-forest-900 shadow-md scale-105"
                    : "text-warmWhite/70 hover:text-warmWhite"
                }`}
              >
                ✦ 3D UNBOX
              </button>
              <button
                onClick={() => setRenderMode("WEBGL")}
                className={`px-2 py-0.5 rounded-full font-semibold transition-all ${
                  renderMode === "WEBGL"
                    ? "bg-gold text-forest-900 shadow-md"
                    : "text-warmWhite/70 hover:text-warmWhite"
                }`}
              >
                WEBGL
              </button>
              <button
                onClick={() => setRenderMode("2.5D")}
                className={`px-2 py-0.5 rounded-full font-semibold transition-all ${
                  renderMode === "2.5D"
                    ? "bg-gold text-forest-900 shadow-md"
                    : "text-warmWhite/70 hover:text-warmWhite"
                }`}
              >
                2.5D
              </button>
            </div>
            {heroBoxes.map((p, idx) => {
              const offset = getOffset(idx, currentIndex, heroBoxes.length);
              const isActive = offset === 0;
              const isNext = offset === 1;
              const isPrev = offset === -1;

              // 3D cylindrical position & orientation
              let transform = "translate3d(0, 0, -250px) scale(0.6)";
              let opacity = 0;
              let zIndex = 0;
              let pointerEvents: "auto" | "none" = "none";
              let blur = "blur(4px)";

              if (isActive) {
                transform = "translate3d(0%, 0, 0px) rotateY(0deg) scale(1)";
                opacity = 1;
                zIndex = 20;
                pointerEvents = "auto";
                blur = "blur(0px)";
              } else if (isNext) {
                // Peeking on the right edge along cylindrical curved arc
                transform = "translate3d(46%, 0, -75px) rotateY(-26deg) scale(0.9)";
                opacity = 0.65;
                zIndex = 10;
                pointerEvents = "auto";
                blur = "blur(0.5px)";
              } else if (isPrev) {
                // Rolls out to the left and fades smoothly
                transform = "translate3d(-46%, 0, -110px) rotateY(26deg) scale(0.82)";
                opacity = 0;
                zIndex = 5;
                pointerEvents = "none";
                blur = "blur(2px)";
              } else if (offset === 2) {
                transform = "translate3d(85%, 0, -180px) rotateY(-38deg) scale(0.75)";
                opacity = 0;
                zIndex = 1;
              } else {
                transform = "translate3d(-85%, 0, -180px) rotateY(38deg) scale(0.75)";
                opacity = 0;
                zIndex = 1;
              }

              return (
                <div
                  key={p.id}
                  onClick={() => {
                    if (isNext || isPrev) {
                      transitionToProduct(p);
                    }
                  }}
                  className={`absolute w-full max-w-[325px] xl:max-w-[335px] rounded-3xl bg-white/[0.08] backdrop-blur-2xl border border-white/20 p-5 sm:p-6 shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    isNext
                      ? "cursor-pointer hover:border-gold/70 hover:opacity-90 group hover:-translate-x-1"
                      : ""
                  }`}
                  style={{
                    transform,
                    opacity,
                    zIndex,
                    pointerEvents,
                    filter: blur,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Floating Pulsing Badge on the Next Peeking Card */}
                  {isNext && (
                    <div className="absolute -top-3.5 right-6 bg-gold text-forest-900 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-gold flex items-center space-x-1.5 animate-pulse z-30 pointer-events-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-forest-900" />
                      <span>XEM TIẾP ➜</span>
                    </div>
                  )}

                  {/* Category Eyebrow Tag */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-gold flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                      <span>{p.regionName} SPECIALTY</span>
                    </span>
                    <span className="text-[11px] font-medium text-warmWhite/60">
                      {p.items3D.length} món đặc sản
                    </span>
                  </div>

                  {/* Card Headline */}
                  <h2 className="font-serif text-xl sm:text-2xl font-bold uppercase tracking-wide text-warmWhite mb-1">
                    VIETNAMESE CLASSIC
                  </h2>
                  <p className="text-xs text-warmWhite/75 leading-relaxed font-sans mb-4 line-clamp-2">
                    {p.subName}
                  </p>

                  {/* Horizontal Row of Food Item Miniature Cards (exact TikTok layout) */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-5">
                    {p.items3D.slice(0, 4).map((item) => (
                      <div
                        key={item.id}
                        className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-gold/40 transition-all duration-300 flex flex-col items-center text-center group cursor-pointer"
                      >
                        {/* Food Photo Miniature Cutout */}
                        <div className="w-10 h-10 sm:w-11 sm:h-11 relative flex items-center justify-center mb-1">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.imageAsset || "/images/placeholder.png"}
                            alt={item.name}
                            className="max-w-full max-h-full object-contain filter drop-shadow-md transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        {/* Item Name */}
                        <span className="text-[10px] font-sans font-medium text-warmWhite line-clamp-1 w-full">
                          {item.name.split(" ")[0]} {item.name.split(" ")[1] || ""}
                        </span>
                        {/* 5 Gold Stars Rating */}
                        <div className="flex items-center justify-center space-x-0.5 mt-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-2 h-2 fill-gold text-gold"
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price & Action Row */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-warmWhite/50 block">Giá trọn bộ</span>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-lg sm:text-xl font-bold text-warmWhite">
                          {formatCurrency(p.price)}
                        </span>
                        {p.compareAtPrice && (
                          <span className="text-xs text-warmWhite/40 line-through">
                            {formatCurrency(p.compareAtPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Active Buy Button OR Inactive Explore Button */}
                    {isActive ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart();
                        }}
                        disabled={isTransitioning}
                        className="py-2.5 px-4 sm:px-5 rounded-full bg-gold hover:bg-gold-400 text-forest-900 font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-gold flex items-center space-x-1.5 active:scale-95 disabled:opacity-50"
                      >
                        {addedSuccess ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-forest-900" />
                            <span>Đã thêm!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Mua ngay</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={() => transitionToProduct(p)}
                        className="py-2.5 px-4 rounded-full bg-white/15 hover:bg-gold hover:text-forest-900 text-warmWhite font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center space-x-1 shadow-sm"
                      >
                        <span>Khám phá</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* 4. Bottom Regional Quick-Switcher Ribbon */}
        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-center">
          <div className="flex items-center space-x-2 overflow-x-auto py-1 max-w-full no-scrollbar">
            {heroBoxes.map((p) => {
              const isSelected = p.id === currentProduct.id;
              return (
                <button
                  key={p.id}
                  onClick={() => transitionToProduct(p)}
                  disabled={isTransitioning}
                  className={`px-3.5 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap flex items-center space-x-1.5 ${
                    isSelected
                      ? "bg-gold text-forest-900 font-bold shadow-gold scale-105"
                      : "bg-white/10 hover:bg-white/20 text-warmWhite/80 border border-white/10"
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: p.theme.boxColor }}
                  />
                  <span>{p.name.replace("Box Quà ", "").replace("Box ", "")}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
