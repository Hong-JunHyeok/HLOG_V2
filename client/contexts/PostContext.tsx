import React, { createContext, useContext, useReducer } from "react";
import { CommentType } from "../types/Comment";
import { PostType } from "../types/Post";

interface PostContextType {
  post: PostType | null;
  comments: CommentType[];
}

function postReducer(state: PostContextType, action: any): PostContextType {
  switch (action.type) {
    case "GET_POST_SUCCESS":
      return {
        ...state,
        post: action.payload,
      };
    case "GET_COMMENTS_SUCCESS":
      return {
        ...state,
        comments: action.payload,
      };
    case "CREATE_COMMENT_SUCCESS":
      return {
        ...state,
        comments: [action.payload as CommentType, ...state.comments],
      };
    default:
      return { ...state };
  }
}

const initialState: PostContextType = {
  post: null,
  comments: [],
};

export const PostStateContext = createContext(null);
export const PostDispatchContext = createContext(null);

const PostProvider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initialState);

  return (
    <PostStateContext.Provider value={state}>
      <PostDispatchContext.Provider value={dispatch}>
        {children}
      </PostDispatchContext.Provider>
    </PostStateContext.Provider>
  );
};

export default PostProvider;

export const usePostState = (): PostContextType => {
  return useContext(PostStateContext);
};

export const usePostDispatch = () => {
  return useContext(PostDispatchContext);
};
