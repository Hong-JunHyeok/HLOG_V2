// import React, { useCallback } from "react";

// interface ICommentProps {
// 	mode?: "COMMENT" | "REPLY";
// 	commentId?: number;
// }

// const CommentInput: React.FunctionComponent<ICommentProps> = ({
// 	mode = "COMMENT",
// 	commentId,
// }) => {
// 	const authState = useTypedSelector((state) => state.auth);
// 	const dispatch = useDispatch();

// 	const [commentState, onChangeCommentState, setCommentState] = useInput("");
// 	const [replyState, onChangeReplyState, setReplyState] = useInput("");
// 	const router = useRouter();

// 	const handleReplySubmit = useCallback(
// 		async (e: React.SyntheticEvent) => {
// 			e.preventDefault();

// 			if (!authState.isLoggedIn) {
// 				return router.push("/auth/login");
// 			}

// 			try {
// 				if (!commentId) {
// 					throw new Error("Unhandled Comment Id");
// 				}
// 				dispatch({
// 					type: postActions.CREATE_REPLY,
// 					payload: {},
// 				});
// 				const response = await createReplyRequest(commentId, replyState);
// 				console.log(response);
// 				dispatch({
// 					type: postActions.CREATE_REPLY_SUCCESS,
// 				});
// 			} catch (error) {
// 				dispatch({
// 					type: postActions.CREATE_REPLY_ERROR,
// 					payload: error,
// 				});
// 				console.error(error);
// 			}
// 		},
// 		[replyState, dispatch],
// 	);

// 	const handleCommentSubmit = useCallback(
// 		async (event: React.SyntheticEvent) => {
// 			event.preventDefault();

// 			if (!authState.isLoggedIn) {
// 				return router.push("/auth/login");
// 			}

// 			const postId = Number(router.query.postId);

// 			try {
// 				const {
// 					payload: { id: comment_id },
// 				} = await createCommentRequest(postId, commentState);

// 				const now = new Date();
// 				dispatch({
// 					type: "CREATE_COMMENT_SUCCESS",
// 					payload: {
// 						id: comment_id,
// 						commentContent: commentState,
// 						createdAt: now,
// 						updatedAt: now,
// 						isLiked: false,
// 						likeNumber: 0,
// 						like: [],
// 						user: {
// 							id: authState.myInfo.id,
// 							profileUrl: authState.myInfo.profileUrl,
// 							username: authState.myInfo.username,
// 						},
// 					},
// 				});
// 				setCommentState("");
// 			} catch (error) {
// 				console.error(error);
// 			}
// 		},
// 		[commentState, dispatch],
// 	);

// 	return (
// 		<React.Fragment>
// 			{mode === "COMMENT" ? (
// 				<form onSubmit={handleCommentSubmit} className={styles.container}>
// 					<TextareaAutosize
// 						placeholder="유익한 게시글이였나요? 댓글을 남겨서 의견을 공유해주세요."
// 						className={styles.commentInput}
// 						value={commentState}
// 						onChange={onChangeCommentState}
// 					/>
// 					<button type="submit" className={styles.commentSubmit}>
// 						댓글 작성
// 					</button>
// 				</form>
// 			) : (
// 				<form onSubmit={handleReplySubmit} className={styles.container}>
// 					<TextareaAutosize
// 						placeholder="이 댓글에 답글을 남겨주세요."
// 						className={styles.commentInput}
// 						value={replyState}
// 						onChange={onChangeReplyState}
// 					/>
// 					<button type="submit" className={styles.commentSubmit}>
// 						답글 작성
// 					</button>
// 				</form>
// 			)}
// 		</React.Fragment>
// 	);
// };

// export default CommentInput;
