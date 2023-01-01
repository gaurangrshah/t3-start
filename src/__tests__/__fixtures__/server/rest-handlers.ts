/**
 * @ SEE: https://tinyurl.com/2j29z5mb
 */
import { rest } from 'msw';
import { mockSession } from '../../../utils/test/mocks/session';
export const MOCK_CACHE = 'mock cache';
export const MOCK_PAGE_ID = 'mock-page-id';

export const mockLogout = jest.fn();

afterEach(() => {
  mockLogout.mockReset();
});

export const restHandlers = [
  rest.get('*/api/trpc/example.hello', (req, res, ctx) => {
    return res(
      // ctx.delay(100),
      ctx.status(200),
      ctx.json({
        input: {},
        result: {
          data: {
            json: JSON.stringify({ greeting: 'Hello from tRPC' }),
          },
        },
      })
    );
  }),
  rest.get('*/api/auth/session', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: mockSession,
        status: 'authenticated',
      })
    );
  }),
  // rest.post('*/api/trpc/auth.register', (req, res, ctx) => {
  //   res(ctx.status(201));
  // }),
  // rest.put('*/api/trpc/auth.register', (req, res, ctx) => {
  //   res(ctx.status(201));
  // }),
  // rest.patch('*/api/trpc/auth.register', (req, res, ctx) => {
  //   res(ctx.status(201));
  // }),
];
