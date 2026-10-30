"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Field from "@/components/ui/Field";
import { safeNext, setSession } from "@/lib/session";
import { formToObject, hasErrors, validateLogin, type Errors } from "@/lib/validators";

export default function LoginForm() {
  const router = useRouter();
  const next = useSearchParams().get("next");
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError("");
    const found = validateLogin(formToObject(e.currentTarget));
    setErrors(found);
    if (hasErrors(found)) return;

    setBusy(true);
    try {
      // TODO (backend stage): call POST /api/auth/login here and show "wrong email or password"
      setSession("customer");
      router.push(safeNext(next, "/account"));
      router.refresh();
    } catch {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <h1 className="page-title">Welcome back</h1>
      <p className="mt-2 text-muted">Log in to check out, track orders and save pieces.</p>

      <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5">
        {serverError && <p role="alert" className="rounded-lg bg-badsoft px-4 py-3 text-sm font-medium text-bad">{serverError}</p>}
        <Field id="email" label="Email address" type="email" autoComplete="email" placeholder="you@example.com" error={errors.email} />
        <Field id="password" label="Password" type="password" autoComplete="current-password" placeholder="Your password" error={errors.password} />
        <div className="text-right"><Link href="/forgot-password" className="text-sm font-medium text-brand hover:underline">Forgot password?</Link></div>
        <button type="submit" disabled={busy} className="btn btn-brand btn-block btn-lg">{busy ? "Logging in..." : "Log in"}</button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        New here?{" "}
        <Link href={next ? `/signup?next=${encodeURIComponent(next)}` : "/signup"} className="font-semibold text-ink underline underline-offset-4">Create an account</Link>
      </p>
    </>
  );
}