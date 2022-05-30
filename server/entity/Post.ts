import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Common } from "../utils/CommonEntity";
import { Comment } from "./Comment";
import { Like } from "./Like";
import { User } from "./User";

@Entity({
  name: "posts",
  database: process.env.DB_NAME,
})
export class Post extends Common {
  @Column({ nullable: false, comment: "게시글의 제목", length: 200 })
  postTitle: string;

  @Column({ nullable: true, comment: "게시글의 썸네일", type: "text" })
  postThumbnail: string;

  @Column({ nullable: false, comment: "게시글의 본문", type: "text" })
  postContent: string;

  @ManyToOne(() => User, (user) => user.posts, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post, {
    nullable: true,
    cascade: true
  })
  comment: Comment;

  @OneToMany(() => Like, (like) => like.post, {
    nullable: true,
    cascade: true
  })
  like: Like;
}
