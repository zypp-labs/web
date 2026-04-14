"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { BlogPostEditor } from "@/components/admin/BlogPostEditor";

export default function EditPostPage() {
  const params = useParams();
  const id = params.id as string;
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/admin/blog/posts/${id}`);
      const data = await res.json();
      setPost(data.post);
    } catch (error) {
      console.error("Failed to fetch post:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-white/60">Loading...</div>;
  }

  if (!post) {
    return <div className="text-white/60">Post not found</div>;
  }

  return <BlogPostEditor post={post} />;
}

