import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Returns",
};

export default function ShippingReturnsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
        Policies
      </p>
      <h1 className="text-3xl font-bold tracking-tight mb-10">Shipping & Returns</h1>

      <div className="space-y-10">
        <section>
          <h2 className="text-lg font-semibold mb-3">Shipping</h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>Orders ship within 2–4 business days of being placed.</p>
            <p>Standard shipping within the US typically takes 5–7 business days after shipment.</p>
            <p>You'll receive a tracking number via email once your order ships.</p>
            <p>We currently ship within the United States only.</p>
          </div>
        </section>

        <div className="border-t border-border" />

        <section>
          <h2 className="text-lg font-semibold mb-3">Returns</h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>We accept returns within 30 days of delivery.</p>
            <p>Items must be unworn, unwashed, and in original condition with tags attached.</p>
            <p>Final sale items are not eligible for return.</p>
            <p>
              To start a return, contact us through our{" "}
              <a href="/contact" className="text-foreground underline underline-offset-2 hover:opacity-70 transition-opacity">
                contact page
              </a>{" "}
              with your order number.
            </p>
          </div>
        </section>

        <div className="border-t border-border" />

        <section>
          <h2 className="text-lg font-semibold mb-3">Exchanges</h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              We don&apos;t do direct exchanges. Return your item and place a new order for the size
              or style you want.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
