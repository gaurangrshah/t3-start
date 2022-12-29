import { initTRPC, TRPCError } from '@trpc/server';
import { TRPC_ERROR_CODE_KEY } from '@trpc/server/rpc';
import superjson from 'superjson';

import { type Context } from './context';

export class AppError extends TRPCError {
  // @NOTE: AppError config inspired by BisonApp
  invalidArgs?: Record<string, any>;
  constructor(data: {
    message?: string;
    code: TRPC_ERROR_CODE_KEY;
    cause?: unknown;
    invalidArgs?: Record<string, any>;
  }) {
    const { invalidArgs, ...superData } = data;
    super(superData);

    this.invalidArgs = invalidArgs;
  }
}

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  // errorFormatter({ shape }) {
  //   return shape;
  // },
  // @NOTE: ErrorFormatter config inspired by BisonApp
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        invalidArgs: error instanceof AppError ? error.invalidArgs : undefined,
        message: error.message,
      },
    };
  },
});

export const router = t.router;

/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure;

/**
 * Reusable middleware to ensure
 * users are logged in
 */
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

const adminMiddleware = t.middleware(({ ctx, next }) => {
  // @NOTE Inspired by BisonApp
  // @TODO: implement user role and check for role === 'admin' instead of the condition below
  if (!ctx.session || !ctx.session.user || !ctx.session.expires) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    ctx: {
      ...ctx,
      // infers that `user` is non-nullable to downstream procedures
      user: ctx.session.user,
    },
  });
});

/**
 * Protected procedures
 **/
export const protectedProcedure = t.procedure.use(isAuthed);
export const adminProcedure = protectedProcedure.use(adminMiddleware); // this may not work see next
// export const adminProcedure = t.procedure(adminMiddleware)
