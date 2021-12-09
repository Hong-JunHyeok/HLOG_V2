import React from "react";
import { Else, If, Then } from "react-if";
import CommentItem from "../CommentItem";
import styles from "./commentList.module.scss";
import { useTypedSelector } from "../../../utils/useTypedSelector";

const CommentList: React.FunctionComponent = () => {
	const comments = useTypedSelector((state) => state.post.comments);

	return (
		<React.Fragment>
			<If condition={comments.length > 0}>
				<Then>
					<div className={styles.container}>
						{comments.map((comment, index) => (
							<CommentItem comment={comment} key={comment.id} data-id={index} />
						))}
					</div>
				</Then>
				<Else>
					<div className={styles.noData}>
						<p>이 게시글에 댓글이 없습니다.</p>
					</div>
				</Else>
			</If>
		</React.Fragment>
	);
};

export default CommentList;
