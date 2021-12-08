import React from "react";
import styles from "./chatInput.module.scss";
import { FiSend } from "react-icons/fi";

interface IChatInput {}

const ChatInput: React.FunctionComponent<IChatInput> = () => {
	return (
		<React.Fragment>
			<div className={styles.wrapper}>
				<textarea
					className={styles.input}
					placeholder="이 포스트에 대해 궁금한 점을 질문해보세요."
				/>
				<button className={styles.submit}>
					<FiSend />
				</button>
			</div>
		</React.Fragment>
	);
};

export default ChatInput;
