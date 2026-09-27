"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cartContext";
import {
  ShoppingBag,
  Search,
  Heart,
  Menu,
  X,
  Compass,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { itemCount, openCart } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Trang chủ", href: "/" },
    { label: "Cửa hàng", href: "/shop" },
    { label: "Vùng miền", href: "/regions" },
    { label: "Tự tạo Box", href: "/build-your-box", badge: "Mới" },
    { label: "Câu chuyện", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Liên hệ", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#FFFDF8]/90 backdrop-blur-md shadow-subtle py-3 border-b border-forest-900/5 text-forest-900"
            : "bg-gradient-to-b from-forest-900/70 via-forest-900/30 to-transparent py-5 text-warmWhite"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-9 h-9 rounded-full bg-forest-900 text-gold flex items-center justify-center font-serif text-lg font-bold border border-gold/40 shadow-sm transition-transform duration-300 group-hover:scale-105">
                V
              </div>
              <div className="flex flex-col">
                <span className="font-serif tracking-widest text-lg md:text-xl font-bold uppercase transition-colors">
                  VÙNG QUÊ
                </span>
                <span
                  className={`text-[9px] tracking-widest uppercase font-sans font-medium transition-colors ${
                    isScrolled ? "text-sage-500" : "text-gold/90"
                  }`}
                >
                  Gửi trọn hương vị Việt
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-sm font-medium tracking-wide transition-colors py-1 ${
                      isActive
                        ? "text-gold font-semibold"
                        : isScrolled
                        ? "text-dark hover:text-forest-500"
                        : "text-warmWhite/90 hover:text-gold"
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="absolute -top-2 -right-6 text-[9px] px-1.5 py-0.2 bg-terracotta text-white rounded-full font-bold animate-pulse">
                        {link.badge}
                      </span>
                    )}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Icons & CTA */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2 rounded-full transition-colors ${
                  isScrolled
                    ? "hover:bg-forest-50 text-dark"
                    : "hover:bg-white/10 text-warmWhite"
                }`}
                aria-label="Tìm kiếm sản phẩm"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Build Your Box quick icon */}
              <Link
                href="/build-your-box"
                className={`hidden sm:flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                  isScrolled
                    ? "border-gold/40 text-forest-900 bg-gold/10 hover:bg-gold/20"
                    : "border-gold/60 text-gold bg-black/20 hover:bg-black/30"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>Tự tạo Box</span>
              </Link>

              {/* Cart Button with Animated Badge */}
              <button
                onClick={openCart}
                className="relative p-2 rounded-full transition-transform active:scale-95"
                aria-label="Xem giỏ hàng"
              >
                <div
                  className={`p-2 rounded-full transition-colors ${
                    isScrolled
                      ? "hover:bg-forest-50 text-dark"
                      : "hover:bg-white/10 text-warmWhite"
                  }`}
                >
                  <ShoppingBag className="w-5 h-5" />
                </div>
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 rounded-full bg-terracotta text-white text-[11px] font-bold flex items-center justify-center shadow-md animate-bounce">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Desktop CTA */}
              <Link
                href="/shop"
                className="hidden md:inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded-full bg-forest-900 text-warmWhite hover:bg-forest-800 transition-all shadow-sm hover:shadow-card active:scale-95 border border-gold/30"
              >
                <span>Đặt quà ngay</span>
                <ArrowRight className="w-3.5 h-3.5 text-gold" />
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-full transition-colors ${
                  isScrolled
                    ? "hover:bg-forest-50 text-dark"
                    : "hover:bg-white/10 text-warmWhite"
                }`}
                aria-label="Mở menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar Drawer */}
        {isSearchOpen && (
          <div className="border-t border-forest-900/10 bg-[#FFFDF8] text-dark px-4 py-3 shadow-lg">
            <div className="max-w-2xl mx-auto flex items-center space-x-2">
              <Search className="w-5 h-5 text-dark-muted" />
              <input
                type="text"
                placeholder="Tìm kiếm box quà, hồng sấy, trà sen, bánh tráng..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-sm text-dark placeholder:text-dark-muted"
                autoFocus
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-xs text-dark-muted hover:text-dark px-2 py-1"
              >
                Đóng
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-forest-900/95 backdrop-blur-xl text-warmWhite flex flex-col pt-24 px-6 pb-8 lg:hidden animate-fade-in">
          <div className="flex flex-col space-y-5 text-lg font-serif">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between py-2 border-b border-white/10 hover:text-gold transition-colors"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-xs px-2 py-0.5 bg-terracotta text-white rounded-full font-sans">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="mt-auto space-y-4 font-sans">
            <Link
              href="/build-your-box"
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-gold/20 text-gold border border-gold/50 font-semibold text-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Tự tay tạo chiếc box của bạn</span>
            </Link>

            <Link
              href="/shop"
              className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-gold text-forest-900 font-bold text-sm uppercase tracking-wider"
            >
              <span>Khám phá các box quà</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
