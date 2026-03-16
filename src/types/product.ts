export type ProductCardItem = {
  id: string;
  name: string;
  slug: string;
  category: "tee" | "hat";
  featured: boolean;
  price: number;
  imageUrl: string;
  color?: string;
};

export type ProductVariantOption = {
  id: string;
  name: string;
  color: string;
  size: "xs" | "s" | "m" | "l" | "xl" | "xxl" | "one_size";
  price: number;
  compareAtPrice?: number | null;
  stockQuantity: number;
  stripePriceId: string;
  isDefault: boolean;
};

export type ProductDetail = {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string | null;
  material?: string | null;
  fitNote?: string | null;
  shippingNote?: string | null;
  careInstructions?: string | null;
  category: "tee" | "hat";
  media: {
    id: string;
    url: string;
    altText?: string | null;
    sortOrder: number;
  }[];
  variants: ProductVariantOption[];
};
