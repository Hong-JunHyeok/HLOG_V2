import { convertToHTML } from 'draft-convert';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import customAxios from '@/utils/customAxios';
import { useTypedSelector } from '@/modules';
import useModal from '../useModal';

const usePublishPost = () => {
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const { postTitle, postContent } = useTypedSelector((state) => state.post);

  const contentToHtml = convertToHTML({
    blockToHTML: (block) => {
      if (block.type === 'blockquote') {
        return <blockquote className="hlog_blockquote" />;
      }
      return null;
    },
  })(postContent.getCurrentContent());

  const publishPost = () => customAxios.post('/post', {
    postTitle,
    postContent: contentToHtml,
  });

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
