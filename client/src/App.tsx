import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

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
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ResetStyle />
          <RouteContainer />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </Provider>
    </HelmetProvider>
  </StrictMode>
);

export default App;
