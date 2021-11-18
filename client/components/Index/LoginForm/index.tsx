import useInput from "../../../hooks/useInput";
import styles from "./loginForm.module.scss";

interface LoginFormProps {}

const LoginForm: React.FunctionComponent<LoginFormProps> = () => {
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  return (
    <form className={styles.container}>
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
    </form>
  );
};

export default LoginForm;
