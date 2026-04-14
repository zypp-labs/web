"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Search, Download, Trash2, Mail } from "lucide-react";

interface WaitlistEntry {
  id: string;
  email: string;
  created_at: string;
  source: string;
  ip_address: string | null;
}

export default function WaitlistPage() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEntries, setSelectedEntries] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await fetch("/api/admin/waitlist");
      const data = await res.json();
      setEntries(data.entries || []);
    } catch (error) {
      console.error("Failed to fetch waitlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;

    try {
      const res = await fetch(`/api/admin/waitlist/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setEntries(entries.filter((e) => e.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete entry:", error);
    }
  };

  const handleExport = () => {
    const csv = [
      ["Email", "Source", "Date", "IP Address"].join(","),
      ...entries.map((e) =>
        [
          e.email,
          e.source,
          format(new Date(e.created_at), "yyyy-MM-dd HH:mm:ss"),
          e.ip_address || "",
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `waitlist-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
  };

  const filteredEntries = entries.filter((entry) =>
    entry.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="text-white/60">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Waitlist</h1>
          <p className="text-white/60">
            Manage waitlist signups ({entries.length} total)
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
                  Source
                </th>
                <th className="text-left py-3 px-4 text-white/60 font-medium">
                  Date
                </th>
                <th className="text-left py-3 px-4 text-white/60 font-medium">
                  IP Address
                </th>
                <th className="text-right py-3 px-4 text-white/60 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-white/60">
                    No entries found
                  </td>
                </tr>
              ) : (
                filteredEntries.map((entry) => (
                  <tr
                    key={entry.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-white/40" />
                        <span className="text-white">{entry.email}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs">
                        {entry.source}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-white/60 text-sm">
                      {format(new Date(entry.created_at), "MMM d, yyyy HH:mm")}
                    </td>
                    <td className="py-3 px-4 text-white/60 text-sm font-mono">
                      {entry.ip_address || "N/A"}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleDelete(entry.id)}
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

