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
          <Route path="" element={<Pages.PopularPage />} />
          <Route path="recent" element={<Pages.RecentPage />} />
          <Route path="post">
            <Route path=":postId" element={<Pages.PostView />} />
          </Route>
          <Route path="write" element={<Pages.WritePostPage />} />
          <Route path="login" element={<Pages.LoginPage />} />
          <Route path="join" element={<Pages.JoinPage />} />
          <Route path="*"  />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default RouteContainer;
