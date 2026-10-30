import { Suspense } from "react";
import PageSkeleton from "@/components/ui/PageSkeleton";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import Empty from "@/components/ui/Empty";
import Icon from "@/components/ui/Icon";
import { products, categories, sizes } from "@/lib/mock-data";

type Search = { category?: string; size?: string; gender?: string; sort?: string; q?: string };

function Filters({ s }: { s: Search }) {
  return (
    <form action="/shop" className="space-y-7">
      <fieldset>
        <legend className="mb-3 text-sm font-semibold">Category</legend>
        <div className="space-y-2.5">
          {categories.map((c) => (
            <label key={c} className="flex items-center gap-3 text-sm">
              <input type="radio" name="category" value={c} defaultChecked={s.category === c} className="h-4 w-4 accent-ink" /> {c}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-3 text-sm font-semibold">Gender</legend>
        <div className="space-y-2.5">
          {["Women", "Men", "Unisex"].map((g) => (
            <label key={g} className="flex items-center gap-3 text-sm">
              <input type="radio" name="gender" value={g} defaultChecked={s.gender === g} className="h-4 w-4 accent-ink" /> {g}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-3 text-sm font-semibold">Size</legend>
        <div className="flex flex-wrap gap-2">
          {sizes.map((z) => (
            <label key={z} className="cursor-pointer">
              <input type="radio" name="size" value={z} defaultChecked={s.size === z} className="peer sr-only" />
              <span className="inline-block rounded-lg border border-line bg-panel px-3 py-1.5 text-sm peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-brand">{z}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-3 text-sm font-semibold">Price (₹)</legend>
        <div className="flex items-center gap-2">
          <input name="min" placeholder="Min" inputMode="numeric" className="input h-10" />
          <span className="text-muted">to</span>
          <input name="max" placeholder="Max" inputMode="numeric" className="input h-10" />
        </div>
      </fieldset>
      <div className="flex gap-3">
        <button className="btn btn-dark btn-sm flex-1 !h-11">Apply filters</button>
        <Link href="/shop" className="btn btn-line btn-sm !h-11">Clear</Link>
      </div>
    </form>
  );
}

async function ShopContent({ searchParams }: { searchParams: Promise<Search> }) {
  const s = await searchParams;
  let list = products.filter((p) => p.status !== "HIDDEN");
  if (s.category) list = list.filter((p) => p.category === s.category);
  if (s.gender) list = list.filter((p) => p.gender === s.gender);
  if (s.size) list = list.filter((p) => p.size === s.size);
  if (s.q) list = list.filter((p) => (p.title + p.description).toLowerCase().includes(s.q!.toLowerCase()));
  if (s.sort === "low") list = [...list].sort((a, b) => a.price - b.price);
  if (s.sort === "high") list = [...list].sort((a, b) => b.price - a.price);

  return (
    <div className="wrap py-8 md:py-12">
      <nav className="mb-4 text-sm text-muted" aria-label="Breadcrumb"><Link href="/" className="hover:text-ink">Home</Link> / <span className="text-ink">Shop</span></nav>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="page-title">{s.category ?? "All pieces"}</h1>
          <p className="mt-1 text-muted">{list.length} {list.length === 1 ? "piece" : "pieces"}. Sold pieces stay visible for a while.</p>
        </div>
        <form action="/shop" className="flex items-center gap-2">
          {s.category && <input type="hidden" name="category" value={s.category} />}
          <label htmlFor="sort" className="text-sm text-muted">Sort by</label>
          <select id="sort" name="sort" defaultValue={s.sort ?? "newest"} className="input h-10 w-44">
            <option value="newest">Newest first</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
          <button className="btn btn-line btn-sm !h-10">Sort</button>
        </form>
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
        {["All", ...categories].map((c) => {
          const active = (s.category ?? "All") === c;
          return <Link key={c} href={c === "All" ? "/shop" : `/shop?category=${c}`} className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium ${active ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-ink"}`}>{c}</Link>;
        })}
      </div>

      <details className="mt-6 rounded-xl border border-line bg-panel p-4 lg:hidden">
        <summary className="flex items-center justify-between text-sm font-medium"><span className="flex items-center gap-2"><Icon name="filter" className="h-4 w-4" /> Filters</span><Icon name="down" className="h-4 w-4" /></summary>
        <div className="mt-5"><Filters s={s} /></div>
      </details>

      <div className="mt-8 grid gap-10 lg:grid-cols-[250px_1fr]">
        <aside className="sticky top-28 hidden self-start lg:block"><Filters s={s} /></aside>
        <div>
          {list.length === 0 ? (
            <Empty icon="search" title="No pieces match these filters" text="Try removing a filter, or check back soon. New pieces arrive every week." href="/shop" cta="Clear filters" />
          ) : (
            <>
              <div className="grid grid-cols-2 gap-x-4 gap-y-9 xl:grid-cols-3 lg:gap-x-6">
                {list.map((p) => <ProductCard key={p.id} p={p} />)}
              </div>
              <div className="mt-14 flex justify-center gap-2 text-sm">
                {[1, 2, 3].map((n) => (
                  <span key={n} className={`grid h-10 w-10 place-items-center rounded-full ${n === 1 ? "bg-ink text-white" : "border border-line bg-panel"}`}>{n}</span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Shop(props: Parameters<typeof ShopContent>[0]) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ShopContent {...props} />
    </Suspense>
  );
}
