import { Entity, Column, Index, BeforeInsert } from "typeorm";
import bcrypt from "bcrypt";
import { Common } from "./Common";
require("dotenv").config();

@Entity({
  name: "users",
  database: process.env.DB_NAME,
})
export class User extends Common {
  @Index({ unique: true })
  @Column({ nullable: false, comment: "사용자의 이름", length: 30 })
  user_name: string;

  @Column({ nullable: true, comment: "사용자의 프로필", type: "text" })
  profile_url: string;

  @Column({ nullable: true, comment: "사용자 자기소개", type: "text" })
  self_introduction: string;

  @Column({ nullable: false, comment: "사용자의 이메일 (아이디)" })
  email: string;

  @Column({ nullable: false, comment: "사용자의 비밀번호", type: "varchar" })
  password: string;

  @BeforeInsert()
  async saveEncryptedPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }
}
