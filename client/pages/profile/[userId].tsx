import React, { useEffect } from "react";
import Header from "../../components/Common/Header";
import loginInitializer from "../../utils/initializer/loginInitializer";
import { useAuthDispatch } from "../../contexts/AuthContext";
import ProfileForm from "../../components/ProfileForm";
import { GetServerSidePropsContext } from "next";

export default function Profile() {
  const authDispatch = useAuthDispatch();

  useEffect(() => {
    loginInitializer(authDispatch);
  }, []);

  return (
    <React.Fragment>
      <Header />
      <ProfileForm />
      {/* <Footer /> */}
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
