import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { Else, If, Then } from "react-if";
import { useDispatch } from "react-redux";
import { commentLikeRequest, commentUnlikeRequest } from "../../../apis/post";
import { postActions } from "../../../store/reducers/Post";
import { CommentType } from "../../../types/Comment";
import { useTypedSelector } from "../../../utils/useTypedSelector";
import styles from "./like.module.scss";

interface ILikeProps {
	comment: CommentType;
}

const Like: React.FunctionComponent<ILikeProps> = ({ comment }) => {
	const dispatch = useDispatch();

	const { myInfo, isLoggedIn } = useTypedSelector((state) => state.auth);

	const router = useRouter();
	const like = async () => {
		if (!isLoggedIn) {
			if (confirm("로그인 필요한 서비스입니다. 로그인 하시겠습니까?")) {
				return router.push("/auth/login");
			}
			return;
		}

		await commentLikeRequest(comment.id);

		dispatch({
			type: "COMMENT_LIKE",
			payload: comment.id,
		});
	};

	const unlike = async () => {
		await commentUnlikeRequest(comment.id);

		dispatch({
			type: postActions.COMMENT_UNLIKE,
			payload: comment.id,
		});
	};

	return (
		<React.Fragment>
			<div className={styles.container}>
				{comment.isLiked ? (
					<>
						<FcLike onClick={unlike} />
						<span className={styles.ment}>
							<If condition={comment.like.length === 1}>
								<Then>이 댓글에 공감합니다.</Then>
								<Else>
									{myInfo.username}님 외, {comment.like.length - 1}명이 이
									댓글에 공감합니다.
								</Else>
							</If>
						</span>
					</>
				) : (
					<>
						<FcLikePlaceholder onClick={like} />
						<span className={styles.ment}>
							{comment.like.length}명이 이 댓글에 공감합니다.
						</span>
					</>
				)}
			</div>
		</React.Fragment>
	);
};

export default Like;
