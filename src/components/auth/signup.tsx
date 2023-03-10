import {
Button,
FormControl,
FormLabel,
Input,
Stack,
VisuallyHidden,
VisuallyHiddenInput
} from '@chakra-ui/react';

import type { UserInput } from '@/server/schema';

import { userInputSchema,zParse } from '@/server/schema';
import { convertFormToObject,isBrowser } from '@/utils';
import { trpc } from '@/utils/trpc';
import { PasswordField } from '../form';

type SignUpInput = UserInput & {
  passwordConfirm: string;
  csrfToken: string;
};

export function Signup({ csrf }: { csrf: string }) {
  const { mutate, isLoading } = trpc.auth.register.useMutation({
    onSuccess: () => {
      if (isBrowser) console.log('🟢 register:sucess');
    },
    onError: (error) => {
      if (error) {
        if (isBrowser) {
          console.error('🔴 register:error', error);
        }
      }
    },
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const inputs = [...e.currentTarget.querySelectorAll('input')];
    const formData = convertFormToObject(inputs);

    if (zParse(userInputSchema, formData)) {
      mutate(formData as SignUpInput);
      inputs.forEach((input) => (input.value = ''));
      return;
    }
  }

  return (
    <Stack spacing="6" as="form" onSubmit={handleSubmit}>
      <Stack spacing="5">
        <VisuallyHidden>
          <FormLabel htmlFor="csrfToken">csrfToken</FormLabel>
          <VisuallyHiddenInput name="csrfToken" defaultValue={csrf} />
        </VisuallyHidden>
        <FormControl>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input id="name" type="text" name="name" placeholder="Your name" />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="you@youremail.com"
          />
        </FormControl>
        <PasswordField />
        <PasswordField id="password-confirm" name="passwordConfirm" />
      </Stack>
      <Stack spacing="6">
        <Button type="submit" variant="primary">
          Sign up
        </Button>
      </Stack>
    </Stack>
  );
}
