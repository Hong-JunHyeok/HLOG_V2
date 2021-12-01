import React, { useCallback, useEffect, useRef, useState } from "react";
import { CgDarkMode } from "react-icons/cg";
import { BsPencilFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { MdSupervisorAccount } from "react-icons/md";
import DefaultProfile from "../../../assets/svg/default_profile.svg";
import { useAuthState } from "../../../contexts/AuthContext";
import styles from "./profileForm.module.scss";
import { patchMyProfileRequest } from "../../../apis/user";
import imageFormat from "../../../utils/formatter/image-format";

interface IProfileForm {}

const ProfileForm: React.FunctionComponent<IProfileForm> = ({}) => {
  const { myInfo } = useAuthState();

  const [prevProfileImage, setPrevProfileImage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const editProfileRef = useRef<HTMLInputElement | null>(null);

  const handleClickEditProfile = useCallback(() => {
    editProfileRef.current.click();
  }, [editProfileRef]);

  const onChangeProfile = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.target.files[0] && setProfileImage(event.target.files[0]);
    },
    [setProfileImage]
  );

  const changeProfile = useCallback(async () => {
    const form = new FormData();
    form.append("profile", profileImage);

    const response = await patchMyProfileRequest(myInfo.id, form);
    console.log(response);
  }, [profileImage]);

  useEffect(() => {
    if (profileImage && window.confirm("프로필사진을 변경하시겠습니까?")) {
      changeProfile();
    }

    if (profileImage) {
      console.log(profileImage);
      setPrevProfileImage(URL.createObjectURL(profileImage));
    }
  }, [profileImage]);

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
              <img
                src={
                  prevProfileImage
                    ? prevProfileImage
                    : myInfo?.profileUrl
                    ? imageFormat(myInfo?.profileUrl)
                    : DefaultProfile
                }
                alt={myInfo.username}
              />

              <input
                type="file"
                className={styles.profileInput}
                onChange={onChangeProfile}
                ref={editProfileRef}
                accept="image/png, image/jpeg"
                multiple={false}
              />
              <button onClick={handleClickEditProfile}>
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
