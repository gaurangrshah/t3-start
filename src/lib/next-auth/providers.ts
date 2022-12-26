/* eslint-disable no-unused-vars */
import { prisma } from '@/server/db/client';
import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { env } from '@/env/server.mjs';
// import EmailProvider from 'next-auth/providers/email';
// import { ONE_DAY } from '@/utils';
import { TEST_ENV } from '@/utils';

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
    if (!credentials || !credentials?.email || credentials?.password) {
      const user = await prisma.user.findUnique({
        where: { email: credentials?.email },
      });
      // if(!user || !user?.password) {
      //   return null
      // };

      return user;
    }
    return null;
  },
});

export const providers: NextAuthOptions['providers'] = [];
TEST_ENV ? providers.push(credentials) : providers.push(google);
