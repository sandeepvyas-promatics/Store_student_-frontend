"use client";
import { useRouter } from "next/navigation";
import { clearSession } from "@/lib/session";

export default function LogoutButton({ className = "", to = "/", children = "Log out" }: { className?: string; to?: string; children?: React.ReactNode }) {
  const router = useRouter();
  return (
    <button type="button" className={className} onClick={() => { clearSession(); router.push(to); router.refresh(); }}>
      {children}
    </button>
  );
}