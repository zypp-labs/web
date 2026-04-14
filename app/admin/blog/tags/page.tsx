"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { TagDialog } from "@/components/admin/TagDialog";

interface Tag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export default function TagsPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const res = await fetch("/api/admin/blog/tags");
      const data = await res.json();
      setTags(data.tags || []);
    } catch (error) {
      console.error("Failed to fetch tags:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tag?")) return;

    try {
      const res = await fetch(`/api/admin/blog/tags/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTags(tags.filter((t) => t.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete tag:", error);
    }
  };

  const handleEdit = (tag: Tag) => {
    setEditingTag(tag);
    setDialogOpen(true);
  };

  const handleSave = () => {
    setDialogOpen(false);
    setEditingTag(null);
    fetchTags();
  };

  if (loading) {
    return <div className="text-white/60">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Tags</h1>
          <p className="text-white/60">
            Manage blog tags ({tags.length} total)
          </p>
        </div>
        <button
          onClick={() => {
            setEditingTag(null);
            setDialogOpen(true);
          }}
          className="px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2 font-semibold"
        >
          <Plus className="w-4 h-4" />
          New Tag
        </button>
      </div>

      <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
        <div className="flex flex-wrap gap-3">
          {tags.length === 0 ? (
            <div className="w-full text-center py-8 text-white/60">
              No tags found
            </div>
          ) : (
            tags.map((tag) => (
              <div
                key={tag.id}
                className="bg-white/5 rounded-lg px-4 py-3 border border-white/10 hover:border-primary/30 transition-all flex items-center gap-3 group"
              >
                <span className="text-white font-medium">{tag.name}</span>
                <span className="text-white/40 text-xs font-mono">
                  /{tag.slug}
                </span>
                <div className="flex items-center gap-1 ml-2">
                  <button
                    onClick={() => handleEdit(tag)}
                    className="p-1 text-primary hover:bg-primary/20 rounded transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Edit className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleDelete(tag.id)}
                    className="p-1 text-red-400 hover:bg-red-400/20 rounded transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <TagDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        tag={editingTag}
        onSave={handleSave}
      />
    </div>
  );
}

