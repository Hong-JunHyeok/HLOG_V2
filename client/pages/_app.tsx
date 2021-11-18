import axios from "axios";
import React from "react";
import AuthProvider from "../contexts/AuthContext";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  axios.defaults.baseURL = process.env.API_SERVER_URL;

  return (
    <React.Fragment>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </React.Fragment>
  );
}

export default MyApp;
