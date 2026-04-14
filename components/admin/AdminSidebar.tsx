"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Mail,
  FileText,
  Tag,
  FolderOpen,
  UserCircle,
  LogOut,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Waitlist", href: "/admin/waitlist", icon: Users },
  { name: "Newsletter", href: "/admin/newsletter", icon: Mail },
  { name: "Publications", href: "/admin/publications", icon: FileText },
  { name: "Blog Posts", href: "/admin/blog/posts", icon: FileText },
  { name: "Categories", href: "/admin/blog/categories", icon: FolderOpen },
  { name: "Tags", href: "/admin/blog/tags", icon: Tag },
  { name: "Authors", href: "/admin/blog/authors", icon: UserCircle },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/auth", {
        method: "DELETE",
      });
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      setLoggingOut(false);
    }
  };

  return (
    <aside className="w-64 bg-black/50 border-r border-white/10 min-h-screen p-6 font-sans">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-primary">Zypp Admin</h2>
        <p className="text-white/40 text-sm">Control Panel</p>
      </div>

      <nav className="space-y-2">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 pt-8 border-t border-white/10">
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:text-white hover:bg-white/5 w-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">{loggingOut ? "Logging out..." : "Logout"}</span>
        </button>
      </div>
    </aside>
  );
}
