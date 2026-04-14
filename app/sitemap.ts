import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const updatedAt = new Date().toISOString();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: updatedAt,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: updatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: updatedAt,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/developers"),
      lastModified: updatedAt,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select("slug, updated_at, published_at")
      .eq("is_published", true)
      .lte("published_at", new Date().toISOString());

    if (error) {
      console.error("sitemap blog fetch error", error.message);
    } else if (posts) {
      blogRoutes = posts.map((post) => ({
        url: absoluteUrl(`/blog/${post.slug}`),
        lastModified: post.updated_at || post.published_at || updatedAt,
        changeFrequency: "monthly",
        priority: 0.6,
      }));
    }
  } catch (error) {
    console.error("sitemap blog fetch exception", error);
  }

  return [...staticRoutes, ...blogRoutes];
}
