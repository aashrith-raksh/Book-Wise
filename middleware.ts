import { NextFetchEvent, NextResponse, type NextRequest } from "next/server";
import ratelimit from "./lib/rate-limit";
import { auth } from "./lib/auth";

// export { auth as middleware } from "@/lib/auth";

export default async function middleware(
  req: NextRequest,
  ctx: NextFetchEvent
): Promise<Response | undefined> {
  const pathname = req.nextUrl.pathname;

  // Exclude the `/api/imagekit` route
  if (pathname.startsWith("/api/auth/")) {
    return NextResponse.next(); // Skip middleware
  }

  console.log("----- middleware ------")
  const session = await auth();

  if (!session) return NextResponse.redirect(new URL("/sign-in", req.url));
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "127.0.0.1";

  const { success, pending } = await ratelimit.limit(ip);

  ctx.waitUntil(pending);

  const res = success
    ? NextResponse.next()
    : NextResponse.redirect(new URL("/blocked", req.url));

  return res;
}

export const config = {
  matcher: "/api/:path*",
};
