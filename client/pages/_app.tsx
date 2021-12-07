import React from "react";
import AuthProvider from "../contexts/AuthContext";
import PostProvider from "../contexts/PostContext";
import { CookiesProvider } from "react-cookie";
import { wrapper } from "../store";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
	return (
		<React.Fragment>
			<CookiesProvider>
				<AuthProvider>
					<PostProvider>
						<Component {...pageProps} />
					</PostProvider>
				</AuthProvider>
			</CookiesProvider>
		</React.Fragment>
	);
}

export default wrapper.withRedux(MyApp);
