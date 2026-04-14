// app/api/blog/posts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const limit = parseInt(searchParams.get("limit") || "12");
    const offset = parseInt(searchParams.get("offset") || "0");

    let query = supabase
      .from("blog_posts")
      .select(
        `
        *,
        blog_categories(name, slug),
        blog_authors(name, avatar_url, social_links),
        blog_post_tags(blog_tags(name))
      `
      )
      .eq("is_published", true)
      .lte("published_at", new Date().toISOString())
      .order("published_at", { ascending: false });

    // Apply category filter
    if (category && category !== "all") {
      // First, get the category ID from the slug
      const { data: categoryData } = await supabase
        .from("blog_categories")
        .select("id")
        .eq("slug", category)
        .single();
      
      if (categoryData) {
        query = query.eq("category_id", categoryData.id);
      }
    }

    // Apply search filter
    if (search) {
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    const { data: posts, error, count } = await query;

    if (error) throw error;

    // Transform the data to match our frontend format
    const transformedPosts =
      posts?.map((post) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        image: post.featured_image,
        category: post.blog_categories?.slug || 'uncategorized',
        tags: post.blog_post_tags?.map((pt: { blog_tags: { name: string } | null }) => pt.blog_tags?.name).filter(Boolean) || [],
        author: post.blog_authors?.name || 'Anonymous',
        date: post.published_at,
        readTime: `${post.read_time_minutes} min read`,
        featured: post.is_featured,
      })) || [];

    return NextResponse.json({
      posts: transformedPosts,
      totalCount: count,
    });
  } catch (error) {
    console.error("Blog posts fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

// Get featured posts
export async function GETFeatured(request: NextRequest) {
  try {
    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select(
        `
        *,
        blog_categories(name, slug),
        blog_authors(name, avatar_url, social_links),
        blog_post_tags(blog_tags(name))
      `
      )
      .eq("is_published", true)
      .eq("is_featured", true)
      .lte("published_at", new Date().toISOString())
      .order("published_at", { ascending: false })
      .limit(2);

    if (error) throw error;

    const transformedPosts =
      posts?.map((post) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        image: post.featured_image,
        category: post.blog_categories?.slug || 'uncategorized',
        tags: post.blog_post_tags?.map((pt: { blog_tags: { name: string } | null }) => pt.blog_tags?.name).filter(Boolean) || [],
        author: post.blog_authors?.name || 'Anonymous',
        date: post.published_at,
        readTime: `${post.read_time_minutes} min read`,
        featured: post.is_featured,
      })) || [];

    return NextResponse.json({ posts: transformedPosts });
  } catch (error) {
    console.error("Featured posts fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch featured posts" },
      { status: 500 }
    );
  }
}
