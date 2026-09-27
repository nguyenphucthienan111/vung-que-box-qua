"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cartContext";
import { formatCurrency } from "@/lib/utils";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Truck,
  Tag,
  CheckCircle2,
} from "lucide-react";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    shippingFee,
    discount,
    total,
    couponCode,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState("");
  const [couponError, setCouponError] = useState("");

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon) return;
    const ok = applyCoupon(inputCoupon);
    if (!ok) {
      setCouponError("Mã giảm giá không hợp lệ. Thử: VUNGQUE10");
    } else {
      setCouponError("");
      setInputCoupon("");
    }
  };

  return (
    <div className="pt-24 pb-20 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 border-b border-forest-900/10 flex items-center justify-between">
          <div>
            <span className="text-xs font-serif uppercase tracking-widest text-gold font-bold">
              GIỎ HÀNG CỦA BẠN
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 mt-1">
              Kiểm tra đơn hàng
            </h1>
          </div>
          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center space-x-1.5 text-xs text-dark-muted hover:text-forest-900 font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Tiếp tục chọn quà</span>
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="py-24 text-center rounded-3xl bg-[#FFFDF8] border border-forest-900/10 p-8 my-8 max-w-lg mx-auto">
            <div className="w-20 h-20 rounded-full bg-cream-100 mx-auto flex items-center justify-center text-forest-900/40 mb-4">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-forest-900">
              Giỏ quà đang trống
            </h2>
            <p className="text-xs text-dark-muted mt-2">
              Bạn chưa chọn được món quà ưng ý nào. Hãy dạo qua các box đặc sản hoặc tự tay thiết kế chiếc box riêng nhé!
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/shop"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-forest-900 text-warmWhite text-xs font-bold uppercase tracking-wider"
              >
                Khám phá box quà
              </Link>
              <Link
                href="/build-your-box"
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gold text-forest-900 text-xs font-semibold"
              >
                Tự tạo chiếc box riêng
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start my-8">
            {/* Left: Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              {items.map((item, idx) => (
                <div
                  key={`${item.product.id}-${idx}`}
                  className="p-5 rounded-2xl bg-[#FFFDF8] border border-forest-900/10 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-20 h-20 rounded-xl flex items-center justify-center text-center p-2 flex-shrink-0"
                      style={{ backgroundColor: item.product.theme.boxColor }}
                    >
                      <span className="font-serif text-[11px] text-warmWhite font-bold uppercase">
                        {item.product.regionName}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif font-bold text-base text-forest-900">
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-dark-muted">
                        {item.product.subName}
                      </p>
                      {item.customCard && (
                        <p className="text-[11px] text-terracotta mt-1">
                          💌 Gửi tặng: {item.customCard.recipient}
                        </p>
                      )}
                      <span className="font-bold text-sm text-terracotta sm:hidden block mt-1">
                        {formatCurrency(item.product.price)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-8 pt-3 sm:pt-0 border-t sm:border-0 border-forest-900/10">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-forest-900/20 rounded-xl bg-white px-2 py-1">
                      <button
                        onClick={() => updateQuantity(idx, item.quantity - 1)}
                        className="text-dark-muted hover:text-dark p-1"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(idx, item.quantity + 1)}
                        className="text-dark-muted hover:text-dark p-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <span className="font-serif font-bold text-base text-forest-900 hidden sm:block">
                      {formatCurrency(item.product.price * item.quantity)}
                    </span>

                    <button
                      onClick={() => removeItem(idx)}
                      className="text-dark-muted hover:text-terracotta p-1 transition-colors"
                      aria-label="Xóa món"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex justify-between pt-2">
                <button
                  onClick={clearCart}
                  className="text-xs text-dark-muted hover:text-terracotta underline"
                >
                  Xóa toàn bộ giỏ hàng
                </button>
              </div>
            </div>

            {/* Right: Order Summary Card */}
            <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-[#FFFDF8] border border-forest-900/10 shadow-subtle space-y-5">
              <h2 className="font-serif text-xl font-bold text-forest-900">
                Tóm tắt đơn hàng
              </h2>

              {/* Coupon Form */}
              <form onSubmit={handleApply} className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Mã giảm giá (VUNGQUE10)"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-forest-900/20 uppercase focus:outline-none focus:border-gold"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-forest-900 text-warmWhite text-xs font-semibold"
                >
                  Áp dụng
                </button>
              </form>

              {couponCode && (
                <div className="flex items-center justify-between text-xs text-forest-700 bg-forest-50 p-2.5 rounded-xl border border-forest-200">
                  <span>Mã: {couponCode} (-10%)</span>
                  <button
                    onClick={removeCoupon}
                    className="text-terracotta underline"
                  >
                    Bỏ mã
                  </button>
                </div>
              )}
              {couponError && <p className="text-xs text-terracotta">{couponError}</p>}

              {/* Breakdown */}
              <div className="space-y-2 pt-2 border-t border-forest-900/10 text-xs text-dark-muted">
                <div className="flex justify-between">
                  <span>Tạm tính</span>
                  <span className="font-semibold text-dark">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-terracotta">
                    <span>Giảm giá</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Phí giao hàng</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-forest-600 font-bold">Miễn phí</span>
                    ) : (
                      formatCurrency(shippingFee)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-forest-900 pt-3 border-t border-forest-900/10">
                  <span>Tổng cộng</span>
                  <span className="text-lg text-terracotta">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full flex items-center justify-center space-x-2 py-4 rounded-xl bg-forest-900 hover:bg-forest-800 text-warmWhite font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-98"
              >
                <span>Chuyển sang trang thanh toán</span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
