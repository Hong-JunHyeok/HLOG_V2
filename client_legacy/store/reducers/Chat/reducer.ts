import { chatActions } from ".";
import { AnyActionType } from "../../../types/Comment";
import { ChatStateType } from "./types";

const chatInitialState: ChatStateType = {
	chats: [],

	addChatLoading: false,
	addChatSuccess: false,
	addChatError: null,

	isChatOpen: false,
};

function chatReducer(
	state: ChatStateType = chatInitialState,
	action: AnyActionType,
): ChatStateType {
	switch (action.type) {
		case chatActions.ADD_CHAT:
			return {
				...state,
				addChatError: null,
				addChatLoading: true,
				addChatSuccess: false,
			};
		case chatActions.ADD_CHAT_SUCCESS:
			return {
				...state,
				chats: [...state.chats, action.payload],
				addChatLoading: false,
				addChatSuccess: true,
			};
		case chatActions.ADD_CHAT_ERROR:
			return {
				...state,
				addChatError: action.payload,
				addChatLoading: false,
				addChatSuccess: false,
			};

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
