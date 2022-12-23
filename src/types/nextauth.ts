import type { NextComponentType, NextPage } from 'next';
import type { Session } from 'next-auth';

export type NextPageWithAuth = NextPage & { auth: boolean };
export type NextComponentTypeWithAuth = NextComponentType & { auth?: boolean };

export interface SessionWithUser extends Session {
  id: string;
  email: string;
  image: string;
  emailVerified?: string;
}
