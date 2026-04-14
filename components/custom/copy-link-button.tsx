"use client";

import { Link as LinkIcon } from "lucide-react";
import { useState } from "react";

interface CopyLinkButtonProps {
  url: string;
}

export function CopyLinkButton({ url }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all duration-300"
      title={copied ? "Copied!" : "Copy link"}
    >
      <LinkIcon className="w-3 h-3" />
    </button>
  );
}

