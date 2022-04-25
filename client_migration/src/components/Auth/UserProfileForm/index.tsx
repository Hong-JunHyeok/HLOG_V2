// import React from "react";
// import DefaultProfile from "../../../assets/svg/default_profile.svg";
// import styles from "./userProfileForm.module.scss";
// import imageFormat from "../../../utils/formatter/image-format";
// import { useTypedSelector } from "../../../utils/useTypedSelector";

// import Image from "next/image";

// const UserProfileForm: React.FunctionComponent = () => {
// 	const { userInfo } = useTypedSelector((state) => state.auth);

// 	return (
// 		<React.Fragment>
// 			<div className={styles.container}>
// 				<div className={styles.wrapper}>
// 					<header className={styles.header}>
// 						{userInfo?.username}의 프로필
// 					</header>
// 					<div className={styles.profileContainer}>
// 						<div className={styles.profile}>
// 							<Image
// 								src={
// 									userInfo?.profileUrl
// 										? imageFormat(userInfo?.profileUrl)
// 										: DefaultProfile
// 								}
// 								width={100}
// 								height={100}
// 								className={styles.profileImage}
// 								alt={userInfo?.username}
// 							/>
// 						</div>

// 						<div className={styles.userInfo}>
// 							<h1 className={styles.username}>{userInfo.username}</h1>
// 						</div>
// 					</div>
// 					<p className={styles.intro}>
// 						{userInfo.selfIntroduction
// 							? userInfo.selfIntroduction
// 							: "자기소개가 없습니다."}
// 					</p>

// 					<footer className={styles.footer}></footer>
// 				</div>
// 			</div>
// 		</React.Fragment>
// 	);
// };

// export default UserProfileForm;
