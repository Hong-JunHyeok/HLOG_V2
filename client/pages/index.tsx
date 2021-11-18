import React, { CSSProperties } from "react";
import Header from "../components/Common/Header";
import styles from "../styles/IndexPage/index.module.scss";
import { main_comment } from "../data/meta.json";
import LoginForm from "../components/Index/LoginForm";
import AuthProvider, { useAuthState } from "../contexts/AuthContext";

export default function Index() {
  const authState = useAuthState();

  return (
    <React.Fragment>
      <Header />
      <div className={styles.container}>
        {authState.isLoggedIn ? (
          <>로그인 성공</>
        ) : (
          <>
            <h1
              className={styles.mainComment}
              dangerouslySetInnerHTML={{ __html: main_comment }}
            />
            <LoginForm />
          </>
        )}
      </div>
    </React.Fragment>
  );
}
