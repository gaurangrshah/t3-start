import { SignInButton } from '@/pages/index';
import { render, screen, userEvent } from '@/utils/test';

describe('SignInButton', () => {
  test('SignInButton (label="sign out") when (session=Session)', async () => {
    const user = userEvent.setup();
    render(<SignInButton hasSession={true} />);

    const btn = await screen.getByRole('button', { name: /sign out/i });
    expect(btn).toBeInTheDocument();
    user.click(btn);
  });

  test('SignInButton (label="sign in") when (session=null)', async () => {
    const user = userEvent.setup();
    render(<SignInButton hasSession={false} />);

    const btn = await screen.getByRole('button', { name: /sign in/i });
    expect(btn).toBeInTheDocument();
    user.click(btn);
  });
});
