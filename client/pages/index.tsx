import React from "react";
import Header from "../components/Common/Header";
import { useAuthState } from "../contexts/AuthContext";
import { getPostsResponse } from "../apis/post";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

export default function Index({
  postsResponse,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const authState = useAuthState();
  console.log(postsResponse);

  return (
    <React.Fragment>
      <Header />
    </React.Fragment>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const postsResponse = await getPostsResponse();

  return {
    props: { postsResponse },
  };
};
