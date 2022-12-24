import Home from '@/pages/index';
import { render, screen } from '@/tests/utils';

afterEach(() => {
  jest.clearAllMocks();
});

describe('Home', () => {
  it('renders a heading', async () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: /create t3 app/i,
    });

    expect(heading).toBeInTheDocument();
    expect(screen.getByText('Loading tRPC query...')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign in/i })
    ).toBeInTheDocument();
  });
});
