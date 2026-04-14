import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { retrySupabaseQuery } from "@/lib/supabase-retry";

export async function GET() {
  try {
    const { data, error } = await retrySupabaseQuery(() =>
      supabase
        .from("blog_posts")
        .select(
          `
          *,
          blog_categories(name),
          blog_authors(name)
        `
        )
        .order("created_at", { ascending: false })
    );

    if (error) throw error;

    return NextResponse.json({ posts: data || [] });
  } catch (error) {
    console.error("Blog posts fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts", posts: [] },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      content,
      featured_image,
      category_id,
      author_id,
      read_time_minutes,
      is_featured,
      is_published,
      is_draft,
      published_at,
      meta_title,
      meta_description,
      canonical_url,
    } = body;

    if (!title || !slug || !excerpt || !content) {
      return NextResponse.json(
        { error: "Title, slug, excerpt, and content are required" },
        { status: 400 }
      );
    }

    // Use admin client to bypass RLS for admin operations
    const client = supabaseAdmin || supabase;
    
    const { data, error } = await retrySupabaseQuery(() =>
      client
        .from("blog_posts")
        .insert([
          {
            title,
            slug,
            excerpt,
            content,
            featured_image,
            category_id: category_id || null,
            author_id: author_id || null,
            read_time_minutes: read_time_minutes || 5,
            is_featured: is_featured || false,
            is_published: is_published || false,
            is_draft: is_draft ?? true,
            published_at: published_at || null,
            meta_title: meta_title || null,
            meta_description: meta_description || null,
            canonical_url: canonical_url || null,
          },
        ])
        .select()
        .single()
    );

    if (error) throw error;

    return NextResponse.json({ post: data });
  } catch (error: any) {
    console.error("Blog post create error:", error);
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "Post with this slug already exists" },
        { status: 409 }
      );
    }
    if (error.code === "42501") {
      return NextResponse.json(
        { error: "Permission denied. Please configure RLS policies or set SUPABASE_SERVICE_ROLE_KEY environment variable." },
        { status: 403 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
