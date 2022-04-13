// import React from "react";
// import useSWR from "swr";
// import fetcher from 'utils/fetcher';
// import { PostType } from 'types/Post';
// import { Else, If, Then } from "react-if";
// import PostItem from "../PostItem";
// import styles from "./postList.module.scss";

// const PostList: React.FunctionComponent = () => {
// 	const { data : { posts } } = useSWR('/post/posts', fetcher, {
// 		suspense: true
// 	});

// 	const postsMap = posts.map((post: PostType) => <PostItem {...post} key={post.id} />);

// 	return (
// 		<React.Fragment>
// 			<div className={styles.postList}>{postsMap}</div>
// 		</React.Fragment>
// 	);
// };

// export default PostList;
