import type { DefaultSession, DefaultUser } from 'next-auth';

// @link: https://next-auth.js.org/getting-started/typescript

// using "module augmentation"
declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken?: string | unknown;
    user?: {
      id: string | unknown;
      email?: string;
      picture?: string;
      image?: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    refresh_token?: string;
    accessToken?: string;
    expires_at?: number;
    user?: {
      emailVerified?: Date | null;
      id?: string | undefined;
    } & DefaultUser;
  }
}
