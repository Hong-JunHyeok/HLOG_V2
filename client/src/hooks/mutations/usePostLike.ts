import { useMutation, useQueryClient } from 'react-query';
import customAxios from '@/utils/customAxios';
import { POST_QUERY_KEY } from '@/constants/queries';

const usePostLike = (postId: number) => {
  const queryClient = useQueryClient();
  const likeRequest = () => customAxios.post(`/post/like/${postId}`);

  const { mutateAsync } = useMutation(likeRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries([POST_QUERY_KEY, postId]);
    },
  });

  return mutateAsync;
};

export default usePostLike;
