import useLocalStorage from '@/utils/useLocalStorage';
import useInterceptedAxios from './useInterceptedAxios';
import useAuth from './useAuth';

const useLogout = () => {
  const {
    remove: removeToken,
  } = useLocalStorage('hlog_access_token', '');
  const { logoutDispatch } = useAuth();
  const customAxios = useInterceptedAxios();

  const logout = async () => {
    await customAxios.post('/auth/logout');
    logoutDispatch();
    removeToken();
  };

  return logout;
};

export default useLogout;
