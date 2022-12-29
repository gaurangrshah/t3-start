import {
  QueryObserverLoadingResult,
  QueryObserverSuccessResult,
} from '@tanstack/react-query';

import { renderHook, waitFor, wrapper } from '@/utils/test';
import { trpc } from '@/utils/trpc';

export const getReactQuerySuccessMockAnswer = <Data>(
  data: Data
): QueryObserverSuccessResult => {
  return {
    data: data,
    isLoading: false,
    error: null,
    isError: false,
    // isIdle: false,
    isLoadingError: false,
    isRefetchError: false,
    isSuccess: true,
    status: 'success',
    dataUpdatedAt: 0,
    errorUpdatedAt: 0,
    failureCount: 0,
    errorUpdateCount: 0,
    isFetched: true,
    isFetchedAfterMount: false,
    isFetching: false,
    isPlaceholderData: false,
    isPreviousData: false,
    isRefetching: false,
    isStale: false,
    refetch: jest.fn(),
    remove: jest.fn(),
    failureReason: '',
    isInitialLoading: false,
    isPaused: false,
    fetchStatus: 'idle',
  };
};

export const getReactQueryIsLoading = <
  TData,
  TError
>(): QueryObserverLoadingResult<TData, TError> => {
  return {
    data: undefined,
    error: null,
    isError: false as false,
    isLoading: true as true,
    isLoadingError: false as false,
    isRefetchError: false as false,
    isSuccess: false as false,
    status: 'loading',
    dataUpdatedAt: 0,
    errorUpdatedAt: 0,
    failureCount: 0,
    errorUpdateCount: 0,
    isFetched: true,
    isFetchedAfterMount: false,
    isFetching: false,
    isPlaceholderData: false,
    isPreviousData: false,
    isRefetching: false,
    isStale: false,
    refetch: jest.fn(),
    remove: jest.fn(),
    failureReason: '' as TError,
    isInitialLoading: false,
    isPaused: false,
    fetchStatus: 'idle',
  };
};

describe('example router suite', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
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
