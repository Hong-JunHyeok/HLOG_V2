import React, { useEffect } from "react";
import Header from "../components/Common/Header";
import { getPostsResponse } from "../apis/post";
import { InferGetServerSidePropsType } from "next";
import PostList from "../components/Post/PostList";
import Footer from "../components/Common/Footer";
import Head from "next/head";
import { wrapper } from "../store";
import allCookies from "next-cookies";
import cookieSetter from "../utils/initializer/cookieSetter";
import { getMyInfoRequest } from "../apis/user";
import { authActions } from "../store/reducers/Auth";

export default function Index({
	posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<React.Fragment>
			<Head>
				<title>HLOG - 개발을 공유하다.</title>
			</Head>
			<Header />
			<PostList posts={posts} />
			<Footer />
		</React.Fragment>
	);
}

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async (context) => {
		try {
			cookieSetter(context);

			const myInfoResponse = await getMyInfoRequest();
			const postsResponse = await getPostsResponse();

			store.dispatch({
				type: authActions.GET_MY_INFO_SUCCESS,
				payload: myInfoResponse.payload,
			});

			return {
				props: {
					posts: postsResponse.payload.posts,
				},
			};
		} catch (error) {
			return {
				props: error,
			};
		}
	},
);
