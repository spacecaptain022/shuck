import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Package, MapPin, ExternalLink } from "lucide-react";
import { getOrderById } from "@/lib/data/orders";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Order Status" };

type Props = { params: Promise<{ id: string }> };

function PaymentBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    paid: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    failed: "bg-red-100 text-red-800",
    refunded: "bg-secondary text-muted-foreground",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${map[status] ?? "bg-secondary text-muted-foreground"}`}
    >
      {status}
    </span>
  );
}

function FulfillmentBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    unfulfilled: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-accent/20 text-accent",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${map[status] ?? "bg-secondary text-muted-foreground"}`}
    >
      {status}
    </span>
  );
}

export default async function OrderTrackingPage({ params }: Props) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) notFound();

  const shippingAddress = order.shippingAddressJson as {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  } | null;

  const subtotal = Number(order.subtotal);
  const taxTotal = Number(order.taxTotal);
  const shippingTotal = Number(order.shippingTotal);
  const orderTotal = Number(order.orderTotal);

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <Package className="h-5 w-5 text-muted-foreground" />
          <h1 className="text-xl font-bold">Order {order.id.slice(0, 8)}…</h1>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <PaymentBadge status={order.paymentStatus} />
          <FulfillmentBadge status={order.fulfillmentStatus} />
        </div>
      </div>

      {/* Customer info */}
      <div className="rounded-3xl border border-border p-5 mb-5">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
          Customer
        </h2>
        <p className="font-medium">{order.customerName ?? "—"}</p>
        <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
      </div>

      {/* Order items */}
      <div className="rounded-2xl border border-border overflow-hidden mb-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary/60 text-left border-b border-border">
              <th className="px-5 py-3 font-semibold">Item</th>
              <th className="px-5 py-3 font-semibold text-right">Qty</th>
              <th className="px-5 py-3 font-semibold text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id} className="border-b border-border last:border-0">
                <td className="px-5 py-3">
                  <p className="font-medium">{item.productNameSnapshot}</p>
                  <p className="text-xs text-muted-foreground">{item.variantNameSnapshot}</p>
                </td>
                <td className="px-5 py-3 text-right">{item.quantity}</td>
                <td className="px-5 py-3 text-right">${Number(item.lineTotal).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="rounded-2xl border border-border p-5 mb-5 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax</span>
          <span>${taxTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>{shippingTotal === 0 ? "Free" : `$${shippingTotal.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between font-semibold text-base pt-2 border-t border-border">
          <span>Total</span>
          <span>${orderTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Tracking */}
      {order.trackingNumber && (
        <div className="rounded-2xl border border-border p-5 mb-5">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
            Tracking
          </h2>
          <div className="flex items-center justify-between">
            <div>
              {order.trackingCarrier && (
                <p className="text-xs text-muted-foreground mb-0.5">{order.trackingCarrier}</p>
              )}
              <p className="font-mono text-sm font-medium">{order.trackingNumber}</p>
            </div>
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(
                `${order.trackingCarrier ?? ""} ${order.trackingNumber} tracking`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
            >
              Track your package
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* Shipping address */}
      {shippingAddress && (
        <div className="rounded-2xl border border-border p-5 mb-5">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Shipping Address
            </h2>
          </div>
          <div className="text-sm text-muted-foreground space-y-0.5">
            {shippingAddress.line1 && <p>{shippingAddress.line1}</p>}
            {shippingAddress.line2 && <p>{shippingAddress.line2}</p>}
            {(shippingAddress.city ||
              shippingAddress.state ||
              shippingAddress.postal_code) && (
              <p>
                {[
                  shippingAddress.city,
                  shippingAddress.state,
                  shippingAddress.postal_code,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            )}
            {shippingAddress.country && <p>{shippingAddress.country}</p>}
          </div>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link
          href="/shop"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Continue shopping
        </Link>
      </div>
    </div>
  );
}
