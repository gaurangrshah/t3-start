import {
  signIn as real_signIn,
  signOut as real_signOut,
} from 'next-auth/react';

import { TEST_ENV } from '@/utils';

const mock_signIn: typeof real_signIn = async function () {
  console.log(`"signIn" mock has been called`);

  return {
    error: undefined,
    status: 200,
    ok: true,
    url: '/no-matter',
  } as any;
};

export const signIn: typeof real_signIn = TEST_ENV ? mock_signIn : real_signIn;

const mock_signOut: typeof real_signOut = async function () {
  console.log(`"signOut" mock has been called`);

  return {
    url: '/no-matter',
  } as any;
};

export const signOut: typeof real_signOut = TEST_ENV
  ? mock_signOut
  : real_signOut;
