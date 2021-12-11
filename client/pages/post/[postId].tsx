import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { If, Then, Else } from "react-if";
import PostView from "../../components/Post/PostView";
import React from "react";
import Header from "../../components/Common/Header";
import Footer from "../../components/Common/Footer";
import Head from "next/head";
import { wrapper } from "../../store";
import cookieSetter from "../../utils/initializer/cookieSetter";
import { authActions } from "../../store/reducers/Auth";
import { postActions } from "../../store/reducers/Post";
import { getCommentsRequest } from "../../apis/comment";
import { getPostRequest, getIsLikedPostRequest } from "../../apis/post";
import { getMyInfoRequest } from "../../apis/user";

interface IPostViewProps {
	error: Error;
}

const PostViewPage = (
	props: IPostViewProps,
): InferGetServerSidePropsType<typeof getServerSideProps> => {
	// const { postTitle } = useTypedSelector((state) => state.post.post);

	return (
		<React.Fragment>
			<Head>
				<title>HLOG - 게시글</title>
			</Head>
			<Header />
			<If condition={!!props.error}>
				<Then>
					<h1>오류가 발생했습니다.</h1>
				</Then>
				<Else>
					<PostView />
				</Else>
			</If>
			<Footer />
		</React.Fragment>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async (context: GetServerSidePropsContext) => {
		try {
			const postId = context.query.postId;
			const hasToken = cookieSetter(context);

			const postResponse = await getPostRequest(Number(postId));
			const commentResponse = await getCommentsRequest(Number(postId));
			store.dispatch({
				type: postActions.GET_POST_SUCCESS,
				payload: {
					...postResponse.payload,
				},
			});
			store.dispatch({
				type: postActions.GET_COMMENTS_SUCCESS,
				payload: commentResponse.payload,
			});
			if (hasToken) {
				const myInfoResponse = await getMyInfoRequest();
				store.dispatch({
					type: authActions.GET_MY_INFO_SUCCESS,
					payload: myInfoResponse.payload,
				});
				const isPostLikedResponse = await getIsLikedPostRequest(Number(postId));
				store.dispatch({
					type: postActions.GET_POST_SUCCESS,
					payload: {
						...postResponse.payload,
						isLiked: isPostLikedResponse.payload,
					},
				});
			}
			return {
				props: {},
			};
		} catch (error) {
			console.error(error);

			return {
				props: error,
			};
		}
	},
);

export default PostViewPage;
