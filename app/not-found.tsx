import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="pt-32 pb-24 text-center bg-cream min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto p-8 rounded-3xl bg-[#FFFDF8] border border-forest-900/10 shadow-subtle space-y-4">
        <div className="w-16 h-16 rounded-full bg-cream-100 text-forest-900 mx-auto flex items-center justify-center">
          <Compass className="w-8 h-8 text-gold" />
        </div>
        <span className="text-xs font-serif uppercase tracking-widest text-gold font-bold">
          404 • KHÔNG TÌM THẤY TRANG
        </span>
        <h1 className="font-serif text-3xl font-bold text-forest-900">
          Lạc lối giữa non sông
        </h1>
        <p className="text-xs text-dark-muted">
          Trang bạn tìm kiếm không tồn tại hoặc đã được chuyển sang một địa chỉ mới.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-forest-900 text-warmWhite text-xs font-bold uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4 text-gold" />
            <span>Quay về trang chủ</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
