import React from "react";
import Header from "../components/Common/Header";
import { getPostsResponse } from "../apis/post";
import PostList from "../components/Post/PostList";
import Footer from "../components/Common/Footer";
import Head from "next/head";
import { wrapper } from "../store";
import cookieSetter from "../utils/initializer/cookieSetter";
import { getMyInfoRequest } from "../apis/user";
import { authActions } from "../store/reducers/Auth";
import { postActions } from "../store/reducers/Post";

export default function Index() {
	return (
		<React.Fragment>
			<Head>
				<title>HLOG - 개발을 공유하다.</title>
			</Head>
			<Header />
			<PostList />
			<Footer />
		</React.Fragment>
	);
}

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async (context) => {
		try {
			const hasToken = cookieSetter(context);

			const postsResponse = await getPostsResponse();
			store.dispatch({
				type: postActions.GET_POSTS_SUCCESS,
				payload: postsResponse.payload.posts,
			});

			if (!hasToken) {
				return;
			}

			const myInfoResponse = await getMyInfoRequest();
			store.dispatch({
				type: authActions.GET_MY_INFO_SUCCESS,
				payload: myInfoResponse.payload,
			});
		} catch (error) {
			store.dispatch({
				type: authActions.GET_MY_INFO_ERROR,
				payload: error,
			});

			return {
				props: error,
			};
		}
	},
);
