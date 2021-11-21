import { UserType } from "./User";

export interface CommentType {
  id: number;
  commentContent: string;
  createdAt: string;
  updatedAt: string;
  user: UserType;
}
