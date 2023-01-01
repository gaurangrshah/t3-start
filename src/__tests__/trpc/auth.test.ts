import { createSession, trpcRequest } from '@/utils/test';
import { TRPCError } from '@trpc/server';
import { Session } from 'next-auth';
import * as nextAuthReact from 'next-auth/react';

jest.mock('next-auth/react');
const nextAuthReactMocked = nextAuthReact as jest.Mocked<typeof nextAuthReact>;

describe('auth/user router suite', () => {
  let session: Session;
  beforeAll(() => {
    session = createSession();
  });

  test('next-auth: getSession()', async () => {
    const response = await trpcRequest(session).auth.getSession();
    expect(response).toMatchObject(session);
  });
  test('should display secret message', async () => {
    const response = await trpcRequest(session).auth.getSecretMessage();
    expect(response).toBe('you can now see this secret message!');
  });
  test('next-auth: register()', async () => {
    const response = await trpcRequest().auth.register({
      name: 'tom',
      email: 'tom@example.com',
      password: String(process.env.TEST_PW),
    });
    expect(response?.isSuccess).toBe(true);
  });
  test('trpc.user: makeAdmin', async () => {
    const response = await trpcRequest(session).user.makeAdmin({
      email: 'tom@example.com',
    });

    expect(response?.isSuccess).toBe(true);
    expect(response?.user.roleType).toBe('admin');
  });
  // test('trpc.user: signin', async () => {
  //   const response = await trpcRequest().auth.signIn({
  //     email: 'tom@example.com',
  //     password: 'test',
  //   });

  //   expect(response?.isSuccess).toBe(true);
  // });
  // test('trpc:user: signout', async () => {
  //   const response = await trpcRequest(session).auth.signOut({
  //     email: 'tom@example.com',
  //   });
  //   expect(response?.isSuccess).toBe(true);
  // });
  test('trpc.user: delete', async () => {
    const response = await trpcRequest(session).user.delete({
      email: 'tom@example.com',
    });

    expect(response?.isSuccess).toBe(true);
  });
});
