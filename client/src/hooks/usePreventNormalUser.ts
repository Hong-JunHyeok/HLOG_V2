import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const usePreventNormalUser = (redirectLocation = '/') => {
  const navigate = useNavigate();
  const { state: { isAuthenticated } } = useAuth();

  const redirector = () => {
    if (!isAuthenticated) {
      navigate(redirectLocation, {
        replace: true,
      });
    }
  };

  return redirector;
};

export default usePreventNormalUser;
