import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { GetServerSidePropsContext } from "next";
import { If, Then, Else } from "react-if";
import PostView from "../../components/Post/PostView";
import React from "react";
import { getPostResponse } from "../../apis/post";
import Header from "../../components/Common/Header";
import { PostType } from "../../types/Post";
import Footer from "../../components/Common/Footer";

interface IPostViewProps {
  post: PostType;
  error: Error;
}

const PostViewPage = (
  props: IPostViewProps
): InferGetServerSidePropsType<typeof getServerSideProps> => {
  const { post, error } = props;

  return (
    <React.Fragment>
      <Header />
      <If condition={!!error}>
        <Then>
          <h1>오류가 발생했습니다.</h1>
        </Then>
        <Else>
          <PostView post={post} />
        </Else>
      </If>
      <Footer />
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.params;

  try {
    const postResponse = await getPostResponse(parseInt(id as string, 10));

    return {
      props: { post: postResponse.payload },
    };
  } catch (error) {
    return {
      props: { error: error },
    };
  }
};

export default PostViewPage;
