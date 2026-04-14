/* eslint-disable @next/next/no-img-element */
"use client";

import { cn } from "@/lib/utils";

interface Avatar {
  imageUrl: string;
//   profileUrl: string;
}
interface AvatarCirclesProps {
  className?: string;
  numPeople?: number;
  avatarUrls: Avatar[];
}

export const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls,
}: AvatarCirclesProps) => {
  return (
    <div className={cn("z-10 flex -space-x-4 rtl:space-x-reverse", className)}>
      {avatarUrls.map((url, index) => (
        <span
          key={index}
        //   href={url.profileUrl}
        //   target="_blank"
          rel="noopener noreferrer cursor-pointer"
        >
          <img
            key={index}
            className="h-10 w-10 rounded-full border-2 border-neutral-800 cursor-pointer"
            src={url.imageUrl}
            width={40}
            height={40}
            alt={`Avatar ${index + 1}`}
          />
        </span>
      ))}
      {(numPeople ?? 0) > 0 && (
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 text-center text-xs font-medium hover:bg-neutral-600 border-neutral-800 bg-white text-black cursor-pointer transition"
        //   href=""
        >
          +{numPeople}
        </span>
      )}
    </div>
  );
};
