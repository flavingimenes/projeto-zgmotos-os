import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const sessao = req.cookies.get("sessao")?.value;
  const logado = sessao === process.env.SESSION_SECRET;
  const isLoginPage = req.nextUrl.pathname === "/login";

  if (!logado && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (logado && isLoginPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};