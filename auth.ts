import NextAuth, { NextAuthConfig, Session, User } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./db/connect";

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [GitHub, Google({ clientId: process.env.AUTH_GOOGLE_ID, clientSecret: process.env.AUTH_GOOGLE_SECRET })],
  callbacks: {
    async session({ session, user }: { session: Session; user: User }) {
      session.user.id = user.id;
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
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
