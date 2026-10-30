import { Suspense } from "react";
import PageSkeleton from "@/components/ui/PageSkeleton";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { store } from "@/lib/config";

async function OrderPlacedContent({ params }: { params: Promise<{ orderNo: string }> }) {
  const { orderNo } = await params;
  const wa = `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(`Hi! I just placed order ${orderNo} and paid by UPI.`)}`;
  return (
    <div className="wrap py-12 md:py-20">
      <div className="mx-auto max-w-xl text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-oksoft text-ok"><Icon name="check" className="h-8 w-8" /></span>
        <h1 className="page-title mt-6">Thank you. Order placed.</h1>
        <p className="mt-3 text-muted">Your order number is <span className="font-semibold text-ink">{orderNo}</span>. We&apos;ve emailed you the details.</p>

        <div className="card card-pad mt-8 text-left">
          <h2 className="font-semibold">What happens next</h2>
          <ol className="mt-4 space-y-4 text-sm">
            {[
              ["We check your payment", "We match your transaction ID with our UPI app. This usually takes a few hours."],
              ["We confirm and pack", "You get an email when your payment is confirmed. The piece is then yours."],
              ["We deliver", "We message you on WhatsApp when it's out for delivery."],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-wash text-xs font-semibold">{i + 1}</span><div><p className="font-medium">{t}</p><p className="text-muted">{d}</p></div></li>
            ))}
          </ol>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a href={wa} className="btn btn-brand"><Icon name="chat" className="h-4 w-4" /> Message us on WhatsApp</a>
          <Link href={`/account/orders/${orderNo}`} className="btn btn-line">Track my order</Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderPlaced(props: Parameters<typeof OrderPlacedContent>[0]) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <OrderPlacedContent {...props} />
    </Suspense>
  );
}
