import type { Metadata } from "next";

export const dynamic = "force-dynamic";
import Link from "next/link";
import { desc } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { db, products } from "@/lib/db";

export const metadata: Metadata = { title: "Products — Admin" };

export default async function AdminProductsPage() {
  const allProducts = await db
    .select()
    .from(products)
    .orderBy(desc(products.createdAt));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button render={<Link href="/admin/products/new" />} className="rounded-xl gap-2">
          <Plus className="h-4 w-4" /> New Product
        </Button>
      </div>

      <div className="rounded-2xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary/60 text-left border-b border-border">
              <th className="px-5 py-3 font-semibold">Name</th>
              <th className="px-5 py-3 font-semibold">Category</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 font-semibold">Featured</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {allProducts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-muted-foreground text-sm">
                  No products yet.
                </td>
              </tr>
            ) : (
              allProducts.map((product) => (
                <tr key={product.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-5 py-3 font-medium">{product.name}</td>
                  <td className="px-5 py-3 capitalize">{product.category}</td>
                  <td className="px-5 py-3 capitalize">{product.status}</td>
                  <td className="px-5 py-3">{product.featured ? "Yes" : "No"}</td>
                  <td className="px-5 py-3 text-right">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="text-sm font-medium underline underline-offset-4 hover:opacity-70 transition-opacity"
                    >
                      Edit
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
