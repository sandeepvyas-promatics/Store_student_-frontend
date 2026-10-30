import type { Metadata } from "next";
import { Suspense } from "react";
import Icon from "@/components/ui/Icon";
import AdminLoginForm from "@/components/auth/AdminLoginForm";
import { store } from "@/lib/config";

export const metadata: Metadata = { title: "Owner login", robots: { index: false, follow: false } };

export default function AdminLogin() {
  return (
    <div className="grid min-h-screen place-items-center bg-ink px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-wash"><Icon name="lock" /></span>
        <h1 className="display mt-5 text-3xl font-bold">Owner login</h1>
        <p className="mt-1 text-sm text-muted">{store.name} admin panel. For the owner only.</p>
        <Suspense fallback={null}><AdminLoginForm /></Suspense>
      </div>
    </div>
  );
}
