import React, { useCallback, useEffect, useState } from "react";
import { If, Else, Then } from "react-if";
import {
	deleteCommentRequest,
	editCommentRequest,
} from "../../../apis/comment";
import { useUserState } from "../../../contexts/AuthContext";
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

interface ICommentProps {
	comment: CommentType;
}

const CommentItem: React.FunctionComponent<ICommentProps> = (props) => {
	const { comment } = props;
	const { myInfo, isLoggedIn } = useTypedSelector((state) => state.auth);
	const dispatch = useDispatch();

	const [isEditMode, , editOpen, editClose] = useToggle(false);
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [editText, onChangeEditText, setEditText] = useInput(
		comment.commentContent,
	);
	const [isEmptyContent, setIsEmptyContent] = useState(false);

	const isMyComment = myInfo && comment.user.id === myInfo.id ? true : false;

	const handleDelete = useCallback(async () => {
		if (confirm("정말로 삭제하시겠습니까? 삭제한 댓글은 복구할 수 없습니다.")) {
			await deleteCommentRequest(comment.id);

			dispatch({
				type: "DELETE_COMMENT",
				payload: comment.id,
			});
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
							<button onClick={openEditMode} className={styles.edit}>
								수정
							</button>
							<button onClick={handleDelete} className={styles.delete}>
								삭제
							</button>
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
				<footer className={styles.emotion}>
					<Like comment={comment} />
				</footer>
			</div>
		</React.Fragment>
	);
};

export default CommentItem;
