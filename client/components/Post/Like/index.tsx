import React, { useCallback, useEffect } from "react";
import styles from "./like.module.scss";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import useToggle from "../../../hooks/useToggle";
import { usePostDispatch, usePostState } from "../../../contexts/PostContext";
import { getIsLikedPostRequest } from "../../../apis/post";

interface LikeInterface {
  isLiked: boolean;
  likeNumber: number;
}

const Like: React.FunctionComponent<LikeInterface> = ({
  isLiked = false,
  likeNumber = 0,
}) => {
  const postDispatch = usePostDispatch();

  const [likeToggleState, onChangeToggleState, , , setLikeToggleState] =
    useToggle(isLiked);

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

  return (
    <React.Fragment>
      <div className={styles.container} onClick={onChangeToggleState}>
        <div
          className={styles.likeBtn}
          onClick={likeToggleState ? unlike : like}
        >
          {likeToggleState ? <FcLike /> : <FcLikePlaceholder />}
        </div>

        <span className={styles.likers}>{likeNumber}</span>
      </div>
    </React.Fragment>
  );
};

export default Like;
