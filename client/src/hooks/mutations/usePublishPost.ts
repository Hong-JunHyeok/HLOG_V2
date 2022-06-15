import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import customAxios from '@/utils/customAxios';
import useLocalStorage from '@/hooks/useLocalStorage';
import useEditor from '../useEditor';

const usePublishPost = () => {
  const { remove: clearSavedTitle } = useLocalStorage('hlog_editor_title');
  const { remove: clearSavedContent } = useLocalStorage('hlog_editor_content');
  const navigate = useNavigate();
  const { clearContent } = useEditor();

  const publishPost = (payload: {
    postTitle: string;
    postContent: string;
    postSummary: string;
  }) => customAxios.post('/post', payload);

  const { mutateAsync } = useMutation(publishPost, {
    onSuccess: (response) => {
      const { postId } = response.data.payload;
      clearSavedTitle();
      clearSavedContent();
      clearContent();
      navigate(`/post/${postId}`);
    },
  });

  return mutateAsync;
};

export default usePublishPost;
