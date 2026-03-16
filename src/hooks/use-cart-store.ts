"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types/cart";

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (item) => {
        import("posthog-js").then(({ default: posthog }) => {
          posthog.capture("add_to_cart", {
            product_name: item.name,
            variant_id: item.variantId,
            price: item.price,
            quantity: item.quantity,
          });
        });

        set((state) => {
          const existing = state.items.find((i) => i.variantId === item.variantId);

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.variantId === item.variantId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
              isOpen: true,
            };
          }

          return {
            items: [...state.items, item],
            isOpen: true,
          };
        });
      },

      removeItem: (variantId) =>
        set((state) => ({
          items: state.items.filter((i) => i.variantId !== variantId),
        })),

      updateQuantity: (variantId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.variantId !== variantId)
              : state.items.map((i) =>
                  i.variantId === variantId ? { ...i, quantity } : i
                ),
        })),

      clearCart: () => set({ items: [] }),
    }),
    { name: "shuck-cart" }
  )
);

export const getCartSubtotal = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const getCartCount = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.quantity, 0);
