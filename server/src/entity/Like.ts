import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Comment } from "./Comment";
import { Post } from "./Post";
import { User } from "./User";

@Entity({
  name: "likes",
  database: process.env.DB_NAME,
})
export class Like {
  @Index({ unique: true })
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  @JoinColumn({ name: "user" })
  user: User;

  @ManyToOne(() => Post, (post) => post.id, { nullable: true })
  @JoinColumn({ name: "post" })
  post: Post;

  @ManyToOne(() => Comment, (comment) => comment.id, { nullable: true })
  @JoinColumn({ name: "comment" })
  comment: Comment;
}
