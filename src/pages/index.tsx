import { Button, chakra, Flex } from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

import type { ButtonProps } from '@chakra-ui/react';
import type { NextPage } from 'next';
import type { FC } from 'react';

import { DefaultLayout } from '@/components';
import { IS_TEST, publish } from '@/utils';
import { trpc } from '@/utils/trpc';

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: 'from tRPC' });

  useEffect(() => {
    publish('show-toast', {
      status: 'info',
      title: 'test',
      description: 'Testing',
    });
  }, []);

  return (
    <DefaultLayout
      title="T3 Boiler"
      subtitle="| The fastest way to develop"
      description="With e2e type-safety"
    >
      <chakra.div textAlign="center">
        <chakra.h1 as="h1" color={'white'}>
          Create <chakra.span color={'white'}>T3</chakra.span> App
        </chakra.h1>
        <Flex direction="column" align="center" gap="0.5rem">
          <chakra.p color="white" fontSize="2xl">
            {hello.data ? hello.data.greeting : 'Loading tRPC query...'}
          </chakra.p>
          {IS_TEST ? <chakra.p>TEST_ENV</chakra.p> : null}
          <AuthShowcase />
        </Flex>
      </chakra.div>
    </DefaultLayout>
  );
};

export default Home;

export const SignInButton: FC<{ hasSession: boolean }> = ({ hasSession }) => {
  const signInBtn: ButtonProps = {
    variant: 'pill',
    bg: 'rgba(255, 255, 255, 0.1)',
    p: '0.75rem 2.5rem',
    color: 'white',
    _hover: { bg: 'rgba(255, 255, 255, 0.2)' },
  };

  return (
    <Button
      {...signInBtn}
      onClick={hasSession ? () => signOut() : () => signIn()}
    >
      {hasSession ? 'Sign out' : 'Sign in'}
    </Button>
  );
};

const AuthShowcase: FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <>
      <chakra.div layerStyle="flex-center" flexDirection="column" gap={4}>
        <chakra.p color="white" fontSize="2xl">
          {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
          {secretMessage && <span> - {secretMessage}</span>}
        </chakra.p>
        <SignInButton hasSession={!!sessionData} />
      </chakra.div>
    </>
  );
};
