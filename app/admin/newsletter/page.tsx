"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Search, Download, Trash2, Mail, ToggleLeft, ToggleRight } from "lucide-react";

interface NewsletterSubscriber {
  id: string;
  email: string;
  created_at: string;
  is_active: boolean;
  source: string;
  ip_address: string | null;
}

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterActive, setFilterActive] = useState<boolean | null>(null);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const res = await fetch("/api/admin/newsletter");
      const data = await res.json();
      setSubscribers(data.subscribers || []);
    } catch (error) {
      console.error("Failed to fetch subscribers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/admin/newsletter/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !currentStatus }),
      });

      if (res.ok) {
        setSubscribers(
          subscribers.map((s) =>
            s.id === id ? { ...s, is_active: !currentStatus } : s
          )
        );
      }
    } catch (error) {
      console.error("Failed to toggle status:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this subscriber?")) return;

    try {
      const res = await fetch(`/api/admin/newsletter/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setSubscribers(subscribers.filter((s) => s.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete subscriber:", error);
    }
  };

  const handleExport = () => {
    const csv = [
      ["Email", "Status", "Source", "Date", "IP Address"].join(","),
      ...subscribers.map((s) =>
        [
          s.email,
          s.is_active ? "Active" : "Inactive",
          s.source,
          format(new Date(s.created_at), "yyyy-MM-dd HH:mm:ss"),
          s.ip_address || "",
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
  };

  const filteredSubscribers = subscribers.filter((sub) => {
    const matchesSearch = sub.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterActive === null || sub.is_active === filterActive;
    return matchesSearch && matchesFilter;
  });

  const activeCount = subscribers.filter((s) => s.is_active).length;
  const inactiveCount = subscribers.length - activeCount;

  if (loading) {
    return <div className="text-white/60">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Newsletter Subscribers</h1>
          <p className="text-white/60">
            {subscribers.length} total ({activeCount} active, {inactiveCount} inactive)
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setFilterActive(null)}
          className={`px-4 py-2 rounded-lg transition-all ${
            filterActive === null
              ? "bg-primary/20 text-primary"
              : "bg-white/5 text-white/70 hover:bg-white/10"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilterActive(true)}
          className={`px-4 py-2 rounded-lg transition-all ${
            filterActive === true
              ? "bg-primary/20 text-primary"
              : "bg-white/5 text-white/70 hover:bg-white/10"
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilterActive(false)}
          className={`px-4 py-2 rounded-lg transition-all ${
            filterActive === false
              ? "bg-primary/20 text-primary"
              : "bg-white/5 text-white/70 hover:bg-white/10"
          }`}
        >
          Inactive
        </button>
      </div>

      <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-primary/50 transition-all"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-white/60 font-medium">
                  Email
                </th>
                <th className="text-left py-3 px-4 text-white/60 font-medium">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-white/60 font-medium">
                  Source
                </th>
                <th className="text-left py-3 px-4 text-white/60 font-medium">
                  Date
                </th>
                <th className="text-right py-3 px-4 text-white/60 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscribers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-white/60">
                    No subscribers found
                  </td>
                </tr>
              ) : (
                filteredSubscribers.map((subscriber) => (
                  <tr
                    key={subscriber.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-white/40" />
                        <span className="text-white">{subscriber.email}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() =>
                          handleToggleActive(subscriber.id, subscriber.is_active)
                        }
                        className="flex items-center gap-2"
                      >
                        {subscriber.is_active ? (
                          <>
                            <ToggleRight className="w-5 h-5 text-green-400" />
                            <span className="text-green-400 text-sm">Active</span>
                          </>
                        ) : (
                          <>
                            <ToggleLeft className="w-5 h-5 text-white/40" />
                            <span className="text-white/40 text-sm">Inactive</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs">
                        {subscriber.source}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-white/60 text-sm">
                      {format(new Date(subscriber.created_at), "MMM d, yyyy HH:mm")}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleDelete(subscriber.id)}
                          className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

