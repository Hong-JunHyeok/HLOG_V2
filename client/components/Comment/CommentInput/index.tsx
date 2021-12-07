import React, { useCallback } from "react";
import { useRouter } from "next/router";
import styles from "./commentInput.module.scss";
import TextareaAutosize from "react-textarea-autosize";
import useInput from "../../../hooks/useInput";
import { createCommentRequest } from "../../../apis/comment";
import { useAuthState } from "../../../contexts/AuthContext";
import { usePostDispatch } from "../../../contexts/PostContext";
import { useTypedSelector } from "../../../utils/useTypedSelector";
import { useDispatch } from "react-redux";

interface ICommentProps {}

const CommentInput: React.FunctionComponent<ICommentProps> = () => {
	const authState = useTypedSelector((state) => state.auth);
	const dispatch = useDispatch();

	const [commentState, onChangeCommentState, setCommentState] = useInput(
		"",
		true,
	);
	const router = useRouter();

	const getPostId = useCallback(() => {
		return router.query.id as string;
	}, []);

	const handleCommentSubmit = useCallback(
		async (event: React.SyntheticEvent) => {
			event.preventDefault();

			if (!authState.isLoggedIn) {
				return router.push("/auth/login");
			}

			const postId = Number(getPostId());

			try {
				const {
					payload: { id: comment_id },
				} = await createCommentRequest(postId, commentState);

				const now = new Date();
				dispatch({
					type: "CREATE_COMMENT_SUCCESS",
					payload: {
						id: comment_id,
						commentContent: commentState,
						createdAt: now,
						updatedAt: now,
						isLiked: false,
						likeNumber: 0,
						like: [],
						user: {
							id: authState.myInfo.id,
							profileUrl: authState.myInfo.profileUrl,
							username: authState.myInfo.username,
						},
					},
				});
				setCommentState("");
			} catch (error) {
				alert(error.response.message);
			}
		},
		[commentState, dispatch],
	);

	return (
		<React.Fragment>
			<form onSubmit={handleCommentSubmit} className={styles.container}>
				<TextareaAutosize
					placeholder="유익한 게시글이였나요? 댓글을 남겨서 의견을 공유해주세요."
					className={styles.commentInput}
					value={commentState}
					onChange={onChangeCommentState}
				/>
				<button type="submit" className={styles.commentSubmit}>
					댓글 작성
				</button>
			</form>
		</React.Fragment>
	);
};

export default CommentInput;
