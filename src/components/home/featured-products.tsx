import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProductCard } from "@/components/shop/product-card";
import type { ProductCardItem } from "@/types/product";

export function FeaturedProducts({ products }: { products: ProductCardItem[] }) {
  if (products.length === 0) return null;

  const bestSellers = products.slice(0, 3);
  const latestArrivals = products.slice(0, 2);

  return (
    <>
      {/* BEST SELLER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-baseline justify-between border-t-2 border-foreground pt-4 mb-8">
          <h2 className="font-display text-[clamp(1.8rem,5vw,3.5rem)] font-bold uppercase tracking-tight leading-none">
            Best Seller
          </h2>
          <Link
            href="/shop"
            className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.1em] hover:opacity-50 transition-opacity"
          >
            See all <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border">
          {bestSellers.map((product) => (
            <div key={product.id} className="bg-background">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* LATEST ARRIVALS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-baseline justify-between border-t-2 border-foreground pt-4 mb-8">
          <h2 className="font-display text-[clamp(1.8rem,5vw,3.5rem)] font-bold uppercase tracking-tight leading-none">
            Latest Arrivals
          </h2>
          <Link
            href="/shop"
            className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.1em] hover:opacity-50 transition-opacity"
          >
            See all <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {latestArrivals.map((product) => (
            <div key={product.id} className="bg-background">
              <ProductCard product={product} variant="large" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
