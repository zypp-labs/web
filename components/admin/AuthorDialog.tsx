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

interface Author {
  id: string;
  name: string;
  email: string;
  bio: string | null;
  avatar_url: string | null;
  social_links: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  } | null;
}

interface AuthorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  author: Author | null;
  onSave: () => void;
}

export function AuthorDialog({
  open,
  onOpenChange,
  author,
  onSave,
}: AuthorDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (author) {
      setName(author.name);
      setEmail(author.email);
      setBio(author.bio || "");
      setAvatarUrl(author.avatar_url || "");
      setTwitter(author.social_links?.twitter || "");
      setLinkedin(author.social_links?.linkedin || "");
      setGithub(author.social_links?.github || "");
    } else {
      setName("");
      setEmail("");
      setBio("");
      setAvatarUrl("");
      setTwitter("");
      setLinkedin("");
      setGithub("");
    }
    setError("");
  }, [author, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const socialLinks: any = {};
      if (twitter) socialLinks.twitter = twitter;
      if (linkedin) socialLinks.linkedin = linkedin;
      if (github) socialLinks.github = github;

      const url = author
        ? `/api/admin/blog/authors/${author.id}`
        : "/api/admin/blog/authors";
      const method = author ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          bio: bio || null,
          avatar_url: avatarUrl || null,
          social_links: Object.keys(socialLinks).length > 0 ? socialLinks : null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save author");
      }

      onSave();
      onOpenChange(false);
    } catch (err: any) {
      setError(err.message || "Failed to save author");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{author ? "Edit Author" : "New Author"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-white/5 border-white/10"
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/5 border-white/10"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="bg-white/5 border-white/10"
            />
          </div>
          <div>
            <Label>Avatar Image</Label>
            <ImageUpload
              value={avatarUrl}
              onChange={(url) => setAvatarUrl(url || "")}
              folder="avatars"
              bucket="author-images"
              label="Upload Avatar"
              aspectRatio="square"
              disabled={loading}
            />
          </div>
          <div>
            <Label>Social Links</Label>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div>
                <Label htmlFor="twitter" className="text-xs text-white/60">
                  Twitter
                </Label>
                <Input
                  id="twitter"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  placeholder="@username"
                  className="bg-white/5 border-white/10"
                />
              </div>
              <div>
                <Label htmlFor="linkedin" className="text-xs text-white/60">
                  LinkedIn
                </Label>
                <Input
                  id="linkedin"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="username"
                  className="bg-white/5 border-white/10"
                />
              </div>
              <div>
                <Label htmlFor="github" className="text-xs text-white/60">
                  GitHub
                </Label>
                <Input
                  id="github"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  placeholder="username"
                  className="bg-white/5 border-white/10"
                />
              </div>
            </div>
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
            <Button type="submit" disabled={loading} className="bg-primary text-black">
              {loading ? "Saving..." : author ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

