import { Column, Entity, ManyToMany, ManyToOne } from "typeorm";
import { Common } from "./Common";
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

  @ManyToOne((Type) => User, (user) => user.id)
  author: User;
}