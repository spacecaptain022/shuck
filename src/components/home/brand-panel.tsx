import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function BrandPanel() {
  return (
    <section className="border-t border-border">
      {/* Full-width dark quote panel */}
      <div className="bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[11px] tracking-[0.2em] uppercase text-background/40 mb-8">The Brand</p>
            <blockquote className="font-display text-[clamp(1.6rem,4vw,3rem)] font-bold uppercase leading-tight tracking-tight mb-10">
              &ldquo;SHUCK is premium southern streetwear with a sharp edge. Built to wear hard and age right.&rdquo;
            </blockquote>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-background/60 hover:text-background transition-colors"
            >
              Read our story <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
