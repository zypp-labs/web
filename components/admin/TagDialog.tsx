"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Tag {
  id: string;
  name: string;
  slug: string;
}

interface TagDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tag: Tag | null;
  onSave: () => void;
}

export function TagDialog({ open, onOpenChange, tag, onSave }: TagDialogProps) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (tag) {
      setName(tag.name);
      setSlug(tag.slug);
    } else {
      setName("");
      setSlug("");
    }
    setError("");
  }, [tag, open]);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (!tag) {
      setSlug(generateSlug(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url = tag
        ? `/api/admin/blog/tags/${tag.id}`
        : "/api/admin/blog/tags";
      const method = tag ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, slug }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save tag");
      }

      onSave();
      onOpenChange(false);
    } catch (err: any) {
      setError(err.message || "Failed to save tag");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black border-white/10 text-white">
        <DialogHeader>
          <DialogTitle>{tag ? "Edit Tag" : "New Tag"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              required
              className="bg-white/5 border-white/10"
            />
          </div>
          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(generateSlug(e.target.value))}
              required
              className="bg-white/5 border-white/10"
            />
          </div>
          {error && <div className="text-red-400 text-sm">{error}</div>}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-white/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-primary text-black"
            >
              {loading ? "Saving..." : tag ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
