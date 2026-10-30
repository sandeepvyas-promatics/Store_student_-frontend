import StoreShell from "@/components/layout/StoreShell";
export default function Layout({ children }: { children: React.ReactNode }) {
  return <StoreShell><div className="bg-soft">{children}</div></StoreShell>;
}
