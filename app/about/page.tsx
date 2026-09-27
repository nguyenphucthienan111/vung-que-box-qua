import React from "react";
import Link from "next/link";
import { Sparkles, Heart, Compass, ShieldCheck, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Banner */}
        <div className="py-12 sm:py-16 text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-serif uppercase tracking-widest text-gold font-bold">
            CÂU CHUYỆN VÙNG QUÊ
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-forest-900 leading-tight">
            Khơi dậy niềm tự hào <br />
            <span className="italic font-normal text-terracotta">nông sản Việt Nam</span>
          </h1>
          <p className="text-xs sm:text-sm text-dark-muted leading-relaxed font-sans">
            Vùng Quê ra đời từ mong ước giản dị: mang những thức quà mộc mạc, thấm đượm linh hồn non sông đến tay người nhận với vẻ đẹp trang nhã và chỉn chu nhất.
          </p>
        </div>

        {/* Story Section 1: The Origin */}
        <div className="my-10 rounded-3xl bg-[#FFFDF8] border border-forest-900/10 p-8 sm:p-14 shadow-subtle grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs font-serif uppercase tracking-widest text-gold font-bold">
              KHỞI NGUỒN Ý TƯỞNG
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900">
              Tại sao lại là những chiếc box quà?
            </h2>
            <p className="text-xs sm:text-sm text-dark-muted leading-relaxed font-sans">
              Người Việt Nam có nền văn hóa ẩm thực nông nghiệp trù phú bậc nhất thế giới. Mỗi quả hồng treo gió Đơn Dương, mỗi búp chè Shan Tuyết cổ thụ hay bánh tráng phơi sương Trảng Bàng đều mang trong mình một câu chuyện đời người, tình đất, tình làng.
            </p>
            <p className="text-xs sm:text-sm text-dark-muted leading-relaxed font-sans">
              Thế nhưng, từ trước đến nay, đặc sản quê thường chỉ xuất hiện trong những bao bì nhựa đơn điệu, khó có thể đặt lên bàn tiệc sang trọng hay biếu tặng đối tác. Chúng tôi muốn thay đổi điều đó: biến thức quà quê thành tác phẩm nghệ thuật quà tặng đương đại.
            </p>
          </div>

          <div className="rounded-2xl bg-forest-900 text-warmWhite p-8 sm:p-10 border border-gold/30 shadow-card flex flex-col justify-between min-h-[300px]">
            <span className="text-xs font-serif uppercase tracking-widest text-gold font-bold">
              TRIẾT LÝ SẢN PHẨM
            </span>
            <blockquote className="font-serif text-xl sm:text-2xl italic leading-relaxed text-warmWhite my-4">
              &ldquo;Một món quà chân thật có sức mạnh xoa dịu tâm hồn và kết nối những khoảng cách xa xôi nhất.&rdquo;
            </blockquote>
            <div className="pt-4 border-t border-white/10 text-xs text-warmWhite/80">
              <span className="font-bold text-gold block">Đội ngũ sáng lập Vùng Quê</span>
              <span>Đà Lạt & TP. Hồ Chí Minh</span>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Excellence */}
        <div className="my-16">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900">
              4 Cam kết cốt lõi từ Vùng Quê
            </h2>
            <p className="text-xs text-dark-muted mt-2">
              Những nguyên tắc bất di bất dịch trong từng chiếc hộp xuất xưởng.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#FFFDF8] border border-forest-900/10 shadow-subtle">
              <span className="font-serif text-2xl font-bold text-gold block mb-2">01</span>
              <h3 className="font-serif font-bold text-base text-forest-900 mb-1">
                Nguồn gốc minh bạch
              </h3>
              <p className="text-xs text-dark-muted leading-relaxed">
                Hợp tác trực tiếp với các HTX nông sản sạch, đảm bảo không qua trung gian ép giá người nông dân.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFDF8] border border-forest-900/10 shadow-subtle">
              <span className="font-serif text-2xl font-bold text-gold block mb-2">02</span>
              <h3 className="font-serif font-bold text-base text-forest-900 mb-1">
                Thuần tự nhiên 100%
              </h3>
              <p className="text-xs text-dark-muted leading-relaxed">
                Cam kết không chất bảo quản công nghiệp độc hại, giữ vị ngọt và hương thơm mộc nguyên bản.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFDF8] border border-forest-900/10 shadow-subtle">
              <span className="font-serif text-2xl font-bold text-gold block mb-2">03</span>
              <h3 className="font-serif font-bold text-base text-forest-900 mb-1">
                Thủ công tinh xảo
              </h3>
              <p className="text-xs text-dark-muted leading-relaxed">
                Chất liệu giấy dó, gỗ thông và mây tre đan tay tái sử dụng, thân thiện với môi trường tự nhiên.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFDF8] border border-forest-900/10 shadow-subtle">
              <span className="font-serif text-2xl font-bold text-gold block mb-2">04</span>
              <h3 className="font-serif font-bold text-base text-forest-900 mb-1">
                Thiệp tay chân thành
              </h3>
              <p className="text-xs text-dark-muted leading-relaxed">
                Mỗi hộp quà đều được nắn nót viết tay từng dòng thư chúc gửi theo mong muốn của khách hàng.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-3xl bg-forest-900 text-warmWhite p-8 sm:p-14 text-center border border-gold/30 shadow-floating space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">
            Sẵn sàng mở hộp quà đầu tiên?
          </h2>
          <p className="text-xs sm:text-sm text-warmWhite/80 max-w-md mx-auto leading-relaxed">
            Hãy để Vùng Quê đồng hành cùng bạn gửi trao yêu thương tới gia đình, bạn bè và đối tác.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/shop"
              className="px-6 py-3.5 rounded-xl bg-gold text-forest-900 font-bold text-xs uppercase tracking-wider hover:bg-gold-400 transition-colors shadow-gold"
            >
              Khám phá các box quà
            </Link>
            <Link
              href="/build-your-box"
              className="px-6 py-3.5 rounded-xl border border-white/20 text-warmWhite text-xs font-semibold hover:bg-white/10 transition-colors"
            >
              Tự tạo chiếc box riêng
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
