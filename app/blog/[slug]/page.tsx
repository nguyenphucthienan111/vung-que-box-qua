import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES } from "@/data/articles";
import { Clock, ArrowLeft, Share2 } from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const article = ARTICLES.find((a) => a.slug === params.slug);
  if (!article) return {};

  return {
    title: `${article.title} | Vùng Quê Journal`,
    description: article.summary,
  };
}

export default function SingleArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = ARTICLES.find((a) => a.slug === params.slug);
  if (!article) {
    notFound();
  }

  const related = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <div className="pt-24 pb-20 bg-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center space-x-1.5 text-xs text-dark-muted hover:text-forest-900 py-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Quay lại tất cả bài viết</span>
        </Link>

        {/* Article Header */}
        <header className="py-6 border-b border-forest-900/10 space-y-4">
          <div className="flex items-center space-x-2 text-xs">
            <span className="font-bold text-terracotta uppercase tracking-wider">
              {article.category}
            </span>
            <span className="text-dark-muted">•</span>
            <span className="flex items-center space-x-1 text-dark-muted">
              <Clock className="w-3 h-3" />
              <span>{article.readTime}</span>
            </span>
            <span className="text-dark-muted">•</span>
            <span className="text-dark-muted">{article.date}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest-900 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="font-bold text-sm text-forest-900 block">
                {article.author}
              </span>
              <span className="text-xs text-dark-muted">
                {article.authorRole}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                className="p-2 rounded-full border border-forest-900/15 hover:bg-forest-50 text-dark-muted"
                aria-label="Chia sẻ bài viết"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Article Summary Lead */}
        <div className="my-8 p-6 rounded-2xl bg-cream-100 border-l-4 border-gold text-sm sm:text-base italic text-forest-900 leading-relaxed font-serif">
          {article.summary}
        </div>

        {/* Article Body Content */}
        <div className="space-y-8 text-sm sm:text-base text-dark leading-relaxed font-sans pb-12 border-b border-forest-900/10">
          {article.content.map((sec, idx) => (
            <section key={idx} className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-forest-900">
                {sec.heading}
              </h2>
              <p className="text-dark/85 leading-relaxed">{sec.paragraph}</p>
            </section>
          ))}
        </div>

        {/* Article Tags */}
        <div className="py-6 flex flex-wrap gap-2">
          {article.tags.map((t, i) => (
            <span
              key={i}
              className="text-xs px-3 py-1 rounded-full bg-cream-100 text-dark font-medium border border-forest-900/5"
            >
              #{t}
            </span>
          ))}
        </div>

        {/* Related Articles */}
        <div className="mt-12">
          <h3 className="font-serif text-2xl font-bold text-forest-900 mb-6">
            Bài viết liên quan
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {related.map((rel) => (
              <Link
                key={rel.id}
                href={`/blog/${rel.slug}`}
                className="p-5 rounded-2xl bg-[#FFFDF8] border border-forest-900/10 hover:border-gold/40 shadow-subtle hover:shadow-card transition-all group"
              >
                <span className="text-[10px] font-bold text-terracotta uppercase">
                  {rel.category}
                </span>
                <h4 className="font-serif font-bold text-base text-forest-900 group-hover:text-gold transition-colors mt-1">
                  {rel.title}
                </h4>
                <p className="text-xs text-dark-muted mt-2 line-clamp-2">
                  {rel.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
