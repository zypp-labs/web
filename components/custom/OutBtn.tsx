"use client";

import React, { ReactNode } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface OutBtnProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export const OutBtn = ({
  children,
  onClick,
  disabled = false,
  type = "button",
  className,
}: OutBtnProps) => {
  return (
    <Button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "group min-w-fit h-10 relative overflow-hidden rounded-full flex items-center justify-center gap-3 px-5 cursor-pointer font-medium transition-all duration-500 ease-out hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border-0",
        className
      )}
      style={{
        background: `
          linear-gradient(135deg, 
            rgba(255, 255, 255, 0.1) 0%, 
            rgba(255, 255, 255, 0.05) 45%, 
            rgba(255, 255, 255, 0.1) 100%
          )
        `,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: `
          inset 1px 1px 0px rgba(255, 255, 255, 0.2),
          inset -1px -1px 0px rgba(0, 0, 0, 0.1),
          0 8px 32px rgba(0, 0, 0, 0.2),
          0 2px 8px rgba(0, 0, 0, 0.1)
        `,
      }}
    >
      {/* Enhanced glossy overlay with animation */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `
            linear-gradient(135deg, 
              rgba(255, 255, 255, 0.2) 0%, 
              rgba(255, 255, 255, 0.1) 50%, 
              rgba(255, 255, 255, 0.05) 100%
            )
          `,
          pointerEvents: "none",
        }}
      />

      {/* Animated gradient border on hover */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"
        style={{
          background: `
            linear-gradient(135deg, 
              rgba(148, 255, 205, 0.4) 0%, 
              rgba(100, 255, 218, 0.3) 25%, 
              rgba(64, 255, 196, 0.2) 50%, 
              rgba(148, 255, 205, 0.4) 100%
            )
          `,
          padding: "1px",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "subtract",
          WebkitMaskComposite: "subtract",
          pointerEvents: "none",
        }}
      />

      {/* Floating particles effect */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-2xl overflow-hidden"
        style={{
          pointerEvents: "none",
        }}
      >
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-1000"
            style={{
              width: `${4 + i * 2}px`,
              height: `${4 + i * 2}px`,
              top: `${20 + i * 20}%`,
              left: `${10 + i * 30}%`,
              animation: `float-${i} 4s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
              filter: "blur(0.5px)",
            }}
          />
        ))}
      </div>

      {/* Shimmer effect on hover */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `
            linear-gradient(90deg, 
              transparent 0%, 
              rgba(255, 255, 255, 0.1) 50%, 
              transparent 100%
            )
          `,
          transform: "translateX(-100%)",
          animation: "shimmer 2s infinite",
          pointerEvents: "none",
        }}
      />

      {/* Content with enhanced typography */}
      <div className="relative z-20 flex flex-row items-center justify-center gap-3">
        <span
          className="font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-green-50 to-emerald-100 bg-clip-text text-transparent drop-shadow-sm"
          style={{
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
          }}
        >
          {children}
        </span>
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes float-0 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(10px, -5px) rotate(180deg);
          }
        }

        @keyframes float-1 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(-8px, 8px) rotate(-180deg);
          }
        }

        @keyframes float-2 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(12px, 4px) rotate(90deg);
          }
        }

        /* Enhanced focus state */
        button:focus-visible {
          outline: 2px solid rgba(148, 255, 205, 0.6);
          outline-offset: 2px;
        }

        /* Smooth state transitions */
        button {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        button:hover {
          transform: translateY(-2px) scale(1.02);
        }

        button:active {
          transform: translateY(0) scale(0.98);
        }
      `}</style>
    </Button>
  );
};
