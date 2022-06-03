import { useQuery, UseQueryResult } from 'react-query';
import { UserType } from '@/@types/user';
import customAxios from '@/utils/customAxios';

interface QueryResult {
  user: UserType
}

export default function useUserInfo(userId: number): UseQueryResult<QueryResult> {
  const getUserInfo = (id: number) => customAxios.get(`/user/${id}`);
  return useQuery(['user_info', userId], () => getUserInfo(userId));
}
