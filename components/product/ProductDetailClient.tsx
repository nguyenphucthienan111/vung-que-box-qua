"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product, DEFAULT_FOOD_PLACEHOLDER } from "@/types/product";
import { useCart } from "@/lib/cartContext";
import { formatCurrency } from "@/lib/utils";
import { DynamicBoxScene } from "@/components/3d/DynamicBoxScene";
import { BoxScene25D } from "@/components/3d/BoxScene25D";
import { ExplodedBoxExperience } from "@/components/3d/ExplodedBoxExperience";
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface ProductDetailClientProps {
  product: Product;
  related: Product[];
}

export function ProductDetailClient({ product, related }: ProductDetailClientProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"ingredients" | "story" | "shipping" | "reviews">("ingredients");
  const [renderMode, setRenderMode] = useState<"3D" | "WEBGL" | "2.5D">("3D");
  const [addedSuccess, setAddedSuccess] = useState(false);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  return (
    <div className="pt-24 pb-20 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="py-4 text-xs text-dark-muted flex items-center space-x-2">
          <Link href="/" className="hover:text-forest-900">
            Trang chủ
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-forest-900">
            Cửa hàng
          </Link>
          <span>/</span>
          <Link
            href={`/regions/${product.region}`}
            className="hover:text-forest-900"
          >
            {product.regionName}
          </Link>
          <span>/</span>
          <span className="text-forest-900 font-semibold">{product.name}</span>
        </nav>

        {/* Main Product Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start py-6">
          {/* Left Column: Interactive 3D Unboxing Box Viewer */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div
              className="w-full h-[400px] sm:h-[480px] lg:h-[540px] rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between shadow-floating border border-gold/30 transition-colors"
              style={{ background: product.theme.bgGradient }}
            >
              {/* Top Controls */}
              <div className="flex items-center justify-between z-20">
                <span className="text-xs font-serif uppercase tracking-widest text-gold font-bold px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-gold/40">
                  {product.regionName} • 3D UNBOXING
                </span>

                <div className="flex items-center space-x-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full border border-white/10 text-[11px] text-warmWhite">
                  <button
                    onClick={() => setRenderMode("3D")}
                    className={`px-3 py-1 rounded-full font-bold transition-all ${
                      renderMode === "3D"
                        ? "bg-gold text-forest-900 shadow-md scale-105"
                        : "text-warmWhite/70 hover:text-warmWhite"
                    }`}
                  >
                    ✦ 3D UNBOX
                  </button>
                  <button
                    onClick={() => setRenderMode("WEBGL")}
                    className={`px-2.5 py-1 rounded-full font-semibold transition-all ${
                      renderMode === "WEBGL"
                        ? "bg-gold text-forest-900 shadow-md"
                        : "text-warmWhite/70 hover:text-warmWhite"
                    }`}
                  >
                    WEBGL
                  </button>
                  <button
                    onClick={() => setRenderMode("2.5D")}
                    className={`px-2.5 py-1 rounded-full font-semibold transition-all ${
                      renderMode === "2.5D"
                        ? "bg-gold text-forest-900 shadow-md"
                        : "text-warmWhite/70 hover:text-warmWhite"
                    }`}
                  >
                    2.5D
                  </button>
                </div>
              </div>

              {/* 3D Scene */}
              <div className="w-full h-full relative z-10">
                {renderMode === "3D" ? (
                  <ExplodedBoxExperience
                    product={product}
                    transitionState="SETTLE"
                  />
                ) : renderMode === "WEBGL" ? (
                  <DynamicBoxScene
                    product={product}
                    transitionState="IDLE"
                    foodExitProgress={0}
                    boxExitProgress={0}
                    boxEnterProgress={1}
                    foodEnterProgress={1}
                  />
                ) : (
                  <BoxScene25D
                    product={product}
                    transitionState="IDLE"
                    foodExitProgress={0}
                    boxExitProgress={0}
                    boxEnterProgress={1}
                    foodEnterProgress={1}
                  />
                )}
              </div>

              {/* Bottom Caption */}
              <div className="text-center z-20">
                <p className="text-xs text-warmWhite/70 font-sans">
                  ✦ Xoay chuột để khám phá góc nhìn 3 chiều của từng món đặc sản
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing, Buy Actions, Details */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div>
              <div className="flex items-center space-x-2 text-xs font-serif uppercase tracking-widest text-gold font-bold mb-1">
                <span>{product.regionName}</span>
                <span>•</span>
                <span>{product.category.toUpperCase()}</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 leading-tight">
                {product.name}
              </h1>
              <p className="text-sm text-dark-muted font-sans mt-2">
                {product.subName}
              </p>
            </div>

            {/* Price and Ratings */}
            <div className="flex items-center justify-between pb-4 border-b border-forest-900/10">
              <div>
                <span className="font-serif text-3xl font-bold text-terracotta">
                  {formatCurrency(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="ml-3 text-sm text-dark-muted line-through">
                    {formatCurrency(product.compareAtPrice)}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-1.5 text-xs text-forest-900 bg-forest-50 px-3 py-1 rounded-full border border-forest-100">
                <Star className="w-4 h-4 fill-gold text-gold" />
                <span className="font-bold">{product.rating}</span>
                <span className="text-dark-muted">({product.reviewCount} đánh giá)</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-dark leading-relaxed font-sans">
              {product.description}
            </p>

            {/* Quick Box specs */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#FFFDF8] border border-forest-900/10 text-xs">
              <div>
                <span className="text-dark-muted block">Trọng lượng</span>
                <span className="font-semibold text-forest-900">{product.weight}</span>
              </div>
              <div>
                <span className="text-dark-muted block">Kích thước hộp</span>
                <span className="font-semibold text-forest-900">{product.dimensions}</span>
              </div>
              <div>
                <span className="text-dark-muted block">Hạn bảo quản</span>
                <span className="font-semibold text-forest-900">{product.shelfLife}</span>
              </div>
              <div>
                <span className="text-dark-muted block">Tình trạng</span>
                <span className="font-semibold text-forest-600">Còn hàng ({product.stock} box)</span>
              </div>
            </div>

            {/* Quantity and Add to Cart Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-4">
                <span className="text-xs font-semibold text-dark-muted">Số lượng:</span>
                <div className="flex items-center border border-forest-900/20 rounded-xl bg-white px-3 py-1.5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-dark-muted hover:text-dark p-1"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-bold text-sm w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-dark-muted hover:text-dark p-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-forest-900 hover:bg-forest-800 text-warmWhite font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-98 flex items-center justify-center space-x-2"
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-gold" />
                      <span>Đã thêm vào giỏ!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-gold" />
                      <span>Thêm vào giỏ quà</span>
                    </>
                  )}
                </button>

                <Link
                  href="/build-your-box"
                  className="py-3.5 px-4 rounded-2xl border border-gold hover:bg-gold/10 text-forest-900 font-semibold text-xs transition-colors flex items-center space-x-1"
                >
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span className="hidden sm:inline">Tùy biến</span>
                </Link>
              </div>
            </div>

            {/* Assurance badges */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-forest-900/10 text-[11px] text-dark-muted text-center">
              <div className="flex flex-col items-center">
                <Truck className="w-4 h-4 text-forest-600 mb-1" />
                <span>Giao nhanh 24h</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-4 h-4 text-forest-600 mb-1" />
                <span>Chuẩn vị tự nhiên</span>
              </div>
              <div className="flex flex-col items-center">
                <RotateCcw className="w-4 h-4 text-forest-600 mb-1" />
                <span>Đổi trả 100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Ingredients, Cultural Story, Reviews */}
        <div className="mt-16 bg-[#FFFDF8] rounded-3xl p-6 sm:p-10 border border-forest-900/10 shadow-subtle">
          <div className="flex space-x-4 border-b border-forest-900/10 pb-4 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab("ingredients")}
              className={`font-serif text-sm sm:text-base font-bold pb-2 transition-colors whitespace-nowrap ${
                activeTab === "ingredients"
                  ? "text-forest-900 border-b-2 border-gold"
                  : "text-dark-muted hover:text-forest-900"
              }`}
            >
              Thành phần hộp quà ({product.items3D.length} món)
            </button>
            <button
              onClick={() => setActiveTab("story")}
              className={`font-serif text-sm sm:text-base font-bold pb-2 transition-colors whitespace-nowrap ${
                activeTab === "story"
                  ? "text-forest-900 border-b-2 border-gold"
                  : "text-dark-muted hover:text-forest-900"
              }`}
            >
              Câu chuyện thổ nhưỡng
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`font-serif text-sm sm:text-base font-bold pb-2 transition-colors whitespace-nowrap ${
                activeTab === "reviews"
                  ? "text-forest-900 border-b-2 border-gold"
                  : "text-dark-muted hover:text-forest-900"
              }`}
            >
              Đánh giá từ người nhận ({product.reviewCount})
            </button>
          </div>

          <div className="pt-6">
            {activeTab === "ingredients" && (
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-forest-900">
                  Chi tiết từng thức quà được đóng gói trong hộp:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.items3D.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-cream-100 flex items-center space-x-4 border border-forest-900/5 hover:border-gold/30 transition-colors"
                    >
                      <div className="w-16 h-16 rounded-xl bg-white p-1.5 flex-shrink-0 flex items-center justify-center shadow-sm border border-forest-900/5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.imageAsset || DEFAULT_FOOD_PLACEHOLDER}
                          alt={item.name}
                          className="max-w-full max-h-full object-contain filter drop-shadow"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.onerror = null;
                            target.src = DEFAULT_FOOD_PLACEHOLDER;
                          }}
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-forest-900">
                          {item.name} {item.weight && `(${item.weight})`}
                        </h4>
                        <p className="text-xs text-dark-muted mt-0.5">
                          {item.shortNote}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "story" && (
              <div className="max-w-3xl space-y-4 text-xs sm:text-sm text-dark-muted leading-relaxed font-sans">
                <h3 className="font-serif text-xl font-bold text-forest-900">
                  Hành trình từ vườn nhà đến chiếc hộp quà trao tay
                </h3>
                <p>{product.story}</p>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 rounded-2xl bg-cream-100 max-w-sm">
                  <span className="font-serif text-4xl font-bold text-forest-900">
                    {product.rating}
                  </span>
                  <div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-gold text-gold"
                        />
                      ))}
                    </div>
                    <span className="text-xs text-dark-muted">
                      Dựa trên {product.reviewCount} lượt mua hàng đã xác thực
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {product.reviews?.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-xl border border-forest-900/10 bg-white"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-forest-900">
                          {rev.author} ({rev.location})
                        </span>
                        <span className="text-[11px] text-dark-subtle">{rev.date}</span>
                      </div>
                      <p className="text-xs text-dark-muted mt-2">
                        &ldquo;{rev.comment}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h2 className="font-serif text-2xl font-bold text-forest-900 mb-8">
            Có thể bạn cũng thích
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((rel) => (
              <Link
                key={rel.id}
                href={`/products/${rel.slug}`}
                className="rounded-3xl bg-[#FFFDF8] border border-forest-900/10 hover:border-gold/50 shadow-subtle hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                {/* 3D Box Open Imagery Stage */}
                <div
                  className="h-48 p-4 relative overflow-hidden flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500"
                  style={{ backgroundColor: rel.theme.boxColor }}
                >
                  <span className="absolute top-3 left-3 text-[10px] text-gold font-serif uppercase tracking-widest font-bold bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-gold/30 z-10 shadow-sm">
                    {rel.regionName}
                  </span>

                  {/* 3D Box Graphic */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={rel.boxOpenAsset || rel.heroImage}
                    alt={rel.name}
                    className="max-h-36 max-w-[85%] object-contain filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      if (rel.heroImage && target.src !== rel.heroImage) {
                        target.src = rel.heroImage;
                      }
                    }}
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-base text-forest-900 group-hover:text-gold transition-colors">
                      {rel.name}
                    </h4>
                    <p className="text-xs text-dark-muted line-clamp-2 leading-relaxed mt-1">
                      {rel.shortDescription}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-forest-900/10">
                    <span className="text-sm font-bold text-terracotta font-serif">
                      {formatCurrency(rel.price)}
                    </span>
                    <span className="text-xs font-semibold text-forest-700 group-hover:text-gold transition-colors flex items-center space-x-1">
                      <span>Khám phá</span>
                      <span>→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
