"use client";

import React from "react";
import { Sparkles, Compass, Truck, HeartHandshake } from "lucide-react";

export function WhyChooseUsSection() {
  const features = [
    {
      icon: Sparkles,
      title: "Đặc sản chọn lọc",
      desc: "Nguồn gốc xuất xứ minh bạch, kiểm định an toàn vệ sinh và giữ nguyên vị mộc nguyên bản.",
    },
    {
      icon: Compass,
      title: "Thiết kế tinh xảo",
      desc: "Hộp quà contemporary dập nổi kim ngân, lót sợi đay và hoa khô ép tay đậm hồn Việt.",
    },
    {
      icon: Truck,
      title: "Giao hàng toàn quốc",
      desc: "Đóng gói 3 lớp chống sốc chuyên dụng, giao hỏa tốc 2h nội thành và 24h các tỉnh thành.",
    },
    {
      icon: HeartHandshake,
      title: "Tận tâm phục vụ",
      desc: "Hỗ trợ viết thiệp theo yêu cầu, đổi trả 100% nếu có bất kỳ lỗi vận chuyển nào.",
    },
  ];

  return (
    <section className="py-20 bg-[#FFFDF8] border-y border-forest-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-cream-50 transition-colors group"
              >
                <div className="w-14 h-14 rounded-2xl bg-forest-900 text-gold flex items-center justify-center mb-5 shadow-card group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-lg font-bold text-forest-900 mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs text-dark-muted leading-relaxed font-sans max-w-xs">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
