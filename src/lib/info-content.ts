import { store } from "./config";

export type InfoPage = {
  title: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
  table?: { head: string[]; rows: string[][] };
};

// Policy wording is a placeholder. The owner must write the final text (D8, D9).
export const info: Record<string, InfoPage> = {
  delivery: {
    title: "Delivery",
    intro: `We deliver to hostels, PGs and homes in ${store.city}.`,
    sections: [
      { heading: "Delivery area and fee", body: [`We currently deliver across ${store.city}. The delivery fee is ₹${store.deliveryFee} per order, however many pieces you buy.`] },
      { heading: "How long it takes", body: ["Most orders arrive within 2 to 3 days after we confirm your payment. We message you on WhatsApp when it's out for delivery."] },
      { heading: "Hostels and PGs", body: ["Add your room number and a landmark at checkout so our delivery person can find you easily."] },
    ],
  },
  returns: {
    title: "Returns and exchanges",
    intro: "Every piece is one of a kind, so we keep our policy simple and fair.",
    sections: [
      { heading: "If something isn't as described", body: ["Tell us within 24 hours of delivery with photos. We'll fix it with an exchange or a refund."] },
      { heading: "Changed your mind", body: ["Because each piece is unique, we can't take back pieces for a change of mind. Check the size guide and measurements before you buy."] },
      { heading: "How to reach us", body: [`Message us on WhatsApp or email ${store.email}.`] },
    ],
  },
  "size-guide": {
    title: "Size guide",
    intro: "Every piece lists its own measurements. Use this table to compare with a garment you already own.",
    sections: [{ heading: "How to measure", body: ["Lay a similar piece flat and measure across the chest, from shoulder to hem, and along the sleeve. Compare with the measurements on the product page."] }],
    table: {
      head: ["Size", "Chest (in)", "Length (in)", "Sleeve (in)"],
      rows: [["XS", "17–18", "24", "22"], ["S", "19–20", "25", "23"], ["M", "21–22", "26", "24"], ["L", "23–24", "27", "25"], ["XL", "25–26", "28", "26"]],
    },
  },
  about: {
    title: "About us",
    intro: "We hand-pick clothes worth wearing again and sell them at fair prices.",
    sections: [
      { heading: "Our story", body: ["Replace this with the owner's own story: who you are, why you started, and how you choose each piece."] },
      { heading: "What we promise", body: ["One of a kind pieces. Honest condition labels. Real photos. Fair prices."] },
    ],
  },
  contact: {
    title: "Contact us",
    intro: "We're happy to help with orders, sizes or anything else.",
    sections: [
      { heading: "WhatsApp", body: ["Fastest way to reach us. Replies usually within a few hours."] },
      { heading: "Email", body: [store.email] },
      { heading: "Instagram", body: [store.instagramHandle] },
    ],
  },
  faq: {
    title: "Frequently asked questions",
    intro: "Quick answers to the things people ask most.",
    sections: [
      { heading: "Why can't I choose a quantity?", body: ["Each piece is the only one we have."] },
      { heading: "How do I pay?", body: ["By UPI only. After you place your order, pay the exact amount in your UPI app and send us the transaction ID and a screenshot. We confirm your payment by hand."] },
      { heading: "How long is a piece held for me?", body: [`${store.payWithinMinutes} minutes to send payment proof. After that, the piece goes back on sale.`] },
      { heading: "Do I need an account?", body: ["You can browse and fill your bag without one. You sign in to place an order."] },
    ],
  },
};
