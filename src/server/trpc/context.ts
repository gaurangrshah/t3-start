import { type PrismaClient } from '@prisma/client';
import { type inferAsyncReturnType } from '@trpc/server';
import { type CreateNextContextOptions } from '@trpc/server/adapters/next';
import { type Session } from 'next-auth';

import { GitFileManager } from '@/lib/octokit';
import { getServerAuthSession } from '../common/get-server-auth-session';
import { prisma } from '../db/client';

type CreateContextOptions = {
  session: Session | null;
  prisma?: PrismaClient;
  octo?: typeof GitFileManager;
};

/** Use this helper for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 **/
export const createContextInner = async (opts: CreateContextOptions) => {
  const octokit = new GitFileManager(opts?.session);
  return {
    session: opts.session,
    prisma,
    octo: octokit,
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;

  // Get the session from the server using the unstable_getServerSession wrapper function
  const session = await getServerAuthSession({ req, res });

  return await createContextInner({
    session,
  });
};

export type Context = inferAsyncReturnType<typeof createContext>;
