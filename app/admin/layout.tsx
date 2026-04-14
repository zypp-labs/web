import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-client";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // For now, we'll skip auth check in layout and handle it in middleware
  // In production, you'd want to check for admin role here

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminHeader />
          <main className="flex-1 p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
