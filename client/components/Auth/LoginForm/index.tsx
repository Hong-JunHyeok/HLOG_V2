import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useInput from "../../../hooks/useInput";
import styles from "./loginForm.module.scss";
import { loginValidation } from "../../../utils/validator/login";
import { useAuthDispatch, useAuthState } from "../../../contexts/AuthContext";
import { loginRequest } from "../../../apis/auth";

type LoginFormProps = {};

const LoginForm: React.FunctionComponent<LoginFormProps> = () => {
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  const authState = useAuthState();
  const authDispatch = useAuthDispatch();

  const router = useRouter();

  const login = useCallback(async () => {
    try {
      authDispatch({
        type: "LOGIN",
      });
      const loginResponse = await loginRequest({ email, password });

      if (loginResponse.code === 403) {
        return authDispatch({
          type: "LOGIN_ERROR",
          payload: loginResponse.data.message,
        });
      }

      localStorage.setItem(
        "hlog_access_token",
        loginResponse.payload.accessToken
      );
      authDispatch({
        type: "LOGIN_SUCCESS",
        payload: loginResponse.payload.user,
      });
    } catch (error) {
      console.error(error);
      authDispatch({
        type: "LOGIN_ERROR",
        payload: error.response.data.message,
      });
    }
  }, [email, password]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      const validateResult = loginValidation({ email, password });

      switch (validateResult.type) {
        case "SUCCESS":
          await login();
          break;
        case "EMPTY":
          alert(validateResult.message);
          break;
        case "WRONG":
          alert(validateResult.message);
          break;
      }
    },
    [email, password]
  );

  useEffect(() => {
    authState.loginError && alert(authState.loginError);
  }, [authState.loginError]);

  useEffect(() => {
    authState.isLoggedIn && router.back();
  }, [authState.isLoggedIn]);

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.input}
        autoComplete="off"
        placeholder="이메일을 입력해주세요."
        value={email}
        onChange={onChangeEmail}
      />
      <input
        type="password"
        className={styles.input}
        autoComplete="off"
        placeholder="비밀번호를 입력해주세요."
        value={password}
        onChange={onChangePassword}
      />
      <button type="submit" className={styles.button}>
        로그인
      </button>

      <p className={styles.joinUs}>
        HLOG와 함께해주세요.
        <Link href="/auth/join">
          <a className={styles.joinButton}>회원가입</a>
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
