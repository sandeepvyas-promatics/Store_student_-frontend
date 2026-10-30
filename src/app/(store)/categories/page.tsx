import Link from "next/link";
import { img, IMG } from "@/lib/mock-data";

const tiles = [
  { name: "Women", q: "gender=Women", image: IMG.coat, text: "Coats, bags and everyday pieces" },
  { name: "Men", q: "gender=Men", image: IMG.leather, text: "Jackets, tees and more" },
  { name: "Jackets", q: "category=Jackets", image: IMG.bomber, text: "Bombers, leather and denim" },
  { name: "Coats", q: "category=Coats", image: IMG.coat, text: "Warm layers for winter" },
  { name: "Tops", q: "category=Tops", image: IMG.tee, text: "Tees, shirts and knits" },
  { name: "Bags", q: "category=Bags", image: IMG.bag, text: "Handbags and carry-alls" },
];

export default function Categories() {
  return (
    <>
      <section className="bg-aurora"><div className="wrap py-12 sm:py-16"><span className="eyebrow">Browse</span><h1 className="page-title mt-3 sm:!text-4xl">Shop by category</h1><p className="mt-2 max-w-lg text-muted">Pick a category to see every piece in it. Each one is the only one we have.</p></div></section>
      <div className="wrap grid gap-5 py-10 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((t) => (
          <Link key={t.name} href={`/shop?${t.q}`} className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-wash">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img(t.image, 800)} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
            <div className="absolute inset-x-5 bottom-5 text-white"><p className="display text-2xl font-bold">{t.name}</p><p className="text-sm text-white/80">{t.text}</p></div>
          </Link>
        ))}
      </div>
    </>
  );
}
