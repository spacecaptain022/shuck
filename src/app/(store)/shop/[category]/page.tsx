import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/shop/product-grid";
import type { ProductCardItem } from "@/types/product";

const VALID_CATEGORIES = ["tee", "hat"] as const;
type Category = (typeof VALID_CATEGORIES)[number];

const CATEGORY_LABELS: Record<Category, string> = {
  tee: "Tees",
  hat: "Hats",
};

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  if (!VALID_CATEGORIES.includes(category as Category)) return {};
  return { title: CATEGORY_LABELS[category as Category] };
}

async function getProductsByCategory(category: Category): Promise<ProductCardItem[]> {
  // TODO: wire up to DB
  return [];
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  if (!VALID_CATEGORIES.includes(category as Category)) {
    notFound();
  }

  const products = await getProductsByCategory(category as Category);
  const label = CATEGORY_LABELS[category as Category];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{label}</h1>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
