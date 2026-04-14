// app/api/blog/upload-image/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = formData.get("folder") as string || "blog-posts";
    const bucket = formData.get("bucket") as string || "blog-images";

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only images are allowed." },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File size exceeds 10MB limit" },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExt = file.name.split(".").pop();
    const fileName = `${folder}/${timestamp}-${randomString}.${fileExt}`;

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Choose the right client: prefer admin (bypasses RLS) on the server
    const storageClient = supabaseAdmin ?? supabase;

    // Upload to Supabase Storage with retry logic
    let uploadError: unknown = null;
    const maxRetries = 3;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const { error } = await storageClient.storage
          .from(bucket)
          .upload(fileName, buffer, {
            contentType: file.type,
            upsert: false,
          });

        if (error) {
          uploadError = error;
          console.warn(`Upload attempt ${attempt + 1} failed:`, error.message);
          
          // If it's a network error and we have retries left, wait and retry
          if (attempt < maxRetries - 1 && 
              (error.message?.includes("fetch") || 
               error.message?.includes("network") ||
               error.message?.includes("closed"))) {
            await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
            continue;
          }
          break;
        }

        // Success!
        uploadError = null;
        break;
      } catch (err) {
        uploadError = err;
        console.warn(`Upload attempt ${attempt + 1} exception:`, err);
        if (attempt < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
          continue;
        }
      }
    }

    if (uploadError) {
      console.error("Supabase storage error after retries:", uploadError);
      return NextResponse.json(
        { 
          error: "Failed to upload image after multiple attempts", 
          details: uploadError instanceof Error ? uploadError.message : String(uploadError),
          suggestion: "Please check your internet connection and Supabase configuration"
        },
        { status: 500 }
      );
    }

    // Get public URL
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const publicUrl = `${supabaseUrl}/storage/v1/object/public/${bucket}/${fileName}`;

    // Also return the storage path for database storage
    const storagePath = fileName;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      path: storagePath,
      fileName: fileName,
      bucket: bucket,
    });
  } catch (error) {
    console.error("Image upload error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// GET endpoint to check if storage bucket exists and is accessible
export async function GET() {
  try {
    const { data, error } = await supabase.storage
      .from("blog-images")
      .list("", {
        limit: 1,
      });

    if (error) {
      return NextResponse.json(
        {
          error: "Storage bucket not accessible",
          details: error.message,
          setup: "Please create a 'blog-images' bucket in Supabase Storage with public access",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Storage bucket is accessible",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to check storage", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

