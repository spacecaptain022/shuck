import {
  boolean,
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import {
  mediaTypeEnum,
  productCategoryEnum,
  productStatusEnum,
  sizeEnum,
} from "./enums";

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  category: productCategoryEnum("category").notNull(),
  status: productStatusEnum("status").notNull().default("draft"),

  description: text("description").notNull(),
  shortDescription: text("short_description"),
  material: text("material"),
  fitNote: text("fit_note"),
  shippingNote: text("shipping_note"),
  careInstructions: text("care_instructions"),
  collection: text("collection"),

  featured: boolean("featured").notNull().default(false),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const productVariants = pgTable("product_variants", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),

  name: text("name").notNull(),
  color: text("color").notNull(),
  size: sizeEnum("size").notNull(),
  sku: text("sku").notNull().unique(),

  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  compareAtPrice: numeric("compare_at_price", { precision: 10, scale: 2 }),
  stockQuantity: integer("stock_quantity").notNull().default(0),

  stripePriceId: text("stripe_price_id").notNull(),
  isDefault: boolean("is_default").notNull().default(false),
  isActive: boolean("is_active").notNull().default(true),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const productMedia = pgTable("product_media", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),

  variantId: uuid("variant_id").references(() => productVariants.id, {
    onDelete: "set null",
  }),

  url: text("url").notNull(),
  altText: text("alt_text"),
  type: mediaTypeEnum("type").notNull().default("image"),
  sortOrder: integer("sort_order").notNull().default(0),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
