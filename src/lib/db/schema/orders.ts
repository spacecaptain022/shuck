import {
  integer,
  jsonb,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { fulfillmentStatusEnum, paymentStatusEnum } from "./enums";
import { products, productVariants } from "./products";

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),

  stripeCheckoutSessionId: text("stripe_checkout_session_id").notNull().unique(),
  stripePaymentIntentId: text("stripe_payment_intent_id"),

  customerEmail: text("customer_email").notNull(),
  customerName: text("customer_name"),

  subtotal: numeric("subtotal", { precision: 10, scale: 2 }).notNull(),
  taxTotal: numeric("tax_total", { precision: 10, scale: 2 }).notNull().default("0"),
  shippingTotal: numeric("shipping_total", { precision: 10, scale: 2 }).notNull().default("0"),
  orderTotal: numeric("order_total", { precision: 10, scale: 2 }).notNull(),

  currency: text("currency").notNull().default("usd"),
  paymentStatus: paymentStatusEnum("payment_status").notNull().default("pending"),
  fulfillmentStatus: fulfillmentStatusEnum("fulfillment_status")
    .notNull()
    .default("unfulfilled"),

  trackingNumber: text("tracking_number"),
  trackingCarrier: text("tracking_carrier"),

  shippingAddressJson: jsonb("shipping_address_json"),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const orderItems = pgTable("order_items", {
  id: uuid("id").defaultRandom().primaryKey(),

  orderId: uuid("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),

  productId: uuid("product_id").references(() => products.id, {
    onDelete: "set null",
  }),

  variantId: uuid("variant_id").references(() => productVariants.id, {
    onDelete: "set null",
  }),

  productNameSnapshot: text("product_name_snapshot").notNull(),
  variantNameSnapshot: text("variant_name_snapshot").notNull(),

  quantity: integer("quantity").notNull(),
  unitPrice: numeric("unit_price", { precision: 10, scale: 2 }).notNull(),
  lineTotal: numeric("line_total", { precision: 10, scale: 2 }).notNull(),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
