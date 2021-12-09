import React from "react";
import Header from "../../components/Common/Header";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import { wrapper } from "../../store";
import { getMyInfoRequest, getUserInfoRequest } from "../../apis/user";
import { authActions } from "../../store/reducers/Auth";
import UserProfileForm from "../../components/Auth/UserProfileForm";
import cookieSetter from "../../utils/initializer/cookieSetter";

export default function UserProfile() {
	return (
		<React.Fragment>
			<Head>
				<title>HLOG - 유저 프로필</title>
			</Head>
			<Header />
			<UserProfileForm />
		</React.Fragment>
	);
}

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async (context: GetServerSidePropsContext) => {
		try {
			const { userId } = context.params;
			const hasToken = cookieSetter(context);

			const userInfoResponse = await getUserInfoRequest(Number(userId));
			store.dispatch({
				type: authActions.GET_USER_INFO_SUCCESS,
				payload: userInfoResponse.payload,
			});

			if (hasToken) {
				const myInfoResponse = await getMyInfoRequest();
				store.dispatch({
					type: authActions.GET_MY_INFO_SUCCESS,
					payload: myInfoResponse.payload,
				});
			}
		} catch (error) {
			return {
				props: error,
			};
		}
	},
);
