import { screen, within } from '@testing-library/react';
import { expect, it, vi } from 'vitest';

import Home from '@/pages/index';
import { renderWithSession } from '@/utils/test/custom-render';
// import { trpc } from '@/utils/trpc';
// vi.mock('@/utils/trpc');

it('home', () => {
  // vi.mocked(trpc.example.hello.useQuery).mockRestore();
  renderWithSession(<Home />);
  const main = within(screen.getByRole('main'));
  // const header = within(screen.getByRole('header'));
  // expect(header).toBeDefined();
  expect(
    main.getByRole('heading', { level: 1, name: /create t3 app/i })
  ).toBeDefined();

  // const footer = within(screen.getByRole('contentinfo'));
  // const link = within(footer.getByRole('link'));
  // expect(link.getByRole('img', { name: /vercel logo/i })).toBeDefined();
});
