import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { getCsrfToken, getProviders, signIn } from 'next-auth/react';

import type { GetServerSidePropsContext, NextPage } from 'next';

import { AuthPageHeader, CustomIcon, GoogleIcon, Signin } from '@/components';
import { DefaultLayout } from '@/components/layouts/default';

type Visibility = {
  show: boolean;
};

const CredentialsForm: React.FC<{ csrf: string } & Visibility> = ({
  show,
  csrf,
}) => {
  return show ? <Signin csrf={csrf} /> : null;
};

const GoogleOAuth: React.FC<Visibility> = ({ show }) => {
  const callbackUrl = '/'; // @TODO: redirect to profile?
  return show ? (
    <Button
      w="full"
      onClick={() => signIn('google', { callbackUrl })}
      variant="outline"
    >
      <HStack w="full" justifyContent="center" gap={3}>
        <GoogleIcon />
        <Text>Sign in with Google</Text>
      </HStack>
    </Button>
  ) : null;
};
const GithubOAuth: React.FC<Visibility> = ({ show }) => {
  const callbackUrl = '/'; // @TODO: redirect to profile?
  return show ? (
    <Button
      w="full"
      onClick={() => signIn('github', { callbackUrl })}
      variant="outline"
    >
      <HStack w="full" justifyContent="center" gap={3}>
        {/* <GoogleIcon /> */}
        <CustomIcon icon="github" size={'1.25rem'} />
        <Text>Sign in with Github</Text>
      </HStack>
    </Button>
  ) : null;
};

const AuthDivider: React.FC<Visibility> = ({ show }) => {
  return show ? (
    <HStack>
      <Divider />
      <Text fontSize="sm" whiteSpace="nowrap" color="muted">
        or continue with
      </Text>
      <Divider />
    </HStack>
  ) : null;
};

const SigninPage: NextPage<{
  csrf: string;
  providers: any;
}> = ({ csrf, providers }) => {
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
        <Stack spacing="8">
          <AuthPageHeader type="signin" />
          <Box layerStyle="panel">
            <CredentialsForm show={!!providers.credentials} csrf={csrf} />
            <AuthDivider show={providers?.google && providers?.credentials} />
            <VStack spacing="4" width="full" mt={4}>
              <GoogleOAuth show={!!providers.google} />
              <GithubOAuth show={!!providers.github} />
            </VStack>
          </Box>
        </Stack>
      </Container>
    </DefaultLayout>
  );
};

export default SigninPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrf: await getCsrfToken(context),
      providers: await getProviders(),
    },
  };
}
