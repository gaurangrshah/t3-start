import { hashPassword } from '@/lib/next-auth/services';
import { userInputSchema } from '@/server/schema/auth.schema';
import { trpcPrismaErrorHandler } from '@/utils/error';
import { protectedProcedure, publicProcedure, router } from '../trpc';

export const authRouter = router({
  register: publicProcedure
    .input(userInputSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, email, password: plainPassword } = input;

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
      } catch (error) {
        trpcPrismaErrorHandler(error);
      }
    }),
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return 'you can now see this secret message!';
  }),
});
