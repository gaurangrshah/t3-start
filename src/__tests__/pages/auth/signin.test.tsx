import SigninPage from '@/pages/auth/signin';
import { mockCsrf, mockProviders, render } from '@/utils/test';

describe('pages/auth/signin | test suite', () => {
  test('should render signin page with no errors', () => {
    expect(async () => {
      await render(<SigninPage csrf={mockCsrf} providers={mockProviders} />);
    }).not.toThrowError();
  });
});
