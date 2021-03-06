import React from "react";
import { Else, If, Then } from "react-if";
import PostItem from "../PostItem";
import styles from "./postList.module.scss";
import { useTypedSelector } from "../../../utils/useTypedSelector";

const PostList: React.FunctionComponent = () => {
	const { posts } = useTypedSelector((state) => state.post);

	const postsMap = posts.map((post) => <PostItem {...post} key={post.id} />);

	return (
		<React.Fragment>
			<If condition={postsMap.length === 0}>
				<Then>
					<div className={styles.noData}>
						<h1>데이터가 없습니다.</h1>
					</div>
				</Then>
				<Else>
					<div className={styles.postList}>{postsMap}</div>
				</Else>
			</If>
		</React.Fragment>
	);
};

export default PostList;
