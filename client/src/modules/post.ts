import { EditorState } from 'draft-js';
import { AnyAction } from 'redux';

export const SET_POST_TITLE = 'SET_POST_TITLE' as const;
export const SET_POST_CONTENT = 'SET_POST_CONTENT' as const;

interface PostStateType {
  postTitle: string;
  postContent: EditorState;
}

const initialState: PostStateType = {
  postTitle: '',
  postContent: EditorState.createEmpty(),
};

function postReducer(state = initialState, action: AnyAction): PostStateType {
  switch (action.type) {
    case SET_POST_TITLE:
      return {
        ...state,
        postTitle: action.payload.postTitle,
      };
    case SET_POST_CONTENT:
      return {
        ...state,
        postContent: action.payload.postContent,
      };
    default:
      return { ...state };
  }
}

export default postReducer;
