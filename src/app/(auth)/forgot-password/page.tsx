import Link from "next/link";

export default function Forgot() {
  return (
    <>
      <h1 className="page-title">Reset your password</h1>
      <p className="mt-2 text-muted">Enter your email and we&apos;ll send you a link to choose a new password.</p>
      <form className="mt-8 space-y-5">
        <div><label className="label" htmlFor="email">Email</label><input id="email" type="email" className="input" placeholder="you@example.com" /></div>
        <Link href="/login" className="btn btn-brand btn-block">Send reset link</Link>
      </form>
      <p className="mt-6 text-center text-sm text-muted">Remembered it? <Link href="/login" className="font-medium text-ink underline underline-offset-4">Back to log in</Link></p>
    </>
  );
}
