import React from "react";
import Header from "../components/Common/Header";
import { getPostsResponse } from "../apis/post";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { PostType } from "../types/Post";
import PostList from "../components/Post/PostList";

export default function Index({
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <React.Fragment>
      <Header />
      <PostList posts={posts} />
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
