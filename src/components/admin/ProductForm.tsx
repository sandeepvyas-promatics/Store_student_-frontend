import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { categories, sizes } from "@/lib/mock-data";
import type { Product } from "@/types";

export default function ProductForm({ p }: { p?: Product }) {
  return (
    <form className="grid gap-6 xl:grid-cols-[1fr_340px]">
      <div className="space-y-6">
        <section className="card card-pad">
          <h2 className="text-lg font-semibold">Photos</h2>
          <p className="hint mb-4">Add 3 to 6 photos. The first one is the cover. Drag to reorder.</p>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {(p?.images ?? []).map((src, i) => (
              <div key={i} className="relative aspect-[4/5] overflow-hidden rounded-xl bg-wash">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="h-full w-full object-cover" />
                {i === 0 && <span className="chip absolute left-2 top-2 bg-ink text-white">Cover</span>}
                <button type="button" className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-panel" aria-label="Remove photo"><Icon name="x" className="h-3.5 w-3.5" /></button>
              </div>
            ))}
            <label className="grid aspect-[4/5] cursor-pointer place-items-center rounded-xl border-2 border-dashed border-line bg-paper text-center text-xs text-muted hover:border-ink">
              <span><Icon name="upload" className="mx-auto mb-1 h-5 w-5" />Add photo</span><input type="file" multiple accept="image/*" className="sr-only" />
            </label>
          </div>
        </section>

        <section className="card card-pad">
          <h2 className="text-lg font-semibold">Details</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2"><label className="label" htmlFor="t">Title</label><input id="t" className="input" defaultValue={p?.title} placeholder="Rust bomber jacket" /><p className="hint">The page address is made from the title.</p></div>
            <div><label className="label" htmlFor="c">Category</label><select id="c" className="input" defaultValue={p?.category}>{categories.map((c) => <option key={c}>{c}</option>)}</select></div>
            <div><label className="label" htmlFor="g">Gender</label><select id="g" className="input" defaultValue={p?.gender}><option>Women</option><option>Men</option><option>Unisex</option></select></div>
            <div><label className="label" htmlFor="s">Size</label><select id="s" className="input" defaultValue={p?.size}>{sizes.map((s) => <option key={s}>{s}</option>)}</select></div>
            <div><label className="label" htmlFor="cd">Condition</label><select id="cd" className="input" defaultValue={p?.condition}><option>Like new</option><option>Very good</option><option>Good</option></select></div>
            <div className="sm:col-span-2"><label className="label" htmlFor="m">Measurements</label><input id="m" className="input" defaultValue={p?.measurements} placeholder="Chest 22 in · Length 25 in · Sleeve 24 in" /></div>
            <div className="sm:col-span-2"><label className="label" htmlFor="d">Description</label><textarea id="d" className="input" defaultValue={p?.description} placeholder="Fabric, fit, any small flaws" /></div>
          </div>
        </section>
      </div>

      <aside className="space-y-6">
        <section className="card card-pad">
          <h2 className="text-lg font-semibold">Price and status</h2>
          <div className="mt-5 space-y-5">
            <div><label className="label" htmlFor="pr">Price (₹)</label><input id="pr" className="input" inputMode="numeric" defaultValue={p?.price} /></div>
            <div><label className="label" htmlFor="st">Status</label><select id="st" className="input" defaultValue={p?.status ?? "AVAILABLE"}><option value="AVAILABLE">Available</option><option value="RESERVED">Reserved</option><option value="SOLD">Sold</option><option value="HIDDEN">Hidden</option></select>
              <p className="hint">Use Sold for pieces sold on Instagram or in person, so the website never sells them twice.</p></div>
          </div>
        </section>
        <div className="flex flex-col gap-3">
          <Link href="/admin/products" className="btn btn-dark btn-block">{p ? "Save changes" : "Publish piece"}</Link>
          <button type="button" className="btn btn-line btn-block">Save as hidden</button>
        </div>
      </aside>
    </form>
  );
}
