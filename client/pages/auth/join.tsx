import React from "react";
import Header from "../../components/Common/Header";
import styles from "../../styles/Page/index.module.scss";
import { main_comment } from "../../data/meta.json";
import JoinForm from "../../components/Auth/JoinForm";
import Head from "next/head";
import { wrapper } from "../../store";
import cookieSetter from "../../utils/initializer/cookieSetter";

export default function Login() {
	return (
		<React.Fragment>
			<Head>
				<title>HLOG - 회원가입</title>
			</Head>
			<div className={styles.container}>
				<JoinForm />
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
