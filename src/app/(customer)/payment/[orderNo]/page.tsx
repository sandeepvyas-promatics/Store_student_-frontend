import { Suspense } from "react";
import PageSkeleton from "@/components/ui/PageSkeleton";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { getOrder, getById } from "@/lib/mock-data";
import { inr, store } from "@/lib/config";

// A decorative QR-style block. The owner's real UPI QR image replaces it later.
function QrPlaceholder() {
  const cells = Array.from({ length: 169 }, (_, i) => ((i * 7 + (i % 13) * 3 + Math.floor(i / 13)) % 3 === 0));
  return (
    <div className="grid aspect-square w-52 gap-px rounded-xl border border-line bg-white p-3" style={{ gridTemplateColumns: "repeat(13, 1fr)" }} role="img" aria-label="UPI QR code placeholder">
      {cells.map((on, i) => <span key={i} className={on ? "bg-ink" : "bg-transparent"} />)}
    </div>
  );
}

async function PaymentContent({ params }: { params: Promise<{ orderNo: string }> }) {
  const { orderNo } = await params;
  const o = getOrder(orderNo);
  return (
    <div className="wrap py-8 md:py-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-3 rounded-xl bg-tagsoft px-5 py-4 text-[#92400e] sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 font-medium"><Icon name="clock" className="h-5 w-5" /> Your pieces are held for you. Pay within 14:32 minutes.</p>
          <p className="text-sm">If time runs out, the pieces go back on sale.</p>
        </div>

        <h1 className="page-title mt-8">Pay by UPI</h1>
        <p className="mt-1 text-muted">Order {o.orderNumber}</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <section className="card card-pad">
              <h2 className="flex items-center gap-3 text-lg font-semibold"><span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-sm text-white">1</span> Pay the exact amount</h2>
              <div className="mt-6 flex flex-col items-center gap-8 sm:flex-row">
                <QrPlaceholder />
                <dl className="w-full space-y-4 text-sm">
                  <div><dt className="text-muted">Amount to pay</dt><dd className="display text-4xl">{inr(o.total)}</dd></div>
                  <div><dt className="text-muted">UPI ID</dt><dd className="mt-1 flex items-center justify-between rounded-xl border border-line bg-paper px-4 py-3 font-medium">{store.upiId}<Icon name="copy" className="h-4 w-4 text-muted" /></dd></div>
                  <div><dt className="text-muted">Add this in the payment note</dt><dd className="mt-1 rounded-xl border border-line bg-paper px-4 py-3 font-medium">{o.orderNumber}</dd></div>
                </dl>
              </div>
            </section>

            <section className="card card-pad">
              <h2 className="flex items-center gap-3 text-lg font-semibold"><span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-sm text-white">2</span> Send us your proof</h2>
              <form className="mt-6 space-y-5">
                <div><label className="label" htmlFor="txn">UPI transaction ID</label><input id="txn" className="input" placeholder="12-digit number from your UPI app" inputMode="numeric" /></div>
                <div>
                  <span className="label">Payment screenshot</span>
                  <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-line bg-paper px-6 py-10 text-center hover:border-ink">
                    <Icon name="upload" className="h-7 w-7 text-muted" />
                    <span className="text-sm font-medium">Tap to upload a screenshot</span>
                    <span className="text-xs text-muted">PNG or JPG, up to 5 MB</span>
                    <input type="file" accept="image/*" className="sr-only" />
                  </label>
                </div>
                <Link href={`/order-placed/${o.orderNumber}`} className="btn btn-dark btn-block">I&apos;ve paid. Submit proof</Link>
              </form>
            </section>
          </div>

          <aside className="card card-pad h-fit">
            <h2 className="text-lg font-semibold">Order summary</h2>
            <ul className="mt-4 space-y-3">
              {o.productIds.map((id) => { const p = getById(id); return (
                <li key={id} className="flex items-center gap-3 text-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.images[0]} alt="" className="h-14 w-11 rounded-lg object-cover" />
                  <span className="flex-1">{p.title}</span><span className="font-medium">{inr(p.price)}</span>
                </li>); })}
            </ul>
            <dl className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
              <div className="flex justify-between"><dt className="text-muted">Delivery</dt><dd>{inr(o.deliveryFee)}</dd></div>
              <div className="flex justify-between text-base font-semibold"><dt>Total</dt><dd>{inr(o.total)}</dd></div>
            </dl>
            <p className="mt-5 text-xs leading-5 text-muted">We confirm every payment by hand against our UPI app, so please pay the exact amount.</p>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default function Payment(props: Parameters<typeof PaymentContent>[0]) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <PaymentContent {...props} />
    </Suspense>
  );
}
