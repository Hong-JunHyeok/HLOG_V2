import { convertToHTML } from 'draft-convert';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import customAxios from '@/utils/customAxios';
import useModal from '../useModal';

const usePublishPost = () => {
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const publishPost = (payload: {
    postTitle: string;
    postContent: string;
    postSummary: string;
  }) => customAxios.post('/post', payload);

  const { mutateAsync } = useMutation(publishPost, {
    onSuccess: (response) => {
      const { postId } = response.data.payload;
      closeModal();
      navigate(`/post/${postId}`);
    },
  });

  return mutateAsync;
};

export default usePublishPost;
