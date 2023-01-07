import { trpc } from '@/utils/trpc';

export function useOctoManager() {
  return {
    repos: {
      list: trpc.octo.listRepos.useQuery,
      select: trpc.octo.selectRepo.useMutation,
      create: trpc.octo.createRepo.useMutation,
      createTemplate: trpc.octo.createTemplateRepo.useMutation,
    },
  };
}
