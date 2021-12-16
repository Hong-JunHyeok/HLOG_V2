import { postActions } from ".";
import { AnyActionType, CommentType } from "../../../types/Comment";
import { PostStateType } from "./types";

const postInitialState: PostStateType = {
	posts: [],
	post: null,

	postLoading: false,

	replies: [],
	replyLoading: false,

	comments: [],

	isEditMode: false,

	postTitleInput: "",
	postContentInput: "",
};

function postReducer(
	state: PostStateType = postInitialState,
	action: AnyActionType,
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
		case postActions.GET_POSTS_SUCCESS:
			return {
				...state,
				posts: action.payload,
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

		case postActions.GET_REPLY:
			return {
				...state,
				replyLoading: true,
			};
		case postActions.GET_REPLY_SUCCESS:
			console.log(action.payload.commentId, action.payload.replies);

			const newComments = state.comments.map((comment) => {
				if (comment.id === action.payload.commentId) {
					return {
						...comment,
						replies: action.payload.replies,
					};
				}
				return comment;
			});

			return {
				...state,
				comments: newComments,
			};
		case postActions.GET_REPLY_ERROR:
			return {
				...state,
			};

		case postActions.EDIT_POST:
			return {
				...state,
			};
		case postActions.EDIT_POST_SUCCESS:
			return {
				...state,
			};
		case postActions.EDIT_POST_ERROR:
			return {
				...state,
			};

		case postActions.TOGGLE_EDIT_POST:
			return {
				...state,
				isEditMode: true,

				postTitleInput: action.payload.title,
				postContentInput: action.payload.content,
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
				if (comment.id === action.payload.commentId) {
					return {
						...comment,
						isLiked: true,
						like: [
							{
								id: 1,
								userId: action.payload.userId,
							},
							...comment.like,
						],
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
						like: comment.like.splice(state.comments.indexOf(comment), 1),
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
				if (comment.id === action.payload) {
					return {
						...comment,
						isLiked: true,
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
