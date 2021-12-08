import React, { useCallback, useEffect } from "react";
import styles from "./chatList.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import { useTypedSelector } from "../../../utils/useTypedSelector";
import ChatInput from "../ChatInput";
import { useDispatch } from "react-redux";
import { chatActions } from "../../../store/reducers/Chat";

const ChatList: React.FunctionComponent = () => {
	const {
		user: { username },
	} = useTypedSelector((state) => state.post.post);
	const { chats } = useTypedSelector((state) => state.chat);
	const dispatch = useDispatch();

	const chatClose = useCallback(() => {
		dispatch({
			type: chatActions.CLOSE_CHAT,
		});
	}, [dispatch]);

	const mapChat = chats.map((chat, _) => <li key={_}>{chat.message}</li>);

	useEffect(() => {
		console.log(chats);
	}, [chats]);

	return (
		<React.Fragment>
			<div className={styles.wrapper}>
				<header className={styles.meta}>
					<div className={styles.username}>{username}</div>
					<div className={styles.close} onClick={chatClose}>
						<AiOutlineClose />
					</div>
				</header>
				<main className={styles.main}>{mapChat}</main>
				<footer className={styles.footer}>
					<ChatInput />
				</footer>
			</div>
		</React.Fragment>
	);
};

export default ChatList;
