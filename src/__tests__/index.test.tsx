import Home from '@/pages/index';
import { trpc } from '@/utils/trpc';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import type { Session } from 'next-auth';
import { SessionProvider, useSession } from 'next-auth/react';
// custom function to mock next-auth's session
// I call it in every test page that needs session
export const mockSession: Session = {
  expires: '1',
  user: { id: '1', email: 'a', name: 'Delta', image: 'c' },
};
export function withSession() {
  return (useSession as jest.Mock).mockReturnValueOnce([mockSession, false]);
}

describe('Home', () => {
  it('renders a heading', () => {
    // jest
    //   .spyOn(trpc.example.hello, 'useQuery')
    //   .mockResolvedValueOnce({ data: { greeting: 'This guy' } });

    render(<Home />, { wrapper: SessionProvider });

    const heading = screen.getByRole('heading', {
      name: /create t3 app/i,
    });

    expect(heading).toBeInTheDocument();
  });
});

jest.mock('next-auth/react', () => {
  return {
    useSession: () => [mockSession, false],
  };
});
