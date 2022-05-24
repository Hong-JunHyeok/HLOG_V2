import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import S from './StyledJoinForm';

const JoinForm = () => {
  return (
    <S.Container>
        <S.Form>
          <div className="form_head">
            <h1>회원가입</h1>
            <span>정보를 입력하여 HLOG에 합류해주세요.</span>
          </div>

          <label htmlFor="id">아이디 (이메일)</label>
          <input type="text" className="join_input" id="id" />

          <label htmlFor="password">비밀번호</label>
          <input type="password" className="join_input" id="password" />

          <label htmlFor="password_check">비밀번호 확인</label>
          <input type="password" className="join_input" id="password_check" />

          <label htmlFor="name">이름</label>
          <input type="text" className="join_input" id="name" />

          <button className="join_btn">회원가입</button>
          
          <Link to="/login" className="go_to_login">이미 회원이신가요?</Link>
        </S.Form>
        <S.Info>
          <span className="info_text">HLOG에서 양질의 포스트들을 확인해보세요.</span>
        </S.Info>
      </S.Container>
  )
}

export default JoinForm;

// import { useCallback } from "react";
// import { useRouter } from "next/router";
// import { joinRequest } from "../../../apis/auth";
// import useInput from "../../../hooks/useInput";
// import { joinValidation } from "../../../utils/validator/join";
// import styles from "./joinForm.module.scss";
// import Link from "next/link";
// import { HiUserCircle } from "react-icons/hi";

// type JoinFormProps = {};

// interface IJoinData {
// 	email: string;
// 	password: string;
// 	username: string;
// }

// const JoinForm: React.FunctionComponent<JoinFormProps> = () => {
// 	const [email, onChangeEmail] = useInput("");
// 	const [password, onChangePassword] = useInput("");
// 	const [checkPassword, onChangeCheckPassword] = useInput("");
// 	const [username, onChangeUsername] = useInput("");

// 	const router = useRouter();

// 	const join = useCallback(
// 		async (joinData: IJoinData) => {
// 			try {
// 				const joinResponse = await joinRequest(joinData);

// 				if (joinResponse.status === 403) {
// 					return alert(joinResponse.data.message);
// 				}

// 				alert("회원가입에 성공했습니다.");
// 				return router.replace("/auth/login");
// 			} catch (error) {
// 				console.error(error);
// 			}
// 		},
// 		[router],
// 	);

// 	const handleJoin = useCallback(
// 		async (event: React.FormEvent) => {
// 			event.preventDefault();

// 			const joinData = {
// 				email,
// 				password,
// 				checkPassword,
// 				username,
// 			};

// 			const validateResult = joinValidation(joinData);

// 			switch (validateResult.type) {
// 				case "SUCCESS":
// 					await join({
// 						email,
// 						password,
// 						username,
// 					});
// 					break;
// 				case "EMPTY":
// 					alert(validateResult.message);
// 					break;
// 				case "WRONG":
// 					alert(validateResult.message);
// 					break;
// 			}
// 		},
// 		[email, password, checkPassword, username],
// 	);

// 	return (
// 		<form className={styles.container} onSubmit={handleJoin}>
// 			<header className={styles.userIcon}>
// 				<h1 onClick={() => router.replace("/")}>HLOG</h1>
// 				<HiUserCircle size={50} />
// 			</header>
// 			<section>
// 				<h1>이메일</h1>
// 				<input
// 					type="email"
// 					className={styles.input}
// 					autoComplete="off"
// 					placeholder="이메일을 입력해주세요."
// 					value={email}
// 					onChange={onChangeEmail}
// 				/>
// 			</section>
// 			<section>
// 				<h1>비밀번호</h1>
// 				<input
// 					type="password"
// 					className={styles.input}
// 					autoComplete="off"
// 					placeholder="비밀번호를 입력해주세요."
// 					value={password}
// 					onChange={onChangePassword}
// 				/>
// 				<input
// 					type="password"
// 					className={styles.input}
// 					autoComplete="off"
// 					placeholder="비밀번호를 다시 입력해주세요."
// 					value={checkPassword}
// 					onChange={onChangeCheckPassword}
// 				/>
// 			</section>
// 			<section>
// 				<h1>이름</h1>
// 				<input
// 					type="text"
// 					className={styles.input}
// 					autoComplete="off"
// 					placeholder="이름을 입력해주세요."
// 					value={username}
// 					onChange={onChangeUsername}
// 				/>
// 			</section>

// 			<button type="submit" className={styles.button}>
// 				회원가입
// 			</button>

// 			<p className={styles.joinUs}>
// 				HLOG와 함께해주세요.
// 				<Link href="/auth/login">
// 					<a className={styles.joinButton}>로그인</a>
// 				</Link>
// 			</p>
// 		</form>
// 	);
// };

// export default JoinForm;
