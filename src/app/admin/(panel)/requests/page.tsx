import PageHead from "@/components/admin/PageHead";
import StatusChip from "@/components/ui/StatusChip";
import Icon from "@/components/ui/Icon";
import { sellRequests } from "@/lib/mock-data";
import { inr } from "@/lib/config";

export default function Requests() {
  return (
    <>
      <PageHead title="Sell or swap requests" text="Clothes customers want to sell or swap. Reply on WhatsApp." />
      <ul className="space-y-4">
        {sellRequests.map((r) => (
          <li key={r.id} className="card card-pad flex flex-col gap-5 sm:flex-row">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={r.image} alt={r.item} className="h-40 w-32 rounded-xl object-cover" />
            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-lg font-semibold">{r.item}</h2><StatusChip status={r.status} /></div>
              <p className="mt-1 text-sm text-muted">{r.customer} · {r.date} · {r.type}</p>
              <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm">
                <div><dt className="text-muted">Size</dt><dd className="font-medium">{r.size}</dd></div>
                <div><dt className="text-muted">Condition</dt><dd className="font-medium">{r.condition}</dd></div>
                <div><dt className="text-muted">Expected price</dt><dd className="font-medium">{inr(r.price)}</dd></div>
              </dl>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href="https://wa.me/919999999999" className="btn btn-brand btn-sm"><Icon name="chat" className="h-4 w-4" /> Reply on WhatsApp</a>
                <button className="btn btn-line btn-sm">Accept</button>
                <button className="btn btn-line btn-sm text-bad">Decline</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
