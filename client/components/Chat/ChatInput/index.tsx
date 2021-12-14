import React, { useCallback, useEffect, useState } from "react";
import styles from "./chatInput.module.scss";
import { FiSend } from "react-icons/fi";
import useInput from "../../../hooks/useInput";
import { useDispatch } from "react-redux";
import { chatActions } from "../../../store/reducers/Chat";
import { useTypedSelector } from "../../../utils/useTypedSelector";
import { Socket } from "socket.io-client";

interface IChatInput {
	socket: Socket;
}

const ChatInput: React.FunctionComponent<IChatInput> = ({ socket }) => {
	const { myInfo } = useTypedSelector((state) => state.auth);
	const { addChatLoading, addChatError, addChatSuccess } = useTypedSelector(
		(state) => state.chat,
	);
	const [chatMessage, onChangeChatMessage, setChatMessage] = useInput("");
	const dispatch = useDispatch();

	const handleCreateChat = useCallback(() => {
		dispatch({
			type: chatActions.ADD_CHAT,
		});

		socket.emit("message", chatMessage.trim());

		dispatch({
			type: chatActions.ADD_CHAT_SUCCESS,
			payload: {
				id: 0,
				message: chatMessage,
				user: myInfo,
			},
		});

		setChatMessage("");
	}, [chatMessage, dispatch, setChatMessage]);

	const handleKeyDownChat = useCallback(
		(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
			if (e.key === "Enter") {
				if (!e.shiftKey) {
					e.preventDefault();
					handleCreateChat();
				}
			}
		},
		[chatMessage, handleCreateChat],
	);

	return (
		<React.Fragment>
			<div className={styles.wrapper}>
				<textarea
					className={styles.input}
					placeholder="이 포스트에 대해 궁금한 점을 질문해보세요."
					value={chatMessage}
					onChange={onChangeChatMessage}
					onKeyDown={handleKeyDownChat}
				/>
				<button
					className={styles.submit}
					type="submit"
					onClick={handleCreateChat}
				>
					<FiSend />
				</button>
			</div>
		</React.Fragment>
	);
};

export default ChatInput;
