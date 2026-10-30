import Link from "next/link";
import { store } from "@/lib/config";

const cols = [
  { title: "Shop", links: [["All pieces", "/shop"], ["New arrivals", "/shop?sort=newest"], ["Jackets", "/shop?category=Jackets"], ["Bags", "/shop?category=Bags"]] },
  { title: "Help", links: [["Delivery", "/delivery"], ["Returns and exchanges", "/returns"], ["Size guide", "/size-guide"], ["FAQ", "/faq"], ["Contact us", "/contact"]] },
  { title: "Store", links: [["About us", "/about"], ["Sell or swap", "/account/sell-or-swap"], ["My account", "/account"], ["Instagram", store.instagram]] },
];

export default function Footer() {
  return (
    <footer className="mt-24 bg-ink text-white">
      <div className="wrap grid gap-12 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <p className="display text-3xl">{store.name}</p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-white/65">
            Hand-picked clothing at fair prices, delivered to hostels, PGs and homes across {store.city}.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h3 className="mb-4 text-sm font-medium text-white/50">{c.title}</h3>
            <ul className="space-y-2.5 text-sm">
              {c.links.map(([label, href]) => (
                <li key={label}><Link href={href} className="text-white/85 hover:text-white">{label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-2 py-5 text-xs text-white/50 sm:flex-row sm:justify-between">
          <p>© {store.year} {store.name}. All rights reserved.</p>
          <p>Payments by UPI only.</p>
        </div>
      </div>
    </footer>
  );
}
