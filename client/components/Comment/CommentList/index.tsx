import React from "react";
import { Else, If, Then } from "react-if";
import CommentItem from "../CommentItem";
import styles from "./commentList.module.scss";
import { useTypedSelector } from "../../../utils/useTypedSelector";
import { CommentType } from "../../../types/Comment";
import CommentInput from "../CommentInput";

interface CommentListProps {
	comments: CommentType[];
	mode?: "COMMENT" | "REPLY";
	commentId?: number;
}

const CommentList: React.FunctionComponent<CommentListProps> = ({
	comments,
	mode = "COMMENT",
	commentId,
}) => {
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
					{mode === "COMMENT" ? (
						<div className={styles.noData}>
							<p>이 게시글에 댓글이 없습니다.</p>
						</div>
					) : (
						<div className={styles.recomment}>
							<CommentInput mode="REPLY" commentId={commentId} />
						</div>
					)}
				</Else>
			</If>
		</React.Fragment>
	);
};

export default CommentList;
