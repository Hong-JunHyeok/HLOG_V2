import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Common } from "../utils/CommonEntity";
import { Post } from "./Post";
import { User } from "./User";
import { Like } from "./Like";
import { Comment } from "./Comment";

@Entity({
  name: "replies",
  database: process.env.DB_NAME,
})
export class Reply extends Common {
  @Column({ nullable: false, comment: "댓글의 답글" })
  commentContent: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Comment, (comment) => comment.id)
  comment: Comment;

  @OneToMany(() => Like, (like) => like.comment, {
    nullable: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  like: Like[];
}
