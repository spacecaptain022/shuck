export type OrderSummary = {
  id: string;
  customerEmail: string;
  customerName?: string | null;
  subtotal: number;
  taxTotal: number;
  shippingTotal: number;
  orderTotal: number;
  paymentStatus: string;
  fulfillmentStatus: string;
  trackingNumber?: string | null;
  trackingCarrier?: string | null;
  createdAt: string;
};

export type OrderDetail = OrderSummary & {
  items: {
    id: string;
    productNameSnapshot: string;
    variantNameSnapshot: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
  }[];
  shippingAddress?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  } | null;
};
