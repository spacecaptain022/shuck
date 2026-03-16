import Link from "next/link";
import { footerLinks } from "@/content/navigation";

export function Footer() {
  return (
    <footer className="bg-foreground text-background border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-12 border-b border-background/10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-display text-2xl font-bold tracking-[0.15em] uppercase mb-4">SHUCK</p>
            <p className="text-xs text-background/50 leading-relaxed max-w-xs">
              Premium shirts and hats with a sharp southern edge.
            </p>
            <p className="text-xs text-background/30 mt-2">Made in the South.</p>
          </div>

          {/* Shop */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-background/40 mb-4">Shop</p>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-background/40 mb-4">Info</p>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.info.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-background/40 mb-4">Contact</p>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link href="/contact" className="text-sm text-background/70 hover:text-background transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-background/70 hover:text-background transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns" className="text-sm text-background/70 hover:text-background transition-colors">
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-background/30">
            &copy; {new Date().getFullYear()} SHUCK. All rights reserved.
          </p>
          <p className="text-[11px] text-background/30">Terms & Conditions</p>
        </div>
      </div>
    </footer>
  );
}
