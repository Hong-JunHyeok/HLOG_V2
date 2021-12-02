import React from "react";
import styles from "./like.module.scss";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import useToggle from "../../../hooks/useToggle";

const Like: React.FunctionComponent = () => {
  const [likeToggleState, onChangeToggleState] = useToggle(false);

  const likeNumber = 999;

  return (
    <React.Fragment>
      <div className={styles.container} onClick={onChangeToggleState}>
        <div className={styles.likeBtn}>
          {likeToggleState ? <FcLike /> : <FcLikePlaceholder />}
        </div>

        <span className={styles.likers}>{likeNumber}</span>
      </div>
    </React.Fragment>
  );
};

export default Like;
