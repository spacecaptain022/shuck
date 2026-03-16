"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useCartStore, getCartCount } from "@/hooks/use-cart-store";
import { useUIStore } from "@/hooks/use-ui-store";
import { mainNav } from "@/content/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function Navbar() {
  const { items, openCart } = useCartStore();
  const { mobileMenuOpen, setMobileMenuOpen } = useUIStore();
  const count = getCartCount(items);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Floating pill navbar */}
      <div className="px-4 sm:px-6 lg:px-8 py-2">
        <header
          className={cn(
            "mx-auto max-w-7xl rounded-2xl border border-border transition-all duration-300",
            scrolled
              ? "bg-background/95 backdrop-blur-md shadow-sm"
              : "bg-background/80 backdrop-blur-sm"
          )}
        >
          {/* Desktop */}
          <div className="hidden md:grid grid-cols-3 items-center h-12 px-5">
            {/* Left: nav */}
            <nav className="flex items-center gap-5">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Center: logo */}
            <div className="flex justify-center">
              <Link href="/" className="hover:opacity-70 transition-opacity">
                <Image src="/Shuck logo.png" alt="SHUCK" width={80} height={28} className="h-9 w-auto" />
              </Link>
            </div>

            {/* Right: actions */}
            <div className="flex items-center justify-end gap-0.5">
              <button className="p-2 hover:opacity-60 transition-opacity" aria-label="Search">
                <Search className="h-4 w-4" />
              </button>
              <button
                onClick={openCart}
                className="p-2 hover:opacity-60 transition-opacity relative"
                aria-label="Cart"
              >
                <ShoppingBag className="h-4 w-4" />
                {count > 0 && (
                  <span className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-foreground text-background text-[9px] font-bold">
                    {count > 9 ? "9+" : count}
                  </span>
                )}
              </button>
              <span className="text-xs text-muted-foreground ml-1">Cart ({count})</span>
            </div>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center justify-between h-12 px-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 hover:opacity-60 transition-opacity"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Link href="/" className="hover:opacity-70 transition-opacity">
              <Image src="/Shuck logo.png" alt="SHUCK" width={80} height={28} className="h-9 w-auto" />
            </Link>
            <button
              onClick={openCart}
              className="p-1.5 hover:opacity-60 transition-opacity relative"
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-foreground text-background text-[9px] font-bold">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </button>
          </div>
        </header>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-foreground/10" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute top-0 left-0 right-0 mt-[90px] mx-4 bg-background border border-border rounded-2xl px-6 py-6 shadow-lg">
            <nav className="flex flex-col divide-y divide-border">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-4 text-sm font-medium hover:opacity-60 transition-opacity"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
