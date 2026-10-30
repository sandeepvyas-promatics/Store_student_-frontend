import { Suspense } from "react";
import PageSkeleton from "@/components/ui/PageSkeleton";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import StatusChip from "@/components/ui/StatusChip";
import { getOrder, getById } from "@/lib/mock-data";
import { inr } from "@/lib/config";

const steps = [
  ["PLACED", "Placed"], ["PAYMENT_REVIEW", "Payment under review"], ["PAYMENT_CONFIRMED", "Payment confirmed"],
  ["PACKED", "Packed"], ["OUT_FOR_DELIVERY", "Out for delivery"], ["DELIVERED", "Delivered"],
];

async function OrderDetailContent({ params }: { params: Promise<{ orderNo: string }> }) {
  const { orderNo } = await params;
  const o = getOrder(orderNo);
  const current = steps.findIndex(([k]) => k === o.orderStatus);

  return (
    <>
      <Link href="/account/orders" className="text-sm text-muted hover:text-ink">← All orders</Link>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="page-title">{o.orderNumber}</h1><p className="text-muted">Placed {o.createdAt}</p></div>
        <StatusChip status={o.orderStatus} />
      </div>

      {o.orderStatus === "CANCELLED" && (
        <div className="mt-6 rounded-xl border border-bad/30 bg-badsoft px-5 py-4 text-sm text-bad">
          <p className="font-semibold">This order was cancelled</p>
          <p className="mt-1">We could not match your payment, so the pieces went back on sale. Message us on WhatsApp if you think this is a mistake.</p>
        </div>
      )}
      <section className="card card-pad mt-8">
        <h2 className="font-semibold">Order progress</h2>
        <ol className="mt-5 space-y-0">
          {steps.map(([k, label], i) => {
            const done = i <= current;
            return (
              <li key={k} className="relative flex gap-4 pb-6 last:pb-0">
                {i < steps.length - 1 && <span className={`absolute left-[13px] top-7 h-full w-0.5 ${i < current ? "bg-ink" : "bg-line"}`} />}
                <span className={`relative z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full ${done ? "bg-ink text-white" : "border border-line bg-panel text-muted"}`}>{done ? <Icon name="check" className="h-4 w-4" /> : <span className="text-xs">{i + 1}</span>}</span>
                <p className={`pt-0.5 text-sm ${done ? "font-medium" : "text-muted"}`}>{label}{i === current && <span className="ml-2 text-xs font-normal text-brand">Current step</span>}</p>
              </li>
            );
          })}
        </ol>
      </section>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <section className="card card-pad">
          <h2 className="font-semibold">Pieces</h2>
          <ul className="mt-4 space-y-3">
            {o.productIds.map((id) => { const p = getById(id); return (
              <li key={id} className="flex items-center gap-3 text-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.images[0]} alt="" className="h-16 w-12 rounded-lg object-cover" />
                <div className="flex-1"><p className="font-medium">{p.title}</p><p className="text-muted">Size {p.size}</p></div><span className="font-medium">{inr(p.price)}</span>
              </li>); })}
          </ul>
          <dl className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd>{inr(o.subtotal)}</dd></div>
            {o.discount > 0 && <div className="flex justify-between"><dt className="text-muted">Discount</dt><dd>− {inr(o.discount)}</dd></div>}
            <div className="flex justify-between"><dt className="text-muted">Delivery</dt><dd>{inr(o.deliveryFee)}</dd></div>
            <div className="flex justify-between text-base font-semibold"><dt>Total</dt><dd>{inr(o.total)}</dd></div>
          </dl>
        </section>
        <section className="card card-pad">
          <h2 className="font-semibold">Delivery address</h2>
          <p className="mt-3 text-sm leading-6 text-muted">{o.customer}<br />{o.address}<br />{o.phone}</p>
          <h2 className="mt-6 font-semibold">Payment</h2>
          <p className="mt-3 text-sm text-muted">UPI · Transaction ID {o.txnId ?? "not submitted yet"}</p>
          <div className="mt-2"><StatusChip status={o.paymentStatus} /></div>
        </section>
      </div>
    </>
  );
}

export default function OrderDetail(props: Parameters<typeof OrderDetailContent>[0]) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <OrderDetailContent {...props} />
    </Suspense>
  );
}
