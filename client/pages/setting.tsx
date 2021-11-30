import Head from "next/head";
import React, { useEffect } from "react";
import Header from "../components/Common/Header";
import { useAuthDispatch } from "../contexts/AuthContext";
import loginInitializer from "../utils/initializer/loginInitializer";

interface SettingProps {}

const Setting: React.FunctionComponent<SettingProps> = () => {
  const authDispatch = useAuthDispatch();

  useEffect(() => {
    loginInitializer(authDispatch);
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>HLOG - 설정</title>
      </Head>
      <Header />
    </React.Fragment>
  );
};

export default Setting;
