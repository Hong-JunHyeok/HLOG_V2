import { CommentType } from "../../../types/Comment";
import { PostType } from "../../../types/Post";
import { ReplyType } from "../../../types/Reply";

export interface PostStateType {
	posts: PostType[];
	post: PostType | null;
	postLoading: boolean;

	replies: ReplyType[];
	replyLoading: boolean;

	comments: CommentType[];

	isEditMode: boolean;

	postTitleInput: string;
	postContentInput: string;
}
