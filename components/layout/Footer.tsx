"use client";

import React, { useState } from "react";
import Link from "next/link";
import { REGIONS } from "@/data/products";
import { Send, CheckCircle2, Heart, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-forest-900 text-warmWhite border-t border-gold/20 pt-16 pb-12 overflow-hidden relative">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sage-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-terracotta-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Newsletter Section */}
        <div className="bg-forest-800/80 backdrop-blur-md rounded-2xl p-6 sm:p-10 border border-gold/30 mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-lg text-center md:text-left">
            <span className="text-xs font-serif uppercase tracking-widest text-gold font-semibold">
              Bản Tin Nông Sản & Quà Việt
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-1 text-warmWhite">
              Nhận những câu chuyện mới từ Vùng Quê
            </h3>
            <p className="text-xs sm:text-sm text-warmWhite/70 mt-2">
              Đăng ký để nhận thông tin về các mẻ nông sản đầu mùa, ưu đãi theo
              mùa lễ hội và câu chuyện văn hóa ẩm thực 3 miền.
            </p>
          </div>

          <form
            onSubmit={handleSubscribe}
            className="w-full md:w-auto flex-1 max-w-md flex flex-col sm:flex-row gap-2"
          >
            {subscribed ? (
              <div className="w-full py-3 px-4 rounded-xl bg-sage-500/30 border border-sage-400 text-warmWhite text-xs font-medium flex items-center justify-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-gold" />
                <span>Cảm ơn bạn đã đăng ký nhận tin từ Vùng Quê!</span>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="Nhập địa chỉ email của bạn..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 rounded-xl bg-forest-900/90 border border-white/20 text-xs sm:text-sm text-warmWhite placeholder:text-warmWhite/40 focus:outline-none focus:border-gold"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gold text-forest-900 font-bold text-xs uppercase tracking-wider hover:bg-gold-400 transition-all flex items-center justify-center space-x-2 shadow-gold flex-shrink-0"
                >
                  <span>Đăng ký</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </form>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-white/10">
          {/* Brand info */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-full bg-forest-800 text-gold flex items-center justify-center font-serif text-lg font-bold border border-gold/40">
                V
              </div>
              <div className="flex flex-col">
                <span className="font-serif tracking-widest text-lg font-bold uppercase text-warmWhite">
                  VÙNG QUÊ
                </span>
                <span className="text-[9px] tracking-widest uppercase font-sans text-gold">
                  Gửi trọn hương vị Việt
                </span>
              </div>
            </Link>

            <p className="mt-4 text-xs text-warmWhite/70 leading-relaxed max-w-sm">
              Mỗi hộp quà là một câu chuyện về vùng đất, con người và những
              hương vị đáng nhớ. Chúng tôi trân trọng giá trị nông sản bản địa
              và tôn vinh bàn tay người nông dân Việt Nam.
            </p>

            <div className="mt-5 space-y-2 text-xs text-warmWhite/80">
              <p className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <span>Quận 10, TP. HCM</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <span>Hotline: 0123 456 789</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <span>Lienhe@vungque.vn</span>
              </p>
            </div>
          </div>

          {/* Regions */}
          <div>
            <h4 className="font-serif text-sm font-bold text-gold uppercase tracking-wider mb-4">
              Khám Phá Vùng Đất
            </h4>
            <ul className="space-y-2 text-xs text-warmWhite/70">
              {REGIONS.map((region) => (
                <li key={region.id}>
                  <Link
                    href={`/regions/${region.id}`}
                    className="hover:text-gold transition-colors block py-0.5"
                  >
                    Box {region.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products & Services */}
          <div>
            <h4 className="font-serif text-sm font-bold text-gold uppercase tracking-wider mb-4">
              Sản Phẩm & Dịch Vụ
            </h4>
            <ul className="space-y-2 text-xs text-warmWhite/70">
              <li>
                <Link
                  href="/shop"
                  className="hover:text-gold transition-colors block py-0.5"
                >
                  Tất cả box quà
                </Link>
              </li>
              <li>
                <Link
                  href="/build-your-box"
                  className="hover:text-gold transition-colors block py-0.5 text-gold font-medium"
                >
                  ✦ Tự tạo Box theo ý thích
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=dac-san"
                  className="hover:text-gold transition-colors block py-0.5"
                >
                  Box đặc sản vùng miền
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=snack"
                  className="hover:text-gold transition-colors block py-0.5"
                >
                  Box snack ăn vặt
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=tet"
                  className="hover:text-gold transition-colors block py-0.5"
                >
                  Hộp quà Tết & Doanh nghiệp
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-serif text-sm font-bold text-gold uppercase tracking-wider mb-4">
              Hỗ Trợ Khách Hàng
            </h4>
            <ul className="space-y-2 text-xs text-warmWhite/70">
              <li>
                <Link
                  href="/about"
                  className="hover:text-gold transition-colors block py-0.5"
                >
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-gold transition-colors block py-0.5"
                >
                  Liên hệ & Tư vấn
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-gold transition-colors block py-0.5"
                >
                  Cẩm nang quà quê
                </Link>
              </li>
              <li>
                <a
                  href="#chinh-sach"
                  className="hover:text-gold transition-colors block py-0.5"
                >
                  Chính sách giao hàng 24h
                </a>
              </li>
              <li>
                <a
                  href="#doi-tra"
                  className="hover:text-gold transition-colors block py-0.5"
                >
                  Cam kết đổi trả 100%
                </a>
              </li>
              <li>
                <a
                  href="#doanh-nghiep"
                  className="hover:text-gold transition-colors block py-0.5"
                >
                  Chiết khấu quà tặng doanh nghiệp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-warmWhite/60 gap-4">
          <p>
            © 2026 Vùng Quê — Gửi trọn hương vị Việt. Bản quyền được bảo lưu.
          </p>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <span>Được xây dựng với tình yêu nông sản Việt</span>
              <Heart className="w-3.5 h-3.5 text-terracotta inline fill-terracotta" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
