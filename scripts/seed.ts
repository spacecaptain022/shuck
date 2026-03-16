/**
 * SHUCK product seed script
 *
 * Usage: npx tsx scripts/seed.ts
 *
 * Requires DATABASE_URL in .env.local
 * Requires products to have real Stripe Price IDs — update stripePriceId values
 * before running against a live database.
 */

import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { products, productVariants, productMedia } from "../src/lib/db/schema/products";

const client = postgres(process.env.DATABASE_URL!, { prepare: false });
const db = drizzle(client);

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80";
const PLACEHOLDER_HAT = "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80";

// Replace these with real Stripe Price IDs before using in production
const PLACEHOLDER_PRICE_ID = "price_placeholder";

async function seed() {
  console.log("Seeding SHUCK products...");

  // ─── Tee 1: Marsh Tee ────────────────────────────────────────────────────
  const [marshTee] = await db
    .insert(products)
    .values({
      name: "Marsh Tee",
      slug: "marsh-tee",
      category: "tee",
      status: "active",
      featured: true,
      description:
        "Heavyweight everyday tee with a clean fit and broken-in feel. Built to wear hard and age right. 100% ring-spun cotton with a slightly oversized cut.",
      shortDescription: "Heavyweight everyday tee. Built to age right.",
      material: "100% ring-spun cotton, 6.5 oz",
      fitNote: "Relaxed but structured. True to size. Size down for a more fitted look.",
      shippingNote: "Ships in 2–4 business days.",
      careInstructions: "Machine wash cold, tumble dry low. Do not bleach.",
      collection: "Core",
    })
    .returning({ id: products.id });

  await db.insert(productVariants).values([
    { productId: marshTee.id, name: "Olive / S", color: "Olive", size: "s", sku: "MARSH-OLV-S", price: "38.00", stockQuantity: 12, stripePriceId: PLACEHOLDER_PRICE_ID, isDefault: false },
    { productId: marshTee.id, name: "Olive / M", color: "Olive", size: "m", sku: "MARSH-OLV-M", price: "38.00", stockQuantity: 20, stripePriceId: PLACEHOLDER_PRICE_ID, isDefault: true },
    { productId: marshTee.id, name: "Olive / L", color: "Olive", size: "l", sku: "MARSH-OLV-L", price: "38.00", stockQuantity: 18, stripePriceId: PLACEHOLDER_PRICE_ID, isDefault: false },
    { productId: marshTee.id, name: "Olive / XL", color: "Olive", size: "xl", sku: "MARSH-OLV-XL", price: "38.00", stockQuantity: 10, stripePriceId: PLACEHOLDER_PRICE_ID, isDefault: false },
    { productId: marshTee.id, name: "Bone / S", color: "Bone", size: "s", sku: "MARSH-BNE-S", price: "38.00", stockQuantity: 8, stripePriceId: PLACEHOLDER_PRICE_ID, isDefault: false },
    { productId: marshTee.id, name: "Bone / M", color: "Bone", size: "m", sku: "MARSH-BNE-M", price: "38.00", stockQuantity: 15, stripePriceId: PLACEHOLDER_PRICE_ID, isDefault: false },
    { productId: marshTee.id, name: "Bone / L", color: "Bone", size: "l", sku: "MARSH-BNE-L", price: "38.00", stockQuantity: 14, stripePriceId: PLACEHOLDER_PRICE_ID, isDefault: false },
    { productId: marshTee.id, name: "Bone / XL", color: "Bone", size: "xl", sku: "MARSH-BNE-XL", price: "38.00", stockQuantity: 6, stripePriceId: PLACEHOLDER_PRICE_ID, isDefault: false },
  ]);

  await db.insert(productMedia).values([
    { productId: marshTee.id, url: PLACEHOLDER_IMAGE, altText: "Marsh Tee — front", sortOrder: 0 },
    { productId: marshTee.id, url: PLACEHOLDER_IMAGE, altText: "Marsh Tee — back", sortOrder: 1 },
  ]);

  console.log("  ✓ Marsh Tee");

  // ─── Tee 2: Delta Tee ────────────────────────────────────────────────────
  const [deltaTee] = await db
    .insert(products)
    .values({
      name: "Delta Tee",
      slug: "delta-tee",
      category: "tee",
      status: "active",
      featured: true,
      description:
        "A medium-weight essential with a clean chest and a slightly tapered body. Versatile enough for everyday, sharp enough for going out.",
      shortDescription: "Medium-weight essential tee. Clean and sharp.",
      material: "50% cotton, 50% polyester, 5.5 oz",
      fitNote: "Slightly tapered. Size up if you prefer a looser fit.",
      shippingNote: "Ships in 2–4 business days.",
      careInstructions: "Machine wash cold, tumble dry low.",
      collection: "Core",
    })
    .returning({ id: products.id });

  await db.insert(productVariants).values([
    { productId: deltaTee.id, name: "Charcoal / S", color: "Charcoal", size: "s", sku: "DELTA-CHR-S", price: "34.00", stockQuantity: 10, stripePriceId: PLACEHOLDER_PRICE_ID, isDefault: false },
    { productId: deltaTee.id, name: "Charcoal / M", color: "Charcoal", size: "m", sku: "DELTA-CHR-M", price: "34.00", stockQuantity: 22, stripePriceId: PLACEHOLDER_PRICE_ID, isDefault: true },
    { productId: deltaTee.id, name: "Charcoal / L", color: "Charcoal", size: "l", sku: "DELTA-CHR-L", price: "34.00", stockQuantity: 16, stripePriceId: PLACEHOLDER_PRICE_ID, isDefault: false },
    { productId: deltaTee.id, name: "Charcoal / XL", color: "Charcoal", size: "xl", sku: "DELTA-CHR-XL", price: "34.00", stockQuantity: 8, stripePriceId: PLACEHOLDER_PRICE_ID, isDefault: false },
    { productId: deltaTee.id, name: "White / M", color: "White", size: "m", sku: "DELTA-WHT-M", price: "34.00", stockQuantity: 12, stripePriceId: PLACEHOLDER_PRICE_ID, isDefault: false },
    { productId: deltaTee.id, name: "White / L", color: "White", size: "l", sku: "DELTA-WHT-L", price: "34.00", stockQuantity: 10, stripePriceId: PLACEHOLDER_PRICE_ID, isDefault: false },
  ]);

  await db.insert(productMedia).values([
    { productId: deltaTee.id, url: PLACEHOLDER_IMAGE, altText: "Delta Tee — front", sortOrder: 0 },
    { productId: deltaTee.id, url: PLACEHOLDER_IMAGE, altText: "Delta Tee — back", sortOrder: 1 },
  ]);

  console.log("  ✓ Delta Tee");

  // ─── Tee 3: Lowland Tee ──────────────────────────────────────────────────
  const [lowlandTee] = await db
    .insert(products)
    .values({
      name: "Lowland Tee",
      slug: "lowland-tee",
      category: "tee",
      status: "active",
      featured: false,
      description:
        "A washed cotton tee with a faded, lived-in feel right out of the bag. Soft hand, medium weight, built for long days.",
      shortDescription: "Washed cotton with a lived-in feel.",
      material: "100% washed cotton, 5.8 oz",
      fitNote: "Relaxed fit. True to size.",
      shippingNote: "Ships in 2–4 business days.",
      careInstructions: "Machine wash cold, hang dry for best results.",
      collection: "Core",
    })
    .returning({ id: products.id });

  await db.insert(productVariants).values([
    { productId: lowlandTee.id, name: "Rust / S", color: "Rust", size: "s", sku: "LOW-RST-S", price: "36.00", stockQuantity: 7, stripePriceId: PLACEHOLDER_PRICE_ID, isDefault: false },
    { productId: lowlandTee.id, name: "Rust / M", color: "Rust", size: "m", sku: "LOW-RST-M", price: "36.00", stockQuantity: 14, stripePriceId: PLACEHOLDER_PRICE_ID, isDefault: true },
    { productId: lowlandTee.id, name: "Rust / L", color: "Rust", size: "l", sku: "LOW-RST-L", price: "36.00", stockQuantity: 12, stripePriceId: PLACEHOLDER_PRICE_ID, isDefault: false },
    { productId: lowlandTee.id, name: "Rust / XL", color: "Rust", size: "xl", sku: "LOW-RST-XL", price: "36.00", stockQuantity: 5, stripePriceId: PLACEHOLDER_PRICE_ID, isDefault: false },
  ]);

  await db.insert(productMedia).values([
    { productId: lowlandTee.id, url: PLACEHOLDER_IMAGE, altText: "Lowland Tee — front", sortOrder: 0 },
  ]);

  console.log("  ✓ Lowland Tee");

  // ─── Hat 1: Bayou Cap ────────────────────────────────────────────────────
  const [bayouCap] = await db
    .insert(products)
    .values({
      name: "Bayou Cap",
      slug: "bayou-cap",
      category: "hat",
      status: "active",
      featured: true,
      description:
        "A structured 6-panel cap with a mid-profile crown and a flat bill. Clean SHUCK wordmark embroidered on front. Built to last.",
      shortDescription: "Structured 6-panel. Embroidered wordmark.",
      material: "100% chino cotton twill",
      fitNote: "One size fits most. Adjustable snapback closure.",
      shippingNote: "Ships in 2–4 business days.",
      careInstructions: "Spot clean only.",
      collection: "Core",
    })
    .returning({ id: products.id });

  await db.insert(productVariants).values([
    { productId: bayouCap.id, name: "Olive / One Size", color: "Olive", size: "one_size", sku: "BAYU-OLV-OS", price: "32.00", stockQuantity: 25, stripePriceId: PLACEHOLDER_PRICE_ID, isDefault: true },
    { productId: bayouCap.id, name: "Black / One Size", color: "Black", size: "one_size", sku: "BAYU-BLK-OS", price: "32.00", stockQuantity: 20, stripePriceId: PLACEHOLDER_PRICE_ID, isDefault: false },
    { productId: bayouCap.id, name: "Bone / One Size", color: "Bone", size: "one_size", sku: "BAYU-BNE-OS", price: "32.00", stockQuantity: 18, stripePriceId: PLACEHOLDER_PRICE_ID, isDefault: false },
  ]);

  await db.insert(productMedia).values([
    { productId: bayouCap.id, url: PLACEHOLDER_HAT, altText: "Bayou Cap — front", sortOrder: 0 },
    { productId: bayouCap.id, url: PLACEHOLDER_HAT, altText: "Bayou Cap — side", sortOrder: 1 },
  ]);

  console.log("  ✓ Bayou Cap");

  // ─── Hat 2: Cane Hat ─────────────────────────────────────────────────────
  const [caneHat] = await db
    .insert(products)
    .values({
      name: "Cane Hat",
      slug: "cane-hat",
      category: "hat",
      status: "active",
      featured: false,
      description:
        "A relaxed low-profile dad hat with a worn, faded finish. The softer, more broken-in option. Curved bill, unstructured crown.",
      shortDescription: "Low-profile dad hat. Relaxed and broken-in.",
      material: "100% washed cotton",
      fitNote: "One size fits most. Adjustable strap closure.",
      shippingNote: "Ships in 2–4 business days.",
      careInstructions: "Spot clean only.",
      collection: "Core",
    })
    .returning({ id: products.id });

  await db.insert(productVariants).values([
    { productId: caneHat.id, name: "Khaki / One Size", color: "Khaki", size: "one_size", sku: "CANE-KHK-OS", price: "28.00", stockQuantity: 30, stripePriceId: PLACEHOLDER_PRICE_ID, isDefault: true },
    { productId: caneHat.id, name: "Slate / One Size", color: "Slate", size: "one_size", sku: "CANE-SLT-OS", price: "28.00", stockQuantity: 22, stripePriceId: PLACEHOLDER_PRICE_ID, isDefault: false },
  ]);

  await db.insert(productMedia).values([
    { productId: caneHat.id, url: PLACEHOLDER_HAT, altText: "Cane Hat — front", sortOrder: 0 },
  ]);

  console.log("  ✓ Cane Hat");

  console.log("\nSeed complete. 5 products inserted.");
  await client.end();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
