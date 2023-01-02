import type { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';

import { AvatarMenu } from '@/components/avatar-menu';
import {
  mockSession,
  render,
  screen,
  userEvent,
  waitFor,
  within,
} from '@/utils/test';

describe('AvatarMenu test suite', () => {
  let user: UserEvent;
  beforeEach(() => {
    user = userEvent.setup();
  });
  test('unauthenticated', async () => {
    render(<AvatarMenu />);

    const avatar = screen.getByRole('img', { name: /avatar/i });
    expect(avatar).toBeInTheDocument();
    user.click(avatar);

    await waitFor(() => {
      const menu = screen.getByRole('menu');
      expect(menu).toBeInTheDocument();
      const menuitems = within(menu).getAllByRole('menuitem');
      expect(menuitems).toHaveLength(3);
      expect(
        within(menu).getByRole('menuitem', { name: /sign in/i })
      ).toBeInTheDocument();
      expect(
        within(menu).getByRole('menuitem', { name: /sign up/i })
      ).toBeInTheDocument();
      expect(
        within(menu).getByRole('menuitem', { name: /home/i })
      ).toBeInTheDocument();
    });
  });
  test('authenticated', async () => {
    render(<AvatarMenu />, { session: mockSession });

    const profileIcon = screen.getByRole('img', {
      name: process.env.TEST_USER,
    });
    expect(profileIcon).toBeInTheDocument();
    user.click(profileIcon);

    await waitFor(() => {
      const menu = screen.getByRole('menu');
      expect(menu).toBeInTheDocument();
      const menuitems = within(menu).getAllByRole('menuitem');
      expect(menuitems).toHaveLength(3);
      const signOutBtn = within(menu).getByRole('menuitem', {
        name: /sign out/i,
      });
      expect(signOutBtn).toBeInTheDocument();
      const adminBtn = within(menu).getByRole('menuitem', { name: /admin/i });
      expect(adminBtn).toBeInTheDocument();
      expect(within(adminBtn).getByRole('link', { name: /admin/i }));
      const homeBtn = within(menu).getByRole('menuitem', { name: /home/i });
      expect(homeBtn).toBeInTheDocument();
      expect(within(homeBtn).getByRole('link', { name: /home/i }));
    });
  });
});
