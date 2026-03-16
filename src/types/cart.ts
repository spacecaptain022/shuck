export type CartItem = {
  productId: string;
  variantId: string;
  slug: string;
  name: string;
  variantName: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  imageUrl: string;
  stripePriceId: string;
};

export type CheckoutPayload = {
  items: CartItem[];
};
