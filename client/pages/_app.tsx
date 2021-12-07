import React from "react";
import AuthProvider from "../contexts/AuthContext";
import PostProvider from "../contexts/PostContext";
import { wrapper } from "../store";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
	return (
		<React.Fragment>
			<AuthProvider>
				<PostProvider>
					<Component {...pageProps} />
				</PostProvider>
			</AuthProvider>
		</React.Fragment>
	);
}

export default wrapper.withRedux(MyApp);
