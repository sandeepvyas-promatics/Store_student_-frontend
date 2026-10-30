import Link from "next/link";
import StatusChip from "@/components/ui/StatusChip";
import { orders, getById } from "@/lib/mock-data";
import { inr } from "@/lib/config";

export default function Orders() {
  return (
    <>
      <h1 className="page-title">My orders</h1>
      <ul className="mt-8 space-y-4">
        {orders.map((o) => (
          <li key={o.orderNumber} className="card card-pad">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div><p className="font-semibold">{o.orderNumber}</p><p className="text-sm text-muted">{o.createdAt}</p></div>
              <StatusChip status={o.orderStatus} />
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="flex -space-x-3">
                {o.productIds.map((id) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={id} src={getById(id).images[0]} alt="" className="h-16 w-14 rounded-lg border-2 border-panel object-cover" />
                ))}
              </div>
              <div className="text-right"><p className="text-sm text-muted">Total</p><p className="font-semibold">{inr(o.total)}</p></div>
            </div>
            <Link href={`/account/orders/${o.orderNumber}`} className="btn btn-line btn-sm mt-5">View details</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
