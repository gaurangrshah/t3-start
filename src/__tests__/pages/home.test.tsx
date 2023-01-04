import Home from '@/pages/index';
import {
mockSession,
render,
screen,
userEvent,
waitFor,
waitForElementToBeRemoved
} from '@/utils/test';

const homeRouter = {
  route: '/',
  pathname: '/',
  query: { callbackUrl: 'http://localhost:3000/' },
  asPath: '/?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F',
};

describe('ensures tests are run against test env', () => {
  test('should run tests in the test environment', () => {
    render(<Home />, { router: homeRouter });
    expect(screen.queryByText('TEST_ENV')).toBeInTheDocument();
  });
});

describe('homepage unauthenticated', () => {
  test('renders with no errors', async () => {
    expect(async () => {
      await render(<Home />, { router: homeRouter });
    }).not.toThrowError();
  });

  test('initial loading state', async () => {
    render(<Home />, { router: homeRouter });

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
    render(<Home />, { router: homeRouter });

    const btn = await screen.getByRole('button', { name: /sign in/i });
    expect(btn).toBeInTheDocument();
    user.click(btn);
  });
});

describe('homepage authenticated', () => {
  test('renders with no errors', async () => {
    expect(async () => {
      await render(<Home />, { router: homeRouter, session: mockSession });
    }).not.toThrowError();
  });

  test('initial loading state', async () => {
    await render(<Home />, { router: homeRouter, session: mockSession });

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
    render(<Home />, { router:homeRouter, session: mockSession });

    const btn = await screen.getByRole('button', { name: /sign out/i });
    expect(btn).toBeInTheDocument();
    user.click(btn);
  });
});
