import { ProductGridSkeleton } from "@/components/shop/product-grid-skeleton";

export default function ShopLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Shop</h1>
        <p className="text-muted-foreground mt-1 text-sm">All products</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="h-9" />
      </div>

      <ProductGridSkeleton />
    </div>
  );
}
