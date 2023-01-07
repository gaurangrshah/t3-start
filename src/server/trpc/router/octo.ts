import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { protectedProcedure, router } from '../trpc';

export const repoInputSchema = z.object({ repositoryName: z.string() });

export const octoRouter = router({
  listRepos: protectedProcedure.query(async ({ ctx }) => {
    try {
      const repositories = await ctx.octo.listPublicRepositories();
      return repositories ?? [];
    } catch (error) {
      console.error(error);
    }
  }),
  selectRepo: protectedProcedure
    .input(repoInputSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const result = await ctx.octo.selectRepository(input.repositoryName);
        return result ?? { message: 'something went wrong' };
      } catch (error) {
        console.error(error);
      }
    }),
});
