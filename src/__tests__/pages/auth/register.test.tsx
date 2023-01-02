import type { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';

import SignupPage from '@/pages/auth/register';
import { mockCsrf, render, screen, userEvent } from '@/utils/test';

let user: UserEvent;
beforeAll(() => {
  user = userEvent.setup();
});

describe('pages/auth/signin | test suite', () => {
  test('should render signin page with no errors', () => {
    expect(async () => {
      await render(<SignupPage csrf={mockCsrf} />);
    }).not.toThrowError();
  });

  test('should render auth signin header', async () => {
    render(<SignupPage csrf={mockCsrf} />);

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /register a new account/i,
      })
    ).toBeInTheDocument();

    expect(screen.getByText(/already have an account?/i)).toBeInTheDocument();

    const signupLink = screen.getByRole('link', { name: /sign in/i });
    expect(signupLink).toBeInTheDocument();
    expect(signupLink).toHaveAttribute('href', '/auth/signin');
  });

  test('should be able to complete signin form', async () => {
    await render(<SignupPage csrf={mockCsrf} />);

    // expect(screen.getByLabelText(/csrftoken/i)).not.toBeVisible();
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
    // const passwordInput = inputs[1] as Element;
    const passwordInput = screen.getAllByLabelText(/password/i)[0] as Element;
    expect(passwordInput).toBeInTheDocument();
    user.clear(passwordInput);
    user.type(passwordInput, String(process.env.TEST_PW));

    const submitBtn = screen.getByRole('button', { name: /sign up/i });
    expect(submitBtn).toBeInTheDocument();

    user.click(submitBtn);

    // await expect(signInMock).toHaveBeenCalledTimes(1);
    // signInMock.mockRestore();
  });
});
