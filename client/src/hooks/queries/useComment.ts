import { useQuery, UseQueryResult } from 'react-query';
import customAxios from '@/utils/customAxios';
import { CommentType } from '@/@types/comment';
import { COMMENT_QUERY_KEY } from '@/constants/queries';

const useComments = (postId: number): UseQueryResult<CommentType[]> => {
  const getComment = () => customAxios.get(`/comment/${postId}`);

  return useQuery([COMMENT_QUERY_KEY, postId], getComment);
};

export default useComments;
