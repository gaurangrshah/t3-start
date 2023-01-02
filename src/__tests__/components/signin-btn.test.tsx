import type { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';

import { SignInButton } from '@/pages/index';
import { render, screen, userEvent } from '@/utils/test';

describe('SignInButton', () => {
  let user: UserEvent;
  beforeEach(() => {
    user = userEvent.setup();
  });

  test('authenticated', async () => {
    render(<SignInButton hasSession={true} />);

    const btn = await screen.getByRole('button', { name: /sign out/i });
    expect(btn).toBeInTheDocument();
    user.click(btn);
  });

  test('unauthenticated', async () => {
    render(<SignInButton hasSession={false} />);

    const btn = await screen.getByRole('button', { name: /sign in/i });
    expect(btn).toBeInTheDocument();
    user.click(btn);
  });
});
