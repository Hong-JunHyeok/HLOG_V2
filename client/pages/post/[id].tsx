import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { GetServerSidePropsContext } from "next";
import React from "react";
import { getPostResponse } from "../../apis/post";
import Header from "../../components/Common/Header";
import { PostType } from "../../types/Post";

interface IPostViewProps {
  post: PostType;
}

const PostView = (
  props: IPostViewProps
): InferGetServerSidePropsType<typeof getServerSideProps> => {
  const { post } = props;

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
  let postResponse: any;
  if (typeof id === "string") {
    postResponse = await getPostResponse(parseInt(id, 10));
  }

  return {
    props: { post: postResponse.payload },
  };
};

export default PostView;
