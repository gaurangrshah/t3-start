import SignupPage from '@/pages/auth/register';
import { mockCsrf, render } from '@/utils/test';

describe('pages/auth/signin | test suite', () => {
  test('should render signin page with no errors', () => {
    expect(async () => {
      await render(<SignupPage csrf={mockCsrf} />);
    }).not.toThrowError();
  });
});
