// Everything the owner may want to change lives here (decisions D8, D10 in the scope).
export const store = {
  name: "Oneoff", // placeholder: final name still to be decided
  tagline: "Hand-picked clothes. One of a kind.",
  year: 2026,
  instagram: "https://instagram.com/yourstore",
  instagramHandle: "@yourstore",
  whatsapp: "919999999999", // country code + number, no + sign
  email: "hello@yourstore.in",
  upiId: "yourstore@upi",
  deliveryFee: 49,
  payWithinMinutes: 15,
  city: "Ludhiana",
};

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
