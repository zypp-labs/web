import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { retrySupabaseQuery } from "@/lib/supabase-retry";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Use admin client to bypass RLS for admin operations
    const client = supabaseAdmin || supabase;

    const { data, error } = await retrySupabaseQuery(() =>
      client
        .from("blog_categories")
        .update(body)
        .eq("id", id)
        .select()
        .single()
    );

    if (error) throw error;

    return NextResponse.json({ category: data });
  } catch (error: any) {
    console.error("Category update error:", error);
    if (error.code === "42501") {
      return NextResponse.json(
        { error: "Permission denied. Please configure RLS policies or set SUPABASE_SERVICE_ROLE_KEY environment variable." },
        { status: 403 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Use admin client to bypass RLS for admin operations
    const client = supabaseAdmin || supabase;

    const { error } = await retrySupabaseQuery(() =>
      client
        .from("blog_categories")
        .delete()
        .eq("id", id)
    );

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Category delete error:", error);
    if (error.code === "42501") {
      return NextResponse.json(
        { error: "Permission denied. Please configure RLS policies or set SUPABASE_SERVICE_ROLE_KEY environment variable." },
        { status: 403 }
      );
    }
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}

