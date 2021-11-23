import React, { useCallback } from "react";
import { useAuthDispatch, useAuthState } from "../../../contexts/AuthContext";
import styles from "./header.module.scss";
import DefaultProfile from "../../../assets/svg/default_profile.svg";
import useToggle from "../../../hooks/useToggle";
import Router from "../../../lib/Router";

interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = () => {
  const authState = useAuthState();
  const authDispatch = useAuthDispatch();

  const [isUserDropOpen, toggleUserDrop] = useToggle(false);
  const router = new Router();

  const handleLogout = useCallback(() => {
    localStorage.removeItem("hlog_access_token");
    authDispatch({
      type: "LOGOUT",
    });
  }, []);

  return (
    <React.Fragment>
      <header className={styles.header}>
        <div className={styles.logo} onClick={() => router.handlePushLink("/")}>
          HLOG
        </div>

        <nav className={styles.menus}>
          {authState.isLoggedIn && (
            <React.Fragment>
              <li
                className={styles.menu}
                onClick={() => router.handlePushLink("/popular")}
              >
                인기 게시글
              </li>
              <li
                className={styles.menu}
                onClick={() => router.handlePushLink("/")}
              >
                최근 게시글
              </li>
              <li
                className={styles.menu}
                onClick={() => router.handlePushLink("/setting")}
              >
                설정
              </li>
              <li
                className={styles.menu}
                onClick={() => router.handlePushLink("/setting")}
              >
                글쓰기
              </li>
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
                    <li
                      onClick={() =>
                        router.handlePushLink(`/profile/${authState.myInfo.id}`)
                      }
                    >
                      내 프로필
                    </li>
                    <li onClick={handleLogout}>로그아웃</li>
                  </div>
                )}
              </li>
            </React.Fragment>
          )}
          {!authState.isLoggedIn && (
            <li className={styles.menu}>
              <button onClick={() => router.handlePushLink("/auth/login")}>
                로그인
              </button>
            </li>
          )}
        </nav>
      </header>
    </React.Fragment>
  );
};

export default Header;
