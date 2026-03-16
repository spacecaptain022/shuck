import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe/server";
import { checkoutPayloadSchema } from "@/lib/validations/checkout";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = checkoutPayloadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid checkout payload" }, { status: 400 });
    }

    const { items } = parsed.data;

    const lineItems = items.map((item) => ({
      price: item.stripePriceId,
      quantity: item.quantity,
    }));

    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/shop`,
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      automatic_tax: {
        enabled: true,
      },
      phone_number_collection: {
        enabled: true,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json(
      { error: "Unable to create checkout session" },
      { status: 500 }
    );
  }
}
