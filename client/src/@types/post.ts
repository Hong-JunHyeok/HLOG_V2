import type { UserType } from './user';

export interface PostType {
  id: number;
  postTitle: string;
  postThumbnail: string;
  postContent: string;
  postSummary: string;
  postHits: number;
  createdAt: string;
  updatedAt: string;
  user: UserType;
}
