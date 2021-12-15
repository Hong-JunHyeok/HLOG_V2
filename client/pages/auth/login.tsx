import React from "react";
import styles from "../../styles/Page/index.module.scss";
import LoginForm from "../../components/Auth/LoginForm";
import Head from "next/head";
import { wrapper } from "../../store";
import cookieSetter from "../../utils/initializer/cookieSetter";

export default function Login() {
	return (
		<React.Fragment>
			<Head>
				<title>HLOG - 로그인</title>
			</Head>

			<div className={styles.container}>
				<LoginForm />
			</div>
		</React.Fragment>
	);
}

export const getServerSideProps = wrapper.getServerSideProps(
	(strore) => async (context) => {
		try {
			const hasToken = cookieSetter(context);

			if (hasToken) {
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
