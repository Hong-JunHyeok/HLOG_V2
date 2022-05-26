import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { useTypedSelector } from '@/modules';
import { LOG_IN, LOG_OUT } from '@/modules/auth';

const useAuth = () => {
  const { isAuthenticated } = useTypedSelector((state) => state.auth);
  const dispatch = useDispatch();

  const loginDispatch = useCallback(() => {
    dispatch({
      type: LOG_IN,
    });
  }, [dispatch]);

  const logoutDispatch = useCallback(() => {
    dispatch({
      type: LOG_OUT,
    });
  }, [dispatch]);

  return {
    state: {
      isAuthenticated,
    },
    logoutDispatch,
    loginDispatch,
  };
};

export default useAuth;
