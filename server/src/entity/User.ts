import { Entity, Column, Index, OneToMany } from "typeorm";
import { Common } from "../utils/CommonEntity";
import { Post } from "./Post";
import { IUserJoin } from "../types/JoinTypes";
import { Comment } from "./Comment";

require("dotenv").config();

@Entity({
  name: "users",
  database: process.env.DB_NAME,
})
export class User extends Common {
  @Index({ unique: true })
  @Column({ nullable: false, comment: "사용자의 이름", length: 30 })
  username: string;

  @Column({ nullable: true, comment: "사용자의 프로필", type: "text" })
  profileUrl: string;

  @Column({ nullable: true, comment: "사용자 자기소개", type: "text" })
  selfIntroduction: string;

  @Column({ nullable: false, comment: "사용자의 이메일 (아이디)" })
  email: string;

  @Column({ nullable: false, comment: "사용자의 비밀번호", type: "varchar" })
  password: string;

  @OneToMany((Type) => Post, (post) => post.user, {
    nullable: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  posts: Post[];

  @OneToMany((Type) => Comment, (comment) => comment.user, {
    nullable: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  comments: Comment[];
}
