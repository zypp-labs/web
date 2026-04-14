"use client";

import * as React from "react";
import type { TransactionEvent } from "./RightPanel";

interface OpsMetrics {
  counts: {
    queued: string;
    sent: string;
    confirmed: string;
    failed: string;
    total: string;
  };
  economics: {
    fees_collected_usdc: string;
    transfer_total_usdc: string;
    avg_confirmed_fee_usdc: string;
  };
  abuseTrackedIps: number;
}

interface MonitorContextType {
  hoveredTxId: string | null;
  setHoveredTxId: (id: string | null) => void;
  transactions: TransactionEvent[];
  metrics: OpsMetrics | null;
  isLoading: boolean;
}

const MonitorContext = React.createContext<MonitorContextType | undefined>(undefined);

export function MonitorProvider({ children }: { children: React.ReactNode }) {
  const [hoveredTxId, setHoveredTxId] = React.useState<string | null>(null);
  const [transactions, setTransactions] = React.useState<TransactionEvent[]>([]);
  const [metrics, setMetrics] = React.useState<OpsMetrics | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        // Fetch both concurrently
        const [txRes, metricsRes] = await Promise.all([
          fetch("/api/monitor/transactions?limit=15"),
          fetch("/api/monitor/metrics")
        ]);

        if (txRes.ok && isMounted) {
          const txData = await txRes.json();
          // Transform DB rows to TransactionEvent
          if (txData.transactions) {
            const formattedTxs = txData.transactions.map((tx: any) => {
              // Map backend status to UI semantic status
              let uiStatus = "LOCKED";
              const dbStatus = tx.status?.toLowerCase();
              if (dbStatus === "queued") uiStatus = "LOCKED";
              else if (dbStatus === "sent") uiStatus = "RELAYING";
              else if (dbStatus === "confirmed") uiStatus = "CONFIRMED";
              else if (dbStatus === "failed") uiStatus = "FAILED";

              return {
                id: tx.id,
                payload_hash: tx.payload_hash,
                status: uiStatus,
                timestamp: new Date(tx.created_at).toLocaleTimeString([], { hour12: false }),
                message: tx.last_error || (dbStatus === "queued" ? "Intent received and queued" : dbStatus === "sent" ? "Broadcasting to Solana RPCs" : `Transaction ${tx.status}`),
                intent_sender: tx.intent_sender,
                intent_receiver: tx.intent_receiver,
                intent_nonce: tx.intent_nonce,
                intent_type: tx.intent_type,
                intent_fee: tx.intent_fee,
                intent_total: tx.intent_total,
                intent_currency: tx.intent_currency,
                tx_signature: tx.tx_signature,
                rpc_endpoint_used: tx.rpc_endpoint_used,
                last_error: tx.last_error,
              };
            });
            setTransactions(formattedTxs);
          }
        }

        if (metricsRes.ok && isMounted) {
          const metricsData = await metricsRes.json();
          setMetrics(metricsData);
        }

      } catch (err) {
        console.error("Monitor fetch error:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchData();
    // Poll every 3 seconds
    const interval = setInterval(fetchData, 3000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <MonitorContext.Provider value={{ hoveredTxId, setHoveredTxId, transactions, metrics, isLoading }}>
      {children}
    </MonitorContext.Provider>
  );
}

export function useMonitor() {
  const context = React.useContext(MonitorContext);
  if (context === undefined) {
    throw new Error("useMonitor must be used within a MonitorProvider");
  }
  return context;
}
