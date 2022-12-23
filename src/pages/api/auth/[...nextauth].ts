import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { type NextAuthOptions } from 'next-auth';

import { events, jwt, jwtHandlers, providers, session } from '@/lib/next-auth';
import { prisma } from '@/server/db/client';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [...providers],
  callbacks: { jwt, session },
  session: { strategy: 'jwt' },
  jwt: {
    ...jwtHandlers,
  },
  events,
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
