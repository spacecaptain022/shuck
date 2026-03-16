import { NextRequest, NextResponse } from "next/server";
import { db, products } from "@/lib/db";
import { productFormSchema } from "@/lib/validations/product";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = productFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const [product] = await db
      .insert(products)
      .values({
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
      })
      .returning({ id: products.id });

    return NextResponse.json({ id: product.id }, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
