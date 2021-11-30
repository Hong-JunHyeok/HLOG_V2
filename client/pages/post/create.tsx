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
      <Header />
      <Editor />
      <Footer />
    </React.Fragment>
  );
};

export default PostCreatePage;
