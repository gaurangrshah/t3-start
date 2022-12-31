import {
Button,
chakra,
Heading,
HStack,
Stack,
Text,
useBreakpointValue
} from '@chakra-ui/react';
import Link from 'next/link';

const ChLink = chakra(Link);

export function AuthPageHeader({ type }: { type: 'signin' | 'register' }) {
  return (
    <Stack spacing="6">
      {/* <Logo /> */}
      <Stack
        spacing={{ base: '2', md: '3' }}
        textAlign="center"
        color="inverted"
        as="header"
      >
        {type === 'signin' ? (
          <>
            <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
              Log in to your account
            </Heading>
            <HStack spacing="1" justify="center">
              <Text>Don't have an account?</Text>
              <ChLink color="link" href="/auth/register">
                Sign up
              </ChLink>
            </HStack>
          </>
        ) : null}
        {type === 'register' ? (
          <>
            <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
              Register a new account
            </Heading>
            <HStack spacing="1" justify="center">
              <Text>Already have an account?</Text>
              {/* <Button variant="link" colorScheme="blue">
                Sign in
              </Button> */}
              <ChLink color="link" href="/auth/signin">
                Sign in
              </ChLink>
            </HStack>
          </>
        ) : null}
      </Stack>
    </Stack>
  );
}
