import type { UserType } from "./User";

export interface ReplyType {
	id: number;
	commentContent: string;
	createdAt: string;
	updatedAt: string;
	user: UserType;
}
