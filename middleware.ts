import NextAuth from "next-auth";
import { authConfig } from "./auth";
import { PROTECTED_ROUTES } from "./auth";
export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", ...PROTECTED_ROUTES],
};
