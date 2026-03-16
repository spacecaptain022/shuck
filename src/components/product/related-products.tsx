import { getRelatedProducts } from "@/lib/data/products";
import { ProductCard } from "@/components/shop/product-card";

type Props = {
  currentSlug: string;
  category: "tee" | "hat";
};

export async function RelatedProducts({ currentSlug, category }: Props) {
  const products = await getRelatedProducts(currentSlug, category, 4);

  if (products.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-lg font-semibold tracking-tight mb-6">You might also like</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
