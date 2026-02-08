import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as NextAuthOptions["adapter"],
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    // Dev-only credentials provider for testing without OAuth
    CredentialsProvider({
      name: "Dev Login",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "teszt@example.com" },
      },
      async authorize(credentials) {
        if (process.env.NODE_ENV === "production") return null;
        if (!credentials?.email) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (user) {
          return { id: user.id, name: user.name, email: user.email, image: user.image };
        }

        // Auto-create user in dev mode
        const newUser = await prisma.user.create({
          data: { email: credentials.email, name: credentials.email.split("@")[0] },
        });
        return { id: newUser.id, name: newUser.name, email: newUser.email, image: newUser.image };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        const dbUser = await prisma.user.findUnique({
          where: { id: token.sub },
          select: { role: true, walletBalanceHUF: true },
        });
        if (dbUser) {
          session.user.role = dbUser.role;
          session.user.walletBalanceHUF = dbUser.walletBalanceHUF;
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/bejelentkezes",
    error: "/auth/hiba",
  },
};
