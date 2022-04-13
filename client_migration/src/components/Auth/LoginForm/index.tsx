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
