import React, { useState } from "react";
import styles from "./chat.module.scss";
import Image from "next/image";
import BalloonPng from "../../assets/png/balloon.png";
import useToggle from "../../hooks/useToggle";
import ChatList from "./ChatList";

interface IChatProps {}

const Chat: React.FunctionComponent<IChatProps> = ({ children }) => {
	const [isChatOpen, toggleChat, chatOpen, chatClose] = useToggle(false);

	return (
		<React.Fragment>
			<div className={styles.container} onClick={chatOpen}>
				{isChatOpen ? (
					<ChatList />
				) : (
					<div className={styles.iconWrapper}>
						<Image
							src={BalloonPng}
							draggable={false}
							className={styles.chatIcon}
							width={50}
							height={50}
						/>
					</div>
				)}
			</div>
		</React.Fragment>
	);
};

export default Chat;
