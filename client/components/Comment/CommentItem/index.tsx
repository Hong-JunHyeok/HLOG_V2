import React, { useCallback, useEffect, useState } from "react";
import { If, Else, Then } from "react-if";
import {
	deleteCommentRequest,
	editCommentRequest,
} from "../../../apis/comment";
import useToggle from "../../../hooks/useToggle";
import { CommentType } from "../../../types/Comment";
import dateFormatter from "../../../utils/formatter/date-format";
import styles from "./commentItem.module.scss";
import DefaultProfile from "../../../assets/svg/default_profile.svg";
import useInput from "../../../hooks/useInput";
import imageFormat from "../../../utils/formatter/image-format";
import Like from "../Like";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../utils/useTypedSelector";
import Image from "next/image";
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from "react-icons/ai";
import { getReplyRequest } from "../../../apis/reply";
import { postActions } from "../../../store/reducers/Post";
import CommentList from "../CommentList";
import CommentInput from "../CommentInput";

interface ICommentProps {
	comment: CommentType;
	mode?: "COMMENT" | "REPLY";
}

const CommentItem: React.FunctionComponent<ICommentProps> = ({
	comment,
	mode = "COMMENT",
}) => {
	const { myInfo, isLoggedIn } = useTypedSelector((state) => state.auth);
	const dispatch = useDispatch();

	const [isEditMode, , editOpen, editClose] = useToggle(false);
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [editText, onChangeEditText, setEditText] = useInput(
		comment.commentContent,
	);
	const [isEmptyContent, setIsEmptyContent] = useState(false);
	const [replyOpen, setReplyOpen] = useState(false);

	const isMyComment = myInfo && comment.user.id === myInfo.id ? true : false;

	const handleDeleteComment = useCallback(async () => {
		if (confirm("정말로 삭제하시겠습니까? 삭제한 댓글은 복구할 수 없습니다.")) {
			await deleteCommentRequest(comment.id);

			dispatch({
				type: "DELETE_COMMENT",
				payload: comment.id,
			});
		}
	}, [dispatch]);

	const handleDeleteReply = useCallback(async () => {
		if (confirm("정말로 삭제하시겠습니까? 삭제한 답글은 복구할 수 없습니다.")) {
			//TODO: Delete Reply
		}
	}, []);

	const openEditMode = useCallback(async () => {
		setIsEdit(true);
	}, []);

	const closeEditMode = useCallback(async () => {
		setEditText(comment.commentContent);
		setIsEdit(false);
	}, []);

	const handleEditComment = useCallback(async () => {
		try {
			const response = await editCommentRequest(comment.id, editText);

			dispatch({
				type: "EDIT_COMMENT",
				payload: {
					id: comment.id,
					commentContent: response.payload.commentContent,
				},
			});

			closeEditMode();
		} catch (error) {
			console.error(error);
		}
	}, [editText, editCommentRequest, closeEditMode, comment]);

	const getReplies = useCallback(async () => {
		try {
			dispatch({
				type: postActions.GET_REPLY,
			});
			const repliesResponse = await getReplyRequest(comment.id);
			dispatch({
				type: postActions.GET_REPLY_SUCCESS,
				payload: { commentId: comment.id, replies: repliesResponse.payload },
			});
		} catch (error) {
			dispatch({
				type: postActions.GET_REPLY_ERROR,
				payload: error,
			});
			console.error(error);
		}
	}, [comment.id]);

	const handleClickMore = useCallback(async () => {
		await getReplies();
		setReplyOpen(true);
	}, [setReplyOpen]);

	useEffect(() => {
		if (editText.length === 0) setIsEmptyContent(true);
		else setIsEmptyContent(false);
	}, [editText, setIsEmptyContent]);

	useEffect(() => {
		setEditText(comment.commentContent);
	}, [comment.commentContent]);

	return (
		<React.Fragment>
			<div
				className={styles.container}
				onMouseEnter={editOpen}
				onMouseLeave={editClose}
			>
				<header className={styles.meta}>
					<Image
						src={
							comment.user.profileUrl
								? imageFormat(comment.user.profileUrl)
								: DefaultProfile
						}
						width={58}
						height={58}
						alt={comment.user.username}
						className={styles.profileImage}
					/>
					<h3 className={styles.username}>{comment.user.username}</h3>
					<If condition={comment.updatedAt !== comment.createdAt}>
						<Then>
							<span className={styles.date}>
								최근 수정됨 : {dateFormatter(comment.updatedAt)}
							</span>
						</Then>
						<Else>
							<span className={styles.date}>
								작성일 : {dateFormatter(comment.createdAt)}
							</span>
						</Else>
					</If>

					{isMyComment && isEditMode && isLoggedIn && !isEdit && (
						<div className={styles.editMode}>
							{mode === "COMMENT" ? (
								<>
									<button onClick={openEditMode} className={styles.edit}>
										수정
									</button>
									<button
										onClick={handleDeleteComment}
										className={styles.delete}
									>
										삭제
									</button>
								</>
							) : (
								<>
									<button onClick={openEditMode} className={styles.edit}>
										수정
									</button>
									<button onClick={handleDeleteReply} className={styles.delete}>
										삭제
									</button>
								</>
							)}
						</div>
					)}
				</header>

				<If condition={isEdit}>
					<Then>
						<div className={styles.editContainer}>
							<textarea
								className={styles.editInput}
								value={editText}
								onChange={onChangeEditText}
							/>

							<div className={styles.options}>
								<button
									className={isEmptyContent ? styles.notAllow : styles.submit}
									onClick={handleEditComment}
									disabled={isEmptyContent}
								>
									수정하기
								</button>
								<button className={styles.cancel} onClick={closeEditMode}>
									취소
								</button>
							</div>
						</div>
					</Then>
					<Else>
						<p className={styles.content}>{comment.commentContent}</p>
					</Else>
				</If>

				{mode === "COMMENT" && (
					<footer className={styles.emotion}>
						{replyOpen ? (
							<div className={styles.more} onClick={() => setReplyOpen(false)}>
								<AiOutlineMinusSquare />
								닫기
							</div>
						) : (
							<div className={styles.more} onClick={handleClickMore}>
								<AiOutlinePlusSquare />
								댓글 더보기
							</div>
						)}

						<Like comment={comment} />
					</footer>
				)}

				{replyOpen && (
					<>
						<CommentList
							comments={comment.replies}
							mode="REPLY"
							commentId={comment.id}
						/>
					</>
				)}
			</div>
		</React.Fragment>
	);
};

export default CommentItem;
