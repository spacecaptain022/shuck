import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db, productMedia } from "@/lib/db";

const mediaBodySchema = z.object({
  url: z.string().min(1),
  altText: z.string().optional(),
  sortOrder: z.number().int().min(0).optional(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: productId } = await params;
    const body = await req.json();
    const parsed = mediaBodySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { url, altText, sortOrder } = parsed.data;

    const [media] = await db
      .insert(productMedia)
      .values({
        productId,
        url,
        altText: altText ?? null,
        sortOrder: sortOrder ?? 0,
      })
      .returning({ id: productMedia.id });

    return NextResponse.json({ id: media.id }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
