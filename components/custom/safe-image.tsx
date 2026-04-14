"use client";

import Image from "next/image";
import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";

interface SafeImageProps {
  src: string | null | undefined;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  fallbackIcon?: React.ReactNode;
  priority?: boolean;
}

export function SafeImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  fallbackIcon,
  priority = false,
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  // Get Supabase Storage URL if it's a storage path
  const getImageUrl = (url: string | null | undefined): string | null => {
    if (!url || url === "" || url === "null" || url === "undefined") {
      return null;
    }

    // If it's already a full URL, return it
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }

    // If it's a Supabase Storage path
    if (
      url.startsWith("blog-images/") ||
      url.startsWith("author-images/") ||
      url.startsWith("authors/") ||
      url.startsWith("avatars/") ||
      url.includes("/blog-images/") ||
      url.includes("/author-images/") ||
      url.includes("/authors/") ||
      url.includes("/avatars/")
    ) {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      
      if (supabaseUrl) {
        // Determine which bucket based on the path
        let bucket = "blog-images";
        if (url.includes("author-images") || url.includes("avatars")) {
          bucket = "author-images";
        }
        
        // Clean the path - remove any leading slashes or storage prefixes
        const cleanPath = url
          .replace(/^\//, "")
          .replace(/^storage\/v1\/object\/public\/[^/]+\//, "")
          .replace(/^blog-images\//, "")
          .replace(/^author-images\//, "");
        
        return `${supabaseUrl}/storage/v1/object/public/${bucket}/${cleanPath}`;
      }
    }

    return url;
  };

  const imageUrl = getImageUrl(src);

  // Debug logging (remove in production)
  if (typeof window !== "undefined" && !imageUrl && src) {
    console.log("SafeImage: Failed to resolve URL", { src, imageUrl });
  }

  if (!imageUrl || hasError) {
    const fallback = fallbackIcon || (
      <div className="flex flex-col items-center justify-center gap-2">
        <ImageIcon className="w-8 h-8 text-primary/50" />
        <span className="text-xs text-white/40">No image</span>
      </div>
    );

    if (fill) {
      return (
        <div
          className={`absolute inset-0 bg-gradient-to-br from-primary/20 to-emerald-500/20 flex items-center justify-center ${className}`}
        >
          {fallback}
        </div>
      );
    }

    return (
      <div
        className={`w-full h-full bg-gradient-to-br from-primary/20 to-emerald-500/20 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        {fallback}
      </div>
    );
  }

  // For fill images
  if (fill) {
    return (
      <Image
        src={imageUrl}
        alt={alt}
        fill
        className={className}
        onError={() => setHasError(true)}
        priority={priority}
        unoptimized={imageUrl.includes("supabase") || imageUrl.startsWith("/")}
      />
    );
  }

  // For fixed size images
  if (width && height) {
    return (
      <Image
        src={imageUrl}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onError={() => setHasError(true)}
        priority={priority}
        unoptimized={imageUrl.includes("supabase") || imageUrl.startsWith("/")}
      />
    );
  }

  // Fallback for invalid props
  return (
    <div
      className={`w-full h-full bg-gradient-to-br from-primary/20 to-emerald-500/20 flex items-center justify-center ${className}`}
    >
      {fallbackIcon || <ImageIcon className="w-8 h-8 text-primary/50" />}
    </div>
  );
}
