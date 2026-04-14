"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { CategoryDialog } from "@/components/admin/CategoryDialog";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/blog/categories");
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const res = await fetch(`/api/admin/blog/categories/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setCategories(categories.filter((c) => c.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setDialogOpen(true);
  };

  const handleSave = () => {
    setDialogOpen(false);
    setEditingCategory(null);
    fetchCategories();
  };

  if (loading) {
    return <div className="text-white/60">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Categories</h1>
          <p className="text-white/60">
            Manage blog categories ({categories.length} total)
          </p>
        </div>
        <button
          onClick={() => {
            setEditingCategory(null);
            setDialogOpen(true);
          }}
          className="px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2 font-semibold"
        >
          <Plus className="w-4 h-4" />
          New Category
        </button>
      </div>

      <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.length === 0 ? (
            <div className="col-span-full text-center py-8 text-white/60">
              No categories found
            </div>
          ) : (
            categories.map((category) => (
              <div
                key={category.id}
                className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-primary/30 transition-all"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-white/60 text-sm mb-3">
                  {category.description || "No description"}
                </p>
                <p className="text-white/40 text-xs font-mono mb-4">
                  /{category.slug}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="p-2 text-primary hover:bg-primary/20 rounded-lg transition-all"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
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

      <CategoryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        category={editingCategory}
        onSave={handleSave}
      />
    </div>
  );
}

