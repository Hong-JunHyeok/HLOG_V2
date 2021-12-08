import React, { CSSProperties, useCallback } from "react";
import { useDispatch } from "react-redux";
import styles from "./header.module.scss";
import DefaultProfile from "../../../assets/svg/default_profile.svg";
import useToggle from "../../../hooks/useToggle";
import { useRouter } from "next/router";
import { BsPencilFill } from "react-icons/bs";
import imageFormat from "../../../utils/formatter/image-format";
import { useTypedSelector } from "../../../utils/useTypedSelector";
import { authActions } from "../../../store/reducers/Auth";
import { useCookies } from "react-cookie";
import Image from "next/image";

interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = () => {
	const authState = useTypedSelector((state) => state.auth);
	const dispatch = useDispatch();
	const [, , removeCookie] = useCookies();

	const [isUserDropOpen, toggleUserDrop] = useToggle(false);
	const router = useRouter();

	const activeStyle: CSSProperties = {
		color: "#333d4b",
	};

	const handleLogout = useCallback(() => {
		removeCookie("hlog_access_token", { path: "/" });
		dispatch({
			type: authActions.LOGOUT,
		});
	}, [removeCookie, dispatch]);

	return (
		<React.Fragment>
			<header className={styles.header}>
				<div className={styles.logo} onClick={() => router.push("/")}>
					HLOG
				</div>

				<nav className={styles.menus}>
					<li
						className={styles.menu}
						style={router.pathname === "/" ? activeStyle : null}
						onClick={() => router.push("/")}
					>
						최근 게시글
					</li>
					<li
						className={styles.menu}
						style={router.pathname === "/popular" ? activeStyle : null}
						onClick={() => router.push("/popular")}
					>
						인기 게시글
					</li>
					{authState.isLoggedIn && (
						<React.Fragment>
							<li
								className={styles.write}
								onClick={() => router.push("/post/create")}
							>
								<BsPencilFill className={styles.writeIcon} />
								글쓰기
							</li>
							<li className={styles.profile}>
								<Image
									onClick={toggleUserDrop}
									src={
										authState.myInfo?.profileUrl
											? imageFormat(authState.myInfo?.profileUrl)
											: DefaultProfile
									}
									width={38}
									height={38}
									alt=""
									className={styles.profileImage}
									draggable={false}
								/>
								{isUserDropOpen && (
									<ul className={styles.userDropdown}>
										<li
											onClick={() =>
												router.push(`/profile/${authState.myInfo.id}`)
											}
										>
											내 프로필
										</li>
										<li onClick={handleLogout}>로그아웃</li>
									</ul>
								)}
							</li>
						</React.Fragment>
					)}
					{!authState.isLoggedIn && (
						<button
							onClick={() => router.push("/auth/login")}
							className={styles.login}
						>
							로그인
						</button>
					)}
				</nav>
			</header>
		</React.Fragment>
	);
};

export default Header;
