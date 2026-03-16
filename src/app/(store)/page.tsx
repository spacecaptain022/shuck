import type { Metadata } from "next";
import { HeroCard } from "@/components/home/hero-card";
import { CategoryRow } from "@/components/home/category-row";
import { BrandPanel } from "@/components/home/brand-panel";
import { SignupCard } from "@/components/home/signup-card";
import { FeaturedProducts } from "@/components/home/featured-products";
import { getFeaturedProductCards } from "@/lib/data/products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "SHUCK — Built for the ones who move different.",
};

export default async function HomePage() {
  const featuredProducts = await getFeaturedProductCards();

  return (
    <>
      <HeroCard />
      <CategoryRow />
      <FeaturedProducts products={featuredProducts} />
      <BrandPanel />
      <SignupCard />
    </>
  );
}
