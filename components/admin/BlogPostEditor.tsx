"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ImageUpload } from "@/components/admin/ImageUpload";

interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  category_id: string | null;
  author_id: string | null;
  read_time_minutes: number;
  is_featured: boolean;
  is_published: boolean;
  is_draft: boolean;
  published_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  blog_categories?: { id: string; name: string; slug: string } | null;
  blog_authors?: { id: string; name: string; email: string } | null;
  blog_post_tags?: Array<{ blog_tags: { id: string; name: string; slug: string } }>;
}

interface BlogPostEditorProps {
  post?: BlogPost;
}

export function BlogPostEditor({ post }: BlogPostEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [authors, setAuthors] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    featured_image: post?.featured_image || null,
    category_id: post?.category_id || post?.blog_categories?.id || null,
    author_id: post?.author_id || post?.blog_authors?.id || null,
    read_time_minutes: post?.read_time_minutes || 5,
    is_featured: post?.is_featured || false,
    is_published: post?.is_published || false,
    is_draft: post?.is_draft ?? true,
    meta_title: post?.meta_title || null,
    meta_description: post?.meta_description || null,
    canonical_url: post?.canonical_url || null,
  });

  useEffect(() => {
    fetchData();
    if (post?.blog_post_tags) {
      setSelectedTags(post.blog_post_tags.map((pt: any) => pt.blog_tags.id));
    }
  }, []);

  const fetchData = async () => {
    try {
      const [categoriesRes, authorsRes, tagsRes] = await Promise.all([
        fetch("/api/admin/blog/categories"),
        fetch("/api/admin/blog/authors"),
        fetch("/api/admin/blog/tags"),
      ]);

      const categoriesData = await categoriesRes.json();
      const authorsData = await authorsRes.json();
      const tagsData = await tagsRes.json();

      setCategories(categoriesData.categories || []);
      setAuthors(authorsData.authors || []);
      setTags(tagsData.tags || []);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (value: string) => {
    setFormData({ ...formData, title: value });
    if (!post || !formData.slug) {
      setFormData((prev) => ({ ...prev, slug: generateSlug(value) }));
    }
  };


  const handleSave = async (publish: boolean = false) => {
    setLoading(true);
    try {
      const payload: any = {
        ...formData,
        is_published: publish ? true : formData.is_published,
        is_draft: publish ? false : true,
        published_at: publish ? new Date().toISOString() : formData.published_at,
      };

      const url = post
        ? `/api/admin/blog/posts/${post.id}`
        : "/api/admin/blog/posts";
      const method = post ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save post");
      }

      // Handle tags
      if (selectedTags.length > 0) {
        const postId = data.post?.id || post?.id;
        if (postId) {
          await fetch(`/api/admin/blog/posts/${postId}/tags`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tag_ids: selectedTags }),
          });
        }
      }

      router.push("/admin/blog/posts");
    } catch (error: any) {
      alert(error.message || "Failed to save post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">
            {post ? "Edit Post" : "New Post"}
          </h1>
          <p className="text-white/60">Create or edit a blog post</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => handleSave(false)}
            disabled={loading}
            variant="outline"
            className="border-white/10"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button
            onClick={() => handleSave(true)}
            disabled={loading}
            className="bg-primary text-black"
          >
            <Eye className="w-4 h-4 mr-2" />
            {loading ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/5 rounded-2xl border border-white/10 p-6 space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="bg-white/5 border-white/10"
                placeholder="Enter post title"
              />
            </div>
            <div>
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: generateSlug(e.target.value) })
                }
                className="bg-white/5 border-white/10 font-mono"
                placeholder="post-slug"
              />
            </div>
            <div>
              <Label htmlFor="excerpt">Excerpt *</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                rows={3}
                className="bg-white/5 border-white/10"
                placeholder="Brief description of the post"
              />
            </div>
            <div>
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                rows={20}
                className="bg-white/5 border-white/10 font-mono text-sm"
                placeholder="Write your post content (HTML supported)"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 rounded-2xl border border-white/10 p-6 space-y-4">
            <h3 className="font-semibold text-white mb-4">Settings</h3>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category_id || "none"}
                onValueChange={(value) =>
                  setFormData({ ...formData, category_id: value === "none" ? null : value })
                }
              >
                <SelectTrigger className="bg-white/5 border-white/10">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="author">Author</Label>
              <Select
                value={formData.author_id || "none"}
                onValueChange={(value) =>
                  setFormData({ ...formData, author_id: value === "none" ? null : value })
                }
              >
                <SelectTrigger className="bg-white/5 border-white/10">
                  <SelectValue placeholder="Select author" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {authors.map((author) => (
                    <SelectItem key={author.id} value={author.id}>
                      {author.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Tags</Label>
              <div className="space-y-2 mt-2 max-h-48 overflow-y-auto">
                {tags.map((tag) => (
                  <div key={tag.id} className="flex items-center gap-2">
                    <Checkbox
                      checked={selectedTags.includes(tag.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedTags([...selectedTags, tag.id]);
                        } else {
                          setSelectedTags(selectedTags.filter((id) => id !== tag.id));
                        }
                      }}
                    />
                    <Label className="text-sm">{tag.name}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="read_time">Read Time (minutes)</Label>
              <Input
                id="read_time"
                type="number"
                value={formData.read_time_minutes}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    read_time_minutes: parseInt(e.target.value) || 5,
                  })
                }
                className="bg-white/5 border-white/10"
                min={1}
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                checked={formData.is_featured}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, is_featured: !!checked })
                }
              />
              <Label>Featured Post</Label>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl border border-white/10 p-6 space-y-4">
            <h3 className="font-semibold text-white mb-4">Featured Image</h3>
            <ImageUpload
              value={formData.featured_image || null}
              onChange={(url) => setFormData({ ...formData, featured_image: url })}
              folder="blog-posts"
              label="Upload Featured Image"
              aspectRatio="video"
              disabled={loading}
            />
          </div>

          <div className="bg-white/5 rounded-2xl border border-white/10 p-6 space-y-4">
            <h3 className="font-semibold text-white mb-4">SEO</h3>
            <div>
              <Label htmlFor="meta_title">Meta Title</Label>
              <Input
                id="meta_title"
                value={formData.meta_title || ""}
                onChange={(e) =>
                  setFormData({ ...formData, meta_title: e.target.value || null })
                }
                className="bg-white/5 border-white/10"
                placeholder="SEO title"
              />
            </div>
            <div>
              <Label htmlFor="meta_description">Meta Description</Label>
              <Textarea
                id="meta_description"
                value={formData.meta_description || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    meta_description: e.target.value || null,
                  })
                }
                rows={3}
                className="bg-white/5 border-white/10"
                placeholder="SEO description"
              />
            </div>
            <div>
              <Label htmlFor="canonical_url">Canonical URL</Label>
              <Input
                id="canonical_url"
                value={formData.canonical_url || ""}
                onChange={(e) =>
                  setFormData({ ...formData, canonical_url: e.target.value || null })
                }
                className="bg-white/5 border-white/10"
                placeholder="https://..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

