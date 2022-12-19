import { Button, chakra, Flex } from '@chakra-ui/react';
import { randomColor } from '@chakra-ui/theme-tools';
import { signIn, signOut, useSession } from 'next-auth/react';

import type { ButtonProps } from '@chakra-ui/react';
import type { NextPage } from 'next';
import type { FC } from 'react';

import { DefaultLayout } from '@/components';
import { trpc } from '@/utils/trpc';

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: 'from tRPC' });

  return (
    <DefaultLayout
      title="T3 Boiler"
      subtitle="| The fastest way to develop"
      description="With e2e type-safety"
    >
      <chakra.div textAlign="center">
        <chakra.h1 as="h1" color={randomColor()}>
          Create <chakra.span color={randomColor()}>T3</chakra.span> App
        </chakra.h1>
        <Flex direction="column" align="center" gap="0.5rem">
          <chakra.p color="white" fontSize="2xl">
            {hello.data ? hello.data.greeting : 'Loading tRPC query...'}
          </chakra.p>
          <AuthShowcase />
        </Flex>
      </chakra.div>
    </DefaultLayout>
  );
};

export default Home;

const AuthShowcase: FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  const signInBtn: ButtonProps = {
    variant: 'pill',
    bg: 'rgba(255, 255, 255, 0.1)',
    p: '0.75rem 2.5rem',
    color: 'white',
    _hover: { bg: 'rgba(255, 255, 255, 0.2)' },
  };

  return (
    <>
      {/* <AvatarMenu /> */}
      <chakra.div layerStyle="flex-center" flexDirection="column" gap={4}>
        <chakra.p color="white" fontSize="2xl">
          {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
          {secretMessage && <span> - {secretMessage}</span>}
        </chakra.p>
        <Button
          {...signInBtn}
          onClick={sessionData ? () => signOut() : () => signIn('google')}
        >
          {sessionData ? 'Sign out' : 'Sign in'}
        </Button>
      </chakra.div>
    </>
  );
};
