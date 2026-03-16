import { ProductCard } from "./product-card";
import type { ProductCardItem } from "@/types/product";

export function ProductGrid({ products }: { products: ProductCardItem[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-lg font-medium">Nothing here yet.</p>
        <p className="text-sm text-muted-foreground mt-2">Check back soon.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
