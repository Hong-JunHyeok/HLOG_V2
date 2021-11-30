import React from "react";
import { CgDarkMode } from "react-icons/cg";
import { BsPencilFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { MdSupervisorAccount } from "react-icons/md";
import DefaultProfile from "../../assets/svg/default_profile.svg";
import { useAuthState } from "../../contexts/AuthContext";
import styles from "./profileForm.module.scss";

interface IProfileForm {}

const ProfileForm: React.FunctionComponent<IProfileForm> = ({}) => {
  const { myInfo } = useAuthState();

  if (!myInfo) {
    return null;
  }

  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <header className={styles.header}>My Profile</header>
          <div className={styles.profileContainer}>
            <div className={styles.profile}>
              <img src={myInfo.profileUrl || DefaultProfile} alt="" />
              <button>
                <BsPencilFill />
              </button>
            </div>
            <div className={styles.userInfo}>
              <h1 className={styles.username}>{myInfo.username}</h1>
              <p>{myInfo.selfIntroduction}</p>
            </div>
          </div>

          <footer className={styles.footer}>
            <h3>Settings</h3>
            <ul>
              <li className={styles.mode}>
                <CgDarkMode />
                라이트 / 다크모드
              </li>
              {/* <li className={styles.logout}>
                <FiLogOut />
                로그아웃
              </li> */}
            </ul>

            <h3>My Account</h3>
            <ul>
              <li className={styles.changeAccount}>
                <MdSupervisorAccount />
                다른 계정으로 로그인
              </li>
              <li className={styles.logout}>
                <FiLogOut />
                로그아웃
              </li>
            </ul>
          </footer>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProfileForm;
