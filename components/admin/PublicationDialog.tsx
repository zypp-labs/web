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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/admin/ImageUpload";

interface Publication {
  id: string;
  title: string;
  subtext: string | null;
  cover_image: string | null;
  link: string | null;
  tag: string | null;
  type: string | null;
  date: string | null;
  ref: string | null;
}

interface PublicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  publication: Publication | null;
  onSave: () => void;
}

export function PublicationDialog({
  open,
  onOpenChange,
  publication,
  onSave,
}: PublicationDialogProps) {
  const [title, setTitle] = useState("");
  const [subtext, setSubtext] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [link, setLink] = useState("");
  const [tag, setTag] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [ref, setRef] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (publication) {
      setTitle(publication.title);
      setSubtext(publication.subtext || "");
      setCoverImage(publication.cover_image || "");
      setLink(publication.link || "");
      setTag(publication.tag || "");
      setType(publication.type || "");
      setDate(publication.date || "");
      setRef(publication.ref || "");
    } else {
      setTitle("");
      setSubtext("");
      setCoverImage("");
      setLink("");
      setTag("");
      setType("");
      setDate("");
      setRef("");
    }
    setError("");
  }, [publication, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url = publication
        ? `/api/admin/publications/${publication.id}`
        : "/api/admin/publications";
      const method = publication ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          subtext: subtext || null,
          cover_image: coverImage || null,
          link: link || null,
          tag: tag || null,
          type: type || null,
          date: date || null,
          ref: ref || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save publication");
      }

      onSave();
      onOpenChange(false);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to save publication";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto font-sans">
        <DialogHeader>
          <DialogTitle>{publication ? "Edit Publication" : "New Publication"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="bg-white/5 border-white/10"
              placeholder="e.g. Delay Tolerant Networking..."
            />
          </div>

          <div>
            <Label htmlFor="subtext">Subtext / Description</Label>
            <Textarea
              id="subtext"
              value={subtext}
              onChange={(e) => setSubtext(e.target.value)}
              rows={3}
              className="bg-white/5 border-white/10"
              placeholder="Brief description of the research..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tag">Tag</Label>
              <Input
                id="tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="bg-white/5 border-white/10"
                placeholder="e.g. NETWORK SYSTEMS"
              />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Input
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="bg-white/5 border-white/10"
                placeholder="e.g. Research Paper"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-white/5 border-white/10"
                placeholder="e.g. March 2026"
              />
            </div>
            <div>
              <Label htmlFor="ref">Reference Code</Label>
              <Input
                id="ref"
                value={ref}
                onChange={(e) => setRef(e.target.value)}
                className="bg-white/5 border-white/10"
                placeholder="e.g. RES-NET-01"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="link">PDF / External Link</Label>
            <Input
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="bg-white/5 border-white/10"
              placeholder="https://..."
            />
          </div>

          <div>
            <Label>Cover Image</Label>
            <ImageUpload
              value={coverImage}
              onChange={(url) => setCoverImage(url || "")}
              folder="publications"
              bucket="blog-images"
              label="Upload Cover"
              aspectRatio="square"
              disabled={loading}
            />
          </div>

          {error && <div className="text-red-400 text-sm font-mono uppercase tracking-widest">{error}</div>}

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-white/10 text-white/60 hover:text-white"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-primary text-black font-bold uppercase tracking-wider">
              {loading ? "Saving..." : publication ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
