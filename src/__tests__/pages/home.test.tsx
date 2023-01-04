import Home from '@/pages/index';
import {
  mockSession,
  render,
  screen,
  userEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@/utils/test';

describe('ensures tests are run against test env', () => {
  test('should run tests in the test environment', () => {
    render(<Home />);
    expect(screen.queryByText('TEST_ENV')).toBeInTheDocument();
  });
});

describe('homepage unauthenticated', () => {
  test('renders with no errors', async () => {
    expect(async () => {
      await render(<Home />);
    }).not.toThrowError();
  });

  test('initial loading state', async () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      level: 1,
      name: /create t3 app/i,
    });
    expect(heading).toBeInTheDocument();

    const subtitle = screen.queryByText(/loading trpc query.../i);
    expect(subtitle).toBeInTheDocument();

    const btn = screen.getByRole('button', { name: /sign in/i });
    expect(btn).toBeInTheDocument();
  });

  test('signin clicks', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const btn = await screen.getByRole('button', { name: /sign in/i });
    expect(btn).toBeInTheDocument();
    user.click(btn);
  });
});

describe('homepage authenticated', () => {
  test('renders with no errors', async () => {
    expect(async () => {
      await render(<Home />, { session: mockSession });
    }).not.toThrowError();
  });

  test('initial loading state', async () => {
    await render(<Home />, { session: mockSession });

    const heading = await screen.getByRole('heading', {
      level: 1,
      name: /create t3 app/i,
    });
    expect(heading).toBeInTheDocument();

    const subtitle = await screen.queryByText(/loading trpc query.../i);
    expect(subtitle).toBeInTheDocument();

    expect(screen.queryByText(/hello from trpc/i));

    expect(screen.queryByText(/logged in as e2e/i));
    expect(screen.queryByText(/you can now see this secret message!/i));

    const btn = await screen.getByRole('button', { name: /sign out/i });
    expect(btn).toBeInTheDocument();
  });

  test('signout it clicks', async () => {
    const user = userEvent.setup();
    render(<Home />, { session: mockSession });

    const btn = await screen.getByRole('button', { name: /sign out/i });
    expect(btn).toBeInTheDocument();
    user.click(btn);
  });
});
