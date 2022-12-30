import { renderHook, waitFor, wrapper } from '@/utils/test';
import { trpcRequest } from '@/utils/test/helpers';
import { trpc } from '@/utils/trpc';

describe('example router suite', () => {
  // test('should example.hello returns a greeting', async () => {
  //   const { result } = await renderHook(
  // @FIXME: input: text not getting applied
  //     () => trpc.example.hello.useQuery({ text: 'from test' }),
  //     {
  //       wrapper: wrapper(),
  //     }
  //   );

  //   await waitFor(() => {
  //     expect(result.current.isSuccess).toBeTruthy();
  //     expect(result.current.data).toMatchObject({
  //       json: { greeting: 'Hello world' },
  //     });
  //   });
  // });

  test('🟢', async () => {
    const response = await trpcRequest().example.hello({
      text: `from ${process.env.NEXT_PUBLIC_APP_ENV}`,
    });

    expect(response.greeting).toBe('Hello from test');
  });
});
