import { Button } from '@chakra-ui/react';

import Home, { SignInButton } from '@/pages/index';
import {
  render,
  renderHook,
  screen,
  userEvent,
  waitFor,
  wrapper,
} from '@/utils/test';
import { trpc } from '@/utils/trpc';

describe('homepage', () => {
  test('🟢', async () => {
    await renderHook(() => trpc.example.hello.useQuery({ text: 'from TEST' }), {
      wrapper: wrapper(),
    });
  });
  test('it renders', async () => {
    render(<Home />);

    const heading = await screen.getByRole('heading', {
      level: 1,
      name: /create t3 app/i,
    });
    expect(heading).toBeInTheDocument();

    const subtitle = await screen.queryByText(/loading trpc query.../i);
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
  });
});
