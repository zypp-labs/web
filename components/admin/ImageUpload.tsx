"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/custom/safe-image";

interface ImageUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
  folder?: string;
  bucket?: string;
  label?: string;
  aspectRatio?: "square" | "video" | "auto";
  disabled?: boolean;
}

export function ImageUpload({
  value,
  onChange,
  folder = "blog-posts",
  bucket = "blog-images",
  label = "Upload Image",
  aspectRatio = "auto",
  disabled = false,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setError("Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.");
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("File size exceeds 10MB limit.");
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);
      formData.append("bucket", bucket);

      const res = await fetch("/api/blog/upload-image", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to upload image");
      }

      onChange(data.url);
    } catch (err) {
      console.error("Upload failed:", err);
      setError(err instanceof Error ? err.message : "Failed to upload image");
    } finally {
      setUploading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    onChange(null);
    setError(null);
  };

  const getAspectClass = () => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square";
      case "video":
        return "aspect-video";
      default:
        return "h-48";
    }
  };

  return (
    <div className="space-y-3">
      {value && (
        <div className={`relative w-full ${getAspectClass()} rounded-lg overflow-hidden bg-white/5 border border-white/10`}>
          <SafeImage
            src={value}
            alt="Uploaded image"
            fill
            className="object-cover"
          />
          <button
            onClick={handleRemove}
            disabled={disabled || uploading}
            className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-500 rounded-lg transition-colors disabled:opacity-50"
            type="button"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled || uploading}
      />

      <Button
        type="button"
        variant="outline"
        className="w-full border-white/10"
        disabled={disabled || uploading}
        onClick={() => inputRef.current?.click()}
      >
        {uploading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="w-4 h-4 mr-2" />
            {value ? "Change Image" : label}
          </>
        )}
      </Button>

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      <p className="text-xs text-white/40">
        Max file size: 10MB. Supported formats: JPEG, PNG, WebP, GIF
      </p>
    </div>
  );
}
