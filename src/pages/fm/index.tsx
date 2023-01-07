import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';

import { CustomIcon, DefaultLayout, PageHeader } from '@/components';
import type { Repository } from '@/lib/octokit';
import type { NextPageWithAuth } from '@/types';
import { trpc } from '@/utils/trpc';

const IconLabel = () => {
  return (
    <HStack>
      <CustomIcon icon="github" size="1.25rem" />
      <Text>Your base repo.</Text>
    </HStack>
  );
};

const renderRepoList = (repo: Repository) =>
  repo?.permissions?.admin ? (
    <option value={repo.name} key={repo.id}>
      {repo.name}- {repo.owner?.name}
    </option>
  ) : null;

const FMPage: NextPageWithAuth = () => {
  const { data: respositories, isLoading } =
    trpc.octo.listRepos.useQuery(undefined);

  const selectRepoMutation = trpc.octo.selectRepo.useMutation();

  return (
    <DefaultLayout
      title="Sign In"
      subtitle="| T3 Boiler"
      description="With e2e type-safety"
    >
      <Container
        maxW="lg"
        py={{ base: '12', md: '24' }}
        px={{ base: '0', sm: '8' }}
      >
        <PageHeader title="Connect to a primary respository" subtitle="" />
        <Stack spacing="8" align="flex-start">
          <Stack direction="column" layerStyle="panel" w="full">
            <HStack justifyContent="center" w="full">
              <FormControl>
                <FormLabel htmlFor="title">
                  <IconLabel />
                </FormLabel>
                <Select
                  placeholder="Select a Repository"
                  size="lg"
                  onChange={(e) =>
                    selectRepoMutation.mutate(
                      {
                        repositoryName: e.currentTarget.value,
                      },
                      {
                        onSuccess(data, variables, context) {
                          console.log('🚀 | file: index.tsx:71 | data', data);
                        },
                      }
                    )
                  }
                >
                  {respositories?.length ? (
                    respositories.map(renderRepoList)
                  ) : (
                    <option
                      value="no repository found"
                      placeholder="no repository found"
                      disabled
                    />
                  )}
                </Select>
              </FormControl>
            </HStack>
          </Stack>
        </Stack>
      </Container>
    </DefaultLayout>
  );
};
FMPage.auth = true;

export default FMPage;
