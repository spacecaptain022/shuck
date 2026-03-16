import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brand } from "@/content/brand";

export const metadata: Metadata = {
  title: "About",
  description: brand.statement,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-6">
        About SHUCK
      </p>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-10">
        {brand.tagline}
      </h1>

      <div className="prose prose-neutral max-w-none space-y-6">
        {brand.about.split("\n\n").map((paragraph, i) => (
          <p key={i} className="text-base leading-relaxed text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-12">
        <Button render={<Link href="/shop" />} size="lg" className="rounded-2xl h-12 px-6 font-semibold">
          Shop the Collection <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
