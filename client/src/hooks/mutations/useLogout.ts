import { useMutation } from 'react-query';
import useLocalStorage from '@/hooks/useLocalStorage';
import useAuth from '../useAuth';
import customAxios from '@/utils/customAxios';
import { HLOG_ACCESS_TOKEN_KEY } from '@/constants/storages';

const useLogout = () => {
  const { remove: removeToken } = useLocalStorage(HLOG_ACCESS_TOKEN_KEY);
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
