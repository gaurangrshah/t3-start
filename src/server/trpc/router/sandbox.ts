import { z } from 'zod';

import { protectedProcedure, router } from '../trpc';

export const sandboxRouter = router({
  readFile: protectedProcedure
    .input(z.object({ path: z.string() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.octo.readFile({ path: input.path });
      return result;
    }),
});
