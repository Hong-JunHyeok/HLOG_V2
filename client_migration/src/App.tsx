import React, { Suspense, StrictMode } from "react";

import ResetStyle from './styles/ResetStyle';
import RouteContainer from '@/Routes';
import ErrorBoundary from "@/components/Common/ErrorBoundary";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <StrictMode>
          <ResetStyle />
          <ErrorBoundary fallback={<>Error</>}>
            <Suspense fallback={<>Loading</>}>
              <RouteContainer />
            </Suspense>
          </ErrorBoundary>
        </StrictMode>
      </React.Fragment>
    );
  }
}

export default App;
