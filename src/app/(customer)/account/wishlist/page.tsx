import ProductCard from "@/components/product/ProductCard";
import { getById } from "@/lib/mock-data";

export default function Wishlist() {
  const saved = ["p2", "p5", "p6"].map(getById);
  return (
    <>
      <h1 className="page-title">Wishlist</h1>
      <p className="mt-1 text-muted">Pieces you saved. If one sells, we&apos;ll tell you here.</p>
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-9 xl:grid-cols-3 lg:gap-x-6">
        {saved.map((p) => (
          <div key={p.id}>
            <ProductCard p={p} />
            {p.status === "SOLD" && <p className="mt-2 rounded-lg bg-wash px-3 py-2 text-xs text-muted">Someone else got this one. Remove it from your list.</p>}
          </div>
        ))}
      </div>
    </>
  );
}
