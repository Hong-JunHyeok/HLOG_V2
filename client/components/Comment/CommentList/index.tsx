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
			<If condition={comments.length > 0}>
				<Then>
					<div className={styles.container}>
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
								<CommentInput mode="REPLY" commentId={commentId} />
								{comments.map((comment: CommentType, _: number) => (
									<CommentItem
										comment={comment}
										key={comment.id}
										mode="REPLY"
									/>
								))}
							</div>
						)}
					</div>
				</Then>
				<Else>
					{mode === "COMMENT" ? (
						<div className={styles.noData}>
							<p>이 게시글에 댓글이 없습니다.</p>
						</div>
					) : (
						<div className={styles.noData}>
							<p>답글이 없습니다.</p>
						</div>
					)}
				</Else>
			</If>
		</React.Fragment>
	);
};

export default CommentList;
