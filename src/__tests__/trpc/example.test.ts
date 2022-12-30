import { renderHook, waitFor, wrapper } from '@/utils/test';
import { trpc } from '@/utils/trpc';

describe('example router suite', () => {
  test('should example.hello returns a greeting', async () => {
    const { result } = await renderHook(
      () => trpc.example.hello.useQuery({ text: 'from test' }),
      {
        wrapper: wrapper(),
      }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
      expect(result.current.data).toMatchObject({
        json: { greeting: 'Hello world' },
      });
    });
  });
});
