import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, products } from "@/lib/db";
import { productFormSchema } from "@/lib/validations/product";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;

    const product = await db.query.products.findFirst({
      where: (p, { eq }) => eq(p.id, id),
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = productFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const [updated] = await db
      .update(products)
      .set({
        name: data.name,
        slug: data.slug,
        category: data.category,
        status: data.status,
        featured: data.featured,
        description: data.description,
        shortDescription: data.shortDescription ?? null,
        material: data.material ?? null,
        fitNote: data.fitNote ?? null,
        shippingNote: data.shippingNote ?? null,
        careInstructions: data.careInstructions ?? null,
        collection: data.collection ?? null,
        updatedAt: new Date(),
      })
      .where(eq(products.id, id))
      .returning({ id: products.id });

    if (!updated) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ id: updated.id });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
