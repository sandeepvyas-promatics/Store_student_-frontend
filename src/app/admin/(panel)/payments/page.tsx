import PageHead from "@/components/admin/PageHead";
import Icon from "@/components/ui/Icon";
import { orders, getById, img, IMG } from "@/lib/mock-data";
import { inr } from "@/lib/config";

export default function Payments() {
  const pending = orders.filter((o) => o.paymentStatus === "UNDER_REVIEW");
  return (
    <>
      <PageHead title="Payment review" text="Check each payment in your UPI app before you confirm it." />
      <div className="mb-6 flex items-start gap-3 rounded-xl bg-tagsoft px-5 py-4 text-sm text-[#92400e]">
        <Icon name="shield" className="mt-0.5 h-5 w-5 shrink-0" />
        <p>Match the <strong>amount</strong> and the <strong>transaction ID</strong> with your UPI app. Confirming marks the pieces as Sold. Rejecting puts them back on sale.</p>
      </div>

      <ul className="space-y-6">
        {pending.map((o) => (
          <li key={o.orderNumber} className="card overflow-hidden md:grid md:grid-cols-[260px_1fr]">
            <div className="bg-wash p-4">
              <p className="mb-2 text-xs text-muted">Customer&apos;s screenshot</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img(IMG.hero, 500)} alt={`Payment screenshot for ${o.orderNumber}`} className="aspect-[3/4] w-full rounded-xl object-cover" />
            </div>
            <div className="card-pad">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div><h2 className="text-lg font-semibold">{o.orderNumber}</h2><p className="text-sm text-muted">{o.customer} · {o.phone}</p></div>
                <span className="chip chip-warn"><Icon name="clock" className="h-3.5 w-3.5" /> Held until 12:12 pm</span>
              </div>
              <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-line bg-paper px-4 py-3"><dt className="text-xs text-muted">Amount to match</dt><dd className="display text-2xl">{inr(o.total)}</dd></div>
                <div className="rounded-xl border border-line bg-paper px-4 py-3"><dt className="text-xs text-muted">UPI transaction ID</dt><dd className="mt-1 text-lg font-semibold">{o.txnId}</dd></div>
              </dl>
              <p className="mt-5 text-sm text-muted">Pieces: {o.productIds.map((id) => getById(id).title).join(", ")}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="btn btn-ok"><Icon name="check" className="h-4 w-4" /> Confirm payment</button>
                <button className="btn btn-danger"><Icon name="x" className="h-4 w-4" /> Reject</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
