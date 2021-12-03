import React, { useCallback, useEffect } from "react";
import styles from "./like.module.scss";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import useToggle from "../../../hooks/useToggle";
import { usePostDispatch, usePostState } from "../../../contexts/PostContext";
import { getIsLikedPostRequest } from "../../../apis/post";

const Like: React.FunctionComponent = () => {
  const { post } = usePostState();
  const postDispatch = usePostDispatch();

  console.log(post);

  const [likeToggleState, onChangeToggleState, , , setLikeToggleState] =
    useToggle(false);

  const like = useCallback(() => {
    postDispatch({
      type: "LIKE",
    });
  }, []);

  const unlike = useCallback(() => {
    postDispatch({
      type: "UNLIKE",
    });
  }, []);

  useEffect(() => {
    if (post) {
      setLikeToggleState(post.isLiked);
    }
  }, [post]);

  if (!post) {
    return null;
  }

  return (
    <React.Fragment>
      <div className={styles.container} onClick={onChangeToggleState}>
        <div
          className={styles.likeBtn}
          onClick={likeToggleState ? unlike : like}
        >
          {likeToggleState ? <FcLike /> : <FcLikePlaceholder />}
        </div>

        <span className={styles.likers}>{post?.likeNumber}</span>
      </div>
    </React.Fragment>
  );
};

export default Like;
