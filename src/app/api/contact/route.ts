import { NextResponse } from "next/server";
import { db, contactSubmissions } from "@/lib/db";
import { contactSchema } from "@/lib/validations/contact";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid form submission" }, { status: 400 });
    }

    await db.insert(contactSubmissions).values(parsed.data);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
