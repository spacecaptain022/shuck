import type { Metadata } from "next";
import { db, products, orders, emailSignups } from "@/lib/db";
import { count } from "drizzle-orm";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin — SHUCK" };

export default async function AdminPage() {
  const [[productCount], [orderCount], [signupCount]] = await Promise.all([
    db.select({ count: count() }).from(products),
    db.select({ count: count() }).from(orders),
    db.select({ count: count() }).from(emailSignups),
  ]);

  const stats = [
    { label: "Products", value: productCount.count, href: "/admin/products" },
    { label: "Orders", value: orderCount.count, href: "/admin/orders" },
    { label: "Email Signups", value: signupCount.count, href: "/admin/signups" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-2xl border border-border bg-card p-6 hover:bg-secondary/40 transition-colors block"
          >
            <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
