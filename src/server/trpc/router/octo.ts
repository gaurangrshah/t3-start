import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { protectedProcedure, router } from '../trpc';

export const repoInputSchema = z.object({ repositoryName: z.string() });

export const octoRouter = router({
  listRepos: protectedProcedure.query(async ({ ctx }) => {
    try {
      const repositories = await ctx.octo.listPublicRepositories();
      if (!repositories) throw new Error('Could not find any repositories');
      return repositories ?? [];
    } catch (error) {
      console.error(error);
    }
  }),
  getSelectedRepo: protectedProcedure.query(async ({ ctx, input }) => {
    try {
      const repository = await ctx.octo.getSelectedRepository();
      if (!repository) throw new Error('Could not find selected repositories');
      return repository;
    } catch (error) {}
  }),
  selectRepo: protectedProcedure
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
  createTemplateRepo: protectedProcedure // default procedure used to create
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
  createRepo: protectedProcedure
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
