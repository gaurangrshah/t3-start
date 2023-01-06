import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from '@chakra-ui/react';

import type { NextPageWithAuth } from '@/types';

import { DefaultLayout } from '@/components';
import { useFsManager } from '@/hooks';
import { convertFormToObject, slugify } from '@/utils';

type CreateFile = {
  title: string;
  content: string;
};

const EditorPage: NextPageWithAuth = () => {
  const { createFileMutation, readFile } = useFsManager();
  const { data: file } = readFile({ fileName: 'test.json' });

  const submitForm = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const inputs = [
      ...e.currentTarget.querySelectorAll('input'),
      ...e.currentTarget.querySelectorAll('textarea'),
    ];
    const formData = convertFormToObject(inputs);
    createFileMutation.mutate({
      fileName: `${slugify(String(formData?.title?.trim()))}.json`,
      data: String(formData?.content?.trim()),
    });
    // inputs.forEach((input) => (input.value = ''));
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
        <Stack spacing="8">
          Editor
          <Stack
            as="form"
            direction="column"
            layerStyle="panel"
            onSubmit={submitForm}
          >
            <FormControl>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input type="text" name="title" defaultValue="This is a title" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="content">Content</FormLabel>
              <Textarea name="content" defaultValue="and some content" />
            </FormControl>
            <Button type="submit">Submit</Button>
          </Stack>
        </Stack>
      </Container>
    </DefaultLayout>
  );
};

export default EditorPage;

EditorPage.auth = true;
