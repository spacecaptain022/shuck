import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ArrowRight, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getStripe } from "@/lib/stripe/server";
import { getOrderBySessionId } from "@/lib/data/orders";

export const metadata: Metadata = { title: "Order Confirmed" };

type Props = { searchParams: Promise<{ session_id?: string }> };

async function getSessionData(sessionId: string) {
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });
    return session;
  } catch {
    return null;
  }
}

export default async function SuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams;
  const session = session_id ? await getSessionData(session_id) : null;

  // Get order from DB to show tracking link
  const order = session_id ? await getOrderBySessionId(session_id) : null;

  const customerName = session?.customer_details?.name;
  const customerEmail = session?.customer_details?.email;
  const orderTotal = session?.amount_total ? (session.amount_total / 100).toFixed(2) : null;

  return (
    <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-10">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-full bg-accent/15 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-accent" />
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">Order confirmed.</h1>
        <p className="text-muted-foreground">
          {customerName ? `Thanks, ${customerName}.` : "Thanks for your order."}{" "}
          We&apos;ll get it out to you soon.
        </p>
        {customerEmail && (
          <p className="text-sm text-muted-foreground mt-1">
            Confirmation sent to{" "}
            <span className="font-medium text-foreground">{customerEmail}</span>.
          </p>
        )}
      </div>

      {/* Order summary card */}
      {session && (
        <div className="rounded-3xl border border-border bg-card p-6 mb-4 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <Package className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm font-semibold">Order Summary</p>
          </div>

          {session.line_items?.data.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {item.description} × {item.quantity}
              </span>
              <span className="font-medium">
                ${((item.amount_total ?? 0) / 100).toFixed(2)}
              </span>
            </div>
          ))}

          <div className="border-t border-border pt-3 flex justify-between text-sm font-semibold">
            <span>Total</span>
            <span>${orderTotal}</span>
          </div>
        </div>
      )}

      {/* Check order status link */}
      {order && (
        <div className="mb-6 text-center">
          <Link
            href={`/order/${order.id}`}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Check order status →
          </Link>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <Button
          render={<Link href="/shop" />}
          size="lg"
          className="w-full h-12 rounded-2xl font-semibold"
        >
          Keep Shopping <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button
          render={<Link href="/contact" />}
          variant="ghost"
          size="lg"
          className="w-full h-12 rounded-2xl font-medium"
        >
          Questions? Contact Us
        </Button>
      </div>
    </div>
  );
}
