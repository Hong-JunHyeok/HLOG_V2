import { useQuery, UseQueryResult } from 'react-query';
import customAxios from '@/utils/customAxios';
import { CommentType } from '@/@types/comment';

const useComments = (postId: number): UseQueryResult<CommentType[]> => {
  const getComment = () => customAxios.get(`/comment/${postId}`);

  return useQuery(['comment', postId], getComment);
};

export default useComments;
