"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  Building2,
  HelpCircle,
  ShieldCheck,
  Truck,
  ArrowRight,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    topic: "personal",
    quantity: "1",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const faqs = [
    {
      q: "Vùng Quê có nhận thiết kế hộp quà doanh nghiệp theo yêu cầu riêng không?",
      a: "Có! Chúng tôi hỗ trợ khắc laser logo thương hiệu lên hộp gỗ, hộp tre, in thiệp chúc mừng riêng và tùy chỉnh các món đặc sản theo ngân sách của doanh nghiệp với mức chiết khấu hấp dẫn lên đến 25%.",
    },
    {
      q: "Thời gian giao hàng mất bao lâu?",
      a: "Nội thành TP. HCM và Đà Lạt được giao hỏa tốc trong 24 giờ. Các tỉnh thành khác trên toàn quốc từ 2 - 3 ngày làm việc với quy trình đóng gói chống sốc và bảo quản kín khí.",
    },
    {
      q: "Tôi có thể tự chọn từng món nông sản vào hộp quà không?",
      a: "Hoàn toàn được! Bạn có thể sử dụng tính năng 'Tự tạo Box' trên website để chọn chất liệu vỏ hộp (hộp mộc, tre, gỗ) và gắp từng món ăn yêu thích theo ý muốn.",
    },
    {
      q: "Vùng Quê có xuất hóa đơn giá trị gia tăng (VAT) không?",
      a: "Có, Vùng Quê hỗ trợ xuất hóa đơn VAT điện tử đầy đủ và nhanh chóng cho tất cả các đơn hàng cá nhân và doanh nghiệp.",
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-cream min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Banner */}
        <div className="py-12 sm:py-16 text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-serif uppercase tracking-widest text-gold font-bold">
            LIÊN HỆ & TƯ VẤN QUÀ TẶNG
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-forest-900 leading-tight">
            Kết nối cùng người gìn giữ <br />
            <span className="italic font-normal text-terracotta">
              hương vị quê hương
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-dark-muted leading-relaxed max-w-2xl mx-auto">
            Dù bạn muốn trao gửi một hộp quà ấm lòng đến người thân phương xa
            hay đặt hàng trăm set quà tri ân đối tác doanh nghiệp, Vùng Quê luôn
            sẵn lòng lắng nghe và đồng hành.
          </p>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="rounded-3xl bg-[#FFFDF8] border border-forest-900/10 p-6 sm:p-8 shadow-subtle hover:shadow-card transition-all flex flex-col justify-between group">
            <div className="w-12 h-12 rounded-2xl bg-forest-50 text-forest-900 flex items-center justify-center mb-6 group-hover:bg-gold group-hover:text-forest-900 transition-colors">
              <Phone className="w-5 h-5 text-forest-700" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-serif tracking-widest text-gold font-bold block mb-1">
                TỔNG ĐÀI HỖ TRỢ
              </span>
              <h3 className="font-serif text-xl font-bold text-forest-900 mb-2">
                Hotline 24/7
              </h3>
              <p className="text-xs text-dark-muted leading-relaxed mb-4">
                Tư vấn chọn quà tặng, hỗ trợ vận chuyển hỏa tốc và giải đáp thắc
                mắc đơn hàng.
              </p>
            </div>
            <div className="pt-4 border-t border-forest-900/10 text-xs font-bold text-forest-900">
              <a
                href="tel:19008899"
                className="text-terracotta text-sm block hover:underline"
              >
                0123 456 789
              </a>
              <span className="text-[11px] text-dark-muted font-normal">
                0123 456 789 (Zalo B2B)
              </span>
            </div>
          </div>

          <div className="rounded-3xl bg-[#FFFDF8] border border-forest-900/10 p-6 sm:p-8 shadow-subtle hover:shadow-card transition-all flex flex-col justify-between group">
            <div className="w-12 h-12 rounded-2xl bg-forest-50 text-forest-900 flex items-center justify-center mb-6 group-hover:bg-gold group-hover:text-forest-900 transition-colors">
              <Mail className="w-5 h-5 text-forest-700" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-serif tracking-widest text-gold font-bold block mb-1">
                THƯ ĐIỆN TỬ
              </span>
              <h3 className="font-serif text-xl font-bold text-forest-900 mb-2">
                Hòm thư liên hệ
              </h3>
              <p className="text-xs text-dark-muted leading-relaxed mb-4">
                Gửi yêu cầu báo giá doanh nghiệp hoặc đề xuất hợp tác nông sản
                địa phương.
              </p>
            </div>
            <div className="pt-4 border-t border-forest-900/10 text-xs font-bold text-forest-900 space-y-0.5">
              <a
                href="mailto:lienhe@vungque.vn"
                className="text-forest-800 hover:text-gold block"
              >
                lienhe@vungque.vn
              </a>
              <a
                href="mailto:b2b@vungque.vn"
                className="text-gold block hover:underline"
              >
                b2b@vungque.vn (Doanh nghiệp)
              </a>
            </div>
          </div>

          <div className="rounded-3xl bg-[#FFFDF8] border border-forest-900/10 p-6 sm:p-8 shadow-subtle hover:shadow-card transition-all flex flex-col justify-between group">
            <div className="w-12 h-12 rounded-2xl bg-forest-50 text-forest-900 flex items-center justify-center mb-6 group-hover:bg-gold group-hover:text-forest-900 transition-colors">
              <MapPin className="w-5 h-5 text-forest-700" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-serif tracking-widest text-gold font-bold block mb-1">
                KHÔNG GIAN TRẢI NGHIỆM
              </span>
              <h3 className="font-serif text-xl font-bold text-forest-900 mb-2">
                Hệ thống Showroom
              </h3>
              <p className="text-xs text-dark-muted leading-relaxed mb-4">
                Ghé thăm để trực tiếp thưởng trà, nếm thử mứt sấy và xem mẫu hộp
                quà thực tế.
              </p>
            </div>
            <div className="pt-4 border-t border-forest-900/10 text-xs text-dark-muted space-y-1">
              <p className="font-semibold text-forest-900">
                • TP. HCM: <span className="font-normal">Quận 10, TP.HCM</span>
              </p>
            </div>
          </div>
        </div>

        {/* Main Grid: Consultation Form & B2B Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          {/* Form Section */}
          <div className="lg:col-span-7 bg-[#FFFDF8] rounded-3xl p-8 sm:p-12 border border-forest-900/10 shadow-subtle">
            <div className="mb-8">
              <span className="text-xs font-serif uppercase tracking-widest text-gold font-bold">
                GỬI YÊU CẦU TƯ VẤN
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900 mt-1">
                Để lại lời nhắn cho Vùng Quê
              </h2>
              <p className="text-xs text-dark-muted mt-2">
                Chúng tôi sẽ phản hồi lại bạn trong vòng 30 phút qua điện thoại
                hoặc email.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 px-6 rounded-2xl bg-forest-50 border border-forest-200 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-forest-900 text-gold flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-forest-900">
                  Gửi yêu cầu thành công!
                </h3>
                <p className="text-xs text-dark-muted max-w-md mx-auto leading-relaxed">
                  Cảm ơn <strong>{formData.fullName}</strong>. Chuyên viên tư
                  vấn quà tặng của Vùng Quê sẽ liên hệ lại với bạn qua số điện
                  thoại <strong>{formData.phone}</strong> sớm nhất.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: "",
                        phone: "",
                        email: "",
                        topic: "personal",
                        quantity: "1",
                        message: "",
                      });
                    }}
                    className="py-2.5 px-6 rounded-xl border border-forest-900/20 text-xs font-bold text-forest-900 hover:bg-forest-900 hover:text-warmWhite transition-all"
                  >
                    Gửi yêu cầu khác
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-forest-900 mb-1.5">
                      Họ và tên của bạn *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white border border-forest-900/15 text-xs text-dark placeholder:text-dark-muted/40 focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-forest-900 mb-1.5">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0912 345 678"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white border border-forest-900/15 text-xs text-dark placeholder:text-dark-muted/40 focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-forest-900 mb-1.5">
                      Địa chỉ email
                    </label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white border border-forest-900/15 text-xs text-dark placeholder:text-dark-muted/40 focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-forest-900 mb-1.5">
                      Chủ đề cần tư vấn
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(e) =>
                        setFormData({ ...formData, topic: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white border border-forest-900/15 text-xs text-dark focus:outline-none focus:border-gold transition-colors"
                    >
                      <option value="personal">
                        Đặt quà cá nhân / gia đình
                      </option>
                      <option value="b2b">
                        Quà tặng Doanh nghiệp / Sự kiện
                      </option>
                      <option value="custom">Tùy biến Box theo yêu cầu</option>
                      <option value="partner">Hợp tác cung cấp nông sản</option>
                      <option value="support">Hỗ trợ sau bán hàng</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-forest-900 mb-1.5">
                    Số lượng dự kiến (hộp)
                  </label>
                  <input
                    type="text"
                    placeholder="Ví dụ: 1 - 5 hộp hoặc 50 - 200 hộp cho công ty"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white border border-forest-900/15 text-xs text-dark placeholder:text-dark-muted/40 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-forest-900 mb-1.5">
                    Nội dung yêu cầu / Lời nhắn
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Mô tả ngân sách mong muốn, thời gian cần nhận quà hoặc yêu cầu in ấn logo riêng..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white border border-forest-900/15 text-xs text-dark placeholder:text-dark-muted/40 focus:outline-none focus:border-gold transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-2xl bg-forest-900 hover:bg-forest-800 text-warmWhite font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-98 flex items-center justify-center space-x-2 disabled:opacity-70"
                >
                  {loading ? (
                    <span>Đang gửi thông tin...</span>
                  ) : (
                    <>
                      <span>Gửi yêu cầu tư vấn</span>
                      <Send className="w-3.5 h-3.5 text-gold" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: B2B & Workshop Services */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-forest-900 text-warmWhite p-8 sm:p-10 border border-gold/30 shadow-card flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <span className="text-[10px] font-serif uppercase tracking-widest text-gold font-bold bg-white/10 px-3 py-1 rounded-full border border-white/10 inline-block">
                  DỊCH VỤ DOANH NGHIỆP
                </span>

                <h3 className="font-serif text-2xl font-bold text-warmWhite">
                  Quà tặng Doanh Nghiệp & Hội nghị độc bản
                </h3>

                <p className="text-xs text-warmWhite/80 leading-relaxed">
                  Vùng Quê tự hào là đối tác quà tặng của hơn 250 doanh nghiệp
                  và tổ chức lớn. Mỗi chiếc hộp quà được chăm chút tỉ mỉ mang
                  trọn tâm ý và đẳng cấp thương hiệu của bạn.
                </p>

                <div className="space-y-3 pt-3">
                  <div className="flex items-start space-x-3 text-xs text-warmWhite/90">
                    <Sparkles className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                    <span>
                      Khắc laser logo doanh nghiệp lên chất liệu gỗ, tre tự
                      nhiên
                    </span>
                  </div>
                  <div className="flex items-start space-x-3 text-xs text-warmWhite/90">
                    <Building2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                    <span>
                      Chiết khấu linh hoạt từ 15% - 25% theo số lượng đơn hàng
                    </span>
                  </div>
                  <div className="flex items-start space-x-3 text-xs text-warmWhite/90">
                    <Truck className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                    <span>
                      Giao hàng tận tay từng đối tác theo danh bạ riêng trên
                      toàn quốc
                    </span>
                  </div>
                  <div className="flex items-start space-x-3 text-xs text-warmWhite/90">
                    <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                    <span>
                      Cung cấp hóa đơn VAT đầy đủ, hợp đồng kinh tế minh bạch
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/15 relative z-10">
                <Link
                  href="/build-your-box"
                  className="w-full py-3.5 px-4 rounded-xl bg-gold text-forest-900 font-bold text-xs uppercase tracking-wider hover:bg-gold-400 transition-colors flex items-center justify-center space-x-2 shadow-gold"
                >
                  <span>Thử nghiệm Tự Tạo Box Quà</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Working Hours Card */}
            <div className="rounded-3xl bg-[#FFFDF8] border border-forest-900/10 p-6 shadow-subtle flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-cream-100 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-forest-700" />
              </div>
              <div className="text-xs">
                <h4 className="font-bold text-forest-900">
                  Giờ phục vụ khách hàng
                </h4>
                <p className="text-dark-muted mt-0.5">
                  Thứ 2 — Chủ Nhật: <strong>08:30 — 21:00</strong>
                </p>
                <p className="text-forest-600 font-medium mt-0.5">
                  ✦ Hệ thống đặt hàng trực tuyến hoạt động 24/7
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="max-w-4xl mx-auto my-16">
          <div className="text-center mb-10">
            <span className="text-xs font-serif uppercase tracking-widest text-gold font-bold">
              CÂU HỎI THƯỜNG GẶP
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900 mt-1">
              Bạn có câu hỏi cho Vùng Quê?
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl bg-[#FFFDF8] border border-forest-900/10 p-6 shadow-subtle"
              >
                <h4 className="font-serif font-bold text-sm sm:text-base text-forest-900 flex items-start space-x-3">
                  <HelpCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs sm:text-sm text-dark-muted mt-2.5 ml-8 leading-relaxed font-sans">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
