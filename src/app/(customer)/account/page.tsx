import Link from "next/link";
import StatusChip from "@/components/ui/StatusChip";
import Icon from "@/components/ui/Icon";
import { orders } from "@/lib/mock-data";
import { inr } from "@/lib/config";

export default function Account() {
  const latest = orders[0];
  return (
    <>
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand to-indigo-600 p-7 text-white">
        <div className="absolute -right-6 -top-10 h-40 w-40 rounded-full bg-white/10" />
        <h1 className="display relative text-2xl font-bold sm:text-3xl">Hi, Aman</h1>
        <p className="relative mt-1 text-white/80">Here&apos;s what&apos;s happening with your orders.</p>
      </div>

      <section className="card card-pad mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div><p className="text-sm text-muted">Latest order</p><p className="text-lg font-semibold">{latest.orderNumber}</p></div>
          <StatusChip status={latest.orderStatus} />
        </div>
        <p className="mt-3 text-sm text-muted">{latest.createdAt} · {inr(latest.total)}</p>
        <Link href={`/account/orders/${latest.orderNumber}`} className="btn btn-dark btn-sm mt-5">Track this order</Link>
      </section>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          ["My orders", "box", "/account/orders", "See all your orders"],
          ["Wishlist", "heart", "/account/wishlist", "Pieces you saved"],
          ["Sell or swap", "swap", "/account/sell-or-swap", "Send us your clothes"],
        ].map(([t, i, h, d]) => (
          <Link key={t} href={h} className="card card-pad transition hover:border-ink">
            <Icon name={i} className="h-6 w-6" /><p className="mt-4 font-medium">{t}</p><p className="mt-0.5 text-sm text-muted">{d}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
