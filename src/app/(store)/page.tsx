import Link from "next/link";
import Icon from "@/components/ui/Icon";
import ProductCard from "@/components/product/ProductCard";
import { products, img, IMG } from "@/lib/mock-data";
import { store } from "@/lib/config";

const cats = [
  { name: "Women", image: IMG.coat, q: "gender=Women" },
  { name: "Men", image: IMG.leather, q: "gender=Men" },
  { name: "Accessories", image: IMG.bag, q: "category=Bags" },
  { name: "Jackets", image: IMG.bomber, q: "category=Jackets" },
];

const perks = [
  { icon: "tag", title: "Hand-picked", text: "Chosen by us, one piece at a time.", tone: "bg-brand/10 text-brand" },
  { icon: "shield", title: "Honest condition", text: "Like new, Very good or Good. No surprises.", tone: "bg-oksoft text-ok" },
  { icon: "rupee", title: "Pay by UPI", text: "Scan, pay and send us the transaction ID.", tone: "bg-tagsoft text-[#92400e]" },
  { icon: "truck", title: "Delivered to you", text: `Hostels, PGs and homes in ${store.city}.`, tone: "bg-badsoft text-bad" },
];

const steps = [
  ["Pick your piece", "Add it to your bag and sign in at checkout. We hold it for you for 15 minutes."],
  ["Pay with UPI", "Pay the exact amount in your own UPI app, then send us the transaction ID and a screenshot."],
  ["We confirm and deliver", "Once we confirm your payment, the piece is yours. We pack it and bring it to your door."],
];

const insta = [IMG.bomber, IMG.leather, IMG.bag, IMG.tee, IMG.coat, IMG.hero];

