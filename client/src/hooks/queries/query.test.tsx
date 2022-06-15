import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { AxiosResponse } from 'axios';
import useMyInfo from './useMyInfo';

const createQueryWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
        select: (response: AxiosResponse) => response.data.payload,
      },
    },
  });

  const Wrapper = ({ children }: { children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  return Wrapper;
};

describe('query hook을 테스트합니다.', () => {
  // describe('useMyInfo Hook', () => {
  //   it('fetch user', async () => {
  //     const { result } = renderHook(() => useMyInfo(), {
  //       wrapper: createQueryWrapper(),
  //     });

  //     await waitFor(() => {

  //     });
  //   });
  // });
});
