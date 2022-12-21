import { User } from '@prisma/client';

import { prisma } from '@/server/db/client';
import { appRouter } from '@/server/trpc/router/_app';

function createTestContext(user?: User) {
  return {
    db: prisma,
    prisma,
    user: user || null,
    session: null,
  };
}

/** A convenience method to call tRPC queries */
export const trpcRequest = (user?: Partial<User>) => {
  return appRouter.createCaller(createTestContext(user as User));
};
