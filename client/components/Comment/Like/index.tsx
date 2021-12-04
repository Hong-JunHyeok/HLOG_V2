import React from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { useAuthState } from "../../../contexts/AuthContext";
import useToggle from "../../../hooks/useToggle";
import styles from "./like.module.scss";

interface ILikeProps {}

const Like: React.FunctionComponent<ILikeProps> = () => {
  const [isLiked, toggleLike] = useToggle(false);
  const { myInfo } = useAuthState();

  return (
    <React.Fragment>
      <div className={styles.container}>
        {isLiked ? (
          <>
            <FcLike onClick={toggleLike} />
            <span className={styles.ment}>
              {myInfo.username}님 외, 48명이 이 댓글에 공감합니다.
            </span>
          </>
        ) : (
          <>
            <FcLikePlaceholder onClick={toggleLike} />
            <span className={styles.ment}>48명이 이 댓글에 공감합니다.</span>
          </>
        )}
      </div>
    </React.Fragment>
  );
};

export default Like;
