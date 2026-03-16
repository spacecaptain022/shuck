import { and, asc, desc, eq, ne } from "drizzle-orm";
import { db, productMedia, products, productVariants } from "@/lib/db";
import type { ProductCardItem } from "@/types/product";

export async function getAllActiveProducts() {
  return db
    .select()
    .from(products)
    .where(eq(products.status, "active"));
}

export async function getFeaturedProducts() {
  return db
    .select()
    .from(products)
    .where(eq(products.featured, true));
}

export async function getProductsByCategory(category: "tee" | "hat") {
  return db
    .select()
    .from(products)
    .where(eq(products.category, category));
}

export async function getFeaturedProductCards(): Promise<ProductCardItem[]> {
  const featuredProducts = await db
    .select()
    .from(products)
    .where(eq(products.featured, true));

  const activeProducts = featuredProducts.filter((p) => p.status === "active");

  const results: ProductCardItem[] = [];

  for (const product of activeProducts.slice(0, 4)) {
    const [defaultVariant] = await db
      .select()
      .from(productVariants)
      .where(eq(productVariants.productId, product.id))
      .orderBy(desc(productVariants.isDefault))
      .limit(1);

    const [primaryMedia] = await db
      .select()
      .from(productMedia)
      .where(eq(productMedia.productId, product.id))
      .orderBy(asc(productMedia.sortOrder))
      .limit(1);

    results.push({
      id: product.id,
      name: product.name,
      slug: product.slug,
      category: product.category,
      featured: product.featured,
      price: defaultVariant ? Number(defaultVariant.price) : 0,
      imageUrl: primaryMedia?.url ?? "/placeholder.jpg",
      color: defaultVariant?.color,
    });
  }

  return results;
}

export async function getProductCards(filters?: {
  category?: string;
  sort?: string;
}): Promise<ProductCardItem[]> {
  const allProducts = await db
    .select()
    .from(products)
    .where(eq(products.status, "active"));

  let filtered = allProducts;

  if (filters?.category && (filters.category === "tee" || filters.category === "hat")) {
    filtered = filtered.filter((p) => p.category === filters.category);
  }

  const results: ProductCardItem[] = [];

  for (const product of filtered) {
    const [defaultVariant] = await db
      .select()
      .from(productVariants)
      .where(eq(productVariants.productId, product.id))
      .orderBy(desc(productVariants.isDefault))
      .limit(1);

    const [primaryMedia] = await db
      .select()
      .from(productMedia)
      .where(eq(productMedia.productId, product.id))
      .orderBy(asc(productMedia.sortOrder))
      .limit(1);

    results.push({
      id: product.id,
      name: product.name,
      slug: product.slug,
      category: product.category,
      featured: product.featured,
      price: defaultVariant ? Number(defaultVariant.price) : 0,
      imageUrl: primaryMedia?.url ?? "/placeholder.jpg",
      color: defaultVariant?.color,
    });
  }

  if (filters?.sort === "price_asc") {
    results.sort((a, b) => a.price - b.price);
  } else if (filters?.sort === "price_desc") {
    results.sort((a, b) => b.price - a.price);
  }

  return results;
}

export async function getRelatedProducts(
  slug: string,
  category: string,
  limit = 4
): Promise<ProductCardItem[]> {
  const relatedProducts = await db
    .select()
    .from(products)
    .where(
      and(
        eq(products.status, "active"),
        eq(products.category, category as "tee" | "hat"),
        ne(products.slug, slug)
      )
    )
    .limit(limit);

  const results: ProductCardItem[] = [];

  for (const product of relatedProducts) {
    const [defaultVariant] = await db
      .select()
      .from(productVariants)
      .where(eq(productVariants.productId, product.id))
      .orderBy(desc(productVariants.isDefault))
      .limit(1);

    const [primaryMedia] = await db
      .select()
      .from(productMedia)
      .where(eq(productMedia.productId, product.id))
      .orderBy(asc(productMedia.sortOrder))
      .limit(1);

    results.push({
      id: product.id,
      name: product.name,
      slug: product.slug,
      category: product.category,
      featured: product.featured,
      price: defaultVariant ? Number(defaultVariant.price) : 0,
      imageUrl: primaryMedia?.url ?? "/placeholder.jpg",
      color: defaultVariant?.color,
    });
  }

  return results;
}

export async function getProductBySlug(slug: string) {
  const product = await db.query.products.findFirst({
    where: (p, { eq }) => eq(p.slug, slug),
  });

  if (!product) return null;

  const variants = await db
    .select()
    .from(productVariants)
    .where(eq(productVariants.productId, product.id));

  const media = await db
    .select()
    .from(productMedia)
    .where(eq(productMedia.productId, product.id))
    .orderBy(asc(productMedia.sortOrder));

  return { ...product, variants, media };
}
