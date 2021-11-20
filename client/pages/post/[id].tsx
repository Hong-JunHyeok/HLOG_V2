import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { GetServerSidePropsContext } from "next";
import React from "react";
import { getPostResponse } from "../../apis/post";
import Header from "../../components/Common/Header";
import { PostType } from "../../types/Post";

const PostView = (
  post: PostType
): InferGetServerSidePropsType<typeof getServerSideProps> => {
  console.log(post);

  return (
    <React.Fragment>
      <Header />
      {post.postTitle}
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.params;
  let postsResponse: any;
  if (typeof id === "string") {
    postsResponse = await getPostResponse(parseInt(id, 10));
  }

  return {
    props: {
      post: {},
    },
  };
};

export default PostView;
