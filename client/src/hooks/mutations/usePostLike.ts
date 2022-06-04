import { useMutation, useQueryClient } from 'react-query';
import customAxios from '@/utils/customAxios';

const usePostLike = (postId: number) => {
  const queryClient = useQueryClient();
  const likeRequest = () => customAxios.post(`/post/like/${postId}`);

  const { mutateAsync } = useMutation(likeRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries(['post', postId]);
    },
  });

  return mutateAsync;
};

export default usePostLike;
