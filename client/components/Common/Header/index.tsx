import React from "react";
import styles from "./header.module.scss";

interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = () => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <div className={styles.logo}>HLOG</div>
      </header>
    </React.Fragment>
  );
};

export default Header;
