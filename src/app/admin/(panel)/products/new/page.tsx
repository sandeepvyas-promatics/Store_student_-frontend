import Link from "next/link";
import PageHead from "@/components/admin/PageHead";
import ProductForm from "@/components/admin/ProductForm";

export default function NewProduct() {
  return (
    <>
      <Link href="/admin/products" className="text-sm text-muted hover:text-ink">← Products</Link>
      <div className="mt-3"><PageHead title="Add a piece" text="Fill this in once per piece. It takes a few minutes." /></div>
      <ProductForm />
    </>
  );
}
