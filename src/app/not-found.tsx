import Link from "next/link";
import StoreShell from "@/components/layout/StoreShell";

export default function NotFound() {
  return (
    <StoreShell>
      <section className="bg-aurora">
        <div className="wrap py-24 text-center">
          <p className="display gradient-text text-7xl font-bold sm:text-8xl">404</p>
          <h1 className="page-title mt-4">This page is gone, like a sold piece</h1>
          <p className="mx-auto mt-3 max-w-md text-muted">The page you are looking for does not exist or has moved. Let&apos;s get you back to the good stuff.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn btn-brand">Back to home</Link>
            <Link href="/shop" className="btn btn-line">Shop all pieces</Link>
          </div>
        </div>
      </section>
    </StoreShell>
  );
}
