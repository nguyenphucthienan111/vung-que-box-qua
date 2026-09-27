import React from "react";
import { ARTICLES } from "@/data/articles";
import { BlogListClient } from "@/components/blog/BlogListClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tạp Chí & Ký Sự Ẩm Thực | Vùng Quê",
  description:
    "Cẩm nang thưởng thức đặc sản, câu chuyện làng nghề và nghệ thuật biếu tặng tinh tế của người Việt.",
};

export default function BlogPage() {
  return <BlogListClient articles={ARTICLES} />;
}
