import { hashPassword } from '@/lib/next-auth/services';
import { userInputSchema } from '@/server/schema/auth.schema';
import { getBaseUrl } from '@/utils';
import { trpcPrismaErrorHandler } from '@/utils/error';
import { TRPCError } from '@trpc/server';
import { protectedProcedure, publicProcedure, router } from '../trpc';

export const authRouter = router({
  register: publicProcedure
    .input(userInputSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, email, password: plainPassword } = input;

      if (!name || !email || !plainPassword) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'missing input value(s)',
        });
      }

      try {
        await ctx.prisma.user.upsert({
          where: { email },
          update: {},
          create: {
            name,
            email,
            password: hashPassword(plainPassword),
            roleType: 'user',
          },
        });
        return {
          isSuccess: true,
        };
      } catch (error) {
        trpcPrismaErrorHandler(error);
      }
    }),
  signIn: publicProcedure
    .input(userInputSchema.pick({ email: true, password: true }))
    .query(async ({ ctx, input }) => {
      const { email, password: plainPassword } = input;

      if (!email || !plainPassword) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'missing input value(s)',
        });
      }

      const csrf = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/csrf`, {
        method: 'GET',
      });

      const response = await fetch(
        `${process.env.NEXTAUTH_URL}/api/auth/signin/credentials`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ csrfToken: csrf, email, plainPassword }),
        }
      );

      if (response.status !== 200) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'failed to sign in',
        });
      }
      return {
        isSuccess: true,
      };
    }),
  signOut: protectedProcedure
    .input(userInputSchema.pick({ email: true }))
    .query(async ({ ctx, input }) => {
      const { email } = input;
      if (!email) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'an email is required',
        });
      }

      try {
        const response = await fetch(
          `${process.env.NEXTAUTH_URL}/api/auth/signout`,
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({ email }),
          }
        );
        return {
          isSuccess: true,
        };
      } catch (error) {}
    }),
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return 'you can now see this secret message!';
  }),
});
