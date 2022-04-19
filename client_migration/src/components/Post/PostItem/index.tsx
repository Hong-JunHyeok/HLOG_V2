import React from 'react';
import { PostType } from '@/types/Post'
import S from './StyledPostItem';

interface PropTypes {
  postData: PostType;
}

const PostItem: React.FunctionComponent<PropTypes> = ({ postData }) => {
  const { postThumnail, postTitle, postContent } = postData;

  return (
    <S.Container>
      <S.Thumbnail thumbnailUrl={postThumnail} />
      <S.Content>
        <h1>{postTitle}</h1>
        <p>{postContent}</p>
      </S.Content>
    </S.Container>
  )
}

export default PostItem;

// import React, { useCallback } from "react";
// import { If, Then, Else } from "react-if";
// import styles from "./postItem.module.scss";
// import { useRouter } from "next/router";
// import dateFormatter from "../../../utils/formatter/date-format";
// import imageFormat from "../../../utils/formatter/image-format";
// import { FcLike } from "react-icons/fc";

// type IPostType = {
// 	id: number;
// 	postTitle: string;
// 	createdAt: string;
// 	updatedAt: string;
// 	postThumnail: string | null;
// 	user: { username: string };
// 	overviewMode?: boolean;
// 	like: Array<{
// 		id: number;
// 		userId: number;
// 	}>;
// };

// const PostItem: React.FunctionComponent<IPostType> = ({
// 	id,
// 	postTitle,
// 	createdAt,
// 	updatedAt,
// 	postThumnail,
// 	user: { username },
// 	overviewMode = false,
// 	like,
// }) => {
// 	const router = useRouter();

// 	const handlePushViewPost = useCallback(() => {
// 		router.push(`/post/${id}`);
// 	}, []);

// 	return (
// 		<section
// 			className={styles.itemWrapper}
// 			onClick={overviewMode ? null : handlePushViewPost}
// 		>
// 			<If condition={postThumnail}>
// 				<Then>
// 					<img
// 						src={overviewMode ? postThumnail : imageFormat(postThumnail)}
// 						alt=""
// 						className={styles.thumnail}
// 					/>
// 				</Then>
// 			</If>

// 			<div className={styles.meta}>
// 				<h1 className={styles.postTitle}>{postTitle}</h1>

// 				<div className={styles.row}>
// 					<span className={styles.userName}>{username}</span>

// 					<If condition={updatedAt !== createdAt}>
// 						<Then>
// 							<span className={styles.date}>{dateFormatter(updatedAt)}</span>
// 						</Then>
// 						<Else>
// 							<span className={styles.date}>{dateFormatter(createdAt)}</span>
// 						</Else>
// 					</If>

// 					{!overviewMode && (
// 						<div className={styles.like}>
// 							<FcLike className={styles.likeIcon} />
// 							<span className={styles.likeText}>{like.length}</span>
// 						</div>
// 					)}
// 				</div>
// 			</div>
// 		</section>
// 	);
// };

// export default PostItem;
