import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/data/products";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfoCard } from "@/components/product/product-info-card";
import { ProductAccordion } from "@/components/product/product-accordion";
import { RelatedProducts } from "@/components/product/related-products";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription ?? product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  // Coerce Drizzle string numerics to numbers for type compatibility
  const typedProduct = {
    ...product,
    variants: product.variants.map((v) => ({
      ...v,
      price: Number(v.price),
      compareAtPrice: v.compareAtPrice != null ? Number(v.compareAtPrice) : null,
    })),
  };

  const primaryImage = product.media[0]?.url ?? "/placeholder.jpg";

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
        <ProductGallery media={product.media} name={product.name} />
        <ProductInfoCard product={typedProduct} primaryImageUrl={primaryImage} />
      </div>

      <div className="mt-12 max-w-2xl">
        <ProductAccordion
          material={product.material}
          careInstructions={product.careInstructions}
          fitNote={product.fitNote}
          shippingNote={product.shippingNote}
        />
      </div>

      <RelatedProducts currentSlug={product.slug} category={product.category} />
    </div>
  );
}
