"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { TransactionEvent } from "./RightPanel";
import { Hash, User, Coins, FileSignature, AlertCircle } from "lucide-react";
import { useMonitor } from "./MonitorContext";

// Define the colors for each state
const CUBE_THEMES = {
  LOCKED: { top: "#fde047", left: "#eab308", right: "#a16207", glow: "rgba(250,204,21,0.4)" }, // Yellow
  VALIDATED: { top: "#93c5fd", left: "#3b82f6", right: "#1d4ed8", glow: "rgba(96,165,250,0.4)" }, // Blue
  RELAYING: { top: "#fdba74", left: "#f97316", right: "#c2410c", glow: "rgba(249,115,22,0.6)" }, // Orange
  CONFIRMED: { top: "#86efac", left: "#22c55e", right: "#15803d", glow: "rgba(34,197,94,0.4)" }, // Green
  FAILED: { top: "#fca5a5", left: "#ef4444", right: "#b91c1c", glow: "rgba(239,68,68,0.6)" }, // Red
};

type CubeTheme = keyof typeof CUBE_THEMES;

function shorten(str: string) {
  if (!str || str.length < 12) return str;
  return `${str.slice(0, 6)}...${str.slice(-4)}`;
}

function IsoCube({
  x, y,
  tx,
}: {
  x: number; y: number; tx: TransactionEvent;
}) {
  const theme = tx.status as CubeTheme;
  const colors = CUBE_THEMES[theme];
  const pulse = tx.status === "RELAYING" || tx.status === "FAILED";
  const { hoveredTxId, setHoveredTxId } = useMonitor();
  const isHovered = hoveredTxId === tx.id;

  // Elevate cubes slightly (Y offset) for the 3D pop effect
  const renderY = y - 12;

  return (
    <div
      className="absolute group transition-transform duration-700 ease-out"
      style={{
        left: x,
        top: renderY,
        width: 64,
        height: 72,
        zIndex: isHovered ? 9999 : y // pull to very front when hovered!
      }}
      onMouseEnter={() => setHoveredTxId(tx.id)}
      onMouseLeave={() => setHoveredTxId(null)}
    >
      {/* The Glow Effect */}
      <div
        className={cn(
          "absolute inset-0 scale-[1.5] blur-xl opacity-60 rounded-full",
          pulse && "animate-pulse"
        )}
        style={{ backgroundColor: colors.glow }}
      />

      {/* SVG Cube */}
      <svg
        width="64" height="72" viewBox="0 0 64 72"
        className={cn(
          "relative overflow-visible transition-transform duration-300 cursor-pointer drop-shadow-2xl",
          isHovered ? "-translate-y-3 scale-110" : "group-hover:-translate-y-3 group-hover:scale-110"
        )}
      >
        {/* Top Face */}
        <polygon
          points="32,0 64,16 32,32 0,16"
          fill={colors.top}
          className="transition-colors duration-500"
        />
        {/* Left Face */}
        <polygon
          points="0,16 32,32 32,72 0,56"
          fill={colors.left}
          className="transition-colors duration-500"
        />
        {/* Right Face */}
        <polygon
          points="32,32 64,16 64,56 32,72"
          fill={colors.right}
          className="transition-colors duration-500"
        />

        {/* Inner Lines for detailing */}
        <polyline points="0,16 32,32 64,16" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <line x1="32" y1="32" x2="32" y2="72" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      </svg>

      {/* Rich Floating Hover Tooltip */}
      <div className={cn(
        "absolute bottom-[80px] left-1/2 -translate-x-1/2 transition-all duration-300 pointer-events-none w-64",
        isHovered ? "opacity-100 translate-y-0 z-[10000000]" : "opacity-0 translate-y-2 -z-10"
      )}>
        <div className="bg-card/90 backdrop-blur-xl border border-border/40 p-4 rounded-xl shadow-2xl flex flex-col gap-3">

          <div className="flex items-center justify-between border-b border-border/40 pb-2">
            <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Transaction</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded border" style={{ color: colors.top, borderColor: colors.glow }}>
              {tx.status}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground flex items-center gap-1.5"><Hash className="w-3 h-3" /> Hash</span>
              <span className="font-mono text-foreground">{shorten(tx.payload_hash)}</span>
            </div>

            {tx.intent_sender && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground flex items-center gap-1.5"><User className="w-3 h-3" /> Sender</span>
                <span className="font-mono text-foreground">{shorten(tx.intent_sender)}</span>
              </div>
            )}

            {tx.intent_receiver && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground flex items-center gap-1.5"><User className="w-3 h-3" /> Receiver</span>
                <span className="font-mono text-foreground">{shorten(tx.intent_receiver)}</span>
              </div>
            )}

            {tx.intent_total && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground flex items-center gap-1.5"><Coins className="w-3 h-3" /> Amount</span>
                <span className="font-mono text-foreground">{tx.intent_total} {tx.intent_currency}</span>
              </div>
            )}

            {tx.tx_signature && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground flex items-center gap-1.5"><FileSignature className="w-3 h-3" /> Sig</span>
                <span className="font-mono text-green-400">{shorten(tx.tx_signature)}</span>
              </div>
            )}
          </div>

          {tx.last_error && (
            <div className="mt-1 p-2 bg-red-500/10 border border-red-500/20 rounded flex items-start gap-1.5 text-[10px] text-red-400">
              <AlertCircle className="w-3 h-3 shrink-0 mt-0.5" />
              <span className="font-mono leading-tight">{tx.last_error}</span>
            </div>
          )}

        </div>
        {/* Arrow pointing down */}
        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-card/90 mx-auto mt-[-1px]" />
      </div>
    </div>
  );
}

