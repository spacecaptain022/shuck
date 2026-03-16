import type { Metadata } from "next";

export const dynamic = "force-dynamic";
import Link from "next/link";
import { getAllOrders } from "@/lib/data/orders";

export const metadata: Metadata = { title: "Orders — Admin" };

export default async function AdminOrdersPage() {
  const allOrders = await getAllOrders();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Orders</h1>

      <div className="rounded-2xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary/60 text-left border-b border-border">
              <th className="px-5 py-3 font-semibold">Order ID</th>
              <th className="px-5 py-3 font-semibold">Customer</th>
              <th className="px-5 py-3 font-semibold">Total</th>
              <th className="px-5 py-3 font-semibold">Payment</th>
              <th className="px-5 py-3 font-semibold">Fulfillment</th>
              <th className="px-5 py-3 font-semibold">Date</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {allOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-muted-foreground text-sm">
                  No orders yet.
                </td>
              </tr>
            ) : (
              allOrders.map((order) => (
                <tr key={order.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-5 py-3 font-mono text-xs">
                    {order.id.slice(0, 8)}...
                  </td>
                  <td className="px-5 py-3">
                    <div>{order.customerName ?? "—"}</div>
                    <div className="text-muted-foreground text-xs">{order.customerEmail}</div>
                  </td>
                  <td className="px-5 py-3">${Number(order.orderTotal).toFixed(2)}</td>
                  <td className="px-5 py-3 capitalize">{order.paymentStatus}</td>
                  <td className="px-5 py-3 capitalize">{order.fulfillmentStatus}</td>
                  <td className="px-5 py-3 text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="text-sm font-medium underline underline-offset-4 hover:opacity-70 transition-opacity"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
