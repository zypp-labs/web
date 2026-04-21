import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { relayerSource } from "@/lib/relayer-source";
import { Zap } from "lucide-react";

export default function RelayerDocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="dark">
      <DocsLayout
        tree={relayerSource.pageTree}
        nav={{
          title: (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: "#c9ee80" }}>
                <Zap className="w-3.5 h-3.5" style={{ color: "#0a0a0a" }} />
              </div>
              <span className="font-semibold text-sm">ZRN Docs</span>
            </div>
          ),
        }}
      >
        {children}
      </DocsLayout>
    </div>
  );
}
