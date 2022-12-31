import {
Box,
Button,
ButtonGroup,
Container,
Divider,
Heading,
HStack,
Stack,
Text,
} from '@chakra-ui/react';
import { getCsrfToken,getProviders,signIn } from 'next-auth/react';

import type { GetServerSidePropsContext } from 'next';

import { AuthPageHeader,GoogleIcon,Signin } from '@/components';
import { DefaultLayout } from '@/components/layouts/default';

export default function SigninPage({
  csrf,
  providers,
}: {
  csrf: string;
  providers: any;
}) {
  const callbackUrl = '/'; // @TODO: redirect to profile?

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
            {providers?.credentials ? <Signin csrf={csrf} /> : null}
            {providers?.google && providers?.credentials ? (
              <HStack>
                <Divider />
                <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                  or continue with
                </Text>
                <Divider />
              </HStack>
            ) : null}
            <ButtonGroup variant="outline" spacing="4" width="full" mt={4}>
              {providers?.google ? (
                <Button
                  w="full"
                  onClick={() => signIn('google', { callbackUrl })}
                >
                  <HStack w="full" justifyContent="center" gap={3}>
                    <GoogleIcon />
                    <Text>Sign in with Google</Text>
                  </HStack>
                </Button>
              ) : null}
            </ButtonGroup>
          </Box>
        </Stack>
      </Container>
    </DefaultLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrf: await getCsrfToken(context),
      providers: await getProviders(),
    },
  };
}
