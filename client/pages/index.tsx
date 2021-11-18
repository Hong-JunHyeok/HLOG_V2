import React, { CSSProperties } from "react";
import Header from "../components/Common/Header";
import styles from "../styles/IndexPage/index.module.scss";
import { main_comment } from "../data/meta.json";
import LoginForm from "../components/Index/LoginForm";
import AuthProvider, { useAuthState } from "../contexts/AuthContext";
import { If, Then, Else } from "react-if";

export default function Index() {
  const authState = useAuthState();

  return (
    <React.Fragment>
      <Header />
      <div className={styles.container}>
        <If condition={authState.isLoggedIn}>
          <Then>
            <>로그인 성공</>
          </Then>
          <Else>
            <h1
              className={styles.mainComment}
              dangerouslySetInnerHTML={{ __html: main_comment }}
            />
            <LoginForm />
          </Else>
        </If>
      </div>
    </React.Fragment>
  );
}
