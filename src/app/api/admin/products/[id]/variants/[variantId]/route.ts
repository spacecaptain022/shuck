import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db, productVariants } from "@/lib/db";

const variantPatchSchema = z.object({
  name: z.string().min(1).optional(),
  color: z.string().min(1).optional(),
  size: z.enum(["xs", "s", "m", "l", "xl", "xxl", "one_size"]).optional(),
  sku: z.string().min(1).optional(),
  price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/)
    .optional(),
  compareAtPrice: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/)
    .optional()
    .or(z.literal(""))
    .or(z.null()),
  stockQuantity: z.number().int().min(0).optional(),
  stripePriceId: z.string().min(1).optional(),
  isDefault: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

type Params = { params: Promise<{ id: string; variantId: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const { variantId } = await params;
    const body = await req.json();
    const parsed = variantPatchSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const updateData: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (data.name !== undefined) updateData.name = data.name;
    if (data.color !== undefined) updateData.color = data.color;
    if (data.size !== undefined) updateData.size = data.size;
    if (data.sku !== undefined) updateData.sku = data.sku;
    if (data.price !== undefined) updateData.price = data.price;
    if (data.compareAtPrice !== undefined)
      updateData.compareAtPrice =
        data.compareAtPrice === "" || data.compareAtPrice === null
          ? null
          : data.compareAtPrice;
    if (data.stockQuantity !== undefined) updateData.stockQuantity = data.stockQuantity;
    if (data.stripePriceId !== undefined) updateData.stripePriceId = data.stripePriceId;
    if (data.isDefault !== undefined) updateData.isDefault = data.isDefault;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;

    await db
      .update(productVariants)
      .set(updateData)
      .where(eq(productVariants.id, variantId));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { variantId } = await params;

    await db.delete(productVariants).where(eq(productVariants.id, variantId));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
