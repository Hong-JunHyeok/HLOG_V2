import React, { useCallback } from "react";
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
	const [chatMessage, onChangeChatMessage, setChatMessage] = useInput("");
	const dispatch = useDispatch();

	const handleCreateChat = useCallback(
		(event: React.KeyboardEvent<HTMLTextAreaElement>) => {
			if (chatMessage.trim() && event.keyCode === 13 && !event.shiftKey) {
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
			}
		},
		[chatMessage, dispatch],
	);

	return (
		<React.Fragment>
			<div className={styles.wrapper}>
				<textarea
					className={styles.input}
					placeholder="이 포스트에 대해 궁금한 점을 질문해보세요."
					value={chatMessage}
					onChange={onChangeChatMessage}
					onKeyDown={handleCreateChat}
				/>
				<button className={styles.submit} type="submit">
					<FiSend />
				</button>
			</div>
		</React.Fragment>
	);
};

export default ChatInput;
