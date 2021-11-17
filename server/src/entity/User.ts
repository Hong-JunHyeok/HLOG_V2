import { Entity, Column, Index, BeforeInsert, OneToMany } from "typeorm";
import bcrypt from "bcrypt";
import { Common } from "../utils/CommonEntity";
import { Post } from "./Post";
import { throws } from "assert";
import { IUserJoin } from "../types/JoinTypes";

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

  @BeforeInsert()
  async saveEncryptedPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  @OneToMany((Type) => Post, (post) => post.id, {
    nullable: true,
    onDelete: "CASCADE",
  })
  posts: Post[];

  static async createUser(joinData: IUserJoin) {
    return this.create(joinData);
  }
}
