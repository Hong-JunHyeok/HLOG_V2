import type { UserType } from './user';

export interface ReplyType {
  id: number;
  commentContent: string;
  createdAt: string;
  updatedAt: string;
  user: UserType;
}
