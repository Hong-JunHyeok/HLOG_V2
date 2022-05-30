import { useMutation, useQueryClient } from 'react-query';
import customAxios from '@/utils/customAxios';

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
      queryClient.invalidateQueries(['post', +postId]);
    },
  });

  return mutateAsync;
};

export default useEditThumbnail;
