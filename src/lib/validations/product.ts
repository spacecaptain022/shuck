import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string().min(1).max(120),
  slug: z
    .string()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  category: z.enum(["tee", "hat"]),
  status: z.enum(["draft", "active", "archived"]),
  featured: z.boolean(),
  description: z.string().min(1),
  shortDescription: z.string().optional(),
  material: z.string().optional(),
  fitNote: z.string().optional(),
  shippingNote: z.string().optional(),
  careInstructions: z.string().optional(),
  collection: z.string().optional(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
