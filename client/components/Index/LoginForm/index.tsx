import { useCallback, useEffect } from "react";
import Link from "next/link";
import useInput from "../../../hooks/useInput";
import styles from "./loginForm.module.scss";
import { loginValidation } from "../../../utils/validator/login";
import { useAuthDispatch, useAuthState } from "../../../contexts/AuthContext";

type LoginFormProps = {};

const LoginForm: React.FunctionComponent<LoginFormProps> = () => {
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  const authDispatch = useAuthDispatch();

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();

      const validateResult = loginValidation({ email, password });

      switch (validateResult.type) {
        case "SUCCESS":
          authDispatch({
            type: "LOGIN_SUCCESS",
          });
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
        <Link href="/join">
          <a className={styles.joinButton}>회원가입</a>
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
