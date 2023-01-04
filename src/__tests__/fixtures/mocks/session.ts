import crypto from 'crypto';
import { Session } from 'next-auth';
// import * as authModule from 'next-auth/react';

export const mockSession: Session = {
  id: crypto.randomUUID(),
  expires: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
  accessToken: crypto.randomUUID(),
  email: String(process.env.TEST_USER),
  image: '',
  role: 'test',
  user: {
    id: crypto.randomUUID(),
    name: 'e2e:test',
    email: String(process.env.TEST_USER),
    image: '',
    role: 'test',
  },
};

export function createSession(session?: Partial<Session>) {
  let user: Session['user'] = {} as Session['user'];

  const id = session?.id ?? crypto.randomUUID();
  const email = session?.email ?? mockSession.email;
  const accessToken = crypto.randomUUID();
  const role = session?.role ?? mockSession?.user?.role;
  return {
    id,
    email,
    expires: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    accessToken,
    image: '',
    role,
    user: {
      id,
      name: 'e2e:test',
      email,
      image: '',
      role,
    },
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

type MockSession = {
  [p: string]: {
    title: string;
    session: {
      data: Session | null;
      status: 'loading' | 'authenticated' | 'unauthenticated';
    } | null;
  };
};

export const sessions: MockSession = {
  /**
   * @SEE: https://github.com/TomFreudenberg/next-auth-mock/blob/master/src/index.js
   */
  unknown: {
    title: 'session unknown',
    session: null,
  },
  loading: {
    title: 'session loading',
    session: {
      data: null,
      status: 'loading',
    },
  },
  admin: {
    title: 'admin not authenticated',
    session: {
      data: createSession({ email: 'admin@test.env', role: 'admin' }),
      status: 'unauthenticated',
    },
  },
  adminAuthed: {
    title: 'admin authenticated',
    session: {
      data: createSession({ email: 'admin@test.env', role: 'admin' }),
      status: 'authenticated',
    },
  },
  user: {
    title: 'user unauthenticated',
    session: {
      data: createSession({ email: 'user@test.env', role: 'user' }),
      status: 'unauthenticated',
    },
  },
  userAuthed: {
    title: 'user authenticated',
    session: {
      data: createSession({ email: 'user@test.env', role: 'user' }),
      status: 'authenticated',
    },
  },
  test: {
    title: 'test user unauthenticated',
    session: {
      data: createSession({ email: 'test@test.env', role: 'test' }),
      status: 'unauthenticated',
    },
  },
  testAuthed: {
    title: 'test user authenticated',
    session: {
      data: createSession({ email: 'test@test.env', role: 'test' }),
      status: 'authenticated',
    },
  },
};
