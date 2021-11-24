import React from "react";
import { Else, If, Then } from "react-if";
import DefaultProfile from "../../assets/svg/default_profile.svg";
import { useAuthState } from "../../contexts/AuthContext";
import useToggle from "../../hooks/useToggle";
import stringCutter from "../../utils/formatter/string-cutter";
import styles from "./profileForm.module.scss";

interface IProfileForm {}

const ProfileForm: React.FunctionComponent<IProfileForm> = ({}) => {
  const { myInfo } = useAuthState();
  const [isIntroOpen, toggleIntro] = useToggle(false);

  if (!myInfo) {
    return null;
  }
  const { cuttedString, isCutted } = stringCutter(myInfo.selfIntroduction, 100);

  return (
    <React.Fragment>
      <header className={styles.profile_header}>
        <img
          src={myInfo.profileUrl || DefaultProfile}
          alt=""
          className={styles.profile}
        />
        <h1 className={styles.username}>{myInfo.username}</h1>
        <p className={styles.intro}>
          <If condition={isCutted}>
            <Then>{isCutted ? cuttedString : myInfo.selfIntroduction}</Then>
            <Else>{myInfo.selfIntroduction}</Else>
          </If>
        </p>
      </header>
    </React.Fragment>
  );
};

export default ProfileForm;
