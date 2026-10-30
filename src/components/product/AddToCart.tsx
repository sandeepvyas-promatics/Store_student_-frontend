"use client";
import { useState } from "react";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import type { ProductStatus } from "@/types";

export default function AddToCart({ status }: { status: ProductStatus }) {
  const [added, setAdded] = useState(false);
  if (status === "SOLD") return <button className="btn btn-dark btn-block" disabled>Sold</button>;
  if (status === "RESERVED") return <button className="btn btn-dark btn-block" disabled>Reserved for another buyer</button>;
  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <button onClick={() => setAdded(true)} className="btn btn-brand flex-1">
          {added ? <><Icon name="check" className="h-4 w-4" /> Added to bag</> : "Add to bag"}
        </button>
        <button className="grid h-12 w-12 place-items-center rounded-full border border-line bg-panel hover:border-ink" aria-label="Save to wishlist"><Icon name="heart" /></button>
      </div>
      {added && <p className="text-sm text-muted">Saved in your bag. <Link href="/cart" className="font-medium text-brand underline-offset-4 hover:underline">View bag</Link></p>}
    </div>
  );
}
