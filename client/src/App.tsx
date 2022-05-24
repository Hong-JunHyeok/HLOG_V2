import React, { Suspense, StrictMode } from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { ReactQueryDevtools } from 'react-query/devtools'

import ResetStyle from './styles/ResetStyle';
import RouteContainer from '@/Routes';
import ErrorBoundary from "@/components/Common/ErrorBoundary";
import { store } from '@/modules';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true
    }
  }
});


class App extends React.Component {
  render() {
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
}

export default App;
