import { ChatType } from "../../../types/Chat";

export interface ChatStateType {
	chats: ChatType[];

	isChatOpen: boolean;
}
