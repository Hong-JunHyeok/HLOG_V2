import { useMutation, useQueryClient } from 'react-query';
import customAxios from '@/utils/customAxios';

const useCreateComment = (postId: number) => {
  const queryClient = useQueryClient();
  const createComment = (comment: string) => customAxios.post(`/comment/${postId}`, { comment });

  const { mutateAsync } = useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comment', postId]);
    },
  });

  return mutateAsync;
};

export default useCreateComment;
