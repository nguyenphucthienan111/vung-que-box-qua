import { MetadataRoute } from "next";
import { PRODUCTS, REGIONS } from "@/data/products";
import { ARTICLES } from "@/data/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://vungque.vn";

  const staticPages = [
    "",
    "/shop",
    "/regions",
    "/build-your-box",
    "/about",
    "/blog",
    "/cart",
    "/checkout",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const productPages = PRODUCTS.map((prod) => ({
    url: `${baseUrl}/products/${prod.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const regionPages = REGIONS.map((reg) => ({
    url: `${baseUrl}/regions/${reg.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogPages = ARTICLES.map((art) => ({
    url: `${baseUrl}/blog/${art.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...regionPages, ...blogPages];
}
