import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe/server";
import { db, orders, orderItems } from "@/lib/db";
import { sendOrderConfirmation } from "@/lib/email/send-order-confirmation";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Retrieve line items from Stripe
    const lineItemsResult = await getStripe().checkout.sessions.listLineItems(
      session.id,
      { expand: ["data.price.product"] }
    );

    const customerEmail = session.customer_details?.email ?? "";
    const customerName = session.customer_details?.name ?? null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const shippingAddress = (session as any).shipping_details?.address ?? null;

    const subtotal = (session.amount_subtotal ?? 0) / 100;
    const taxTotal = (session.total_details?.amount_tax ?? 0) / 100;
    const shippingTotal = (session.total_details?.amount_shipping ?? 0) / 100;
    const orderTotal = (session.amount_total ?? 0) / 100;

    try {
      const [order] = await db
        .insert(orders)
        .values({
          stripeCheckoutSessionId: session.id,
          stripePaymentIntentId:
            typeof session.payment_intent === "string"
              ? session.payment_intent
              : null,
          customerEmail,
          customerName,
          subtotal: subtotal.toFixed(2),
          taxTotal: taxTotal.toFixed(2),
          shippingTotal: shippingTotal.toFixed(2),
          orderTotal: orderTotal.toFixed(2),
          currency: session.currency ?? "usd",
          paymentStatus: "paid",
          fulfillmentStatus: "unfulfilled",
          shippingAddressJson: shippingAddress,
        })
        .returning();

      // Insert order items
      const itemValues = lineItemsResult.data.map((item) => {
        const product = item.price?.product as Stripe.Product | null;
        return {
          orderId: order.id,
          productNameSnapshot: product?.name ?? item.description ?? "Product",
          variantNameSnapshot: item.description ?? "",
          quantity: item.quantity ?? 1,
          unitPrice: ((item.price?.unit_amount ?? 0) / 100).toFixed(2),
          lineTotal: ((item.amount_total ?? 0) / 100).toFixed(2),
        };
      });

      await db.insert(orderItems).values(itemValues);

      // Send confirmation email
      await sendOrderConfirmation(customerEmail, order.id, customerName);
    } catch (err) {
      console.error("Failed to save order:", err);
    }
  }

  return NextResponse.json({ received: true });
}
