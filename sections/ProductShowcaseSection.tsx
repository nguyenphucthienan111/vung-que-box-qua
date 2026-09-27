"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { Product } from "@/types/product";
import { useCart } from "@/lib/cartContext";
import { formatCurrency } from "@/lib/utils";
import {
  ShoppingBag,
  Star,
  Eye,
  ArrowRight,
  Check,
  Sparkles,
  X,
} from "lucide-react";

export function ProductShowcaseSection() {
  const { addItem } = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);

  const featured = PRODUCTS[0]; // Box Đà Lạt
  const secondaryBoxes = PRODUCTS.slice(1, 4); // Tây Ninh, Tây Bắc, Miền Tây

  const handleAdd = (prod: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(prod, 1);
    setAddedId(prod.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <section className="py-24 bg-[#FFFDF8] relative overflow-hidden" id="sanpham">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-forest-900/5 text-xs font-serif uppercase tracking-widest text-forest-900 mb-2">
              <Sparkles className="w-3 h-3 text-gold" />
              <span>Tuyển Chọn Tinh Tế</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-900 tracking-tight">
              Những chiếc box được yêu thích
            </h2>
          </div>
          <Link
            href="/shop"
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-forest-900 hover:text-gold transition-colors"
          >
            <span>Xem tất cả sản phẩm</span>
            <ArrowRight className="w-4 h-4 text-gold" />
          </Link>
        </div>

        {/* 1 Large Featured Product + 3 Smaller Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Big Featured Card */}
          <div className="lg:col-span-6 rounded-3xl overflow-hidden bg-forest-900 text-warmWhite p-6 sm:p-10 flex flex-col justify-between shadow-floating border border-gold/30 relative group">
            {/* Visual Header */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-serif uppercase tracking-widest text-gold font-bold px-3 py-1 rounded-full bg-white/10 border border-gold/40">
                  {featured.badge || "Signature Box"}
                </span>
                <div className="flex items-center space-x-1 text-gold text-xs">
                  <Star className="w-4 h-4 fill-gold text-gold" />
                  <span className="font-bold">{featured.rating}</span>
                  <span className="text-warmWhite/60">({featured.reviewCount})</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                  <span className="text-xs uppercase tracking-widest text-gold font-serif">
                    {featured.regionName}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-1 tracking-tight text-warmWhite">
                    {featured.name}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-warmWhite/80 leading-relaxed font-sans max-w-md">
                    {featured.shortDescription}
                  </p>

                  {/* Items visual list */}
                  <div className="mt-4 pt-4 border-t border-white/10 space-y-1.5">
                    <span className="text-xs font-serif uppercase tracking-wider text-gold block">
                      Bao gồm:
                    </span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {featured.items3D.map((item) => (
                        <div
                          key={item.id}
                          className="text-xs text-warmWhite/90 flex items-center space-x-1.5"
                        >
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="truncate">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Big Real Box Image */}
                <div className="w-44 h-44 sm:w-56 sm:h-56 relative flex-shrink-0 flex items-center justify-center p-2 rounded-2xl bg-white/5 border border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featured.boxOpenAsset || featured.heroImage}
                    alt={featured.name}
                    className="max-w-full max-h-full object-contain filter drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-warmWhite/60 block">Giá trọn bộ box</span>
                <span className="text-2xl font-serif font-bold text-gold">
                  {formatCurrency(featured.price)}
                </span>
              </div>

              <div className="flex items-center space-x-2.5 w-full sm:w-auto">
                <button
                  onClick={() => setQuickViewProduct(featured)}
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-warmWhite transition-colors"
                  aria-label="Xem nhanh"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => handleAdd(featured, e)}
                  className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-gold hover:bg-gold-400 text-forest-900 font-bold text-xs uppercase tracking-wider transition-all shadow-gold flex items-center justify-center space-x-2"
                >
                  {addedId === featured.id ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Đã thêm</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Thêm vào giỏ</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* 3 Smaller Product Cards Column */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            {secondaryBoxes.map((product) => (
              <div
                key={product.id}
                className="rounded-2xl bg-cream-50 p-4 sm:p-5 border border-forest-900/10 hover:border-gold/40 shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                {/* Product Thumbnail */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-forest-900/5 p-2 flex-shrink-0 flex items-center justify-center border border-forest-900/10 group-hover:scale-105 transition-transform overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.boxOpenAsset || product.heroImage}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain filter drop-shadow"
                  />
                </div>

                {/* Left info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-serif uppercase tracking-widest text-gold font-bold px-2 py-0.5 rounded bg-forest-900 text-warmWhite">
                      {product.regionName}
                    </span>
                    <span className="text-xs text-dark-muted font-medium">
                      ★ {product.rating}
                    </span>
                  </div>

                  <Link href={`/products/${product.slug}`}>
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-forest-900 mt-2 group-hover:text-gold transition-colors">
                      {product.name}
                    </h4>
                  </Link>

                  <p className="text-xs text-dark-muted mt-1 line-clamp-1">
                    {product.shortDescription}
                  </p>

                  <div className="mt-3 flex items-center space-x-2">
                    <span className="font-serif font-bold text-base text-terracotta">
                      {formatCurrency(product.price)}
                    </span>
                    {product.compareAtPrice && (
                      <span className="text-xs text-dark-muted line-through">
                        {formatCurrency(product.compareAtPrice)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right controls */}
                <div className="flex sm:flex-col items-center justify-end space-x-2 sm:space-x-0 sm:space-y-2 flex-shrink-0">
                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="p-2.5 rounded-xl border border-forest-900/15 hover:bg-forest-50 text-dark-muted hover:text-dark transition-colors"
                    aria-label="Xem nhanh"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => handleAdd(product, e)}
                    className="flex-1 sm:flex-none p-2.5 px-4 rounded-xl bg-forest-900 hover:bg-forest-800 text-warmWhite text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all shadow-sm active:scale-95"
                  >
                    {addedId === product.id ? (
                      <Check className="w-4 h-4 text-gold" />
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5 text-gold" />
                        <span className="sm:hidden">Thêm vào giỏ</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-900/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FFFDF8] rounded-2xl max-w-lg w-full p-6 text-dark shadow-2xl border border-forest-900/10 relative">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-forest-50 text-dark-muted"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-serif uppercase tracking-widest text-gold font-bold">
              {quickViewProduct.regionName}
            </span>
            <h3 className="font-serif text-2xl font-bold text-forest-900 mt-1">
              {quickViewProduct.name}
            </h3>
            <p className="text-xs text-dark-muted mt-2 leading-relaxed">
              {quickViewProduct.description}
            </p>

            <div className="mt-4 p-3 bg-cream-100 rounded-xl">
              <span className="text-xs font-bold text-forest-900 block mb-1">
                Thành phần hộp quà:
              </span>
              <ul className="text-xs text-dark-muted space-y-1">
                {quickViewProduct.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-start space-x-1.5">
                    <span className="text-gold">•</span>
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-forest-900/10">
              <div>
                <span className="text-xs text-dark-muted block">Giá bán</span>
                <span className="text-xl font-bold text-terracotta">
                  {formatCurrency(quickViewProduct.price)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Link
                  href={`/products/${quickViewProduct.slug}`}
                  className="px-4 py-2.5 rounded-xl border border-forest-900/20 text-xs font-semibold text-forest-900 hover:bg-forest-50"
                >
                  Xem chi tiết
                </Link>
                <button
                  onClick={(e) => {
                    handleAdd(quickViewProduct, e);
                    setQuickViewProduct(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-warmWhite text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-gold" />
                  <span>Thêm vào giỏ</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
