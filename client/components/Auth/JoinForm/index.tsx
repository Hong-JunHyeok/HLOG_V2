import { useCallback } from "react";
import { useRouter } from "next/router";
import { joinRequest } from "../../../apis/auth";
import useInput from "../../../hooks/useInput";
import { joinValidation } from "../../../utils/validator/join";
import styles from "./joinForm.module.scss";
import Link from "next/link";

type JoinFormProps = {};

interface IJoinData {
	email: string;
	password: string;
	username: string;
}

const JoinForm: React.FunctionComponent<JoinFormProps> = () => {
	const [email, onChangeEmail] = useInput("");
	const [password, onChangePassword] = useInput("");
	const [checkPassword, onChangeCheckPassword] = useInput("");
	const [username, onChangeUsername] = useInput("");

	const router = useRouter();

	const join = useCallback(
		async (joinData: IJoinData) => {
			try {
				const joinResponse = await joinRequest(joinData);

				if (joinResponse.status === 403) {
					return alert(joinResponse.data.message);
				}

				alert("회원가입에 성공했습니다.");
				return router.replace("/auth/login");
			} catch (error) {
				console.error(error);
			}
		},
		[router],
	);

	const handleJoin = useCallback(
		async (event: React.FormEvent) => {
			event.preventDefault();

			const joinData = {
				email,
				password,
				checkPassword,
				username,
			};

			const validateResult = joinValidation(joinData);

			switch (validateResult.type) {
				case "SUCCESS":
					await join({
						email,
						password,
						username,
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
		[email, password, checkPassword, username],
	);

	return (
		<form className={styles.container} onSubmit={handleJoin}>
			<section>
				<h1>이메일</h1>
				<input
					type="email"
					className={styles.input}
					autoComplete="off"
					placeholder="이메일을 입력해주세요."
					value={email}
					onChange={onChangeEmail}
				/>
			</section>
			<section>
				<h1>비밀번호</h1>
				<input
					type="password"
					className={styles.input}
					autoComplete="off"
					placeholder="비밀번호를 입력해주세요."
					value={password}
					onChange={onChangePassword}
				/>
				<input
					type="password"
					className={styles.input}
					autoComplete="off"
					placeholder="비밀번호를 다시 입력해주세요."
					value={checkPassword}
					onChange={onChangeCheckPassword}
				/>
			</section>
			<section>
				<h1>이름</h1>
				<input
					type="text"
					className={styles.input}
					autoComplete="off"
					placeholder="이름을 입력해주세요."
					value={username}
					onChange={onChangeUsername}
				/>
			</section>

			<button type="submit" className={styles.button}>
				회원가입
			</button>

			<p className={styles.joinUs}>
				HLOG와 함께해주세요.
				<Link href="/auth/login">
					<a className={styles.joinButton}>로그인</a>
				</Link>
			</p>
		</form>
	);
};

export default JoinForm;
