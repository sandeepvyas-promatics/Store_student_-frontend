import type { Metadata } from "next";
import { Suspense } from "react";
import SignupForm from "@/components/auth/SignupForm";

export const metadata: Metadata = { title: "Create account", robots: { index: false } };

export default function Signup() {
  return <Suspense fallback={null}><SignupForm /></Suspense>;
}