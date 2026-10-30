import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { getById } from "@/lib/mock-data";
import { inr, store } from "@/lib/config";

export default function Cart() {
  // Sample bag: one available piece, one that was just sold (to show the warning)
  const items = [getById("p1"), getById("p6")];
  const live = items.filter((i) => i.status !== "SOLD");
  const subtotal = live.reduce((s, i) => s + i.price, 0);

  return (
    <div className="bg-soft"><div className="wrap py-8 md:py-12">
      <h1 className="page-title">Your bag</h1>
      <p className="mt-1 text-muted">{items.length} pieces. Each one is the only one, so there&apos;s no quantity to pick.</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <ul className="space-y-4">
          {items.map((p) => {
            const sold = p.status === "SOLD";
            return (
              <li key={p.id} className={`card flex gap-4 p-4 ${sold ? "border-bad/40 bg-badsoft/40" : ""}`}>
                <Link href={`/product/${p.slug}`} className="h-32 w-24 shrink-0 overflow-hidden rounded-xl bg-wash sm:h-36 sm:w-28">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.images[0]} alt={p.title} className={`h-full w-full object-cover ${sold ? "grayscale" : ""}`} />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="font-medium">{p.title}</h2>
                      <p className="font-semibold">{inr(p.price)}</p>
                    </div>
                    <p className="mt-1 text-sm text-muted">Size {p.size} · {p.condition}</p>
                    {sold && <p className="mt-2 text-sm font-medium text-bad">Sorry, this piece was just sold. Remove it to continue.</p>}
                  </div>
                  <button className="mt-3 inline-flex w-fit items-center gap-1.5 text-sm text-muted hover:text-bad"><Icon name="trash" className="h-4 w-4" /> Remove</button>
                </div>
              </li>
            );
          })}
        </ul>

        <aside className="card card-pad h-fit lg:sticky lg:top-28">
          <h2 className="text-lg font-semibold">Order summary</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd>{inr(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Delivery</dt><dd>{inr(store.deliveryFee)}</dd></div>
            <div className="flex justify-between border-t border-line pt-4 text-base font-semibold"><dt>Total</dt><dd>{inr(subtotal + store.deliveryFee)}</dd></div>
          </dl>
          <Link href="/checkout" className="btn btn-brand btn-block mt-6">Continue to checkout</Link>
          <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-muted"><Icon name="lock" className="mt-0.5 h-4 w-4 shrink-0" /> You&apos;ll sign in at checkout. Pieces are held for you for {store.payWithinMinutes} minutes after you place the order. Discount codes are added at checkout.</p>
          <Link href="/shop" className="mt-5 block text-center text-sm font-medium underline underline-offset-4">Keep shopping</Link>
        </aside>
      </div>
    </div></div>
  );
}
