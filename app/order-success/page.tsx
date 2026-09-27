"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import { formatCurrency } from "@/lib/utils";
import {
  CheckCircle2,
  Gift,
  Printer,
  ArrowRight,
} from "lucide-react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "VQ-886923";

  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#B9955A", "#C97955", "#55634A", "#26372B"],
      });
    } catch {
      // Confetti fallback
    }

    try {
      const saved = localStorage.getItem("vung_que_last_order");
      if (saved) {
        setOrderData(JSON.parse(saved));
      }
    } catch {
      // LocalStorage fallback
    }
  }, []);

  return (
    <div className="rounded-3xl bg-[#FFFDF8] border border-forest-900/10 shadow-floating p-8 sm:p-12 text-center space-y-6">
      <div className="relative w-24 h-24 mx-auto rounded-3xl bg-forest-900 text-gold flex items-center justify-center shadow-gold animate-bounce">
        <Gift className="w-12 h-12" />
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-terracotta text-white flex items-center justify-center">
          <CheckCircle2 className="w-5 h-5" />
        </div>
      </div>

      <div>
        <span className="text-xs font-serif uppercase tracking-widest text-gold font-bold">
          ĐẶT HÀNG THÀNH CÔNG
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 mt-1">
          Đơn hàng đã được ghi nhận!
        </h1>
        <p className="text-xs sm:text-sm text-dark-muted mt-2 font-sans">
          Cảm ơn bạn đã tin chọn Vùng Quê. Chiếc hộp quà của bạn đang được chúng tôi nắn nót đóng gói và gửi trao tận tay.
        </p>
      </div>

      <div className="p-5 rounded-2xl bg-cream-50 border border-forest-900/10 text-left space-y-2.5 text-xs text-dark-muted">
        <div className="flex justify-between">
          <span>Mã đơn hàng:</span>
          <span className="font-bold text-forest-900 font-mono text-sm">
            {orderId}
          </span>
        </div>

        {orderData?.customer && (
          <>
            <div className="flex justify-between">
              <span>Người nhận:</span>
              <span className="font-semibold text-dark">
                {orderData.customer.fullName} ({orderData.customer.phone})
              </span>
            </div>
            <div className="flex justify-between">
              <span>Địa chỉ giao:</span>
              <span className="font-semibold text-dark text-right max-w-xs">
                {orderData.customer.address}, {orderData.customer.district},{" "}
                {orderData.customer.city}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Hình thức:</span>
              <span className="font-semibold text-dark uppercase">
                {orderData.customer.paymentMethod === "cod"
                  ? "Tiền mặt khi nhận (COD)"
                  : orderData.customer.paymentMethod === "qr"
                  ? "Chuyển khoản VietQR"
                  : "Thẻ thanh toán quốc tế"}
              </span>
            </div>
          </>
        )}

        <div className="flex justify-between pt-2 border-t border-forest-900/10 text-sm font-bold text-forest-900">
          <span>Tổng thanh toán:</span>
          <span className="text-base text-terracotta">
            {orderData ? formatCurrency(orderData.total) : "Đã xác nhận"}
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          onClick={() => window.print()}
          className="w-full sm:w-auto px-5 py-3 rounded-xl border border-forest-900/20 text-xs font-semibold text-forest-900 hover:bg-forest-50 flex items-center justify-center space-x-1.5"
        >
          <Printer className="w-4 h-4" />
          <span>In đơn hàng</span>
        </button>

        <Link
          href="/"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-forest-900 hover:bg-forest-800 text-warmWhite text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-sm"
        >
          <span>Tiếp tục khám phá</span>
          <ArrowRight className="w-4 h-4 text-gold" />
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <div className="pt-28 pb-24 bg-cream min-h-screen flex items-center justify-center">
      <div className="max-w-xl w-full mx-auto px-4 sm:px-6">
        <Suspense fallback={<div className="text-center p-8">Đang tải thông tin đơn hàng...</div>}>
          <OrderSuccessContent />
        </Suspense>
      </div>
    </div>
  );
}
