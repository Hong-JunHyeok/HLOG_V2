import React, { Suspense, StrictMode } from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { ReactQueryDevtools } from 'react-query/devtools'

import ResetStyle from './styles/ResetStyle';
import RouteContainer from '@/Routes';
import ErrorBoundary from "@/components/Common/ErrorBoundary";
import { store } from '@/modules';
import useLocalStorage from "@/utils/useLocalStorage";
import customAxios from "@/utils/customAxios";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true
    }
  }
});

const App = () => {
  const [token] = useLocalStorage('hlog_token', "");
  if(token) {
    customAxios.defaults.headers['authorization'] = token;
  }

  return (
    <React.Fragment>
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <ResetStyle />
            <ErrorBoundary fallback={<>Error</>}>
              <Suspense fallback={<>Loading</>}>
                <RouteContainer />
              </Suspense>
            </ErrorBoundary>
            <ReactQueryDevtools />
          </Provider>
        </QueryClientProvider>
      </StrictMode>
    </React.Fragment>
  );
}

export default App;
