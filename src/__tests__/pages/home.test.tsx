import Home from '@/pages/index';
import { render, screen, userEvent, waitFor } from '@/utils/test';

describe('homepage', () => {
  test('renders with no errors', async () => {
    expect(async () => {
      await render(<Home />);
    }).not.toThrowError();
  });

  test('initial loading state', async () => {
    render(<Home />);

    const heading = await screen.getByRole('heading', {
      level: 1,
      name: /create t3 app/i,
    });
    expect(heading).toBeInTheDocument();

    const subtitle = await screen.queryByText(/loading trpc query.../i);
    expect(subtitle).toBeInTheDocument();

    await waitFor(async () =>
      expect(await screen.queryByText(/hello from trpc/i))
    );

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
});