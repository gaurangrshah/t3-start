import { Session } from 'next-auth';

export const mockSession: Session = {
  id: '',
  email: '',
  image: '',
  expires: '', // new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString()
  accessToken: '',
};

export function createSession(session: Partial<Session>) {
  return {
    ...mockSession,
    ...session,
  };
}
