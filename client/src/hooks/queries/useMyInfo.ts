import { useQuery, UseQueryResult } from 'react-query';
import { UserType } from '@/@types/user';
import useLocalStorage from '@/hooks/useLocalStorage';
import useAuth from '../useAuth';
import customAxios from '@/utils/customAxios';
import { MY_INFO_QUERY_KEY } from '@/constants/queries';

interface QueryResult {
  user: UserType;
}

export default function useMyInfo(): UseQueryResult<QueryResult> {
  const {
    storedValue: hlogToken,
  } = useLocalStorage('hlog_access_token', '');
  const getMyInfo = () => customAxios.get('/user/me');
  const { loginDispatch, logoutDispatch } = useAuth();

  return useQuery(
    [MY_INFO_QUERY_KEY],
    getMyInfo,
    {
      enabled: !!hlogToken,
      onSuccess: () => {
        loginDispatch();
      },
      onError: () => {
        logoutDispatch();
      },
    },
  );
}
