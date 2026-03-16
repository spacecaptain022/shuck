"use client";

import { X, ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCartStore, getCartSubtotal, getCartCount } from "@/hooks/use-cart-store";
import { CartItemCard } from "./cart-item-card";
import { CartSummary } from "./cart-summary";

export function CartDrawer() {
  const { items, isOpen, closeCart } = useCartStore();
  const subtotal = getCartSubtotal(items);
  const count = getCartCount(items);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-background shadow-2xl flex flex-col border-l border-border"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                <span className="font-semibold text-base">
                  Cart {count > 0 && <span className="text-muted-foreground font-normal">({count})</span>}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-xl hover:bg-secondary transition-colors"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground/40" />
                  <div>
                    <p className="font-medium">Your cart is empty</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Add something good.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {items.map((item) => (
                    <CartItemCard key={item.variantId} item={item} />
                  ))}
                </div>
              )}
            </div>

            {/* Summary */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-border">
                <CartSummary subtotal={subtotal} />
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
