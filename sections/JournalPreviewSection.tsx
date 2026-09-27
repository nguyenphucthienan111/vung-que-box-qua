"use client";

import React from "react";
import Link from "next/link";
import { ARTICLES } from "@/data/articles";
import { ArrowRight, BookOpen, Clock } from "lucide-react";

export function JournalPreviewSection() {
  const topArticles = ARTICLES.slice(0, 3);

  return (
    <section className="py-24 bg-[#FFFDF8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-forest-900/5 text-xs font-serif uppercase tracking-widest text-forest-900 mb-2">
              <BookOpen className="w-3.5 h-3.5 text-gold" />
              <span>Góc Ký Sự Ẩm Thực</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-900 tracking-tight">
              Câu chuyện từ vùng đất
            </h2>
          </div>
          <Link
            href="/blog"
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-forest-900 hover:text-gold transition-colors"
          >
            <span>Tất cả bài viết</span>
            <ArrowRight className="w-4 h-4 text-gold" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topArticles.map((article) => (
            <article
              key={article.id}
              className="rounded-2xl bg-cream-50 p-6 border border-forest-900/10 hover:border-gold/40 shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-dark-muted mb-3">
                  <span className="font-bold text-terracotta uppercase tracking-wider">
                    {article.category}
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-dark-muted" />
                    <span>{article.readTime}</span>
                  </span>
                </div>

                <Link href={`/blog/${article.slug}`}>
                  <h3 className="font-serif text-xl font-bold text-forest-900 group-hover:text-gold transition-colors leading-snug">
                    {article.title}
                  </h3>
                </Link>

                <p className="mt-3 text-xs text-dark-muted leading-relaxed font-sans line-clamp-3">
                  {article.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-forest-900/10 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-forest-900 block">
                    {article.author}
                  </span>
                  <span className="text-[10px] text-dark-muted">
                    {article.authorRole}
                  </span>
                </div>

                <Link
                  href={`/blog/${article.slug}`}
                  className="w-8 h-8 rounded-full bg-forest-900 text-warmWhite group-hover:bg-gold group-hover:text-forest-900 flex items-center justify-center transition-colors"
                  aria-label="Đọc bài viết"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
