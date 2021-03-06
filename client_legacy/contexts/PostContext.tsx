import React, { createContext, useContext, useReducer } from "react";
import { CommentType } from "../types/Comment";
import { PostType } from "../types/Post";

export interface PostContextType {
	post: PostType | null;
	postLoading: boolean;

	comments: CommentType[];
}

function postReducer(state: PostContextType, action: any): PostContextType {
	switch (action.type) {
		case "GET_POST":
			return {
				...state,
				postLoading: true,
				post: null,
				comments: [],
			};
		case "GET_POST_SUCCESS":
			return {
				...state,
				postLoading: false,
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
		case "CREATE_POST_SUCCESS":
			return {
				...state,
			};
		case "DELETE_COMMENT":
			return {
				...state,
				comments: state.comments.filter(
					(comment) => comment.id !== action.payload,
				),
			};
		case "EDIT_COMMENT":
			return {
				...state,
				comments: state.comments.map((comment) => {
					if (comment.id === action.payload.id) {
						return {
							...comment,
							commentContent: action.payload.commentContent,
						};
					}
					return comment;
				}),
			};
		case "POST_LIKE":
			return {
				...state,
				post: {
					...state.post,
					isLiked: true,
					likeNumber: state.post.likeNumber + 1,
				},
			};
		case "POST_UNLIKE":
			return {
				...state,
				post: {
					...state.post,
					isLiked: false,
					likeNumber: state.post.likeNumber - 1,
				},
			};
		case "COMMENT_LIKE": {
			const newCommentList = state.comments.map((comment) => {
				if (comment.id === action.payload) {
					return {
						...comment,
						isLiked: true,
						likeNumber: comment.likeNumber + 1,
					};
				} else {
					return comment;
				}
			});
			return {
				...state,
				comments: newCommentList,
			};
		}

		case "COMMENT_UNLIKE": {
			const newCommentList = state.comments.map((comment) => {
				if (comment.id === action.payload) {
					return {
						...comment,
						isLiked: false,
						likeNumber: comment.likeNumber - 1,
					};
				} else {
					return comment;
				}
			});
			return {
				...state,
				comments: newCommentList,
			};
		}

		case "COMMENT_INIT_LIKE": {
			const newCommentList = state.comments.map((comment) => {
				if (comment.id === action.payload.id) {
					return {
						...comment,
						likeNumber: action.payload.likeNumber,
						isLiked: action.payload.status,
					};
				} else {
					return comment;
				}
			});

			return {
				...state,
				comments: newCommentList,
			};
		}

		default:
			throw new Error(`Unhandled Action ${action.type}`);
	}
}

const initialState: PostContextType = {
	post: null,

	postLoading: false,

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

export const usePostDispatch = (): React.Dispatch<any> => {
	return useContext(PostDispatchContext);
};
