import React, { CSSProperties, useCallback } from "react";
import { useAuthDispatch, useAuthState } from "../../../contexts/AuthContext";
import styles from "./header.module.scss";
import DefaultProfile from "../../../assets/svg/default_profile.svg";
import useToggle from "../../../hooks/useToggle";
import Router from "../../../lib/Router";
import { useRouter } from "next/router";
import { BsPencilFill } from "react-icons/bs";
import imageFormat from "../../../utils/formatter/image-format";

interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = () => {
  const authState = useAuthState();
  const authDispatch = useAuthDispatch();

  const [isUserDropOpen, toggleUserDrop] = useToggle(false);
  const router = useRouter();

  const activeStyle: CSSProperties = {
    color: "#333d4b",
  };

  const handleLogout = useCallback(() => {
    localStorage.removeItem("hlog_access_token");
    authDispatch({
      type: "LOGOUT",
    });

    router.replace("/");
  }, []);

  return (
    <React.Fragment>
      <header className={styles.header}>
        <div className={styles.logo} onClick={() => router.push("/")}>
          HLOG
        </div>

        <nav className={styles.menus}>
          <li
            className={styles.menu}
            style={router.pathname === "/" ? activeStyle : null}
            onClick={() => router.push("/")}
          >
            최근 게시글
          </li>
          <li
            className={styles.menu}
            style={router.pathname === "/popular" ? activeStyle : null}
            onClick={() => router.push("/popular")}
          >
            인기 게시글
          </li>
          {authState.isLoggedIn && (
            <React.Fragment>
              <li
                className={styles.write}
                onClick={() => router.push("/post/create")}
              >
                <BsPencilFill className={styles.writeIcon} />
                글쓰기
              </li>
              <li className={styles.profile}>
                <img
                  onClick={toggleUserDrop}
                  src={
                    authState.myInfo?.profileUrl
                      ? imageFormat(authState.myInfo?.profileUrl)
                      : DefaultProfile
                  }
                  alt=""
                  className={styles.profileImage}
                  draggable={false}
                />
                {isUserDropOpen && (
                  <ul className={styles.userDropdown}>
                    <li
                      onClick={() =>
                        router.push(`/profile/${authState.myInfo.id}`)
                      }
                    >
                      내 프로필
                    </li>
                    <li onClick={handleLogout}>로그아웃</li>
                  </ul>
                )}
              </li>
            </React.Fragment>
          )}
          {!authState.isLoggedIn && (
            <button
              onClick={() => router.push("/auth/login")}
              className={styles.login}
            >
              로그인
            </button>
          )}
        </nav>
      </header>
    </React.Fragment>
  );
};

export default Header;
