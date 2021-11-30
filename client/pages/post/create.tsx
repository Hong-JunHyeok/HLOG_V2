import Head from "next/head";
import React, { useEffect } from "react";
import Footer from "../../components/Common/Footer";
import Header from "../../components/Common/Header";
import Editor from "../../components/Post/Editor";
import { useAuthDispatch } from "../../contexts/AuthContext";
import loginInitializer from "../../utils/initializer/loginInitializer";

const PostCreatePage = () => {
  const authDispatch = useAuthDispatch();

  useEffect(() => {
    loginInitializer(authDispatch);
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>HLOG - 글 작성</title>
      </Head>
      <Header />
      <Editor />
      <Footer />
    </React.Fragment>
  );
};

export default PostCreatePage;
