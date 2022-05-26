import { useQuery, UseQueryResult } from 'react-query';
import { PostType } from '@/@types/post';
import useInterceptedAxios from '../useInterceptedAxios';

interface QueryResult {
  posts: PostType[]
}

export default function useUserPosts(userId: number): UseQueryResult<QueryResult> {
  const customAxios = useInterceptedAxios();

  const getUserPosts = (id: number) => customAxios.get(`/post/user/${id}`);
  return useQuery('user_posts', () => getUserPosts(userId));
}
