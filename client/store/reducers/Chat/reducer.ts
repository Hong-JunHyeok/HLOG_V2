import { chatActions } from ".";
import { AnyActionType } from "../../../types/Comment";
import { ChatStateType } from "./types";

const chatInitialState: ChatStateType = {
	chats: [],

	isChatOpen: false,
};

function chatReducer(
	state: ChatStateType = chatInitialState,
	action: AnyActionType,
): ChatStateType {
	switch (action.type) {
		case chatActions.ADD_CHAT:
		case chatActions.ADD_CHAT_SUCCESS:
			return {
				...state,
				chats: [action.payload, ...state.chats],
			};
		case chatActions.ADD_CHAT_ERROR:

		case chatActions.OPEN_CHAT:
			return {
				...state,
				isChatOpen: true,
			};
		case chatActions.CLOSE_CHAT:
			return {
				...state,
				isChatOpen: false,
			};
		default:
			return state;
	}
}

export default chatReducer;
