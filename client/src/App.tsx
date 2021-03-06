import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';

import { AxiosResponse } from 'axios';
import ResetStyle from './styles/ResetStyle';
import RouteContainer from '@/Routes';
import rootReducer from './modules';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      select: (response: AxiosResponse) => response.data.payload,
    },
  },
});

const store = createStore(rootReducer);
const App = () => (
  <StrictMode>
    <HelmetProvider>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <ResetStyle />
          <RouteContainer />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ReduxProvider>
    </HelmetProvider>
  </StrictMode>
);

export default App;
