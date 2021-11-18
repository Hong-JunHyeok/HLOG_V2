import React, { useEffect } from "react";
import Header from "../components/Common/Header";
import { useAuthDispatch, useAuthState } from "../contexts/AuthContext";
import { getPostsResponse } from "../apis/post";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { PostType } from "../types/Post";

export default function Index({
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <React.Fragment>
      <Header />
      {posts.map((post) => (
        <>{post.postTitle}</>
      ))}
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
