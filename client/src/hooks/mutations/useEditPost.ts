import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import customAxios from '@/utils/customAxios';
import useLocalStorage from '@/utils/useLocalStorage';
import useEditor from '../useEditor';

type PayloadType = {
  postId: number;
  postTitle: string;
  postContent: string;
};

const useEditPost = () => {
  const navigate = useNavigate();
  const { remove: clearSavedTitle } = useLocalStorage('hlog_editor_title');
  const { remove: clearSavedContent } = useLocalStorage('hlog_editor_content');
  const { clearContent } = useEditor();
  const updateEditPost = (payload: PayloadType) => customAxios.patch(`/post/${payload.postId}`, payload);

  const { mutateAsync } = useMutation(updateEditPost, {
    onSuccess: (response) => {
      const replaceURL = response.data.payload.location;
      clearSavedTitle();
      clearSavedContent();
      clearContent();
      navigate(replaceURL, {
        replace: true,
      });
    },
  });

  return mutateAsync;
};

export default useEditPost;
