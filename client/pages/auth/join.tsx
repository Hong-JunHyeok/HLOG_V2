import React from "react";
import Header from "../../components/Common/Header";
import styles from "../../styles/IndexPage/index.module.scss";
import { main_comment } from "../../data/meta.json";
import JoinForm from "../../components/Auth/JoinForm";
import Head from "next/head";

export default function Login() {
	return (
		<React.Fragment>
			<Head>
				<title>HLOG - 회원가입</title>
			</Head>
			<Header />
			<div className={styles.container}>
				<JoinForm />
				<h1
					className={styles.mainComment}
					dangerouslySetInnerHTML={{ __html: main_comment }}
				/>
			</div>
		</React.Fragment>
	);
}
