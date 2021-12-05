import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { Else, If, Then } from "react-if";
import { commentLikeRequest, commentUnlikeRequest } from "../../../apis/post";
import { useAuthState } from "../../../contexts/AuthContext";
import { usePostDispatch } from "../../../contexts/PostContext";
import { CommentType } from "../../../types/Comment";
import styles from "./like.module.scss";

interface ILikeProps {
	comment: CommentType;
}

const Like: React.FunctionComponent<ILikeProps> = ({ comment }) => {
	const postDispatch = usePostDispatch();

	const { myInfo, isLoggedIn } = useAuthState();

	const router = useRouter();

	const like = async () => {
		if (!isLoggedIn) {
			return router.push("/auth/login");
		}

		await commentLikeRequest(comment.id);

		postDispatch({
			type: "COMMENT_LIKE",
			payload: comment.id,
		});
	};

	const unlike = async () => {
		if (!isLoggedIn) {
			return router.push("/auth/login");
		}

		await commentUnlikeRequest(comment.id);

		postDispatch({
			type: "COMMENT_UNLIKE",
			payload: comment.id,
		});
	};

	useEffect(() => {
		postDispatch({
			type: "COMMENT_INIT_LIKE",
			payload: {
				id: comment.id,
				status: comment.like.some((like) => myInfo.id === like.userId),
				likeNumber: comment.like.length,
			},
		});
	}, []);

	return (
		<React.Fragment>
			<div className={styles.container}>
				{comment.isLiked ? (
					<>
						<FcLike onClick={unlike} />
						<span className={styles.ment}>
							<If condition={comment.likeNumber - 1 === 0}>
								<Then>이 댓글에 공감합니다.</Then>
								<Else>
									{myInfo.username}님 외, {comment.likeNumber - 1}명이 이 댓글에
									공감합니다.
								</Else>
							</If>
						</span>
					</>
				) : (
					<>
						<FcLikePlaceholder onClick={like} />
						<span className={styles.ment}>
							{comment.likeNumber}명이 이 댓글에 공감합니다.
						</span>
					</>
				)}
			</div>
		</React.Fragment>
	);
};

export default Like;
