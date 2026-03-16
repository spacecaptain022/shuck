import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db, orders } from "@/lib/db";
import { sendShippingConfirmation } from "@/lib/email/send-shipping-confirmation";

const patchSchema = z.object({
  fulfillmentStatus: z
    .enum(["unfulfilled", "processing", "shipped", "delivered", "cancelled"])
    .optional(),
  trackingNumber: z.string().optional(),
  trackingCarrier: z.string().optional(),
});

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = patchSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Fetch current order state for email + comparison
    const current = await db.query.orders.findFirst({
      where: (o, { eq }) => eq(o.id, id),
    });

    if (!current) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const updateFields: Record<string, unknown> = { updatedAt: new Date() };
    if (data.fulfillmentStatus !== undefined) updateFields.fulfillmentStatus = data.fulfillmentStatus;
    if (data.trackingNumber !== undefined) updateFields.trackingNumber = data.trackingNumber;
    if (data.trackingCarrier !== undefined) updateFields.trackingCarrier = data.trackingCarrier;

    const [updated] = await db
      .update(orders)
      .set(updateFields)
      .where(eq(orders.id, id))
      .returning({ id: orders.id });

    // Send shipping email when status flips to "shipped" with a tracking number
    const newStatus = data.fulfillmentStatus;
    const newTracking = data.trackingNumber ?? current.trackingNumber;
    const newCarrier = data.trackingCarrier ?? current.trackingCarrier;

    if (
      newStatus === "shipped" &&
      current.fulfillmentStatus !== "shipped" &&
      newTracking &&
      newCarrier
    ) {
      try {
        await sendShippingConfirmation(
          current.customerEmail,
          current.id,
          newTracking,
          newCarrier,
          current.customerName
        );
      } catch (emailErr) {
        // Log but don't fail the request if email fails
        console.error("Shipping email failed:", emailErr);
      }
    }

    return NextResponse.json({ id: updated.id });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
