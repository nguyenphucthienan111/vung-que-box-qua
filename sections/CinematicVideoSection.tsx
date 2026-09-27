"use client";

import React, { useState } from "react";
import { Play, Sparkles, X } from "lucide-react";

export function CinematicVideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-24 bg-forest-900 text-warmWhite relative overflow-hidden">
      {/* Background mood overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-forest-900 via-forest-900/80 to-forest-900 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl overflow-hidden bg-forest-800 border border-gold/30 shadow-2xl p-8 sm:p-16 lg:p-20 text-center flex flex-col items-center justify-center min-h-[460px]">
          {/* Subtle ambient lighting */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-xs font-serif uppercase tracking-widest text-gold mb-4 border border-gold/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Thước Phim Nông Sản</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-warmWhite max-w-2xl leading-tight">
            Mở hộp. <br />
            <span className="italic font-normal text-gold">Mở câu chuyện.</span>
          </h2>

          <p className="mt-4 text-xs sm:text-sm text-warmWhite/80 max-w-lg leading-relaxed font-sans">
            Theo chân Vùng Quê về thăm những nghệ nhân làm bánh tráng lúc sương đêm, những vườn hồng treo gió xứ ngàn hoa và đồi chè cổ thụ Tây Bắc.
          </p>

          {/* Cinematic Play Button */}
          <div className="mt-8 flex flex-col items-center">
            <button
              onClick={() => setIsPlaying(true)}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gold text-forest-900 flex items-center justify-center shadow-gold hover:scale-110 active:scale-95 transition-all group"
              aria-label="Xem video hành trình Vùng Quê"
            >
              <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-forest-900 text-forest-900 translate-x-0.5 group-hover:scale-110 transition-transform" />
            </button>
            <span className="mt-3 text-xs tracking-widest uppercase text-warmWhite/70 font-semibold font-serif">
              Xem hành trình (1:45)
            </span>
          </div>
        </div>
      </div>

      {/* Video Modal Player */}
      {isPlaying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl bg-forest-900 rounded-2xl overflow-hidden border border-gold/40 shadow-2xl p-2">
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 text-warmWhite flex items-center justify-center hover:bg-black transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="aspect-video w-full rounded-xl bg-forest-950 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gold/20 text-gold flex items-center justify-center mb-4">
                <Play className="w-8 h-8 fill-gold" />
              </div>
              <h3 className="font-serif text-xl font-bold text-warmWhite">
                Hành Trình Tinh Hoa Nông Sản Việt — Vùng Quê
              </h3>
              <p className="text-xs text-warmWhite/60 mt-2 max-w-md">
                Video giới thiệu quy trình thu hoạch thủ công tại Đơn Dương, Tây Ninh và Mộc Châu.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
