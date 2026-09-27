import React from "react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { REGIONS, getProductsByRegion } from "@/data/products";
import { DEFAULT_FOOD_PLACEHOLDER } from "@/types/product";
import { formatCurrency } from "@/lib/utils";
import { ArrowLeft, Star } from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  return REGIONS.map((region) => ({
    slug: region.id,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const rawSlug = decodeURIComponent(params.slug || "");
  const normalizedSlug = rawSlug.toLowerCase().trim().replace(/\s+/g, "-");
  const region = REGIONS.find((r) => r.id === params.slug || r.id === normalizedSlug);
  if (!region) return {};

  return {
    title: `Box Quà Đặc Sản ${region.name} | Vùng Quê`,
    description: region.description,
  };
}

export default function SingleRegionPage({
  params,
}: {
  params: { slug: string };
}) {
  const rawSlug = decodeURIComponent(params.slug || "");
  const normalizedSlug = rawSlug.toLowerCase().trim().replace(/\s+/g, "-");

  let region = REGIONS.find((r) => r.id === params.slug);
  if (!region && normalizedSlug !== params.slug) {
    region = REGIONS.find((r) => r.id === normalizedSlug);
    if (region) {
      redirect(`/regions/${region.id}`);
    }
  }

  if (!region) {
    notFound();
  }

  const products = getProductsByRegion(region.id);

  return (
    <div className="pt-24 pb-20 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/regions"
          className="inline-flex items-center space-x-1.5 text-xs text-dark-muted hover:text-forest-900 py-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Quay lại danh sách vùng miền</span>
        </Link>

        {/* Region Banner Hero with Scenic Photography & 3D Gift Box */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gold/30 mt-2 mb-14 min-h-[360px] sm:min-h-[390px] flex items-center bg-forest-900">
          {/* Background Landscape Photo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={region.heroImage || `/images/regions/${region.id}.webp`}
            alt={region.name}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Atmospheric Rich Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/35 z-0" />

          {/* Content inside Banner */}
          <div className="relative z-10 p-8 sm:p-14 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-serif uppercase tracking-widest text-gold font-bold px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-gold/40 inline-block shadow-md">
                ✦ {region.tagline}
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-warmWhite drop-shadow-lg">
                Đặc sản vùng {region.name}
              </h1>
              <p className="text-xs sm:text-sm text-warmWhite/85 leading-relaxed font-sans max-w-xl">
                {region.description}
              </p>

              {/* Specialties tag pills */}
              <div className="pt-2 flex flex-wrap gap-2">
                {region.specialties.map((item, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-warmWhite border border-white/20 shadow-sm"
                  >
                    ✦ {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Floating 3D Box for this Region */}
            {products[0] && (
              <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
                <div className="w-56 h-56 sm:w-72 sm:h-72 relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-gold/20 rounded-full blur-2xl pointer-events-none" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={products[0].boxOpenAsset}
                    alt={products[0].name}
                    className="w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)] transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <span className="text-xs font-serif uppercase tracking-widest text-gold/90 font-bold bg-black/60 backdrop-blur-md px-3.5 py-1 rounded-full border border-gold/30 mt-2 shadow-md">
                  {products[0].name}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Region Products Grid */}
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900 mb-8">
            Những chiếc box quà từ {region.name} ({products.length})
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-3xl bg-[#FFFDF8] border border-forest-900/10 hover:border-gold/50 shadow-subtle hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                {/* 3D Box Open Imagery Stage */}
                <div
                  className="h-56 p-4 relative overflow-hidden flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500"
                  style={{ backgroundColor: product.theme.boxColor }}
                >
                  <span className="absolute top-3 left-3 text-[10px] text-gold font-serif uppercase tracking-widest font-bold bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-gold/30 z-10 shadow-sm">
                    {product.badge || "Tuyển Chọn"}
                  </span>

                  {/* 3D Box Graphic */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.boxOpenAsset || product.heroImage}
                    alt={product.name}
                    className="max-h-44 max-w-[85%] object-contain filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-forest-900 group-hover:text-gold transition-colors mb-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center space-x-1 text-gold text-xs mb-3">
                      <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                      <span className="font-bold">{product.rating}</span>
                      <span className="text-dark-muted">({product.reviewCount} đánh giá)</span>
                    </div>
                    <p className="text-xs text-dark-muted line-clamp-2 leading-relaxed mb-4">
                      {product.shortDescription}
                    </p>

                    {/* Preview of the 4 items included in the box */}
                    <div className="pt-3 border-t border-forest-900/10">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-dark-muted block mb-2">
                        Bên trong hộp gồm:
                      </span>
                      <div className="grid grid-cols-4 gap-2">
                        {product.items3D.map((item) => (
                          <div
                            key={item.id}
                            className="flex flex-col items-center text-center p-1 rounded-lg bg-cream-50 border border-forest-900/5 group/item"
                            title={item.name}
                          >
                            <div className="w-9 h-9 relative flex items-center justify-center mb-1">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={item.imageAsset || DEFAULT_FOOD_PLACEHOLDER}
                                alt={item.name}
                                className="max-w-full max-h-full object-contain filter drop-shadow-sm transition-transform group-hover/item:scale-110"
                              />
                            </div>
                            <span className="text-[9px] font-sans font-medium text-dark line-clamp-1">
                              {item.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-forest-900/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-dark-muted block font-sans">Giá trọn bộ</span>
                      <span className="font-serif text-xl font-bold text-terracotta">
                        {formatCurrency(product.price)}
                      </span>
                    </div>
                    <Link
                      href={`/products/${product.slug}`}
                      className="px-5 py-2.5 rounded-full bg-forest-900 text-warmWhite text-xs font-bold uppercase tracking-wider hover:bg-gold hover:text-forest-900 transition-all shadow-md active:scale-95"
                    >
                      Khám phá box
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
