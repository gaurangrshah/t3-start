import { router } from '../trpc';
import { authRouter } from './auth';
import { exampleRouter } from './example';
import { fsRouter } from './fs';
import { repoRouter } from './repo';
import { userRouter } from './user';
import { sandboxRouter } from './sandbox';

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  user: userRouter,
  fs: fsRouter,
  repo: repoRouter,
  sandbox: sandboxRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
