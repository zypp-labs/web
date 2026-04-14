import React from "react";

import { cn } from "@/lib/utils";

export interface OrbitingCirclesProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
  iconSize?: number;
  speed?: number;
  interactive?: boolean;
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  interactive = false,
  ...props
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed;
  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-[#00E35B]/70 stroke-4 dark:stroke-white"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}
      {React.Children.map(children, (child, index) => {
        const angle = (360 / React.Children.count(children)) * index;
        return (
          // outer wrapper centers the origin for the orbit animation
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
              interactive ? "" : "pointer-events-none"
            }`}
            {...props}
          >
            <div
              style={
                {
                  "--duration": `${calculatedDuration}`,
                  "--radius": `${radius}`,
                  "--angle": `${angle}`,
                  "--icon-size": `${iconSize}px`,
                } as React.CSSProperties
              }
              className={cn(
                `animate-orbit transform-gpu flex items-center justify-center rounded-full`,
                { "direction-[reverse]": reverse },
                className
              )}
            >
              <div
                style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
                className={`flex items-center justify-center ${
                  interactive ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                {child}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
