"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cartContext";
import { formatCurrency } from "@/lib/utils";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Tag,
  Truck,
  CheckCircle2,
} from "lucide-react";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    itemCount,
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
  const [couponSuccess, setCouponSuccess] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon) return;
    const success = applyCoupon(inputCoupon);
    if (success) {
      setCouponSuccess(true);
      setCouponError("");
      setInputCoupon("");
    } else {
      setCouponError("Mã giảm giá không hợp lệ. Hãy thử: VUNGQUE10 hoặc FREESHIP");
      setCouponSuccess(false);
    }
  };

  const freeShippingThreshold = 500000;
  const progressToFreeShip = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );
  const remainingForFreeShip = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-forest-900/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF8] text-dark shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-forest-900/10 flex items-center justify-between bg-cream-100">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-forest-900" />
              <h2 className="font-serif text-lg font-bold text-forest-900">
                Giỏ quà của bạn ({itemCount})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 rounded-full hover:bg-forest-100 transition-colors"
              aria-label="Đóng giỏ hàng"
            >
              <X className="w-5 h-5 text-dark-muted" />
            </button>
          </div>

          {/* Free Shipping Progress bar */}
          <div className="px-5 py-3 bg-forest-50 border-b border-forest-900/5">
            <div className="flex items-center space-x-2 text-xs">
              <Truck className="w-4 h-4 text-forest-600 flex-shrink-0" />
              {remainingForFreeShip > 0 ? (
                <p className="text-forest-800">
                  Thêm{" "}
                  <span className="font-bold text-terracotta">
                    {formatCurrency(remainingForFreeShip)}
                  </span>{" "}
                  để được <span className="font-bold">Freeship toàn quốc</span>!
                </p>
              ) : (
                <p className="font-bold text-forest-600 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  Bạn đã được Miễn phí vận chuyển toàn quốc!
                </p>
              )}
            </div>
            <div className="w-full bg-cream-300 rounded-full h-1.5 mt-2 overflow-hidden">
              <div
                className="bg-gold h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressToFreeShip}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-cream-200 flex items-center justify-center text-forest-900/40">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-forest-900">
                    Chưa có món quà nào
                  </h3>
                  <p className="text-xs text-dark-muted mt-1 max-w-xs">
                    Hãy dạo quanh các vùng miền hoặc tự tay thiết kế chiếc box
                    đặc sản của riêng bạn nhé!
                  </p>
                </div>
                <div className="flex flex-col space-y-2 w-full max-w-xs">
                  <button
                    onClick={closeCart}
                    className="w-full"
                  >
                    <Link
                      href="/shop"
                      className="block w-full py-2.5 px-4 rounded-xl bg-forest-900 text-warmWhite text-xs font-semibold uppercase tracking-wider hover:bg-forest-800 transition-colors"
                    >
                      Khám phá các box quà
                    </Link>
                  </button>
                  <button
                    onClick={closeCart}
                    className="w-full"
                  >
                    <Link
                      href="/build-your-box"
                      className="block w-full py-2.5 px-4 rounded-xl border border-gold text-forest-900 text-xs font-semibold hover:bg-gold/10 transition-colors"
                    >
                      Tự tay tạo chiếc box riêng
                    </Link>
                  </button>
                </div>
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={`${item.product.id}-${idx}`}
                  className="flex space-x-3.5 p-3 rounded-xl border border-forest-900/10 hover:border-gold/30 bg-white transition-all shadow-subtle"
                >
                  {/* Thumbnail / Theme color preview */}
                  <div
                    className="w-20 h-20 rounded-lg flex-shrink-0 flex items-center justify-center p-2 relative overflow-hidden"
                    style={{ backgroundColor: item.product.theme.boxColor }}
                  >
                    <div className="text-center">
                      <span className="font-serif text-[10px] text-gold uppercase tracking-wider block">
                        {item.product.regionName}
                      </span>
                      <span className="text-warmWhite font-bold text-xs line-clamp-1">
                        {item.isCustomBox ? "Tự Tạo" : "Box Quà"}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-serif font-bold text-sm text-forest-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeItem(idx)}
                          className="text-dark-muted hover:text-terracotta p-1 transition-colors"
                          aria-label="Xóa sản phẩm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-[11px] text-dark-muted line-clamp-1">
                        {item.product.subName}
                      </p>

                      {/* Custom Card detail if any */}
                      {item.customCard && (
                        <div className="mt-1 text-[10px] bg-cream-100 text-forest-900 px-2 py-0.5 rounded border border-forest-900/10">
                          💌 Gửi: <span className="font-bold">{item.customCard.recipient}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity controls */}
                      <div className="flex items-center space-x-2 border border-forest-900/15 rounded-lg px-2 py-0.5 bg-cream-50">
                        <button
                          onClick={() => updateQuantity(idx, item.quantity - 1)}
                          className="text-dark-muted hover:text-dark p-0.5"
                          aria-label="Giảm số lượng"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(idx, item.quantity + 1)}
                          className="text-dark-muted hover:text-dark p-0.5"
                          aria-label="Tăng số lượng"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-bold text-sm text-terracotta">
                        {formatCurrency(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Calculations and Checkout CTA */}
          {items.length > 0 && (
            <div className="p-5 border-t border-forest-900/10 bg-cream-50 space-y-3">
              {/* Promo code input */}
              <form onSubmit={handleApplyCoupon} className="flex space-x-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Mã giảm giá (vd: VUNGQUE10)"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-forest-900/20 bg-white uppercase focus:outline-none focus:border-gold"
                  />
                  <Tag className="w-3.5 h-3.5 absolute right-3 top-2.5 text-dark-muted" />
                </div>
                <button
                  type="submit"
                  className="px-3 py-2 rounded-lg bg-forest-900 text-warmWhite text-xs font-semibold hover:bg-forest-800 transition-colors"
                >
                  Áp dụng
                </button>
              </form>

              {couponSuccess && couponCode && (
                <div className="flex items-center justify-between text-xs text-forest-700 bg-forest-50 p-2 rounded-lg border border-forest-200">
                  <span>Mã {couponCode} (-10%)</span>
                  <button
                    onClick={removeCoupon}
                    className="text-terracotta font-semibold underline text-[11px]"
                  >
                    Bỏ mã
                  </button>
                </div>
              )}

              {couponError && (
                <p className="text-[11px] text-terracotta">{couponError}</p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-dark-muted pt-2 border-t border-forest-900/10">
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
                  <span>Phí vận chuyển</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-forest-600 font-bold">Miễn phí</span>
                    ) : (
                      formatCurrency(shippingFee)
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-bold text-forest-900 pt-2 border-t border-forest-900/10">
                  <span>Tổng thanh toán</span>
                  <span className="text-base text-terracotta">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={closeCart}
                className="w-full block"
              >
                <Link
                  href="/checkout"
                  className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-forest-900 text-warmWhite hover:bg-forest-800 text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-98"
                >
                  <span>Tiến hành thanh toán</span>
                  <ArrowRight className="w-4 h-4 text-gold" />
                </Link>
              </button>

              <button
                onClick={closeCart}
                className="w-full text-center text-xs text-dark-muted hover:text-dark py-1"
              >
                Tiếp tục chọn quà
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
