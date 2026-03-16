"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Variant = {
  id: string;
  name: string;
  color: string;
  size: string;
  sku: string;
  price: string;
  compareAtPrice: string | null;
  stockQuantity: number;
  stripePriceId: string;
  isDefault: boolean;
  isActive: boolean;
};

type Props = {
  productId: string;
  initialVariants: Variant[];
};

const SIZE_OPTIONS = ["xs", "s", "m", "l", "xl", "xxl", "one_size"] as const;

const emptyForm = {
  name: "",
  color: "",
  size: "m" as (typeof SIZE_OPTIONS)[number],
  sku: "",
  price: "",
  compareAtPrice: "",
  stockQuantity: 0,
  stripePriceId: "",
  isDefault: false,
  isActive: true,
};

export function VariantManager({ productId, initialVariants }: Props) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Inline stock edit state
  const [editingStockId, setEditingStockId] = useState<string | null>(null);
  const [editingStockValue, setEditingStockValue] = useState<string>("");
  const stockInputRef = useRef<HTMLInputElement>(null);

  function handleFormChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const target = e.target;
    const name = target.name;
    const value =
      target.type === "checkbox"
        ? (target as HTMLInputElement).checked
        : target.value;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleAddVariant(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);

    const body = {
      ...form,
      stockQuantity: Number(form.stockQuantity),
    };

    const res = await fetch(`/api/admin/products/${productId}/variants`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setSubmitting(false);

    if (res.ok) {
      setForm(emptyForm);
      setShowForm(false);
      router.refresh();
    } else {
      const json = await res.json();
      setFormError(json.error ?? "Something went wrong");
    }
  }

  async function handleDeleteVariant(variantId: string) {
    if (!confirm("Delete this variant?")) return;

    const res = await fetch(
      `/api/admin/products/${productId}/variants/${variantId}`,
      { method: "DELETE" }
    );

    if (res.ok) {
      router.refresh();
    }
  }

  async function handleToggleActive(variant: Variant) {
    await fetch(`/api/admin/products/${productId}/variants/${variant.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !variant.isActive }),
    });
    router.refresh();
  }

  function startStockEdit(variant: Variant) {
    setEditingStockId(variant.id);
    setEditingStockValue(String(variant.stockQuantity));
    setTimeout(() => stockInputRef.current?.focus(), 50);
  }

  async function saveStockEdit(variantId: string) {
    const qty = parseInt(editingStockValue, 10);
    if (isNaN(qty) || qty < 0) {
      setEditingStockId(null);
      return;
    }
    await fetch(`/api/admin/products/${productId}/variants/${variantId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stockQuantity: qty }),
    });
    setEditingStockId(null);
    router.refresh();
  }

  return (
    <div className="rounded-2xl border border-border">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h2 className="text-sm font-semibold">Variants</h2>
        <Button
          type="button"
          variant="outline"
          className="rounded-xl h-8 text-xs gap-1.5"
          onClick={() => setShowForm((v) => !v)}
        >
          <Plus className="h-3.5 w-3.5" />
          {showForm ? "Cancel" : "Add Variant"}
        </Button>
      </div>

      {/* Add variant form */}
      {showForm && (
        <div className="px-5 py-4 border-b border-border bg-secondary/20">
          <form onSubmit={handleAddVariant} className="space-y-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-medium mb-1">Name</label>
                <Input
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  placeholder="e.g. Black / M"
                  className="rounded-xl h-8 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Color</label>
                <Input
                  name="color"
                  value={form.color}
                  onChange={handleFormChange}
                  placeholder="e.g. Black"
                  className="rounded-xl h-8 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Size</label>
                <select
                  name="size"
                  value={form.size}
                  onChange={handleFormChange}
                  className="h-8 w-full rounded-xl border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring"
                >
                  {SIZE_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s.toUpperCase().replace("_", " ")}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">SKU</label>
                <Input
                  name="sku"
                  value={form.sku}
                  onChange={handleFormChange}
                  placeholder="SKU-001"
                  className="rounded-xl h-8 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Price ($)</label>
                <Input
                  name="price"
                  value={form.price}
                  onChange={handleFormChange}
                  placeholder="29.99"
                  className="rounded-xl h-8 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">
                  Compare Price{" "}
                  <span className="text-muted-foreground font-normal">(opt)</span>
                </label>
                <Input
                  name="compareAtPrice"
                  value={form.compareAtPrice}
                  onChange={handleFormChange}
                  placeholder="39.99"
                  className="rounded-xl h-8 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Stock</label>
                <Input
                  name="stockQuantity"
                  type="number"
                  min={0}
                  value={form.stockQuantity}
                  onChange={handleFormChange}
                  placeholder="0"
                  className="rounded-xl h-8 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Stripe Price ID</label>
                <Input
                  name="stripePriceId"
                  value={form.stripePriceId}
                  onChange={handleFormChange}
                  placeholder="price_..."
                  className="rounded-xl h-8 text-sm"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-5">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={form.isDefault}
                  onChange={handleFormChange}
                  className="h-4 w-4 rounded"
                />
                Default
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleFormChange}
                  className="h-4 w-4 rounded"
                />
                Active
              </label>
            </div>

            {formError && (
              <p className="text-sm text-destructive">{formError}</p>
            )}

            <Button
              type="submit"
              disabled={submitting}
              className="rounded-xl h-8 text-sm"
            >
              {submitting ? "Adding…" : "Add Variant"}
            </Button>
          </form>
        </div>
      )}

      {/* Variants table */}
      {initialVariants.length === 0 ? (
        <div className="px-5 py-8 text-center text-sm text-muted-foreground">
          No variants yet. Add one above.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary/40 text-left border-b border-border">
                <th className="px-4 py-2.5 font-semibold text-xs">Name</th>
                <th className="px-4 py-2.5 font-semibold text-xs">Color</th>
                <th className="px-4 py-2.5 font-semibold text-xs">Size</th>
                <th className="px-4 py-2.5 font-semibold text-xs">SKU</th>
                <th className="px-4 py-2.5 font-semibold text-xs text-right">Price</th>
                <th className="px-4 py-2.5 font-semibold text-xs text-right">Stock</th>
                <th className="px-4 py-2.5 font-semibold text-xs text-center">Active</th>
                <th className="px-4 py-2.5 font-semibold text-xs text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {initialVariants.map((v) => (
                <tr key={v.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-2.5 font-medium">{v.name}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{v.color}</td>
                  <td className="px-4 py-2.5 uppercase text-xs">{v.size}</td>
                  <td className="px-4 py-2.5 text-muted-foreground font-mono text-xs">{v.sku}</td>
                  <td className="px-4 py-2.5 text-right">${Number(v.price).toFixed(2)}</td>
                  {/* Inline stock edit */}
                  <td className="px-4 py-2.5 text-right">
                    {editingStockId === v.id ? (
                      <div className="flex items-center justify-end gap-1">
                        <input
                          ref={stockInputRef}
                          type="number"
                          min={0}
                          value={editingStockValue}
                          onChange={(e) => setEditingStockValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveStockEdit(v.id);
                            if (e.key === "Escape") setEditingStockId(null);
                          }}
                          className="w-16 h-6 rounded-lg border border-input bg-transparent px-2 text-sm text-right outline-none focus:border-ring"
                        />
                        <button
                          type="button"
                          onClick={() => saveStockEdit(v.id)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Check className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingStockId(null)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => startStockEdit(v)}
                        className="hover:underline cursor-pointer"
                      >
                        {v.stockQuantity}
                      </button>
                    )}
                  </td>
                  {/* Active toggle */}
                  <td className="px-4 py-2.5 text-center">
                    <button
                      type="button"
                      onClick={() => handleToggleActive(v)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        v.isActive ? "bg-accent" : "bg-secondary"
                      }`}
                    >
                      <span
                        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                          v.isActive ? "translate-x-4.5" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </td>
                  {/* Delete */}
                  <td className="px-4 py-2.5 text-center">
                    <button
                      type="button"
                      onClick={() => handleDeleteVariant(v.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
