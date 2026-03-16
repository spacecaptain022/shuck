import { NextResponse } from "next/server";
import { db, emailSignups } from "@/lib/db";
import { newsletterSchema } from "@/lib/validations/newsletter";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = newsletterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    await db
      .insert(emailSignups)
      .values({
        email: parsed.data.email,
        source: parsed.data.source ?? "site",
      })
      .onConflictDoNothing();

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
