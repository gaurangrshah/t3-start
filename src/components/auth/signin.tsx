import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  VisuallyHiddenInput,
} from '@chakra-ui/react';
import { signIn } from 'next-auth/react';

import { authenticateUserInputSchema, zParse } from '@/server/schema';
import { convertFormToObject } from '@/utils';
import { PasswordField } from '../form';

export function Signin({ csrf }: { csrf: string }) {
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const inputs = [...e.currentTarget.querySelectorAll('input')];
    const formData = convertFormToObject(inputs);

    if (zParse(authenticateUserInputSchema, formData)) {
      await signIn('credentials', {
        ...formData,
        callbackUrl: '/', // @TODO: redirect to profile?
      });
      // clear inputs:
      inputs.forEach((input) => (input.value = ''));
      return;
    }
  }

  return (
    <Stack spacing="6" as="form" onSubmit={handleSubmit}>
      <Stack spacing="5">
        <VisuallyHiddenInput name="csrfToken" defaultValue={csrf} />
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="you@youremail.com"
            defaultValue="e2e@e2e.test"
          />
        </FormControl>
        <PasswordField autoComplete="current-password" defaultValue="test" />
      </Stack>
      <HStack justify="space-between">
        <Checkbox defaultChecked>Remember me</Checkbox>
        <Button variant="link" colorScheme="blue" size="sm">
          Forgot password?
        </Button>
      </HStack>
      <Stack spacing="6">
        <Button type="submit" variant="primary">
          Sign in
        </Button>
      </Stack>
    </Stack>
  );
}