export function PipelineVisualizer() {
  const { transactions } = useMonitor();
  // Canvas transform state
  const [pan, setPan] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [isDragging, setIsDragging] = React.useState(false);
  const startPan = React.useRef({ x: 0, y: 0 });
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Center offset calculations based on actual window size
  const [centerOffset, setCenterOffset] = React.useState({ x: 600, y: 200 });

  React.useEffect(() => {
    const updateCenter = () => {
      if (typeof window !== "undefined") {
        // The pipeline spans from col 0 to col 9 (9 * tileW = 540px wide). Center is ~270px.
        // We subtract half the pipeline width to perfectly center the entire flow on screen.
        // We also shift slightly left to account for the right panel's visual weight.
        setCenterOffset({
          x: window.innerWidth / 2 - (9 * tileW) / 2 - 80,
          y: window.innerHeight / 2 - 40
        });
      }
    };
    updateCenter();
    window.addEventListener("resize", updateCenter);
    return () => window.removeEventListener("resize", updateCenter);
  }, []);

  // Grid Settings
  const tileW = 60; // wider spread for fewer boxes
  const tileH = 30;

  // Prevent default browser zoom and swipe-to-go-back
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const preventDefaultScroll = (e: WheelEvent) => {
      e.preventDefault(); // Stop browser zooming and swiping

      if (e.ctrlKey || e.metaKey) {
        // Zooming (Pinch or Ctrl+Scroll)
        const zoomSensitivity = 0.005;
        const delta = -e.deltaY * zoomSensitivity;
        setZoom(prev => Math.min(Math.max(0.2, prev + delta), 3));
      } else {
        // Panning (Two-finger drag on trackpad)
        setPan(prev => ({
          x: prev.x - e.deltaX,
          y: prev.y - e.deltaY
        }));
      }
    };

    // We MUST use a non-passive event listener to call preventDefault()
    container.addEventListener("wheel", preventDefaultScroll, { passive: false });
    return () => container.removeEventListener("wheel", preventDefaultScroll);
  }, []);

  // Handle Dragging (Mouse / Touch panning)
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startPan.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - startPan.current.x,
      y: e.clientY - startPan.current.y
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  // Map the real dummy transactions to our isometric grid stages
  // Stage columns: LOCKED(0), VALIDATED(3), RELAYING(6), CONFIRMED/FAILED(9)
  const colMap: Record<string, number> = {
    LOCKED: 0,
    VALIDATED: 3,
    RELAYING: 6,
    CONFIRMED: 9,
    FAILED: 9
  };

  const rowCounters: Record<string, number> = { LOCKED: 0, VALIDATED: 0, RELAYING: 0, CONFIRMED: 0, FAILED: 0 };

  // Calculate layout dynamically based on the transactions
  const activeNodes = transactions.map((tx: TransactionEvent) => {
    const c = colMap[tx.status];

    // To make it look like a flow, we stagger the rows slightly
    // If multiple items are in the same stage, we spread them vertically
    let r = 0;

    // Instead of using generic row numbers, stagger the items vertically around the main path
    const count = rowCounters[tx.status]++;

    // Staggering logic: 0, 2, -2, 4, -4, 6, -6, etc.
    r = count === 0 ? 0 : (count % 2 === 1 ? Math.ceil(count / 2) * 2 : -Math.ceil(count / 2) * 2);

    // Apply specific offsets for terminal states to branch them out
    if (tx.status === "FAILED") {
      r += 3; // Shift FAILED nodes down
    } else if (tx.status === "CONFIRMED") {
      r -= 3; // Shift CONFIRMED nodes up
    }

    return { tx, r, c };
  });

  // Helper to convert grid coords to absolute pixel coords
  const getCoords = (r: number, c: number) => ({
    x: centerOffset.x + (c - r) * tileW,
    y: centerOffset.y + (c + r) * tileH
  });

  // Group nodes by status to dynamically build connection paths
  const nodesByStatus: Record<string, typeof activeNodes> = {
    LOCKED: [],
    VALIDATED: [],
    RELAYING: [],
    CONFIRMED: [],
    FAILED: []
  };
  activeNodes.forEach(node => nodesByStatus[node.tx.status].push(node));

  const paths: { from: { x: number, y: number }, to: { x: number, y: number } }[] = [];

  const addConnections = (statusA: string, statusB: string) => {
    const nodesA = nodesByStatus[statusA];
    const nodesB = nodesByStatus[statusB];
    if (!nodesA.length || !nodesB.length) return;

    const primaryA = nodesA[0];
    const primaryB = nodesB[0];

    // Connect all nodes in A to the primary node of B
    nodesA.forEach(nodeA => {
      paths.push({
        from: getCoords(nodeA.r, nodeA.c),
        to: getCoords(primaryB.r, primaryB.c)
      });
    });

    // Connect the primary node of A to all remaining nodes in B
    nodesB.forEach(nodeB => {
      if (nodeB === primaryB) return; // Already connected above
      paths.push({
        from: getCoords(primaryA.r, primaryA.c),
        to: getCoords(nodeB.r, nodeB.c)
      });
    });
  };

  // Find which stages actually have nodes, so we only draw lines between active stages
  const mainSequence = ['LOCKED', 'VALIDATED', 'RELAYING'].filter(s => nodesByStatus[s].length > 0);

  // Connect the main pipeline stages dynamically
  for (let i = 0; i < mainSequence.length - 1; i++) {
    addConnections(mainSequence[i], mainSequence[i + 1]);
  }

  // Connect the last active main stage to the branches (if any)
  const lastMain = mainSequence.length > 0 ? mainSequence[mainSequence.length - 1] : null;

  if (lastMain) {
    if (nodesByStatus['CONFIRMED'].length > 0) {
      addConnections(lastMain, 'CONFIRMED');
    }
    if (nodesByStatus['FAILED'].length > 0) {
      addConnections(lastMain, 'FAILED');
    }
  }

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden touch-none overscroll-none bg-grid-white/[0.02]",
        isDragging ? "cursor-grabbing" : "cursor-grab"
      )}
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{
        backgroundPosition: `${pan.x}px ${pan.y}px`
      }}
    >
      {/* The Draggable & Zoomable Canvas Layer */}
      <div
        className="absolute inset-0 transition-transform duration-75 ease-out origin-center"
        style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}
      >
        {/* Render only if we have transactions */}
        {transactions.length > 0 && (
          <>
            {/* Animated Dotted Flow Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.2))" }}>
              <defs>
                <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
                  <stop offset="50%" stopColor="rgba(255,255,255,0.5)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
                </linearGradient>
              </defs>

              {paths.map((p, i) => {
                // Offset to center of the top face of the cube
                const startX = p.from.x + 32;
                const startY = p.from.y + 16 - 12; // -12 for elevation
                const endX = p.to.x + 32;
                const endY = p.to.y + 16 - 12;

                // Normal broken lines (straight lines)
                const d = `M ${startX} ${startY} L ${endX} ${endY}`;

                return (
                  <path
                    key={i}
                    d={d}
                    fill="none"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="2"
                    strokeDasharray="8 8"
                    className="animate-[dash-flow_2s_linear_infinite]"
                  />
                );
              })}
            </svg>

            {/* Render Only the Active Colored Transaction Cubes */}
            {activeNodes.map(({ tx, r, c }) => {
              const { x, y } = getCoords(r, c);

              return (
                <IsoCube
                  key={tx.id}
                  x={x}
                  y={y}
                  tx={tx}
                />
              );
            })}
          </>
        )}

        {/* Empty State Widget (Perfectly centered on the draggable canvas) */}
        {transactions.length === 0 && (
          <div
            className="absolute flex flex-col items-center justify-center text-muted-foreground pointer-events-none"
            style={{
              left: centerOffset.x + (tileW * 4.5), // exact middle of the 9-column pipeline
              top: centerOffset.y + (tileH * 3),    // slightly offset downwards to look balanced
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="w-24 h-24 rounded-full bg-muted/5 border border-border/10 flex items-center justify-center mb-6 shadow-2xl">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            </div>
            <h3 className="text-xl font-medium text-foreground/80 mb-2 tracking-wide">Waiting for Transactions</h3>
            <p className="text-sm max-w-sm text-center opacity-60">
              The relayer is live. New intents will appear here automatically as they flow through the pipeline.
            </p>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes dash-flow {
          from { stroke-dashoffset: 32; }
          to { stroke-dashoffset: 0; }
        }
      `}} />
    </div>
  );
}
