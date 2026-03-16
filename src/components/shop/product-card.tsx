"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ProductCardItem } from "@/types/product";

interface ProductCardProps {
  product: ProductCardItem;
  variant?: "default" | "large";
}

export function ProductCard({ product, variant = "default" }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const aspectRatio = variant === "large" ? "aspect-[4/5]" : "aspect-[3/4]";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block p-3 md:p-4"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image container */}
      <div className={`relative ${aspectRatio} overflow-hidden bg-secondary`}>
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Hover overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-x-0 bottom-0 bg-foreground text-background"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-center py-3">
                View Product
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-medium leading-tight">{product.name}</p>
          {product.color && (
            <p className="text-xs text-muted-foreground mt-0.5">{product.color}</p>
          )}
        </div>
        <p className="text-sm font-medium shrink-0 tabular-nums">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
