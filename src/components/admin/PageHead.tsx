export default function PageHead({ title, text, children }: { title: string; text?: string; children?: React.ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div><h1 className="page-title !text-3xl">{title}</h1>{text && <p className="mt-1 text-muted">{text}</p>}</div>
      {children && <div className="flex flex-wrap gap-3">{children}</div>}
    </div>
  );
}
