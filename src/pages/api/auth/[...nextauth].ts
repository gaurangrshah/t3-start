import NextAuth, { type NextAuthOptions } from 'next-auth';
import { type JWT } from 'next-auth/jwt';
// Prisma adapter for NextAuth, optional and can be removed
import * as jwtoken from 'jsonwebtoken';

import { events, jwt, providers, session } from '@/lib/next-auth';
import { prisma } from '@/server/db/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: { jwt, session },
  adapter: PrismaAdapter(prisma),
  providers: [...providers],
  session: { strategy: 'jwt' },
  jwt: {
    async encode({ token }) {
      return jwtoken.sign(token as JWT, String(process.env.NEXTAUTH_SECRET));
    },
    async decode({ token }) {
      return jwtoken.verify(
        String(token),
        String(process.env.NEXTAUTH_SECRET)
      ) as JWT;
    },
  },
  events,
  secret: process.env.NEXTAUTH_SECRET,
  // theme: {
  //   colorScheme: 'auto', // "auto" | "dark" | "light"
  //   brandColor: '', // Hex color code #33FF5D
  //   logo: '/logo.png', // Absolute URL to image
  // },
};

export default NextAuth(authOptions);
