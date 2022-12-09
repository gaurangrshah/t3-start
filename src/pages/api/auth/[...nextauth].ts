import NextAuth, { type NextAuthOptions } from "next-auth";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { prisma } from "../../../server/db/client";
import { session, providers } from "../../../lib/next-auth"

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: { session },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [...providers],
};

export default NextAuth(authOptions);
