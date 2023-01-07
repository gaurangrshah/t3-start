import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { protectedProcedure,router } from '../trpc';

export const repoInputSchema = z.object({ repositoryName: z.string() });

export const repoRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    try {
      const repositories = await ctx.octo.listPublicRepositories();
      if (!repositories) throw new Error('Could not find any repositories');
      return repositories ?? [];
    } catch (error) {
      console.error(error);
    }
  }),
  getSelected: protectedProcedure.query(async ({ ctx, input }) => {
    try {
      const repository = await ctx.octo.getSelectedRepository();
      if (!repository) throw new Error('Could not find selected repositories');
      return repository;
    } catch (error) {}
  }),
  select: protectedProcedure
    .input(repoInputSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const repository = await ctx.octo.selectRepository(
          input.repositoryName
        );
        if (!repository) throw new Error('Could not complete selection');
        return repository;
      } catch (error) {
        console.error(error);
      }
    }),
  createFromTemplate: protectedProcedure // default procedure used to create
    .input(repoInputSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const repository = await ctx.octo.createTemplateRepository(
          input.repositoryName
        );
        if (!repository) throw new Error('Could not create Repository');
        return repository;
      } catch (error) {
        console.error(error);
      }
    }),
  create: protectedProcedure
    .input(repoInputSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const repository = await ctx.octo.createRepository(
          input.repositoryName
        );
        if (!repository) throw new Error('Could not create Repository');
        return repository;
      } catch (error) {
        console.error(error);
      }
    }),
});
