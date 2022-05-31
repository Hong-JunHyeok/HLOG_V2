import { useMutation } from 'react-query';
import customAxios from '@/utils/customAxios';

const useDeleteComment = (commentId: number) => {
  const deleteComment = () => customAxios.delete(`/comment/${commentId}`);

  const { mutateAsync } = useMutation(deleteComment);

  return mutateAsync;
};

export default useDeleteComment;
