import Home from '@/pages/index';
// import { trpc } from '@/utils/trpc';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// import '@testing-library/jest-dom';
// import '@testing-library/jest-dom/extend-expect';

// import { render,screen } from '@testing-library/react';
import { render, screen } from '@/tests/utils';
import type { Session } from 'next-auth';
// import {useState} from "react";
// import { getBaseUrl } from '../utils/fns';

// export const TRPCWrapper = ({ children }: { children: React.ReactNode }) => {
//   const [queryClient] = useState(() => new QueryClient());
//   const [trpcClient] = useState(() =>
//     trpc.createClient({
//       links: [
//         httpBatchLink({
//           url: `${getBaseUrl()}/api/trpc`,
//           fetch: async (input:any, init?: Record<string, any>) => {
//             // const fetch = getFetch();
//             return fetch(input, {
//               ...init,
//               // credentials: "include",
//             });
//           },
//         }),
//       ],
//     })
//   );

//   return (
//     <trpc.Provider client={trpcClient} queryClient={queryClient}>
//       <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//     </trpc.Provider>
//   );
// };

// jest.mock('next-auth/react', () => {
//   return {
//     useSession: () => [mockSession, false],
//   };
// });

// jest.mock('@/utils/trpc', () => ({
//   example: {
//     hello: () => {
//       data: {
//         greeting: 'this guy';
//       }
//     },
//   },
// }));

// custom function to mock next-auth's session
// I call it in every test page that needs session
// export const mockSession: Session = {
//   expires: '1',
//   user: { id: '1', email: 'a', name: 'Delta', image: 'c' },
// };

afterEach(() => {
  jest.clearAllMocks();
});

describe('Home', () => {
  it('renders a heading', async () => {
    // jest
    //   .spyOn(trpc.example.hello, 'useQuery')
    //   .mockReturnValueOnce({ data: { greeting: 'This guy' } });

    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: /create t3 app/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
