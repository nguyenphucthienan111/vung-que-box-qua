"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/lib/cartContext";
import { formatCurrency } from "@/lib/utils";
import {
  CreditCard,
  QrCode,
  Truck,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Lock,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shippingFee, discount, total, clearCart } =
    useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "TP. Hồ Chí Minh",
    district: "Quận 1",
    note: "",
    paymentMethod: "cod" as "cod" | "qr" | "card",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert("Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ giao hàng!");
      return;
    }

    setIsSubmitting(true);

    const orderId = `VQ-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderSummary = {
      orderId,
      customer: formData,
      items,
      total,
      date: new Date().toLocaleDateString("vi-VN"),
    };

    try {
      localStorage.setItem("vung_que_last_order", JSON.stringify(orderSummary));
    } catch {
      // LocalStorage not available
    }

    setTimeout(() => {
      clearCart();
      router.push(`/order-success?orderId=${orderId}`);
    }, 1200);
  };

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-24 text-center bg-cream min-h-screen">
        <div className="max-w-md mx-auto p-8 rounded-3xl bg-[#FFFDF8] border border-forest-900/10 shadow-subtle">
          <h2 className="font-serif text-2xl font-bold text-forest-900">
            Giỏ hàng của bạn đang trống
          </h2>
          <p className="text-xs text-dark-muted mt-2">
            Vui lòng chọn ít nhất một box quà trước khi tiến hành thanh toán.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-block px-6 py-3 rounded-xl bg-forest-900 text-warmWhite text-xs font-bold uppercase tracking-wider"
          >
            Quay lại cửa hàng
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 border-b border-forest-900/10">
          <span className="text-xs font-serif uppercase tracking-widest text-gold font-bold">
            BẢO MẬT & CHÍNH XÁC
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 mt-1">
            Thông tin đặt hàng
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start my-8"
        >
          {/* Left: Customer Info, Shipping Address, Payment Method */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Customer Info */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF8] border border-forest-900/10 shadow-subtle space-y-4">
              <h2 className="font-serif text-xl font-bold text-forest-900">
                1. Thông tin người nhận
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-forest-900 mb-1">
                    Họ và tên người nhận *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-forest-900/20 bg-white focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-forest-900 mb-1">
                    Số điện thoại nhận hàng *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0912 345 678"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-forest-900/20 bg-white focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1">
                  Địa chỉ Email (để nhận hóa đơn & mã tra cứu)
                </label>
                <input
                  type="email"
                  placeholder="nguyenvana@gmail.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-forest-900/20 bg-white focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-forest-900 mb-1">
                    Tỉnh / Thành phố *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-forest-900/20 bg-white focus:outline-none focus:border-gold"
                  >
                    <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Cần Thơ">Cần Thơ</option>
                    <option value="Lâm Đồng (Đà Lạt)">Lâm Đồng (Đà Lạt)</option>
                    <option value="Tây Ninh">Tây Ninh</option>
                    <option value="Khác">Tỉnh thành khác</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-forest-900 mb-1">
                    Quận / Huyện *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Quận 1 / Ba Đình / Hải Châu..."
                    value={formData.district}
                    onChange={(e) =>
                      setFormData({ ...formData, district: e.target.value })
                    }
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-forest-900/20 bg-white focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1">
                  Địa chỉ số nhà, tên đường chi tiết *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Số 123 Đường Nguyễn Huệ, Phường Bến Nghé..."
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-forest-900/20 bg-white focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1">
                  Ghi chú cho shipper / Yêu cầu viết thiệp riêng
                </label>
                <textarea
                  rows={2}
                  placeholder="Giao giờ hành chính, gọi trước khi đến 15 phút..."
                  value={formData.note}
                  onChange={(e) =>
                    setFormData({ ...formData, note: e.target.value })
                  }
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-forest-900/20 bg-white focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            {/* 2. Payment Method */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF8] border border-forest-900/10 shadow-subtle space-y-4">
              <h2 className="font-serif text-xl font-bold text-forest-900">
                2. Phương thức thanh toán
              </h2>

              <div className="space-y-3">
                {/* COD */}
                <label
                  className={`flex items-start space-x-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    formData.paymentMethod === "cod"
                      ? "border-gold bg-cream-50 shadow-sm"
                      : "border-forest-900/10 bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={formData.paymentMethod === "cod"}
                    onChange={() =>
                      setFormData({ ...formData, paymentMethod: "cod" })
                    }
                    className="mt-1 text-gold focus:ring-gold"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-forest-900">
                        Thanh toán khi nhận hàng (COD)
                      </span>
                      <Truck className="w-4 h-4 text-forest-600" />
                    </div>
                    <p className="text-[11px] text-dark-muted mt-0.5">
                      Kiểm tra hộp quà trước khi thanh toán tiền mặt cho nhân
                      viên bưu tá.
                    </p>
                  </div>
                </label>

                {/* VietQR Bank Transfer */}
                <label
                  className={`flex items-start space-x-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    formData.paymentMethod === "qr"
                      ? "border-gold bg-cream-50 shadow-sm"
                      : "border-forest-900/10 bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={formData.paymentMethod === "qr"}
                    onChange={() =>
                      setFormData({ ...formData, paymentMethod: "qr" })
                    }
                    className="mt-1 text-gold focus:ring-gold"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-forest-900">
                        Chuyển khoản VietQR (Xác nhận tức thì)
                      </span>
                      <QrCode className="w-4 h-4 text-forest-600" />
                    </div>
                    <p className="text-[11px] text-dark-muted mt-0.5">
                      Quét mã QR qua app ngân hàng bất kỳ (Vietcombank, MB,
                      Techcombank, Momo...).
                    </p>
                  </div>
                </label>

                {/* Credit Card */}
                <label
                  className={`flex items-start space-x-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    formData.paymentMethod === "card"
                      ? "border-gold bg-cream-50 shadow-sm"
                      : "border-forest-900/10 bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={formData.paymentMethod === "card"}
                    onChange={() =>
                      setFormData({ ...formData, paymentMethod: "card" })
                    }
                    className="mt-1 text-gold focus:ring-gold"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-forest-900">
                        Thẻ tín dụng / Ghi nợ quốc tế (Visa, MasterCard)
                      </span>
                      <CreditCard className="w-4 h-4 text-forest-600" />
                    </div>
                    <p className="text-[11px] text-dark-muted mt-0.5">
                      Cổng thanh toán bảo mật tiêu chuẩn mã hóa SSL 256-bit.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right: Order Review & Submit */}
          <div className="lg:col-span-5 sticky top-28 p-6 sm:p-8 rounded-3xl bg-[#FFFDF8] border border-forest-900/10 shadow-subtle space-y-6">
            <h2 className="font-serif text-xl font-bold text-forest-900">
              Đơn hàng của bạn ({items.length} món)
            </h2>

            {/* Compact items list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs py-2 border-b border-forest-900/5"
                >
                  <div className="flex items-center space-x-2 truncate">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.product.theme.boxColor }}
                    />
                    <span className="font-medium text-dark truncate">
                      {item.product.name}
                    </span>
                    <span className="text-dark-muted font-bold">
                      x{item.quantity}
                    </span>
                  </div>
                  <span className="font-bold text-forest-900 flex-shrink-0">
                    {formatCurrency(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 pt-2 border-t border-forest-900/10 text-xs text-dark-muted">
              <div className="flex justify-between">
                <span>Tạm tính</span>
                <span className="font-semibold text-dark">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-terracotta">
                  <span>Khuyến mãi</span>
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
              <div className="flex justify-between text-base font-bold text-forest-900 pt-3 border-t border-forest-900/10">
                <span>Tổng thanh toán</span>
                <span className="text-xl text-terracotta">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-forest-900 hover:bg-forest-800 text-warmWhite font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-98 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Đang xử lý đơn hàng...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-gold" />
                  <span>Xác nhận đặt hàng ngay</span>
                </>
              )}
            </button>

            <div className="text-[11px] text-dark-muted text-center space-y-1">
              <p>✦ Giao hàng bảo đảm, đóng gói chống vỡ 3 lớp</p>
              <p>✦ Hỗ trợ giải đáp 24/7 qua hotline 0123 456 789</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
