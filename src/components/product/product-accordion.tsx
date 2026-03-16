"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface ProductAccordionProps {
  material?: string | null;
  careInstructions?: string | null;
  fitNote?: string | null;
  shippingNote?: string | null;
}

export function ProductAccordion({
  material,
  careInstructions,
  fitNote,
  shippingNote,
}: ProductAccordionProps) {
  const hasDetails = material || careInstructions;
  const hasFit = !!fitNote;
  const hasShipping = true; // always show shipping with standard policy text

  let itemIndex = 0;
  const items: { index: number; title: string; content: React.ReactNode }[] = [];

  if (hasDetails) {
    items.push({
      index: itemIndex++,
      title: "Details",
      content: (
        <div className="space-y-2 text-sm text-muted-foreground">
          {material && (
            <p>
              <span className="font-medium text-foreground">Material:</span> {material}
            </p>
          )}
          {careInstructions && (
            <p>
              <span className="font-medium text-foreground">Care:</span> {careInstructions}
            </p>
          )}
        </div>
      ),
    });
  }

  if (hasFit) {
    items.push({
      index: itemIndex++,
      title: "Fit & Sizing",
      content: (
        <p className="text-sm text-muted-foreground">{fitNote}</p>
      ),
    });
  }

  if (hasShipping) {
    items.push({
      index: itemIndex++,
      title: "Shipping & Returns",
      content: (
        <div className="space-y-2 text-sm text-muted-foreground">
          {shippingNote && <p>{shippingNote}</p>}
          <p>
            Free standard shipping on orders over $75. Orders typically ship within
            2–4 business days. Expedited shipping available at checkout.
          </p>
          <p>
            We accept returns within 30 days of delivery for unworn, unwashed items
            in original condition with tags attached. Final sale items are not eligible
            for return.
          </p>
        </div>
      ),
    });
  }

  if (items.length === 0) return null;

  return (
    <Accordion multiple={false}>
      {items.map((item) => (
        <AccordionItem key={item.index} value={item.index}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
