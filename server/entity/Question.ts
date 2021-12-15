import { Column, Entity, ManyToOne } from "typeorm";
import { Common } from "../utils/CommonEntity";
import { User } from "./User";

@Entity({
  name: "questions",
  database: process.env.DB_NAME,
})
export class Question extends Common {
  @Column({ nullable: false, comment: "질문의 내용" })
  content: string;

  @ManyToOne(() => User, (user) => user.questions, {
    nullable: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user: User;
}
