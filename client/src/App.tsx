import React, { Suspense, StrictMode } from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'

import ResetStyle from './styles/ResetStyle';
import RouteContainer from '@/Routes';
import ErrorBoundary from "@/components/Common/ErrorBoundary";

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
            <ResetStyle />
            <ErrorBoundary fallback={<>Error</>}>
              <Suspense fallback={<>Loading</>}>
                <RouteContainer />
              </Suspense>
            </ErrorBoundary>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </StrictMode>
      </React.Fragment>
    );
  }
}

export default App;
