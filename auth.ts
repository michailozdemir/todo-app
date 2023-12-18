import NextAuth, { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./db/connect";

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
      const routes = ["/todos"];
      const isProtectedRoute = routes.some((route) => nextUrl.pathname.startsWith(route));

      if (!isLoggedIn && isProtectedRoute) {
        const redirectUrl = new URL("/signin", nextUrl.origin);
        return Response.redirect(redirectUrl);
      }

      return true;
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
