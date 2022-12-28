import { Button } from '@chakra-ui/react';

import { signIn, signOut } from '@/lib/next-auth';
import Home, { SignInButton } from '@/pages/index';
import { render, screen, userEvent } from '@/tests/utils';
import { trpc } from '@/utils/trpc';

// jest.mock('next-auth/react', () => {
//   const originalModule = jest.requireActual('next-auth/react');
//   const mockSession = {
//     accessToken: 'lkasjdfalsdf',
//     expires: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
//     user: {
//       name: 'John Doe',
//       email: 'a@gmail.com',
//       image: 'a',
//     },
//   };

//   return {
//     __esModule: true,
//     ...originalModule,
//     useSession: jest.fn(() => {
//       return { data: mockSession, status: 'authenticated' };
//     }),
//     signIn: jest.fn(() => Promise.resolve(true)),
//   };
// });

// afterEach(() => {
//   jest.clearAllMocks();
// });

describe('homepage', () => {
  test('it renders', async () => {
    render(<Home />);

    const heading = await screen.getByRole('heading', {
      name: /create t3 app/i,
    });
    expect(heading).toBeInTheDocument();

    const subtitle = await screen.getByText(/loading trpc query.../i);
    expect(subtitle).toBeInTheDocument();

    const btn = await screen.getByRole('button', { name: /sign in/i });
    expect(btn).toBeInTheDocument();
  });

  test('it clicks', async () => {
    const user = userEvent.setup();
    render(<Home />);
    const btn = await screen.getByRole('button', { name: /sign in/i });
    expect(btn).toBeInTheDocument();
    user.click(btn);
  });

  test('SignInButton (label="sign out") when (session=null)', async () => {
    const user = userEvent.setup();

    render(<SignInButton hasSession={true} />);

    const btn = await screen.getByRole('button', { name: /sign out/i });
    expect(btn).toBeInTheDocument();
    user.click(btn);
  });

  test('SignInButton (label="sign in") when (session=Session)', async () => {
    const user = userEvent.setup();

    render(<SignInButton hasSession={false} />);

    const btn = await screen.getByRole('button', { name: /sign in/i });
    expect(btn).toBeInTheDocument();
    user.click(btn);
  });
  test('should click', async () => {
    const user = userEvent.setup();
    render(<Home />);
    const btn = await screen.getByRole('button', { name: /sign in/i });
    expect(btn).toBeInTheDocument();
    user.click(btn);

    // expect(signIn).toHaveBeenCalled()
  });
});
