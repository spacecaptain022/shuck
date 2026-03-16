"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/hooks/use-cart-store";
import type { CartItem } from "@/types/cart";

export function CartItemCard({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex gap-4 p-3 rounded-2xl bg-secondary/50">
      {/* Thumbnail */}
      <div className="relative h-20 w-16 flex-shrink-0 rounded-xl overflow-hidden bg-muted">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm leading-tight truncate">{item.name}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{item.variantName}</p>

        <div className="flex items-center justify-between mt-3">
          {/* Quantity control */}
          <div className="flex items-center gap-1 rounded-xl border border-border overflow-hidden">
            <button
              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
              className="p-1.5 hover:bg-secondary transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="px-2 text-sm font-medium tabular-nums">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
              className="p-1.5 hover:bg-secondary transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Price + remove */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
            <button
              onClick={() => removeItem(item.variantId)}
              className="p-1.5 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors text-muted-foreground"
              aria-label="Remove item"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
