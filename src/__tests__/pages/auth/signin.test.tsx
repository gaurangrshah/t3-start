import type { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import type { NextRouter } from 'next/router';

import SigninPage from '@/pages/auth/signin';
import {
  cleanEvents,
  createMockRouter,
  mockCsrf,
  mockProviders,
  mockRouter,
  render,
  screen,
  userEvent,
} from '@/utils/test';

let user: UserEvent;
beforeAll(() => {
  user = userEvent.setup();
});

beforeEach(() => {
  cleanEvents();
});

describe('pages/auth/signin | test suite', () => {
  test('should render signin page with no errors', () => {
    expect(async () => {
      await render(<SigninPage csrf={mockCsrf} providers={mockProviders} />);
    }).not.toThrowError();
  });

  test('should render auth signin header', async () => {
    render(<SigninPage csrf={mockCsrf} providers={mockProviders} />);

    expect(
      screen.getByRole('heading', { level: 2, name: /log in to your account/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/don\'t have an account?/i)).toBeInTheDocument();

    const signupLink = screen.getByRole('link', { name: /sign up/i });
    expect(signupLink).toBeInTheDocument();
    expect(signupLink).toHaveAttribute('href', '/auth/register');
  });

  test('should be able to complete signin form', async () => {
    render(<SigninPage csrf={mockCsrf} providers={mockProviders} />);

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
