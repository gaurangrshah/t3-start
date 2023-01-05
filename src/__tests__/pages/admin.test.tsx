import AdminPage from '@/pages/admin';
import {
  cleanEvents,
  createMockRouter,
  render,
  renderWithAuthGate,
  screen,
  sessions,
} from '@/utils/test';

const adminRouter = createMockRouter({
  route: '/admin',
  pathname: '/admin',
  query: { callbackUrl: 'http://localhost:3000/' },
  asPath: '/admin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F',
});

describe('AdminPage authenticated', () => {
  beforeEach(() => {
    global.window = Object.create(window);
    Object.defineProperty(window, 'location', {
      value: {
        pathname: adminRouter.pathname,
      },
      writable: true,
    });

    cleanEvents();
  });
  test('should load with no errors', async () => {
    expect(async () => {
      render(<AdminPage />, {
        // router: adminRouter,
        session: sessions.testAuthed?.session?.data,
      });
    }).not.toThrowError();
  });

  test('authenticated', async () => {
    render(<AdminPage />, {
      router: adminRouter,
      session: sessions.testAuthed?.session?.data,
    });
    expect(window.location.pathname).toBe('/admin');
    expect(screen.queryByText(/admin/i)).toBeInTheDocument();
  });
});

describe('AdminPage unauthenticated', () => {
  beforeEach(() => {
    global.window = Object.create(window);
    Object.defineProperty(window, 'location', {
      value: {
        pathname: adminRouter.pathname,
      },
      writable: true,
    });

    cleanEvents();
  });
  test('unauthenticated should load with no errors', async () => {
    expect(async () => {
      renderWithAuthGate(<AdminPage />, { router: adminRouter, session: null });
    }).not.toThrowError();
  });

  test('unauthenticated', async () => {
    renderWithAuthGate(<AdminPage />, {
      router: adminRouter,
      session: null,
    });

    expect(screen.queryByText('Loading...')).toBeInTheDocument();

    const currentUrl =
      '/api/auth/signin?error=SessionRequired&callbackUrl=undefined';

    expect(window.location.href).toBe(currentUrl);
  });
});
