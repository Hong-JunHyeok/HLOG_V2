import { useQuery, UseQueryResult } from 'react-query';
import { UserType } from '@/@types/user';
import useLocalStorage from '@/hooks/useLocalStorage';
import useAuth from '../useAuth';
import customAxios from '@/utils/customAxios';

interface QueryResult {
  user: UserType;
}

export default function useMyInfo(): UseQueryResult<QueryResult> {
  const {
    storedValue: hlogToken,
  } = useLocalStorage('hlog_access_token', '');
  const getMyInfo = () => customAxios.get('/user/me');
  const { state: { isAuthenticated }, loginDispatch } = useAuth();

  return useQuery(
    ['my_info'],
    getMyInfo,
    {
      enabled: !!hlogToken || isAuthenticated,
      onSuccess: () => {
        loginDispatch();
      },
    },
  );
}
