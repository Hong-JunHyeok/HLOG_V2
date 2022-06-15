import { useQuery, UseQueryResult } from 'react-query';
import { PostType } from '@/@types/post';
import customAxios from '@/utils/customAxios';
import { POST_QUERY_KEY } from '@/constants/queries';

interface QueryResult {
  post: PostType;
}

export default function usePost(postId: number, enabled = true): UseQueryResult<QueryResult> {
  const getPost = (id: number) => customAxios.get(`/post/${id}`);

  return useQuery([POST_QUERY_KEY, postId], () => getPost(postId), {
    enabled,
  });
}
