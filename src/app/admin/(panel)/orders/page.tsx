import Link from "next/link";
import PageHead from "@/components/admin/PageHead";
import StatusChip from "@/components/ui/StatusChip";
import { orders } from "@/lib/mock-data";
import { inr } from "@/lib/config";

export default function AdminOrders() {
  return (
    <>
      <PageHead title="Orders" text="Every order, newest first." />
      <form className="mb-5 flex flex-wrap gap-3">
        <select className="input h-10 w-52" aria-label="Filter by status"><option>All statuses</option><option>Payment under review</option><option>Packed</option><option>Out for delivery</option><option>Delivered</option><option>Cancelled</option></select>
        <input type="date" className="input h-10 w-44" aria-label="From date" />
        <button className="btn btn-line btn-sm !h-10">Filter</button>
      </form>
      <div className="card overflow-x-auto">
        <table className="tbl">
          <thead><tr><th>Order</th><th>Customer</th><th>Pieces</th><th>Total</th><th>Payment</th><th>Delivery</th><th>Placed</th></tr></thead>
          <tbody>{orders.map((o) => (
            <tr key={o.orderNumber}>
              <td className="font-medium"><Link href={`/admin/orders/${o.orderNumber}`} className="hover:text-brand">{o.orderNumber}</Link></td>
              <td>{o.customer}<p className="text-xs text-muted">{o.phone}</p></td><td>{o.productIds.length}</td><td>{inr(o.total)}</td>
              <td><StatusChip status={o.paymentStatus} /></td><td><StatusChip status={o.orderStatus} /></td><td className="whitespace-nowrap text-muted">{o.createdAt}</td>
            </tr>))}</tbody>
        </table>
      </div>
    </>
  );
}
