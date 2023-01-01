import { trpcRequest } from '@/utils/test';

describe('example router suite', () => {
  test('🟢', async () => {
    const response = await trpcRequest().example.hello({
      text: `from ${process.env.NEXT_PUBLIC_APP_ENV}`,
    });

    expect(response.greeting).toBe('Hello from test');
  });
});
