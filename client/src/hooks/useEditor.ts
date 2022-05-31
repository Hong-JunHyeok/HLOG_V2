import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { EditorState } from 'draft-js';
import { useTypedSelector } from '@/modules';
import { SET_POST_CONTENT, SET_POST_TITLE } from '@/modules/post';

const useEditor = () => {
  const { postTitle, postContent } = useTypedSelector((state) => state.post);
  const dispatch = useDispatch();

  const setPostTitle = useCallback((title: string) => {
    dispatch({
      type: SET_POST_TITLE,
      payload: {
        postTitle: title,
      },
    });
  }, [dispatch]);
  const setPostContent = useCallback((content: EditorState) => {
    dispatch({
      type: SET_POST_CONTENT,
      payload: {
        postContent: content,
      },
    });
  }, [dispatch]);

  const clearContent = useCallback(() => {
    setPostTitle('');
    setPostContent(EditorState.createEmpty());
  }, [setPostTitle, setPostContent]);

  return {
    postTitle,
    postContent,
    setPostTitle,
    setPostContent,
    clearContent,
  };
};

export default useEditor;
