import { useQuery, UseQueryResult } from 'react-query';
import { PostType } from '@/@types/post';
import useInterceptedAxios from '../useInterceptedAxios';
import { USER_POSTS_QUERY_KEY } from '@/constants/queries';

interface QueryResult {
  posts: PostType[]
}

export default function useUserPosts(userId: number): UseQueryResult<QueryResult> {
  const customAxios = useInterceptedAxios();

  const getUserPosts = (id: number) => customAxios.get(`/post/user/${id}`);
  return useQuery(USER_POSTS_QUERY_KEY, () => getUserPosts(userId));
}
