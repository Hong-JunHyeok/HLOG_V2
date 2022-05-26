import { useQuery, UseQueryResult } from 'react-query';
import { UserType } from '@/@types/user';
import useInterceptedAxios from './useInterceptedAxios';
import useLocalStorage from '@/utils/useLocalStorage';
import useAuth from './useAuth';

interface QueryResult {
  user: UserType;
}

export default function useMyInfo(): UseQueryResult<QueryResult> {
  const customAxios = useInterceptedAxios();
  const {
    storedValue: hlogToken,
  } = useLocalStorage('hlog_access_token', '');
  const getMyInfo = () => customAxios.get('/user/me');
  const { loginDispatch } = useAuth();

  return useQuery(
    ['user_info'],
    () => getMyInfo(),
    {
      enabled: !!hlogToken,
      onSuccess: () => {
        console.log('Render');
        loginDispatch();
      },
    },
  );
}
