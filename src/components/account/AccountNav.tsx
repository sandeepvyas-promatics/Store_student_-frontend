"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/ui/Icon";
import LogoutButton from "../auth/LogoutButton";
const links = [
  { href: "/account", label: "Overview", icon: "user" },
  { href: "/account/orders", label: "My orders", icon: "box" },
  { href: "/account/wishlist", label: "Wishlist", icon: "heart" },
  { href: "/account/addresses", label: "Addresses", icon: "pin" },
  { href: "/account/sell-or-swap", label: "Sell or swap", icon: "swap" },
];

export default function AccountNav() {
  const path = usePathname();
  return (
    <nav aria-label="Account" className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-1">
      {links.map((l) => {
        const active = l.href === "/account" ? path === "/account" : path.startsWith(l.href);
        return (
          <Link key={l.href} href={l.href} className={`flex shrink-0 items-center gap-3 rounded-full px-4 py-2.5 text-sm lg:rounded-xl ${active ? "bg-ink font-medium text-white" : "hover:bg-wash"}`}>
            <Icon name={l.icon} className="h-4 w-4" /> {l.label}
          </Link>
        );
      })}
      <LogoutButton className="flex w-full shrink-0 items-center gap-3 rounded-full px-4 py-2.5 text-sm text-muted hover:bg-wash lg:mt-4 lg:rounded-xl">
  <Icon name="logout" className="h-4 w-4" /> Log out
</LogoutButton>
    </nav>
  );
}
