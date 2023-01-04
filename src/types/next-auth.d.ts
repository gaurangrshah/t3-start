import type { DefaultSession } from 'next-auth';

// @link: https://next-auth.js.org/getting-started/typescript

// using "module augmentation"
declare module 'next-auth' {
  // Extend the build-in session types
  interface Session {
    id: string;
    email: string;
    image: string;
    emailVerified?: string;
    accessToken?: string | unknown;
    role?: string;
    user?: {
      id: string | unknown;
      email?: string;
      picture?: string;
      image?: string;
      role?: string;
    } & DefaultSession['user'];
  }
}
