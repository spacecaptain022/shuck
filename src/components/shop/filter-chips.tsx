"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const FILTERS = [
  { label: "All", value: "", href: "/shop" },
  { label: "Tees", value: "tee", href: "/shop?category=tee" },
  { label: "Hats", value: "hat", href: "/shop?category=hat" },
];

export function FilterChips() {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") ?? "";

  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map((filter) => {
        const isActive = currentCategory === filter.value;
        return (
          <Link
            key={filter.value}
            href={filter.href}
            className={cn(
              "inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium transition-colors border",
              isActive
                ? "bg-foreground text-background border-foreground"
                : "bg-transparent text-foreground border-border hover:bg-muted"
            )}
          >
            {filter.label}
          </Link>
        );
      })}
    </div>
  );
}
