import type { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';

import RegisterPage from '@/pages/auth/register';
import {
  act,
  cleanEvents,
  mockCsrf,
  render,
  screen,
  userEvent,
} from '@/utils/test';

const originalLocation = window.location;
const registerRouter = {
  route: '/auth/register',
  pathname: '/auth/register',
  asPath: '/auth/register',
};

let user: UserEvent;
beforeAll(() => {
  user = userEvent.setup();
});

afterAll(() => {
  Object.defineProperty(window, 'location', originalLocation);
});

describe('pages/auth/signin | test suite', () => {
  beforeEach(() => {
    global.window = Object.create(window);
    Object.defineProperty(window, 'location', {
      value: {
        pathname: registerRouter.pathname,
      },
      writable: true,
    });
    cleanEvents();
  });

  test('should render signin page with no errors', () => {
    expect(async () => {
      await render(<RegisterPage csrf={mockCsrf} />, {
        session: null,
        router: registerRouter,
      });
    }).not.toThrowError();
  });

  test('should render auth signin header', () => {
    render(<RegisterPage csrf={mockCsrf} />, {
      session: null,
      router: registerRouter,
    });

    expect(window.location.pathname).toBe('/auth/register');
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /register a new account/i,
      })
    ).toBeInTheDocument();

    expect(screen.getByText(/already have an account?/i)).toBeInTheDocument();

    const registerLink = screen.getByRole('link', { name: /sign in/i });
    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute('href', '/auth/signin');
  });

  test('should be able to complete signin form', () => {
    act(() => {
      render(<RegisterPage csrf={mockCsrf} />, {
        session: null,
        router: registerRouter,
      });
    });

    const nameInput = screen.getByLabelText(/name/i);
    expect(nameInput).toBeInTheDocument();
    user.clear(nameInput);
    user.type(nameInput, 'e2e');

    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
    user.clear(emailInput);
    user.type(emailInput, String(process.env.TEST_USER));

    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(3);

    const passwordInput = screen.getAllByLabelText(/password/i)[0] as Element;
    expect(passwordInput).toBeInTheDocument();
    user.clear(passwordInput);
    user.type(passwordInput, String(process.env.TEST_PW));

    const submitBtn = screen.getByRole('button', { name: /sign up/i });
    expect(submitBtn).toBeInTheDocument();

    user.click(submitBtn);
  });
});
