import { AuthGate } from '@/components';
import AdminPage from '@/pages/admin';
import {
  mockSession,
  render,
  screen,
  signIn,
  waitFor,
  waitForElementToBeRemoved,
} from '@/utils/test';

import * as nextAuth from 'next-auth/react';

describe('AdminPage', () => {
  test('should load with no errors', async () => {
    expect(async () => {
      await render(<AdminPage />, { session: mockSession, auth: true });
    }).not.toThrowError();
  });

  test('authenticated', async () => {
    render(<AdminPage />, { session: mockSession, auth: true });

    await waitFor(() => {
      expect(screen.getByText(/admin/i)).toBeInTheDocument();
    });
    // expect(useSessionSpy).toHaveBeenCalledTimes(1);

    // useSessionSpy.mockRestore();
  });
  test('unauthenticated', async () => {
    render(<AdminPage />, { auth: true });

    expect(screen.getByText('Admin')).toBeInTheDocument();
  });
});
