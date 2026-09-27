import React from "react";
import { notFound, redirect } from "next/navigation";
import { PRODUCTS, getProductBySlug, getRelatedProducts } from "@/data/products";
import { ProductDetailClient } from "@/components/product/ProductDetailClient";
import type { Metadata } from "next";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const rawSlug = decodeURIComponent(params.slug || "");
  const normalizedSlug = rawSlug.toLowerCase().trim().replace(/\s+/g, "-");
  const product = getProductBySlug(params.slug) || getProductBySlug(normalizedSlug);
  if (!product) return {};

  return {
    title: `${product.name} | Vùng Quê Box Quà`,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [product.heroImage],
    },
  };
}

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const rawSlug = decodeURIComponent(params.slug || "");
  const normalizedSlug = rawSlug.toLowerCase().trim().replace(/\s+/g, "-");

  let product = getProductBySlug(params.slug);
  if (!product && normalizedSlug !== params.slug) {
    product = getProductBySlug(normalizedSlug);
    if (product) {
      redirect(`/products/${product.slug}`);
    }
  }

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product.slug, 3);

  return <ProductDetailClient product={product} related={related} />;
}
