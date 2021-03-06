import React, { useCallback, useEffect, useRef, useState } from "react";
import { CgDarkMode } from "react-icons/cg";
import { BsPencilFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { MdSupervisorAccount } from "react-icons/md";
import DefaultProfile from "../../../assets/svg/default_profile.svg";
import styles from "./profileForm.module.scss";
import { patchMyIntroRequest, patchMyProfileRequest } from "../../../apis/user";
import imageFormat from "../../../utils/formatter/image-format";
import { useTypedSelector } from "../../../utils/useTypedSelector";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { authActions } from "../../../store/reducers/Auth";
import { useRouter } from "next/router";
import Image from "next/image";
import useToggle from "../../../hooks/useToggle";
import { Else, If, Then } from "react-if";
import useInput from "../../../hooks/useInput";

const MyProfileForm: React.FunctionComponent = () => {
	const { myInfo } = useTypedSelector((state) => state.auth);
	const dispatch = useDispatch();
	const [, , removeCookie] = useCookies();
	const router = useRouter();

	const [prevProfileImage, setPrevProfileImage] = useState<string | null>(null);
	const [profileImage, setProfileImage] = useState<File | null>(null);
	const [editIntro, onChangeEditIntro, setEditIntro] = useInput("");
	const [isIntroEditModeOpen, , openEditMode, closeEditMode] = useToggle(false);

	const editProfileRef = useRef<HTMLInputElement | null>(null);

	const handleLogout = useCallback(
		(redirect: string) => {
			dispatch({
				type: authActions.LOGOUT,
			});
			removeCookie("hlog_access_token");

			router.replace(redirect);
		},
		[dispatch, router],
	);

	const handleClickEditProfile = useCallback(() => {
		editProfileRef.current.click();
	}, [editProfileRef]);

	const onChangeProfile = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			event.target.files[0] && setProfileImage(event.target.files[0]);
		},
		[setProfileImage],
	);

	const changeProfile = useCallback(async () => {
		const form = new FormData();
		form.append("profile", profileImage);

		await patchMyProfileRequest(myInfo.id, form);
	}, [profileImage]);

	const handleOpenEditMode = useCallback(() => {
		openEditMode();
		setEditIntro(myInfo.selfIntroduction);
	}, [openEditMode, setEditIntro, myInfo.selfIntroduction]);

	const handleEditIntro = useCallback(async () => {
		try {
			console.log(editIntro);
			if (!editIntro.trim()) {
				return;
			}
			dispatch({
				type: authActions.EDIT_INTRO,
			});

			await patchMyIntroRequest(myInfo.id, editIntro);
			dispatch({
				type: authActions.EDIT_INTRO_SUCCESS,
				payload: editIntro.trim(),
			});
			alert("??????????????? ??????????????? ??????????????????.");

			closeEditMode();
			setEditIntro("");
		} catch (error) {
			dispatch({
				type: authActions.EDIT_INTRO_ERROR,
			});
			console.error(error);
		}
	}, [editIntro]);

	useEffect(() => {
		if (profileImage && window.confirm("?????????????????? ?????????????????????????")) {
			changeProfile();

			if (profileImage) {
				setPrevProfileImage(URL.createObjectURL(profileImage));
			}
		}
	}, [profileImage]);

	if (!myInfo) {
		router.push("/");
		return null;
	}

	return (
		<React.Fragment>
			<div className={styles.container}>
				<div className={styles.wrapper}>
					<header className={styles.header}>?????? ?????????</header>
					<div className={styles.profileContainer}>
						<div className={styles.profile}>
							<Image
								src={
									prevProfileImage
										? prevProfileImage
										: myInfo?.profileUrl
										? imageFormat(myInfo?.profileUrl)
										: DefaultProfile
								}
								width={100}
								height={100}
								className={styles.profileImage}
								alt={myInfo?.username}
							/>

							<>
								<input
									type="file"
									className={styles.profileInput}
									onChange={onChangeProfile}
									ref={editProfileRef}
									accept="image/png, image/jpeg"
									multiple={false}
								/>
								<button onClick={handleClickEditProfile}>
									<BsPencilFill />
								</button>
							</>
						</div>

						<div className={styles.userInfo}>
							<h1 className={styles.username}>{myInfo.username}</h1>
						</div>
					</div>

					<If condition={isIntroEditModeOpen}>
						<Then>
							<div className={styles.editContainer}>
								<p>
									<textarea
										className={styles.editInput}
										placeholder="??????????????? ??????????????????."
										value={editIntro}
										onChange={onChangeEditIntro}
									/>
								</p>
								<div className={styles.options}>
									<button onClick={handleEditIntro}>??????</button>
								</div>
							</div>
						</Then>
						<Else>
							<div className={styles.intro}>
								<p>
									{myInfo.selfIntroduction
										? myInfo.selfIntroduction
										: "??????????????? ????????????."}
								</p>
								<div className={styles.options}>
									<button onClick={handleOpenEditMode}>???????????? ??????</button>
								</div>
							</div>
						</Else>
					</If>

					<footer className={styles.footer}>
						<h3>Settings</h3>
						<ul>
							<li className={styles.mode}>
								<CgDarkMode />
								????????? / ????????????
							</li>
						</ul>

						<h3>My Account</h3>
						<ul>
							<li
								className={styles.changeAccount}
								onClick={() => handleLogout("/auth/login")}
							>
								<MdSupervisorAccount />
								?????? ???????????? ?????????
							</li>
							<li className={styles.logout} onClick={() => handleLogout("/")}>
								<FiLogOut />
								????????????
							</li>
						</ul>
					</footer>
				</div>
			</div>
		</React.Fragment>
	);
};

export default MyProfileForm;
