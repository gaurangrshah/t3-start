import { Button } from '@chakra-ui/react';
import * as nextAuth from 'next-auth/react';

import Home from '@/pages/index';
import { render, screen, userEvent } from '@/tests/utils';

// jest.mock('next-auth/react');
const nextAuthMocked = nextAuth as jest.Mocked<typeof nextAuth>;
const { signIn } = nextAuthMocked;

export const mockSession = {
  expires: '1',
  user: { id: '1', email: 'a', name: 'Delta', image: 'c' },
};

describe('homepage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('it renders', async () => {
    render(<Home />);

    const heading = await screen.getByRole('heading', {
      name: /create t3 app/i,
    });
    expect(heading).toBeInTheDocument();

    const btn = await screen.getByRole('button', { name: /sign in/i });
    expect(btn).toBeInTheDocument();
  });

  test('it clicks', async () => {
    const user = userEvent.setup();
    // const signIn = jest.fn();
    const spy = jest
      .spyOn(nextAuthMocked, 'signIn')
      .mockImplementation(() => mockSession);
    render(<Button onClick={() => signIn()}>Sign In</Button>);

    const btn = await screen.getByRole('button', { name: /sign in/i });
    expect(btn).toBeInTheDocument();
    user.click(btn);

    // expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
