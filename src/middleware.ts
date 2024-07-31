import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { ACCESS_TOKEN_KEY } from "./utils/constant";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_KEY);
  const requestHeader = new Headers(request.headers);
  // requestHeader.set("x-next-pathname",request.nextUrl.pathname);
  const path = request.nextUrl.pathname;
  if (accessToken && accessToken.value) {
    if (path === "/login" || path === "/register" || path === "/") {
      return NextResponse.redirect(new URL("/stock", request.url));
    }
    return NextResponse.next({ request });
  } else if (path != "/login" && path != "/register") {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next({ request });
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/login/:path*",
    "/register/:path*",
    "/stock/:path*",
    "/report/:path*",
    "/aboutus/:path*",
    "/shop/:path*",
  ],
};
