import Link from "next/link";
import PageHead from "@/components/admin/PageHead";
import StatCard from "@/components/admin/StatCard";
import StatusChip from "@/components/ui/StatusChip";
import { orders, products } from "@/lib/mock-data";
import { inr } from "@/lib/config";

export default function Dashboard() {
  const pending = orders.filter((o) => o.paymentStatus === "UNDER_REVIEW");
  const stock = products.filter((p) => p.status === "AVAILABLE").length;
  const cats = [["Jackets", 62], ["Coats", 24], ["Bags", 9], ["Tops", 5]] as const;
  return (
    <>
      <PageHead title="Dashboard" text="Thursday, 29 October 2026">
        <Link href="/admin/products/new" className="btn btn-dark btn-sm">Add a piece</Link>
      </PageHead>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard label="Orders today" value="3" note="2 need a payment check" icon="box" />
        <StatCard label="Sales this week" value={inr(9420)} note="4 pieces sold" icon="rupee" />
        <StatCard label="Pieces in stock" value={String(stock)} note="1 reserved right now" icon="tag" />
        <StatCard label="Payments to review" value={String(pending.length)} note="Customers are waiting" icon="clock" alert />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <section className="card">
          <div className="flex items-center justify-between p-5 pb-3"><h2 className="font-semibold">Waiting for your decision</h2><Link href="/admin/payments" className="text-sm text-brand hover:underline">Review all</Link></div>
          <ul>
            {pending.map((o) => (
              <li key={o.orderNumber} className="flex items-center justify-between gap-3 border-t border-line px-5 py-4">
                <div><p className="font-medium">{o.orderNumber} · {o.customer}</p><p className="text-sm text-muted">UPI ID {o.txnId} · {o.createdAt}</p></div>
                <div className="flex items-center gap-4"><span className="font-semibold">{inr(o.total)}</span><Link href="/admin/payments" className="btn btn-dark btn-sm">Review</Link></div>
              </li>
            ))}
          </ul>
        </section>

        <section className="card card-pad">
          <h2 className="font-semibold">Best categories</h2>
          <ul className="mt-5 space-y-4">
            {cats.map(([c, n]) => (
              <li key={c}><div className="mb-1.5 flex justify-between text-sm"><span>{c}</span><span className="text-muted">{n}%</span></div><div className="h-2 rounded-full bg-wash"><div className="h-2 rounded-full bg-ink" style={{ width: `${n}%` }} /></div></li>
            ))}
          </ul>
        </section>
      </div>

      <section className="card mt-6 overflow-x-auto">
        <div className="flex items-center justify-between p-5 pb-3"><h2 className="font-semibold">Recent orders</h2><Link href="/admin/orders" className="text-sm text-brand hover:underline">All orders</Link></div>
        <table className="tbl">
          <thead><tr><th>Order</th><th>Customer</th><th>Total</th><th>Payment</th><th>Status</th></tr></thead>
          <tbody>{orders.slice(0, 4).map((o) => (
            <tr key={o.orderNumber}><td className="font-medium"><Link href={`/admin/orders/${o.orderNumber}`} className="hover:text-brand">{o.orderNumber}</Link></td><td>{o.customer}</td><td>{inr(o.total)}</td><td><StatusChip status={o.paymentStatus} /></td><td><StatusChip status={o.orderStatus} /></td></tr>
          ))}</tbody>
        </table>
      </section>
    </>
  );
}
