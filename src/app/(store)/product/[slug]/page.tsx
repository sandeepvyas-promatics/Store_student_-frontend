import { Suspense } from "react";
import PageSkeleton from "@/components/ui/PageSkeleton";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/product/ProductGallery";
import AddToCart from "@/components/product/AddToCart";
import ProductCard from "@/components/product/ProductCard";
import StatusChip from "@/components/ui/StatusChip";
import Icon from "@/components/ui/Icon";
import { getProduct, products } from "@/lib/mock-data";
import { inr, store } from "@/lib/config";

async function ProductPageContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const more = products.filter((x) => x.id !== p.id && x.status !== "SOLD").slice(0, 4);

  return (
    <div className="wrap py-8 md:py-12">
      <nav className="mb-6 text-sm text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-ink">Home</Link> / <Link href="/shop" className="hover:text-ink">Shop</Link> / <span className="text-ink">{p.title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
        <ProductGallery images={p.images} title={p.title} sold={p.status === "SOLD"} />

        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex items-center gap-2">
            <StatusChip status={p.status} />
            <span className="chip bg-tagsoft text-[#92400e]">1 of 1</span>
          </div>
          <h1 className="page-title mt-4">{p.title}</h1>
          <p className="mt-3 text-3xl font-semibold">{inr(p.price)}</p>

          <dl className="mt-6 grid grid-cols-3 gap-3 text-sm">
            {[["Size", p.size], ["Condition", p.condition], ["Fit", p.gender]].map(([k, v]) => (
              <div key={k} className="rounded-xl border border-line bg-panel px-4 py-3">
                <dt className="text-xs text-muted">{k}</dt>
                <dd className="mt-0.5 font-medium">{v}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 max-w-prose leading-7 text-muted">{p.description}</p>

          <div className="mt-7"><AddToCart status={p.status} /></div>

          <div className="mt-5 flex items-start gap-3 rounded-xl bg-tagsoft px-4 py-3 text-sm text-[#92400e]">
            <Icon name="clock" className="mt-0.5 h-5 w-5 shrink-0" />
            <p><strong>Only one in the world.</strong> Once you start checkout we hold it for you for {store.payWithinMinutes} minutes.</p>
          </div>

          <div className="mt-8 divide-y divide-line rounded-xl border border-line bg-panel">
            {[
              ["Measurements", p.measurements],
              ["Delivery", `We deliver to hostels, PGs and homes in ${store.city}. Delivery fee ₹${store.deliveryFee}. See the delivery page for times.`],
              ["Returns and exchanges", "If something isn't as described, tell us within 24 hours of delivery. Read the full policy on the returns page."],
            ].map(([t, d]) => (
              <details key={t} className="group px-5 py-4">
                <summary className="flex items-center justify-between text-sm font-medium">{t}<Icon name="down" className="h-4 w-4 transition group-open:rotate-180" /></summary>
                <p className="mt-3 text-sm leading-6 text-muted">{d}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="page-title mb-8">You may also like</h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-9 lg:grid-cols-4 lg:gap-x-6">
          {more.map((x) => <ProductCard key={x.id} p={x} />)}
        </div>
      </section>
    </div>
  );
}

export default function ProductPage(props: Parameters<typeof ProductPageContent>[0]) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ProductPageContent {...props} />
    </Suspense>
  );
}
