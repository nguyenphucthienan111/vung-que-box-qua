"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Leaf, ShieldCheck, HeartHandshake, Sparkles } from "lucide-react";

export function BrandStorySection() {
  const timeline = [
    {
      step: "01",
      title: "Nguồn nguyên liệu tự nhiên",
      desc: "Trực tiếp lặn lội tới từng triền đồi Cầu Đất, vườn tiêu Phú Quốc, lò bánh tráng Tây Ninh để gặp gỡ các nghệ nhân làm nông chân chính.",
    },
    {
      step: "02",
      title: "Tuyển chọn khắt khe",
      desc: "Mỗi mẻ sản vật phải đạt tiêu chuẩn an toàn, nói không với chất phụ gia công nghiệp độc hại và giữ nguyên dưỡng chất.",
    },
    {
      step: "03",
      title: "Đóng gói thủ công tinh xảo",
      desc: "Hộp quà được phối màu contemporary, lót giấy rơm mộc, đính hoa khô ép tay và buộc ruy băng lụa dập nổi kim ngân.",
    },
    {
      step: "04",
      title: "Trao gửi trọn vẹn yêu thương",
      desc: "Giao tận tay người nhận kèm lời chúc viết tay, để giây phút mở hộp trở thành một kỷ niệm ấm áp khó quên.",
    },
  ];

  return (
    <section className="py-24 bg-cream-100 relative overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story Statement */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-serif uppercase tracking-widest text-gold font-bold">
              VÌ SAO CHỌN VÙNG QUÊ?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-900 leading-tight">
              Không chỉ là quà tặng, <br />
              <span className="italic font-normal text-terracotta">mà là cả một hành trình.</span>
            </h2>
            <p className="text-xs sm:text-sm text-dark-muted leading-relaxed font-sans">
              Chúng tôi tin rằng quà quê không đơn thuần là thức ăn vặt lót dạ. Đằng sau mỗi miếng hồng sấy dẻo, mỗi ấm trà Shan Tuyết hay hũ muối tôm rang củi là cả giọt mồ hôi, là văn hóa, thổ nhưỡng và tâm huyết ngàn đời của người nông dân Việt.
            </p>
            <p className="text-xs sm:text-sm text-dark-muted leading-relaxed font-sans">
              Sứ mệnh của Vùng Quê là khoác lên nông sản Việt một tấm áo mới: sang trọng, chỉn chu và đầy cảm xúc, để người tặng tự hào trao gửi và người nhận mỉm cười trân quý.
            </p>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-forest-900 hover:text-gold transition-colors"
              >
                <span>Đọc toàn bộ câu chuyện thương hiệu</span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </Link>
            </div>
          </div>

          {/* Right Column: Timeline Steps */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {timeline.map((item) => (
              <div
                key={item.step}
                className="p-6 rounded-2xl bg-white border border-forest-900/10 shadow-subtle hover:border-gold/40 hover:shadow-card transition-all"
              >
                <span className="font-serif text-2xl font-bold text-gold block mb-2">
                  {item.step}
                </span>
                <h3 className="font-serif text-lg font-bold text-forest-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-dark-muted leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
