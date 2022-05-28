import { useQuery, UseQueryResult } from 'react-query';
import { PostType } from '@/@types/post';
import useInterceptedAxios from '../useInterceptedAxios';

interface QueryResult {
  post: PostType;
}

export default function usePost(postId: number): UseQueryResult<QueryResult> {
  const customAxios = useInterceptedAxios();
  const getPost = (id: number) => customAxios.get(`/post/${id}`);
  return useQuery(['post', postId], () => getPost(postId));
}
