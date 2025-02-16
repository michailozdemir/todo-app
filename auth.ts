import NextAuth, { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./db/connect";

const AUTH_ROUTES = {
  SIGN_IN: "/signin",
} as const;

export const PROTECTED_ROUTES = ["/todos"] as const;

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [GitHub, Google({ clientId: process.env.AUTH_GOOGLE_ID, clientSecret: process.env.AUTH_GOOGLE_SECRET })],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub as string;

      return session;
    },

    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtectedRoute = PROTECTED_ROUTES.some((route) => nextUrl.pathname.startsWith(route));

      if (!isLoggedIn && isProtectedRoute) {
        const redirectUrl = new URL(AUTH_ROUTES.SIGN_IN, nextUrl.origin);

        return Response.redirect(redirectUrl);
      }

      return true;
    },
  },
  pages: {
    signIn: AUTH_ROUTES.SIGN_IN,
  },
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
