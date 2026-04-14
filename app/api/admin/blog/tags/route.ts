import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { retrySupabaseQuery } from "@/lib/supabase-retry";

export async function GET() {
  try {
    const { data, error } = await retrySupabaseQuery(() =>
      supabase
        .from("blog_tags")
        .select("*")
        .order("name", { ascending: true })
    );

    if (error) throw error;

    return NextResponse.json({ tags: data || [] });
  } catch (error) {
    console.error("Tags fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch tags", tags: [] },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { error: "Name and slug are required" },
        { status: 400 }
      );
    }

    // Use admin client to bypass RLS for admin operations
    const client = supabaseAdmin || supabase;
    
    const { data, error } = await retrySupabaseQuery(() =>
      client
        .from("blog_tags")
        .insert([{ name, slug }])
        .select()
        .single()
    );

    if (error) throw error;

    return NextResponse.json({ tag: data });
  } catch (error: any) {
    console.error("Tag create error:", error);
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "Tag with this name or slug already exists" },
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
      { error: "Failed to create tag" },
      { status: 500 }
    );
  }
}

