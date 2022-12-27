import Home from '@/pages/index';

import { render, screen, userEvent } from '@/tests/utils';

// const nextAuth = jest.mock('next-auth');

// const { signIn } = nextAuth;

describe('homepage', () => {
  test('it renders', async () => {
    const user = userEvent.setup();
    render(<Home />);
    const heading = await screen.getByRole('heading', {
      name: /create t3 app/i,
    });
    const btn = await screen.getByRole('button', { name: /sign in/i });

    expect(heading).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
    user.click(btn);
  });
});
