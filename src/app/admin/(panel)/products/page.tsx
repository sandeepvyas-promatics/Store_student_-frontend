import Link from "next/link";
import PageHead from "@/components/admin/PageHead";
import StatusChip from "@/components/ui/StatusChip";
import Icon from "@/components/ui/Icon";
import { products } from "@/lib/mock-data";
import { inr } from "@/lib/config";

export default function AdminProducts() {
  return (
    <>
      <PageHead title="Products" text={`${products.length} pieces in your store`}>
        <Link href="/admin/products/new" className="btn btn-dark btn-sm"><Icon name="plus" className="h-4 w-4" /> Add a piece</Link>
      </PageHead>

      <div className="mb-5 flex flex-wrap gap-2 text-sm">
        {["All", "Available", "Reserved", "Sold", "Hidden"].map((t, i) => (
          <span key={t} className={`rounded-full px-4 py-1.5 ${i === 0 ? "bg-ink text-white" : "border border-line bg-panel"}`}>{t}</span>
        ))}
      </div>

      <div className="card overflow-x-auto">
        <table className="tbl">
          <thead><tr><th>Piece</th><th>Category</th><th>Size</th><th>Price</th><th>Status</th><th className="text-right">Actions</th></tr></thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td><div className="flex items-center gap-3">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={p.images[0]} alt="" className="h-14 w-11 rounded-lg object-cover" /><div><p className="font-medium">{p.title}</p><p className="text-xs text-muted">{p.condition}</p></div></div></td>
                <td>{p.category}</td><td>{p.size}</td><td>{inr(p.price)}</td><td><StatusChip status={p.status} /></td>
                <td><div className="flex justify-end gap-2">
                  <Link href={`/admin/products/${p.id}`} className="btn btn-line btn-sm"><Icon name="edit" className="h-3.5 w-3.5" /> Edit</Link>
                  <button className="btn btn-line btn-sm">{p.status === "SOLD" ? "Mark available" : "Mark sold"}</button>
                  <button className="btn btn-line btn-sm" aria-label="Hide"><Icon name="eye" className="h-3.5 w-3.5" /></button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-muted">Tip: hide a piece instead of deleting it, so old orders still show it.</p>
    </>
  );
}
