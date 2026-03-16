import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/data/orders";
import { FulfillmentForm } from "./fulfillment-form";

type Props = { params: Promise<{ id: string }> };

export const metadata: Metadata = { title: "Order — Admin" };

export default async function AdminOrderDetailPage({ params }: Props) {
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
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/orders"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Orders
        </Link>
        <h1 className="text-2xl font-bold">Order {order.id.slice(0, 8)}…</h1>
      </div>

      {/* Customer info */}
      <div className="rounded-3xl border border-border p-5 mb-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
          Customer
        </h2>
        <p className="font-medium">{order.customerName ?? "—"}</p>
        <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
        {shippingAddress && (
          <div className="mt-3 text-sm text-muted-foreground">
            {shippingAddress.line1 && <p>{shippingAddress.line1}</p>}
            {shippingAddress.line2 && <p>{shippingAddress.line2}</p>}
            {(shippingAddress.city || shippingAddress.state || shippingAddress.postal_code) && (
              <p>
                {[shippingAddress.city, shippingAddress.state, shippingAddress.postal_code]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            )}
            {shippingAddress.country && <p>{shippingAddress.country}</p>}
          </div>
        )}
      </div>

      {/* Items table */}
      <div className="rounded-2xl border border-border overflow-hidden mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary/60 text-left border-b border-border">
              <th className="px-5 py-3 font-semibold">Product</th>
              <th className="px-5 py-3 font-semibold">Variant</th>
              <th className="px-5 py-3 font-semibold text-right">Qty</th>
              <th className="px-5 py-3 font-semibold text-right">Unit</th>
              <th className="px-5 py-3 font-semibold text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id} className="border-b border-border last:border-0">
                <td className="px-5 py-3">{item.productNameSnapshot}</td>
                <td className="px-5 py-3 text-muted-foreground">{item.variantNameSnapshot}</td>
                <td className="px-5 py-3 text-right">{item.quantity}</td>
                <td className="px-5 py-3 text-right">${Number(item.unitPrice).toFixed(2)}</td>
                <td className="px-5 py-3 text-right">${Number(item.lineTotal).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="rounded-2xl border border-border p-5 mb-6 space-y-2 text-sm">
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

      {/* Fulfillment form */}
      <FulfillmentForm
        orderId={order.id}
        fulfillmentStatus={order.fulfillmentStatus}
        trackingNumber={order.trackingNumber ?? ""}
        trackingCarrier={order.trackingCarrier ?? ""}
      />
    </div>
  );
}
