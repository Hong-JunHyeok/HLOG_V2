import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { Suspense } from 'react';
import Pages from '@/pages';

function RouteContainer() {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route path="" element={<Pages.PopularPage />} />
          <Route path="recent" element={<Pages.RecentPage />} />
          <Route path="post">
            <Route path=":postId" element={<Pages.PostView />} />
          </Route>
          <Route path="user">
            <Route path=":userId" element={<Pages.ProfilePage />} />
          </Route>
          <Route path="setting" element={<Pages.SettingPage />} />
          <Route path="write" element={<Pages.WritePostPage />} />
          <Route path="login" element={<Pages.LoginPage />} />
          <Route path="join" element={<Pages.JoinPage />} />
          <Route
            path="*"
            element={<>Not Found</>}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default RouteContainer;
