import { hashPassword } from '@/lib/next-auth/services';
import { userInputSchema } from '@/server/schema';
import { trpcPrismaErrorHandler } from '@/utils/error';
import { TRPCError } from '@trpc/server';
import { adminProcedure, protectedProcedure, router } from '../trpc';

export const userRouter = router({
  makeAdmin: adminProcedure
    .input(userInputSchema.pick({ email: true }))
    .mutation(async ({ ctx, input }) => {
      const { email } = input;
      if (!email) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'must provide an email',
        });
      }

      try {
        const user = await ctx.prisma.user.upsert({
          where: { email },
          update: { roleType: 'admin' },
          create: {},
        });

        return {
          user,
          isSuccess: true,
        };
      } catch (error) {}
    }),
  getUserByEmail: protectedProcedure
    .input(userInputSchema.pick({ email: true }))
    .query(async ({ ctx, input }) => {
      if (!input.email) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'must provide an email',
        });
      }

      try {
        const user = await ctx.prisma.user.findUniqueOrThrow({
          where: { email: input.email },
        });

        return {
          user,
          isSuccess: true,
        };
      } catch (error) {
        trpcPrismaErrorHandler(error);
      }
    }),
  create: adminProcedure
    .input(userInputSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, email, password: plainPassword } = input;

      if (!name && !email && !plainPassword) {
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
  update: adminProcedure
    .input(userInputSchema.partial())
    .mutation(async ({ ctx, input }) => {
      const { name, email, password: plainPassword } = input;

      if (!name || !email) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'missing input value(s)',
        });
      }

      try {
        const user = await ctx.prisma.user.upsert({
          where: { email },
          update: {
            name,
            email,
          },
          create: {},
        });
        return {
          isSuccess: true,
          user,
        };
      } catch (error) {
        trpcPrismaErrorHandler(error);
      }
    }),
  delete: adminProcedure
    .input(userInputSchema.pick({ email: true }))
    .mutation(async ({ ctx, input }) => {
      const { email } = input;

      if (!email) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'missing input value(s)',
        });
      }

      try {
        const deletedUser = await ctx.prisma.user.delete({
          where: { email },
        });
        return {
          deletedUser,
          isSuccess: true,
        };
      } catch (error) {
        trpcPrismaErrorHandler(error);
      }
    }),
});
