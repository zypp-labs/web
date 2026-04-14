"use client";

import React, { ReactNode } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface MainBtnProps {
  children: ReactNode;
  onClick?: (e?: React.MouseEvent) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export const MainBtn = ({
  children,
  onClick,
  disabled = false,
  type = "button",
  className,
}: MainBtnProps) => {
  return (
    <Button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "group min-w-fit h-10 border-2 border-neutral-700/20 relative overflow-hidden rounded-full flex items-center justify-center gap-2 px-6 cursor-pointer font-medium text-white transition-all duration-300 ease-out hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
        className
      )}
      style={{
        background: "linear-gradient(135deg, #00E35B 0%, #00C247 100%)",
        boxShadow: `
          inset 0 1px 0 rgba(255,255,255,0.4),
          inset 0 -2px 6px rgba(0, 0, 0, 0.2),
          0 4px 12px rgba(0, 226, 91, 0.3)
        `,
      }}
    >
      {/* Glossy overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          top: "0",
          width: "140%",
          zIndex: 2,
          height: "60%",
          borderRadius: "50%",
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Shine effect on hover */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)",
          backgroundSize: "200% 100%",
          animation: "shine 2s infinite linear",
          pointerEvents: "none",
        }}
      />

      {/* Ripple effect container */}
      <div className="absolute inset-0 overflow-hidden rounded-full">
        <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
      </div>

      {/* Content wrapper with flex layout */}
      <div className="relative z-10 flex items-center justify-center gap-2 text-current drop-shadow-sm">
        {children}
      </div>

      {/* Add CSS animation for shine effect */}
      <style jsx>{`
        @keyframes shine {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </Button>
  );
};
