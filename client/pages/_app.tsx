import React, { useEffect } from "react";
import AuthProvider from "../contexts/AuthContext";
import PostProvider from "../contexts/PostContext";
import { CookiesProvider } from "react-cookie";
import { wrapper } from "../store";
import { useCookies } from "react-cookie";
import customAxios from "../utils/customAxios";
import "../styles/globals.scss";
import Chat from "../components/Chat";

function MyApp({ Component, pageProps }) {
	const [cookie] = useCookies();

	useEffect(() => {
		if (cookie.hlog_access_token) {
			customAxios.defaults.headers["Authorization"] = cookie.hlog_access_token;
		}
	}, [cookie]);

	return (
		<React.Fragment>
			<CookiesProvider>
				<Component {...pageProps} />
				<Chat />
			</CookiesProvider>
		</React.Fragment>
	);
}

export default wrapper.withRedux(MyApp);
