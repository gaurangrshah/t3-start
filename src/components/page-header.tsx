import { chakra, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';

const ChLink = chakra(Link);

type AuthPageHeaderProps = {
  title?: string;
  subtitle?: string;
};

export function PageHeader({
  title = 'This is the title',
  subtitle = 'This is the subtitle',
}: AuthPageHeaderProps) {
  return (
    <Stack spacing="6" pb={12}>
      <Stack
        spacing={{ base: '2', md: '3' }}
        textAlign="center"
        color="inverted"
        as="header"
      >
        <Heading size={{ base: 'xs', md: 'sm' }}>{title}</Heading>
        <Text>{subtitle}</Text>
      </Stack>
    </Stack>
  );
}
