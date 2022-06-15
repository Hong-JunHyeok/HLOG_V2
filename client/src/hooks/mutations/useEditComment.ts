import { useMutation, useQueryClient } from 'react-query';
import customAxios from '@/utils/customAxios';
import { COMMENT_QUERY_KEY } from '@/constants/queries';

const useEditComment = (commentId: number) => {
  const queryClient = useQueryClient();
  const editComment = (commentContent: string) => customAxios.patch(`/comment/${commentId}`, {
    commentContent,
  });

  const { mutateAsync } = useMutation(editComment, {
    onSuccess: () => {
      queryClient.invalidateQueries([COMMENT_QUERY_KEY, commentId]);
    },
  });

  return mutateAsync;
};

export default useEditComment;
