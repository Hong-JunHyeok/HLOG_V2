import { ChatType } from "../../../types/Chat";

export interface ChatStateType {
	chats: ChatType[];

	addChatLoading: boolean;
	addChatSuccess: boolean;
	addChatError: null | Error;

	isChatOpen: boolean;
}
