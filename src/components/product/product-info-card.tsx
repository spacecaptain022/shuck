"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import posthog from "posthog-js";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SizeSelector } from "./size-selector";
import { ColorSelector } from "./color-selector";
import { StickyMobilePurchaseBar } from "./sticky-mobile-purchase-bar";
import { useCartStore } from "@/hooks/use-cart-store";
import type { ProductDetail } from "@/types/product";

const SIZES_ORDER = ["xs", "s", "m", "l", "xl", "xxl", "one_size"] as const;

export function ProductInfoCard({
  product,
  primaryImageUrl,
}: {
  product: ProductDetail;
  primaryImageUrl: string;
}) {
  const { addItem } = useCartStore();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    posthog.capture("product_viewed", {
      product_id: product.id,
      product_name: product.name,
      slug: product.slug,
      category: product.category,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  // Get unique colors
  const colors = [...new Set(product.variants.map((v) => v.color))];

  // Get unique sizes in order
  const availableSizes = SIZES_ORDER.filter((s) =>
    product.variants.some((v) => v.size === s)
  );

  const defaultVariant = product.variants.find((v) => v.isDefault) ?? product.variants[0];

  const [selectedColor, setSelectedColor] = useState(defaultVariant?.color ?? colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(defaultVariant?.size ?? availableSizes[0]);

  const selectedVariant = product.variants.find(
    (v) => v.color === selectedColor && v.size === selectedSize
  );

  const inStock = (selectedVariant?.stockQuantity ?? 0) > 0;
  const price = selectedVariant?.price ?? defaultVariant?.price ?? 0;

  const handleAddToCart = () => {
    if (!selectedVariant) {
      toast.error("Please select a size and color.");
      return;
    }
    if (!inStock) {
      toast.error("This variant is out of stock.");
      return;
    }

    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      slug: product.slug,
      name: product.name,
      variantName: `${selectedColor} / ${selectedSize.toUpperCase()}`,
      color: selectedColor,
      size: selectedSize,
      price: Number(price),
      quantity: 1,
      imageUrl: primaryImageUrl,
      stripePriceId: selectedVariant.stripePriceId,
    });

    toast.success(`${product.name} added to cart.`);

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="sticky top-24 space-y-6">
      {/* Title & price */}
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">
          {product.category === "tee" ? "Tee" : "Hat"}
        </p>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{product.name}</h1>
        <div className="flex items-center gap-3 mt-3">
          <span className="text-2xl font-semibold">${Number(price).toFixed(2)}</span>
          {selectedVariant?.compareAtPrice && (
            <span className="text-base text-muted-foreground line-through">
              ${Number(selectedVariant.compareAtPrice).toFixed(2)}
            </span>
          )}
          {!inStock && selectedVariant && (
            <Badge variant="secondary" className="rounded-full">
              Out of stock
            </Badge>
          )}
        </div>
      </div>

      {/* Description */}
      {product.shortDescription && (
        <p className="text-sm text-muted-foreground leading-relaxed">
          {product.shortDescription}
        </p>
      )}

      {/* Color selector */}
      {colors.length > 1 && (
        <ColorSelector
          colors={colors}
          selectedColor={selectedColor}
          onSelect={setSelectedColor}
        />
      )}

      {/* Size selector */}
      <SizeSelector
        sizes={availableSizes}
        selectedSize={selectedSize}
        variants={product.variants}
        selectedColor={selectedColor}
        onSelect={setSelectedSize}
      />

      {/* Add to cart */}
      <Button
        onClick={handleAddToCart}
        disabled={!inStock}
        className="w-full h-13 rounded-2xl text-base font-semibold gap-2 overflow-hidden"
        size="lg"
      >
        <AnimatePresence mode="wait" initial={false}>
          {added ? (
            <motion.span
              key="added"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              Added ✓
            </motion.span>
          ) : (
            <motion.span
              key="default"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <ShoppingBag className="h-5 w-5" />
              {inStock ? "Add to Cart" : "Out of Stock"}
            </motion.span>
          )}
        </AnimatePresence>
      </Button>

      {/* Details */}
      <div className="space-y-2 text-sm text-muted-foreground">
        {product.fitNote && (
          <p>
            <span className="font-medium text-foreground">Fit:</span> {product.fitNote}
          </p>
        )}
        {product.shippingNote && (
          <p>
            <span className="font-medium text-foreground">Shipping:</span>{" "}
            {product.shippingNote}
          </p>
        )}
        {product.material && (
          <p>
            <span className="font-medium text-foreground">Material:</span>{" "}
            {product.material}
          </p>
        )}
      </div>

      {/* Mobile sticky bar */}
      <StickyMobilePurchaseBar
        price={Number(price)}
        variantSummary={
          selectedVariant
            ? `${selectedColor} / ${selectedSize.toUpperCase()}`
            : undefined
        }
        inStock={inStock}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
