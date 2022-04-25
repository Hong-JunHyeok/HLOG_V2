// import { If, Else, Then } from "react-if";
// import dateFormatter from "../../../utils/formatter/date-format";
// import styles from "./postView.module.scss";
// import DefaultProfile from "../../../assets/svg/default_profile.svg";
// import CommentInput from "../../Comment/CommentInput";
// import CommentList from "../../Comment/CommentList";
// import React, { useCallback } from "react";
// import imageFormat from "../../../utils/formatter/image-format";
// import Like from "../Like";
// import { useTypedSelector } from "../../../utils/useTypedSelector";
// import Image from "next/image";
// import markdownIt from "../../../utils/getMarkdownIt";
// import { useDispatch } from "react-redux";
// import { postActions } from "../../../store/reducers/Post";
// import { useRouter } from "next/router";
// import { deletePostRequest } from "../../../apis/post";

// const PostView: React.FunctionComponent = () => {
// 	const { myInfo } = useTypedSelector((state) => state.auth);
// 	const { post, comments } = useTypedSelector((state) => state.post);
// 	const {
// 		postTitle,
// 		postContent,
// 		createdAt,
// 		updatedAt,
// 		user: { id: postUserId },
// 	} = post;
// 	const dispatch = useDispatch();
// 	const router = useRouter();

// 	const handleDeletePost = useCallback(async () => {
// 		try {
// 			if (
// 				confirm(
// 					"정말로 게시글을 삭제하시겠습니까? 삭제한 게시글은 되돌릴 수 없습니다.",
// 				)
// 			) {
// 				await deletePostRequest(post.id);
// 				dispatch({
// 					type: postActions.DELETE_POST,
// 					payload: post.id,
// 				});

// 				router.replace("/");
// 			}
// 		} catch (error) {
// 			console.error(error);
// 			alert(error.response.message);
// 		}
// 	}, [dispatch]);

// 	const handleEditPost = useCallback(() => {
// 		dispatch({
// 			type: postActions.TOGGLE_EDIT_POST,
// 			payload: {
// 				title: postTitle,
// 				content: postContent,
// 			},
// 		});

// 		router.push("/post/create");
// 	}, [dispatch, router, postTitle, postContent]);

// 	const handlePushUserProfile = useCallback(async () => {
// 		router.push(`/profile/${postUserId}`);
// 	}, [router]);

// 	return (
// 		<React.Fragment>
// 			<main className={styles.container}>
// 				<div className={styles.meta}>
// 					<h1 className={styles.title}>{postTitle}</h1>
// 					<div className={styles.info}>
// 						<div className={styles.flex}>
// 							<div className={styles.profile}>
// 								<Image
// 									onClick={handlePushUserProfile}
// 									src={
// 										post.user.profileUrl
// 											? imageFormat(post.user.profileUrl)
// 											: DefaultProfile
// 									}
// 									width={58}
// 									height={58}
// 									alt={post.user.username}
// 									className={styles.profileImage}
// 								/>
// 								<span className={styles.username}>{post.user.username}</span>
// 								{myInfo?.id === postUserId && (
// 									<div className={styles.mode}>
// 										<button onClick={handleEditPost}>수정</button>
// 										<button onClick={handleDeletePost}>삭제</button>
// 									</div>
// 								)}
// 							</div>
// 							<Like />
// 						</div>
// 						<div className={`${styles.profileInfo}`}>
// 							<If condition={updatedAt !== createdAt}>
// 								<Then>
// 									<span className={styles.date}>
// 										최근 수정됨 : {dateFormatter(updatedAt)}
// 									</span>
// 								</Then>
// 								<Else>
// 									<span className={styles.date}>
// 										작성일 : {dateFormatter(createdAt)}
// 									</span>
// 								</Else>
// 							</If>
// 							<If condition={post.user.selfIntroduction}>
// 								<Then>
// 									<div className={`${styles.intro}`}>
// 										<p>{post.user.selfIntroduction}</p>
// 									</div>
// 								</Then>
// 							</If>
// 						</div>
// 					</div>
// 				</div>

// 				<section className={styles.content}>
// 					<If condition={post.postThumnail}>
// 						<Then>
// 							<Image
// 								src={imageFormat(post.postThumnail)}
// 								className={styles.postThumnail}
// 								alt={post.postTitle}
// 								width={1200}
// 								height={600}
// 							/>
// 						</Then>
// 					</If>

// 					<div
// 						className={styles.text}
// 						dangerouslySetInnerHTML={{
// 							__html: markdownIt.render(post.postContent),
// 						}}
// 					/>
// 				</section>
// 			</main>
// 			<CommentInput />
// 			<CommentList comments={comments} />
// 		</React.Fragment>
// 	);
// };

// export default PostView;
