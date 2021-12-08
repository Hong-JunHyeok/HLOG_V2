import React, { useCallback } from "react";
import styles from "./chatInput.module.scss";
import { FiSend } from "react-icons/fi";
import useInput from "../../../hooks/useInput";
import { useDispatch } from "react-redux";
import { chatActions } from "../../../store/reducers/Chat";
import { useTypedSelector } from "../../../utils/useTypedSelector";

interface IChatInput {}

const ChatInput: React.FunctionComponent<IChatInput> = () => {
	const { myInfo } = useTypedSelector((state) => state.auth);
	const [chatMessage, onChangeChatMessage, setChatMessage] = useInput("");
	const dispatch = useDispatch();

	const handleSubmit = useCallback(() => {
		dispatch({
			type: chatActions.ADD_CHAT_SUCCESS,
			payload: {
				id: 0,
				message: chatMessage,
				user: myInfo,
			},
		});

		setChatMessage("");
	}, [chatMessage, dispatch]);

	return (
		<React.Fragment>
			<div className={styles.wrapper}>
				<textarea
					className={styles.input}
					placeholder="이 포스트에 대해 궁금한 점을 질문해보세요."
					value={chatMessage}
					onChange={onChangeChatMessage}
				/>
				<button className={styles.submit} onClick={handleSubmit}>
					<FiSend />
				</button>
			</div>
		</React.Fragment>
	);
};

export default ChatInput;
