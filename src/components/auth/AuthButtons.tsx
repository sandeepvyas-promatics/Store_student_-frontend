"use client";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import LogoutButton from "./LogoutButton";
import { readRole } from "@/lib/session";

function subscribe(onChange: () => void) {
  window.addEventListener("session-change", onChange);
  return () => window.removeEventListener("session-change", onChange);
}

export default function AuthButtons() {
  const role = useSyncExternalStore(subscribe, readRole, () => null);

  if (role) {
    return (
      <>
        <Link href={role === "admin" ? "/admin" : "/account"} className="ml-2 hidden px-2 text-sm font-medium hover:text-brand sm:block">
          {role === "admin" ? "Admin panel" : "My account"}
        </Link>
        <LogoutButton className="btn btn-line btn-sm hidden sm:inline-flex" />
      </>
    );
  }
  return (
    <>
      <Link href="/login" className="ml-2 hidden px-2 text-sm font-medium hover:text-brand sm:block">Log in</Link>
      <Link href="/signup" className="btn btn-brand btn-sm hidden sm:inline-flex">Sign up</Link>
    </>
  );
}