import { useState } from 'react';
import { 
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Pages from '@/pages'
import ErrorModal from './components/Modal/Error/ErrorModal';

const RouteContainer = () => {
  const [notFoundErrorModalOpened, setNotFoundErrorModalOpened] = useState(true);

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
          <Route path="write" element={<Pages.WritePostPage />} />
          <Route path="login" element={<Pages.LoginPage />} />
          <Route path="join" element={<Pages.JoinPage />} />
          <Route path="*" element={<>
          {notFoundErrorModalOpened && 
            <ErrorModal 
              errorTitle='404'
              errorMessage='존재하지 않는 주소입니다.'
              onClose={() => {
                setNotFoundErrorModalOpened(false)
              }}
            />
          }
          </>} />
        </Routes>
      </BrowserRouter>
    );
}

export default RouteContainer;
