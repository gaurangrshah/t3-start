/**
 * @TODO: Update Repo select UI add infinite query
 * @SEE: https://stackoverflow.com/a/66853297/7061301
 * @SEE: https://trpc.io/docs/useInfiniteQuery
 *
 * @TODO: Add selecto button and update onChange to local state
 * @TODO: add option to create a new repo
 *
 */
import {
  Button,
  chakra,
  Container,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  Select,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';

import type { Repository } from '@/lib/octokit';
import type { NextPageWithAuth } from '@/types';

import { CustomIcon, DefaultLayout, PageHeader } from '@/components';
import { useOctoManager } from '@/hooks';
import { slugify } from '@/utils';

const IconLabel = ({ repoName }: { repoName: string | undefined }) => {
  return (
    <HStack>
      <CustomIcon icon="github" size="1.25rem" />
      <Text>
        Your base repo: {repoName ? <chakra.span>{repoName}</chakra.span> : ''}
      </Text>
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
  const [repo, setRepo] = useState<Repository | null>(null);

  const { repos } = useOctoManager();
  const { data: respositories, isLoading } = repos.list(undefined);
  const selectRepoMutation = repos.select();
  const createRepoMutation = repos.create();

  const onCreate = (e: React.SyntheticEvent) => {
    e.preventDefault()
    console.log(String(e.currentTarget.querySelector('input')?.value));
    createRepoMutation.mutate(
      {
        repositoryName: slugify(
          String(e.currentTarget.querySelector('input')?.value)
        ),
      },
      {
        onSuccess(data, variables, context) {
          setRepo(data);
          console.log('🚀 | file: index.tsx:66 | data', data);
        },
      }
    );
  };

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
        <PageHeader title="Connect to a primary respository" subtitle={''} />
        <Stack spacing="8" align="flex-start">
          <Stack direction="column" layerStyle="panel" w="full">
            <HStack justifyContent="center" w="full" pb={3}>
              <FormControl>
                <FormLabel htmlFor="title">
                  <IconLabel repoName={repo?.name} />
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
                          setRepo(data);
                          console.log('🚀 | file: index.tsx:79 | data', data);
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
            <Divider border="1px solid" borderColor="gray.200" />
            <VStack as="form" onSubmit={onCreate}>
              <FormControl>
                <FormLabel htmlFor="title">
                  {/* <IconLabel repoName={repo?.name} /> */}
                  Create a new repo (From Our Template)
                </FormLabel>
                <InputGroup>
                  <Input type="text" name="repoName" />
                  <InputRightElement width="4.5rem">
                    <Button type="submit" h="1.75rem" size="sm">
                      Create
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </VStack>
          </Stack>
        </Stack>
      </Container>
    </DefaultLayout>
  );
};
FMPage.auth = true;

export default FMPage;
