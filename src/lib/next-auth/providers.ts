/* eslint-disable no-unused-vars */
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import type { User } from '@prisma/client';
import type { NextAuthOptions } from 'next-auth';

import { env } from '@/env/server.mjs';
import { prisma } from '@/server/db/client';
import { authenticateUserInputSchema } from '@/server/schema/auth.schema';
// import EmailProvider from 'next-auth/providers/email';
// import { ONE_DAY } from '@/utils';
import { TEST_ENV } from '@/utils';
const google = GoogleProvider({
  clientId: env.GOOGLE_CLIENT_ID,
  clientSecret: env.GOOGLE_CLIENT_SECRET,
  // @SEE: https://tinyurl.com/2hyurpsm
  // authorization:
  //   'https://accounts.google.com/o/oauth2/v2/auth?' +
  //   new URLSearchParams({
  //     prompt: 'consent',
  //     access_type: 'offline',
  //     response_type: 'code',
  //   }),
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
  name: 'Credentials',
  credentials: {
    email: {
      label: 'Username',
      type: 'text',
      placeholder: 'you@youremail.com',
      value: 'gaurang.r.shah@gmail.com',
    },
    password: {
      label: 'Password',
      type: 'password',
      placeholder: 'password',
      value: 'test',
    },
  },
  async authorize(credentials, req) {
    if (authenticateUserInputSchema.safeParse(credentials)) {
      // FIXME: findUnique invalid invocation issue
      const user: User = await prisma.user.findUniqueOrThrow({
        where: { email: credentials?.email },
      });
      return user;
    }
    return null;
  },
});

export const providers: NextAuthOptions['providers'] = [];

TEST_ENV ? providers.push(credentials) : providers.push(google);
