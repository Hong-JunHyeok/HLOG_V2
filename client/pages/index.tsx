import React, { useEffect } from "react";
import Header from "../components/Common/Header";
import { getPostsResponse } from "../apis/post";
import { InferGetServerSidePropsType } from "next";
import PostList from "../components/Post/PostList";
import { useAuthDispatch } from "../contexts/AuthContext";
import loginInitializer from "../utils/initializer/loginInitializer";
import Footer from "../components/Common/Footer";
import Head from "next/head";
import { wrapper } from "../store";
import { authActions } from "../store/reducers/Auth";
import { getMyInfoRequest } from "../apis/user";

export default function Index({
	posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const authDispatch = useAuthDispatch();

	useEffect(() => {
		loginInitializer(authDispatch);
	}, []);

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
	(store) =>
		async ({ req, res, ...args }) => {
			try {
				console.log(req);
				const postsResponse = await getPostsResponse();

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
