import { NextResponse, type NextRequest } from "next/server";

const customerPaths = ["/checkout", "/payment", "/order-placed", "/account"];

function go(req: NextRequest, path: string, next?: string) {
  const url = req.nextUrl.clone();
  url.pathname = path;
  url.search = next ? `?next=${encodeURIComponent(next)}` : "";
  return NextResponse.redirect(url);
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const loggedIn = req.cookies.get("session")?.value === "dev";
  const role = req.cookies.get("role")?.value;

  // Admin area: only the admin
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      return loggedIn && role === "admin" ? go(req, "/admin") : NextResponse.next();
    }
    if (!loggedIn || role !== "admin") return go(req, "/admin/login", pathname);
  }

  // Customer area: any logged-in person
  if (customerPaths.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    if (!loggedIn) return go(req, "/login", pathname);
  }

  // Already logged in? No need to see login or sign up again
  if (loggedIn && (pathname === "/login" || pathname === "/signup")) {
    return go(req, role === "admin" ? "/admin" : "/account");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/checkout", "/payment/:path*", "/order-placed/:path*", "/account/:path*", "/login", "/signup"],
};