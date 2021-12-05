import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Common } from "../utils/CommonEntity";
import { Post } from "./Post";
import { User } from "./User";
import { Like } from "./Like";

@Entity({
  name: "comments",
  database: process.env.DB_NAME,
})
export class Comment extends Common {
  @Column({ nullable: false, comment: "게시글의 제목" })
  commentContent: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Post, (post) => post.id)
  post: Post;

  @OneToMany(() => Like, (like) => like.comment, {
    nullable: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  like: Like[];
}
