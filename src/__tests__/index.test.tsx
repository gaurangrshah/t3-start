import { Button } from '@chakra-ui/react';
import userEvent from '@testing-library/user-event';

import Home, { authBtn } from '@/pages/index';
import { render, screen } from '@/tests/utils';
import * as nextAuth from 'next-auth/react';

jest.mock('next-auth/react');
const nextAuthMocked = nextAuth as jest.Mocked<typeof nextAuth>;
const { signIn } = nextAuthMocked;

export const mockSession = {
  expires: '1',
  user: { id: '1', email: 'a', name: 'Delta', image: 'c' },
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('Home', () => {
  it('unauthorized home page view', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const heading = await screen.getByRole('heading', {
      name: /create t3 app/i,
    });
    expect(heading).toBe('visible');
    // expect(await screen.getByText('Loading tRPC query...')).toBeInTheDocument();
    // expect(
    //   await screen.getByRole('button', { name: 'Sign In' })
    // ).toBeInTheDocument();
  });

  // it('unauthorized sign in button', async () => {
  //   nextAuthMocked.signIn.mockImplementation(() =>
  //     Promise.resolve({ error: '', status: 403, ok: false, url: '' })
  //   );

  //   const user = userEvent.setup();
  //   const { debug } = render(
  //     <Button {...authBtn} onClick={() => signIn('google')}>
  //       Sign In
  //     </Button>
  //   );

  //   debug();
  //   // expect(global.window.location.pathname).toEqual('/');
  //   const credsSignInBtn = await screen.getByRole('button', {
  //     name: 'Sign In',
  //   });
  //   expect(credsSignInBtn).toBeInTheDocument();
  //   // const first = useRef(second).click(credsSignInBtn);

  //   // expect(signIn).toHaveBeenCalledTimes(1);
  // });
});
