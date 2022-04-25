// import React, { useCallback, useState } from "react";
// import styles from "./chat.module.scss";
// import Image from "next/image";
// import BalloonPng from "../../assets/png/balloon.png";
// import { IoMdHelpCircle } from "react-icons/io";
// import ChatList from "./ChatList";
// import { useTypedSelector } from "../../utils/useTypedSelector";
// import { useDispatch } from "react-redux";
// import { chatActions } from "../../store/reducers/Chat";

// interface IChatProps {}

// const Chat: React.FunctionComponent<IChatProps> = () => {
// 	const { isChatOpen } = useTypedSelector((state) => state.chat);
// 	const dispatch = useDispatch();

// 	const chatOpen = useCallback(() => {
// 		dispatch({
// 			type: chatActions.OPEN_CHAT,
// 		});
// 	}, [dispatch]);

// 	return (
// 		<React.Fragment>
// 			<div className={styles.container}>
// 				{isChatOpen ? (
// 					<ChatList />
// 				) : (
// 					<div className={styles.iconWrapper} onClick={chatOpen}>
// 						<IoMdHelpCircle color="white" size={30} />
// 						{/* <Image
// 							src={BalloonPng}
// 							draggable={false}
// 							className={styles.chatIcon}
// 							width={50}
// 							height={50}
// 						/> */}
// 					</div>
// 				)}
// 			</div>
// 		</React.Fragment>
// 	);
// };

// export default Chat;
