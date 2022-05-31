import { useQuery, UseQueryResult } from 'react-query';
import { PostType } from '@/@types/post';
import customAxios from '@/utils/customAxios';

interface QueryResult {
  post: PostType;
}

export default function usePost(postId: number, enabled = true): UseQueryResult<QueryResult> {
  const getPost = (id: number) => customAxios.get(`/post/${id}`);

  return useQuery(['post', postId], () => getPost(postId), {
    enabled,
  });
}
