import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, productMedia } from "@/lib/db";

type Params = { params: Promise<{ id: string; mediaId: string }> };

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { mediaId } = await params;

    await db.delete(productMedia).where(eq(productMedia.id, mediaId));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
