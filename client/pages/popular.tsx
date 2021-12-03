import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import { getPopularPostsRequest } from "../apis/post";
import { PostType } from "../types/Post";
import loginInitializer from "../utils/initializer/loginInitializer";
import Footer from "../components/Common/Footer";
import Head from "next/head";
import Header from "../components/Common/Header";
import PostList from "../components/Post/PostList";
import { useAuthDispatch } from "../contexts/AuthContext";

const PopularPage = ({
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const authDispatch = useAuthDispatch();

  useEffect(() => {
    loginInitializer(authDispatch);
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>HLOG - 인기 게시글</title>
      </Head>
      <Header />
      <PostList posts={posts} />
      <Footer />
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps<{ posts: PostType[] }> =
  async (context: GetServerSidePropsContext) => {
    try {
      const postResponse = await getPopularPostsRequest();

      return {
        props: {
          posts: postResponse.payload.posts,
        },
      };
    } catch (error) {
      return {
        props: {
          posts: [],
        },
      };
    }
  };

export default PopularPage;
