import React from "react";
import Header from "../../components/Common/Header";
import styles from "../../styles/IndexPage/index.module.scss";
import { main_comment } from "../../data/meta.json";
import LoginForm from "../../components/Auth/LoginForm";

export default function Login() {
  return (
    <React.Fragment>
      <Header />
      <div className={styles.container}>
        <h1
          className={styles.mainComment}
          dangerouslySetInnerHTML={{ __html: main_comment }}
        />
        <LoginForm />
      </div>
    </React.Fragment>
  );
}
