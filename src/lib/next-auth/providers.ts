/* eslint-disable no-unused-vars */
import { prisma } from '@/server/db/client';
import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { env } from '@/env/server.mjs';
// import EmailProvider from 'next-auth/providers/email';
// import { ONE_DAY } from '@/utils';
import { authenticateUserInputSchema } from '@/server/schema/auth.schema';

const google = GoogleProvider({
  clientId: env.GOOGLE_CLIENT_ID,
  clientSecret: env.GOOGLE_CLIENT_SECRET,
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
      value: 'test@test.com',
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
      const user = await prisma.user.findFirstOrThrow({
        where: { email: credentials?.email },
      });
      return user;
    }
    return null;
  },
});

export const providers: NextAuthOptions['providers'] = [];

process.env.APP_ENV === 'test'
  ? providers.push(credentials)
  : providers.push(google);
