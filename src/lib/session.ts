export type Role = "customer" | "admin";

const WEEK = 60 * 60 * 24 * 7;

// TEMPORARY: for testing only. The Express backend will set a secure cookie instead.
export function setSession(role: Role) {
  document.cookie = `session=dev; path=/; max-age=${WEEK}; samesite=lax`;
  document.cookie = `role=${role}; path=/; max-age=${WEEK}; samesite=lax`;
  window.dispatchEvent(new Event("session-change"));
}

export function clearSession() {
  document.cookie = "session=; path=/; max-age=0";
  document.cookie = "role=; path=/; max-age=0";
  window.dispatchEvent(new Event("session-change"));
}

export function readRole(): Role | null {
  const cookies = document.cookie.split("; ");
  if (!cookies.some((c) => c.startsWith("session=dev"))) return null;
  const role = cookies.find((c) => c.startsWith("role="))?.split("=")[1];
  return role === "admin" ? "admin" : "customer";
}

// Only allow redirects to pages on our own site
export function safeNext(next: string | null, fallback: string) {
  return next && next.startsWith("/") && !next.startsWith("//") ? next : fallback;
}