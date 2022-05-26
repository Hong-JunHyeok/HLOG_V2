import { User }Type } from "./User";

export interface PostType {
  id: number;
  postTitle: string;
  postThumnail: string;
  postContent: string;
  createdAt: string;
  updatedAt: string;
  user: UserType;
  likeNumber: number;
  isLiked: boolean;
  like: Array<{
    id: number;
    userId: number;
  }>;
}
