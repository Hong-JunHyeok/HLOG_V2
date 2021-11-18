import React from "react";
import { useAuthState } from "../../../contexts/AuthContext";
import styles from "./header.module.scss";

interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = () => {
  const authState = useAuthState();
  return (
    <React.Fragment>
      <header className={styles.header}>
        <div className={styles.logo}>HLOG</div>

        {authState.isLoggedIn && (
          <nav className={styles.menus}>
            <li className={styles.menu}>메인</li>
            <li className={styles.menu}>인기 게시글</li>
            <li className={styles.menu}>최근 게시글</li>
            <li className={styles.menu}>설정</li>
          </nav>
        )}
      </header>
    </React.Fragment>
  );
};

export default Header;
