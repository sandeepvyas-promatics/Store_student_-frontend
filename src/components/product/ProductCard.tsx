import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { inr } from "@/lib/config";
import type { Product } from "@/types";

const dot: Record<string, string> = { "Like new": "bg-ok", "Very good": "bg-brand", Good: "bg-tag" };

export default function ProductCard({ p }: { p: Product }) {
  const sold = p.status === "SOLD";
  const reserved = p.status === "RESERVED";
  return (
    <Link href={`/product/${p.slug}`} className="group block">
      <div className="card-hover relative aspect-[4/5] overflow-hidden rounded-xl bg-wash shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.images[0]} alt={p.title} className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${sold ? "opacity-60 grayscale" : ""}`} />
        <span className="chip absolute left-3 top-3 bg-white/95 text-ink shadow-sm">Size {p.size}</span>
        <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-ink shadow-sm transition group-hover:bg-brand group-hover:text-white"><Icon name="heart" className="h-4 w-4" /></span>
        {!sold && !reserved && <span className="chip absolute bottom-3 left-3 bg-tag text-ink shadow-sm">1 of 1</span>}
        {sold && <span className="absolute inset-x-3 bottom-3 rounded-lg bg-ink py-2 text-center text-sm font-semibold text-white">Sold</span>}
        {reserved && <span className="absolute inset-x-3 bottom-3 rounded-lg bg-tag py-2 text-center text-sm font-semibold text-ink">Reserved for another buyer</span>}
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold">{p.title}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted"><span className={`h-2 w-2 rounded-full ${dot[p.condition]}`} />{p.condition}</p>
        </div>
        <p className={`text-sm font-bold ${sold ? "text-muted line-through" : ""}`}>{inr(p.price)}</p>
      </div>
    </Link>
  );
}
