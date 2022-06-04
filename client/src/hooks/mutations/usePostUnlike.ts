import { useMutation, useQueryClient } from 'react-query';
import customAxios from '@/utils/customAxios';

const usePostUnlike = (postId: number) => {
  const queryClient = useQueryClient();
  const unlikeRequest = () => customAxios.post(`/post/unlike/${postId}`);

  const { mutateAsync } = useMutation(unlikeRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries(['post', postId]);
    },
  });

  return mutateAsync;
};

export default usePostUnlike;
