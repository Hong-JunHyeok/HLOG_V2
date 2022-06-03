import { UserType } from './user';

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
}

export interface AnyActionType {
  type: string;
  payload?: any;
}
