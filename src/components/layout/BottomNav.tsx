"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/ui/Icon";

const items = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/shop", label: "Shop", icon: "grid" },
  { href: "/cart", label: "Bag", icon: "bag" },
  { href: "/account", label: "Account", icon: "user" },
];

export default function BottomNav() {
  const path = usePathname();
  return (
    <nav aria-label="Mobile" className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-line bg-panel/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      {items.map((i) => {
        const active = i.href === "/" ? path === "/" : path.startsWith(i.href);
        return (
          <Link key={i.href} href={i.href} className={`flex flex-col items-center gap-0.5 py-2.5 text-[11px] ${active ? "font-semibold text-ink" : "text-muted"}`}>
            <Icon name={i.icon} className="h-5 w-5" />
            {i.label}
          </Link>
        );
      })}
    </nav>
  );
}
