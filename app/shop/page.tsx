import React from "react";
import { PRODUCTS, REGIONS } from "@/data/products";
import { ShopListClient } from "@/components/shop/ShopListClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cửa Hàng Box Quà Đặc Sản Việt Nam | Vùng Quê",
  description:
    "Tuyển chọn những hộp quà đặc sản tinh hoa từ Đà Lạt, Tây Ninh, Tây Bắc, Huế, miền Tây và Phú Quốc.",
};

export default function ShopPage() {
  return <ShopListClient products={PRODUCTS} regions={REGIONS} />;
}
