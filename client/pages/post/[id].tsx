import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
} from "next";
import { If, Then, Else } from "react-if";
import PostView from "../../components/Post/PostView";
import React, { useEffect } from "react";
import { getIsLikedPostRequest, getPostResponse } from "../../apis/post";
import Header from "../../components/Common/Header";
import { PostType } from "../../types/Post";
import Footer from "../../components/Common/Footer";
import { useAuthDispatch } from "../../contexts/AuthContext";
import loginInitializer from "../../utils/initializer/loginInitializer";
import { getCommentsRequest } from "../../apis/comment";
import { CommentType } from "../../types/Comment";
import { usePostDispatch } from "../../contexts/PostContext";
import Head from "next/head";

interface IPostViewProps {
  post: PostType;
  comments: CommentType;
  error: Error;
}

const PostViewPage = (
  props: IPostViewProps
): InferGetServerSidePropsType<typeof getServerSideProps> => {
  const { post, comments, error } = props;

  const authDispatch = useAuthDispatch();
  const postDispatch = usePostDispatch();

  useEffect(() => {
    loginInitializer(authDispatch);
  }, []);

  useEffect(() => {
    getIsLikedPostRequest(post.id).then((response) => {
      postDispatch({
        type: "GET_POST_SUCCESS",
        payload: { ...post, isLiked: response.payload },
      });

      postDispatch({
        type: "GET_COMMENTS_SUCCESS",
        payload: comments,
      });
    });
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>HLOG - {post.postTitle}</title>
      </Head>
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
    const commentResponse = await getCommentsRequest(
      parseInt(id as string, 10)
    );

    return {
      props: {
        post: { ...postResponse.payload },
        comments: commentResponse.payload,
      },
    };
  } catch (error) {
    return {
      props: { error: error },
    };
  }
};

export default PostViewPage;
