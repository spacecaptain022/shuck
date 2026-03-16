import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const categories = [
  { num: "01", label: "Summer Tees", href: "/shop/tee", sub: "Lightweight cotton essentials" },
  { num: "02", label: "Work Shirts", href: "/shop/tee", sub: "Heavyweight utility fits" },
  { num: "03", label: "Snapbacks", href: "/shop/hat", sub: "Clean structured caps" },
  { num: "04", label: "Bucket Hats", href: "/shop/hat", sub: "Relaxed warm weather pieces" },
];

export function CategoryRow() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-baseline justify-between border-t-2 border-foreground pt-4 mb-8">
        <h2 className="font-display text-[clamp(1.8rem,5vw,3.5rem)] font-bold uppercase tracking-tight leading-none">
          Categories
        </h2>
        <Link
          href="/shop"
          className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.1em] hover:opacity-50 transition-opacity"
        >
          Browse all <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-px bg-border">
        {categories.map((cat) => (
          <Link
            key={cat.href + cat.num}
            href={cat.href}
            className="group bg-background p-5 md:p-8 flex flex-col justify-between min-h-[160px] hover:bg-secondary/50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <span className="text-xs text-muted-foreground font-mono">{cat.num}</span>
              <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <p className="font-display text-xl md:text-2xl font-bold uppercase tracking-tight mb-1">
                {cat.label}
              </p>
              <p className="text-xs text-muted-foreground">{cat.sub}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
