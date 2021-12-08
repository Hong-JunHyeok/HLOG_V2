import { If, Else, Then } from "react-if";
import dateFormatter from "../../../utils/formatter/date-format";
import styles from "./postView.module.scss";
import DefaultProfile from "../../../assets/svg/default_profile.svg";
import CommentInput from "../../Comment/CommentInput";
import CommentList from "../../Comment/CommentList";
import React from "react";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import "github-markdown-css";
import imageFormat from "../../../utils/formatter/image-format";
import Like from "../Like";
import { useTypedSelector } from "../../../utils/useTypedSelector";
import Image from "next/image";

const PostView: React.FunctionComponent = () => {
	const markdownIt = new MarkdownIt({
		highlight: (str, lang) => {
			if (lang && hljs.getLanguage(lang)) {
				try {
					return hljs.highlight(str, { language: lang }).value;
				} catch (error) {
					console.error(error);
				}
			}

			return "";
		},
	});

	const { post } = useTypedSelector((state) => state.post);
	const { postTitle, createdAt, updatedAt } = post;

	return (
		<React.Fragment>
			<main className={styles.container}>
				<div className={styles.meta}>
					<h1 className={styles.title}>{postTitle}</h1>
					<div className={styles.info}>
						<div className={styles.flex}>
							<div className={styles.profile}>
								<Image
									src={
										post.user.profileUrl
											? imageFormat(post.user.profileUrl)
											: DefaultProfile
									}
									width={58}
									height={58}
									alt={post.user.username}
									className={styles.profileImage}
								/>
								<span className={styles.username}>{post.user.username}</span>
							</div>

							<Like />
						</div>
						<div className={`${styles.profileInfo}`}>
							<If condition={updatedAt !== createdAt}>
								<Then>
									<span className={styles.date}>
										최근 수정됨 : {dateFormatter(updatedAt)}
									</span>
								</Then>
								<Else>
									<span className={styles.date}>
										작성일 : {dateFormatter(createdAt)}
									</span>
								</Else>
							</If>
							<If condition={post.user.selfIntroduction}>
								<Then>
									<div className={`${styles.intro}`}>
										<p>{post.user.selfIntroduction}</p>
									</div>
								</Then>
							</If>
						</div>
					</div>
				</div>

				<section className={styles.content}>
					<If condition={post.postThumnail}>
						<Then>
							<img
								src={imageFormat(post.postThumnail)}
								className={styles.postThumnail}
								alt={post.postTitle}
							/>
						</Then>
					</If>

					<div
						className={`${styles.text}`}
						dangerouslySetInnerHTML={{
							__html: markdownIt.render(post.postContent),
						}}
					/>
				</section>
			</main>
			<CommentInput />
			<CommentList />
		</React.Fragment>
	);
};

export default PostView;
