import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import customAxios from '@/utils/customAxios';

type PayloadType = {
  postId: number;
  postTitle: string;
  postContent: string;
};

const useEditPost = () => {
  const navigate = useNavigate();
  const updateEditPost = (payload: PayloadType) => customAxios.patch(`/post/${payload.postId}`, payload);

  const { mutate } = useMutation(updateEditPost, {
    onSuccess: (response) => {
      const replaceURL = response.data.payload.location;
      navigate(replaceURL, {
        replace: true,
      });
    },
  });

  return mutate;
};

export default useEditPost;
