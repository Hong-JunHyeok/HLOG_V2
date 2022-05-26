import React, { Suspense, StrictMode } from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import { HelmetProvider } from 'react-helmet-async';

import ResetStyle from './styles/ResetStyle';
import RouteContainer from '@/Routes';
import ErrorBoundary from "@/components/Common/ErrorBoundary";
import { AuthProvider } from "./context/AuthContext";
import { AxiosResponse } from 'axios';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      select: (response: AxiosResponse) => response.data.payload
    }
  }
});

const App = () => {
  return (
    <React.Fragment>
      <StrictMode>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <ResetStyle />
            <ErrorBoundary fallback={<>Error</>}>
              <Suspense fallback={<>Loading</>}>
                <AuthProvider>
                  <RouteContainer />
                </AuthProvider>
              </Suspense>
            </ErrorBoundary>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </HelmetProvider>
      </StrictMode>
    </React.Fragment>
  );
}

export default App;
