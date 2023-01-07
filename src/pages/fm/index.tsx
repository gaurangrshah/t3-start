import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';

import type { NextPageWithAuth } from '@/types';

import { CustomIcon, DefaultLayout, PageHeader } from '@/components';

const IconLabel = () => {
  return (
    <HStack>
      <CustomIcon icon="github" size="1.25rem" />
      <Text>Your base repo.</Text>
    </HStack>
  );
};

const FMPage: NextPageWithAuth = () => {
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
        <PageHeader title="Connect to a primary respository" subtitle="" />
        <Stack spacing="8" align="flex-start">
          <Stack
            as="form"
            direction="column"
            layerStyle="panel"
            w="full"
            // onSubmit={submitForm}
          >
            <HStack justifyContent="center" w="full">
              <FormControl>
                <FormLabel htmlFor="title">
                  <IconLabel />
                </FormLabel>
                {/* <Input type="text" name="title" defaultValue="This is a title" /> */}
                {/* <Select placeholder="Select a Repository"> */}
                <Select placeholder="Select a Repository" size="lg">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </FormControl>
            </HStack>
          </Stack>
        </Stack>
      </Container>
    </DefaultLayout>
  );
};
FMPage.auth = true;

export default FMPage;
