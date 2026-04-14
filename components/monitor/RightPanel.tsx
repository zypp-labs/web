"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useMonitor } from "./MonitorContext";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  Lock,
  Activity,
  Hash,
  Database,
  Network,
  X,
  User,
  Tag,
  Coins,
  FileSignature,
  PanelRightClose,
  PanelRightOpen,
  Copy,
  Check
} from "lucide-react";

// The pipeline states based on our design system
type TxStatus = "LOCKED" | "VALIDATED" | "RELAYING" | "CONFIRMED" | "FAILED";

export interface TransactionEvent {
  id: string;
  payload_hash: string;
  status: TxStatus;
  timestamp: string;
  message: string;

  // Relayer specific
  intent_sender?: string;
  intent_receiver?: string;
  intent_nonce?: string;
  intent_type?: string;
  intent_fee?: string;
  intent_total?: string;
  intent_currency?: string;
  tx_signature?: string;
  rpc_endpoint_used?: string;
  last_error?: string;
}

const statusConfig: Record<TxStatus, { color: string; icon: React.ReactNode; bg: string; glow: string; hoverBg: string }> = {
  LOCKED: {
    color: "text-yellow-400",
    bg: "bg-yellow-400/10 border-yellow-400/30",
    glow: "shadow-[0_0_15px_rgba(250,204,21,0.2)]",
    hoverBg: "hover:bg-yellow-400/10",
    icon: <Lock className="w-4 h-4 text-yellow-400" />,
  },
  VALIDATED: {
    color: "text-blue-400",
    bg: "bg-blue-400/10 border-blue-400/30",
    glow: "shadow-[0_0_15px_rgba(96,165,250,0.2)]",
    hoverBg: "hover:bg-blue-400/10",
    icon: <ArrowRight className="w-4 h-4 text-blue-400" />,
  },
  RELAYING: {
    color: "text-orange-400",
    bg: "bg-orange-400/10 border-orange-400/30 animate-pulse",
    glow: "shadow-[0_0_20px_rgba(251,146,60,0.4)]",
    hoverBg: "hover:bg-orange-400/10",
    icon: <Loader2 className="w-4 h-4 text-orange-400 animate-spin" />,
  },
  CONFIRMED: {
    color: "text-green-400",
    bg: "bg-green-400/10 border-green-400/30",
    glow: "shadow-[0_0_15px_rgba(74,222,128,0.2)]",
    hoverBg: "hover:bg-green-400/10",
    icon: <CheckCircle2 className="w-4 h-4 text-green-400" />,
  },
  FAILED: {
    color: "text-red-400",
    bg: "bg-red-400/10 border-red-400/30",
    glow: "shadow-[0_0_20px_rgba(248,113,113,0.3)]",
    hoverBg: "hover:bg-red-400/10",
    icon: <AlertCircle className="w-4 h-4 text-red-400" />,
  },
};

function shorten(str: string) {
  if (!str || str.length < 12) return str;
  return `${str.slice(0, 6)}...${str.slice(-4)}`;
}

