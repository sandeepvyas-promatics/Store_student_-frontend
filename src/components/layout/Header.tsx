import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { store } from "@/lib/config";
import AuthButtons from "../auth/AuthButtons";
const ticker = ["One of a kind", "Hand-picked", "Fair prices", "Pay by UPI", `Delivered across ${store.city}`, "When it's sold, it's gone"];

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur">
      <div className="overflow-hidden bg-ink py-2 text-xs text-white/90" aria-label="Store highlights">
        <div className="marquee flex w-max gap-10 whitespace-nowrap">
          {[...ticker, ...ticker].map((t, i) => (
            <span key={i} className="flex items-center gap-10">{t}<span className="text-tag">✦</span></span>
          ))}
        </div>
      </div>
      <div className="border-b border-line">
        <div className="wrap flex h-16 items-center justify-between gap-6">
          <Link href="/" className="display flex items-center gap-2 text-xl">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-indigo-600 text-sm text-white">1</span>
            {store.name}
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium md:flex" aria-label="Main">
            <Link href="/" className="hover:text-brand">Home</Link>
            <Link href="/shop" className="hover:text-brand">Shop</Link>
            <Link href="/categories" className="hover:text-brand">Categories</Link>
            <Link href="/account/sell-or-swap" className="hover:text-brand">Sell or swap</Link>
            <Link href="/about" className="hover:text-brand">About</Link>
          </nav>

          <div className="flex items-center gap-1">
            <form action="/shop" className="relative mr-2 hidden xl:block">
              <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input name="q" placeholder="Search for pieces" className="h-10 w-52 rounded-lg border border-line bg-wash pl-10 pr-3 text-sm outline-none focus:border-ink focus:bg-white" />
            </form>
            <Link href="/shop" className="grid h-10 w-10 place-items-center rounded-full hover:bg-wash xl:hidden" aria-label="Search"><Icon name="search" /></Link>
            <Link href="/account/wishlist" className="grid h-10 w-10 place-items-center rounded-full hover:bg-wash" aria-label="Wishlist"><Icon name="heart" /></Link>
            <Link href="/cart" className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-wash" aria-label="Bag, 2 items">
              <Icon name="bag" />
              <span className="absolute right-0.5 top-0.5 grid h-4 w-4 place-items-center rounded-full bg-brand text-[10px] font-semibold text-white">2</span>
            </Link>
            <AuthButtons />
          </div>
        </div>
      </div>
    </header>
  );
}
