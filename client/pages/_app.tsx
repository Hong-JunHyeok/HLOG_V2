import React, { useEffect } from "react";
import AuthProvider, { useAuthDispatch } from "../contexts/AuthContext";
import "../styles/globals.scss";
import { ContextDevTool } from "react-context-devtool";
import PostProvider from "../contexts/PostContext";

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

export default MyApp;
