"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/ui/Icon";

const links = [
  { href: "/admin", label: "Dashboard", icon: "grid" },
  { href: "/admin/products", label: "Products", icon: "tag" },
  { href: "/admin/orders", label: "Orders", icon: "box" },
  { href: "/admin/payments", label: "Payment review", icon: "rupee", badge: 2 },
  { href: "/admin/discounts", label: "Discount codes", icon: "percent" },
  { href: "/admin/requests", label: "Sell or swap", icon: "inbox", badge: 1 },
];

export default function AdminNav() {
  const path = usePathname();
  return (
    <nav aria-label="Admin" className="flex gap-1 overflow-x-auto lg:flex-col">
      {links.map((l) => {
        const active = l.href === "/admin" ? path === "/admin" : path.startsWith(l.href);
        return (
          <Link key={l.href} href={l.href} className={`flex shrink-0 items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm ${active ? "bg-white/10 font-medium text-white" : "text-white/65 hover:bg-white/5 hover:text-white"}`}>
            <Icon name={l.icon} className="h-4 w-4" /> {l.label}
            {l.badge && <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-tag px-1.5 text-[11px] font-semibold text-ink">{l.badge}</span>}
          </Link>
        );
      })}
    </nav>
  );
}
