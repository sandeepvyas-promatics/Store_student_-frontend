"use client";
import { useState } from "react";

export default function ProductGallery({ images, title, sold }: { images: string[]; title: string; sold?: boolean }) {
  const [i, setI] = useState(0);
  return (
    <div className="grid gap-3 md:grid-cols-[84px_1fr]">
      <div className="order-2 flex gap-3 overflow-x-auto md:order-1 md:flex-col">
        {images.map((src, n) => (
          <button key={n} onClick={() => setI(n)} aria-label={`Show photo ${n + 1}`}
            className={`h-24 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-wash md:h-28 md:w-full ${n === i ? "border-ink" : "border-transparent"}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
      <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-xl bg-wash md:order-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={images[i]} alt={title} className={`h-full w-full object-cover ${sold ? "opacity-60 grayscale" : ""}`} />
        {sold && <span className="absolute left-4 top-4 rounded-full bg-ink px-4 py-1.5 text-sm font-medium text-white">Sold</span>}
      </div>
    </div>
  );
}
