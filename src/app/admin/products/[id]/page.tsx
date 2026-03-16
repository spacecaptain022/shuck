import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eq, asc } from "drizzle-orm";
import { db, products, productVariants, productMedia } from "@/lib/db";
import { ProductEditForm } from "./product-edit-form";
import { VariantManager } from "@/components/admin/variant-manager";
import { ImageManager } from "@/components/admin/image-manager";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Edit Product — Admin" };

type Props = { params: Promise<{ id: string }> };

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;

  const [product] = await db.select().from(products).where(eq(products.id, id)).limit(1);

  if (!product) notFound();

  const variants = await db
    .select()
    .from(productVariants)
    .where(eq(productVariants.productId, id));

  const media = await db
    .select()
    .from(productMedia)
    .where(eq(productMedia.productId, id))
    .orderBy(asc(productMedia.sortOrder));

  return (
    <div className="max-w-3xl space-y-8">
      <h1 className="text-2xl font-bold">Edit Product</h1>

      {/* Product form */}
      <div className="rounded-3xl border border-border p-6">
        <ProductEditForm product={product} />
      </div>

      {/* Image manager */}
      <ImageManager productId={id} initialMedia={media} />

      {/* Variant manager */}
      <VariantManager productId={id} initialVariants={variants} />
    </div>
  );
}
