"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Package, Gift, HeartHandshake, CheckCircle2 } from "lucide-react";

export function BuildYourBoxTeaser() {
  const steps = [
    {
      num: "01",
      title: "Chọn mẫu hộp thủ công",
      desc: "Hộp gỗ thông mộc, hộp giấy dó ép kim hoặc làn mây tre đan tay truyền thống.",
      icon: Package,
    },
    {
      num: "02",
      title: "Tuyển chọn món yêu thích",
      desc: "Tự do phối hợp hồng sấy, bánh tráng, trà Shan Tuyết, muối tôm theo đúng gu người nhận.",
      icon: Gift,
    },
    {
      num: "03",
      title: "Viết thiệp gửi lời chúc",
      desc: "Chọn mẫu thiệp mỹ thuật và viết lời nhắn chân thành được Vùng Quê nắn nót viết tay.",
      icon: HeartHandshake,
    },
  ];

  return (
    <section className="py-24 bg-forest-900 text-warmWhite relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-xs font-serif uppercase tracking-widest text-gold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Trải Nghiệm Độc Bản</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-warmWhite">
            Tự tay tạo chiếc box của bạn
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-warmWhite/75 leading-relaxed font-sans">
            Không bị bó buộc trong khuôn mẫu có sẵn. Bạn hoàn toàn có thể tự tay tạo nên một món quà mang đậm dấu ấn cá nhân cho người thương.
          </p>
        </div>

        {/* 3 Steps Visual */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.num}
                className="rounded-2xl bg-forest-800/60 backdrop-blur-md p-8 border border-white/10 relative group hover:border-gold/50 transition-all duration-300"
              >
                <span className="font-serif text-4xl font-bold text-gold/30 block mb-4 group-hover:text-gold transition-colors">
                  {step.num}
                </span>
                <div className="w-12 h-12 rounded-xl bg-forest-900 border border-gold/30 flex items-center justify-center text-gold mb-5">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-warmWhite mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-warmWhite/70 leading-relaxed font-sans">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Call to action card */}
        <div className="text-center">
          <Link
            href="/build-your-box"
            className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-gold hover:bg-gold-400 text-forest-900 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-gold hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-forest-900" />
            <span>Bắt đầu tạo chiếc box riêng ngay</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
