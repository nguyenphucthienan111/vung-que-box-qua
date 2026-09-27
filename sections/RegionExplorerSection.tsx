"use client";

import React, { useState } from "react";
import Link from "next/link";
import { REGIONS, PRODUCTS } from "@/data/products";
import { ArrowUpRight, Compass } from "lucide-react";

export function RegionExplorerSection() {
  const [activeRegionId, setActiveRegionId] = useState(REGIONS[0].id);

  return (
    <section className="py-24 bg-cream relative overflow-hidden" id="vungmien">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-sage-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-forest-900/5 border border-forest-900/10 text-xs font-serif uppercase tracking-widest text-forest-900 mb-3">
            <Compass className="w-3.5 h-3.5 text-gold" />
            <span>Bản Đồ Ẩm Thực Việt</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-900 tracking-tight">
            Khám phá các vùng miền
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-dark-muted leading-relaxed font-sans">
            Mỗi vùng đất mang một phong vị riêng. Từ sương mù bảng lảng cao nguyên đến phù sa sông nước và biển đảo ngút ngàn.
          </p>
        </div>

        {/* Interactive Region Grid with Visual Landscape Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {REGIONS.map((region) => {
            const isSelected = region.id === activeRegionId;
            const product = PRODUCTS.find((p) => p.region === region.id);

            return (
              <div
                key={region.id}
                onMouseEnter={() => setActiveRegionId(region.id)}
                className={`group relative rounded-3xl p-5 sm:p-6 transition-all duration-500 overflow-hidden cursor-pointer border flex flex-col justify-between ${
                  isSelected
                    ? "bg-forest-900 text-warmWhite shadow-2xl border-gold/50 -translate-y-2"
                    : "bg-white text-dark shadow-md hover:shadow-xl border-forest-900/10 hover:-translate-y-1.5"
                }`}
              >
                {/* Accent top border stripe */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-300 z-20"
                  style={{ backgroundColor: region.accentColor }}
                />

                <div>
                  {/* Visual Media Header: Regional Landscape & Floating Gift Box */}
                  <div className="relative h-44 sm:h-48 w-full rounded-2xl overflow-hidden mb-5 bg-forest-800">
                    {/* Scenic Landscape Image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={region.heroImage || `/images/regions/${region.id}.webp`}
                      alt={region.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    {/* Atmospheric Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

                    {/* Floating Tagline Eyebrow on top-left */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-serif uppercase tracking-widest font-bold bg-black/60 backdrop-blur-md text-gold border border-gold/30 shadow-md">
                        ✦ {region.tagline}
                      </span>
                    </div>

                    {/* Floating Arrow Link Button on top-right */}
                    <Link
                      href={`/regions/${region.id}`}
                      className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isSelected
                          ? "bg-gold text-forest-900 shadow-gold rotate-45 scale-105"
                          : "bg-black/50 text-warmWhite backdrop-blur-md border border-white/20 group-hover:bg-gold group-hover:text-forest-900 group-hover:rotate-45"
                      }`}
                      aria-label={`Xem box quà ${region.name}`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>

                    {/* Floating 3D Box Preview on bottom-right */}
                    {product?.boxOpenAsset && (
                      <div className="absolute bottom-1 right-2 z-10 w-24 h-24 pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={product.boxOpenAsset}
                          alt={product.name}
                          className="w-full h-full object-contain filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.6)]"
                        />
                      </div>
                    )}

                    {/* Region Name displayed on bottom-left of photo */}
                    <div className="absolute bottom-3 left-3 z-10">
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-warmWhite drop-shadow-md">
                        {region.name}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className={`text-xs sm:text-sm leading-relaxed transition-colors ${
                      isSelected ? "text-warmWhite/80" : "text-dark-muted"
                    }`}
                  >
                    {region.description}
                  </p>

                  {/* Specialties Tags */}
                  <div className="mt-4 pt-3.5 border-t border-current/10">
                    <span
                      className={`text-[10px] uppercase tracking-wider font-bold block mb-2 ${
                        isSelected ? "text-gold" : "text-dark-muted"
                      }`}
                    >
                      Đặc sản chủ đạo:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {region.specialties.map((item, i) => (
                        <span
                          key={i}
                          className={`text-[11px] px-2.5 py-1 rounded-md transition-colors ${
                            isSelected
                              ? "bg-white/10 text-warmWhite border border-white/10"
                              : "bg-cream-100 text-dark-muted border border-forest-900/5 group-hover:border-forest-900/15"
                          }`}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Explore Link Bottom Row */}
                <div className="mt-5 pt-3 border-t border-current/10 flex items-center justify-between text-xs font-semibold">
                  <span
                    className={`text-[11px] italic ${
                      isSelected ? "text-gold/90" : "text-dark-muted"
                    }`}
                  >
                    ✦ {region.vibe}
                  </span>
                  <Link
                    href={`/regions/${region.id}`}
                    className={`inline-flex items-center space-x-1.5 font-bold transition-all ${
                      isSelected
                        ? "text-gold hover:underline group-hover:translate-x-1"
                        : "text-forest-900 hover:text-gold group-hover:translate-x-1"
                    }`}
                  >
                    <span>Xem các box</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
