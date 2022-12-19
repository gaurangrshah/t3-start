import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';

import type { ReactNode } from 'react';

import { theme } from '@/theme';
import { mockSession } from './index';

export function renderWithSession(ui: ReactNode) {
  render(
    <SessionProvider session={mockSession}>
      <ChakraProvider theme={theme}>{ui}</ChakraProvider>
    </SessionProvider>
  );
}
