import { postActions } from ".";
import { CommentType } from "../../../types/Comment";
import { PostStateType } from "./types";

const postInitialState: PostStateType = {
	post: null,

	postLoading: false,

	comments: [],
};

function postReducer(
	state: PostStateType = postInitialState,
	action: any,
): PostStateType {
	switch (action.type) {
		case postActions.GET_POST:
			return {
				...state,
				postLoading: true,
				post: null,
				comments: [],
			};
		case postActions.GET_POST_SUCCESS:
			return {
				...state,
				postLoading: false,
				post: action.payload,
			};
		case postActions.GET_COMMENTS_SUCCESS:
			return {
				...state,
				comments: action.payload,
			};
		case postActions.CREATE_COMMENT_SUCCESS:
			return {
				...state,
				comments: [action.payload as CommentType, ...state.comments],
			};
		case postActions.CREATE_POST:
			return {
				...state,
			};
		case postActions.CREATE_POST_SUCCESS:
			return {
				...state,
			};
		case postActions.CREATE_POST_ERROR:
			return {
				...state,
			};
		case postActions.DELETE_COMMENT:
			return {
				...state,
				comments: state.comments.filter(
					(comment) => comment.id !== action.payload,
				),
			};
		case postActions.EDIT_COMMENT:
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
		case postActions.POST_LIKE:
			return {
				...state,
				post: {
					...state.post,
					isLiked: true,
					likeNumber: state.post.likeNumber + 1,
				},
			};
		case postActions.POST_UNLIKE:
			return {
				...state,
				post: {
					...state.post,
					isLiked: false,
					likeNumber: state.post.likeNumber - 1,
				},
			};
		case postActions.COMMENT_LIKE: {
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

		case postActions.COMMENT_UNLIKE: {
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

		case postActions.COMMENT_INIT_LIKE: {
			const newCommentList = state.comments.map((comment) => {
				if (comment.id === action.payload.id) {
					console.log("A");
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
			return state;
	}
}

export default postReducer;
