"use client";

import { useRouter } from "next/navigation";
import { BlogPostEditor } from "@/components/admin/BlogPostEditor";

export default function NewPostPage() {
  return <BlogPostEditor />;
}

