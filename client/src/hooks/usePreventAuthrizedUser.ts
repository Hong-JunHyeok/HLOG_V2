import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useMyInfo from './queries/useMyInfo';
import useAuth from './useAuth';

const usePreventAuthrizedUser = (redirectLocation = '/') => {
  const navigate = useNavigate();
  const { data } = useMyInfo();
  const { state: { isAuthenticated } } = useAuth();

  useEffect(() => {
    if (isAuthenticated || data) {
      navigate(redirectLocation, {
        replace: true,
      });
    }
  }, [data, isAuthenticated, navigate, redirectLocation]);
};

export default usePreventAuthrizedUser;
