import type { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';

import SigninPage from '@/pages/auth/signin';
import {
  cleanEvents,
  mockCsrf,
  mockProviders,
  render,
  screen,
  userEvent,
} from '@/utils/test';

const originalLocation = window.location;
const signinRouter = {
  route: '/auth/signin',
  pathname: '/auth/signin',
  query: { callbackUrl: 'http://localhost:3000/' },
  asPath: '/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F',
};

let user: UserEvent;
beforeAll(() => {
  user = userEvent.setup();
});

afterAll(() => {
  Object.defineProperty(window, 'location', originalLocation);
});
describe('auth/signin | test suite', () => {
  beforeEach(() => {
    global.window = Object.create(window);
    Object.defineProperty(window, 'location', {
      value: {
        pathname: signinRouter.pathname,
      },
      writable: true,
    });
    cleanEvents();
  });

  test('should render signin page with no errors', () => {
    expect(async () => {
      await render(<SigninPage csrf={mockCsrf} providers={mockProviders} />, {
        session: null,
        router: signinRouter,
      });
    }).not.toThrowError();
  });

  test('should render auth signin header', async () => {
    render(<SigninPage csrf={mockCsrf} providers={mockProviders} />, {
      session: null,
      router: signinRouter,
    });

    expect(window.location.pathname).toBe('/auth/signin');
    expect(
      screen.getByRole('heading', { level: 2, name: /log in to your account/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/don\'t have an account?/i)).toBeInTheDocument();

    const signupLink = screen.getByRole('link', { name: /sign up/i });
    expect(signupLink).toBeInTheDocument();
    expect(signupLink).toHaveAttribute('href', '/auth/register');
  });

  test('should be able to complete signin form', async () => {
    render(<SigninPage csrf={mockCsrf} providers={mockProviders} />, {
      session: null,
      router: signinRouter,
    });

    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
    user.clear(emailInput);
    user.type(emailInput, String(process.env.TEST_USER));

    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(2);
    const passwordInput = screen.getAllByLabelText(/password/i)[0] as Element;
    expect(passwordInput).toBeInTheDocument();
    user.clear(passwordInput);
    user.type(passwordInput, String(process.env.TEST_PW));

    const submitBtn = screen.getByRole('button', { name: /sign in now/i });
    expect(submitBtn).toBeInTheDocument();

    user.click(submitBtn);
  });
});
