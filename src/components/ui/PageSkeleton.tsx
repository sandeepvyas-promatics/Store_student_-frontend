// Shown for a moment while a page loads its data (later, from the backend).
export default function PageSkeleton() {
  return (
    <div className="wrap animate-pulse py-10" aria-busy="true" aria-label="Loading">
      <div className="h-8 w-56 rounded-lg bg-wash" />
      <div className="mt-3 h-4 w-80 max-w-full rounded bg-wash" />
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i}><div className="aspect-[4/5] rounded-xl bg-wash" /><div className="mt-3 h-4 w-3/4 rounded bg-wash" /><div className="mt-2 h-4 w-1/3 rounded bg-wash" /></div>
        ))}
      </div>
    </div>
  );
}
