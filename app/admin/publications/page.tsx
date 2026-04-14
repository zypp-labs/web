"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, FileText, ExternalLink } from "lucide-react";
import { PublicationDialog } from "@/components/admin/PublicationDialog";
import { SafeImage } from "@/components/custom/safe-image";

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
  created_at: string;
}

export default function PublicationsPage() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPublication, setEditingPublication] = useState<Publication | null>(null);

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      const res = await fetch("/api/admin/publications");
      const data = await res.json();
      setPublications(data.publications || []);
    } catch (error) {
      console.error("Failed to fetch publications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this publication?")) return;

    try {
      const res = await fetch(`/api/admin/publications/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setPublications(publications.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete publication:", error);
    }
  };

  const handleEdit = (publication: Publication) => {
    setEditingPublication(publication);
    setDialogOpen(true);
  };

  const handleSave = () => {
    setDialogOpen(false);
    setEditingPublication(null);
    fetchPublications();
  };

  if (loading) {
    return <div className="text-white/60 font-mono uppercase tracking-widest p-8">Loading Publications...</div>;
  }

  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2 text-white">Research Publications</h1>
          <p className="text-white/60">
            Manage your applied research and whitepapers ({publications.length} total)
          </p>
        </div>
        <button
          onClick={() => {
            setEditingPublication(null);
            setDialogOpen(true);
          }}
          className="px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2 font-bold uppercase tracking-wider"
        >
          <Plus className="w-4 h-4" />
          New Publication
        </button>
      </div>

      <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publications.length === 0 ? (
            <div className="col-span-full text-center py-12 border-2 border-dashed border-white/5 rounded-xl">
              <FileText className="w-12 h-12 text-white/10 mx-auto mb-4" />
              <p className="text-white/40 font-mono uppercase tracking-widest">No publications found</p>
              <button
                onClick={() => setDialogOpen(true)}
                className="mt-4 text-primary text-sm font-bold uppercase tracking-widest hover:underline"
              >
                Add your first research paper
              </button>
            </div>
          ) : (
            publications.map((pub) => (
              <div
                key={pub.id}
                className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-primary/30 transition-all flex flex-col h-full group"
              >
                <div className="relative aspect-video rounded-lg overflow-hidden bg-white/5 mb-4 border border-white/5">
                  <SafeImage
                    src={pub.cover_image}
                    alt={pub.title}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                    fallbackIcon={<FileText className="w-8 h-8 text-primary/50" />}
                  />
                  <div className="absolute top-2 left-2">
                    <span className="text-[10px] font-mono text-[#04E83D] bg-black/60 px-2 py-0.5 rounded border border-[#04E83D]/20 uppercase">
                      {pub.tag || "Research"}
                    </span>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="text-lg font-bold text-white leading-tight line-clamp-2 uppercase font-mono">
                      {pub.title}
                    </h3>
                  </div>
                  <p className="text-white/50 text-xs mb-4 line-clamp-3">
                    {pub.subtext || "No description provided."}
                  </p>
                  
                  <div className="flex flex-wrap gap-y-2 gap-x-4 mb-6 text-[10px] font-mono text-white/40 uppercase">
                    <div className="flex items-center gap-1">
                      <span className="text-white/20">Type:</span> {pub.type || "N/A"}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-white/20">Ref:</span> {pub.ref || "N/A"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-auto pt-4 border-t border-white/5">
                  <button
                    onClick={() => handleEdit(pub)}
                    className="flex-1 px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    Edit
                  </button>
                  {pub.link && (
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                      title="View Link"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={() => handleDelete(pub.id)}
                    className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <PublicationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        publication={editingPublication}
        onSave={handleSave}
      />
    </div>
  );
}
