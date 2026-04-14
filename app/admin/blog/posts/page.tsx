"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Plus, Search, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  is_published: boolean;
  is_featured: boolean;
  published_at: string | null;
  created_at: string;
  category: { name: string } | null;
  author: { name: string } | null;
}

export default function BlogPostsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/admin/blog/posts");
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/admin/blog/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          is_published: !currentStatus,
          published_at: !currentStatus ? new Date().toISOString() : null,
        }),
      });

      if (res.ok) {
        setPosts(
          posts.map((p) =>
            p.id === id
              ? {
                  ...p,
                  is_published: !currentStatus,
                  published_at: !currentStatus
                    ? new Date().toISOString()
                    : null,
                }
              : p
          )
        );
      }
    } catch (error) {
      console.error("Failed to toggle publish:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(`/api/admin/blog/posts/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setPosts(posts.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="text-white/60">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Blog Posts</h1>
          <p className="text-white/60">
            Manage your blog posts ({posts.length} total)
          </p>
        </div>
        <Link
          href="/admin/blog/posts/new"
          className="px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2 font-semibold"
        >
          <Plus className="w-4 h-4" />
          New Post
        </Link>
      </div>

      <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-primary/50 transition-all"
          />
        </div>

        <div className="space-y-3">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-8 text-white/60">
              No posts found
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">
                        {post.title}
                      </h3>
                      {post.is_featured && (
                        <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs">
                          Featured
                        </span>
                      )}
                      {post.is_published ? (
                        <span className="px-2 py-1 bg-green-400/20 text-green-400 rounded text-xs flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          Published
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-white/10 text-white/60 rounded text-xs flex items-center gap-1">
                          <EyeOff className="w-3 h-3" />
                          Draft
                        </span>
                      )}
                    </div>
                    <p className="text-white/60 text-sm mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-white/40">
                      <span>
                        Category: {post.category?.name || "Uncategorized"}
                      </span>
                      <span>Author: {post.author?.name || "Unknown"}</span>
                      <span>
                        Created: {format(new Date(post.created_at), "MMM d, yyyy")}
                      </span>
                      {post.published_at && (
                        <span>
                          Published:{" "}
                          {format(new Date(post.published_at), "MMM d, yyyy")}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() =>
                        handleTogglePublish(post.id, post.is_published)
                      }
                      className="p-2 text-white/70 hover:bg-white/10 rounded-lg transition-all"
                      title={post.is_published ? "Unpublish" : "Publish"}
                    >
                      {post.is_published ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                    <Link
                      href={`/admin/blog/posts/${post.id}`}
                      className="p-2 text-primary hover:bg-primary/20 rounded-lg transition-all"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

