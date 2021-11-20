import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { GetServerSidePropsContext } from "next";
import PostView from "../../components/Post/PostView";
import React from "react";
import { getPostResponse } from "../../apis/post";
import Header from "../../components/Common/Header";
import { PostType } from "../../types/Post";

interface IPostViewProps {
  post: PostType;
}

const PostViewPage = (
  props: IPostViewProps
): InferGetServerSidePropsType<typeof getServerSideProps> => {
  const { post } = props;

  return (
    <React.Fragment>
      <Header />
      <PostView post={post} />
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

export default PostViewPage;
