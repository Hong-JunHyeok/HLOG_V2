import React from 'react';
import { 
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Pages from '@/pages'

class RouteContainer extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pages.RecentPage />}></Route>
        </Routes>
      </BrowserRouter>
    )
  }
}

export default RouteContainer;
