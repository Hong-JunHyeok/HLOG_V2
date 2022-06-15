import { useMutation, useQueryClient } from 'react-query';
import customAxios from '@/utils/customAxios';
import { POST_QUERY_KEY } from '@/constants/queries';

const usePostUnlike = (postId: number) => {
  const queryClient = useQueryClient();
  const unlikeRequest = () => customAxios.post(`/post/unlike/${postId}`);

  const { mutateAsync } = useMutation(unlikeRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries([POST_QUERY_KEY, postId]);
    },
  });

  return mutateAsync;
};

export default usePostUnlike;
