"use client";

import { cn } from "@/lib/utils";

type ColorSelectorProps = {
  colors: string[];
  selectedColor: string;
  onSelect: (color: string) => void;
};

export function ColorSelector({ colors, selectedColor, onSelect }: ColorSelectorProps) {
  return (
    <div>
      <p className="text-sm font-semibold mb-3">
        Color: <span className="font-normal text-muted-foreground">{selectedColor}</span>
      </p>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => onSelect(color)}
            className={cn(
              "h-9 px-4 rounded-xl border text-sm font-medium transition-all",
              selectedColor === color
                ? "bg-foreground text-background border-foreground"
                : "border-border hover:border-foreground/50 hover:bg-secondary"
            )}
          >
            {color}
          </button>
        ))}
      </div>
    </div>
  );
}
