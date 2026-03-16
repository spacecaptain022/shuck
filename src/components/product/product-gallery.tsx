"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Media = {
  id: string;
  url: string;
  altText?: string | null;
  sortOrder: number;
};

export function ProductGallery({ media, name }: { media: Media[]; name: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = media[activeIndex];

  if (!media.length) {
    return (
      <div className="aspect-[4/5] rounded-3xl bg-secondary flex items-center justify-center">
        <p className="text-muted-foreground text-sm">No images</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-secondary">
        <Image
          src={active.url}
          alt={active.altText ?? name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnails */}
      {media.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {media.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "relative flex-shrink-0 h-16 w-14 rounded-2xl overflow-hidden bg-secondary transition-all",
                activeIndex === i
                  ? "ring-2 ring-foreground ring-offset-2"
                  : "opacity-50 hover:opacity-80"
              )}
            >
              <Image
                src={item.url}
                alt={item.altText ?? `${name} ${i + 1}`}
                fill
                className="object-cover"
                sizes="56px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
