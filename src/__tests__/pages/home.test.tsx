import Home from '@/pages/index';
import {
  cleanEvents,
  mockSession,
  render,
  screen,
  userEvent,
  waitFor,
} from '@/utils/test';

const homeRouter = {
  route: '/',
  pathname: '/',
  asPath: '/',
};
const originalLocation = window.location;

afterAll(() => {
  Object.defineProperty(window, 'location', originalLocation);
});

describe('ensures tests are run against test env', () => {
  test('should run tests in the test environment', () => {
    render(<Home />, { router: homeRouter });
    expect(screen.getByText('TEST_ENV')).toBeInTheDocument();
  });
});

describe('homepage unauthenticated', () => {
  beforeEach(() => {
    // @NOTE: the below overwrites window pathname which fixes the following error:
    // Error: Not implemented: navigation (except hash changes)
    // @SEE: https://github.com/facebook/jest/issues/890#issuecomment-765809133
    global.window = Object.create(window);
    Object.defineProperty(window, 'location', {
      value: {
        pathname: homeRouter.pathname,
      },
      writable: true,
    });

    cleanEvents();
  });

  test('renders with no errors', async () => {
    expect(async () => {
      await render(<Home />, { session: null, router: homeRouter });
    }).not.toThrowError();
  });

  test('initial loading state', async () => {
    render(<Home />, { session: null, router: homeRouter });

    const heading = screen.getByRole('heading', {
      level: 1,
      name: /create t3 app/i,
    });
    expect(heading).toBeInTheDocument();

    const subtitle = screen.queryByText(/loading trpc query.../i);
    expect(subtitle).toBeInTheDocument();

    const btn = screen.getByRole('button', { name: /sign in/i });
    expect(btn).toBeInTheDocument();
    expect(window.location.pathname).toBe('/');
  });

  test('signin clicks', async () => {
    const user = userEvent.setup();
    render(<Home />, { session: null, router: homeRouter });

    const btn = screen.getByRole('button', { name: /sign in/i });
    expect(btn).toBeInTheDocument();
    user.click(btn);
    expect(window.location.pathname).toBe('/'); // @FIXME: this location should update after click
  });
});

describe('homepage authenticated', () => {
  beforeEach(() => {
    cleanEvents();
  });

  test('renders with no errors', async () => {
    expect(async () => {
      await render(<Home />, { router: homeRouter, session: mockSession });
    }).not.toThrowError();
  });

  test('initial loading state', async () => {
    await render(<Home />, { router: homeRouter, session: mockSession });

    const heading = screen.getByRole('heading', {
      level: 1,
      name: /create t3 app/i,
    });
    expect(heading).toBeInTheDocument();

    const subtitle = screen.queryByText(/loading trpc query.../i);
    expect(subtitle).toBeInTheDocument();

    expect(screen.queryByText(/hello from trpc/i));

    expect(screen.queryByText(/logged in as e2e/i));
    expect(screen.queryByText(/you can now see this secret message!/i));

    const btn = screen.getByRole('button', { name: /sign out/i });
    expect(btn).toBeInTheDocument();
  });

  test('signout it clicks', async () => {
    const user = userEvent.setup();
    render(<Home />, { router: homeRouter, session: mockSession });

    const btn = screen.getByRole('button', { name: /sign out/i });
    expect(btn).toBeInTheDocument();
    user.click(btn);
  });
});
