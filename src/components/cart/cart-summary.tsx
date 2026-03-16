"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import posthog from "posthog-js";
import { useCartStore } from "@/hooks/use-cart-store";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function CartSummary({ subtotal }: { subtotal: number }) {
  const { items, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    posthog.capture("checkout_started", {
      item_count: items.reduce((sum, i) => sum + i.quantity, 0),
      total: subtotal,
    });

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.error || "Checkout failed");
      }

      clearCart();
      router.push(data.url);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Subtotal</span>
        <span className="font-semibold text-foreground">${subtotal.toFixed(2)}</span>
      </div>
      <p className="text-xs text-muted-foreground">
        Shipping and taxes calculated at checkout.
      </p>
      <Button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full h-12 rounded-2xl text-base font-semibold"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Loading...
          </>
        ) : (
          "Checkout"
        )}
      </Button>
    </div>
  );
}
