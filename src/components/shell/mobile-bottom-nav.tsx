"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/hooks/use-cart-store";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/shop", label: "Shop", icon: ShoppingBag },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const itemCount = useCartStore(s => s.items.reduce((sum, i) => sum + i.quantity, 0));

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border">
      <div className="flex items-center justify-around h-16 safe-area-pb">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link key={href} href={href} className={`flex flex-col items-center gap-1 px-6 py-2 ${active ? "text-foreground" : "text-muted-foreground"}`}>
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
