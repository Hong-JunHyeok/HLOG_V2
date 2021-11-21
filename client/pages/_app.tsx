import axios from "axios";
import React from "react";
import AuthProvider from "../contexts/AuthContext";
import "../styles/globals.scss";

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
