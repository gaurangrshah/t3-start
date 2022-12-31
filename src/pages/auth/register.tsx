import { Box, Container, Stack } from '@chakra-ui/react';
import { getCsrfToken } from 'next-auth/react';

import type { GetServerSidePropsContext } from 'next';

import { AuthPageHeader } from '@/components';
import { Signup } from '@/components/auth/signup';
import { DefaultLayout } from '@/components/layouts/default';

export default function RegisterPage({ csrf }: { csrf: string }) {
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
          <AuthPageHeader type="register" />
          <Box layerStyle="panel">
            <Signup csrf={csrf} />
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
    },
  };
}
