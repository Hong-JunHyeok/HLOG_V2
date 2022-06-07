import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Common } from "../utils/CommonEntity";
import { User } from "./User";
import { Comment } from "./Comment";

@Entity({
  name: "replies",
  database: process.env.DB_NAME,
})
export class Reply extends Common {
  @Column({ nullable: false, comment: "댓글의 답글" })
  commentContent: string;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  user: User;

  @ManyToOne(() => Comment, (comment) => comment.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  comment: Comment;
}
