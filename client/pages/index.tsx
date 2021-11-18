import React from "react";
import Header from "../components/Common/Header";
import styles from "../styles/IndexPage/index.module.scss";

export default function Index() {
  return (
    <React.Fragment>
      <Header />
      <div className={styles.container}></div>
    </React.Fragment>
  );
}
