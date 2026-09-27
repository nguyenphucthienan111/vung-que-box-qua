"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Product, RegionInfo } from "@/types/product";
import { useCart } from "@/lib/cartContext";
import { formatCurrency } from "@/lib/utils";
import {
  Search,
  ShoppingBag,
  Star,
  Check,
  X,
} from "lucide-react";

interface ShopListClientProps {
  products: Product[];
  regions: RegionInfo[];
}

export function ShopListClient({ products, regions }: ShopListClientProps) {
  const { addItem } = useCart();
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [addedId, setAddedId] = useState<string | null>(null);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Region filter
      if (selectedRegion !== "all" && prod.region !== selectedRegion) {
        return false;
      }
      // Category filter
      if (selectedCategory !== "all" && prod.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = prod.name.toLowerCase().includes(q);
        const matchDesc = prod.shortDescription.toLowerCase().includes(q);
        const matchRegion = prod.regionName.toLowerCase().includes(q);
        const matchIng = prod.ingredients.some((i) => i.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchRegion && !matchIng) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // featured default
    });
  }, [products, selectedRegion, selectedCategory, searchQuery, sortBy]);

  const handleAdd = (prod: Product, e: React.MouseEvent) => {
    e.preventDefault();
    addItem(prod, 1);
    setAddedId(prod.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <div className="pt-24 pb-20 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="py-8 border-b border-forest-900/10">
          <span className="text-xs font-serif uppercase tracking-widest text-gold font-bold">
            CỬA HÀNG ĐẶC SẢN
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest-900 mt-1">
            Bộ sưu tập box quà Việt
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-dark-muted max-w-2xl">
            Tuyển chọn những hộp quà đặc sản tinh hoa từ Đà Lạt, Tây Ninh, Tây Bắc, Huế, miền Tây và Phú Quốc.
          </p>
        </div>

        {/* Filters and Controls Bar */}
        <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Tìm theo tên, món ăn, vùng miền..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs px-4 py-2.5 pl-9 rounded-xl border border-forest-900/15 bg-[#FFFDF8] text-dark focus:outline-none focus:border-gold"
            />
            <Search className="w-4 h-4 text-dark-muted absolute left-3 top-3" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-3 text-dark-muted hover:text-dark"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center space-x-2 text-xs text-dark-muted">
            <span>Sắp xếp:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl border border-forest-900/15 bg-[#FFFDF8] text-dark font-medium focus:outline-none focus:border-gold"
            >
              <option value="featured">Nổi bật nhất</option>
              <option value="price-asc">Giá: Thấp đến Cao</option>
              <option value="price-desc">Giá: Cao đến Thấp</option>
              <option value="rating">Đánh giá cao nhất</option>
            </select>
          </div>
        </div>

        {/* Region Filter Chips */}
        <div className="pb-6 flex items-center space-x-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedRegion("all")}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedRegion === "all"
                ? "bg-forest-900 text-warmWhite shadow-sm"
                : "bg-[#FFFDF8] text-dark hover:bg-forest-50 border border-forest-900/10"
            }`}
          >
            Tất cả vùng miền ({products.length})
          </button>
          {regions.map((r) => {
            const count = products.filter((p) => p.region === r.id).length;
            return (
              <button
                key={r.id}
                onClick={() => setSelectedRegion(r.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedRegion === r.id
                    ? "bg-forest-900 text-warmWhite shadow-sm"
                    : "bg-[#FFFDF8] text-dark hover:bg-forest-50 border border-forest-900/10"
                }`}
              >
                {r.name} {count > 0 && `(${count})`}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center rounded-2xl bg-[#FFFDF8] border border-forest-900/10 p-8">
            <p className="font-serif text-lg font-bold text-forest-900">
              Không tìm thấy box quà phù hợp
            </p>
            <p className="text-xs text-dark-muted mt-1">
              Vui lòng thử điều chỉnh lại bộ lọc hoặc từ khóa tìm kiếm.
            </p>
            <button
              onClick={() => {
                setSelectedRegion("all");
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-forest-900 text-warmWhite text-xs font-semibold"
            >
              Đặt lại tất cả bộ lọc
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="rounded-3xl bg-[#FFFDF8] overflow-hidden border border-forest-900/10 hover:border-gold/40 shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Box Cover Header with Theme Color */}
                <div
                  className="h-48 p-5 flex flex-col justify-between relative overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]"
                  style={{ backgroundColor: product.theme.boxColor }}
                >
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-[10px] font-serif uppercase tracking-widest text-gold font-bold px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-sm border border-gold/40">
                      {product.regionName}
                    </span>
                    {product.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-terracotta text-white shadow-sm">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Real Box Image & Title */}
                  <div className="flex flex-col items-center justify-center my-auto relative z-10 py-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.boxOpenAsset || product.heroImage}
                      alt={product.name}
                      className="max-h-36 w-auto object-contain filter drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                    />
                    <h3 className="font-serif text-lg font-bold text-warmWhite mt-2 text-center line-clamp-1">
                      {product.name}
                    </h3>
                  </div>

                  {/* Ribbon band detail */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1.5"
                    style={{ backgroundColor: product.theme.ribbonColor }}
                  />
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-1 text-gold text-xs mb-2">
                      <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                      <span className="font-bold">{product.rating}</span>
                      <span className="text-dark-muted">({product.reviewCount} đánh giá)</span>
                    </div>

                    <p className="text-xs text-dark-muted line-clamp-2 leading-relaxed">
                      {product.shortDescription}
                    </p>

                    {/* Quick Items list */}
                    <div className="mt-4 pt-3 border-t border-forest-900/5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-dark-muted block mb-1.5">
                        Gồm {product.items3D.length} món đặc sản:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {product.items3D.slice(0, 3).map((item) => (
                          <span
                            key={item.id}
                            className="text-[10px] px-2 py-0.5 rounded bg-cream-100 text-dark-muted"
                          >
                            {item.name}
                          </span>
                        ))}
                        {product.items3D.length > 3 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-cream-200 text-dark-muted font-bold">
                            +{product.items3D.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Footer & Price */}
                  <div className="mt-6 pt-4 border-t border-forest-900/10 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-dark-muted block">Giá niêm yết</span>
                      <span className="text-lg font-serif font-bold text-terracotta">
                        {formatCurrency(product.price)}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/products/${product.slug}`}
                        className="px-3 py-2 rounded-xl border border-forest-900/15 hover:bg-forest-50 text-xs font-semibold text-forest-900 transition-colors"
                      >
                        Chi tiết
                      </Link>
                      <button
                        onClick={(e) => handleAdd(product, e)}
                        className="px-4 py-2 rounded-xl bg-forest-900 hover:bg-forest-800 text-warmWhite text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-all shadow-sm active:scale-95"
                      >
                        {addedId === product.id ? (
                          <Check className="w-3.5 h-3.5 text-gold" />
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5 text-gold" />
                            <span>Mua</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
