import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_COOKIE = "admin_auth";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;

  // Admin authentication check
  if (pathname.startsWith("/admin")) {
    // Allow login page and auth API
    if (pathname === "/admin/login" || pathname.startsWith("/api/admin/auth")) {
      // Check if accessing pay subdomain
      if (hostname.startsWith("pay.") || hostname === "pay.zypp.fun") {
        // If already on /pay path, allow it
        if (pathname === "/pay" || pathname.startsWith("/pay/")) {
          return NextResponse.next();
        }

        // Rewrite root and other paths to /pay
        const url = request.nextUrl.clone();
        if (pathname === "/") {
          url.pathname = "/pay";
        } else {
          url.pathname = `/pay${pathname}`;
        }
        return NextResponse.rewrite(url);
      }

      // Redirect /pay path on main domain to pay subdomain
      if ((pathname === "/pay" || pathname.startsWith("/pay/")) && !hostname.startsWith("pay.")) {
        const url = request.nextUrl.clone();
        // Maintain development host (like localhost) or use zypp.fun
        const host = request.headers.get("host") || "";
        if (host.includes("localhost")) {
          url.hostname = `pay.localhost`;
        } else {
          url.hostname = "pay.zypp.fun";
        }
        url.pathname = pathname.replace("/pay", "");
        if (url.pathname === "") url.pathname = "/";
        return NextResponse.redirect(url);
      }

      return NextResponse.next();
    }

    // Check for auth cookie
    const authCookie = request.cookies.get(ADMIN_COOKIE);

    if (!authCookie) {
      // Redirect to login
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }

    // Verify token (basic check)
    try {
      const decoded = Buffer.from(authCookie.value, "base64").toString();
      // Validate using env-based password to keep in sync with API route
      if (!ADMIN_PASSWORD || !decoded.startsWith(ADMIN_PASSWORD)) {
        const url = request.nextUrl.clone();
        url.pathname = "/admin/login";
        return NextResponse.redirect(url);
      }
    } catch {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  // Check if accessing admin subdomain
  if (hostname.startsWith("admin.") || hostname === "admin.zypp.fun") {
    // If already on /admin path, allow it
    if (pathname.startsWith("/admin")) {
      return NextResponse.next();
    }

    // Rewrite root and other paths to /admin
    const url = request.nextUrl.clone();
    if (pathname === "/") {
      url.pathname = "/admin";
    } else {
      url.pathname = `/admin${pathname}`;
    }
    return NextResponse.rewrite(url);
  }

  // Check if accessing idea subdomain
  if (hostname.startsWith("idea.") || hostname === "idea.zypp.fun") {
    // If already on /idea path, allow it
    if (pathname === "/idea" || pathname.startsWith("/idea/")) {
      return NextResponse.next();
    }

    // Rewrite root and other paths to /idea
    const url = request.nextUrl.clone();
    if (pathname === "/") {
      url.pathname = "/idea";
    } else {
      url.pathname = `/idea${pathname}`;
    }
    return NextResponse.rewrite(url);
  }

  // Redirect /idea path on main domain to idea subdomain
  if ((pathname === "/idea" || pathname.startsWith("/idea/")) && !hostname.startsWith("idea.")) {
    const url = request.nextUrl.clone();
    // Maintain development host (like localhost) or use zypp.fun
    const host = request.headers.get("host") || "";
    if (host.includes("localhost")) {
      url.hostname = `idea.localhost`;
      // Note: localhost subdomains might need etc/hosts configuration
    } else {
      url.hostname = "idea.zypp.fun";
    }
    url.pathname = pathname.replace("/idea", "");
    if (url.pathname === "") url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Check if accessing monitor subdomain
  if (hostname.startsWith("monitor.") || hostname === "monitor.zypp.fun") {
    // If already on /monitor path, allow it
    if (pathname === "/monitor" || pathname.startsWith("/monitor/")) {
      return NextResponse.next();
    }

    // Rewrite root and other paths to /monitor
    const url = request.nextUrl.clone();
    if (pathname === "/") {
      url.pathname = "/monitor";
    } else {
      url.pathname = `/monitor${pathname}`;
    }
    return NextResponse.rewrite(url);
  }

  // Redirect /monitor path on main domain to monitor subdomain
  if ((pathname === "/monitor" || pathname.startsWith("/monitor/")) && !hostname.startsWith("monitor.")) {
    const url = request.nextUrl.clone();
    // Maintain development host (like localhost) or use zypp.fun
    const host = request.headers.get("host") || "";
    if (host.includes("localhost")) {
      url.hostname = `monitor.localhost`;
      // Note: localhost subdomains might need etc/hosts configuration
    } else {
      url.hostname = "monitor.zypp.fun";
    }
    url.pathname = pathname.replace("/monitor", "");
    if (url.pathname === "") url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Check if accessing relayer subdomain
  if (hostname.startsWith("relayer.") || hostname === "relayer.zypp.fun") {
    if (pathname === "/relayer" || pathname.startsWith("/relayer/")) {
      return NextResponse.next();
    }
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? "/relayer" : `/relayer${pathname}`;
    return NextResponse.rewrite(url);
  }

  // Check if accessing pay subdomain
  if (hostname.startsWith("pay.") || hostname === "pay.zypp.fun") {
    // If already on /pay path, allow it
    if (pathname === "/pay" || pathname.startsWith("/pay/")) {
      return NextResponse.next();
    }

    // Rewrite root and other paths to /pay
    const url = request.nextUrl.clone();
    if (pathname === "/") {
      url.pathname = "/pay";
    } else {
      url.pathname = `/pay${pathname}`;
    }
    return NextResponse.rewrite(url);
  }

  // Redirect /pay path on main domain to pay subdomain
  if ((pathname === "/pay" || pathname.startsWith("/pay/")) && !hostname.startsWith("pay.")) {
    const url = request.nextUrl.clone();
    // Maintain development host (like localhost) or use zypp.fun
    const host = request.headers.get("host") || "";
    if (host.includes("localhost")) {
      url.hostname = `pay.localhost`;
    } else {
      url.hostname = "pay.zypp.fun";
    }
    url.pathname = pathname.replace("/pay", "");
    if (url.pathname === "") url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files with extensions (.svg, .png, .jpg, .jpeg, .gif, .webp)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
