import { InferGetServerSidePropsType } from "next";
import { If, Then, Else } from "react-if";
import PostView from "../../components/Post/PostView";
import React from "react";
import Header from "../../components/Common/Header";
import Footer from "../../components/Common/Footer";
import { CommentType } from "../../types/Comment";
import Head from "next/head";
import { wrapper } from "../../store";
import cookieSetter from "../../utils/initializer/cookieSetter";
import { authActions } from "../../store/reducers/Auth";
import { postActions } from "../../store/reducers/Post";

import { getCommentsRequest } from "../../apis/comment";
import { getPostResponse, getIsLikedPostRequest } from "../../apis/post";
import { getMyInfoRequest } from "../../apis/user";

interface IPostViewProps {
	postTitle: string;
	comments: CommentType[];
	error: Error;
}

const PostViewPage = (
	props: IPostViewProps,
): InferGetServerSidePropsType<typeof getServerSideProps> => {
	return (
		<React.Fragment>
			<Head>
				<title>HLOG - {props.postTitle}</title>
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
	(store) => async (context) => {
		const { id } = context.params;

		try {
			cookieSetter(context);

			const myInfoResponse = await getMyInfoRequest();
			const postResponse = await getPostResponse(parseInt(id as string, 10));
			const commentResponse = await getCommentsRequest(
				parseInt(id as string, 10),
			);
			const isPostLikedResponse = await getIsLikedPostRequest(
				parseInt(id as string, 10),
			);

			store.dispatch({
				type: postActions.GET_POST_SUCCESS,
				payload: {
					...postResponse.payload,
					isLiked: isPostLikedResponse.payload,
				},
			});

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
					postTitle: postResponse.payload.postTitle,
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
