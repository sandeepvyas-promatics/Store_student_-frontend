"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="grid min-h-screen place-items-center bg-soft px-4 text-center">
      <div>
        <h1 className="page-title">Something went wrong</h1>
        <p className="mt-2 text-muted">Please try again. If it keeps happening, message us on WhatsApp.</p>
        <button onClick={reset} className="btn btn-brand mt-6">Try again</button>
      </div>
    </div>
  );
}
