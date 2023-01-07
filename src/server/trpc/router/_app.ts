import { router } from '../trpc';
import { authRouter } from './auth';
import { exampleRouter } from './example';
import { fsRouter } from './fs';
import { repoRouter } from './repo';
import { userRouter } from './user';

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  user: userRouter,
  fs: fsRouter,
  repo: repoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
