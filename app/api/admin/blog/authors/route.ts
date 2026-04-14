import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { retrySupabaseQuery } from "@/lib/supabase-retry";

export async function GET() {
  try {
    const { data, error } = await retrySupabaseQuery(() =>
      supabase
        .from("blog_authors")
        .select("*")
        .order("name", { ascending: true })
    );

    if (error) throw error;

    return NextResponse.json({ authors: data || [] });
  } catch (error) {
    console.error("Authors fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch authors", authors: [] },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, bio, avatar_url, social_links } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Use admin client to bypass RLS for admin operations
    const client = supabaseAdmin || supabase;
    
    const { data, error } = await retrySupabaseQuery(() =>
      client
        .from("blog_authors")
        .insert([{ name, email, bio, avatar_url, social_links }])
        .select()
        .single()
    );

    if (error) throw error;

    return NextResponse.json({ author: data });
  } catch (error: any) {
    console.error("Author create error:", error);
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "Author with this email already exists" },
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
      { error: "Failed to create author" },
      { status: 500 }
    );
  }
}

