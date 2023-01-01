import crypto from 'crypto';
import { Session } from 'next-auth';
import * as authModule from 'next-auth/react';

const userId = crypto.randomUUID();

export const mockSession: Session = {
  id: userId,
  // new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString()
  expires: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
  accessToken: crypto.randomUUID(),
  email: String(process.env.TEST_USER),
  image: '',
  user: {
    id: userId,
    name: 'e2e:test',
    email: String(process.env.TEST_USER),
    image: '',
  },
};

export function createSession(session?: Partial<Session>) {
  return {
    ...mockSession,
    ...session,
  };
}

// @TODO:FIXME: syping on useSession causes many tests to fail
/**
 * @ SEE: https://tinyurl.com/2j29z5mb
 */
// const mockUseSession = jest.spyOn(authModule, 'useSession');
// mockUseSession.mockReturnValue({
//   data: createSession(),
//   status: 'authenticated',
// });
