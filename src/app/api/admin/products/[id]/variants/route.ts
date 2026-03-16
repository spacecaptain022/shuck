import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db, productVariants } from "@/lib/db";

const variantFormSchema = z.object({
  name: z.string().min(1),
  color: z.string().min(1),
  size: z.enum(["xs", "s", "m", "l", "xl", "xxl", "one_size"]),
  sku: z.string().min(1),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/),
  compareAtPrice: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/)
    .optional()
    .or(z.literal("")),
  stockQuantity: z.number().int().min(0),
  stripePriceId: z.string().min(1),
  isDefault: z.boolean(),
  isActive: z.boolean(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: productId } = await params;
    const body = await req.json();
    const parsed = variantFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const [variant] = await db
      .insert(productVariants)
      .values({
        productId,
        name: data.name,
        color: data.color,
        size: data.size,
        sku: data.sku,
        price: data.price,
        compareAtPrice:
          data.compareAtPrice && data.compareAtPrice !== "" ? data.compareAtPrice : null,
        stockQuantity: data.stockQuantity,
        stripePriceId: data.stripePriceId,
        isDefault: data.isDefault,
        isActive: data.isActive,
      })
      .returning({ id: productVariants.id });

    return NextResponse.json({ id: variant.id }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
