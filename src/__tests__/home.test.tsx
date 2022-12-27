import Home, { SignInButton } from '@/pages/index';
import { render, screen, userEvent, waitFor } from '@/tests/utils';

describe('homepage', () => {
  test('it renders', async () => {
    render(<Home />);
    const main = screen.getByRole('main');
    expect(main).toMatchInlineSnapshot(`
      <main
        class="css-46i48"
      >
        <div
          class="css-xi606m"
        >
          <h1
            class="css-1xubpei"
          >
            Create 
            <span
              class="css-1bss3a8"
            >
              T3
            </span>
             App
          </h1>
          <div
            class="css-1kwov8l"
          >
            <p
              class="css-1u93a"
            >
              Loading tRPC query...
            </p>
            <div
              class="css-1nce4c7"
            >
              <p
                class="css-1u93a"
              />
              <button
                class="chakra-button css-21pmjv"
                type="button"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </main>
    `);
  });

  test('SignInButton (label="sign out") when (session=null)', async () => {
    const user = userEvent.setup();

    render(<SignInButton hasSession={true} />);

    const btn = await screen.getByRole('button', { name: /sign out/i });
    expect(btn).toBeInTheDocument();
    user.click(btn);
  });

  test('SignInButton (label="sign in") when (session=Session)', async () => {
    const user = userEvent.setup();

    render(<SignInButton hasSession={false} />);

    const btn = await screen.getByRole('button', { name: /sign in/i });
    expect(btn).toBeInTheDocument();
    user.click(btn);
  });
});
