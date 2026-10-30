import { Suspense } from "react";
import PageSkeleton from "@/components/ui/PageSkeleton";
import Link from "next/link";
import { notFound } from "next/navigation";
import { info } from "@/lib/info-content";
import { store } from "@/lib/config";

export function generateStaticParams() {
  return Object.keys(info).map((slug) => ({ slug }));
}

async function InfoPageContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = info[slug];
  if (!page) notFound();

  return (
    <div className="wrap py-10 md:py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="page-title">{page.title}</h1>
        <p className="mt-3 text-lg text-muted">{page.intro}</p>

        <div className="mt-10 space-y-8">
          {page.sections.map((s) => (
            <section key={s.heading} className="border-t border-line pt-6">
              <h2 className="text-lg font-semibold">{s.heading}</h2>
              {s.body.map((b) => <p key={b} className="mt-2 max-w-prose leading-7 text-muted">{b}</p>)}
            </section>
          ))}
        </div>

        {page.table && (
          <div className="card mt-8 overflow-x-auto">
            <table className="tbl">
              <thead><tr>{page.table.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>{page.table.rows.map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i} className={i === 0 ? "font-medium" : ""}>{c}</td>)}</tr>)}</tbody>
            </table>
          </div>
        )}

        {slug === "contact" && (
          <a href={`https://wa.me/${store.whatsapp}`} className="btn btn-brand mt-8">Message us on WhatsApp</a>
        )}
        <p className="mt-12 text-sm text-muted">Still stuck? <Link href="/contact" className="font-medium text-brand underline-offset-4 hover:underline">Contact us</Link>.</p>
      </div>
    </div>
  );
}

export default function InfoPage(props: Parameters<typeof InfoPageContent>[0]) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <InfoPageContent {...props} />
    </Suspense>
  );
}
