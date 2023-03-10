/* eslint-disable no-unused-vars */
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { type NextAuthOptions } from 'next-auth';

import { env } from '@/env/server.mjs';
import { prisma } from '@/server/db/client';
// import EmailProvider from 'next-auth/providers/email';
// import { ONE_DAY } from '@/utils';
import { TEST_ENV } from '@/utils';
import { comparePasswords } from '../services';

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
      value: process.env.TEST_USER,
    },
    password: {
      label: 'Password',
      type: 'password',
      placeholder: '***********',
      value: process.env.TEST_PW,
    },
  },
  async authorize(credentials, req) {
    if (!credentials || !credentials?.email || !credentials?.password) {
      console.log('🔴 invalid credentials');
      return null;
    }
    const user = await prisma.user.findUnique({
      where: { email: credentials?.email },
    });

    if (!user || !user?.password) return null;

    if (comparePasswords(credentials?.password, user?.password)) {
      console.log('🟢 password compare success');
      return user;
    }
    console.log('🔴 password compare fail');
    return null;
  },
});

export const providers: NextAuthOptions['providers'] = [credentials, google];
// TEST_ENV ? providers.push(credentials) : providers.push(google);
