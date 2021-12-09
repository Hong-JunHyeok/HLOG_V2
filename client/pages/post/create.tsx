import Head from "next/head";
import React from "react";
import { getMyInfoRequest } from "../../apis/user";
import Footer from "../../components/Common/Footer";
import Header from "../../components/Common/Header";
import Editor from "../../components/Post/Editor";
import { wrapper } from "../../store";
import { authActions } from "../../store/reducers/Auth";
import cookieSetter from "../../utils/initializer/cookieSetter";

const PostCreatePage = () => {
	return (
		<React.Fragment>
			<Head>
				<title>HLOG - 글 작성</title>
			</Head>
			<Header />
			<Editor />
			<Footer />
		</React.Fragment>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async (context) => {
		try {
			const hasToken = cookieSetter(context);

			if (!hasToken) {
				return {
					redirect: {
						destination: "/",
						permanent: false,
					},
				};
			}

			const myInfoResponse = await getMyInfoRequest();
			store.dispatch({
				type: authActions.GET_MY_INFO_SUCCESS,
				payload: myInfoResponse.payload,
			});
		} catch (error) {
			return {
				props: error,
			};
		}
	},
);

export default PostCreatePage;
