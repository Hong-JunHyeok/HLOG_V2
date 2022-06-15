import { useMutation, useQueryClient } from 'react-query';
import customAxios from '@/utils/customAxios';
import { COMMENT_QUERY_KEY } from '@/constants/queries';

const useDeleteComment = (commentId: number) => {
  const queryClient = useQueryClient();
  const deleteComment = () => customAxios.delete(`/comment/${commentId}`);

  const { mutateAsync } = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries([COMMENT_QUERY_KEY, commentId]);
    },
  });

  return mutateAsync;
};

export default useDeleteComment;
