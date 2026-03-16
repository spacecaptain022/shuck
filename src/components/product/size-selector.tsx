"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

type SizeSelectorProps = {
  sizes: string[];
  selectedSize: string;
  variants: { color: string; size: string; stockQuantity: number }[];
  selectedColor: string;
  onSelect: (size: string) => void;
};

const SIZE_LABELS: Record<string, string> = {
  xs: "XS",
  s: "S",
  m: "M",
  l: "L",
  xl: "XL",
  xxl: "XXL",
  one_size: "One Size",
};

export function SizeSelector({
  sizes,
  selectedSize,
  variants,
  selectedColor,
  onSelect,
}: SizeSelectorProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold">
          Size: <span className="font-normal text-muted-foreground">{SIZE_LABELS[selectedSize]}</span>
        </p>
        <Link href="/size-guide" className="text-xs text-muted-foreground hover:text-foreground underline-offset-2 hover:underline transition-colors">
          Size Guide
        </Link>
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => {
          const variant = variants.find(
            (v) => v.color === selectedColor && v.size === size
          );
          const inStock = (variant?.stockQuantity ?? 0) > 0;
          const isSelected = selectedSize === size;

          return (
            <button
              key={size}
              onClick={() => inStock && onSelect(size)}
              disabled={!inStock}
              className={cn(
                "h-10 min-w-[48px] px-3 rounded-xl border text-sm font-medium transition-all",
                isSelected
                  ? "bg-foreground text-background border-foreground"
                  : inStock
                  ? "border-border hover:border-foreground/50 hover:bg-secondary"
                  : "border-border text-muted-foreground/50 cursor-not-allowed line-through"
              )}
            >
              {SIZE_LABELS[size] ?? size.toUpperCase()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
