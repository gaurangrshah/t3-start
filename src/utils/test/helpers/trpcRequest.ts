/**
 * Inspired by BisonApp test utils:
 *
 * @SEE: https://github.com/echobind/bisonapp/blob/canary/packages/create-bison-app/template/tests/helpers/db.ts
 */

import type { User } from '@prisma/client';

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
