import React from "react";
import { getPopularPostsRequest } from "../apis/post";
import Footer from "../components/Common/Footer";
import Head from "next/head";
import Header from "../components/Common/Header";
import PostList from "../components/Post/PostList";
import cookieSetter from "../utils/initializer/cookieSetter";
import { wrapper } from "../store";
import { authActions } from "../store/reducers/Auth";
import { getMyInfoRequest } from "../apis/user";
import { postActions } from "../store/reducers/Post";

const PopularPage = () => {
	return (
		<React.Fragment>
			<Head>
				<title>HLOG - 인기 게시글</title>
			</Head>
			<Header />
			<PostList />
			<Footer />
		</React.Fragment>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async (context) => {
		try {
			cookieSetter(context);

			const myInfoResponse = await getMyInfoRequest();
			const postsResponse = await getPopularPostsRequest();

			if (myInfoResponse.data.code === 401) {
				store.dispatch({
					type: authActions.GET_MY_INFO_ERROR,
				});
			}

			if (myInfoResponse.data.code === 200) {
				store.dispatch({
					type: authActions.GET_MY_INFO_SUCCESS,
					payload: myInfoResponse.payload,
				});
			}

			store.dispatch({
				type: postActions.GET_POSTS_SUCCESS,
				payload: postsResponse.payload.posts,
			});
		} catch (error) {
			return {
				props: error,
			};
		}
	},
);

export default PopularPage;
