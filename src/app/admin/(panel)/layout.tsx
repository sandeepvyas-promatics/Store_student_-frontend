import Link from "next/link";
import AdminNav from "@/components/admin/AdminNav";
import { store } from "@/lib/config";
import LogoutButton from "@/components/auth/LogoutButton";
// Every admin page sits inside this frame. The backend must still check the Admin role on every request.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[250px_1fr]">
      <aside className="bg-ink px-4 py-5 text-white lg:sticky lg:top-0 lg:h-screen lg:py-7">
        <div className="mb-4 flex items-center justify-between px-2 lg:mb-8 lg:block">
          <p className="display text-2xl">{store.name}</p>
          <p className="text-xs text-white/50 lg:mt-1">Owner panel</p>
        </div>
        <AdminNav />
        <div className="mt-4 hidden border-t border-white/10 pt-4 lg:block">
          <Link href="/" className="block rounded-xl px-3.5 py-2.5 text-sm text-white/65 hover:bg-white/5 hover:text-white">View the store</Link>
          <LogoutButton to="/admin/login" className="block w-full rounded-xl px-3.5 py-2.5 text-left text-sm text-white/65 hover:bg-white/5 hover:text-white" />
        </div>
      </aside>
      <div className="min-w-0 px-4 py-8 sm:px-8 lg:px-10 lg:py-10">{children}</div>
    </div>
  );
}
