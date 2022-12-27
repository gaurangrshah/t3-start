// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';

import type { NextAuthOptions } from 'next-auth';

import { events, jwt, jwtHandlers, providers, session } from '@/lib/next-auth';
import { prisma } from '@/server/db/client';

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: { jwt, session },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [...providers],
  session: { strategy: 'jwt' },
  jwt: {
    ...jwtHandlers,
  },
  events,
  secret: process.env.NEXTAUTH_URL,
};

export default NextAuth(authOptions);
