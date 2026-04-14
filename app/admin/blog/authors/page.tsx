"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, User } from "lucide-react";
import { AuthorDialog } from "@/components/admin/AuthorDialog";
import { SafeImage } from "@/components/custom/safe-image";

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
  created_at: string;
}

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const res = await fetch("/api/admin/blog/authors");
      const data = await res.json();
      setAuthors(data.authors || []);
    } catch (error) {
      console.error("Failed to fetch authors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this author?")) return;

    try {
      const res = await fetch(`/api/admin/blog/authors/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setAuthors(authors.filter((a) => a.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete author:", error);
    }
  };

  const handleEdit = (author: Author) => {
    setEditingAuthor(author);
    setDialogOpen(true);
  };

  const handleSave = () => {
    setDialogOpen(false);
    setEditingAuthor(null);
    fetchAuthors();
  };

  if (loading) {
    return <div className="text-white/60">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Authors</h1>
          <p className="text-white/60">
            Manage blog authors ({authors.length} total)
          </p>
        </div>
        <button
          onClick={() => {
            setEditingAuthor(null);
            setDialogOpen(true);
          }}
          className="px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2 font-semibold"
        >
          <Plus className="w-4 h-4" />
          New Author
        </button>
      </div>

      <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.length === 0 ? (
            <div className="col-span-full text-center py-8 text-white/60">
              No authors found
            </div>
          ) : (
            authors.map((author) => (
              <div
                key={author.id}
                className="bg-white/5 rounded-lg p-6 border border-white/10 hover:border-primary/30 transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-white/10 flex-shrink-0">
                    <SafeImage
                      src={author.avatar_url}
                      alt={author.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                      fallbackIcon={<User className="w-8 h-8 text-primary/50" />}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white mb-1 truncate">
                      {author.name}
                    </h3>
                    <p className="text-white/60 text-sm truncate">{author.email}</p>
                  </div>
                </div>
                {author.bio && (
                  <p className="text-white/70 text-sm mb-4 line-clamp-2">
                    {author.bio}
                  </p>
                )}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(author)}
                    className="flex-1 px-3 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(author.id)}
                    className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <AuthorDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        author={editingAuthor}
        onSave={handleSave}
      />
    </div>
  );
}

