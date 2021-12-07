import { InferGetServerSidePropsType } from "next";
import { If, Then, Else } from "react-if";
import PostView from "../../components/Post/PostView";
import React, { useEffect } from "react";
import { getIsLikedPostRequest, getPostResponse } from "../../apis/post";
import Header from "../../components/Common/Header";
import { PostType } from "../../types/Post";
import Footer from "../../components/Common/Footer";
import { useAuthDispatch } from "../../contexts/AuthContext";
import loginInitializer from "../../utils/initializer/loginInitializer";
import { getCommentsRequest } from "../../apis/comment";
import { CommentType } from "../../types/Comment";
import { usePostDispatch } from "../../contexts/PostContext";
import Head from "next/head";
import { wrapper } from "../../store";
import cookieSetter from "../../utils/initializer/cookieSetter";
import { getMyInfoRequest } from "../../apis/user";
import { authActions } from "../../store/reducers/Auth";
import { postActions } from "../../store/reducers/Post";

interface IPostViewProps {
	post: PostType;
	comments: CommentType[];
	error: Error;
}

const PostViewPage = (
	props: IPostViewProps,
): InferGetServerSidePropsType<typeof getServerSideProps> => {
	const { post, error } = props;

	return (
		<React.Fragment>
			<Head>
				<title>HLOG - {post.postTitle}</title>
			</Head>
			<Header />
			<If condition={!!error}>
				<Then>
					<h1>오류가 발생했습니다.</h1>
				</Then>
				<Else>
					<PostView post={post} />
				</Else>
			</If>
			<Footer />
		</React.Fragment>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async (context) => {
		const { id } = context.params;

		try {
			cookieSetter(context);

			const myInfoResponse = await getMyInfoRequest();
			const postResponse = await getPostResponse(parseInt(id as string, 10));
			const commentResponse = await getCommentsRequest(
				parseInt(id as string, 10),
			);

			store.dispatch({
				type: authActions.GET_MY_INFO_SUCCESS,
				payload: myInfoResponse.payload,
			});

			store.dispatch({
				type: postActions.GET_COMMENTS_SUCCESS,
				payload: commentResponse.payload,
			});

			return {
				props: {
					post: { ...postResponse.payload, isLiked: false, likeNumber: 0 },
					comments: commentResponse.payload,
				},
			};
		} catch (error) {
			return {
				props: error,
			};
		}
	},
);

export default PostViewPage;
