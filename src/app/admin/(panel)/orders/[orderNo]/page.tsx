import { Suspense } from "react";
import PageSkeleton from "@/components/ui/PageSkeleton";
import Link from "next/link";
import PageHead from "@/components/admin/PageHead";
import StatusChip from "@/components/ui/StatusChip";
import Icon from "@/components/ui/Icon";
import { getOrder, getById } from "@/lib/mock-data";
import { inr } from "@/lib/config";

async function AdminOrderContent({ params }: { params: Promise<{ orderNo: string }> }) {
  const { orderNo } = await params;
  const o = getOrder(orderNo);
  return (
    <>
      <Link href="/admin/orders" className="text-sm text-muted hover:text-ink">← Orders</Link>
      <div className="mt-3">
        <PageHead title={o.orderNumber} text={`Placed ${o.createdAt}`}>
          <button className="btn btn-line btn-sm"><Icon name="print" className="h-4 w-4" /> Print packing slip</button>
          <button className="btn btn-danger btn-sm">Cancel order</button>
        </PageHead>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <section className="card card-pad">
            <h2 className="font-semibold">Pieces</h2>
            <ul className="mt-4 divide-y divide-line">
              {o.productIds.map((id) => { const p = getById(id); return (
                <li key={id} className="flex items-center gap-4 py-3 first:pt-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.images[0]} alt="" className="h-20 w-16 rounded-lg object-cover" />
                  <div className="flex-1"><p className="font-medium">{p.title}</p><p className="text-sm text-muted">Size {p.size} · {p.condition}</p></div>
                  <div className="text-right"><p className="font-medium">{inr(p.price)}</p><StatusChip status={p.status} /></div>
                </li>); })}
            </ul>
            <dl className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
              <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd>{inr(o.subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Discount</dt><dd>− {inr(o.discount)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Delivery</dt><dd>{inr(o.deliveryFee)}</dd></div>
              <div className="flex justify-between text-base font-semibold"><dt>Total</dt><dd>{inr(o.total)}</dd></div>
            </dl>
          </section>
          <section className="card card-pad">
            <h2 className="font-semibold">Customer and delivery</h2>
            <p className="mt-3 text-sm leading-6 text-muted"><span className="font-medium text-ink">{o.customer}</span><br />{o.phone}<br />{o.address}</p>
            <a href={`https://wa.me/91${o.phone.replace(/\D/g, "")}`} className="btn btn-line btn-sm mt-4"><Icon name="chat" className="h-4 w-4" /> Message on WhatsApp</a>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="card card-pad">
            <h2 className="font-semibold">Update status</h2>
            <label className="label mt-4" htmlFor="os">Delivery status</label>
            <select id="os" className="input" defaultValue={o.orderStatus}>
              <option value="PLACED">Placed</option><option value="PAYMENT_REVIEW">Payment under review</option><option value="PAYMENT_CONFIRMED">Payment confirmed</option>
              <option value="PACKED">Packed</option><option value="OUT_FOR_DELIVERY">Out for delivery</option><option value="DELIVERED">Delivered</option>
            </select>
            <button className="btn btn-dark btn-block mt-4">Save status</button>
          </section>
          <section className="card card-pad">
            <h2 className="font-semibold">Payment</h2>
            <div className="mt-3"><StatusChip status={o.paymentStatus} /></div>
            <p className="mt-3 text-sm text-muted">UPI transaction ID<br /><span className="font-medium text-ink">{o.txnId ?? "Not submitted yet"}</span></p>
            {o.paymentStatus === "UNDER_REVIEW" && <Link href="/admin/payments" className="btn btn-dark btn-sm mt-4">Review payment</Link>}
          </section>
        </aside>
      </div>
    </>
  );
}

export default function AdminOrder(props: Parameters<typeof AdminOrderContent>[0]) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <AdminOrderContent {...props} />
    </Suspense>
  );
}
