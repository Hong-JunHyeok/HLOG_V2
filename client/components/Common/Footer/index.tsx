import React from "react";
import styles from "./footer.module.scss";

interface FooterProps {}

const Footer: React.FunctionComponent<FooterProps> = () => {
  return (
    <React.Fragment>
      <footer className={styles.container}>
        <p>
          All Copyright reserved <span className={styles.logo}>HLOG</span>
        </p>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
