import { useMutation } from 'react-query';
import useLocalStorage from '@/hooks/useLocalStorage';
import useAuth from '../useAuth';
import customAxios from '@/utils/customAxios';

const useLogout = () => {
  const { remove: removeToken } = useLocalStorage('hlog_access_token');
  const { logoutDispatch } = useAuth();

  const logout = () => customAxios.post('/auth/logout');

  const { mutate } = useMutation(logout, {
    onSuccess: () => {
      logoutDispatch();
      removeToken();
    },
  });

  return mutate;
};

export default useLogout;
