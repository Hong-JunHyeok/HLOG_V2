import { UserType } from "./User";

export interface PostType {
  id: number;
  postTitle: string;
  postThumnail: string;
  postContent: string;
  createdAt: string;
  updatedAt: string;
  author: UserType;
}
