import React from "react";
import styles from "./like.module.scss";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { postLikeRequest, postUnlikeRequest } from "../../../apis/post";
import { useTypedSelector } from "../../../utils/useTypedSelector";
import { useDispatch } from "react-redux";

const Like: React.FunctionComponent = () => {
	const { post } = useTypedSelector((state) => state.post);
	const { isLoggedIn } = useTypedSelector((state) => state.auth);
	const dispatch = useDispatch();

	const like = async () => {
		if (!isLoggedIn) {
			alert("로그인 해");
			return;
		}
		await postLikeRequest(post.id);

		dispatch({
			type: "POST_LIKE",
		});
	};

	const unlike = async () => {
		await postUnlikeRequest(post.id);

		dispatch({
			type: "POST_UNLIKE",
		});
	};

	console.log(post.isLiked);

	if (!post) {
		return null;
	}

	return (
		<React.Fragment>
			<div className={styles.container} onClick={post.isLiked ? unlike : like}>
				<div className={post.isLiked ? styles.unlikeBtn : styles.likeBtn}>
					{post.isLiked ? <FcLike /> : <FcLikePlaceholder />}
				</div>
			</div>
		</React.Fragment>
	);
};

export default Like;
