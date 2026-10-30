// Sample data so every screen has something to show.
// Later, the Express backend replaces this file.
import type { Product, Order } from "@/types";

const u = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMG = {
  bomber: "1591047139829-d91aecb6caea",
  leather: "1551028719-00167b16eac5",
  bag: "1584917865442-de89df76afd3",
  tee: "1576566588028-4147f3842f27",
  coat: "1483985988355-763728e1935b",
  hero: "1539109136881-3be0616acf4b",
};
export const img = u;

export const products: Product[] = [
  { id: "p1", slug: "rust-bomber-jacket", title: "Rust bomber jacket", category: "Jackets", gender: "Unisex", size: "M", condition: "Like new", price: 1299, status: "AVAILABLE", measurements: "Chest 22 in · Length 25 in · Sleeve 24 in", description: "A soft satin-finish bomber in a warm rust shade. Ribbed collar and cuffs, two side pockets and a sleeve zip pocket. Worn only a few times.", images: [u(IMG.bomber), u(IMG.bomber, 700), u(IMG.bomber, 600)] },
  { id: "p2", slug: "black-leather-biker-jacket", title: "Black leather biker jacket", category: "Jackets", gender: "Men", size: "L", condition: "Very good", price: 3499, status: "AVAILABLE", measurements: "Chest 24 in · Length 26 in · Sleeve 25 in", description: "Classic biker cut in genuine leather with silver hardware. Small softness at the elbows that only adds character.", images: [u(IMG.leather), u(IMG.leather, 700)] },
  { id: "p3", slug: "red-structured-handbag", title: "Red structured handbag", category: "Bags", gender: "Women", size: "One size", condition: "Like new", price: 1899, status: "RESERVED", measurements: "Width 10 in · Height 8 in · Depth 4 in", description: "A firm, top-handle bag in glossy red with a silver clasp. Fits a phone, wallet and a small notebook.", images: [u(IMG.bag), u(IMG.bag, 700)] },
  { id: "p4", slug: "graphic-cotton-tee", title: "Graphic cotton tee", category: "Tops", gender: "Unisex", size: "L", condition: "Good", price: 549, status: "AVAILABLE", measurements: "Chest 22 in · Length 28 in", description: "Heavy cotton tee with a bold blue print. Slightly relaxed fit. Print is intact with light softness from washing.", images: [u(IMG.tee), u(IMG.tee, 700)] },
  { id: "p5", slug: "burgundy-wool-coat", title: "Burgundy wool coat", category: "Coats", gender: "Women", size: "S", condition: "Very good", price: 2799, status: "AVAILABLE", measurements: "Chest 19 in · Length 36 in · Sleeve 23 in", description: "A warm wool-blend coat with a stand collar and a clean front zip. Lined, with two deep pockets.", images: [u(IMG.coat), u(IMG.coat, 700)] },
  { id: "p6", slug: "boxy-bomber-jacket", title: "Boxy bomber jacket", category: "Jackets", gender: "Women", size: "S", condition: "Good", price: 999, status: "SOLD", measurements: "Chest 21 in · Length 23 in", description: "A cropped, boxy bomber. This one has found its owner.", images: [u(IMG.bomber, 800)] },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getById = (id: string) => products.find((p) => p.id === id)!;
export const categories = ["Jackets", "Coats", "Tops", "Bags"];
export const sizes = ["XS", "S", "M", "L", "XL", "One size"];

export const orders: Order[] = [
  { orderNumber: "ORD-1042", customer: "Aman Verma", phone: "98765 43210", address: "Room 214, Sunrise PG, Model Town, Ludhiana 141002", productIds: ["p1", "p3"], subtotal: 3198, discount: 0, deliveryFee: 49, total: 3247, paymentStatus: "UNDER_REVIEW", orderStatus: "PAYMENT_REVIEW", createdAt: "29 Oct 2026, 10:12 am", txnId: "431209877412" },
  { orderNumber: "ORD-1041", customer: "Simran Kaur", phone: "99887 76655", address: "Hostel B, Room 12, near Gate 2, Ludhiana 141001", productIds: ["p5"], subtotal: 2799, discount: 280, deliveryFee: 49, total: 2568, paymentStatus: "UNDER_REVIEW", orderStatus: "PAYMENT_REVIEW", createdAt: "29 Oct 2026, 9:40 am", txnId: "431198200315" },
  { orderNumber: "ORD-1040", customer: "Rohit Sharma", phone: "90123 45678", address: "House 18, Sarabha Nagar, Ludhiana 141001", productIds: ["p4"], subtotal: 549, discount: 0, deliveryFee: 49, total: 598, paymentStatus: "AWAITING_PROOF", orderStatus: "PLACED", createdAt: "29 Oct 2026, 9:05 am" },
  { orderNumber: "ORD-1038", customer: "Aman Verma", phone: "98765 43210", address: "Room 214, Sunrise PG, Model Town, Ludhiana 141002", productIds: ["p2"], subtotal: 3499, discount: 0, deliveryFee: 49, total: 3548, paymentStatus: "CONFIRMED", orderStatus: "OUT_FOR_DELIVERY", createdAt: "27 Oct 2026, 6:30 pm", txnId: "430877120043" },
  { orderNumber: "ORD-1031", customer: "Aman Verma", phone: "98765 43210", address: "Room 214, Sunrise PG, Model Town, Ludhiana 141002", productIds: ["p6"], subtotal: 999, discount: 0, deliveryFee: 49, total: 1048, paymentStatus: "CONFIRMED", orderStatus: "DELIVERED", createdAt: "18 Oct 2026, 4:10 pm", txnId: "428100998812" },
  { orderNumber: "ORD-1030", customer: "Aman Verma", phone: "98765 43210", address: "Room 214, Sunrise PG, Model Town, Ludhiana 141002", productIds: ["p4"], subtotal: 549, discount: 0, deliveryFee: 49, total: 598, paymentStatus: "REJECTED", orderStatus: "CANCELLED", createdAt: "12 Oct 2026, 7:20 pm", txnId: "427700112233" },
];
export const getOrder = (n: string) => orders.find((o) => o.orderNumber === n) ?? orders[0];

export const discounts = [
  { code: "WELCOME10", type: "10% off", minOrder: 999, used: "14 / 100", expires: "31 Dec 2026", active: true },
  { code: "FLAT200", type: "₹200 off", minOrder: 1999, used: "3 / 20", expires: "15 Nov 2026", active: true },
  { code: "DIWALI15", type: "15% off", minOrder: 1499, used: "20 / 20", expires: "05 Nov 2026", active: false },
];

export const sellRequests = [
  { id: "SR-12", customer: "Simran Kaur", type: "Sell", item: "Denim jacket", size: "M", condition: "Very good", price: 900, status: "NEW", date: "29 Oct 2026", image: u(IMG.bomber, 400) },
  { id: "SR-11", customer: "Karan Gill", type: "Swap", item: "Leather boots", size: "UK 8", condition: "Good", price: 1200, status: "ACCEPTED", date: "26 Oct 2026", image: u(IMG.leather, 400) },
  { id: "SR-10", customer: "Aman Verma", type: "Sell", item: "Woollen scarf", size: "One size", condition: "Like new", price: 300, status: "DECLINED", date: "22 Oct 2026", image: u(IMG.coat, 400) },
];
