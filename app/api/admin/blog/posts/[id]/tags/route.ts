import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { retrySupabaseQuery } from "@/lib/supabase-retry";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { tag_ids } = await request.json();

    // Use admin client to bypass RLS for admin operations
    const client = supabaseAdmin || supabase;

    // Delete existing tags
    const { error: deleteError } = await retrySupabaseQuery(() =>
      client.from("blog_post_tags").delete().eq("post_id", id)
    );

    if (deleteError) throw deleteError;

    // Insert new tags
    if (tag_ids && tag_ids.length > 0) {
      const postTags = tag_ids.map((tagId: string) => ({
        post_id: id,
        tag_id: tagId,
      }));

      const { error } = await retrySupabaseQuery(() =>
        client
          .from("blog_post_tags")
          .insert(postTags)
      );

      if (error) throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Update post tags error:", error);
    if (error.code === "42501") {
      return NextResponse.json(
        { error: "Permission denied. Please configure RLS policies or set SUPABASE_SERVICE_ROLE_KEY environment variable." },
        { status: 403 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update tags" },
      { status: 500 }
    );
  }
}

