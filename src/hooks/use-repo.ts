import { trpc } from '@/utils/trpc';

export function useRepo() {
  return {
    repos: {
      list: trpc.repo.list.useQuery,
      select: trpc.repo.select.useMutation,
      create: trpc.repo.create.useMutation,
      createTemplate: trpc.repo.createFromTemplate.useMutation,
    },
  };
}
