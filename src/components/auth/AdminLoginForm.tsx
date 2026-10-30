"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Field from "@/components/ui/Field";
import { safeNext, setSession } from "@/lib/session";
import { formToObject, hasErrors, validateLogin, type Errors } from "@/lib/validators";

export default function AdminLoginForm() {
  const router = useRouter();
  const next = useSearchParams().get("next");
  const [errors, setErrors] = useState<Errors>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateLogin(formToObject(e.currentTarget));
    setErrors(found);
    if (hasErrors(found)) return;
    // TODO (backend stage): the real check happens on the server; only the seeded admin can log in
    setSession("admin");
    router.push(safeNext(next, "/admin"));
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-7 space-y-5">
      <Field id="email" label="Email" type="email" autoComplete="email" error={errors.email} />
      <Field id="password" label="Password" type="password" autoComplete="current-password" error={errors.password} />
      <button type="submit" className="btn btn-dark btn-block btn-lg">Log in</button>
    </form>
  );
}