import { z } from "zod";

export const checkoutItemSchema = z.object({
  productId: z.string().uuid(),
  variantId: z.string().uuid(),
  slug: z.string(),
  name: z.string(),
  variantName: z.string(),
  color: z.string(),
  size: z.string(),
  price: z.number().nonnegative(),
  quantity: z.number().int().min(1).max(20),
  imageUrl: z.string().url(),
  stripePriceId: z.string(),
});

export const checkoutPayloadSchema = z.object({
  items: z.array(checkoutItemSchema).min(1),
});
