import { useMutation, useQueryClient } from 'react-query';
import customAxios from '@/utils/customAxios';

const useEditComment = (commentId: number) => {
  const queryClient = useQueryClient();
  const editComment = (commentContent: string) => customAxios.patch(`/comment/${commentId}`, {
    commentContent,
  });

  const { mutateAsync } = useMutation(editComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comment', commentId]);
    },
  });

  return mutateAsync;
};

export default useEditComment;
