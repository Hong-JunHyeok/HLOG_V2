import React, { useEffect } from "react";
import AuthProvider, { useAuthDispatch } from "../contexts/AuthContext";
import "../styles/globals.scss";
import { ContextDevTool } from "react-context-devtool";

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </React.Fragment>
  );
}

export default MyApp;
