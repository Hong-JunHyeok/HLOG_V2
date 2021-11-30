import React, { useEffect } from "react";
import Header from "../components/Common/Header";
import { getPostsResponse } from "../apis/post";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { PostType } from "../types/Post";
import PostList from "../components/Post/PostList";
import { useAuthDispatch } from "../contexts/AuthContext";
import loginInitializer from "../utils/initializer/loginInitializer";
import Footer from "../components/Common/Footer";
import Head from "next/head";

export default function Index({
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const authDispatch = useAuthDispatch();

  useEffect(() => {
    loginInitializer(authDispatch);
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>HLOG - 개발을 공유하다.</title>
      </Head>
      <Header />
      <PostList posts={posts} />
      <Footer />
    </React.Fragment>
  );
}

export const getServerSideProps: GetServerSideProps<{
  posts: Array<PostType>;
}> = async (context: GetServerSidePropsContext) => {
  const postsResponse = await getPostsResponse();

  return {
    props: { posts: postsResponse.payload.posts },
  };
};
