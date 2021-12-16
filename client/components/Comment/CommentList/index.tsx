import React from "react";
import { Else, If, Then } from "react-if";
import CommentItem from "../CommentItem";
import styles from "./commentList.module.scss";
import { CommentType } from "../../../types/Comment";
import CommentInput from "../CommentInput";
import { ReplyType } from "../../../types/Reply";

interface CommentListProps {
	comments: CommentType[] | ReplyType[];
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
			<div className={styles.container}>
				<If condition={comments.length > 0}>
					<Then>
						{mode === "COMMENT" ? (
							comments.map((comment: CommentType, _: number) => (
								<CommentItem
									comment={comment}
									key={comment.id}
									mode="COMMENT"
								/>
							))
						) : (
							<div className={styles.recomment}>
								{comments.map((comment: CommentType, _: number) => (
									<CommentItem
										comment={comment}
										key={comment.id}
										mode="REPLY"
									/>
								))}
								<CommentInput mode="REPLY" commentId={commentId} />
							</div>
						)}
					</Then>
					<Else>
						{mode === "COMMENT" ? (
							<div className={styles.noData}>
								<p>이 게시글에 댓글이 없습니다.</p>
							</div>
						) : (
							<div className={styles.recomment}>
								{comments.map((comment: CommentType, _: number) => (
									<CommentItem
										comment={comment}
										key={comment.id}
										mode="REPLY"
									/>
								))}
								<CommentInput mode="REPLY" commentId={commentId} />
							</div>
						)}
					</Else>
				</If>
			</div>
		</React.Fragment>
	);
};

export default CommentList;
