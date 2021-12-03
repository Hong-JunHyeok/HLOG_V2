import React, { useCallback, useEffect, useState } from "react";
import styles from "./like.module.scss";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import useToggle from "../../../hooks/useToggle";
import { usePostDispatch, usePostState } from "../../../contexts/PostContext";
import { likeRequest, unlikeRequest } from "../../../apis/post";

const Like: React.FunctionComponent = () => {
  const { post } = usePostState();
  const postDispatch = usePostDispatch();

  const like = async () => {
    await likeRequest(post.id);

    postDispatch({
      type: "LIKE",
    });
  };

  const unlike = async () => {
    await unlikeRequest(post.id);

    postDispatch({
      type: "UNLIKE",
    });
  };

  if (!post) {
    return null;
  }

  return (
    <React.Fragment>
      <div className={styles.container} onClick={post.isLiked ? unlike : like}>
        <div className={post.isLiked ? styles.unlikeBtn : styles.likeBtn}>
          {post.isLiked ? <FcLike /> : <FcLikePlaceholder />}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Like;
