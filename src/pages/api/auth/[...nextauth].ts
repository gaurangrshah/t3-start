import NextAuth, { type NextAuthOptions } from 'next-auth';
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import { providers, session } from '@/lib/next-auth';
import { prisma } from '@/server/db/client';

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: { session },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [...providers],
};

export default NextAuth(authOptions);
