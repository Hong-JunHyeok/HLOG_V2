import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Pages from '@/pages';
import ModalsProvider from './components/Modal/ModalsProvider';

function RouteContainer() {
  return (
    <BrowserRouter>
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
        <Route path="search" element={<Pages.SearchPage />} />
        <Route
          path="*"
          element={<>Not Found</>}
        />

      </Routes>
      <ModalsProvider />
    </BrowserRouter>
  );
}

export default RouteContainer;
