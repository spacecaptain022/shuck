"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

type StickyMobilePurchaseBarProps = {
  price: number;
  variantSummary?: string;
  inStock: boolean;
  onAddToCart: () => void;
};

export function StickyMobilePurchaseBar({
  price,
  variantSummary,
  inStock,
  onAddToCart,
}: StickyMobilePurchaseBarProps) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border px-4 py-3 safe-area-pb">
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-base font-bold">${price.toFixed(2)}</p>
          {variantSummary && (
            <p className="text-xs text-muted-foreground truncate">{variantSummary}</p>
          )}
        </div>
        <Button
          onClick={onAddToCart}
          disabled={!inStock}
          className="h-11 rounded-2xl font-semibold gap-2 px-5 flex-shrink-0"
        >
          <ShoppingBag className="h-4 w-4" />
          {inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>
    </div>
  );
}
