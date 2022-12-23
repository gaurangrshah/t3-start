/* eslint-disable no-unused-vars */
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import type { User } from '@prisma/client';
import type { NextAuthOptions } from 'next-auth';

import { env } from '@/env/server.mjs';
import { prisma } from '@/server/db/client';
import { authenticateUserInputSchema } from '@/server/schema/auth.schema';

import { TEST_ENV } from '@/utils';
const google = GoogleProvider({
  clientId: env.GOOGLE_CLIENT_ID,
  clientSecret: env.GOOGLE_CLIENT_SECRET,
  // @SEE: https://tinyurl.com/2hyurpsm
  authorization:
    'https://accounts.google.com/o/oauth2/v2/auth?' +
    new URLSearchParams({
      prompt: 'consent',
      access_type: 'offline',
      response_type: 'code',
    }),
});

// /**
//  * @NOTE: Requires nodemailer + JWT strategy + callback to work
//  */
// const email = EmailProvider({
//   server: {
//     host: process.env.SMTP_SERVER_HOST,
//     port: process.env.SMTP_SERVER_PORT,
//     auth: {
//       user: process.env.SMTP_SERVER_EMAIL,
//       pass: process.env.SMTP_SERVER_PASSWORD
//     }
//   },
//   from: process.env.EMAIL_FROM,
//   maxAge: ONE_DAY, // How long email links are valid for (default 24h)
// })

/**
 * @NOTE: Requires JWT strategy + callback to work
 * + must also add password field to db
 */
const credentials = CredentialsProvider({
  id: 'fallback',
  name: 'sign-in',
  credentials: {
    email: {
      label: 'Username',
      type: 'text',
      placeholder: 'e2e@e2e.test',
      value: 'e2e@e2e.test',
    },
    password: {
      label: 'Password',
      type: 'password',
      placeholder: 'password',
      value: 'test',
    },
  },
  async authorize(credentials, req) {
    try {
      if (authenticateUserInputSchema.safeParse(credentials).success) {
        // credentials are valid
        const userExist: User | null = await prisma.user.findUniqueOrThrow({
          where: { email: credentials?.email.trim() },
        });

        // @TODO: handle with toast via error? url
        if (!userExist?.password) throw { message: 'Try social auth' };

        if (userExist?.password?.trim() === credentials?.password.trim()) {
          // @TODO: encrypt password
          return userExist;
        }
      }
      return null;
    } catch (error) {
      throw new Error('Invalid Credentials');
    }
  },
});

export const providers: NextAuthOptions['providers'] = [];

TEST_ENV ? providers.push(credentials) : providers.push(google);
