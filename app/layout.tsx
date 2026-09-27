import type { Metadata } from "next";
import { Playfair_Display, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cartContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { FloatingContact } from "@/components/common/FloatingContact";

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
  display: "swap",
});

const beVietnam = Be_Vietnam_Pro({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-be-vietnam",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vungque.vn"),
  title: "Vùng Quê | Box Quà Đặc Sản Việt Nam — Unbox Vietnam",
  description:
    "Khám phá những box quà đặc sản Việt Nam được tuyển chọn từ Đà Lạt, Tây Ninh, Tây Bắc, Huế, miền Tây và Phú Quốc. Tinh hoa ẩm thực kết hợp thiết kế quà tặng đương đại.",
  keywords: [
    "Vùng Quê",
    "box quà đặc sản",
    "quà tặng Việt Nam",
    "bánh tráng Tây Ninh",
    "hồng sấy Đà Lạt",
    "thịt trâu gác bếp",
    "quà Tết cao cấp",
    "unbox vietnam",
  ],
  authors: [{ name: "Vùng Quê" }],
  openGraph: {
    title: "Vùng Quê | Gửi Trọn Hương Vị Việt",
    description:
      "Mỗi hộp quà là một câu chuyện về vùng đất, con người và những hương vị đáng nhớ.",
    url: "https://vungque.vn",
    siteName: "Vùng Quê Box Quà",
    locale: "vi_VN",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=2" },
      { url: "/favicon-32x32.png?v=2", sizes: "32x32", type: "image/png" },
      { url: "/icon.png?v=2", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: [{ url: "/apple-icon.png?v=2", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${playfair.variable} ${beVietnam.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=2" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon.png?v=2" />
        <link rel="apple-touch-icon" href="/apple-icon.png?v=2" />
      </head>
      <body className="min-h-screen flex flex-col bg-cream text-dark antialiased selection:bg-gold selection:text-forest-900">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <CartDrawer />
          <FloatingContact />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
