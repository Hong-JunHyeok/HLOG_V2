import { useMutation, useQueryClient } from 'react-query';
import customAxios from '@/utils/customAxios';
import { POST_QUERY_KEY } from '@/constants/queries';

const useEditThumbnail = () => {
  const queryClient = useQueryClient();
  const uploadThumbnail = ({
    postId,
    thumbnail,
  }: {
    postId: number,
    thumbnail: FormData
  }) => customAxios.patch(
    `/post/thumbnail/${postId}`,
    thumbnail,
  );

  const { mutateAsync } = useMutation(uploadThumbnail, {
    onSuccess: (response) => {
      const { postId } = response.data.payload;
      queryClient.invalidateQueries([POST_QUERY_KEY, +postId]);
    },
  });

  return mutateAsync;
};

export default useEditThumbnail;
