import PageHead from "@/components/admin/PageHead";
import StatusChip from "@/components/ui/StatusChip";
import { discounts } from "@/lib/mock-data";
import { inr } from "@/lib/config";

export default function Discounts() {
  return (
    <>
      <PageHead title="Discount codes" text="Create simple codes for offers and welcome gifts." />
      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="card overflow-x-auto">
          <table className="tbl">
            <thead><tr><th>Code</th><th>Offer</th><th>Min. order</th><th>Used</th><th>Expires</th><th>Status</th><th /></tr></thead>
            <tbody>{discounts.map((d) => (
              <tr key={d.code}><td className="font-semibold">{d.code}</td><td>{d.type}</td><td>{inr(d.minOrder)}</td><td>{d.used}</td><td className="whitespace-nowrap">{d.expires}</td>
                <td><StatusChip status={d.active ? "ACTIVE" : "PAUSED"} /></td>
                <td><div className="flex justify-end gap-2"><button className="btn btn-line btn-sm">{d.active ? "Pause" : "Resume"}</button><button className="btn btn-line btn-sm text-bad">Delete</button></div></td></tr>
            ))}</tbody>
          </table>
        </div>

        <form className="card card-pad h-fit">
          <h2 className="text-lg font-semibold">New code</h2>
          <div className="mt-5 space-y-4">
            <div><label className="label" htmlFor="cd">Code</label><input id="cd" className="input" placeholder="WELCOME10" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="label" htmlFor="ty">Type</label><select id="ty" className="input"><option>Percent off</option><option>Flat amount off</option></select></div>
              <div><label className="label" htmlFor="vl">Value</label><input id="vl" className="input" inputMode="numeric" placeholder="10" /></div>
            </div>
            <div><label className="label" htmlFor="mo">Minimum order (₹)</label><input id="mo" className="input" inputMode="numeric" placeholder="999" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="label" htmlFor="ex">Expiry date</label><input id="ex" type="date" className="input" /></div>
              <div><label className="label" htmlFor="ul">Usage limit</label><input id="ul" className="input" inputMode="numeric" placeholder="100" /></div>
            </div>
            <button className="btn btn-dark btn-block">Create code</button>
          </div>
        </form>
      </div>
    </>
  );
}
