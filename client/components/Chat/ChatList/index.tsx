import React from "react";
import styles from "./chatList.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import { useTypedSelector } from "../../../utils/useTypedSelector";
import ChatInput from "../ChatInput";

const ChatList: React.FunctionComponent = () => {
	const {
		user: { username },
	} = useTypedSelector((state) => state.post.post);

	return (
		<React.Fragment>
			<div className={styles.wrapper}>
				<header className={styles.meta}>
					<div className={styles.username}>{username}</div>
					<div className={styles.close} onClick={() => console.log("close")}>
						<AiOutlineClose />
					</div>
				</header>
				<main className={styles.main}></main>
				<footer className={styles.footer}>
					<ChatInput />
				</footer>
			</div>
		</React.Fragment>
	);
};

export default ChatList;
