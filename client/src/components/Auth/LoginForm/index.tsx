import { FormEvent, useCallback, useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import S from './StyledLoginForm';
import useLocationPush from "@/hooks/useLocationPush";

const LoginForm = () => {
  const auth = useAuth();
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  })

  const handleChangeFormData = (event) => {
    const { name, value } = event.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value
    })
  }

  const handlePushMain = useLocationPush('/');

  const handleLogin = async(event: FormEvent) => {
    event.preventDefault();
    try {
      const { email,password } = loginFormData;
      await auth.login(email, password);
      handlePushMain();
    } catch(error) {
      console.log(error.response.data.message);
    }
  }

  return (
    <S.Container>
      <S.Form onSubmit={handleLogin}>
        <div className="form_head">
          <h1>로그인</h1>
          <span>계정에 접근하려면 정보를 입력하세요.</span>
        </div>

        <button className="login_with_google">Google로 로그인</button>
        <div className="sep_line" />

        <label htmlFor="email">아이디 (이메일)</label>
        <input type="text" className="login_input" id="email" name="email" onChange={handleChangeFormData} />

        <label htmlFor="password">비밀번호</label>
        <input type="password" className="login_input" id="password" name="password" onChange={handleChangeFormData} />

        <button className="login_btn">로그인</button>
        
        <Link to="/join" className="not_a_user">회원이 아니신가요?</Link>
        <Link to="/forgot" className="forgot_password">비밀번호를 잊으셨나요?</Link>
      </S.Form>
      <S.Info>
        <span className="info_text">HLOG에서 글을 작성해보세요.</span>
      </S.Info>
    </S.Container>
  )
};

export default LoginForm;

// import { useCallback, useEffect } from "react";
// import { useRouter } from "next/router";
// import Link from "next/link";
// import useInput from "../../../hooks/useInput";
// import styles from "./loginForm.module.scss";
// import { loginValidation } from "../../../utils/validator/login";
// import { loginRequest } from "../../../apis/auth";
// import { useDispatch } from "react-redux";
// import { useTypedSelector } from "../../../utils/useTypedSelector";
// import { authActions } from "../../../store/reducers/Auth";
// import { useCookies } from "react-cookie";
// import { HiUserCircle } from "react-icons/hi";

// type LoginFormProps = {};

// const LoginForm: React.FunctionComponent<LoginFormProps> = () => {
// 	const [cookies, setCookie] = useCookies();
// 	const [email, onChangeEmail] = useInput("");
// 	const [password, onChangePassword] = useInput("");

// 	const authState = useTypedSelector((state) => state.auth);
// 	const dispatch = useDispatch();

// 	const router = useRouter();

// 	const login = useCallback(async () => {
// 		try {
// 			dispatch({
// 				type: authActions.LOGIN,
// 			});
// 			const loginResponse = await loginRequest({ email, password });
// 			if (loginResponse.status === 403) {
// 				alert(loginResponse.data.message);
// 				return;
// 			}

// 			setCookie("hlog_access_token", loginResponse.payload.accessToken, {
// 				path: "/",
// 			});

// 			dispatch({
// 				type: authActions.LOGIN_SUCCESS,
// 				payload: loginResponse.payload.user,
// 			});
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	}, [email, password, dispatch]);

// 	const handleSubmit = useCallback(
// 		async (event: React.FormEvent) => {
// 			event.preventDefault();

// 			const validateResult = loginValidation({ email, password });

// 			switch (validateResult.type) {
// 				case "SUCCESS":
// 					await login();
// 					break;
// 				case "EMPTY":
// 					alert(validateResult.message);
// 					break;
// 				case "WRONG":
// 					alert(validateResult.message);
// 					break;
// 			}
// 		},
// 		[email, password],
// 	);

// 	useEffect(() => {
// 		authState.loginError && alert("아이디, 비밀번호를 확인해주세요.");
// 	}, [authState.loginError]);

// 	useEffect(() => {
// 		authState.isLoggedIn && router.replace("/");
// 	}, [authState.isLoggedIn]);

// 	return (
// 		<form className={styles.container} onSubmit={handleSubmit}>
// 			<header className={styles.userIcon}>
// 				<h1 onClick={() => router.replace("/")}>HLOG</h1>
// 				<HiUserCircle size={50} />
// 			</header>
// 			<input
// 				type="email"
// 				className={styles.input}
// 				autoComplete="off"
// 				placeholder="이메일을 입력해주세요."
// 				value={email}
// 				onChange={onChangeEmail}
// 			/>
// 			<input
// 				type="password"
// 				className={styles.input}
// 				autoComplete="off"
// 				placeholder="비밀번호를 입력해주세요."
// 				value={password}
// 				onChange={onChangePassword}
// 			/>
// 			<button type="submit" className={styles.button}>
// 				로그인
// 			</button>

// 			<p className={styles.joinUs}>
// 				HLOG와 함께해주세요.
// 				<Link href="/auth/join">
// 					<a className={styles.joinButton}>회원가입</a>
// 				</Link>
// 			</p>
// 		</form>
// 	);
// };

// export default LoginForm;