export default function Home() {
  const fresh = products.filter((p) => p.status !== "SOLD").slice(0, 4);
  return (
    <>
      {/* HERO */}
      <section className="bg-aurora">
        <div className="wrap grid items-center gap-10 py-12 md:grid-cols-[1.1fr_1fr] md:py-20">
          <div>
            <span className="eyebrow"><span className="h-1.5 w-1.5 rounded-full bg-brand" /> New pieces every week</span>
            <h1 className="display mt-5 text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              Clothes with a story.<br /><span className="gradient-text">One of a kind.</span>
            </h1>
            <p className="mt-5 max-w-md text-lg leading-8 text-ink/70">Hand-picked pieces at fair prices. Each one is the only one we have, so when it&apos;s sold, it&apos;s gone for good.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop?sort=newest" className="btn btn-brand btn-lg">Shop new arrivals <Icon name="chevron" className="h-4 w-4" /></Link>
              <Link href="/account/sell-or-swap" className="btn btn-line btn-lg">Sell or swap yours</Link>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6">
              {[["1 of 1", "Every piece"], [`₹${store.deliveryFee}`, "Flat delivery"], [`${store.payWithinMinutes} min`, "Held at checkout"]].map(([a, b]) => (
                <div key={b}><dt className="display text-xl font-bold">{a}</dt><dd className="text-xs text-muted">{b}</dd></div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto h-[440px] w-full max-w-md sm:h-[520px]">
            <div className="absolute right-0 top-0 h-[75%] w-[62%] rotate-3 overflow-hidden rounded-2xl border-4 border-white bg-wash shadow-2xl shadow-ink/15">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img(IMG.coat, 700)} alt="Burgundy wool coat" className="h-full w-full object-cover" />
            </div>
            <div className="absolute bottom-0 left-0 h-[62%] w-[52%] -rotate-3 overflow-hidden rounded-2xl border-4 border-white bg-wash shadow-2xl shadow-ink/15">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img(IMG.bomber, 600)} alt="Rust bomber jacket" className="h-full w-full object-cover" />
            </div>
            <div className="absolute bottom-6 right-2 w-48 rounded-xl border border-line bg-white p-4 shadow-xl">
              <p className="text-xs text-muted">Just in · Size S</p>
              <p className="mt-0.5 text-sm font-semibold">Burgundy wool coat</p>
              <div className="mt-2 flex items-center justify-between"><span className="font-bold">₹2,799</span><span className="chip bg-tag text-ink">1 of 1</span></div>
            </div>
            <span className="absolute left-2 top-6 chip bg-ink text-white shadow-lg">New drop</span>
          </div>
        </div>
      </section>

      {/* PERKS */}
      <section className="wrap -mt-6">
        <div className="grid grid-cols-1 gap-5 rounded-2xl border border-line bg-white p-6 shadow-lg shadow-ink/5 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((t) => (
            <div key={t.title} className="flex items-start gap-3">
              <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${t.tone}`}><Icon name={t.icon} /></span>
              <div><p className="text-sm font-semibold">{t.title}</p><p className="mt-0.5 text-xs leading-5 text-muted">{t.text}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="wrap mt-20">
        <div className="mb-6 flex items-end justify-between">
          <div><h2 className="display text-2xl font-bold sm:text-3xl">Shop by category</h2><p className="mt-1 text-muted">Find your style, one piece at a time.</p></div>
          <Link href="/categories" className="text-sm font-semibold text-brand hover:underline">View all</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {cats.map((c) => (
            <Link key={c.name} href={`/shop?${c.q}`} className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-wash">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img(c.image, 600)} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-white">
                <p className="display text-lg font-bold">{c.name}</p>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/20 backdrop-blur transition group-hover:bg-white group-hover:text-ink"><Icon name="chevron" className="h-4 w-4" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="wrap mt-20">
        <div className="mb-6 flex items-end justify-between">
          <div><h2 className="display text-2xl font-bold sm:text-3xl">New arrivals</h2><p className="mt-1 text-muted">Fresh from the rail. Once they&apos;re sold, they&apos;re gone.</p></div>
          <Link href="/shop?sort=newest" className="text-sm font-semibold text-brand hover:underline">View all</Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-9 lg:grid-cols-4 lg:gap-x-6">
          {fresh.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mt-20 bg-gradient-to-b from-brand/5 to-transparent py-16">
        <div className="wrap">
          <div className="mx-auto max-w-xl text-center"><span className="eyebrow">Simple and safe</span><h2 className="display mt-3 text-2xl font-bold sm:text-3xl">How buying works</h2></div>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map(([t, d], i) => (
              <li key={t} className="card card-pad card-hover">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand to-indigo-600 text-sm font-bold text-white">{i + 1}</span>
                <h3 className="mt-4 text-lg font-bold">{t}</h3><p className="mt-1.5 text-sm leading-6 text-muted">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SELL OR SWAP */}
      <section className="wrap">
        <div className="relative overflow-hidden rounded-2xl bg-ink p-8 text-white sm:p-12">
          <div className="absolute -right-10 -top-16 h-56 w-56 rounded-full bg-brand/40 blur-3xl" />
          <div className="absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-tag/25 blur-3xl" />
          <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div><h2 className="display text-2xl font-bold sm:text-3xl">Got clothes you no longer wear?</h2><p className="mt-2 max-w-md text-white/70">Send us a few photos and tell us what you&apos;d like for them. We reply on WhatsApp.</p></div>
            <Link href="/account/sell-or-swap" className="btn btn-lg bg-white text-ink hover:bg-white/90">Sell or swap with us</Link>
          </div>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="wrap mt-20">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div><h2 className="display text-2xl font-bold sm:text-3xl">See it on Instagram</h2><p className="mt-1 text-muted">New drops land there first. Follow {store.instagramHandle}.</p></div>
          <a href={store.instagram} className="btn btn-line btn-sm">Follow us <Icon name="external" className="h-3.5 w-3.5" /></a>
        </div>
        <div className="grid grid-cols-3 gap-3 lg:grid-cols-6">
          {insta.map((id, i) => (
            <a key={i} href={store.instagram} className="group aspect-square overflow-hidden rounded-xl bg-wash">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img(id, 400)} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
