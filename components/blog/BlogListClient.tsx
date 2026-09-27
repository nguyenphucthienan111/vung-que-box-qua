"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Article } from "@/data/articles";
import { Clock, ArrowRight, Search } from "lucide-react";

interface BlogListClientProps {
  articles: Article[];
}

export function BlogListClient({ articles }: BlogListClientProps) {
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [search, setSearch] = useState("");

  const allTags = ["all", "Đà Lạt", "Tây Ninh", "Quà quê", "Quà Tết", "Văn hóa Việt"];

  const filtered = articles.filter((art) => {
    if (selectedTag !== "all" && !art.tags.includes(selectedTag)) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchTitle = art.title.toLowerCase().includes(q);
      const matchSum = art.summary.toLowerCase().includes(q);
      if (!matchTitle && !matchSum) return false;
    }
    return true;
  });

  return (
    <div className="pt-24 pb-20 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 border-b border-forest-900/10">
          <span className="text-xs font-serif uppercase tracking-widest text-gold font-bold">
            GÓC KÝ SỰ & BẢN TIN
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest-900 mt-1">
            Chuyện của những vùng đất
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-dark-muted max-w-2xl">
            Cẩm nang thưởng thức đặc sản, câu chuyện làng nghề và nghệ thuật biếu tặng tinh tế của người Việt.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedTag === tag
                    ? "bg-forest-900 text-warmWhite"
                    : "bg-[#FFFDF8] text-dark hover:bg-forest-50 border border-forest-900/10"
                }`}
              >
                {tag === "all" ? "Tất cả bài viết" : tag}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Tìm bài viết..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs px-3.5 py-2 pl-8 rounded-xl border border-forest-900/15 bg-[#FFFDF8] focus:outline-none focus:border-gold"
            />
            <Search className="w-3.5 h-3.5 text-dark-muted absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          {filtered.map((article) => (
            <article
              key={article.id}
              className="rounded-3xl bg-[#FFFDF8] border border-forest-900/10 hover:border-gold/40 shadow-subtle hover:shadow-card transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-dark-muted mb-3">
                  <span className="font-bold text-terracotta uppercase tracking-wider text-[11px]">
                    {article.category}
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-dark-muted" />
                    <span>{article.readTime}</span>
                  </span>
                </div>

                <Link href={`/blog/${article.slug}`}>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-forest-900 group-hover:text-gold transition-colors leading-snug">
                    {article.title}
                  </h2>
                </Link>

                <p className="mt-3 text-xs text-dark-muted leading-relaxed font-sans line-clamp-3">
                  {article.summary}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {article.tags.map((t, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded bg-cream-100 text-dark-muted"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-forest-900/10 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-forest-900 block">
                    {article.author}
                  </span>
                  <span className="text-[10px] text-dark-muted">
                    {article.date}
                  </span>
                </div>

                <Link
                  href={`/blog/${article.slug}`}
                  className="w-8 h-8 rounded-full bg-forest-900 text-warmWhite group-hover:bg-gold group-hover:text-forest-900 flex items-center justify-center transition-colors"
                  aria-label="Xem bài viết"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
