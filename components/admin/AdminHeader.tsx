"use client";

import { Bell, Search } from "lucide-react";

export function AdminHeader() {
  return (
    <header className="bg-black/50 border-b border-white/10 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-primary/50 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-primary font-semibold">A</span>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-white">Admin</p>
              <p className="text-xs text-white/60">admin@zypp.fun</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
