import { pgEnum } from "drizzle-orm/pg-core";

export const productCategoryEnum = pgEnum("product_category", ["tee", "hat"]);

export const productStatusEnum = pgEnum("product_status", [
  "draft",
  "active",
  "archived",
]);

export const fulfillmentStatusEnum = pgEnum("fulfillment_status", [
  "unfulfilled",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
]);

export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "paid",
  "failed",
  "refunded",
]);

export const mediaTypeEnum = pgEnum("media_type", ["image", "video"]);

export const sizeEnum = pgEnum("size", [
  "xs",
  "s",
  "m",
  "l",
  "xl",
  "xxl",
  "one_size",
]);