export function RightPanel() {
  const [isOpen, setIsOpen] = React.useState(true);
  const [selectedTx, setSelectedTx] = React.useState<TransactionEvent | null>(null);
  const { hoveredTxId, setHoveredTxId, transactions } = useMonitor();

  return (
    <>
      {/* Floating Toggle Button (visible when closed) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="absolute right-6 top-24 z-[60] p-3 bg-card/50 backdrop-blur-md border border-border/40 rounded-full shadow-lg hover:bg-muted/20 transition-all group"
        >
          <PanelRightOpen className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        </button>
      )}

      {/* Detail Overlay (appears when a TX is selected and panel is open) */}
      {selectedTx && isOpen && (
        <div className={cn(
          "absolute right-[360px] top-24 bottom-6 w-80 bg-card/60 backdrop-blur-2xl border rounded-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-right-8 fade-in duration-300",
          statusConfig[selectedTx.status].glow,
          statusConfig[selectedTx.status].bg.split(" ")[1] // Extract just the border color
        )}>
          {/* Header */}
          <div className="p-4 border-b border-border/20 flex justify-between items-center bg-gradient-to-r from-transparent to-muted/20">
            <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase flex items-center gap-2">
              <Activity className="w-3 h-3" />
              Details
            </span>
            <button onClick={() => setSelectedTx(null)} className="p-1 hover:bg-muted/50 rounded-md transition-colors">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="flex flex-col gap-6">
              {/* Status Badge */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Current Status</span>
                <Badge variant="outline" className={cn("text-[10px] px-2 py-0.5 rounded-sm border", statusConfig[selectedTx.status].bg, statusConfig[selectedTx.status].color)}>
                  {selectedTx.status}
                </Badge>
              </div>

              {/* Details Grid */}
              <div className="flex flex-col gap-4">
                <DetailRow icon={<Hash className="w-4 h-4" />} label="Payload Hash" value={shorten(selectedTx.payload_hash)} fullValue={selectedTx.payload_hash} />
                {selectedTx.intent_sender && <DetailRow icon={<User className="w-4 h-4" />} label="Sender" value={shorten(selectedTx.intent_sender)} fullValue={selectedTx.intent_sender} />}
                {selectedTx.intent_receiver && <DetailRow icon={<User className="w-4 h-4" />} label="Receiver" value={shorten(selectedTx.intent_receiver)} fullValue={selectedTx.intent_receiver} />}
                {selectedTx.intent_type && <DetailRow icon={<Tag className="w-4 h-4" />} label="Intent Type" value={selectedTx.intent_type} />}
                {selectedTx.intent_total && <DetailRow icon={<Coins className="w-4 h-4" />} label="Amount" value={`${selectedTx.intent_total} ${selectedTx.intent_currency || ''}`} />}
                {selectedTx.intent_fee && <DetailRow icon={<Database className="w-4 h-4" />} label="Relayer Fee" value={`${selectedTx.intent_fee} ${selectedTx.intent_currency || ''}`} />}

                {selectedTx.rpc_endpoint_used && (
                  <DetailRow icon={<Network className="w-4 h-4" />} label="RPC Node" value={new URL(selectedTx.rpc_endpoint_used).hostname} />
                )}

                {selectedTx.tx_signature && (
                  <DetailRow icon={<FileSignature className="w-4 h-4" />} label="Signature" value={shorten(selectedTx.tx_signature)} fullValue={selectedTx.tx_signature} />
                )}
              </div>

              {/* Error block */}
              {selectedTx.last_error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex flex-col gap-2">
                  <span className="text-[10px] uppercase tracking-wider text-red-500 font-bold flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Error Log
                  </span>
                  <span className="text-xs text-red-400 font-mono break-words leading-relaxed">
                    {selectedTx.last_error}
                  </span>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Main Right Panel */}
      <aside className={cn(
        "absolute right-6 top-24 bottom-6 w-80 flex flex-col border border-border/20 rounded-2xl shadow-2xl bg-card/60 backdrop-blur-2xl z-50 transition-transform duration-500 ease-in-out overflow-hidden",
        !isOpen && "translate-x-[150%]"
      )}>

        {/* Header */}
        <div className="px-5 py-4 border-b border-border/20 flex items-center justify-between bg-gradient-to-l from-transparent to-muted/20">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Live Feed</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-muted/50 rounded-md transition-colors text-muted-foreground hover:text-foreground">
              <PanelRightClose className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* The Scrolling Feed */}
        <ScrollArea className="flex-1">
          {transactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center text-muted-foreground opacity-60">
              <Activity className="w-8 h-8 mb-3 opacity-20" />
              <p className="text-xs font-mono uppercase tracking-widest">No Active Events</p>
              <p className="text-[10px] mt-2">The live feed is currently empty.</p>
            </div>
          ) : (
            <div className="flex flex-col">
              {transactions.map((event) => {
                const config = statusConfig[event.status];
                const isSelected = selectedTx?.id === event.id;
                const isHovered = hoveredTxId === event.id;

                return (
                  <div
                    key={event.id}
                    onClick={() => setSelectedTx(event)}
                    onMouseEnter={() => setHoveredTxId(event.id)}
                    onMouseLeave={() => setHoveredTxId(null)}
                    className={cn(
                      "p-4 transition-colors cursor-pointer relative group",
                      config.hoverBg, // Applies specific status color tint on hover
                      (isSelected || isHovered) ? config.bg.split(" ")[0] : "bg-transparent", // Active/Hover persistent tint
                    )}
                  >
                    {/* Left Colored Status Bar Indicator (Clean edge line, no shadow) */}
                    <div className={cn(
                      "absolute left-0 top-0 bottom-0 transition-all",
                      config.color.replace("text-", "bg-"),
                      (isSelected || isHovered) ? "w-[4px]" : "w-[2px]"
                    )} />

                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[10px] font-mono text-muted-foreground">{event.timestamp}</span>
                      {config.icon}
                    </div>

                    <div className="font-mono text-xs text-foreground mb-1">
                      {shorten(event.payload_hash)}
                    </div>

                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <Badge variant="outline" className={cn("text-[9px] px-1 py-0 h-4 rounded-sm border", config.bg, config.color)}>
                        {event.status}
                      </Badge>
                      <span className="truncate">{event.message}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </aside>
    </>
  );
}

function DetailRow({ icon, label, value, fullValue }: { icon: React.ReactNode; label: string; value: string; fullValue?: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    const textToCopy = fullValue || value;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-1 group">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          {icon}
          <span className="font-semibold tracking-wide uppercase text-[10px]">{label}</span>
        </div>
        <button
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted/50 rounded-md"
          title="Copy to clipboard"
        >
          {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
        </button>
      </div>
      <span className="text-sm font-mono text-foreground break-all" title={fullValue || value}>
        {value}
      </span>
    </div>
  );
}
