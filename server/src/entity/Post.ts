import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Common } from "../utils/CommonEntity";
import { Comment } from "./Comment";
import { User } from "./User";

@Entity({
  name: "posts",
  database: process.env.DB_NAME,
})
export class Post extends Common {
  @Column({ nullable: false, comment: "게시글의 제목", length: 200 })
  postTitle: string;

  @Column({ nullable: true, comment: "게시글의 썸네일", type: "text" })
  postThumnail: string;

  @Column({ nullable: false, comment: "게시글의 본문", type: "text" })
  postContent: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  post: Post;
}
