import AccountNav from "@/components/account/AccountNav";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="wrap grid gap-8 py-8 md:py-12 lg:grid-cols-[230px_1fr] lg:gap-12">
      <aside className="lg:sticky lg:top-28 lg:self-start"><AccountNav /></aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
