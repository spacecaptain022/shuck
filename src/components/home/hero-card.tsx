import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function HeroCard() {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const year = today.getFullYear();

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-none">
      {/* Wordmark */}
      <div className="pt-4 pb-3 border-b border-foreground">
        <h1
          className="font-display font-bold uppercase leading-none tracking-tight"
          style={{ fontSize: "clamp(5rem, 20vw, 16rem)", letterSpacing: "-0.01em" }}
        >
          SHUCK
        </h1>
      </div>

      {/* Descriptor row */}
      <div className="flex items-start justify-between py-4">
        <p className="text-sm text-foreground max-w-[260px] leading-snug">
          Premium shirts and hats with a sharp<br />southern edge. Built to wear hard.
        </p>
        <p className="text-sm text-foreground text-right tabular-nums leading-snug">
          {month}.{day}<br />{year}
        </p>
      </div>

      {/* Hero image with CTA overlay */}
      <div className="relative w-full aspect-[3/2] md:aspect-[16/9] overflow-hidden">
        <Image
          src="/Shuck Banner truck.jpg"
          alt="SHUCK Banner"
          fill
          className="object-cover"
          priority
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* CTA content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          {/* Logo */}
          <Image
            src="/shuck text logo.png"
            alt="SHUCK"
            width={600}
            height={200}
            className="h-64 md:h-96 w-auto mb-6 mix-blend-multiply"
          />

          {/* Tagline */}
          <p className="text-white/80 text-sm md:text-base mb-8 max-w-sm leading-relaxed">
            Spring 2026 Collection. Built for the ones who move different.
          </p>

          {/* Buttons */}
          <div className="flex flex-row gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 bg-white text-foreground text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-white/90 transition-colors"
            >
              Shop Now <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 border border-white/60 text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-white/10 transition-colors"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
