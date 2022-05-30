import type { UserType } from './user';

export interface PostType {
  id: number;
  postTitle: string;
  postThumbnail: string;
  postContent: string;
  createdAt: string;
  updatedAt: string;
  user: UserType;
}
