import Icon from "@/components/ui/Icon";
import StatusChip from "@/components/ui/StatusChip";
import { sellRequests } from "@/lib/mock-data";
import { inr } from "@/lib/config";

export default function SellOrSwap() {
  return (
    <>
      <h1 className="page-title">Sell or swap</h1>
      <p className="mt-1 max-w-xl text-muted">Send us photos and details of clothes you no longer wear. We review each request and reply on WhatsApp.</p>

      <form className="card card-pad mt-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <span className="label">What would you like to do?</span>
            <div className="grid grid-cols-2 gap-3">
              {["Sell it to the store", "Swap for a piece"].map((t, i) => (
                <label key={t} className="cursor-pointer"><input type="radio" name="kind" defaultChecked={i === 0} className="peer sr-only" />
                  <span className="block rounded-xl border border-line bg-panel px-4 py-3 text-center text-sm peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white">{t}</span></label>
              ))}
            </div>
          </div>
          <div><label className="label" htmlFor="it">Item type</label><input id="it" className="input" placeholder="Denim jacket" /></div>
          <div><label className="label" htmlFor="sz">Size</label><input id="sz" className="input" placeholder="M" /></div>
          <div><label className="label" htmlFor="cd">Condition</label><select id="cd" className="input"><option>Like new</option><option>Very good</option><option>Good</option></select></div>
          <div><label className="label" htmlFor="pr">Expected price (₹)</label><input id="pr" className="input" inputMode="numeric" placeholder="800" /></div>
          <div className="sm:col-span-2">
            <span className="label">Photos (3 to 6)</span>
            <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-line bg-paper px-6 py-9 text-center hover:border-ink">
              <Icon name="upload" className="h-7 w-7 text-muted" /><span className="text-sm font-medium">Tap to add photos</span><span className="text-xs text-muted">Clear photos on a plain background sell best</span>
              <input type="file" multiple accept="image/*" className="sr-only" />
            </label>
          </div>
          <div className="sm:col-span-2"><label className="label" htmlFor="nt">Anything else we should know?</label><textarea id="nt" className="input" placeholder="Brand, flaws, how often you wore it" /></div>
        </div>
        <button className="btn btn-dark mt-6">Send request</button>
      </form>

      <h2 className="mt-12 text-xl font-semibold">Your requests</h2>
      <ul className="mt-4 space-y-3">
        {sellRequests.slice(0, 2).map((r) => (
          <li key={r.id} className="card flex items-center gap-4 p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={r.image} alt="" className="h-16 w-14 rounded-lg object-cover" />
            <div className="min-w-0 flex-1"><p className="truncate font-medium">{r.item}</p><p className="text-sm text-muted">{r.type} · Size {r.size} · {inr(r.price)}</p></div>
            <StatusChip status={r.status} />
          </li>
        ))}
      </ul>
    </>
  );
}
