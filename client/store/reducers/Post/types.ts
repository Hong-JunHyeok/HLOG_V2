import { CommentType } from "../../../types/Comment";
import { PostType } from "../../../types/Post";

export interface PostStateType {
	posts: PostType[];
	post: PostType | null;
	postLoading: boolean;

	comments: CommentType[];
}
