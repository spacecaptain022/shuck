import type { Metadata } from "next";

export const dynamic = "force-dynamic";
import { Suspense } from "react";
import { ProductGrid } from "@/components/shop/product-grid";
import { FilterChips } from "@/components/shop/filter-chips";
import { SortDropdown } from "@/components/shop/sort-dropdown";
import { getProductCards } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Shop",
  description: "Tees, hats, and everyday pieces built to wear hard.",
};

type ShopPageProps = {
  searchParams: Promise<{ category?: string; sort?: string }>;
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const filters = await searchParams;
  const products = await getProductCards(filters);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="border-t-2 border-foreground pt-4 mb-8">
        <div className="flex items-baseline justify-between">
          <h1 className="font-display text-[clamp(2rem,6vw,4rem)] font-bold uppercase tracking-tight leading-none">
            Shop
          </h1>
          <p className="text-xs text-muted-foreground">{products.length} products</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <Suspense fallback={<div className="h-9" />}>
          <FilterChips />
        </Suspense>
        <Suspense fallback={<div className="h-9 w-40" />}>
          <SortDropdown />
        </Suspense>
      </div>

      <ProductGrid products={products} />
    </div>
  );
}
