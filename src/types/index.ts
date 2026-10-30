export type ProductStatus = "AVAILABLE" | "RESERVED" | "SOLD" | "HIDDEN";

export type Product = {
  id: string;
  slug: string;
  title: string;
  category: string;
  gender: "Women" | "Men" | "Unisex";
  size: string;
  condition: "Like new" | "Very good" | "Good";
  price: number;
  status: ProductStatus;
  measurements: string;
  description: string;
  images: string[];
};

export type PaymentStatus = "AWAITING_PROOF" | "UNDER_REVIEW" | "CONFIRMED" | "REJECTED";
export type OrderStatus =
  | "PLACED" | "PAYMENT_REVIEW" | "PAYMENT_CONFIRMED" | "PACKED"
  | "OUT_FOR_DELIVERY" | "DELIVERED" | "CANCELLED";

export type Order = {
  orderNumber: string;
  customer: string;
  phone: string;
  address: string;
  productIds: string[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  createdAt: string;
  txnId?: string;
};
