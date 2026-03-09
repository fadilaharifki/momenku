import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isPublicApi =
    pathname.startsWith("/api/invitations/ready") ||
    pathname.startsWith("/api/themes");

  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: { name: "auth-token" },
      cookies: {
        getAll() {
          return request.cookies.getAll().map((cookie) => ({
            name: cookie.name,
            value: cookie.value ?? "",
          }));
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 1. Ambil Profile (Role)
  let userProfile = null;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role, is_reseller")
      .eq("id", user.id)
      .single();
    userProfile = profile;
  }

  // Define Groups
  const isLoginPage = pathname === "/login" || pathname === "/register";
  const isDashboardPage = pathname.startsWith("/dashboard");
  const isAdminPage = pathname.startsWith("/admin");
  const isRoot = pathname === "/";

  // --- LOGIC RULES ---

  // Poin 1: / direct ke /home
  if (isRoot) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // Poin 5: /login dan /register hanya ketika BELUM login
  if (isLoginPage && user) {
    const target = userProfile?.role === "admin" ? "/admin" : "/dashboard";
    return NextResponse.redirect(new URL(target, request.url));
  }

  // Poin 3: /dashboard hanya untuk user (mencegah Admin atau Guest masuk)
  if (isDashboardPage) {
    if (!user) return NextResponse.redirect(new URL("/login", request.url));
    if (userProfile?.role !== "user")
      return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Poin 4: /admin hanya untuk admin (mencegah User atau Guest masuk)
  if (isAdminPage) {
    if (!user) return NextResponse.redirect(new URL("/login", request.url));
    if (userProfile?.role !== "admin")
      return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Logic API (tetap dipertahankan untuk keamanan endpoint)
  if (
    pathname.startsWith("/api") &&
    !user &&
    !pathname.startsWith("/api/auth") &&
    !isPublicApi
  ) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  // Inject Headers untuk API
  if (user && pathname.startsWith("/api")) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", user.id);
    requestHeaders.set("x-user-role", userProfile?.role || "user");
    requestHeaders.set(
      "x-is-reseller",
      String(userProfile?.is_reseller || false),
    );
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  return response;
}
