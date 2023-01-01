/**
 * Inspired by BisonApp test utils:
 * Used to access trpc router apis from testing environemnt without the need for a wrapper
 * @NOTE: these methods will directly interact with the database -- so be sure to have a testing environment configured
 *
 * @SEE: https://github.com/echobind/bisonapp/blob/canary/packages/create-bison-app/template/tests/helpers/db.ts
 */
import { prisma } from '@/server/db/client';
import { appRouter } from '@/server/trpc/router/_app';
import { Session } from 'next-auth';

function createTestContext(session?: Session) {
  return {
    prisma,
    session: session ?? null,
  };
}

/** A convenience method to call tRPC queries */
export const trpcRequest = (session?: Partial<Session>) => {
  return appRouter.createCaller(createTestContext(session as Session));
};
