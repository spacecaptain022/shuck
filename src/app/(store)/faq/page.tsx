import type { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/content/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Common questions about SHUCK orders, shipping, sizing, and returns.",
};

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
        Help
      </p>
      <h1 className="text-3xl font-bold tracking-tight mb-10">
        Frequently Asked Questions
      </h1>

      <Accordion multiple={false} className="space-y-3">
        {faqItems.map((item, i) => (
          <AccordionItem
            key={i}
            value={i}
            className="border border-border rounded-2xl px-5 overflow-hidden"
          >
            <AccordionTrigger className="text-sm font-semibold py-4 hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
