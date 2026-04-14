import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { retrySupabaseQuery } from "@/lib/supabase-retry";

export async function GET() {
  try {
    const { data, error } = await retrySupabaseQuery(() =>
      supabase
        .from("publications")
        .select("*")
        .order("created_at", { ascending: false })
    );

    if (error) {
      if (error.code === '42P01') {
        return NextResponse.json({ publications: [] });
      }
      throw error;
    }

    return NextResponse.json({ publications: data || [] });
  } catch (error) {
    console.error("Publications fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch publications", publications: [] },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, subtext, cover_image, link, tag, type, date, ref } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    // Use admin client to bypass RLS for admin operations
    const client = supabaseAdmin || supabase;
    
    const { data, error } = await retrySupabaseQuery(() =>
      client
        .from("publications")
        .insert([{ title, subtext, cover_image, link, tag, type, date, ref }])
        .select()
        .single()
    );

    if (error) throw error;

    return NextResponse.json({ publication: data });
  } catch (error: any) {
    console.error("Publication create error:", error);
    if (error.code === "42501") {
      return NextResponse.json(
        { error: "Permission denied. Please configure RLS policies or set SUPABASE_SERVICE_ROLE_KEY environment variable." },
        { status: 403 }
      );
    }
    if (error.code === '42P01') {
      return NextResponse.json(
        { error: "The 'publications' table does not exist in your database." },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create publication" },
      { status: 500 }
    );
  }
}
