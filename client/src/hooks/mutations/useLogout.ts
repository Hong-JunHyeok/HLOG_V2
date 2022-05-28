import { useMutation } from 'react-query';
import useLocalStorage from '@/utils/useLocalStorage';
import useAuth from '../useAuth';
import customAxios from '@/utils/customAxios';

const useLogout = () => {
  const { logoutDispatch } = useAuth();
  const { remove: removeToken } = useLocalStorage('hlog_access_token', '');

  const logout = () => customAxios.post('/auth/logout');

  const { mutate, reset } = useMutation(logout, {
    onSuccess: () => {
      removeToken();
      logoutDispatch();
      reset();
    },
  });

  return mutate;
};

export default useLogout;
