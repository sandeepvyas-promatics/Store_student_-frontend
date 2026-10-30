"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Field from "@/components/ui/Field";
import { safeNext, setSession } from "@/lib/session";
import { formToObject, hasErrors, validateSignup, type Errors } from "@/lib/validators";

export default function SignupForm() {
  const router = useRouter();
  const next = useSearchParams().get("next");
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError("");
    const found = validateSignup(formToObject(e.currentTarget));
    setErrors(found);
    if (hasErrors(found)) return;

    setBusy(true);
    try {
      // TODO (backend stage): call POST /api/auth/signup here and handle "email already used"
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
      <h1 className="page-title">Create your account</h1>
      <p className="mt-2 text-muted">It takes a minute. You need an account to place an order.</p>

      <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5">
        {serverError && <p role="alert" className="rounded-lg bg-badsoft px-4 py-3 text-sm font-medium text-bad">{serverError}</p>}
        <Field id="name" label="Full name" autoComplete="name" placeholder="Your name" error={errors.name} />
        <Field id="email" label="Email address" type="email" autoComplete="email" placeholder="you@example.com" error={errors.email} />
        <Field id="phone" label="Mobile number" type="tel" inputMode="numeric" autoComplete="tel" placeholder="98765 43210" error={errors.phone} hint="We only use it to contact you about your orders." />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="password" label="Password" type="password" autoComplete="new-password" placeholder="8+ letters and numbers" error={errors.password} />
          <Field id="confirm" label="Confirm password" type="password" autoComplete="new-password" placeholder="Repeat password" error={errors.confirm} />
        </div>
        <div>
          <label className="flex items-start gap-3 text-sm text-muted">
            <input type="checkbox" name="terms" className="mt-0.5 h-4 w-4 accent-ink" />
            I agree to the delivery and returns policy.
          </label>
          {errors.terms && <p role="alert" className="mt-1.5 text-xs font-medium text-bad">{errors.terms}</p>}
        </div>
        <button type="submit" disabled={busy} className="btn btn-brand btn-block btn-lg">{busy ? "Creating account..." : "Create account"}</button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href={next ? `/login?next=${encodeURIComponent(next)}` : "/login"} className="font-semibold text-ink underline underline-offset-4">Log in</Link>
      </p>
    </>
  );
}