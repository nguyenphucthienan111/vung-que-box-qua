"use client";

import React from "react";
import { Star, Heart, CheckCircle2, MessageSquareQuote } from "lucide-react";

export function SocialProofSection() {
  const reviews = [
    {
      name: "Ngọc Mai",
      location: "Hà Nội",
      role: "Khách hàng cá nhân",
      product: "Box Quà Đà Lạt An Yên",
      comment:
        "Mình đặt box Đà Lạt tặng mẹ dịp sinh nhật, mẹ khen nức nở vị hồng dẻo và trà atiso thơm thanh. Cách đóng gói hộp gỗ và hoa khô rất có gu!",
      rating: 5,
      date: "Vừa mở hộp 2 ngày trước",
    },
    {
      name: "Thái Sơn",
      location: "TP. Hồ Chí Minh",
      role: "Trưởng phòng Nhân sự",
      product: "Box Snack Việt & Bánh Tráng",
      comment:
        "Team công ty mình mê tít hũ muối tôm và bánh tráng Tây Ninh. Đặt 20 box quà vặt cho các bạn cày dự án ai cũng tấm tắc khen ngon và độc đáo.",
      rating: 5,
      date: "1 tuần trước",
    },
    {
      name: "Bích Phương",
      location: "Đà Nẵng",
      role: "Doanh nhân",
      product: "Box Quà Tết Thịnh Vượng",
      comment:
        "Quà biếu đối tác nước ngoài cần sự trang nhã và chuẩn Việt. Hộp sơn mài đỏ và trà Ô Long của Vùng Quê khiến đối tác cực kỳ ấn tượng.",
      rating: 5,
      date: "3 tuần trước",
    },
  ];

  return (
    <section className="py-24 bg-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-serif uppercase tracking-widest text-gold font-bold block mb-2">
            CHIA SẺ TỪ CỘNG ĐỒNG
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-900 tracking-tight">
            Khách hàng đang mở hộp
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-dark-muted leading-relaxed font-sans">
            Hơn 15.000 chiếc box quà đã được gửi trao tới 63 tỉnh thành với tỷ lệ hài lòng 99.4%.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white p-7 shadow-subtle hover:shadow-card border border-forest-900/10 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating stars & verified */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-gold text-gold"
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-forest-600 font-medium flex items-center space-x-1 bg-forest-50 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-forest-600 mr-1" />
                    Đã mua hàng
                  </span>
                </div>

                <div className="mb-3">
                  <span className="text-[11px] font-bold text-terracotta uppercase tracking-wider block">
                    {rev.product}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-dark-muted leading-relaxed font-sans italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-forest-900/10 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm text-forest-900">
                    {rev.name}
                  </h4>
                  <span className="text-[11px] text-dark-muted">
                    {rev.location} • {rev.role}
                  </span>
                </div>
                <span className="text-[10px] text-dark-subtle">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
