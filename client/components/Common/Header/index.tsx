import React, { useCallback, useState } from "react";
import { useAuthState } from "../../../contexts/AuthContext";
import { useRouter } from "next/router";
import styles from "./header.module.scss";
import DefaultProfile from "../../../assets/svg/default_profile.svg";
import useToggle from "../../../hooks/useToggle";

interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = () => {
  const authState = useAuthState();
  const router = useRouter();

  const [isUserDropOpen, toggleUserDrop] = useToggle(false);
  const handlePushHome = () => router.push("/");

  return (
    <React.Fragment>
      <header className={styles.header}>
        <div className={styles.logo} onClick={handlePushHome}>
          HLOG
        </div>

        {authState.isLoggedIn && (
          <nav className={styles.menus}>
            <li className={styles.menu}>메인</li>
            <li className={styles.menu}>인기 게시글</li>
            <li className={styles.menu}>최근 게시글</li>
            <li className={styles.menu}>설정</li>
            <li className={styles.profile}>
              <img
                onClick={toggleUserDrop}
                src={authState.myInfo.profileUrl || DefaultProfile}
                alt=""
                className={styles.profileImage}
                draggable={false}
              />
              {isUserDropOpen && (
                <div className={styles.userDropdown}>
                  <li>내 프로필</li>
                  <li>로그아웃</li>
                </div>
              )}

              {/* TODO: Dropdown 메뉴 구현하기 */}
            </li>
          </nav>
        )}
      </header>
    </React.Fragment>
  );
};

export default Header;
