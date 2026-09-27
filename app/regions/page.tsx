import React from "react";
import Link from "next/link";
import { REGIONS, getProductsByRegion } from "@/data/products";
import { formatCurrency } from "@/lib/utils";
import { Compass, ArrowRight, Sparkles } from "lucide-react";

export default function RegionsPage() {
  return (
    <div className="pt-24 pb-20 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto py-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-forest-900/5 text-xs font-serif uppercase tracking-widest text-forest-900 mb-2">
            <Compass className="w-3.5 h-3.5 text-gold" />
            <span>Hành Trình Khám Phá</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest-900">
            Khám phá các vùng miền
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-dark-muted">
            Tìm hiểu câu chuyện thổ nhưỡng, văn hóa bản địa và những thức quà đặc sản tiêu biểu của từng mảnh đất Việt Nam.
          </p>
        </div>

        {/* Regions Showcase List */}
        <div className="space-y-16 mt-8">
          {REGIONS.map((region, idx) => {
            const boxes = getProductsByRegion(region.id);
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={region.id}
                className="rounded-3xl bg-[#FFFDF8] border border-forest-900/10 shadow-subtle p-6 sm:p-10 overflow-hidden"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                    isReversed ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Left: Region Story & Mood */}
                  <div className="lg:col-span-6 space-y-4">
                    <span
                      className="text-xs font-serif uppercase tracking-widest font-bold block"
                      style={{ color: region.accentColor }}
                    >
                      {region.tagline}
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900">
                      Vùng Đất {region.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-dark-muted leading-relaxed font-sans">
                      {region.description}
                    </p>

                    {/* Specialties */}
                    <div className="pt-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-dark-muted block mb-2">
                        Đặc sản tiêu biểu:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {region.specialties.map((item, i) => (
                          <span
                            key={i}
                            className="text-xs px-3 py-1 rounded-full bg-cream-100 text-forest-900 border border-forest-900/5 font-medium"
                          >
                            ✦ {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4">
                      <Link
                        href={`/regions/${region.id}`}
                        className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-forest-900 hover:bg-forest-800 text-warmWhite text-xs font-bold uppercase tracking-wider transition-all"
                      >
                        <span>Khám phá trọn vẹn {region.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-gold" />
                      </Link>
                    </div>
                  </div>

                  {/* Right: Boxes available in this region */}
                  <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {boxes.map((box) => (
                      <Link
                        key={box.id}
                        href={`/products/${box.slug}`}
                        className="p-4 rounded-2xl border border-forest-900/10 hover:border-gold/40 transition-all bg-cream-50 hover:bg-white flex flex-col justify-between group shadow-sm hover:shadow-card"
                      >
                        <div
                          className="h-32 rounded-xl p-3 flex items-center justify-center mb-3 relative overflow-hidden group-hover:scale-105 transition-transform"
                          style={{ backgroundColor: box.theme.boxColor }}
                        >
                          <span className="absolute top-2 left-2 text-[9px] text-gold font-serif uppercase tracking-widest bg-black/40 px-2 py-0.5 rounded-full border border-gold/30 z-10">
                            {box.badge || "Tuyển Chọn"}
                          </span>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={box.boxOpenAsset || box.heroImage}
                            alt={box.name}
                            className="max-h-24 max-w-full object-contain filter drop-shadow-md"
                          />
                        </div>
                        <h4 className="font-serif font-bold text-sm text-forest-900 group-hover:text-gold transition-colors">
                          {box.name}
                        </h4>
                        <span className="text-xs font-bold text-terracotta mt-1">
                          {formatCurrency(box.price)}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
