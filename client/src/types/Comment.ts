import type { UserType } from "./User";
import { ReplyType } from "./Reply";

export interface CommentType {
	id: number;
	commentContent: string;
	createdAt: string;
	updatedAt: string;
	user: UserType;
	likeNumber: number;
	isLiked: boolean;
	like: Array<{
		id: number;
		userId: number;
	}>;
	replies: ReplyType[];
}

export interface AnyActionType {
	type: string;
	payload?: any;
}
