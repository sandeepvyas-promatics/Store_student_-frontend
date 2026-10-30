import { Suspense } from "react";
import PageSkeleton from "@/components/ui/PageSkeleton";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHead from "@/components/admin/PageHead";
import ProductForm from "@/components/admin/ProductForm";
import { products } from "@/lib/mock-data";

async function EditProductContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = products.find((x) => x.id === id);
  if (!p) notFound();
  return (
    <>
      <Link href="/admin/products" className="text-sm text-muted hover:text-ink">← Products</Link>
      <div className="mt-3"><PageHead title={`Edit: ${p.title}`} /></div>
      <ProductForm p={p} />
    </>
  );
}

export default function EditProduct(props: Parameters<typeof EditProductContent>[0]) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <EditProductContent {...props} />
    </Suspense>
  );
}
