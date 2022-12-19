import type { Session } from 'next-auth';

export const mockSession: Session = {
  expires: '1',
  user: { id: '1', email: 'a', name: 'Delta', image: 'c' },
};

export * from './custom-render';
export * from './trpc-wrapper';
