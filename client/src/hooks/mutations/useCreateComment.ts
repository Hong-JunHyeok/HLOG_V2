import { useMutation, useQueryClient } from 'react-query';
import customAxios from '@/utils/customAxios';
import { COMMENT_QUERY_KEY } from '@/constants/queries';

const useCreateComment = (postId: number) => {
  const queryClient = useQueryClient();
  const createComment = (comment: string) => customAxios.post(`/comment/${postId}`, { comment });

  const { mutateAsync } = useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries([COMMENT_QUERY_KEY, postId]);
    },
  });

  return mutateAsync;
};

export default useCreateComment;
