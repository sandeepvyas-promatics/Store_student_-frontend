import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { getById } from "@/lib/mock-data";
import { inr, store } from "@/lib/config";

export default function Checkout() {
  const items = [getById("p1")];
  const subtotal = items.reduce((s, i) => s + i.price, 0);
  return (
    <div className="wrap py-8 md:py-12">
      <h1 className="page-title">Checkout</h1>
      <p className="mt-1 text-muted">Signed in as aman@example.com</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_400px]">
        <form className="space-y-6">
          <section className="card card-pad">
            <h2 className="text-lg font-semibold">Contact</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div><label className="label" htmlFor="n">Full name</label><input id="n" className="input" defaultValue="Aman Verma" /></div>
              <div><label className="label" htmlFor="p">Phone number</label><input id="p" className="input" defaultValue="98765 43210" /></div>
            </div>
          </section>

          <section className="card card-pad">
            <div className="flex items-center justify-between"><h2 className="text-lg font-semibold">Delivery address</h2><Link href="/account/addresses" className="text-sm text-brand hover:underline">Use a saved address</Link></div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2"><label className="label" htmlFor="t">Where are we delivering?</label>
                <select id="t" className="input"><option>Hostel</option><option>PG</option><option>Home or other address</option></select></div>
              <div className="sm:col-span-2"><label className="label" htmlFor="a">Hostel, PG or street address</label><input id="a" className="input" placeholder="Sunrise PG, Model Town" /></div>
              <div><label className="label" htmlFor="r">Room number</label><input id="r" className="input" placeholder="214" /></div>
              <div><label className="label" htmlFor="l">Landmark</label><input id="l" className="input" placeholder="Opposite the main gate" /></div>
              <div><label className="label" htmlFor="c">City</label><input id="c" className="input" defaultValue={store.city} /></div>
              <div><label className="label" htmlFor="z">Pincode</label><input id="z" className="input" inputMode="numeric" placeholder="141002" /></div>
            </div>
            <label className="mt-5 flex items-center gap-3 text-sm"><input type="checkbox" className="h-4 w-4 accent-ink" /> Save this address for next time</label>
          </section>

          <section className="card card-pad">
            <h2 className="text-lg font-semibold">Discount code</h2>
            <div className="mt-4 flex gap-3"><input className="input" placeholder="Enter code" aria-label="Discount code" /><button type="button" className="btn btn-line">Apply</button></div>
          </section>

          <section className="card card-pad">
            <h2 className="text-lg font-semibold">Payment</h2>
            <p className="mt-2 flex items-start gap-3 text-sm text-muted"><Icon name="rupee" className="mt-0.5 h-5 w-5 shrink-0" /> You&apos;ll pay by UPI on the next screen. We hold your pieces for {store.payWithinMinutes} minutes while you pay.</p>
          </section>
        </form>

        <aside className="card card-pad h-fit lg:sticky lg:top-28">
          <h2 className="text-lg font-semibold">Your order</h2>
          <ul className="mt-5 space-y-4">
            {items.map((p) => (
              <li key={p.id} className="flex gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.images[0]} alt="" className="h-20 w-16 rounded-lg object-cover" />
                <div className="flex-1 text-sm"><p className="font-medium">{p.title}</p><p className="text-muted">Size {p.size} · {p.condition}</p></div>
                <p className="text-sm font-medium">{inr(p.price)}</p>
              </li>
            ))}
          </ul>
          <dl className="mt-6 space-y-3 border-t border-line pt-5 text-sm">
            <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd>{inr(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Discount</dt><dd>− {inr(0)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Delivery</dt><dd>{inr(store.deliveryFee)}</dd></div>
            <div className="flex justify-between border-t border-line pt-4 text-base font-semibold"><dt>Total</dt><dd>{inr(subtotal + store.deliveryFee)}</dd></div>
          </dl>
          <Link href="/payment/ORD-1043" className="btn btn-brand btn-block mt-6">Place order and pay by UPI</Link>
          <p className="mt-3 text-center text-xs text-muted">Placing the order holds your piece for {store.payWithinMinutes} minutes.</p>
        </aside>
      </div>
    </div>
  );
}
