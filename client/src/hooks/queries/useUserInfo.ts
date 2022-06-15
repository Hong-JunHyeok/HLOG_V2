import { useQuery, UseQueryResult } from 'react-query';
import { UserType } from '@/@types/user';
import customAxios from '@/utils/customAxios';
import { USER_INFO_QUERY_KEY } from '@/constants/queries';

interface QueryResult {
  user: UserType
}

export default function useUserInfo(userId: number): UseQueryResult<QueryResult> {
  const getUserInfo = (id: number) => customAxios.get(`/user/${id}`);
  return useQuery([USER_INFO_QUERY_KEY, userId], () => getUserInfo(userId));
}
