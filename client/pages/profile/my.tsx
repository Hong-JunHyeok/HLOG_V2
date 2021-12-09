import React from "react";
import Header from "../../components/Common/Header";
import MyProfileForm from "../../components/Auth/MyProfileForm";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import cookieSetter from "../../utils/initializer/cookieSetter";
import { wrapper } from "../../store";
import { getMyInfoRequest } from "../../apis/user";
import { authActions } from "../../store/reducers/Auth";

export default function MyProfile() {
	return (
		<React.Fragment>
			<Head>
				<title>HLOG - 내 프로필</title>
			</Head>
			<Header />
			<MyProfileForm />
		</React.Fragment>
	);
}

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async (context: GetServerSidePropsContext) => {
		try {
			const hasToken = cookieSetter(context);

			const myInfoResponse = await getMyInfoRequest();
			store.dispatch({
				type: authActions.GET_MY_INFO_SUCCESS,
				payload: myInfoResponse.payload,
			});

			const isLoggedIn = store.getState().auth.isLoggedIn;

			if (!hasToken || !isLoggedIn) {
				return {
					redirect: {
						destination: "/",
						permanent: false,
					},
				};
			}
		} catch (error) {
			return {
				props: error,
			};
		}
	},
);
