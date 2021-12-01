import React, { useEffect } from "react";
import Header from "../../components/Common/Header";
import loginInitializer from "../../utils/initializer/loginInitializer";
import { useAuthDispatch, useAuthState } from "../../contexts/AuthContext";
import ProfileForm from "../../components/Auth/ProfileForm";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";

export default function Profile() {
  const authDispatch = useAuthDispatch();
  const authState = useAuthState();

  useEffect(() => {
    loginInitializer(authDispatch);
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>HLOG - 프로필</title>
      </Head>
      <Header />
      <ProfileForm />
    </React.Fragment>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return {
    props: {},
  };
};
